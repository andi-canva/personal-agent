---
name: goal-alignment
description: Audit how well current tasks support goals and surface misalignment
---

# Goal Alignment Check

Audit how well current tasks support goals, and surface misalignment.

## Instructions

When the user invokes `/goal-alignment`, perform a full alignment audit:

### Step 1: Load Context

1. Read `GOALS.md` — extract all goals, quarterly objectives, and top priorities
2. Read all active task files in `Tasks/` (where `status` is `n` or `s`)

### Step 2: Map Tasks to Goals

For each active task, check its Context section for goal references. Build a mapping:

**Tasks supporting goals:**

| Goal / Objective | Tasks | Priority Range |
|-----------------|-------|----------------|
| [goal from GOALS.md] | [task names] | P0-P2 |

**Orphan tasks** (no goal alignment):
- List any task that doesn't reference a goal in its Context section
- For each, ask: "Should this tie to a goal, or should it be deprioritized?"

### Step 3: Find Goal Gaps

For each goal in `GOALS.md`, check if there are active tasks supporting it.

**Unsupported goals** (goals with zero active tasks):
- Flag these prominently
- Suggest: "Do you want to create a task for this, or has this goal shifted?"

### Step 4: Priority Sanity Check

- Flag any P0/P1 task that doesn't align to a quarterly objective
- Flag any quarterly objective that only has P2/P3 tasks supporting it
- Note if any single goal has too many tasks (>5) which may indicate it needs breaking down

### Step 5: Recommendations

Provide 2-3 actionable suggestions:
- Tasks to reprioritize
- Goals that need new tasks created
- Orphan tasks to either align or archive

## Output Format

Lead with a quick summary ("X of Y tasks are goal-aligned, Z goals have no active tasks"), then show the detailed tables and recommendations.