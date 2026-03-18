#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { chromium } from "playwright";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { writeFile, mkdir } from "fs/promises";
import { spawn } from "child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const USER_DATA_DIR = join(__dirname, ".zoom-browser-data");
const NOTES_URL = "https://canva.zoom.us/notes#/my_notes";
const CDP_PORT = 9222;
const CDP_URL = `http://localhost:${CDP_PORT}`;
const GLOBAL_ME_URL = "https://docs.zoom.us/api/user/me";

// ---------------------------------------------------------------------------
// Session state - populated on first use
// ---------------------------------------------------------------------------

let sessionToken = null;
let sessionApiBase = null; // e.g. "https://us01docs.zoom.us"
let sessionUserId = null;
let sessionTimezone = null; // e.g. "+11:00" for AEDT

// ---------------------------------------------------------------------------
// Browser management (only needed for SSO auth + token capture)
// ---------------------------------------------------------------------------

async function getOrLaunchBrowser() {
  try {
    const browser = await chromium.connectOverCDP(CDP_URL);
    const context = browser.contexts()[0];
    if (context) return { browser, context };
    await browser.close();
  } catch {
    // No existing session
  }

  const execPath = chromium.executablePath();
  const child = spawn(
    execPath,
    [
      `--remote-debugging-port=${CDP_PORT}`,
      `--user-data-dir=${USER_DATA_DIR}`,
      `--window-size=1280,900`,
      "--no-first-run",
      "--no-default-browser-check",
      NOTES_URL,
    ],
    { detached: true, stdio: "ignore" }
  );
  child.unref();

  for (let i = 0; i < 30; i++) {
    await new Promise((r) => setTimeout(r, 1000));
    try {
      const browser = await chromium.connectOverCDP(CDP_URL);
      const context = browser.contexts()[0];
      if (context) return { browser, context };
    } catch {
      /* not ready */
    }
  }
  throw new Error("Browser failed to start within 30s");
}

// ---------------------------------------------------------------------------
// Token capture - intercept API requests to grab the bearer token
// ---------------------------------------------------------------------------

async function ensureSession() {
  if (sessionToken && sessionApiBase && sessionUserId) return;

  const { browser, context } = await getOrLaunchBrowser();

  // Always navigate to the notes URL to ensure we're on the right page
  let page = context.pages()[0] || (await context.newPage());
  await page.goto(NOTES_URL, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2000);

  // Check for auth redirect
  const url = page.url();
  if (url.includes("/signin") || url.includes("/login") || !url.includes("zoom.us/notes")) {
    // Don't close the browser - user needs it to log in
    browser.close(); // disconnect CDP, browser stays open
    throw new Error(
      "Authentication expired - the browser was redirected to a login page. " +
      "Please complete SSO login in the browser window, then try again."
    );
  }

  // Capture token from API traffic on reload
  let capturedToken = null;
  const tokenHandler = (req) => {
    if (!capturedToken) {
      const auth = req.headers()["authorization"];
      if (auth && req.url().includes("docs.zoom.us/api")) {
        capturedToken = auth;
      }
    }
  };
  page.on("request", tokenHandler);
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.waitForTimeout(3000);
  page.off("request", tokenHandler);

  if (!capturedToken) {
    browser.close();
    throw new Error("Failed to capture auth token from API traffic. Try again.");
  }

  sessionToken = capturedToken;

  // Disconnect browser - no longer needed
  browser.close();

  // Get user info and cluster API base via Node fetch
  const meResp = await fetch(GLOBAL_ME_URL, {
    headers: { Authorization: sessionToken },
  });
  if (!meResp.ok) throw new Error("user/me failed: " + meResp.status);
  const meData = await meResp.json();

  sessionUserId = meData.user.userId;
  sessionApiBase = meData.homeClusterApiPrefix.replace(/\/$/, ""); // strip trailing slash

  // Derive UTC offset from IANA timezone for date filtering
  const tz = meData.user.timezone || "UTC";
  try {
    const now = new Date();
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      timeZoneName: "shortOffset",
    }).formatToParts(now);
    const offsetPart = parts.find((p) => p.type === "timeZoneName")?.value || "GMT";
    // offsetPart is like "GMT+11" or "GMT-5" or "GMT"
    const m = offsetPart.match(/GMT([+-]?)(\d{1,2})(?::(\d{2}))?/);
    if (m) {
      const sign = m[1] || "+";
      const hours = m[2].padStart(2, "0");
      const mins = (m[3] || "00").padStart(2, "0");
      sessionTimezone = sign + hours + ":" + mins;
    } else {
      sessionTimezone = "+00:00";
    }
  } catch {
    sessionTimezone = "+00:00";
  }
}

// Reset session on auth failure so next call re-authenticates
function resetSession() {
  sessionToken = null;
  sessionApiBase = null;
  sessionUserId = null;
  sessionTimezone = null;
}

// ---------------------------------------------------------------------------
// API helpers - direct Node fetch (no browser needed after auth)
// ---------------------------------------------------------------------------

async function apiFetch(path, options = {}) {
  await ensureSession();

  const url = sessionApiBase + path;
  const resp = await fetch(url, {
    method: options.method || "GET",
    headers: {
      Authorization: sessionToken,
      "Content-Type": "application/json",
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (resp.status === 401 || resp.status === 403) {
    resetSession();
    throw new Error("Authentication expired (HTTP " + resp.status + "). Please re-authenticate.");
  }

  if (!resp.ok) {
    return { __error: true, status: resp.status };
  }

  return resp.json();
}

// ---------------------------------------------------------------------------
// Zoom Notes API wrappers
// ---------------------------------------------------------------------------

async function listNotes({ pageNumber = 1, pageSize = 100, query = "", from, to } = {}) {
  await ensureSession();
  const body = {
    fileFilters: ["FILE_FILTER_MEETING_NOTES"],
    loadMeetingNotesMeetingInfo: true,
    pageNumber,
    pageSize,
    query,
    owners: [sessionUserId],
  };
  if (from) body.startLastModifyTime = from;
  if (to) body.endLastModifyTime = to;
  return apiFetch("/api/search/file", { method: "POST", body });
}

async function listAllNotes({ query, from, to } = {}) {
  const all = [];
  for (let pageNum = 1; pageNum <= 20; pageNum++) {
    const resp = await listNotes({ pageNumber: pageNum, pageSize: 100, query, from, to });
    const items = resp.items || [];
    all.push(...items);
    if (items.length < 100) break;
  }
  return all;
}

async function getTranscript(meetingId) {
  if (!meetingId) return null;
  const result = await apiFetch(
    "/api/bridge/meeting/transcripts/v2?meetingId=" + encodeURIComponent(meetingId)
  );
  if (result?.__error) return null;
  return result;
}

async function getPageContent(fileId) {
  const result = await apiFetch(
    "/api/page/" + fileId + "/content?returnEncodedData=true&fileId=" + fileId
  );
  if (result?.__error || !result?.content?.data) return null;
  try {
    const decoded = JSON.parse(
      Buffer.from(result.content.data, "base64").toString("utf-8")
    );
    return decoded;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Content formatting
// ---------------------------------------------------------------------------

function extractBlockText(titleStr) {
  try {
    const parsed = JSON.parse(titleStr);
    if (Array.isArray(parsed)) {
      return parsed
        .map((item) => (typeof item[1] === "string" ? item[1] : ""))
        .join("");
    }
    return titleStr;
  } catch {
    return titleStr;
  }
}

function formatPageBlocks(blockData) {
  if (!blockData?.blocks) return null;

  const blocks = Object.values(blockData.blocks)
    .filter((b) => b.type !== "BLOCK_TYPE_PAGE")
    .sort((a, b) => a.seq.localeCompare(b.seq));

  if (blocks.length === 0) return null;

  const lines = [];
  for (const block of blocks) {
    const text = extractBlockText(block.content.title).trim();
    if (!text) continue;

    switch (block.type) {
      case "BLOCK_TYPE_HEADING1":
        lines.push("# " + text);
        break;
      case "BLOCK_TYPE_HEADING2":
        lines.push("## " + text);
        break;
      case "BLOCK_TYPE_HEADING3":
        lines.push("### " + text);
        break;
      case "BLOCK_TYPE_BULLET":
        lines.push("- " + text);
        break;
      case "BLOCK_TYPE_NUMBERED":
        lines.push("1. " + text);
        break;
      case "BLOCK_TYPE_TODO":
        lines.push("- [ ] " + text);
        break;
      default:
        lines.push(text);
    }
  }

  const result = lines.join("\n").trim();
  return result || null;
}

function formatTranscript(transcriptData) {
  if (!transcriptData?.items?.length) return null;

  const speakerMap = new Map(
    (transcriptData.speakers || []).map((s) => [s.userId, s.username])
  );

  const lines = [];
  let lastSpeaker = "";

  for (const item of transcriptData.items) {
    const speaker = speakerMap.get(item.userId) || item.userId;
    const time = item.startTime.replace(/\.\d+$/, ""); // 00:04:27.000 -> 00:04:27

    if (speaker !== lastSpeaker) {
      if (lines.length > 0) lines.push("");
      lines.push(`**${speaker}** (${time})`);
      lastSpeaker = speaker;
    }
    lines.push(item.text);
  }

  return lines.join("\n");
}

function formatOutput(title, notesText, transcriptText) {
  const sections = [`# ${title}`, ""];
  if (notesText) {
    sections.push("## Notes", "", notesText, "");
  }
  if (transcriptText) {
    if (notesText) sections.push("---", "");
    sections.push("## Transcript", "", transcriptText);
  }
  return sections.join("\n");
}

// ---------------------------------------------------------------------------
// Shared fetch logic
// ---------------------------------------------------------------------------

async function fetchNotes(toFetch, destPaths) {
  // toFetch: array of { title, fileId, meetingId }
  const pathMap = destPaths
    ? new Map(toFetch.map((item, i) => [item.title, destPaths[i]]))
    : null;

  const results = [];

  for (const note of toFetch) {
    try {
      // Fetch transcript and page content in parallel
      const [transcriptData, blockData] = await Promise.all([
        getTranscript(note.meetingId),
        getPageContent(note.fileId),
      ]);

      const notesText = formatPageBlocks(blockData);
      const transcriptText = formatTranscript(transcriptData);
      const hasContent = notesText || transcriptText;

      if (!hasContent) {
        results.push({ name: note.title, status: "skipped", reason: "no content found" });
        continue;
      }

      const content = formatOutput(note.title, notesText, transcriptText);
      const parts = [];
      if (notesText) parts.push("notes");
      if (transcriptText) parts.push("transcript");

      if (pathMap) {
        const filePath = pathMap.get(note.title);
        await mkdir(dirname(filePath), { recursive: true });
        await writeFile(filePath, content, "utf-8");
        results.push({ name: note.title, status: "ok", path: filePath, parts });
      } else {
        results.push({ name: note.title, status: "ok", content, parts });
      }
    } catch (err) {
      results.push({ name: note.title, status: "failed", reason: err.message });
    }
  }

  return results;
}

// ---------------------------------------------------------------------------
// Note resolution - find notes by title from the API
// ---------------------------------------------------------------------------

async function resolveNotes(names) {
  const allItems = await listAllNotes();
  const titleMap = new Map(
    allItems.map((item) => [
      item.file.title,
      {
        title: item.file.title,
        fileId: item.file.id,
        meetingId: item.file.meetingNotes?.meetingId || null,
      },
    ])
  );

  if (names.length === 1 && names[0] === "all") {
    return [...titleMap.values()];
  }

  const resolved = [];
  const notFound = [];
  for (const name of names) {
    const note = titleMap.get(name);
    if (note) {
      resolved.push(note);
    } else {
      notFound.push(name);
    }
  }

  return { resolved, notFound };
}

// ---------------------------------------------------------------------------
// Result formatters
// ---------------------------------------------------------------------------

function formatInlineResults(results) {
  return results
    .map((r) =>
      r.status === "ok"
        ? `--- ${r.name} ---\n${r.content}`
        : `--- ${r.name} --- ${r.status}: ${r.reason}`
    )
    .join("\n\n");
}

function formatDownloadResults(results) {
  const written = results.filter((r) => r.status === "ok");
  const summary = results
    .map((r) =>
      r.status === "ok"
        ? `${r.name} -> ${r.path} (${r.parts.join(" + ")})`
        : `${r.name} - ${r.status}: ${r.reason}`
    )
    .join("\n");
  return `Wrote ${written.length} transcript(s):\n${summary}`;
}

// ---------------------------------------------------------------------------
// MCP Server
// ---------------------------------------------------------------------------

const server = new McpServer({
  name: "zoom-notes",
  version: "3.0.0",
});

// -- list_notes --

server.tool(
  "list_notes",
  "List available Zoom My Notes. Supports date range filtering and text search. If the browser is not running, it will launch and may require SSO login.",
  {
    from: z
      .string()
      .optional()
      .describe(
        "Start date filter (inclusive) in YYYY-MM-DD format, interpreted as the user's local timezone. Only notes modified on or after this date are returned."
      ),
    to: z
      .string()
      .optional()
      .describe(
        "End date filter (inclusive) in YYYY-MM-DD format, interpreted as the user's local timezone. Only notes modified on or before this date are returned."
      ),
    query: z
      .string()
      .optional()
      .describe("Text search query to filter notes by title."),
    limit: z
      .number()
      .int()
      .min(1)
      .max(500)
      .default(100)
      .describe("Maximum number of notes to return (default 100, max 500)."),
  },
  async ({ from, to, query, limit }) => {
    try {
      // Convert YYYY-MM-DD dates to ISO UTC range using the user's timezone.
      // The API uses startLastModifyTime/endLastModifyTime in UTC ISO format.
      let fromISO, toISO;
      if (from) {
        fromISO = new Date(from + "T00:00:00" + (sessionTimezone || "+00:00")).toISOString();
      }
      if (to) {
        toISO = new Date(to + "T23:59:59.999" + (sessionTimezone || "+00:00")).toISOString();
      }

      let items;
      if (limit <= 100) {
        const resp = await listNotes({ pageSize: limit, query, from: fromISO, to: toISO });
        items = (resp.items || []).slice(0, limit);
      } else {
        items = await listAllNotes({ query, from: fromISO, to: toISO });
        items = items.slice(0, limit);
      }

      if (items.length === 0) {
        return {
          content: [
            {
              type: "text",
              text: "No notes found matching the criteria.",
            },
          ],
        };
      }

      const listing = items
        .map((item, i) => {
          const f = item.file;
          const date = f.createdInfo?.time || "";
          return `[${i}] ${f.title}  (${date})`;
        })
        .join("\n");

      return { content: [{ type: "text", text: listing }] };
    } catch (err) {
      return {
        content: [{ type: "text", text: `Error: ${err.message}` }],
        isError: true,
      };
    }
  }
);

// -- fetch_transcript (single, inline) --

server.tool(
  "fetch_transcript",
  "Fetch a single Zoom note's transcript and manual notes, returned inline in the response. Use list_notes first to get the exact note name.",
  {
    name: z
      .string()
      .describe("Exact note name to fetch (from list_notes output)."),
  },
  async ({ name }) => {
    try {
      const result = await resolveNotes([name]);
      if (result.notFound?.length) {
        return {
          content: [{ type: "text", text: `Not found: ${result.notFound.join(", ")}` }],
          isError: true,
        };
      }
      const results = await fetchNotes(result.resolved, null);
      return { content: [{ type: "text", text: formatInlineResults(results) }] };
    } catch (err) {
      return { content: [{ type: "text", text: `Error: ${err.message}` }], isError: true };
    }
  }
);

// -- fetch_transcripts (multiple, inline) --

server.tool(
  "fetch_transcripts",
  "Fetch multiple Zoom notes returned inline in the response. Use list_notes first to get exact note names.",
  {
    names: z
      .array(z.string())
      .describe(
        'Array of exact note names to fetch, or pass ["all"] to fetch everything.'
      ),
  },
  async ({ names }) => {
    try {
      const result = await resolveNotes(names);
      const toFetch = names[0] === "all" ? result : result.resolved;
      const results = await fetchNotes(Array.isArray(toFetch) ? toFetch : [], null);

      // Append not-found items
      if (result.notFound?.length) {
        for (const nf of result.notFound) {
          results.push({ name: nf, status: "failed", reason: "not found in notes list" });
        }
      }

      return { content: [{ type: "text", text: formatInlineResults(results) }] };
    } catch (err) {
      return { content: [{ type: "text", text: `Error: ${err.message}` }], isError: true };
    }
  }
);

// -- download_transcript (single, to disk) --

server.tool(
  "download_transcript",
  "Download a single Zoom note's transcript and manual notes directly to a file on disk. Requires file system access (use from Claude Code, not Claude Desktop).",
  {
    name: z
      .string()
      .describe("Exact note name to fetch (from list_notes output)."),
    destination: z
      .string()
      .describe("Absolute file path to write the markdown transcript to."),
  },
  async ({ name, destination }) => {
    try {
      const result = await resolveNotes([name]);
      if (result.notFound?.length) {
        return {
          content: [{ type: "text", text: `Not found: ${result.notFound.join(", ")}` }],
          isError: true,
        };
      }
      const results = await fetchNotes(result.resolved, [destination]);
      return { content: [{ type: "text", text: formatDownloadResults(results) }] };
    } catch (err) {
      return { content: [{ type: "text", text: `Error: ${err.message}` }], isError: true };
    }
  }
);

// -- download_transcripts (multiple, to disk) --

server.tool(
  "download_transcripts",
  "Download multiple Zoom notes directly to files on disk. Requires file system access (use from Claude Code, not Claude Desktop).",
  {
    names: z
      .array(z.string())
      .describe("Array of exact note names to fetch."),
    destinations: z
      .array(z.string())
      .describe("Array of absolute file paths, matching 1:1 with names."),
  },
  async ({ names, destinations }) => {
    if (names.length !== destinations.length) {
      return {
        content: [
          {
            type: "text",
            text: `Error: names (${names.length}) and destinations (${destinations.length}) must match 1:1.`,
          },
        ],
        isError: true,
      };
    }
    try {
      const result = await resolveNotes(names);
      const results = await fetchNotes(result.resolved, destinations);

      if (result.notFound?.length) {
        for (const nf of result.notFound) {
          results.push({ name: nf, status: "failed", reason: "not found in notes list" });
        }
      }

      return { content: [{ type: "text", text: formatDownloadResults(results) }] };
    } catch (err) {
      return { content: [{ type: "text", text: `Error: ${err.message}` }], isError: true };
    }
  }
);

// -- close_browser --

server.tool(
  "close_browser",
  "Close the Zoom browser session. Use when done fetching transcripts to avoid leaving a background Chrome process.",
  {},
  async () => {
    try {
      const browser = await chromium.connectOverCDP(CDP_URL);
      for (const ctx of browser.contexts()) {
        for (const page of ctx.pages()) {
          await page.close();
        }
      }
      browser.close();
      resetSession();
      return { content: [{ type: "text", text: "Browser tabs closed." }] };
    } catch {
      return { content: [{ type: "text", text: "No active browser session found." }] };
    }
  }
);

// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------

const transport = new StdioServerTransport();
await server.connect(transport);
