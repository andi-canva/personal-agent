---
name: 121
description: "Prepare for a 1:1 — pull context from goals, meeting notes, Slack, and tasks to generate talking points"
---

# 1:1 Prep

Prepare focused talking points for a 1:1 meeting with a specific person.

## Instructions

When the user invokes `/121 [person name]`, run through all steps in sequence.

If no person name is provided, ask: "Who's the 1:1 with?"

### Step 0: First-time Meeting Bootstrap

**Triggers when no `Context/121s/[Person Name].md` exists.** Run this before Step 1 to build context from scratch so talking points are grounded, not generic.

1. **Search Slack for the person** — use `slack_search_users` to find their user ID. Then read the DM channel: last 20 messages or past 30 days, whichever is fewer. Extract: topics discussed, open questions, commitments, tone of the relationship.
2. **Check calendar history** — search Google Calendar for previous meetings with this person (past 90 days). Note frequency, meeting titles, and any patterns (recurring vs. ad-hoc).
3. **Read the meeting invite** — check today's calendar event for this person. Read the description, note when the invite was created (recent creation = likely ad-hoc/specific request), and extract any linked docs or agenda items.
4. **Check shared channels** — search Slack for threads where both you and this person are active in the past 30 days. Surface shared projects or discussions.
5. **Synthesize** — from DM history + calendar + channels, determine: (a) likely reason for this meeting, (b) shared context/projects, (c) open threads or commitments, (d) relationship depth (frequent collaborator vs. first real conversation).
6. **Create the 121 doc** with `slack_user_id` and `slack_dm_channel` pre-populated from the Slack lookup. Then proceed to Step 1 which will now find the doc.

If Slack MCP is unavailable AND no calendar history exists, fall back to: "No DM or meeting history found. Open with: what's on your mind?"

### Step 1: Gather Context on This Person

1. Check `Context/121s/[Person Name].md` — if it exists, read the open loops and recent session log entries first (this is the richest source)
2. Search `Context/Meeting Notes/` for recent notes mentioning this person
3. Search `Context/Document Hub/` for shared docs, PRDs, or projects involving them
4. Check `GOALS.md` — identify which goals this person is connected to (e.g., key relationships, team members, stakeholders)
5. Check `Context/Memory/` for any stored preferences or notes about working with this person
6. If MCP tools are available, use the `slack_user_id`, `slack_dm_channel`, and `slack_canvas_id` from the frontmatter to directly fetch recent DMs and read/update the shared canvas — skip searching if these fields are populated. If any field is empty, search Slack to find it and backfill the frontmatter for next time.

### Step 2: Review Your Recent Work

1. Scan `Tasks/` for active tasks this person is involved in or would care about
2. Check `Context/Progress Updates/` for the most recent weekly wrap — what moved, what's blocked
3. Note any updates, decisions, or completions worth sharing

### Step 3: Check for Open Loops

1. Search meeting notes for any action items assigned to you from previous 1:1s with this person
2. Search Slack DMs for any unresolved threads or commitments
3. Flag anything unresolved — these go into the output

### Step 4: Generate Talking Points

Output a **flat list of max 5 bullets**. No sections, no headers. Pick the 5 highest-signal items across updates, questions, open loops, and strategic topics. Each bullet must be self-contained — the user will cherry-pick and copy-paste directly into their 1:1 doc. Lead with context, not naked questions.

### Step 5: Update Ongoing Person Doc

Maintain a running relationship doc at `Context/121s/[Person Name].md`. This accumulates context across sessions so future `/121` and `/today` runs start from a richer base.

**If the file doesn't exist**, create it:

```yaml
---
title: "121 — [Person Name]"
description: "[Role/team] — ongoing 1:1 relationship doc with talking points, decisions, and open loops"
type: knowledge
topics: ["leadership"]
created_date: YYYY-MM-DD
slack_user_id: "" # Their Slack user ID (e.g. U027T704S5N) — look up via slack_search_users
slack_dm_channel: "" # DM channel ID (e.g. D06RMTHAYU9) — found in Slack search results for DMs
slack_canvas_id: "" # Shared 121 canvas file ID (e.g. F06UNLHE7S6) — search for "121 [name]" canvases
---
```

```markdown
# 121 — [Person Name]

## Open Loops
_Unresolved items carried forward across sessions._

## Session Log
```

**On every run**, update the file:

1. **Open Loops section** — refresh: add new open loops from this session's "Close the loop" section, mark resolved ones as `[x]` with the date
2. **Session Log** — prepend a new entry (newest first):

```markdown
### YYYY-MM-DD

**Talking points generated:**
* [bullet from Discuss]
* [bullet from Ask]
* [bullet from Strategic]

**Outcomes:** _Filled in after the meeting by /today or manually._

**New open loops:**
- [ ] [item]
```

The "Outcomes" field starts empty — it gets filled when the user debriefs after the meeting, or when `/today` finds evidence in Slack/meeting notes the next day.

### Step 6: Confirm

Present the talking points and ask: "Anything to add or adjust?"

## Output Format

- **Max 5 bullets total.** Flat list, no section headers.
- Use `*` bullet style (not `-`) for copy-paste compatibility with Google Docs / Notion.
- Each bullet is one line with optional 4-space indented sub-bullet for context.
- The user will cherry-pick bullets, so each one should make sense standalone.
