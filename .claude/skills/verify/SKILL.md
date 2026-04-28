---
name: verify
description: "Check system health — metadata gaps, graph integrity, alias sync, and referential integrity."
---

# Verify

Run a health check on the personal-agent workspace and surface the issues most
likely to make future sessions less reliable.

## Instructions

When the user invokes `/verify`, run all checks and present a consolidated
report.

### Check 1: Missing Descriptions

Scan `Tasks/`, `Context/Meeting Notes/`, and `Context/Document Hub/` for `.md`
files without a `description:` field in frontmatter.

### Check 2: Link Health

If `.claude/skills/link-audit/SKILL.md` exists, use the same link-health logic
to identify broken links or disconnected active files. Summarise only the
highest-signal issues in the `/verify` output.

### Check 3: Graph Integrity

If `Context/Memory/graph.yaml` exists, validate:

- YAML parses and has top-level `nodes` and `edges`
- Every edge `source` / `target` resolves to a node
- Every edge `type` is in the allowed list documented in `graph.yaml`
- Every node `file:` pointer resolves to a real file

### Check 4: Graph Coverage

If `Context/Memory/graph.yaml` exists, check:

- Every file in `Context/121s/*.md` other than `TEMPLATE.md` has a matching
  `person` node with a `file:` pointer
- Any canonical project page that declares `aliases:` has a matching `project`
  or `initiative` node
- Isolated nodes (zero incident edges), split by:
  - has `file:`
  - no `file:`

### Check 5: Alias Sync

For graph nodes with `file:` pointers whose canonical page has an `aliases:`
frontmatter field, compare the page aliases to the graph aliases. Flag
mismatches.

### Check 6: Frontmatter Referential Integrity

Scan files with `people:`, `projects:`, or `channels:` arrays and ensure every
id resolves to an existing graph node of the right type:

- `people` -> `person`
- `projects` -> `project` or `initiative`
- `channels` -> `channel`

### Output Format

```text
## System Health Report — [date]

### Descriptions
- [X] files missing descriptions

### Links
- [X] broken links or disconnected active files

### Graph
- Summary: [X] nodes, [X] edges — YAML [OK/FAIL]
- Integrity: [X] missing endpoints, unknown edge types, broken file pointers
- Coverage: [X] canonical pages missing nodes; [X] isolated nodes
- Alias Sync: [X] page aliases drifting from graph aliases
- Referential Integrity: [X] invalid people/projects/channels ids

### Recommended Actions
1. Run `/enrich` on the top files missing descriptions or relationship metadata
2. Fix graph file pointers or alias mismatches before trusting structured lookups
3. Run `/link-audit` if the workspace still has disconnected docs or tasks
```

Ask: "Want me to fix any of these?"
