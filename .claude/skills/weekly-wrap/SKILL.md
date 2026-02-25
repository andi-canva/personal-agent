---
name: weekly-wrap
description: "Weekly review + compound learnings — review progress, surface blockers, distill insights into Memory"
---

# Weekly Wrap

Run a structured weekly review, then distill the week's learnings into compounded knowledge that future sessions can reference.

## Instructions

When the user invokes `/weekly-wrap`, run through all 5 steps in sequence without waiting for prompts between them. Be concise and data-driven.

### Step 1: Review Completed Work

1. Read all task files in `Tasks/Done/` and `Tasks/` where `status: d`
2. Group completed tasks by which goal they support (reference `GOALS.md`)
3. Summarize:
   - Total tasks completed
   - Breakdown by goal alignment
   - Highlights (any P0/P1 completions)
   - Tasks completed that didn't align to any goal (flag these)

### Step 2: Check Goal Progress

1. Read `GOALS.md` — especially quarterly objectives and top 3 priorities
2. For each goal/objective, assess progress based on completed and remaining tasks
3. Present a table:

| Goal | Status | Notes |
|------|--------|-------|
| [goal] | :large_green_circle: / :yellow_circle: / :red_circle: | [what moved, what didn't] |

4. Call out any goal with zero task activity this week

### Step 3: Surface Blockers & Stalled Work

1. Scan `Tasks/` for `status: b` (blocked) — list each with how long it's been blocked
2. Scan for `status: s` (started) with no progress log entry in the last 7 days — flag as stalled
3. For each blocked/stalled item, suggest a concrete next step or follow-up question

### Step 4: Recommend Next Week's Focus

1. Based on goal gaps, blockers, and priority levels, suggest:
   - **Must do** (P0/P1): up to 3 items
   - **Should do** (P2): up to 3 items
   - **If time allows**: remaining items worth attention
2. Flag if the suggested plan doesn't cover all active goals
3. Ask: "Does this feel right, or should we adjust?"

### Step 5: Compound Learnings into Memory

This is the compounding step — distill the week into durable knowledge.

1. Review everything from Steps 1-4: completed work, goal progress, blockers, conversations in `Notes/`, and any new files in `Context/`
2. Read `Context/Memory/learnings.md` to understand what's already been captured — avoid repeating existing insights
3. Extract and distill:
   - **Insights**: What worked well this week? What didn't? Why?
   - **Patterns**: Any recurring themes across tasks, blockers, or decisions?
   - **Decisions**: Key choices made and the reasoning — so future sessions understand the "why"
   - **Principles**: If something keeps coming up, promote it to a reusable principle
4. Append a new dated section to `Context/Memory/learnings.md` with the distilled learnings
5. Keep entries **concise and actionable** — 3-7 bullet points max. This is a summary, not a journal. The goal is compounding knowledge without context bloat.
6. Present the learnings to the user before saving and ask: "Anything to add or adjust before I save this?"

### Compounding Principle

Each weekly wrap should make the next one better:
- Reference prior learnings when assessing this week ("Last week we learned X — did that hold up?")
- Promote repeated patterns into standing principles
- Prune or update stale learnings that no longer apply
- The learnings file should stay lean — if it grows past ~50 entries, suggest consolidating older entries into higher-level principles

## Output Format

Use clear headers for each step. Keep the whole review scannable — no walls of text. Use tables and bullet points. The learnings section should feel like a crisp executive summary, not meeting minutes.