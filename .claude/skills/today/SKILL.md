---
name: today
description: "Build a focused plan for today based on goals, tasks, and recent activity. Reads from the weekly plan if it exists and updates it."
---

# Today

Build a focused daily plan by starting from what actually happened — Slack threads, Confluence changes, meeting outcomes — then reconciling with the weekly plan, and anchoring to goals at the end. The output is a daily briefing the user can confirm or adjust.

## Instructions

Run all steps in sequence. Be concise and actionable.

---

### Step 1: Gather Context (granular first)

Start from the most granular, real-time signals and work upward. Run MCP calls in parallel where possible.

#### 1a. External signals — what changed overnight

Pull signals from yesterday. Use the current date to compute "yesterday" for all queries.

**Slack** (via Slack MCP, if available):
- Search for messages from yesterday in priority channels: Help Assistant, AIHX, CanvaAI, mobile, CN team
- Search for DMs or mentions from priority contacts: Rob, John, Jay, Sophie, Dean, Otavio, Danne, Christine
- Extract: decisions made, questions awaiting response, FYIs that shift priorities
- If Slack MCP is not available, note: *"Slack MCP not connected — paste any important Slack highlights so I can factor them in."*

**Confluence** (via `user-mcp-atlassian`):
- `confluence_search` with CQL: `lastModified >= startOfDay("-1d") AND contributor = currentUser()` — pages the user touched yesterday
- `confluence_search` with CQL: `lastModified >= startOfDay("-1d")` scoped to key spaces (Help Assistant, AIHX, CanvaAI) — pages others changed that may affect priorities
- For any page with recent activity, call `confluence_get_comments` to surface new comments or feedback awaiting response

**Google Calendar** (via Google Calendar MCP, if available):
- Pull today's events: titles, attendees, times, descriptions
- Pull yesterday's events to cross-reference against action items
- Extract: meetings that need prep, time blocks available for deep work, back-to-back stretches to flag
- If Google Calendar MCP is not available, ask: *"Paste today's calendar so I can factor in meetings."*

**Zoom** (via Zoom MCP, if available):
- Check for recordings or transcripts from yesterday's meetings
- Extract: action items, decisions, follow-ups from meeting transcripts
- If Zoom MCP is not available, check `Context/Meeting Notes/` for manually added notes from yesterday

Compile a **"Since Yesterday"** digest from all sources: new decisions, open action items, threads needing response, and anything that shifts priorities.

#### 1b. Task state

- Read `Context/Memory/active-tasks.md` for all active tasks with priorities and descriptions
- If a task is referenced in the "Since Yesterday" digest, read the full task file for detail
- Skim `BACKLOG.md` — flag if new items appeared since last processing

---

### Step 2: Reconcile with the Weekly Plan

**FIRST: compute the current ISO week using Bash.** Run `date +%G-W%V` — this returns the exact ISO year-week string (e.g. `2026-W14`). Do NOT calculate the week number mentally. ISO week boundaries cause off-by-one errors, especially at the start of a week.

Use the Bash result to form the filename: `Tasks/Week-[ISO-year-week].md` (e.g. `Tasks/Week-2026-W14.md`).

**THEN: check whether it exists.** Use Glob to look for `Tasks/Week-[year]-W*.md`. If no file matches the computed week exactly, check if a file for a ±1 week is present — if so, flag it and confirm with the user before creating anything new. Never create a new week file when one already exists for the correct ISO week.

Check whether `Tasks/Week-YYYY-WNN.md` exists for the current ISO week.

**If the weekly plan exists:**

1. Read the full file — load top priorities, risks, success criteria, and all daily sections
2. Find **yesterday's section** — reconcile with the "Since Yesterday" digest:
   - Mark items as `[x]` where Slack/Confluence/Zoom evidence confirms completion
   - Add `(likely done — confirm?)` annotation to items that appear progressed but need user confirmation
   - Leave genuinely incomplete items as `[ ]`
3. Find **today's section** — extract the `### Planned` items as the starting base
4. Identify **new items** that emerged from external signals but aren't in today's plan yet
5. Roll forward incomplete items from yesterday with a `↩` prefix

**If no weekly plan exists:**
- Note at the top of output: *"No week plan found for W[XX] — run `/plan-week` on Monday to pre-plan the full week."*
- Build today's plan purely from task state + external signals + goals

---

### Step 3: Prep Meetings

For each meeting on today's calendar, classify and prepare.

#### Classify meetings

- **1:1** — 2 attendees, or title containing "1:1", "121", "catch up", or a person's name only.
- **Normal meeting** — everything else (standups, reviews, planning sessions, group syncs).

#### For each 1:1

Run the `/121` skill (Steps 1–4) for that person:
1. Gather context: meeting notes, Slack DMs, tasks, goals
2. Check for open loops from previous sessions
3. Generate the 4-section talking points (Discuss, Ask, Strategic, Close the loop)
4. Read and update the ongoing person doc at `Context/121s/[Person Name].md` (see `/121` skill for format)

Add the talking points to the daily briefing under the meeting entry, and write them into the weekly scratchpad under `### Meeting Prep`.

#### For each normal meeting

1. Search `Context/Meeting Notes/` for recent notes from the same recurring meeting or topic
2. Check tasks and Slack for anything relevant to the meeting's agenda or attendees
3. Write **1 bullet**: a tangible action the user can take or a specific perspective they can bring. Frame as: `[Meeting name]: [action or perspective]`

Add the bullet to the daily briefing and write it into the weekly scratchpad under `### Meeting Prep`.

---

### Step 4: Build the Daily Plan

Construct the plan from: **evidence from Step 1** (what's actually happening) + **weekly plan priorities** (what was planned) + **meeting prep from Step 3**. New signals override stale plan items.

**Surface exactly 3 focus items** (deep work + quick wins combined). Pick by: urgency from external signals first, then priority field. Do not list extras.

**Deep work** (focused blocks):
- The most important items needing concentrated time
- Tie each to a weekly priority where relevant

**Quick wins** (low-energy windows):
- Small tasks that round out the 3 total

**Follow-ups**:
- Threads from Slack/Confluence needing a response
- Action items from yesterday's meetings
- Comments or reviews awaiting input

**Heads up**:
- Risks from the week plan relevant today
- Upcoming due dates or blocked items

---

### Step 5: Write the Daily Briefing

This is the output the user sees. Before writing, load the communication style:

1. Read `Context/Memory/bias.md` — apply **Section B** rules to all output (lead with data/outcomes, use tables and bullet trees, stay present-focused, skip emotional framing)
2. Read `Context/Memory/` for any other preferences that affect planning

**Briefing structure:**

```
## Daily Briefing — [Weekday, DD Mon]

### Since Yesterday
[2-4 bullet digest: key decisions, completed items, new signals from Slack/Confluence/meetings. Cite sources.]

### Today's Calendar
[List today's meetings with times, attendees, and prep needed. Flag back-to-back stretches and available deep work windows.]

For each meeting, include prep:
- **1:1s** — show the 4-section talking points (Discuss, Ask, Strategic, Close the loop) inline under the meeting entry
- **Normal meetings** — show the 1-bullet action/perspective under the meeting entry

### Today's Focus (3 items)
1. **[Item]** — [why now, goal ref]
2. **[Item]** — [why now, goal ref]
3. **[Item]** — [why now, goal ref]

### Follow-ups
- [Thread/comment/action item needing response]

### Heads Up
- [Risks, due dates, blockers]

### Bias Check
[If a pattern from bias.md Section C is visible in the day's shape, name it in one sentence. If none, omit this section.]
```

End with: *"Does this plan feel right, or should we adjust?"*

If the user gives feedback, adjust the plan and re-present. Repeat until confirmed.

---

### Step 6: Update the Weekly Scratchpad

After the user confirms (or on first pass if no objections), update `Tasks/Week-YYYY-WNN.md`.

**Yesterday's section:**
- Apply the `[x]` marks and annotations from Step 2

**Today's section — if it already has a `### Planned` block:**
- Fill in `### Deep Work`, `### Quick Wins`, and `### Follow-ups` under the existing entry — do not duplicate the day header or Planned section

**If today's section doesn't exist yet:**
- Append a full new dated section:

```markdown
## [Weekday, DD Mon YYYY]

### Planned
- [ ] [item — goal/priority ref]

### Deep Work
- [ ] [item — goal reference]

### Quick Wins
- [ ] [item]

### Follow-ups
- [ ] [item]

### Meeting Prep
_Prep generated by /today Step 3. 1:1s get full talking points; normal meetings get 1 action/perspective bullet._

### Meetings today
_[Meeting name] with [names] — [outcome]_

### Decisions & context
_Decisions made today: what, by whom, why._

### Blockers
_What stopped progress — owner + unblocking action._

### Notes
_Free-form._

---
```

**If no weekly plan file exists at all:**
- Create `Tasks/Week-YYYY-WNN.md` with a minimal header and today's section only (no full week pre-plan — that's `/plan-week`'s job)

The file is a **living document** — never remove or reset checked items.

Confirm: *"Weekly scratchpad updated → `Tasks/Week-YYYY-WNN.md`"*

---

### Step 7: Compound-on-Touch (silent)

After the main output is delivered, silently fix what you found:

1. **Stale tasks** — if any task read during planning has `status: s` but evidence shows it's done (checked off in scratchpad, confirmed in Slack/Confluence), update its status to `d` and move to `Tasks/Done/`
2. **Missing metadata** — if any task file you read lacks `description` or `topics`, add them now
3. **Recurring patterns** — if you notice the same blocker appearing 3+ days, or a goal consistently getting zero focus, append a one-liner to `Context/Memory/learnings.md`:
   ```
   ## [date]
   - [pattern observed — e.g., "Goal X has had no focus for 5 consecutive /today runs"]
   ```
4. **Index freshness** — if `Context/Memory/active-tasks.md` is >7 days old, regenerate it after completing the briefing

Do NOT announce these fixes in the briefing. Just do them.

---

## Output Format

Scannable — short bullets, clear headers, tables where useful. Briefing fits on one screen. No walls of text.
