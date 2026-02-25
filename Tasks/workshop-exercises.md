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

Tick each exercise as you complete it. Work through 1–9 during the workshop, then 10–12 at your own pace.

## Progress

### During the workshop
- [ ] 01 · Explore your workspace
- [ ] 02 · Understand agent capabilities
- [ ] 03 · Discover connected tools (MCPs)
- [ ] 04 · Combine tools across systems
- [ ] 05 · Bootstrap your GOALS.md ⭐
- [ ] 06 · Goals-driven prioritization workout ⭐
- [ ] 07 · Run the /today skill
- [ ] 08 · Set up the compounding loop
- [ ] 09 · Full co-pilot test — 1:1 prep

### After the workshop
- [ ] 10 · Seed your Context folder
- [ ] 11 · Build a custom skill
- [ ] 12 · Use your co-pilot for one full work day

---

## 01 · Explore Your Workspace
**Section 0 — Setup · Slide 6 · ~5 min**

- Open Claude Code Desktop
- Go to **File → Open Folder** and select this `personal-agent` folder
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

**What to notice:** Notice what it says about file access, tool use, and workspace persistence. The agent is explaining its own capabilities — demonstrating self-awareness about its environment. Watch for the moment you realize: "Wait, it can actually read my files?"

---

## 03 · Discover Connected Tools (MCPs)
**Section 2 — Tools & MCPs · Slide 15 · ~10 min**

- Check your MCP connections: go to **Settings → MCP Servers** and see what's listed
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

## 05 · Bootstrap Your GOALS.md ⭐
**Section 3 — Context & Memory · Slide 18 · ~15 min**

This is the core context exercise.

- **Step 1 — Get your starting context from ChatGPT:**
  - Open ChatGPT App → Personalisation → Memory
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

---

## 06 · Goals-Driven Prioritization Workout ⭐
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

## 07 · Run the /today Skill
**Section 4 — Skills · Slide 26 · ~10 min**

- Run the pre-built skill. Type:

> /today

- Watch your agent synthesize your goals, recent activity, and context files into a focused daily plan
- Now try a variation — add a constraint:

> "Actually, I have a dentist appointment at 2pm. Adjust the plan."

- Watch the agent re-plan around the constraint

**What to notice:** Skills aren't rigid scripts — they reason and adapt. Instead of typing a long prompt every time, you type `/today`. And because it reads your context files every time, it automatically adapts as your priorities change.

---

## 08 · Set Up the Compounding Loop
**Section 5 — Orchestration & Compounding · Slide 31 · ~5 min**

- Run the weekly wrap skill to see how learnings get compounded:

> /weekly-wrap

- Watch Step 5 — the agent distills the week's work into insights and saves them to `Context/Memory/learnings.md`
- Review what it wrote — these are the compounded learnings that future sessions will reference
- If you want to capture something mid-week, just say:

> "Remember that [your insight here]"

**What to notice:** `/weekly-wrap` doesn't just review — it compounds. Each week's distilled insights are stored in Memory so future sessions build on past knowledge without context bloat. Better context → better output → more learnings → even better context.

---

## 09 · Full Co-Pilot Test — 1:1 Prep
**Section 5 — Capstone · Slide 32 · ~10 min**

Final challenge — use everything you've built.

- Type:

> "I have a 1:1 with my manager tomorrow. Based on my goals, recent work, and current priorities, help me prepare talking points. What should I bring up? What should I ask for?"

- Watch the agent pull from everything: GOALS.md, Context/, connected tools, CLAUDE.md
- Share your results with your group

**What to notice:** The agent isn't generating generic talking points — it's reasoning about *your* specific goals, *your* recent work, *your* team dynamics. This is what "agent-native" feels like from the inside.

---

## 10 · Seed Your Context Folder
**Take-home · ~30 min**

- Type this prompt:

> "Create files in my Context/ folder: current-projects.md (list my active projects — I'll tell you about them), team.md (my team structure), and how-i-work.md (my working preferences and communication style). Ask me the questions you need to fill these in. Feel free to search Confluence or Slack for relevant context."

- Answer the agent's interview questions — it will ask several rounds
- Review the files it creates and refine as needed

**What to notice:** Each file you add makes every future session smarter. The agent interviews you, then enriches answers with data from your connected tools.

---

## 11 · Build a Custom Skill
**Take-home · ~15 min**

- Think of a workflow you do repeatedly (meeting prep, status update, brainstorm, etc.)
- Ask the agent to create it:

> "Create a skill file at .claude/skills/[your-skill-name]/SKILL.md. This skill should: [describe what it does — what files to read, what tools to check, what to output]. Include YAML frontmatter with name and description."

- Review the skill file — does it reference the right files? Use the right tools?
- Test it by running `/[your-skill-name]`

**Skill ideas:** `/prep-meeting [person]` · `/status-update` · `/brainstorm [topic]` · `/draft-comms [topic]`

---

## 12 · Use Your Co-Pilot for One Full Work Day
**Take-home · The real challenge**

- **Morning:** Run `/today` to build your daily plan
- **During work:** Let the agent help you prep for meetings, draft messages, research topics
- **Between tasks:** Brain dump into BACKLOG.md, then say "process my backlog"
- **End of week:** Run `/weekly-wrap` — it reviews your work AND compounds learnings into Memory

**What to notice:** After a full day, your Context/ folder will be richer and your agent will know you better. After a week, you'll have a visceral understanding of what agent-native means — because you lived it.