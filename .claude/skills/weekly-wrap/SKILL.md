---
name: weekly-wrap
description: "Weekly review + compound learnings — review progress, surface blockers, distill insights into Memory"
---

# Weekly Wrap

Run a structured weekly review, produce a shareable status update, then distill learnings into compounded knowledge.

## Instructions

When the user invokes `/weekly-wrap`, run all steps in sequence **without waiting for prompts between them**. Produce the final shareable update, learnings, and next-week focus in a single pass. Save everything, then confirm.

**Do NOT stop to ask for confirmation between steps.** The user will correct anything after seeing the full output.

---

### Step 1: Gather the Week's Raw Material

Pull everything from the target week before synthesising anything.

1. **Weekly scratchpad** — read `Tasks/Week-YYYY-WNN.md` (ISO week number, e.g. `Tasks/Week-2026-W11.md`)
   - Count ticked `[x]` vs unticked `[ ]` items across all daily sections (check `### Do Next` and `### Follow-ups` sections; for older weeks also check `### Planned`, `### Deep Work`, `### Quick Wins`)
   - Extract notes, decisions, and meeting outcomes from `### Log` sections (for older weeks also check `### Decisions & context`, `### Blockers`, `### Notes`)
   - Note which days had entries
2. **Meeting notes** — scan `Context/Meeting Notes/` for files dated this week
   - Extract: attendee names, decisions made, action items with owners, blockers raised
3. **Task files** — read `Tasks/` root for `status: d` (done this week) and `status: b` (blocked)
   - Also scan `Tasks/Backlog/` to assess initiative-level progress beyond individual task completions — flag any track that has had no slice activity this week
   - Also flag `status: s` with no progress log entry in the last 7 days (stalled)
4. **Goals** — read `GOALS.md` for quarterly objectives and top 3 priorities
5. **Prior wrap** — read the most recent file in `Context/Progress Updates/Q[N]-YYYY Weekly Wraps/` to compare trajectory (determine the correct quarterly folder from today's date: Q1 = Jan–Mar, Q2 = Apr–Jun, Q3 = Jul–Sep, Q4 = Oct–Dec)
6. **Slack** — if Slack MCP tools are available, pull the week's biggest activity:
   - Search DMs and key channels for messages involving your name, team, or active initiatives
   - Look for: decisions in threads, action items, blockers, escalations, announcements
   - Channels to prioritise: your key team channels and DMs from priority stakeholders (configure in GOALS.md or Context/Memory/)
   - If Slack MCP tools are unavailable, note this and proceed — don't block the wrap
7. **Project tracker / Confluence** — if MCP tools are available, check for status changes on key initiatives. If unavailable, skip.

---

### Step 2: Internal Review (not shown to user)

Before writing the status update, do this analysis privately. **All names, bias labels, scratchpad metrics, and detailed breakdowns stay in this step — they NEVER appear in the shareable portion (Step 3).**

- Map completed work to goals — which goals moved, which didn't
- Identify the 4-6 most significant things that happened (decisions, deliverables, meetings, shifts)
- List every blocker and stalled item with owner and how long it's been stuck
- Pull specific names from meeting notes for action items (for internal sections only)
- Check against `Context/Memory/bias.md` Section C — did any bias pattern show up this week? (for learnings only, never in shareable)
- Note product metrics: ticket volumes, SRR, CSAT, experiment results (these DO belong in shareable)

---

### Step 3: Write the Weekly Status Update

**Produce ONLY the short, shareable version directly.** No long draft first. Hard limit: 250 words max for the shareable portion. This is sent to your manager — write it like a Slack message to them, not a report filed into a system.

Use this structure:

```
# Weekly Wrap CW[XX] — [DD–DD Mon YYYY]

**TL;DR:**
[2-3 sentences. Start with what happened, not a hype adjective. Keep problems for "On my mind". Positive but honest.]

## Update this week (selection)
- [Thing that moved, why it matters. Use accurate verbs (drafted/decided/kicked off, not shipped/approved).]
- [Combine related items. Include product metrics when available (ticket reduction %, CSAT, experiment results).]
- [Include one "strong take": an opinionated position on something you care about, not just status.]
(4-5 bullets max. ~25 words per bullet. Vary sentence structure, don't put an em-dash after every bold phrase.)

## On my mind the coming weeks
- [Strategic tension or question you're working through — not a to-do item]
- [Open question for the reader, if relevant — "keen to get your take on X"]
- [Risk or dependency you're watching]
(2-4 bullets. Reflective, not tactical. No specific dates or task names. Use "I" voice. Include asks when you need input.)
```

#### Voice rules

**This reads like a message to your manager, not a status report.**
- Conversational, direct — as if you're catching them up over coffee or in a Slack DM
- Address the reader when relevant: "per your suggestion last week", "keen to discuss in our 121", "would love your take on this"
- Show personality — excitement ("really promising"), concern ("worried about"), genuine curiosity ("wondering if")
- Include **asks** when you need input: "would appreciate your steer on X", "flagging for your awareness"
- At least one bullet should be a **"strong take"** — an opinionated position, not just facts: "Strong take: evals is the most important AI skill in 2025" or "I think the root cause is X, not Y"
- Use accurate verbs: "drafted", "kicked off", "exploring" — NEVER "shipped", "approved", "finalized" unless truly done
- Include real **product metrics** when available: ticket reduction %, SRR, CSAT, experiment hit rates
- Add context that explains WHY something matters, not just WHAT happened

#### Absolute rules for the shareable portion

1. **NEVER use individual names.** No "shared with Sally", "aligned with Kerry", "Simone session". Use roles, teams, or unnamed references: "shared with design leads", "aligned with the team", "got positive signals from leadership". Names belong ONLY in the internal sections (Status Check, CW Focus).
2. **NEVER include internal system metrics** — scratchpad completion rates, avoidance pattern counts, bounded time blocks, bias labels. These are your private productivity tools, not reader-facing content.
3. **NEVER include goal tags** like "— Goal: AIRR" in the shareable portion. Save for internal Status Check.
4. **NEVER write a changelog.** Don't list completed items. Tell the story of what moved and why it matters.

**Exclude:**
- Leadership philosophy or culture musings
- Long-term strategic hypotheticals
- Generic process improvements without a concrete owner
- Corporate jargon: "landed", "big calls", "key wins", "driving", "leveraging", "synergies", "key opportunity", "critical milestone", "significant progress", "major breakthrough", "major unlock", "emerged as a concrete integration opportunity"
- **Salesy/hype openers** in TL;DR: "Strong finish", "Great week", "Productive week", "Big progress". Just start with what happened.
- **Em-dash overuse**: don't put an em-dash after every bold phrase. Vary sentence structure. Use periods, colons, or just continue the sentence naturally.
- Implementation details the reader doesn't need: "reframed around X, dropped Y rationale, added Z context"

**Good example (target this voice):**

```
# Weekly Wrap CW21 — 19–23 May 2025

**TL;DR:**
Strategy playbacks went well with founders, positive signals on H2 direction. LLM eval goal moving with first vendor sessions done. Free user support showing early wins at 25% rollout.

## Update this week (selection)
- Strategy reviews done, positive feedback on H2 direction, no big concerns from leadership
- Had first sessions with two LLM eval vendors. Cost model and integration depth are the key tradeoffs. I regret not doing this earlier, it looks very promising
- All-hands presented H2 roadmap to 60+ attendees, good energy and alignment
- Free user support ramped to 25%, seeing 6K fewer tickets/month while CSAT holds stable

## On my mind the coming weeks
- AI Help integration needs to kick off cleanly while I'm away. Want to make sure handover is tight
- Ops restructure feels like it's being done to the team rather than with them. I think the root cause is centralised control, not collaboration structure. Keen to discuss
- LLM eval tool decision coming up. Leaning toward one vendor but want to validate cost model first
```

**Bad example (what NOT to produce — every line violates a rule):**

```
# Weekly Wrap CW12 — 16–20 Mar 2026

**TL;DR:**
Strong finish — all 4 top priorities shipped by Friday. CN AI proposal rewrite
broke a 3-week avoidance pattern with a bounded 90min block. Scratchpad
completion jumped from 17% to 52%.
[❌ Internal metrics. ❌ Avoidance/bias language. ❌ Changelog tone.]

## What happened
- Quarterly review first cut shared with design leads — synthesises key metric
  trajectory, bypass impact, retention findings
  [❌ Names 3 people. ❌ Implementation detail.]
- Initiative rewrite completed — reframed around core leverage, 3 weeks of
  rolling finally broken with a bounded 90min block
  [❌ Names nobody but explains the recipe. ❌ Internal avoidance tracking.]
- Operating model aligned — session (Mar 18) set ownership pairs, staged
  lifecycle, 8-week cycles
  [❌ Names person. ❌ Date in shareable.]

## On my mind the coming weeks
- I want to get the initiative proposal to leadership before the quarter ends
  [❌ Names the manager. ❌ This is a task, not a tension.]
```

---

### Step 4: Write the Full Wrap (internal detail, appended below the shareable update)

This section is internal — **names, goal tags, and detailed breakdowns are OK here** (this is where they belong, not in the shareable portion above). After the shareable update, append these sections for the saved wrap file:

```
## Status Check
Track the **team goals from your project tracker**, not personal objectives. These are the goals your team owns.

| Team Goal | Owner | Status | Notes |
|-----------|-------|--------|-------|
| [Goal name] | [Owner] | ✅ / ⚠️ / 🔴 / ⏸️ | [short note on progress or blocker] |

## CW[XX+1] Focus

**Must do:**
1. [item] — Goal: [which goal]
2. ...

**Should do:**
1. [item]
2. ...

**Watch:**
- [anything at risk]

## Learnings (saved to Memory)
- [Single sentence per learning. No elaboration. Pattern or insight in ~15 words max.]
- [Example: "Bounded time blocks break avoidance — 90min cap shipped the CN AI rewrite."]
- [3-5 learnings total]
```

Flag if any active quarterly objective has had zero activity two weeks running.

---

### Step 5: Compound Learnings into Memory

Distill the week into durable knowledge for future sessions.

1. Read `Context/Memory/learnings.md` — avoid repeating what's already captured
2. Extract 3-5 learnings as **single sentences** (~15 words each):
   - Insight, pattern, or bias flag — no elaboration, no multi-sentence explanations
   - Format: "[Pattern/insight] — [concrete example or evidence in same sentence]"
   - If something keeps recurring across multiple wraps, promote it to a standing principle
3. **Save directly** — append a new dated section to `Context/Memory/learnings.md` (3–5 bullets max)
4. Do NOT ask for confirmation — save and show what was added in the output

### Compounding Principle

Each wrap should make the next one better:
- Reference prior learnings when assessing this week
- Promote repeated patterns into standing principles
- Prune stale learnings that no longer apply
- If `learnings.md` grows past ~50 entries, suggest consolidating into higher-level principles

---

### Step 6: Week Archival & Kanban Sync

1. Run a quick internal check (do NOT include in wrap output — this is housekeeping, not reader-facing):
   - Count active task files (Tasks/ root, not Done/) missing `description` field
   - Check if `Context/Memory/active-tasks.md` is older than 7 days
   - If `Context/Memory/graph.yaml` exists, capture node / edge counts and note stale or orphaned graph entries

2. **Archive the week file:**
   - Move `Tasks/Week-YYYY-WNN.md` to `Tasks/Done/Week-YYYY-WNN.md`
   - This keeps the Tasks/ root clean — only active week files live there

3. **Carry-forward tasks:**
   - Check the week file's "Deferred" / "Carry-forward" sections for uncompleted items
   - These get picked up by `/plan-week` when the next week is planned
   - If any task has rolled 3+ weeks without progress, flag it explicitly in the wrap output

4. **Kanban sync** — `Weekly Kanban.md` has 4 columns: **Backlog → This Week → In Progress → Done**
   - Move completed tasks (`status: d`) to "Done" column, mark with `[x]` — **remove them from their source column** (In Progress, This Week, or Backlog)
   - Move items that were "This Week" but didn't complete back to "Backlog" or "In Progress" as appropriate — **remove from "This Week"**
   - Clear the "This Week" column (it gets repopulated by `/plan-week`)
   - Add the closed week file to "Done": `- [x] [[Week-YYYY-WNN]] — CW[XX] closed ([summary])`
   - **Dedup check:** before finishing, scan the entire board and remove any item that appears in more than one column (keep the most-advanced column: Done > In Progress > This Week > Backlog). Ensure all Done items are marked `[x]`.

5. **Promotion check** — for each completed task, check if it produced promotable outputs:
   - PRDs, strategy docs, decision records → flag for `Context/Document Hub/`
   - Frameworks, playbooks, templates → flag for `Context/Knowledge/` or `Context/Reference/`
   - Stakeholder insights → flag for `Context/Reference/stakeholders.md`
   - Report: "Promotable outputs: [list with suggested destinations]" — let the user confirm before promoting

6. **Graph maintenance** — if `Context/Memory/graph.yaml` exists:
   - Halve the weight of any edge whose `last_seen` is older than 4 weeks
   - Prune edges with weight below 0.1 after decay
   - Remove orphan nodes with no incident edges only if they do **not** have a `file:` pointer
   - Report: "Graph: N nodes, M edges. Decayed X, pruned Y."

7. If your workspace uses derived indexes and any are stale (>7 days), regenerate them or flag them for cleanup. Do not assume `/rebuild-indexes` exists.

---

### Step 7: Save the Wrap

Determine the correct quarterly folder from today's date:
- Jan–Mar → `Context/Progress Updates/Q1-YYYY Weekly Wraps/`
- Apr–Jun → `Context/Progress Updates/Q2-YYYY Weekly Wraps/`
- Jul–Sep → `Context/Progress Updates/Q3-YYYY Weekly Wraps/`
- Oct–Dec → `Context/Progress Updates/Q4-YYYY Weekly Wraps/`

Save the full wrap (shareable update + internal detail sections) as `CW[XX].md` inside that folder.

If a file for this CW already exists, append the new wrap at the top (most recent first) rather than overwriting.

Confirm: *"Saved to `Context/Progress Updates/Q[N]-YYYY Weekly Wraps/CW[XX].md`. Learnings appended to Memory."*

---

## Key Principle: No Mid-Flow Prompts

The entire wrap — shareable update, internal detail, learnings save, and file save — runs as one uninterrupted pass. The user reviews the complete output and provides corrections after, not during. This eliminates back-and-forth rounds.

If any external tool (Slack, Jira) is unavailable, note it and continue. Never block the wrap waiting for a tool.
