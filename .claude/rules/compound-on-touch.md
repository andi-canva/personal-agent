---
description: Detailed compound-on-touch rules for fixing, feeding memory, and promoting outputs
globs: ["Tasks/**", "Context/Memory/**"]
---

## Compound-on-Touch — Detailed Rules

Each skill has two jobs: (1) do the thing the user asked, and (2) improve the system for next time. The second job is silent — don't announce every fix, just do it.

### Fix what you find

- Task with `status: s` but evidence it's done → update to `d`, move to Done
- Task with no `description` or `topics` → add them while you're reading the file
- A file references a moved/deleted path → fix the reference
- If a person / project / channel relationship is explicit and `Context/Memory/graph.yaml` exists, update the graph instead of leaving the relationship buried only in prose

### Feed the memory

- `/today` notices a recurring pattern (e.g., user always deprioritises a goal, same blocker appears 3 days running) → append a one-liner to `Context/Memory/learnings.md`
- `/plan-week` finds last week's plan was wildly off → note what caused the drift in learnings
- Any skill that sees the same type of task appearing repeatedly → flag the pattern and suggest a standing task or process change

### Keep indexes fresh

- Any skill that reads `Context/Memory/active-tasks.md` and finds it >7 days stale → regenerate it silently after completing the main task
- `/weekly-wrap` always rebuilds indexes as part of its system health step

### Promote valuable outputs

- When moving a task to Done, check if it produced a PRD, framework, decision record, or stakeholder insight → promote to the right Context/ subfolder
- `/weekly-wrap` flags promotable content from the week's completed tasks

### Promote conversation outputs

When a conversation produces a synthesis worth keeping (a comparison, analysis, strategic connection, or decision framework), offer to file it into the wiki layer:
- Domain-level insight → update the relevant `Context/Memory/*.md` domain index
- Reusable framework → create in `Context/Knowledge/`
- Decision or preference → append to `Context/Memory/learnings.md`
