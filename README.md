# Your Personal Agent Harness

Your AI chief-of-staff — a personal operating system for product managers that runs the operating rhythm, compounds learnings, and gets smarter every week. No code, no database — just a folder of markdown files and an AI that understands your context, goals, and priorities.

Works with **Claude Code Desktop**, **Claude Code CLI**, **Claude Co-Work**, **Cursor**, or any agent that reads local files. The harness is the folder structure and skills — the tool is just the delivery mechanism.

## What It Does

- **Chief-of-staff operating rhythm** — weekly plans, daily focus, meeting prep, bias checks
- **Three-layer architecture** — raw sources, LLM-maintained wiki synthesis, lean schema
- **Conditional context loading** — `.claude/rules/` with glob triggers, not a bloated root file
- **Compound-on-Touch** — every skill silently fixes stale data and promotes valuable outputs
- **Goal-driven prioritization** based on your vision
- **1:1 prep** — `/121 [person]` pulls context and maintains ongoing relationship docs
- **Meeting prep built into /today** — 1:1s get full talking points; normal meetings get a 1-bullet action
- **Content drafting** — `/draft [topic]` writes in your voice, not generic AI
- **Document steelmanning** — `/steelman-advice [doc]` runs parallel critique perspectives
- **System health lint** — `/verify` checks for contradictions, stale claims, orphan files, missing pages
- **Persistent memory** — your agent remembers preferences, decisions, and lessons across sessions

## Quick Start

### 1. Download this folder

```
git clone https://github.com/canvanauts/personal-agent.git
```

Or download the zip from the green **<Code>** button above.

Put it somewhere that makes sense for you (not just Downloads). It's a normal folder you open in your AI tool when you use it.

### 2. Open it in an AI tool

You need two things: something to **edit and browse** your files, and something to **run the AI agent**. You can use one tool for both, or pair them.

#### Claude Code Desktop (recommended)

Full Claude Code experience in an app. Fully customizable, reads your files, runs skills.

1. Download [Claude Code Desktop](https://claude.ai/download) (macOS / Windows)
2. Open the app, click the **Code** tab at the top, select **Local**, then click **Select folder** and choose the `personal-agent` folder
3. Start chatting — try: *"Look at the files in this workspace. What do you see?"*

Skills (`/today`, `/weekly-wrap`, etc.) are auto-discovered from `.claude/skills/`.

#### Claude Co-Work (lighter alternative)

Claude Code in a business suit — handles most tasks, less customizable, but zero setup.

1. Open [Claude Co-Work](https://claude.ai) and select this folder
2. Start chatting — skills are discovered at session start via the boot sequence in AGENTS.md

> **Tip:** Co-Work's built-in `/` menu doesn't know about local skills. If typing `/today` shows "unknown skill", type `run /today` or just `today` instead — the agent recognizes all forms.

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

This is the most important file. Everything the agent suggests is grounded in your goals. Three ways to get started:

- **Edit directly** — open `GOALS.md` and fill in the prompts (your role, vision, quarterly objectives, top 3 priorities)
- **Ask in natural language** — e.g. *"Help me fill in my GOALS.md. Ask me the questions you need."*
- **Use the `/onboard` command** — a skill included in this repo that walks you through a structured interview

### 4. Explore the example week

Check out `Tasks/Week-2026-W01.md` — it's a pre-filled example showing how the planning loop works. Monday and Tuesday are "lived" (items checked off, meeting notes, decisions), while Wednesday–Friday are still just planned. Run `/today` to see how the agent reads from this scratchpad and builds a daily briefing.

### 5. Start using it

**Daily:**
- `/today` — get your daily plan (reads from the weekly plan if it exists)
- *"Remember that I prefer..."* — save preferences to memory

**Weekly:**
- `/plan-week` — plan the full week on Monday morning
- `/weekly-wrap` — review the week, produce a shareable update, compound learnings

**As needed:**
- `/121 [person]` — prep for a 1:1 meeting (also runs automatically inside `/today`)
- `/draft [topic]` — draft an email, Slack message, or document
- `/steelman-advice [doc]` — multi-perspective critique of any document
- `/slack-unactioned` — triage unread Slack into Tonight vs Tomorrow
- `/unblock [task]` — diagnose a stalled task
- `/bias` — audit decisions against your motivational blind spots
- `/verify` — lint the knowledge system for health issues

## Directory Structure

```
personal-agent/
├── GOALS.md                # Your goals, vision, and priorities (fill this in first)
├── AGENTS.md               # Agent instructions (~85 lines — lean by design)
├── CLAUDE.md               # Thin import → @AGENTS.md
├── Weekly Kanban.md        # Sprint board — visual kanban with [[wiki-links]]
│
├── Tasks/                  # Structured task files with metadata
│   ├── Backlog/            # Initiative/track files — strategic context
│   └── Done/               # Completed tasks (archived here)
│
├── Context/                # Persistent personal context
│   ├── Memory/             # Facts, preferences, and compounded learnings
│   ├── 121s/               # Ongoing 1:1 relationship docs (maintained by /121)
│   ├── Knowledge/          # Accumulated knowledge and reference material
│   ├── Document Hub/       # Strategy docs, PRDs, reference material
│   ├── Meeting Notes/      # Meeting summaries
│   ├── Progress Updates/   # Weekly wraps and reviews
│   └── Reference/          # Writing-style guides, frameworks, company context
│
├── Notes/                  # Daily notes and thinking
├── Bookmarks/              # Reading list and saved links
│
└── .claude/
    ├── skills/             # Slash commands (auto-discovered)
    ├── agents/             # Sub-agents for /review
    └── rules/              # Conditional rules (load when relevant files are touched)
```

## System Concepts

### Three-Layer Architecture

The system follows a three-layer pattern (inspired by Karpathy's [LLM-Wiki](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)):

- **Raw sources** (Meeting Notes, Knowledge, Document Hub) — immutable input. The agent reads from these but never modifies them.
- **Wiki layer** (Context/Memory/ domain indexes, by-topic.md, learnings.md) — LLM-maintained synthesis. The agent updates these to keep knowledge current and cross-referenced.
- **Schema** (AGENTS.md + .claude/rules/ + skills) — governs behavior. Co-evolved by you and the agent.

### Progressive Disclosure via `.claude/rules/`

AGENTS.md is intentionally lean (~85 lines). Detailed process rules live in `.claude/rules/` with glob-based triggers so they only load when relevant:

| Rule file | Loads when touching | Contains |
|-----------|-------------------|----------|
| `task-lifecycle.md` | `Tasks/**` | Task completion, promotion, daily guidance |
| `templates.md` | `Tasks/**`, `Context/**`, `Notes/**` | File templates (task, knowledge, meeting note) |
| `compound-on-touch.md` | `Tasks/**`, `Context/Memory/**` | Detailed compounding rules, conversation promotion |
| `topic-vocabulary.md` | `Tasks/**`, `Context/**` | Standard topic tags for frontmatter |

### The Planning Loop

```
Monday: /plan-week → creates Tasks/Week-YYYY-WNN.md with all 5 days
Daily:  /today → reads from weekly plan, preps every meeting, updates the scratchpad
Friday: /weekly-wrap → reviews the week, produces shareable update, compounds learnings
```

### Week File Lifecycle

`Tasks/Week-YYYY-WNN.md` lives in Tasks/ root during the active week. When `/weekly-wrap` runs, it:

1. Closes the week file (marks outcomes, maps to wrap)
2. Moves the file to `Tasks/Done/Week-YYYY-WNN.md`
3. Carries forward incomplete items to the wrap's "CW[XX+1] Focus" section
4. Syncs the Kanban: clears "This Week", moves completed items to "Done"

`/plan-week` then reads the prior wrap's carry-forwards and populates the new week + "This Week" column.

### The Compounding Loop

```
/plan-week (Mon) → references last week's learnings → better plan
    ↓
/today (daily) → fixes stale data it touches → cleaner system
    ↓
/weekly-wrap (Fri) → distills learnings + promotes outputs + rebuilds indexes → richer context
    ↓
next /plan-week → starts from better base → repeat
```

After 4 weeks, the system should have: richer Memory, up-to-date indexes, promoted outputs in the right folders, and standing principles distilled from patterns.

Valuable conversation outputs also compound — when a session produces a synthesis, comparison, or decision framework worth keeping, the agent offers to file it into the wiki layer (domain indexes, Knowledge, or learnings).

### How to Approach Tasks

- **Break it down first.** Outline non-trivial tasks (3+ steps) before starting. Re-plan immediately if things go sideways.
- **One task, one outcome.** Keep tasks focused — if it has two distinct outcomes, it's two tasks.
- **Verify before marking done.** Check the output against the original goal. Don't mark done just because steps were completed.
- **Anticipate follow-ups.** If a task will obviously trigger a next step, flag it or create the follow-on task immediately.
- **Root causes, not band-aids.** Fix the underlying issue, not the symptom. If the same problem keeps recurring, change the process.
- **Use sub-agents for complex work.** Kick off parallel research or drafting agents for independent pieces rather than doing everything sequentially.

### Categories

- **technical**: build, fix, configure
- **outreach**: communicate, meet
- **research**: learn, analyze
- **writing**: draft, document
- **content**: blog posts, social media, public writing
- **admin**: operations, finance, logistics
- **personal**: health, routines
- **other**: everything else

## How This Relates to Co-Work

If you're using Claude Co-Work, this workspace is complementary — not a replacement.

| Co-Work alone | Co-Work + this workspace |
|---|---|
| Each session starts blank | Sessions inherit your goals, memory, and learnings |
| Skills are generic recipes | Skills reference YOUR goals and context |
| No memory across sessions | `Context/Memory/` persists everything |
| You repeat yourself every time | `GOALS.md` is read automatically |

Co-Work provides the hands (connectors, sub-agents, Chrome, local files). This workspace provides the brain (goals, memory, learnings, skills that know you). You don't need to choose — they stack.

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
