# personal-agent

Become agent-native by running your personal agent locally using Obsidian+Claude or Cursor. No code, no database — just a folder of markdown files and an AI that understands your context, goals, and priorities.

Your agent reads your files, learns your preferences, remembers what you've learned, and helps you stay focused on what actually matters. It gets smarter every week.

## What It Does

- **Goal-driven task management** — every task ties back to your stated goals
- **Daily planning** — type `/today` and get a focused plan based on your priorities
- **Backlog triage** — brain-dump into `BACKLOG.md`, then run `/process-backlog` to turn raw notes into structured tasks
- **Weekly review** — `/weekly-wrap` reviews progress, surfaces blockers, and compounds learnings into memory so your agent gets smarter over time
- **Persistent memory** — your agent remembers preferences, decisions, and lessons across sessions

## Quick Start

### 1. Download this folder

```
git clone https://github.com/andi-canva/personal-agent.git
```

Or download the zip from the green **Code** button above.

### 2. Open it in an AI tool

You need two things: something to **edit and browse** your files, and something to **run the AI agent**. You can use one tool for both, or pair them.

#### Claude Code Desktop (recommended to start)

The simplest path. Claude reads your files and responds to slash commands out of the box.

1. Download [Claude Code Desktop](https://claude.ai/download) (macOS / Windows)
2. Open the app → **File > Open Folder** → select this `personal-agent` folder
3. Start chatting — try: *"Look at the files in this workspace. What do you see?"*

Skills (`/today`, `/weekly-wrap`, etc.) are auto-discovered from `.claude/skills/`.

#### Claude Code CLI

Same capabilities, terminal-based.

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

Open `GOALS.md` and fill in the prompts — your role, vision, quarterly objectives, top 3 priorities. This is the most important file. Everything the agent suggests is grounded in your goals.

Or let the agent interview you:

> *"Help me fill in my GOALS.md. Ask me the questions you need."*

### 4. Start using it

**Daily:**
- `/today` — get your daily plan
- Drop tasks into `BACKLOG.md` throughout the day
- `/process-backlog` — triage your backlog into structured task files
- *"Remember that I prefer..."* — save preferences to memory

**Weekly:**
- `/weekly-wrap` — review the week and compound learnings into memory
- `/goal-alignment` — check if your tasks actually support your goals

## Folder Structure

```
personal-agent/
├── GOALS.md               # Your goals, vision, and priorities (fill this in first)
├── BACKLOG.md             # Raw capture inbox — dump ideas here
├── AGENTS.md              # Agent instructions (how the AI behaves)
├── CLAUDE.md              # Points to AGENTS.md (auto-loaded by Claude)
│
├── Tasks/                 # Structured task files with metadata
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
    ├── process-backlog/   # /process-backlog — triage inbox
    ├── weekly-wrap/       # /weekly-wrap — weekly review + learnings
    └── goal-alignment/    # /goal-alignment — task-goal audit
```

## How It Works

Three layers:

1. **Context** (`GOALS.md`, `Context/Memory/`) — the agent reads these to understand who you are and what you're working toward. The richer your context, the better the output.

2. **Tasks** (`Tasks/`, `BACKLOG.md`) — structured markdown with YAML frontmatter. Each task has a priority, status, and goal reference.

3. **Skills** (`.claude/skills/`) — reusable workflows triggered by slash commands. They combine file reading, reasoning, and writing into repeatable routines.

### The Compounding Loop

The system gets smarter over time:

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

**Ideas:** `/prep-meeting [person]` · `/status-update` · `/brainstorm [topic]` · `/draft-comms [topic]`

## License

CC BY-NC-SA 4.0
