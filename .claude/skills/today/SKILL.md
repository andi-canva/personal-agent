---
name: today
description: "Build a focused plan for today based on goals, tasks, and recent activity. Reads from the weekly plan if it exists and updates it."
---

# Today

Chief-of-staff morning briefing. Start from what actually happened — Slack, calendar, meeting outcomes — reconcile with the weekly plan, auto-check completed items, and surface the 3 things that matter today. Reduce manual work: if evidence says it's done, check it off.

## Instructions

Run all steps in sequence. Be concise. Fit the briefing on one screen.

---

### Step 1: Gather Context

Run MCP calls in parallel where possible. Use the current date to compute "yesterday" for all queries.

#### 1a. External signals

**Slack** (via Slack MCP):
- Search yesterday's messages in your priority channels (set these based on your team and projects)
- Search for DMs or mentions from your priority contacts (set these based on your key stakeholders)
- Extract: decisions made, questions awaiting response, FYIs that shift priorities
- If unavailable: *"Slack MCP not connected — paste highlights."*

**Google Calendar** (via Google Calendar MCP):
- Pull today's events: titles, attendees, times, descriptions
- Pull yesterday's events for cross-referencing
- If unavailable: *"Paste today's calendar."*

**Zoom** (via Zoom MCP):
- Check for recordings/transcripts from yesterday
- Extract action items and decisions
- If unavailable: check `Context/Meeting Notes/` for yesterday's notes

#### 1b. Task state

- Read `Context/Memory/active-tasks.md` for active tasks with priorities
- If a task appears in signals, read the full task file

---

### Step 2: Reconcile + Auto-complete

#### 2a. Find the weekly scratchpad

**Compute the ISO week using Bash.** Run `date +%G-W%V`. Do NOT calculate mentally.

Use the result to form filename: `Tasks/Week-[ISO-year-week].md`. Glob to confirm it exists. If no match, check ±1 week. Never create a new week file when one exists for the correct week.

If no weekly plan exists: note *"No week plan for W[XX] — run `/plan-week` Monday."* and build from task state + signals.

#### 2b. Auto-complete yesterday's items

For each unchecked `[ ]` item in yesterday's section, check evidence in this order:

1. **Calendar** — if the item references a meeting and that meeting appears on yesterday's calendar (not cancelled), mark `[x]` with `(calendar: held)`
2. **Slack** — search for keywords from the item in relevant DMs/channels. If the user sent a message confirming completion or the thread resolved, mark `[x]` with `(Slack: [channel])`
3. **Scratchpad context** — if a later section (Log, notes, decisions) mentions the item as done, mark `[x]` with `(scratchpad)`
4. **Zoom** — if meeting transcripts contain evidence of completion, mark `[x]`
5. **Uncertain** — partial evidence → mark `[?]` with `(likely done — confirm?)`
6. **No evidence** — leave as `[ ]`

**Write the auto-completed marks to the scratchpad immediately.** Don't wait for user confirmation — chief-of-staff mode. Show the results in the briefing so the user can correct if needed.

#### 2c. Extract today's base

- Read today's pre-planned section (if it exists) — `### Do Next` items are the starting base
- Identify new items from external signals not in the plan
- Roll forward genuinely incomplete items from yesterday (items left `[ ]` after auto-completion)

---

### Step 3: Prep Meetings

#### Classify

- **1:1** — 2 attendees, or title containing "1:1", "121", "catch up", or a person's name only
- **Normal meeting** — everything else

#### For each 1:1

**First check if `Context/121s/[Person Name].md` exists.**

**If it exists:** Run `/121` Steps 1–4 as normal (gather context, open loops, generate 4-section talking points, update the doc).

**If no 121 doc exists (first-time meeting):** Run the bootstrap before generating talking points:
1. Search Slack for the person → get user ID → read last 20 DMs (or 30 days, whichever is fewer)
2. Read the calendar event description and note when it was created (recent creation = ad-hoc request)
3. Search calendar for previous meetings with this person (past 90 days) for frequency/history
4. Synthesize the likely meeting topic from DM evidence + invite context
5. Generate talking points grounded in what you found — not generic "what prompted this?"
6. Create the 121 doc at `Context/121s/[Person Name].md` with `slack_user_id` and `slack_dm_channel` pre-populated

#### For each normal meeting

1. Check recent notes from the same recurring meeting in `Context/Meeting Notes/`
2. Check tasks and Slack for anything relevant to the agenda or attendees
3. Write **1 bullet**: a tangible action or perspective to bring. Frame as: `[action or perspective]`

---

### Step 4: Build the Plan

Construct from: **evidence from Step 1** + **weekly priorities** + **meeting prep from Step 3**. New signals override stale items.

#### Do Next — exactly 3 items

Pick 3 actions ranked by: urgency from external signals first, then priority field. Rules:
- **Action verbs only** — "Send VoiceAgent DMs", "Prep goal status narrative", not "VoiceAgent PRD"
- **No meetings** — meetings belong in Calendar + Prep, not here
- **No duplicates** — if an item is a meeting prep action, put it in Calendar + Prep instead
- Each item gets: why now + goal reference

#### Follow-ups

Threads from Slack needing response, action items from yesterday's meetings, comments awaiting input. Only include if not already covered by Do Next or Calendar Prep.

#### Carry-forward intervention (Stale section)

Check carry-forward items from the Week Overview section. Count how many weeks each item has been rolling (check `weeks_rolling` field, or count appearances across prior week files).

- **1–2 weeks**: normal. Include in Do Next if still a priority.
- **3+ weeks**: Intervention. Add a `### Stale` section to the briefing:
  - Name the item and weeks rolling
  - Label the bias pattern from bias.md Section C (e.g., "initiation without assertion")
  - Propose 3 options: (a) force it — block time/pair with someone/attach to a meeting, (b) descope — smallest possible action, (c) defer or drop with a note
- **5+ weeks**: Also append to `Context/Memory/learnings.md` under today's date.

#### Heads Up

1–2 bullets max: risks from week plan, calendar conflicts, due dates, blocked items.

---

### Step 5: Write the Daily Briefing

Before writing, read `Context/Memory/bias.md` Section B — apply communication rules to all output.

**Briefing format:**

```
## [Weekday, DD Mon] — Daily Briefing

### Overnight
[2-4 bullets: decisions, completions, new signals. Cite sources.]

### Checked off
[Only if items were auto-completed from yesterday]
- [x] [item] — [evidence]
- [?] [item] — likely done, confirm?

### Do Next
1. **[Action verb + item]** — [why now, goal ref]
2. **[Action verb + item]** — [why now, goal ref]
3. **[Action verb + item]** — [why now, goal ref]

### Calendar + Prep
| Time | Meeting | Prep |
|------|---------|------|
| HH:MM | [Name] (1:1) | see below |
| HH:MM | [Name] | [one-line action] |

[Flag conflicts, back-to-back stretches, deep work windows in a note above or below the table.]

**[Person] (HH:MM) — 1:1**
- Discuss: ...
- Ask: ...
- Strategic: ...
- Close the loop: ...

**[Meeting] (HH:MM)**
[One bullet: action or perspective]

### Follow-ups
- [Thread/action needing response]

### Stale
[Only if items rolling 3+ weeks exist]
- **[Item]** (N weeks) — [bias pattern]. Options: (a) ..., (b) ..., (c) ...

### Heads Up
- [1-2 bullets: risks, conflicts, due dates]

### Bias Check
[One sentence if a Section C pattern is visible. Omit if none.]
```

End with: *"Anything to adjust?"*

Omit any section that has no content (e.g., skip Stale if nothing is rolling 3+ weeks, skip Follow-ups if empty, skip Bias Check if no pattern visible).

---

### Step 6: Update the Weekly Scratchpad

Update `Tasks/Week-YYYY-WNN.md`:

**Yesterday's section:** Apply auto-completion marks from Step 2b (already written).

**Today's section — if it already exists (pre-planned by /plan-week):**
Fill in the remaining subsections under the existing day header. Don't duplicate content already in `### Do Next`.

**If today's section doesn't exist yet:**
Append:

```markdown
## [Weekday, DD Mon YYYY]

### Do Next
- [ ] [item — goal ref]
- [ ] [item — goal ref]
- [ ] [item — goal ref]

### Meeting Prep
_1:1s get full talking points; normal meetings get 1 action bullet._

### Follow-ups
- [ ] [item]

### Log
_Outcomes, decisions, and notes from the day._

---
```

**If no weekly plan file exists at all:**
Create `Tasks/Week-YYYY-WNN.md` with a minimal header and today's section only.

The file is a **living document** — never remove or reset checked items.

Confirm: *"Scratchpad updated → `Tasks/Week-YYYY-WNN.md`"*

---

### Step 7: Compound-on-Touch (silent)

After the briefing is delivered, silently fix what you find:

1. **Stale tasks** — `status: s` with evidence it's done → update to `d`, move to `Tasks/Done/`
2. **Missing metadata** — task files lacking `description` or `topics` → add them
3. **Recurring patterns** — same blocker 3+ days, or goal with zero focus → append one-liner to `Context/Memory/learnings.md`
4. **Index freshness** — if `Context/Memory/active-tasks.md` is >7 days old, regenerate it
5. **Carry-forward learnings** — items at 5+ weeks → append to learnings.md

Do NOT announce these fixes. Just do them.
