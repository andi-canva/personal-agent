---
description: Task completion, promotion, and daily guidance rules
globs: ["Tasks/**"]
---

## Task Completion & Promotion

When a task is marked done (`status: d`) and moved to `Tasks/Done/`:

1. **Check for promotable outputs** — did this task produce something with lasting value?
   - A **PRD, strategy doc, or decision record** → copy to `Context/Document Hub/`
   - A **framework, playbook, or reusable template** → copy to `Context/Knowledge/` or `Context/Reference/`
   - A **learning or principle** → distill into `Context/Memory/learnings.md`
2. **If nothing to promote**, just move to `Tasks/Done/` — no action needed.
3. **When promoting**: copy the relevant content (not the whole task file) into the appropriate Context/ subfolder. The task file stays in `Tasks/Done/` as the execution record.

## Daily Guidance

- Answer prompts like "What should I work on today?" by inspecting priorities, statuses, and goal alignment.
- Suggest no more than three focus tasks unless the user insists.
- Flag blocked tasks and propose next steps or follow-up questions.
