#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR" && git rev-parse --show-toplevel 2>/dev/null || cd "$SCRIPT_DIR/../../.." && pwd)"
TEMP_DIR=$(mktemp -d)

# Resolve install path from config.json or auto-detect
CONFIG_FILE="$SCRIPT_DIR/config.json"
LENNY_ROOT=""

if [ -f "$CONFIG_FILE" ]; then
    CONFIGURED=$(python3 -c "import json; print(json.load(open('$CONFIG_FILE')).get('lenny_root', 'auto'))" 2>/dev/null || echo "auto")
else
    CONFIGURED="auto"
fi

if [ "$CONFIGURED" = "auto" ]; then
    if [ -d "$REPO_ROOT/Context/Knowledge/Product" ]; then
        LENNY_ROOT="$REPO_ROOT/Context/Knowledge/Product/Lenny"
    elif [ -d "$REPO_ROOT/Context" ]; then
        LENNY_ROOT="$REPO_ROOT/Context/Knowledge/Product/Lenny"
    else
        LENNY_ROOT="$REPO_ROOT/Knowledge/Product/Lenny"
    fi
else
    LENNY_ROOT="$REPO_ROOT/$CONFIGURED"
fi

echo "=== Steelman Advice — Setup ==="
echo ""
echo "Install path: $LENNY_ROOT"
echo ""

if [ -d "$LENNY_ROOT/podcasts" ] && [ -d "$LENNY_ROOT/newsletters" ]; then
    PODCAST_COUNT=$(ls "$LENNY_ROOT/podcasts/"*.md 2>/dev/null | wc -l | tr -d ' ')
    NEWSLETTER_COUNT=$(ls "$LENNY_ROOT/newsletters/"*.md 2>/dev/null | wc -l | tr -d ' ')
    echo "Lenny's data already exists: $PODCAST_COUNT podcasts, $NEWSLETTER_COUNT newsletters"
    echo ""
    read -p "Re-download and overwrite? (y/N) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Keeping existing data. Done."
        exit 0
    fi
fi

echo "Downloading Lenny's free starter pack (50 podcasts, 10 newsletters)..."
echo ""

git clone --depth 1 https://github.com/LennysNewsletter/lennys-newsletterpodcastdata.git "$TEMP_DIR" 2>&1 | tail -1

mkdir -p "$LENNY_ROOT"
cp -r "$TEMP_DIR/podcasts" "$LENNY_ROOT/"
cp -r "$TEMP_DIR/newsletters" "$LENNY_ROOT/"
cp "$TEMP_DIR/index.json" "$LENNY_ROOT/"

rm -rf "$TEMP_DIR"

PODCAST_COUNT=$(ls "$LENNY_ROOT/podcasts/"*.md 2>/dev/null | wc -l | tr -d ' ')
NEWSLETTER_COUNT=$(ls "$LENNY_ROOT/newsletters/"*.md 2>/dev/null | wc -l | tr -d ' ')

echo ""
echo "Done! Installed to: $LENNY_ROOT"
echo "  $PODCAST_COUNT podcast transcripts"
echo "  $NEWSLETTER_COUNT newsletter posts"
echo ""
echo "=== Optional: Full archive ==="
echo ""
echo "The free pack includes 50 podcasts and 10 newsletters."
echo "Paid Lenny's subscribers can get 289 podcasts + 349 newsletters from:"
echo "  https://www.lennysdata.com/"
echo ""
echo "To use the full archive, download the ZIP and extract the podcasts/"
echo "and newsletters/ folders into: $LENNY_ROOT"
echo ""
echo "=== Configuration ==="
echo ""
echo "Edit config.json in the skill folder to:"
echo "  - Set a custom Lenny path (instead of auto-detect)"
echo "  - Point to your GOALS.md or company context file"
echo "  - Change the default review mode or challenge type"
echo ""
echo "Ready to use: /steelman-advice [your-doc]"
