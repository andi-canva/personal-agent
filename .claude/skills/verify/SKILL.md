---
name: verify
description: "Check system health — missing descriptions, orphan files, stale domain index links, description quality. Adapted from arscontexta."
---

# Verify

Run a health check on the knowledge system to find gaps, stale links, and quality issues.

## Instructions

When the user invokes `/verify`, run all checks and present a consolidated report.

### Check 1: Missing Descriptions

Scan `Tasks/`, `Context/Knowledge/`, `Context/` for `.md` files without a `description:` field in frontmatter.

```
rg -L --glob "*.md" --files-without-match "^description:" Tasks/ Context/Knowledge/ Context/
```

Report count and list the top 10 most important (by recency or priority).

### Check 2: Missing Topics

Same scan but for files without `topics:` field.

### Check 3: Orphan Files

Files in `Context/Knowledge/` that are NOT referenced by any domain index (`Context/Memory/*.md` — the domain-specific indexes like `multi-agent-architecture.md`, `product-management-craft.md`, etc.). Read each index and extract all `[[wiki-links]]`, then compare against files that exist.

### Check 4: Stale Index Links

Check each domain index in `Context/Memory/` for `[[wiki-links]]` that point to files that no longer exist or have been moved.

### Check 5: Description Quality

Sample 10 random files that have descriptions. For each, check:
- Does the description just paraphrase the title? (Flag as "weak filter")
- Is the description under 50 chars? (Flag as "too short")
- Is the description over 200 chars? (Flag as "too long")

### Check 6: Index Freshness

Check `Context/Memory/active-tasks.md` frontmatter for `generated:` date. If older than 7 days, flag as stale.

### Output Format

```
## System Health Report — [date]

### Descriptions
- [X] files missing descriptions (out of [total])
- Top 10 to enrich: [list]

### Topics
- [X] files missing topics

### Orphan Files
- [X] knowledge files not in any domain index

### Stale Links
- [X] domain index links pointing to missing files

### Description Quality
- [X] weak filters (paraphrase title)
- [X] too short
- [X] too long

### Index Freshness
- Last rebuilt: [date] — [fresh/stale]

### Recommended Actions
1. Run `/enrich` on the top 10 files missing descriptions
2. Run `/rebuild-indexes` if indexes are stale
3. [Any other specific recommendations]
```

Ask: "Want me to fix any of these? I can run `/enrich` on the files missing descriptions."
