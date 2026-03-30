---
name: rebuild-indexes
description: "Regenerate all Context/Memory/ navigation index files by scanning the workspace. Run weekly or after major changes."
---

# Rebuild Indexes

Regenerate the auto-generated navigation files in `Context/Memory/` by scanning frontmatter across the workspace.

## Instructions

When the user invokes `/rebuild-indexes`, regenerate all 4 index files:

### Step 1: Generate `Context/Memory/active-tasks.md`

1. Scan all `.md` files in `Tasks/` (root and `Backlog/`) — exclude `Tasks/Done/`, `Tasks/Templates/`, `Tasks/README.md`
2. Extract from frontmatter: title, priority, status, description, topics
3. Sort by priority (P0 first), then alphabetically
4. Write as a markdown table with columns: Title, Priority, Status, Description, Topics
5. Add YAML frontmatter: `generated: [today's date]`, `type: index`

### Step 2: Generate `Context/Memory/by-topic.md`

1. Scan all `.md` files in `Tasks/`, `Context/Knowledge/`, `Context/` that have a `topics:` field
2. Group files by each topic tag
3. For each topic, list: `- **[filename]** — description`
4. Sort topics alphabetically

### Step 3: Generate `Context/Memory/by-type.md`

1. Scan all `.md` files with a `type:` field
2. Group by type value
3. For each type, list: `- **[filename]** — description`

### Step 4: Generate `Context/Memory/recent-changes.md`

1. Find files modified in the last 14 days in `Tasks/`, `Context/Knowledge/`, `Context/`
2. For each, show: filename, type, description (from frontmatter if available)
3. Sort by modification time (newest first)

### Step 5: Confirm

Report: "Indexes rebuilt. [X] files indexed across [Y] topics and [Z] types."

## How to Scan

Use ripgrep for speed:
- `rg "^description:" --glob "*.md"` to extract descriptions
- `rg "^topics:" --glob "*.md"` to extract topics
- `rg "^type:" --glob "*.md"` to extract types
- `rg "^priority:" --glob "*.md"` to extract priorities
- `rg "^status:" --glob "*.md"` to extract status
