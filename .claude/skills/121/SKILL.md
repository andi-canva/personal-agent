---
name: 121
description: "Prepare for a 1:1 — pull context from goals, meeting notes, Slack, and tasks to generate talking points"
---

# 1:1 Prep

Prepare focused talking points for a 1:1 meeting with a specific person.

## Instructions

When the user invokes `/121 [person name]`, run through all steps in sequence.

If no person name is provided, ask: "Who's the 1:1 with?"

### Step 1: Gather Context on This Person

1. Search `Context/Meeting Notes/` for recent notes mentioning this person
2. Search `Context/Document Hub/` for shared docs, PRDs, or projects involving them
3. Check `GOALS.md` — identify which goals this person is connected to (e.g., key relationships, team members, stakeholders)
4. Check `Context/Memory/` for any stored preferences or notes about working with this person
5. If connected tools are available (Slack, email), search for recent conversations with them

### Step 2: Review Your Recent Work

1. Scan `Tasks/` for active tasks this person is involved in or would care about
2. Check `Context/Progress Updates/` for the most recent weekly wrap — what moved, what's blocked
3. Note any updates, decisions, or completions worth sharing

### Step 3: Generate Talking Points

Output three sections:

**Updates to share:**
- Progress on shared projects or goals
- Decisions made that affect them
- Wins worth highlighting

**Questions to ask:**
- Follow-ups from previous conversations (pull from meeting notes)
- Blockers where they can help
- Input needed on active decisions

**Strategic topics:**
- Alignment checks on shared goals
- Career/development topics (if this is a direct report)
- Opportunities to explore together

### Step 4: Check for Open Loops

1. Search meeting notes for any action items assigned to you from previous 1:1s with this person
2. Flag anything unresolved — these should be addressed first

### Step 5: Confirm

Present the talking points and ask: "Anything you want to add or adjust before the meeting?"

## Output Format

Keep it to one screen. Use short bullets. Group by the three sections above. Flag open loops at the top if any exist.
