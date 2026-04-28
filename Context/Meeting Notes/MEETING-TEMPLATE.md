# Meeting Note Template

Use this template when importing or creating meeting notes so they stay
compatible with the relationship graph and `/enrich`.

## YAML Frontmatter

```yaml
---
title: "[Meeting title]"
description: "[~150 chars — what changed or was decided]"
type: meeting-note
topics: ["topic-1", "topic-2"]
people: []      # optional; graph node ids from Context/Memory/graph.yaml
projects: []    # optional; graph node ids from Context/Memory/graph.yaml
channels: []    # optional; graph node ids from Context/Memory/graph.yaml
created_date: YYYY-MM-DD
---
```

## Body

```markdown
# [Meeting title]

## Attendees
- [Name]

## Key Decisions
- [Decision]

## Action Items
- [ ] [Action]

## Notes
[Discussion notes]
```

If the import tool cannot resolve graph node ids, leave `people`, `projects`,
and `channels` empty and fill them later with `/enrich`.
