---
name: pulse
description: "Weekly company Slack digest — chief-of-staff style. Scans the past 7 days of broad Slack activity and surfaces: goal-relevant discussions, crossover threads, water-cooler connection opportunities, provocations (things moving without your input), and backlog triggers (dormant initiatives that current Slack activity could re-activate). Designed to surface what a great chief-of-staff would bring unprompted. Run every Monday morning. Trigger on: 'weekly pulse', 'company digest', 'what's happening across the org', 'water cooler', 'run pulse', '/pulse', 'morning briefing', 'what did I miss this week', 'check my backlog against Slack'."
---

# /pulse — Weekly Company Pulse

Weekly chief-of-staff digest. Not a feed of what you already track — a briefing on what you *should* be thinking about: threads you're not in, people doing adjacent work, dormant backlog ideas that just became timely, and things moving without your input.

Run every Monday morning. Scans the past 7 days of company Slack.

---

## Step 1: Load Context (three layers)

Read in parallel:

1. **`GOALS.md`** — extract: quarterly objectives, key relationships (named people), active focus areas, current blockers
2. **`Context/Memory/active-tasks.md`** — extract topic tags and keywords from each active task
3. **`Tasks/Backlog/*.md`** — read only the `description:` frontmatter field from each file. This gives you the initiative inventory without loading full content.
4. **`Tasks/Done/`** — skim file names and descriptions for tasks completed in the past 4 weeks that might have adjacent ongoing activity

From all of this, build a **signal vocabulary**: 15–20 keywords/phrases covering goals, active tasks, and initiative topics. These are your Slack search terms derived from your GOALS.md and active Tasks/ files.

---

## Step 2: Broad Slack Scan (past 7 days)

Run `slack_search_public_and_private` across 5–7 different searches. Go **beyond** channels the user already monitors. The goal is discovery, not confirmation.

Run these search angles in parallel where possible:

1. **Goal keyword sweep** — search 3–4 terms from the signal vocabulary. Filter for threads the user is NOT already part of.
2. **Stakeholder signals** — search for recent messages from or about key people. What are they saying, sharing, or debating this week? Use names from the `GOALS.md` key relationships section.
3. **Org velocity signals** — search for topics that appear to be gaining momentum (multiple threads, multiple channels, multiple people). Look for: "agent", "AI", "mobile", "product strategy", "activation", or any term from the signal vocabulary that returns hits across diverse channels.
4. **Document signals** — search for "doc", "PRD", "RFC", "strategy", "proposal", "vision" shared in the past week. Flag anything shared outside the user's known channels.
5. **Backlog keyword matches** — for 2–3 of the highest-priority backlog items, search Slack for their core keywords. You're looking for someone in the org who is now doing what the backlog item is about.

For any interesting result: use `slack_read_thread` to get enough context to write a 2-line summary.

---

## Step 3: Synthesise — Five Editorial Lenses

Apply judgment. Don't just list search results — curate with a point of view. Each item should pass the test: "Would a great chief-of-staff bother the user's morning with this?"

### Your Zone (3–5 items)
Discussions or docs that directly intersect current quarterly objectives or active tasks. Include: who's involved, what they need or decided, and what the user could contribute or needs to know.

### Crossover (3–5 items)
Discussions the user is not in but should know about. Adjacent teams solving related problems. For each: name the indirect connection — why does this matter even though it doesn't look like it does?

### Water Cooler (2–3 items)
Interesting people doing interesting work that's not obviously connected but worth a conversation. The chief-of-staff move here is: "You two should talk." For each person, write a **specific conversation opener** — not "reach out", but the actual opening line or question.

### Provocation (1–2 items)
The core of this skill. Things the user is NOT thinking about but probably should be:
- A decision being made upstream without the user's input
- A pattern forming across multiple teams independently
- Something building momentum that could affect the user's work in 2–4 weeks
- A person who keeps appearing across multiple searches but the user has no relationship with

Frame directly — "You're not in this conversation, but you should be" or "This is moving without your input." Don't soften it.

### Backlog Triggers (1–3 items)
The reconnection layer. When Slack activity from this week matches a backlog item or recent done task:
- Name the backlog item
- Describe what's happening in Slack (who, which channel, what they're doing)
- Assess: should this backlog item be re-activated now? Or can it be closed because someone else solved it?
- Name the specific person to connect with

Good framing: "Your **[Backlog Item]** — [@person] in #[channel] just [did X], which covers [Y%] of your shaped approach. Talk to them before re-building this." Or: "Your **[Backlog Item]** might be urgent now — [what changed in Slack that makes it timely]."

---

## Step 4: Format the Digest

```
## Weekly Pulse — W[NN], [DD Mon YYYY]
*Past 7 days scanned*

### Your Zone
- **[Thread or doc title]** in #[channel] — [what's happening + why it matters to your goals + who's involved] → [Slack link]

### Crossover
- **[Thread or doc title]** in #[channel] — [what's happening + the indirect connection to your work] → [Slack link]

### Water Cooler
- **[@handle]** — [what they're working on] — opener: "[specific conversation starter to copy-paste]" → [Slack link]

### Provocation
- **[Topic or thread]** — [what's moving without you + what you should do about it] → [Slack link]

### Backlog Triggers
- **[Backlog item name]** — [what Slack activity connects to it + who to talk to + re-activate or close?] → [Slack link]

---
*Key names this week: @[handle], @[handle], @[handle] — appeared multiple times, worth a DM*
```

Two lines per item maximum. The whole digest should fit on one screen. If a section has nothing real to surface, omit it rather than padding.

**Every single item MUST include a Slack permalink** (the `permalink` field from search results or the link constructed from channel_id + message_ts). No exceptions — if you can't link it, don't include it. When searching, always request `detailed` response format so you get permalinks back. Store permalinks as you scan; do not rely on reconstructing them later.

---

## Step 5: Deliver

1. Print the digest in the terminal
2. Fetch the user's own Slack user ID: use `slack_search_users` with the user's name (Andi)
3. Send the digest as a Slack DM to that user ID via `slack_send_message`

---

## Step 6: Offer Scheduling (once, at the end)

After delivering, offer once:

> "Want me to schedule this to run automatically every Monday at 8am? I can set that up."

If yes: use `mcp__scheduled-tasks__create_scheduled_task` to schedule `/pulse` weekly on Mondays. If no: move on.

---

## What to Skip

- Messages or threads the user already participated in (already seen)
- Items that are pure FYI with no connection to goals, backlog, or key people
- Generic all-hands or announcement-type posts with no discussion
- Anything from the user's direct regular channels (they already see those) — only flag if a thread in a known channel has unexpected participants or a turn the user should know about

The filter is: **would a great chief-of-staff bother the user with this?** If the answer is "not really", cut it.
