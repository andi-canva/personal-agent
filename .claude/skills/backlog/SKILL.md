---
name: backlog
description: "Triage the BACKLOG.md inbox — extract items, enrich with context, create task files, clear the backlog"
---

# Process Backlog

Triage the raw capture inbox (`BACKLOG.md`) into structured, goal-aligned task files.

## Instructions

When the user invokes `/backlog` (or says "clear my backlog", "process backlog", etc.), run through all steps in sequence.

### Step 1: Read the Backlog

1. Read `BACKLOG.md` and extract every actionable item
2. If the backlog is empty, tell the user and stop

### Step 2: Enrich with Context

1. For each item, **start with the relevant domain index** (`Context/Memory/*.md`) to understand existing knowledge on the topic
2. Search `Context/` and `Context/Knowledge/` for additional context — matching keywords, project names, or dates
3. Check `Context/Memory/` for user preferences that affect prioritization (e.g., standing priorities, delegation patterns)
4. Reference `GOALS.md` to identify which goal each item supports

### Step 3: Clarify Ambiguous Items

1. If any item lacks context, priority, or a clear next step — **stop and ask** the user for clarification before creating a task
2. Batch all clarification questions into a single prompt rather than asking one at a time
3. Suggest a best-guess priority and goal alignment for each unclear item so the user can confirm or correct

### Step 4: Deduplicate

1. Read existing task files in `Tasks/` (check titles and content)
2. Flag any backlog item that duplicates or overlaps with an existing task
3. For duplicates, suggest updating the existing task instead of creating a new one

### Step 5: Create Task Files

1. Create a new markdown file in `Tasks/` for each triaged item using this template:

```yaml
---
title: [Actionable task name]
description: "[~150 chars — retrieval filter for what makes this task distinctive]"
type: task
category: [technical|outreach|research|writing|content|admin|personal|other]
topics: ["multi-agent", "canva-ai"]  # from Topic Vocabulary in AGENTS.md
priority: [P0|P1|P2|P3]
status: n
created_date: [YYYY-MM-DD]
due_date: [YYYY-MM-DD]  # optional
resource_refs:
  - Context/relevant-file.md
---

# [Task name]

## Context
[Tie to goals — cite the specific heading or bullet from GOALS.md]

## Next Actions
- [ ] Step one
- [ ] Step two

## Progress Log
- YYYY-MM-DD: Created from backlog.
```

2. Each task **must** reference a goal in its Context section. If no goal fits, flag it and ask whether to create a new goal entry or clarify why the work matters.
3. Each task **must** have a `description` and `topics` field — follow the Discovery-First Principle.

### Step 6: Summarize and Clear

1. Present a concise summary table of all new/updated tasks:

| Task | Priority | Goal | Action |
|------|----------|------|--------|
| [name] | P1 | [goal ref] | Created / Updated existing |

2. Flag any items that don't align to a current goal
3. **Kanban sync**: For each new task, append a Kanban entry to `Weekly Kanban.md` under the "Backlog" column: `- [ ] [[Task Name]] — one-line summary #priority`
4. Ask: "Ready to clear the backlog?"
5. On confirmation, clear `BACKLOG.md` back to its default state:

```markdown
# Backlog

Drop raw notes or todos here. Say `/backlog` when you're ready for triage.
```

### Step 7: Compound-on-Touch (silent)

After processing and clearing the backlog:

1. **Recurring items** — if a similar item has appeared in the backlog 3+ times (check `Context/Memory/learnings.md` and prior task files), flag the pattern and suggest a standing task or process change. Append to learnings:
   ```
   ## [date]
   - [pattern — e.g., "Third time 'update stakeholders on X' appeared in backlog — consider a recurring weekly task"]
   ```
2. **Domain index gaps** — if a new task covers a topic not represented in any domain index (`Context/Memory/*.md`), note it. If 3+ tasks now exist for a topic without a domain index, suggest creating one.
3. **Index refresh** — regenerate `Context/Memory/active-tasks.md` since new tasks were just created

Do NOT announce these fixes. Just do them.

---

## Output Format

Keep it scannable — use the summary table, not walls of text. Batch all clarification questions into one round to avoid back-and-forth.
