---
name: plan-week
description: "Draft the weekly plan — top 3 priorities, meeting triage, daily pre-plans, risks, and success metrics. Run on Monday morning. Creates the week scratchpad that /today reads all week."
---

# Week Plan

Draft a forward-looking plan for the full week. This creates `Tasks/Week-YYYY-WNN.md` with all 5 days pre-populated so `/today` has a base to work from each morning. Run this on Monday (or Sunday evening).

## Instructions

Run all steps in sequence. Be decisive — make best-guess recommendations rather than asking repeatedly.

---

### Step 1: Load Context

1. Scan `Tasks/` root for all active tasks (`status: s` or `status: n`) — note priorities and any due dates
2. Scan `Tasks/Backlog/` and read files relevant to this week's priorities — for strategic context on active initiatives
3. Read last week's wrap if available (`Context/Progress Updates/Q[N]-YYYY Weekly Wraps/CW[XX-1].md`) — what carried forward, what's still unresolved
4. **Slack** — check for anything from the weekend or Friday that sets context for this week: decisions, escalations, urgent threads from key stakeholders and priority channels (configure these in GOALS.md or Context/Memory/)
5. **Google Calendar** (via Google Calendar MCP, if available):
   - Pull all events for this week (Monday–Friday): titles, attendees, times, descriptions
   - This feeds the meeting triage step — every meeting should appear in the triage table
   - If Google Calendar MCP is not available, ask: *"Paste your calendar for this week so I can triage meetings."*

---

### Step 2: Internal Analysis (not shown to user)

Now load the strategic lens and synthesize:

1. Read `GOALS.md` — quarterly objectives, top 3 priorities, priority framework
2. Read `Context/Memory/bias.md` — apply communication rules; load bias patterns for Step 3
3. Read `Context/Memory/learnings.md` — scan recent entries for patterns that should inform this week's plan (e.g., recurring blockers, drift from goals, process improvements)

With goals, bias, and learnings loaded against the raw context from Step 1, privately determine:

- What are the 3 highest-leverage things that could move this week? (tied to quarterly objectives)
- Which meetings are essential vs drainable? What can be dropped, shortened, or delegated?
- What's the single biggest risk to the week succeeding?
- What would "a good week" look like by Friday — in concrete, measurable terms?
- Are there any carry-forward items from last week that must be resolved?

---

### Step 3: Output the Weekly Plan

Present this to the user before writing the file:

```
# Week Plan CW[XX] — [DD–DD Mon YYYY]

## Top 3 Priorities
1. [Priority — which quarterly objective it advances — target outcome by Friday]
2. [Priority — which quarterly objective it advances — target outcome by Friday]
3. [Priority — which quarterly objective it advances — target outcome by Friday]

## Meeting Triage
| Meeting | Day | Time | Decision | Reason |
|---------|-----|------|----------|--------|
| [name + attendees] | Mon | 10:00 | Keep | [why it matters] |
| [name + attendees] | Tue | 14:00 | Delegate | [who takes it] |
| [name + attendees] | Wed | 11:00 | Drop | [why it's low value] |
| [name + attendees] | Thu | 09:00 | Defer | [defer to when] |

## Daily Focus
| Day | Main focus | Key output |
|-----|-----------|------------|
| Mon | [theme] | [deliverable] |
| Tue | [theme] | [deliverable] |
| Wed | [theme] | [deliverable] |
| Thu | [theme] | [deliverable] |
| Fri | [theme] | [deliverable or wrap prep] |

## Risks
- [Risk — who owns mitigation — trigger to escalate]

## Success looks like
- [Measurable outcome 1 by Friday]
- [Measurable outcome 2 by Friday]
- [Measurable outcome 3 by Friday]
```

Ask: *"Does this plan look right, or should we adjust before I write the week file?"*

Wait for confirmation or adjustments, then proceed to Step 4.

---

### Step 4: Write the Weekly Scratchpad File

Create `Tasks/Week-YYYY-WNN.md` (e.g. `Tasks/Week-2026-W11.md`).

If the file already exists for this week, **do not overwrite it** — inform the user and ask whether to replace or skip.

Use this structure — pre-populate all 5 days based on the confirmed plan:

```markdown
# Week [YYYY-WNN] — [DD–DD Mon YYYY]

## Week Overview

### Top 3 Priorities
1. [priority — goal ref]
2. [priority — goal ref]
3. [priority — goal ref]

### Carry-forwards
[Only include if items rolled from last week. Include weeks_rolling count so /today can detect stale items.]
- [ ] [item] — [weeks_rolling: N] — [original strategy → new strategy if changed]

### Risks
- [risk — mitigation]

### Success looks like
- [outcome by Friday]

---

## Monday, [DD Mon]

### Do Next
- [ ] [item from weekly plan — goal ref]
- [ ] [item from weekly plan — goal ref]

### Meeting Prep
_Filled in by /today_

### Follow-ups
_Filled in by /today_

### Log
_Outcomes, decisions, and notes from the day._

---

## Tuesday, [DD Mon]

### Do Next
- [ ] [item from weekly plan — goal ref]

### Meeting Prep
_Filled in by /today_

### Follow-ups
_Filled in by /today_

### Log
_..._

---

## Wednesday, [DD Mon]
[same 4-section structure: Do Next, Meeting Prep, Follow-ups, Log]

---

## Thursday, [DD Mon]
[same structure]

---

## Friday, [DD Mon]
[same structure — Friday Do Next should include: review week vs plan, prep /weekly-wrap inputs]

---
```

Confirm: *"Week file created → `Tasks/Week-YYYY-WNN.md`. Run `/today` each morning — it will read from this file and update your day's section."*

---

### Step 5: Kanban Sync & Compound-on-Touch (silent)

After saving the week file, silently do the following:

1. **Kanban sync** — `Weekly Kanban.md` has 4 columns: **Backlog → This Week → In Progress → Done**
   - Populate the "This Week" column with the week's top priorities (linked to task files where they exist)
   - Items already in "In Progress" that are part of this week's plan stay in "In Progress"
   - Items pulled from "Backlog" into this week move to "This Week" — **remove them from Backlog** (no item should appear in two columns)
   - Don't touch "Done" — that's managed by `/weekly-wrap`
   - **Dedup check:** before finishing, scan the entire board and remove any item that appears in more than one column (keep the most-advanced column: Done > In Progress > This Week > Backlog)

2. **Last week archival check** — if last week's `Tasks/Week-YYYY-WNN.md` still exists in Tasks/ root (not moved to Done/), move it to `Tasks/Done/`. The weekly-wrap should have done this, but catch it here as a safety net.

3. **Carry-forward cleanup** — if last week had tasks marked `status: s` that are now clearly done or abandoned, update their status
4. **Plan-vs-reality learning** — if last week's plan was significantly off (most items didn't happen, or the focus shifted entirely), append a one-liner to `Context/Memory/learnings.md`:
   ```
   ## [date]
   - [what drifted and why — e.g., "CW10 plan had 3 strategy items but week was consumed by incident response — build buffer for reactive work"]
   ```
5. **Missing metadata** — if any task file you read during planning lacks `description` or `topics`, add them now
6. **Index freshness** — if `Context/Memory/active-tasks.md` is >7 days old, regenerate it

Do NOT announce these fixes. Just do them.

---

## Output Format

The plan output fits on one screen. Tables over paragraphs. Decisive recommendations — no "you could consider" hedging. Flag the bias check only if something obvious stands out (e.g. week plan has no time for the top priority).
