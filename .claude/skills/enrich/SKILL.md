---
name: enrich
description: "Auto-generate or update description, type, and topics for a file. The gradual enrichment tool for touching files as you use them."
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
3. Auto-generate missing fields:

   **`description`** (~150 chars): A retrieval filter, not a summary. It answers "should I load this file?" Include what makes the content distinctive — mechanism, scope, or implication. Must differ meaningfully from the title.

   **`type`**: One of: task, prd, knowledge, meeting-note, decision-record, progress-update, learning, track, slice

   **`topics`**: 1-3 tags from the Topic Vocabulary:
   multi-agent, canva-ai, customer-experience, leadership, product-craft, strategy, voice-agent, localization, retention, team-cn

   **`maturity`** (knowledge files only): seedling | developing | evergreen

4. Present the proposed frontmatter to the user:
   ```
   Proposed enrichment for [filename]:
   - description: "[generated description]"
   - type: [type]
   - topics: [topics]
   ```
5. Ask: "Look good, or should I adjust anything?"
6. On confirmation, update the file's frontmatter (preserve all existing fields and content)

### Quality Checks

- Description must NOT just paraphrase the title — it should add mechanism, scope, or implication
- Description should help an agent choose THIS file over similar files on related topics
- Topics should use the canonical vocabulary, not free-form tags

## Batch Mode

If the user says `/enrich batch [folder]`:
1. Find all files missing descriptions in that folder
2. Auto-generate frontmatter for each
3. Present as a summary table for review
4. Apply all on confirmation
