---
name: today
description: Build a focused plan for today based on goals, tasks, and recent activity
---

# Today

Build a focused daily plan by combining goals, active tasks, and recent activity.

## Instructions

When the user invokes `/today`, run through all steps in sequence. Be concise and actionable.

### Step 1: Gather Context

1. Read `GOALS.md` — current priorities and focus areas
2. Scan `Tasks/` for active tasks (`status: s` or `status: n`) — note priorities and due dates
3. Check `Context/Memory/` for user preferences and working style
4. Scan `Notes/` for recent daily notes

### Step 2: Check Recent Activity

1. If connected tools are available (Slack, email, calendar), check for recent activity:
   - Unread messages or threads that need responses
   - Recently updated documents related to active projects
2. Surface anything that needs attention or has changed since the last session

### Step 3: Build the Daily Plan

1. Based on goals, task priorities, and recent activity, output:

   **Deep work** (1-3 blocks):
   - The most important items that need focused time
   - Tie each to a goal from GOALS.md

   **Quick wins** (3-5 items):
   - Small tasks that can be knocked out between meetings or in low-energy windows

   **Follow-ups**:
   - Anything surfaced from connected tools that needs a response or action

   **Heads up**:
   - Upcoming due dates, blocked tasks, or risks worth noting

2. Flag if the plan doesn't cover any active goal — suggest what's missing

### Step 4: Confirm

Ask: "Does this plan feel right for today, or should we adjust?"

## Output Format

Keep it scannable — short bullets, clear headers. No walls of text. The plan should fit on one screen.