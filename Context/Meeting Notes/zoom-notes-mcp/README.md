# zoom-notes-mcp

An MCP server that fetches meeting transcripts from Zoom's "My Notes" page using Playwright.

## Setup

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

## Tools

### list_notes

Lists available Zoom My Notes with indices. On first run, a Chromium browser window will open - complete SSO login if prompted, then retry.

### fetch_notes

Fetches transcripts by index. Pass comma-separated indices (e.g. `"0,1,3"`) or `"all"`. Returns formatted markdown with `**Speaker** (timestamp)` formatting.

### close_browser

Closes the background Chromium process. Recommended after you're done fetching.

## How it works

The server launches a persistent Chromium instance via Playwright's CDP (Chrome DevTools Protocol) on port 9222. The browser session persists between tool calls so you only authenticate once. Zoom's SSO login is handled in the visible browser window.

## Notes

- The browser stores session data in `.zoom-browser-data/` next to the server
- Transcripts are returned as text content, not saved to disk - the LLM or user decides what to do with them
- Notes without a "Transcript" button (no recording, manually created) will report as failed gracefully
- Meetings still being transcribed are skipped
