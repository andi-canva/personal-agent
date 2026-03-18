#!/usr/bin/env bash
# ============================================================
# setup-zoom-notes-mcp.sh
# Installs the zoom-notes MCP for Claude Desktop, Claude Code,
# and Cursor in one shot.
# Usage:  ./setup-zoom-notes-mcp.sh
# or    : ./setup-zoom-notes-mcp.sh /path/to/zoom-notes-mcp
# ============================================================

set -euo pipefail

# ── Colours ─────────────────────────────────────────────────
GREEN='\033[0;32m'; YELLOW='\033[1;33m'; RED='\033[0;31m'; NC='\033[0m'
ok()   { echo -e "${GREEN}✔ $*${NC}"; }
warn() { echo -e "${YELLOW}⚠ $*${NC}"; }
fail() { echo -e "${RED}✖ $*${NC}"; exit 1; }

# ── Resolve path ────────────────────────────────────────────
if [ $# -eq 0 ]; then
  MCP_DIR="$(dirname $0)"
else
  MCP_DIR="$1"
fi

MCP_DIR="${MCP_DIR/#\~/$HOME}"               # expand leading ~
MCP_DIR="$(cd "$MCP_DIR" && pwd)"            # canonicalise
SERVER="$MCP_DIR/server.mjs"

[ -d "$MCP_DIR" ]  || fail "Directory not found: $MCP_DIR"
[ -f "$SERVER"  ]  || fail "server.mjs not found in $MCP_DIR"

echo ""
echo "📦 zoom-notes-mcp setup"
echo "   Path: $MCP_DIR"
echo ""

# ── 1. npm install ───────────────────────────────────────────
echo "→ Installing npm dependencies…"
(cd "$MCP_DIR" && npm install --silent) && ok "npm install complete"

# ── 2. Playwright ────────────────────────────────────────────
echo "→ Installing Playwright Chromium…"
(cd "$MCP_DIR" && npx playwright install chromium) && ok "Playwright Chromium installed"

# ── Helper: merge mcpServers into a JSON config file ─────────
# Uses Python (always available on macOS) to safely merge JSON.
merge_mcp_config() {
  local config_file="$1"
  local mcp_name="$2"
  local mcp_command="$3"
  local mcp_arg="$4"

  mkdir -p "$(dirname "$config_file")"

  # If file doesn't exist, seed it with an empty object
  [ -f "$config_file" ] || echo '{}' > "$config_file"

  python3 - "$config_file" "$mcp_name" "$mcp_command" "$mcp_arg" <<'PYEOF'
import sys, json

config_file, mcp_name, mcp_command, mcp_arg = sys.argv[1:]

with open(config_file, 'r') as f:
  data = json.load(f)

data.setdefault('mcpServers', {})[mcp_name] = {
  "command": mcp_command,
  "args": [mcp_arg]
}

with open(config_file, 'w') as f:
  json.dump(data, f, indent=2)
  f.write('\n')
PYEOF
}

# ── 3. Claude Desktop ────────────────────────────────────────
echo "→ Configuring Claude Desktop…"
CLAUDE_DESKTOP_CONFIG="$HOME/Library/Application Support/Claude/claude_desktop_config.json"
merge_mcp_config "$CLAUDE_DESKTOP_CONFIG" "zoom-notes" "node" "$SERVER"
ok "Claude Desktop config updated: $CLAUDE_DESKTOP_CONFIG"

# ── 4. Claude Code CLI ───────────────────────────────────────
echo "→ Configuring Claude Code CLI…"
if command -v claude &>/dev/null; then
  # Remove any existing entry first to avoid duplicates
  claude mcp remove zoom-notes --scope user 2>/dev/null || true
  claude mcp add --scope user zoom-notes node "$SERVER"
  ok "Claude Code MCP added (user scope)"
else
  warn "Claude Code CLI not found — skipping (install from https://claude.ai/download)"
fi

# ── 5. Cursor ────────────────────────────────────────────────
echo "→ Configuring Cursor…"
CURSOR_CONFIG="$HOME/.cursor/mcp.json"
merge_mcp_config "$CURSOR_CONFIG" "zoom-notes" "node" "$SERVER"
ok "Cursor config updated: $CURSOR_CONFIG"

# ── Done ─────────────────────────────────────────────────────
echo ""
echo -e "${GREEN}🎉 All done! zoom-notes MCP is configured for:${NC}"
echo "   • Claude Desktop  →  restart the app to pick up changes"
echo "   • Claude Code CLI →  available in all new sessions"
echo "   • Cursor          →  restart Cursor to pick up changes"
echo ""
echo "Try asking: \"Can you give me my most recent Zoom transcript?\""
echo ""
