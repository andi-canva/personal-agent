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

You've seen what Cowork can do — connectors, sub-agents, skills, Chrome, local files. That's Claude with hands. This workshop shows you how to give it a brain. Cowork without context is a capable stranger. Cowork with this workspace is a co-pilot that knows your goals, remembers your decisions, and gets better every week. Everything here is complementary — you keep all of Cowork's power and add persistent memory, goal alignment, and a compounding loop on top.

---

Tick each exercise as you complete it. Work through 1–10 during the workshop, then 11–14 at your own pace.

## Progress

### During the workshop
- [ ] 01 · Explore your workspace
- [ ] 02 · Understand agent capabilities
- [ ] 03 · Discover connected tools (MCPs)
- [ ] 04 · Combine tools across systems
- [ ] 05 · Bootstrap your GOALS.md
- [ ] 06 · Goals-driven prioritization workout
- [ ] 07 · Plan your week with /plan-week
- [ ] 08 · Run /today against the weekly plan
- [ ] 09 · Use /121 to prep for a 1:1
- [ ] 10 · Set up the compounding loop

### After the workshop
- [ ] 11 · Try /draft and /unblock
- [ ] 12 · Seed your Context folder
- [ ] 13 · Build a custom skill
- [ ] 14 · Use your co-pilot for one full work week
- [ ] 15 · Compare blank Cowork vs harnessed (optional)

---

## 01 · Explore Your Workspace
**Section 0 — Setup · Slide 6 · ~5 min**

- Open Claude Code Desktop
- Go to **File > Open Folder** and select this `personal-agent` folder
- Quick tour of the UI: models picker, + button (tools & skills), mode selector (plan, ask, auto)
- Type this prompt:

> "Look at the files in this workspace. What do you see? What's the structure here? Explain to me what it does."

- Read the agent's response — it's exploring your workspace and explaining it back to you

**What to notice:** The agent isn't just answering a question — it's reading your actual files, understanding the structure, and explaining it. That file access is what makes this different from a chat window.

---

## 02 · Understand Agent Capabilities
**Section 1 — What Is Agent-Native? · Slide 11 · ~5 min**

- Type this prompt:

> "What's the difference between using you in a chat window versus using you here in Claude Code Desktop? What can you do here that you can't do there?"

- Read the response carefully
- Now try this follow-up:

> "What do you know about me right now? What's in my GOALS.md? How does that change what you'd suggest compared to a blank Cowork session?"

**What to notice:** The first prompt shows you what the agent *can do* (file access, tool use, workspace persistence). The second shows you what it *already knows* — because this workspace gives it persistent context that a blank Cowork session doesn't have. That's the difference between capability and usefulness.

---

## 03 · Discover Connected Tools (MCPs)
**Section 2 — Tools & MCPs · Slide 15 · ~10 min**

- Check your MCP connections: go to **Settings > MCP Servers** and see what's listed
- Discover what's available. Type:

> "What tools do you have access to? List them for me."

- Pick one and test it. Try one of these:

> "Give me the tldr of [a recent document or design] in Canva."

> "Tell me what open to-do's I have from last week's Slack messages."

- Watch the agent reach into your real tools and pull back real data

**What to notice:** The agent isn't making things up — it's actually reaching into your tools and pulling back your real data.

---

## 04 · Combine Tools Across Systems
**Section 2 — Tools & MCPs · Slide 16 · ~10 min**

- Try combining tools — ask the agent to do cross-system research:

> "Search Slack for messages in #[your-channel] from the last week. What are the main topics people are discussing?"

or:

> "Find the Confluence page for [a page you know]. Please add a note to it saying 'I'm agent-native'. Sign with my name."

- Watch how the agent pulls real data from your real tools and takes action

**What to notice:** The agent is doing in seconds what would take you 15 minutes of tab-switching. It's not just answering questions — it's doing research and actioning it. That's the difference between assistant and agent.

---

## 05 · Bootstrap Your GOALS.md
**Section 3 — Context & Memory · Slide 18 · ~15 min**

This is the core context exercise.

- **Step 1 — Get your starting context from ChatGPT:**
  - Open ChatGPT App > Personalisation > Memory
  - Read out one surprising thing it knows about you (keep it SFW)
  - Paste this prompt into ChatGPT:

> I'd like you to bootstrap the following personal data about me by looking at my biggest documents, meetings and conversations over the past 3 months:
> - What's your current role?
> - What's your primary professional vision? What are you building toward?
> - In 12 months, what would make you think 'this was a successful year'?
> - What's your 5-year north star? Where do you want to be?
> - What are you actively working on right now?
> - What are your objectives for THIS QUARTER (next 90 days)?
> - What skills do you need to develop to achieve your vision?
> - What key relationships or network do you need to build?
> - What's currently blocking you or slowing you down?
> - What opportunities are you exploring or considering?

- **Step 2 — Bring it to Claude and enrich:**
  - Copy ChatGPT's output and paste this into Claude Code Desktop:

> Update the GOALS.md file in this workspace with the following info. Also use my connected tools — search Slack or Confluence for anything relevant to my goals that could add context. [Paste ChatGPT output here]

- **Step 3 — Review what the agent created**
  - Open GOALS.md and read through it
  - Notice how it pulled from both your prompt AND your connected tools

**What to notice:** This is where context meets tools. The agent enriches your context file with data from Confluence and Slack — a GOALS.md richer than what you could write from memory alone. This is composability in action.

> **Why not just tell Cowork your goals each time?** Because there's no memory across Cowork sessions. A structured `GOALS.md` file means every new session already knows what you're working toward — without you repeating yourself. You write it once, and every `/today`, every prioritization question, every weekly review references it automatically.

---

## 06 · Goals-Driven Prioritization Workout
**Section 3 — Context & Memory · Slide 21 · ~15 min**

Progressive prompts that build on each other. Try them in order:

- **Step 1:** Screenshot your current todo list (Notion, Jira, Apple Notes, Slack, a sticky note) and send it to the agent:

> "Here's my current todo list. Fill out an initiatives kanban — group by theme, flag what's blocked, suggest priorities based on my GOALS.md."

- **Step 2:**

> "What do you think of this prioritization? In light of @GOALS.md, what should I drop?"

- **Step 3:**

> "What's the single most important thing I should be focused on right now?"

- **Step 4:**

> "Help me build my todo list for today — split into deep work blocks and quick slack/ping-pong tasks."

- **Step 5:** Open the thinking process (click the chevron) — see how the agent reasons about your priorities using your context files and goals

**What to notice:** The agent is reasoning about priorities against your stated goals. When you see it explicitly referencing your GOALS.md and weighing trade-offs, that's "shared context" as an agent-native property.

---

## 07 · Plan Your Week with /plan-week
**Section 4 — Skills & Planning Loop · Slide 26 · ~10 min**

This exercise introduces the weekly planning loop. There's an example week already in your workspace — let's look at it first, then build your own.

- **Step 1 — Explore the example week:**

> "Read Tasks/Week-2026-W02.md. Walk me through what this file is — how is it structured, what's filled in, what isn't, and how would /today use it?"

- Notice how Monday and Tuesday are "lived" (checkboxes ticked, meeting notes, decisions logged) while Wednesday–Friday are still just planned
- This is the scratchpad that `/today` reads every morning and fills in as the day unfolds

- **Step 2 — Now plan YOUR week.** Run:

> /plan-week

- Watch the agent pull your GOALS.md, active tasks, and calendar to build a full week plan
- It will ask you to confirm before writing the file
- Once confirmed, you'll have your own `Tasks/Week-YYYY-WNN.md` with all 5 days pre-populated

**What to notice:** `/plan-week` doesn't just list tasks — it triages your meetings (keep/drop/delegate/defer), maps daily themes to goals, and defines what "success looks like" by Friday. The output is a decision-making artifact, not a to-do list.

---

## 08 · Run /today Against the Weekly Plan
**Section 4 — Skills & Planning Loop · Slide 28 · ~10 min**

Now see how `/today` reads from the weekly plan and builds a daily briefing.

- **Step 1 — Try it on the example week first.** Type:

> "Pretend it's Wednesday January 7, 2026. Read Tasks/Week-2026-W02.md and build me a daily briefing for today. What did Monday and Tuesday accomplish? What should Wednesday focus on? Are there any rolled-forward items?"

- Watch the agent reconcile what was planned vs what actually happened
- Notice it picks up that the budget approval is still unresolved from Monday, and Sarah's feedback needs to be acted on

- **Step 2 — Now run it for real on YOUR week:**

> /today

- The agent reads your actual weekly plan, checks connected tools for overnight signals, and builds a 3-item focus plan
- Try adding a constraint:

> "Actually, I have a dentist appointment at 2pm. Adjust the plan."

- Watch the agent re-plan around the constraint

**What to notice:** The planning loop is: `/plan-week` on Monday sets the frame, `/today` each morning reads from it, reconciles reality, and updates the scratchpad. Over the week, the file becomes a living record of what actually happened — not just what was planned.

---

## 09 · Use /121 to Prep for a 1:1
**Section 5 — Capstone Skills · Slide 32 · ~10 min**

Use everything you've built — goals, context, connected tools — to prep for a real meeting.

- **Step 1 — Run the skill:**

> /121 [your manager's name]

- Watch the agent search your meeting notes, tasks, goals, and Slack for context about this person
- It generates three sections: **updates to share**, **questions to ask**, and **strategic topics**
- It also flags any open loops from previous conversations

- **Step 2 — Try a variation with someone else:**

> /121 [a direct report or peer you meet with regularly]

- Compare the outputs — the agent adapts based on the relationship context it finds

**What to notice:** The agent isn't generating generic talking points — it's reasoning about *your* specific goals, *your* recent work, and *your* history with this person. This is what "agent-native" feels like from the inside.

---

## 10 · Set Up the Compounding Loop
**Section 5 — Orchestration & Compounding · Slide 35 · ~5 min**

- Run the weekly wrap skill to see how learnings get compounded:

> /weekly-wrap

- Watch the agent review the week, produce a shareable status update, and distill learnings
- It saves insights to `Context/Memory/learnings.md` — future sessions will reference these automatically
- Review the shareable update (~200 words) — you could send this to your manager as-is
- If you want to capture something mid-week, just say:

> "Remember that [your insight here]"

**What to notice:** `/weekly-wrap` doesn't just review — it compounds. Each week's distilled insights are stored in Memory so future sessions build on past knowledge without context bloat. Better context, better output, more learnings, even better context.

> **This is what Cowork can't do alone.** Each `/weekly-wrap` distills insights into `Context/Memory/learnings.md`. Next week's sessions reference last week's lessons automatically. That's not a feature of Cowork — it's a feature of this workspace structure. Your agent after 4 weeks is meaningfully better than on day one.

---

## 11 · Try /draft and /unblock
**Take-home · ~10 min**

Two more skills that show how context changes everything.

- **Draft something in your voice:**

> /draft [a Slack message to your team about Q1 priorities]

- The agent checks your Context/Memory for voice preferences and writes like you, not like generic AI
- Ask it to adjust: "more casual" / "shorter" / "more direct"

- **Unblock a stalled task:**

> /unblock

- The agent scans your Tasks/ folder for the most obviously stalled item
- It diagnoses *why* it's stuck (never started? too big? waiting on someone?) and suggests one concrete next action — not a plan, just the smallest thing to do in the next 15 minutes

**What to notice:** Both skills read your workspace context. `/draft` writes differently for different audiences because it knows your goals and relationships. `/unblock` doesn't just say "break it down" — it looks at the specific task and gives a specific action.

---

## 12 · Seed Your Context Folder
**Take-home · ~30 min**

- Type this prompt:

> "Create files in my Context/ folder: current-projects.md (list my active projects — I'll tell you about them), team.md (my team structure), and how-i-work.md (my working preferences and communication style). Ask me the questions you need to fill these in. Feel free to search Confluence or Slack for relevant context."

- Answer the agent's interview questions — it will ask several rounds
- Review the files it creates and refine as needed

**What to notice:** Each file you add makes every future session smarter. The agent interviews you, then enriches answers with data from your connected tools.

---

## 13 · Build a Custom Skill
**Take-home · ~15 min**

- Think of a workflow you do repeatedly (meeting prep, status update, brainstorm, etc.)
- Ask the agent to create it:

> "Create a skill file at .claude/skills/[your-skill-name]/SKILL.md. This skill should: [describe what it does — what files to read, what tools to check, what to output]. Include YAML frontmatter with name and description."

- Review the skill file — does it reference the right files? Use the right tools?
- Test it by running `/[your-skill-name]`

**Skill ideas:** `/status-update` · `/brainstorm [topic]` · `/retro` · `/prep-meeting [person]`

---

## 14 · Use Your Co-Pilot for One Full Work Week
**Take-home · The real challenge**

The planning loop in practice:

- **Monday morning:** Run `/plan-week` to set the full week — priorities, meeting triage, daily themes
- **Every morning:** Run `/today` to get your daily briefing (it reads from the weekly plan)
- **During work:** Let the agent help you prep for meetings (`/121`), draft messages (`/draft`), unblock tasks (`/unblock`)
- **Between tasks:** Brain dump into BACKLOG.md, then run `/backlog` to triage
- **Friday:** Run `/weekly-wrap` — it reviews the week, produces a shareable update, and compounds learnings

After one full week, your `Context/Memory/learnings.md` will have its first real entries. Your weekly scratchpad will be a record of what actually happened. And your agent will be meaningfully better for next week.

---

## 15 · Compare Blank Cowork vs Harnessed (Optional)
**Take-home · ~10 min**

See the difference for yourself.

- **Step 1:** Open a fresh Cowork session (no workspace selected) and ask:

> "What should I focus on today? Help me plan my day."

- **Step 2:** Come back to this workspace and run:

> /today

- **Step 3:** Compare the two outputs side by side

**What to notice:** The blank session gives you a generic productivity template. The harnessed session gives you a plan grounded in YOUR goals, YOUR recent work, and YOUR accumulated learnings. Same agent, same model, same capabilities — the only difference is the structured context this workspace provides. That's what "complementary" means in practice.
