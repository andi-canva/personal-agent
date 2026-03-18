---
title: "Workshop Pre-Read: Agent-Native Co-Pilot"
category: research
priority: P0
status: active
created_date: 2026-03-10
tags:
  - workshop
  - pre-read
---

# Workshop Pre-Read — Agent-Native Co-Pilot

Prep time: ~15 minutes. Do this before the workshop so you walk in ready to go.

---

## 1. Install your AI tool

Pick one:
- **Claude Code Desktop** (recommended): https://claude.ai/download
- **Cursor**: https://www.cursor.com/

Both work for the workshop. Download, install, and sign in.

If you're using Claude Code Desktop, switch to **Claude Code** via the top-nav toggle (it defaults to regular Claude chat).

---

## 2. Connect your tools

In Claude Code Desktop, hit the **+ button** in the chat box and connect what's available to you:

- **Slack** — your workspace
- **Atlassian** — Confluence (docs, wikis) and/or Jira (tickets, boards)
- **Google Calendar** — for meeting triage and daily briefings

Optional:
- **Zoom** — for pulling meeting transcripts and action items
- Any other MCP connectors relevant to your workflow

---

## 3. Test that it works

Paste this into your AI tool to verify your connections are live:

> "Search Slack for messages from the last week in [a channel you're in]. Summarise the main topics."

or:

> "Find a Confluence page about [a topic you know]. Summarise it for me."

If it pulls back real data, you're good. If not, check your connector settings or ask for help.

---

## 4. Clone the workshop workspace

Download or clone the personal-agent repo — this is the workspace you'll use during the workshop:

```
git clone https://github.com/canvanauts/personal-agent.git
```

Or download the zip from the green **<Code>** button on GitHub.

Open the folder in your AI tool so it can read the files.

Skim the README to understand the folder structure:
- `Tasks/` — active task files with priorities and status
- `Context/Memory/` — persistent facts, preferences, and compounded learnings
- `Context/Knowledge/` — accumulated knowledge, frameworks, and reference material
- `GOALS.md` — your goals and priorities (the most important file)
- `.claude/skills/` — skills like `today`, `plan-week`, and `weekly-wrap`

Take a peek at `Tasks/Week-2026-W01.md` — this is an example weekly scratchpad showing how the planning loop works. Monday and Tuesday are filled in as if someone lived through them; Wednesday onwards is still just planned. We'll reference this in the workshop.

---

## 5. Think about your goals

Come prepared with your **top 3 priorities or goals** right now. Pull them from your OKRs, your head, wherever. You'll use them to bootstrap your agent's context during the workshop.

---

## Optional extras

- **Download Obsidian** (https://obsidian.md/) if you'd like a local markdown editor for browsing and editing your workspace files — the Weekly Kanban works as an actual kanban board in Obsidian
- **Read:** "Everyone should be using Claude Code more" (50 non-technical use cases) — https://www.lennysnewsletter.com/p/everyone-should-be-using-claude-code

---

## Troubleshooting

**Do I need the terminal / developer tools?**
No. Claude Code Desktop looks like a terminal but you're just typing natural language. It's not more technical than regular chat — it just has a better agent model and can perform actions for you.

**My connectors aren't working.**
Disconnect and re-add them. Make sure you're selecting the right scope (e.g., some Atlassian setups have separate scopes for Jira and Confluence).

**Can I use Co-Work instead of Claude Code Desktop?**
Yes — Co-Work works with this workspace. One quirk: Co-Work's built-in `/` menu doesn't know about local skills. Type skill names without the slash (e.g., `today` instead of `/today`) or prefix with `run` (e.g., `run /today`).

---

## What to expect in the workshop

We'll work through 4 sections in 60 minutes:

1. **Harness vs Raw** (~10 min) — see the difference between a blank AI session and one with structured context. Live demo + hands-on.
2. **Tools** (~5 min) — one live cross-system query proving the agent can reach into your real tools.
3. **Context** (~25 min) — bootstrap your GOALS.md from ChatGPT + connected tools. Run a prioritization workout against your real task list.
4. **The Loop** (~20 min) — run `today` or `plan-week` live. See how the compounding loop works: plan → execute → wrap → learn → repeat.

### Skills you'll use

| Skill | What it does | When |
|-------|-------------|------|
| `today` | Daily briefing — reads from weekly plan, preps meetings, reconciles with reality | Exercise 06 |
| `plan-week` | Plan the full week — priorities, meeting triage, daily themes | Exercise 06 |
| `weekly-wrap` | Weekly review + shareable update + compound learnings | Exercise 07 |
| `121 [person]` | 1:1 meeting prep — talking points from goals, notes, and tools | Take-home (Ex 08) |
| `draft [topic]` | Draft content in your voice | Take-home (Ex 09) |
| `unblock [task]` | Diagnose and unblock stalled tasks | Take-home (Ex 09) |
| `backlog` | Triage raw notes into structured task files | Take-home |
| `bias` | Audit decisions against your motivational blind spots | Take-home |
