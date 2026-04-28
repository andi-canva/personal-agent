---
name: enrich
description: "Auto-generate or update description, type, topics, aliases, and graph-backed relationship fields for a file."
---

# Enrich

Add or update frontmatter metadata for a file to make it discoverable through progressive disclosure.

## Instructions

When the user invokes `/enrich [file]` or `/enrich` (no argument):

### If no argument provided

1. Run a quick scan: `rg -L --glob "*.md" --files-without-match "^description:" Tasks/ Context/Knowledge/ Context/`
2. Report how many files are missing descriptions
3. Suggest the 5 most important files to enrich (prioritize by recency and location: active tasks first, then knowledge, then meeting notes)
4. Ask: "Which files should I enrich?"

### If file argument provided

1. Read the file fully
2. Check existing frontmatter — what fields are present vs missing
3. Read `Context/Memory/graph.yaml` if it exists before proposing any relational metadata so you can resolve names against canonical node ids and aliases.
4. Auto-generate missing fields:

   **`description`** (~150 chars): A retrieval filter, not a summary. It answers "should I load this file?" Include what makes the content distinctive — mechanism, scope, or implication. Must differ meaningfully from the title.

   **`type`**: One of: task, prd, knowledge, meeting-note, decision-record, progress-update, learning, track, slice

   **`topics`**: 1-3 tags from the Topic Vocabulary:
   multi-agent, canva-ai, customer-experience, leadership, product-craft, strategy, voice-agent, localization, retention, team-cn

   **`maturity`** (knowledge files only): seedling | developing | evergreen

   **`aliases`** (canonical person / project pages only): shorthand or alternate names already used elsewhere in the workspace. Prefer `[]` over guessing.

   **`people` / `projects` / `channels`** (task and meeting-note files only): arrays of graph node ids from `Context/Memory/graph.yaml`
   - Only include ids that are explicit in the file or strongly implied by structured sections like attendees, DACI tables, or named Slack channels
   - Use snake_case graph node ids only
   - If a name does not resolve to an existing node, do **not** invent one silently. Surface it as an unresolved suggestion for the user to confirm.

5. Present the proposed frontmatter to the user:
   ```
   Proposed enrichment for [filename]:
   - description: "[generated description]"
   - type: [type]
   - topics: [topics]
   - aliases: [aliases if relevant]
   - people: [people ids if relevant]
   - projects: [project ids if relevant]
   - channels: [channel ids if relevant]
   ```
6. If any names were unresolved, list them under `Unresolved references:` and ask whether to add graph nodes or leave them out for now.
7. Ask: "Look good, or should I adjust anything?"
8. On confirmation, update the file's frontmatter (preserve all existing fields and content)

### Quality Checks

- Description must NOT just paraphrase the title — it should add mechanism, scope, or implication
- Description should help an agent choose THIS file over similar files on related topics
- Topics should use the canonical vocabulary, not free-form tags
- `people` / `projects` / `channels` must use graph node ids only — never display names
- Unresolved people, projects, or channels must be surfaced for confirmation rather than guessed

## Batch Mode

If the user says `/enrich batch [folder]`:
1. Find all files missing descriptions in that folder
2. Auto-generate frontmatter for each
3. Present as a summary table for review
4. Apply all on confirmation
