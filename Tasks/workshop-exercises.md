---
title: "Workshop: Building Your Agent-Native Co-Pilot"
category: research
priority: P0
status:
created_date: 2026-02-25
tags:
  - workshop
---

# Workshop Exercises

## Where This Fits

You've seen what AI tools can do — connectors, sub-agents, skills, browser access, local files. That's an agent with hands. This workshop shows you how to give it a brain. An AI tool without context is a capable stranger. An AI tool with this workspace is a co-pilot that knows your goals, remembers your decisions, and gets better every week. Everything here is complementary — you keep all your tool's power and add persistent memory, goal alignment, and a compounding loop on top.

---

Tick each exercise as you complete it. Work through 1–7 during the workshop (~60 min), then 8–12 at your own pace.

## Progress

### During the workshop (~60 min)
- [ ] 01 · Explore your workspace (3 min)
- [ ] 02 · Harness vs raw — see the difference (5 min)
- [ ] 03 · Cross-system query (5 min)
- [ ] 04 · Bootstrap your GOALS.md (15 min)
- [ ] 05 · Goals-driven prioritization workout (10 min)
- [ ] 06 · Run /today or /plan-week (10 min)
- [ ] 07 · The compounding loop (5 min)

### After the workshop
- [ ] 08 · Prep for a 1:1 with /121
- [ ] 09 · Try /draft and /unblock
- [ ] 10 · Seed your Context folder
- [ ] 11 · Build a custom skill
- [ ] 12 · Use your co-pilot for one full work week
- [ ] 13 · Compare blank AI vs harnessed (optional)

---

## 01 · Explore Your Workspace
**Section 1 — Harness vs Raw · ~3 min**

Open your AI tool (Claude Code Desktop, Co-Work, Cursor, or CLI) and point it at this `personal-agent` folder. Type one prompt:

> "Look at the files in this workspace. What do you see? What's the structure here? Explain to me what it does."

Read the response. The agent is exploring your actual files and explaining them back to you. That file access is what makes this different from a chat window.

---

## 02 · Harness vs Raw — See the Difference
**Section 1 — Harness vs Raw · ~5 min**

This is the exercise that makes the point. Same prompt, two contexts.

- **Step 1:** Open a blank AI session (no workspace, no files). Type:

> "What should I focus on this week? Help me plan."

- Save or screenshot the response.

- **Step 2:** Come back to this workspace. Type:

> "What should I focus on this week? Help me plan. Check my GOALS.md and any active tasks."

- **Step 3:** Compare the two side by side.

**What to notice:** The blank session gives you a generic productivity template. The harnessed session reasons about YOUR goals, YOUR tasks, and YOUR context. Same model, same capabilities — the only difference is the structured context this workspace provides. That's what the harness does.

---

## 03 · Cross-System Query
**Section 2 — Tools · ~5 min**

One prompt that chains across multiple systems. Pick whichever fits your connected tools:

> "Search Slack for messages in #[your-channel] from the last week. What are the main topics people are discussing?"

or:

> "Find the Confluence page for [a page you know]. Summarise it and tell me if there are any action items for me."

or:

> "Check my calendar for today. What meetings do I have? Pull any relevant context from my tasks or notes."

Watch how the agent reaches into your real tools, pulls back real data, and synthesises it. That's the agent doing in seconds what would take you 15 minutes of tab-switching.

**If your tools aren't connected yet:** Watch the facilitator's live demo. Set up your connections after the workshop using the pre-read guide.

---

## 04 · Bootstrap Your GOALS.md
**Section 3 — Context · ~15 min**

This is the main event. The exercise where most people have their "aha" moment.

- **Step 1 — Get your starting context from ChatGPT:**
  - Open ChatGPT App > Personalisation > Memory
  - Paste this prompt into ChatGPT:

> I'd like you to bootstrap the following personal data about me by looking at my biggest documents, meetings and conversations over the past 3 months:
> - What's your current role?
> - What's your primary professional vision? What are you building toward?
> - In 12 months, what would make you think 'this was a successful year'?
> - What are you actively working on right now?
> - What are your objectives for THIS QUARTER (next 90 days)?
> - What's currently blocking you or slowing you down?

- **Step 2 — Bring it to your agent and enrich:**
  - Copy ChatGPT's output and paste this into your agent:

> Update the GOALS.md file in this workspace with the following info. Also use my connected tools — search Slack or Confluence for anything relevant to my goals that could add context. [Paste ChatGPT output here]

- **Step 3 — Review what the agent created**
  - Open GOALS.md and read through it
  - Notice how it pulled from both your prompt AND your connected tools

**What to notice:** The agent enriches your context with data from your real tools — a GOALS.md richer than what you could write from memory alone. You write it once, and every `/today`, every prioritization question, every weekly review references it automatically. No more repeating yourself every session.

---

## 05 · Goals-Driven Prioritization Workout
**Section 3 — Context · ~10 min**

Progressive prompts that build on each other.

- **Step 1:** Screenshot your current todo list (Notion, Jira, Apple Notes, Slack, a sticky note) and send it to the agent:

> "Here's my current todo list. Group by theme, flag what's blocked, suggest priorities based on my GOALS.md."

- **Step 2:**

> "What do you think of this prioritization? In light of my goals, what should I drop?"

- **Step 3:**

> "What's the single most important thing I should be focused on right now?"

**What to notice:** The agent is reasoning about priorities against your stated goals — not giving generic advice. When you see it explicitly referencing your GOALS.md and weighing trade-offs, that's shared context in action.

---

## 06 · Run /today or /plan-week
**Section 4 — The Loop · ~10 min**

Pick the skill that fits the day. If it's Monday, run `/plan-week`. Any other day, run `/today`. Don't do both — the point is to see the loop, not demo every skill.

- **Step 1 — Explore the example week first:**

> "Read Tasks/Week-2026-W01.md. Walk me through what this file is — how is it structured, what's filled in, what isn't?"

- Notice how Monday and Tuesday are "lived" (checkboxes ticked, meeting notes, decisions) while Wednesday–Friday are just planned. This is the scratchpad your agent reads every morning.

- **Step 2 — Now run it for real:**

> today

or:

> plan-week

- Watch the agent pull your GOALS.md, tasks, and calendar to build a plan grounded in your actual context
- Try adding a constraint: "Actually, I have an appointment at 2pm. Adjust."

**What to notice:** The skill doesn't just list tasks — it reconciles what was planned vs what actually happened, triages your meetings, and maps your day to your goals. The output is a decision-making artifact, not a to-do list.

---

## 07 · The Compounding Loop
**Section 4 — The Loop · ~5 min**

This is where it all comes together.

- Run a quick weekly wrap:

> weekly-wrap

- Watch the agent review the week, produce a shareable status update, and distil learnings
- It saves insights to `Context/Memory/learnings.md` — future sessions reference these automatically
- If you want to capture something right now, just say:

> "Remember that [your insight here]"

**What to notice:** Three skills, one loop. Monday you plan. Daily you execute and the scratchpad captures what actually happened. Friday you wrap, and the agent distils what it learned into Memory. Next Monday, `/plan-week` reads those learnings. Your agent after 4 weeks knows things about how you work that you haven't explicitly told it.

> **This is what a blank AI session can't do.** Each weekly wrap compounds insights. Next week's sessions build on this week's lessons automatically. That's not a feature of any particular tool — it's a feature of this workspace structure.

---

## 08 · Prep for a 1:1 with /121
**Take-home · ~10 min**

Use everything you've built — goals, context, connected tools — to prep for a real meeting.

- Run the skill:

> 121 [your manager's name]

- Watch the agent search your meeting notes, tasks, goals, and Slack for context about this person
- It generates four sections: **Discuss**, **Ask**, **Strategic**, **Close the loop**
- It also creates a persistent relationship doc at `Context/121s/` that carries forward across sessions

- Try a variation with someone else:

> 121 [a peer or direct report]

- Compare the outputs — the agent adapts based on the relationship context it finds

**What to notice:** The agent isn't generating generic talking points — it's reasoning about *your* specific goals, *your* recent work, and *your* history with this person.

---

## 09 · Try /draft and /unblock
**Take-home · ~10 min**

Two skills that show how context changes everything.

- **Draft something in your voice:**

> draft [a Slack message to your team about this quarter's priorities]

- The agent checks your `Context/Memory/` for voice preferences and writes like you, not like generic AI
- Ask it to adjust: "more casual" / "shorter" / "more direct"

- **Unblock a stalled task:**

> unblock

- The agent scans your tasks for the most obviously stalled item
- It diagnoses *why* it's stuck and suggests one concrete next action — not a plan, just the smallest thing to do in the next 15 minutes

---

## 10 · Seed Your Context Folder
**Take-home · ~30 min**

> "Create files in my Context/ folder: current-projects.md (list my active projects — I'll tell you about them), team.md (my team structure), and how-i-work.md (my working preferences and communication style). Ask me the questions you need to fill these in. Feel free to search Confluence or Slack for relevant context."

- Answer the agent's interview questions
- Review the files it creates and refine as needed

Each file you add makes every future session smarter. The agent interviews you, then enriches answers with data from your connected tools.

---

## 11 · Build a Custom Skill
**Take-home · ~15 min**

Think of a workflow you do repeatedly (meeting prep, status update, brainstorm, etc.) and ask the agent to create it:

> "Create a skill file at .claude/skills/[your-skill-name]/SKILL.md. This skill should: [describe what it does — what files to read, what tools to check, what to output]. Include YAML frontmatter with name and description."

- Review the skill file — does it reference the right files? Use the right tools?
- Test it by typing the skill name

**Skill ideas:** `status-update` · `brainstorm [topic]` · `retro` · `prep-meeting [person]`

---

## 12 · Use Your Co-Pilot for One Full Work Week
**Take-home — the real challenge**

The planning loop in practice:

- **Monday morning:** Run `plan-week` to set the full week — priorities, meeting triage, daily themes
- **Every morning:** Run `today` to get your daily briefing (it reads from the weekly plan)
- **During work:** Prep meetings (`121`), draft messages (`draft`), unblock tasks (`unblock`)
- **Between tasks:** Brain dump into BACKLOG.md, then run `backlog` to triage
- **Friday:** Run `weekly-wrap` — it reviews the week, produces a shareable update, and compounds learnings

After one full week, your `Context/Memory/learnings.md` will have its first real entries. Your weekly scratchpad will be a record of what actually happened. And your agent will be meaningfully better for next week.

---

## 13 · Compare Blank AI vs Harnessed (Optional)
**Take-home · ~10 min**

If you want to see the difference again after a week of use:

- **Step 1:** Open a fresh AI session (no workspace) and ask:

> "What should I focus on today? Help me plan my day."

- **Step 2:** Come back to this workspace and run:

> today

- **Step 3:** Compare the two outputs side by side.

After a week of compounded learnings, the gap is even wider than it was in Exercise 02.
