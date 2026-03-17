# personal-agent

Cowork gives Claude hands. This workspace gives it a brain that remembers.

Run your own personal agent locally — no code, no database, just a folder of markdown files and an AI that understands your context, goals, and priorities. Your agent reads your files, learns your preferences, remembers what you've learned, and helps you stay focused on what actually matters. It gets smarter every week.

This repo works with **Claude Code** or **Claude Co-Work** (just select this folder). Think of Claude Code as Claude Chat with hands — full flexibility, fully customizable. Claude Co-Work is Claude Code in a business suit — it handles about 80% of the same tasks, but you don't have the same flexibility to change and extend it. Either works here.

This is not the underlying AI building blocks (APIs, prompts, tool-use). Those are worth sitting with by yourself the first time so you understand how it all comes together. This is the layer above — the structured context and memory that makes Cowork, Claude Code, or any agentic tool actually personal.

## What It Does

- **Goal-driven task management** — every task ties back to your stated goals
- **Weekly + daily planning** — `/plan-week` on Monday sets the full week, `/today` each morning builds from it
- **Backlog triage** — brain-dump into `BACKLOG.md`, then run `/backlog` to turn raw notes into structured tasks
- **Weekly review** — `/weekly-wrap` reviews progress, produces a shareable update, and compounds learnings into memory
- **1:1 prep** — `/121 [person]` pulls context from notes, tasks, and tools to generate talking points
- **Content drafting** — `/draft [topic]` writes in your voice, not generic AI
- **Task unblocking** — `/unblock [task]` diagnoses stalled tasks and suggests the smallest next action
- **Bias checking** — `/bias` audits decisions against your motivational blind spots
- **Structured metadata** — task files use YAML frontmatter so the agent can quickly assess priority and status
- **Persistent memory** — your agent remembers preferences, decisions, and lessons across sessions

## How This Complements Cowork

Cowork can orchestrate multi-step work, use connectors, deploy sub-agents, and run skills. But each session starts from zero — there's no persistent memory, no goal alignment, and no compounding loop. This workspace is the structured context layer that turns each new session into a continuation of the last one.

| Cowork alone | Cowork + this workspace |
|---|---|
| Each session starts blank | Sessions inherit your goals, memory, and learnings |
| Skills are generic recipes | Skills reference YOUR goals and context |
| No memory across sessions | `Context/Memory/` persists everything |
| Task-based, one-and-done | Compounding loop gets smarter every week |
| You repeat yourself every time | `GOALS.md` is read automatically |

You don't need to choose between Cowork and this workspace — they're complementary. Cowork provides the hands (connectors, sub-agents, Chrome, local files). This workspace provides the brain (goals, memory, learnings, skills that know you).

## Quick Start

### 1. Download this folder

```
git clone https://github.com/andi-canva/personal-agent.git
```

Or download the zip from the green **Code** button above.

Put it somewhere that makes sense for you (not just Downloads). It doesn't need to be stored inside Claude. It's a normal folder you open in your AI tool when you use it.

### 2. Open it in an AI tool

You need two things: something to **edit and browse** your files, and something to **run the AI agent**. You can use one tool for both, or pair them.

#### Claude Co-Work (easiest to start)

Claude Code in a business suit — handles most tasks, less customizable, but zero setup.

1. Open [Claude Co-Work](https://claude.ai) and select this folder
2. Start chatting — try: *"Look at the files in this workspace. What do you see?"*

Skills (`/today`, `/weekly-wrap`, etc.) are auto-discovered from `.claude/skills/`.

#### Claude Code Desktop (recommended for full flexibility)

Full Claude Code experience in an app. More customizable than Co-Work.

1. Download [Claude Code Desktop](https://claude.ai/download) (macOS / Windows)
2. Open the app, click the **Code** tab at the top, select **Local**, then click **Select folder** and choose the `personal-agent` folder
3. Start chatting — try: *"Look at the files in this workspace. What do you see?"*

#### Claude Code CLI

Same capabilities as Desktop, terminal-based.

1. Install: `npm install -g @anthropic-ai/claude-code`
2. `cd personal-agent && claude`
3. Start chatting or run `/today`

#### Cursor

AI-native code editor — good for power users who want to edit files and chat side-by-side.

1. Download [Cursor](https://cursor.com)
2. Open this folder as a project
3. Use the AI chat panel (`Cmd+L`) — it picks up `CLAUDE.md` as context
4. Pin `AGENTS.md` in chat for full agent instructions

#### Obsidian (companion, not AI)

Obsidian is great for **browsing and editing** your markdown files — kanban boards, linked notes, graph view. It doesn't run AI itself, but pairs perfectly with any of the tools above.

1. Download [Obsidian](https://obsidian.md)
2. Open this folder as a vault
3. Browse tasks, goals, and notes with a rich visual UI
4. Run your AI tool (Claude Desktop, Cursor, CLI) alongside Obsidian

### 3. Fill in your goals

This is the most important file. Everything the agent suggests is grounded in your goals. You can get started in three ways (and these are the same three ways you'll use and update skills ongoing):

- **Edit directly** — open `GOALS.md` and fill in the prompts (your role, vision, quarterly objectives, top 3 priorities)
- **Ask in natural language** — e.g. *"Help me fill in my GOALS.md. Ask me the questions you need."*
- **Use the `/onboard` command** — a handy skill included in this repo that walks you through a structured interview

### 4. Explore the example week

Check out `Tasks/Week-2026-W01.md` — it's a pre-filled example showing how the planning loop works. Monday and Tuesday are "lived" (items checked off, meeting notes, decisions), while Wednesday–Friday are still just planned. Run `/today` to see how the agent reads from this scratchpad and builds a daily briefing.

### 5. Start using it

**Daily:**
- `/today` — get your daily plan (reads from the weekly plan if it exists)
- Drop tasks into `BACKLOG.md` throughout the day
- `/backlog` — triage your backlog into structured task files
- *"Remember that I prefer..."* — save preferences to memory

**Weekly:**
- `/plan-week` — plan the full week on Monday morning
- `/weekly-wrap` — review the week, produce a shareable update, compound learnings

**As needed:**
- `/121 [person]` — prep for a 1:1 meeting
- `/draft [topic]` — draft an email, Slack message, or document
- `/unblock [task]` — diagnose a stalled task
- `/bias` — audit decisions against your motivational blind spots

## Folder Structure

```
personal-agent/
├── GOALS.md               # Your goals, vision, and priorities (fill this in first)
├── BACKLOG.md             # Raw capture inbox — dump ideas here
├── AGENTS.md              # Agent instructions (how the AI behaves)
├── CLAUDE.md              # Points to AGENTS.md (auto-loaded by Claude)
├── Weekly Kanban.md       # Sprint board — visual kanban with [[wiki-links]]
│
├── Tasks/                 # Structured task files with metadata
│   ├── Backlog/           # Initiative/track files — strategic context
│   └── Done/              # Completed tasks (archived here)
│
├── Context/               # Persistent personal context
│   ├── Memory/            # Facts, preferences, and compounded learnings
│   ├── Document Hub/      # Strategy docs, PRDs, reference material
│   ├── Meeting Notes/     # Meeting summaries
│   └── Progress Updates/  # Weekly wraps and reviews
│
├── Notes/                 # Daily notes and thinking
├── Bookmarks/             # Reading list and saved links
│
└── .claude/skills/        # Slash commands (auto-discovered)
    ├── today/             # /today — daily planning
    ├── plan-week/         # /plan-week — weekly planning
    ├── backlog/           # /backlog — triage inbox
    ├── weekly-wrap/       # /weekly-wrap — weekly review + learnings
    ├── 121/               # /121 — 1:1 meeting prep
    ├── draft/             # /draft — content drafting
    ├── unblock/           # /unblock — task diagnosis
    ├── bias/              # /bias — motivational bias audit
    └── onboard/           # /onboard — first-time setup
```

## How It Works

Cowork already gives you connectors (Slack, JIRA, Google, Canva), sub-agents, Chrome access, and local file operations. This workspace adds three layers on top:

1. **Context** (`GOALS.md`, `Context/Memory/`) — the agent reads these to understand who you are and what you're working toward. Without this, every Cowork session is a capable stranger. With it, every session picks up where the last one left off.

2. **Tasks** (`Tasks/`, `BACKLOG.md`, `Weekly Kanban.md`) — structured markdown with YAML frontmatter. Each task has a priority, status, description, and goal reference. The Kanban board gives you a visual sprint view. This is the state that persists between sessions.

3. **Skills** (`.claude/skills/`) — reusable workflows triggered by slash commands. Unlike generic Cowork skills, these read your context files, reference your goals, and adapt to your priorities. `/today` doesn't give you a generic plan — it gives you YOUR plan.

### The Planning Loop

```
Monday: /plan-week → creates Tasks/Week-YYYY-WNN.md with all 5 days
Daily:  /today → reads from weekly plan, reconciles with reality, updates the scratchpad
Friday: /weekly-wrap → reviews the week, produces shareable update, compounds learnings
```

### The Compounding Loop

```
/weekly-wrap distills insights → Context/Memory/learnings.md
    → future sessions reference past learnings
    → better advice → more learnings → repeat
```

Your agent after 4 weeks is meaningfully better than on day one.


## Create Your Own Skills

Add a file at `.claude/skills/<name>/SKILL.md`:

```markdown
---
name: my-skill
description: "What this skill does"
---

# My Skill

## Instructions

[Steps for the agent to follow]
```

Run it with `/my-skill`.

**Ideas:** `/status-update` · `/brainstorm [topic]` · `/retro` · `/goal-alignment`

## License

CC BY-NC-SA 4.0
