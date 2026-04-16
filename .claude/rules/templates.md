---
description: File templates for tasks, knowledge files, and meeting notes
globs: ["Tasks/**", "Context/**", "Notes/**"]
---

## Task Template

```yaml
---
title: [Actionable task name]
description: "[~150 chars — what makes this task distinctive and findable]"
type: task
category: [technical|outreach|research|writing|content|admin|personal|other]
topics: ["topic-1", "topic-2"]  # from topic vocabulary
priority: [P0|P1|P2|P3]
status: n  # n=not_started (s=started, b=blocked, d=done)
created_date: [YYYY-MM-DD]
due_date: [YYYY-MM-DD]  # optional
resource_refs:
  - Context/example.md
---

# [Task name]

## Context
Tie to goals and reference material.

## Next Actions
- [ ] Step one
- [ ] Step two

## Progress Log
- YYYY-MM-DD: Notes, blockers, decisions.
```

## Knowledge File Template

```yaml
---
title: [Descriptive name]
description: "[~150 chars — what insight or framework this captures and why it matters]"
type: knowledge
topics: ["strategy", "product-craft"]
maturity: seedling  # seedling | developing | evergreen
created_date: [YYYY-MM-DD]
resource_refs: []
---

# [Title]

[Content]
```

## Meeting Note Template

```yaml
---
title: [Meeting name — attendees or topic]
description: "[~150 chars — key decisions or outcomes from this meeting]"
type: meeting-note
topics: ["topic-1", "topic-2"]
created_date: [YYYY-MM-DD]
---

# [Meeting name]

## Attendees
## Key Decisions
## Action Items
## Notes
```
