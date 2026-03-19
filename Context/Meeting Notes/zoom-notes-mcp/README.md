# zoom-notes-mcp

An MCP server that fetches meeting transcripts and notes from Zoom's "My Notes" (Zoom Docs). After a one-time browser login to capture your session token, it uses Zoom's API directly—no browser needed for subsequent calls.

## Simple Setup

Configures the MCP for **Claude Desktop**, **Claude Code CLI**, and **Cursor** in one run:

```bash
./setup-zoom-notes-mcp.sh
```

Or from another directory:

```bash
./setup-zoom-notes-mcp.sh /path/to/zoom-notes-mcp
```

The script will:

1. Run `npm install` and install Playwright Chromium
2. Add the server to Claude Desktop's config
3. Register the server with Claude Code CLI (user scope), if installed
4. Add the server to Cursor's `~/.cursor/mcp.json`

Restart Claude Desktop and Cursor after setup to pick up changes.

## Manual setup

```bash
npm install
npx playwright install chromium
```

## Usage with Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "zoom-notes": {
      "command": "node",
      "args": ["/absolute/path/to/zoom-notes-mcp/server.mjs"]
    }
  }
}
```

Restart Claude Desktop after updating the config.

## Usage with Cursor

The setup script writes to `~/.cursor/mcp.json`. To add manually, ensure the `zoom-notes` entry has:

- `command`: `"node"`
- `args`: `["/absolute/path/to/zoom-notes-mcp/server.mjs"]`

Restart Cursor after changing the config.

## Tools

### list_notes

Lists available Zoom My Notes. Supports date range and text search. On first use, a Chromium window may open—complete SSO login if prompted, then retry.

- **from** (optional): Start date filter (inclusive), `YYYY-MM-DD`, in your local timezone
- **to** (optional): End date filter (inclusive), `YYYY-MM-DD`, in your local timezone
- **query** (optional): Text search to filter notes by title
- **limit** (optional): Max notes to return (default 100, max 500)

Notes are listed by **name** (title). Use these exact names with the fetch/download tools.

### fetch_transcript

Fetches one note by **exact name**. Returns transcript and manual notes inline in the response. Use names from `list_notes`.

- **name**: Exact note title from `list_notes`

### fetch_transcripts

Fetches multiple notes by **exact names**, returned inline. Use names from `list_notes`.

- **names**: Array of note names, or `["all"]` to fetch every note

### download_transcript

Downloads one note’s transcript and notes to a file. Needs file system access (e.g. Claude Code or Cursor).

- **name**: Exact note title from `list_notes`
- **destination**: Absolute path for the markdown file

### download_transcripts

Downloads multiple notes to files. Names and destinations must match 1:1.

- **names**: Array of note names
- **destinations**: Array of absolute file paths (same length as `names`)

### close_browser

Closes the Zoom browser session used for initial auth. Use when you’re done to avoid leaving a background Chrome process.

## How it works

1. **First run**: The server starts a Chromium instance (CDP on port 9222), opens Zoom My Notes, and captures the bearer token from API traffic.
2. **After auth**: It uses Zoom’s API from Node (no browser). Your token is kept in memory until it expires or you call `close_browser`.
3. If you’re sent to login again (e.g. token expired), complete SSO in the browser and retry the tool.

## Notes

- Browser session data is stored in `.zoom-browser-data/` next to the server
- Transcripts and notes are returned as markdown: **Speaker** (timestamp) for transcript, plus manual notes when present
- Notes without a transcript (e.g. no recording) are reported as skipped or no content
- Meetings still being transcribed may have no transcript yet
