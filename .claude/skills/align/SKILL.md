---
name: align
description: "Cross-initiative alignment checker — surfaces misalignment, gaps, duplication, dependency risks, and synergy opportunities across active initiatives in the company and your groups roadmap. Complementary to /pulse (broad discovery); /align focuses on whether your initiatives are pulling in the same direction and have synergies with other company groups. Run ad-hoc or before key decisions."
---

# /align — Initiative & Roadmap Alignment Checker

Surface misalignment, gaps, duplication, and synergy opportunities across your active initiatives, your group's roadmap, and the broader company. Not a feed of what's happening (that's `/pulse`) — a coherence check on whether your work is pulling in the same direction and connecting to what others are doing.

Run ad-hoc, before key decisions, or weekly alongside `/pulse`.

---

## Step 1: Determine Alignment Target

Before loading any files, figure out what the user wants to align.

- **If the user provided a document or topic** when invoking `/align` (e.g., `/align Voice Agent PRD`, `/align CN AI team`), use that as the anchor. The report will focus on how that initiative aligns with everything else.
- **If no target was provided**, ask: *"What do you want to check alignment on? A specific initiative, a document, or a full cross-initiative scan?"*
  - **Specific initiative** — one initiative checked against the rest of the portfolio and Slack
  - **Document** — a PRD or strategy doc checked against active work and goals
  - **Full scan** — all initiatives compared against each other and against company activity

Store the alignment mode (single-target vs. full-scan) — it determines how much to load and how to frame the output.

---

## Step 2: Build the Initiative Map

Read files in two sequential batches. Start with the work, then load strategy and context.

**Batch A — The Work (read together — max 3 sources):**
1. **`Weekly Kanban.md`** — scan all columns for initiative-level items (not individual action items)
2. **`Tasks/`** — glob for `.md` files (exclude `Done/`), then read the first 40 lines of each (frontmatter + Context section). Note which are P0/P1.
3. **`Tasks/Backlog/`** — glob for files, then read `description:` frontmatter only via Grep (`rg "^description:" Tasks/Backlog/`). Do not open individual files unless one is ambiguous.

**Batch B — Strategy & Context (read together — max 3 sources, only after Batch A):**
4. **`GOALS.md`** — extract: quarterly objectives, north star, focus areas, success criteria, key relationships, deferred items
5. **`Context/Reference/stakeholders.md`** — org structure, team boundaries, key relationships
6. **`Context/Document Hub/`** — glob for files, then grep frontmatter only. Do not open individual files.

From these sources, build an internal initiative model. For each initiative, note: name, stage, strategic fit, dependencies, and 2-3 Slack search keywords. Aim for 5-10 initiatives. Group related items if more than 10.

---

## Step 3: Internal Alignment (brief — max 3 bullets)

Quickly check the anchor initiative against your own portfolio. This is context-setting, not the main event.

Assess strategic fit (High/Medium/Low) against GOALS.md objectives. Then check for conflicts, dependency risks, or synergies with other active initiatives. Condense into **at most 3 bullets** — pick the highest-signal items only. If nothing noteworthy, skip this section entirely.

Do NOT produce a detailed table of all initiatives. Do NOT enumerate all pairwise comparisons. The internal check is a brief preamble to the external alignment that follows.

---

## Step 4: External Alignment (Slack)

After understanding internal alignment, scan Slack for what's happening in the broader company that your initiatives should connect to — or might conflict with.

Use `slack_search_public_and_private` to look for signals. Run searches in parallel.

For each initiative's keywords, search for: adjacent work by other teams, conflicting decisions, dependency signals ("blocked by", "waiting on"), duplication, company-wide shifts, and cross-initiative mentions. Run searches in parallel — at least 3 different keyword searches.

For any hit worth surfacing: use `slack_read_thread` to get enough context for a 2-line summary. **Always capture the Slack permalink URL** from search results — every signal in the final report must link to its source.

**Recency filter:** Only surface Slack messages from the last 14 days. Ignore older results unless they are the only evidence of a critical conflict. If using an older source, explicitly label it as historical.

**If Slack MCP is not available:** skip this step and note: *"Slack not connected — alignment report based on file state only. Connect Slack MCP for richer signal detection."*

---

## Step 5: Cross-check Documents

If Confluence MCP is available, search for pages linked to the anchor initiative modified in the past 14 days. Check local `Context/Document Hub/` for docs with upcoming deadlines but no recent edits. **Recency filter:** only reference documents modified within the last 3 months.

---

## Step 6: Synthesise the Alignment Report

The report has three sections. External alignment is the main event — it should take up most of the report. Internal alignment is brief context. Next actions close with specific moves.

**Total report length: 60 lines or fewer.** If a section has nothing real, omit it.

### Output format

```
## Alignment Report: [Anchor Initiative]
*[date] | Scanned: [sources used — Slack channels, Confluence, files]*

---

### Portfolio Context (max 3 bullets)
- [Anchor initiative] is [stage] — [one-line status + strategic fit to GOALS.md]
- [Key dependency or risk from own portfolio, if any]
- [Internal sequencing issue, if any]

---

### External Signals

**[Signal type: Adjacent Work / Duplication Risk / Conflict / Synergy / Company Shift]**
[2-line finding with named people, channels, dates.] [Source](permalink-URL)

**[Signal type]**
[2-line finding.] [Source](permalink-URL)

[Repeat for each finding — aim for 4-8 external signals. Every signal MUST have a source link.]

---

### Synthesis
*[One-sentence overall alignment health assessment]*

---

### Next Actions

1. **[Action verb] [who] [where]** — [what to say/do]. Draft: *"[suggested message text or first sentence]"*
2. **[Action verb] [who] [where]** — [what to say/do]. Draft: *"[suggested message text]"*
3. **[Action verb] [who] [where]** — [what to say/do].
```

**Format rules:**
- Every external signal MUST include a source link (Slack permalink, Confluence URL, or file path)
- Never use `- [ ]` checkbox syntax — use numbered action items with draft messages
- Never use the heading "Don't-Miss Checklist" — use "Next Actions"
- Portfolio Context is max 3 bullets — if nothing noteworthy internally, use 1 bullet
- External Signals section should be the longest section in the report

---

## Step 7: Deliver

1. Print the report in the terminal
2. Offer: *"Want me to send this as a Slack DM to yourself?"* — if yes, fetch user ID via `slack_search_users` and send via `slack_send_message`

---

## Step 8: Compound-on-Touch (silent)

After delivering, silently fix what you find: stale task statuses, missing `description`/`topics` frontmatter, and append recurring alignment patterns to `Context/Memory/learnings.md`.

---

## Behaviour Rules

- **External signals are the main event.** The report's primary value is surfacing what other teams, channels, and people are doing that affects the anchor initiative. Internal portfolio context is a brief preamble, not the focus.
- **Every claim needs a source link.** Slack permalinks, Confluence URLs, or file paths — inline, next to the claim. No unattributed statements about what other teams are doing.
- **Never hallucinate activity.** Only report what is observed in files, Slack, or Confluence. If a data source is unavailable, say so and narrow the report scope.
- **Recency matters.** Slack signals older than 14 days and documents older than 3 months are out of scope unless explicitly flagged as historical.
- **End with draft actions, not checklists.** The closing section must include specific people, channels, and suggested message text — not vague follow-up items with checkbox syntax.
- **Be direct and brief.** Total report under 60 lines. If a section has nothing real, omit it.
- **Respect existing skills.** Don't duplicate `/pulse` (broad org discovery), `/today` (daily planning), or `/slack-unactioned` (message triage). This skill answers: "Are my initiatives coherent with each other and with the broader company?"

---

## When to Run

- **Ad-hoc:** Before a strategy review, exec presentation, or quarterly planning session
- **Weekly:** Alongside `/pulse` on Monday mornings for a complete picture (pulse = what's happening out there; align = is my own house in order and connected to theirs)
- **Triggered:** When a new initiative is added, a major scope change happens, or a dependency is flagged as blocked
