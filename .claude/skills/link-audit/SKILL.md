---
name: link-audit
description: >
  Audit and repair cross-references in this personal-agent workspace. Use this
  skill whenever the user asks to "check links", "audit references", "connect
  files", "fix orphaned files", or wants to make sure everything is discoverable.
  Also trigger for "make sure everything is connected", "are there broken links",
  "tidy up the workspace", or "audit my tasks/context/docs". Unlike a generic
  vault auditor, this skill understands the two-hub structure of personal-agent:
  AGENTS.md governs Context/ docs, and Weekly Kanban.md governs Tasks/. It skips
  Tasks/Done/ (archived), BACKLOG.md (raw inbox), and .gitkeep files.
---

# Link Audit — personal-agent workspace

Audit the workspace for cross-reference health and fix any gaps. The goal is to
make every active file discoverable from its appropriate hub — so that a new
session (human or AI) can find everything it needs without prior knowledge of
the folder structure.

## Why this matters

When a workspace grows organically, files become stranded — they exist but
nothing links to them. An AI assistant starting from AGENTS.md or Weekly
Kanban.md can only see what those files point to. Everything else is invisible.
This audit catches that before it becomes a problem.

---

## Two-hub model

This workspace has two distinct hubs with different scopes. Apply audit rules
separately for each:

| Hub | Governs | What "linked" means |
|-----|---------|---------------------|
| `AGENTS.md` | `Context/` folder and its subfolders | Direct link or wikilink from AGENTS.md or a file it links to |
| `Weekly Kanban.md` | `Tasks/` root and `Tasks/Backlog/` | Entry in the Kanban board (wikilink `[[filename]]`) |

`GOALS.md` is special — it should be linked from AGENTS.md *and* referenced by
active task files (to show goal alignment). Check both directions.

---

## Scope: what to include and exclude

**Include:**
- `Context/Memory/` — user profile, preferences, learnings, bias profile
- `Context/Memory/Reference/` — writing-style guides, frameworks
- `Context/121s/` — 1:1 relationship docs
- `Context/Document Hub/` — PRDs, strategy docs
- `Context/Meeting Notes/` — meeting summaries
- `Context/Progress Updates/` — weekly wraps
- `Tasks/` (root level) — active task files
- `Tasks/Backlog/` — initiative context docs
- `GOALS.md`, `Weekly Kanban.md`, `AGENTS.md`

**Exclude:**
- `Tasks/Done/` — archived, intentionally disconnected
- `BACKLOG.md` — raw capture inbox, not a navigable doc
- `README.md` files anywhere — folder documentation, not workspace content
- `.claude/` — hidden; contains skill definitions, not workspace content
- `.git/`, `.gitignore`, `.gitattributes`, `.gitkeep` — infrastructure
- `Notes/` — daily/scratch notes; freeform by design, not required to be linked
- `Bookmarks/` — reading list; freeform by design

---

## Audit process

### Phase 1: Discovery (run a script)

Write and run a short Python script to build the link graph. This is faster and
more reliable than eyeballing the files. The script should:

1. List all `.md` files in the included scope (above), skipping excluded paths
2. For each file, extract:
   - Wikilinks: `[[target]]` and `[[target|display text]]`
   - Local markdown links: `[text](relative/path.md)`
   - Ignore external URLs, anchor-only links, and image embeds
   - **Skip links inside code blocks** — any `[[...]]` or `[...](...)` that
     appears inside backtick-delimited inline code, fenced code blocks (```),
     YAML frontmatter, or ASCII directory trees is a documentation example, not
     a real link. A good heuristic: if the line containing the link starts with
     `├`, `│`, `└`, or the link text is inside backticks, skip it. This is
     important because AGENTS.md contains example wikilinks like `` `[[wiki-links]]` ``
     and `[[Task Name]]` that are syntax documentation, not references to real files.
3. Resolve wikilink targets by matching filename (without extension) anywhere in
   the workspace — this is how Obsidian and Claude Code resolve them
4. Output counts: total scoped files, hub outlinks, files not linked from hub,
   broken links

Use the script's output as the source of truth for all numbers in the report.

### Phase 2: Analysis — check each hub separately

#### Hub 1: AGENTS.md → Context/ docs

- How many `Context/` files does AGENTS.md link to (directly or via files it
  links to)?
- Which `Context/` files are NOT reachable from AGENTS.md at all?
- Does AGENTS.md link to `GOALS.md`?

#### Hub 2: Weekly Kanban.md → Tasks/

- How many task files in `Tasks/` root and `Tasks/Backlog/` have a wikilink
  entry in `Weekly Kanban.md`?
- Which task files are NOT represented in the Kanban at all? (These are the
  invisible tasks — worst case.)
- Are there any Kanban entries that link to files that don't exist (broken
  wikilinks)?

#### Cross-cutting checks

- **Broken links** — any link (wikilink or markdown) whose target file doesn't
  exist. These are the highest priority to fix.
- **GOALS.md alignment** — do active task files in `Tasks/` reference a goal
  from GOALS.md in their Context section? Flag any that don't.
- **Key identifiers** — scan for Slack channel IDs (`C[A-Z0-9]{8,}`), Jira keys
  (`[A-Z]+-\d+`), or important URLs that appear only in leaf files but not in
  AGENTS.md or the relevant hub.

### Phase 3: Report

Present findings using this structure:

```
## Link audit — personal-agent workspace

### Broken links (N)
- <source file> → [[missing-target]] (not found)
[If none: "None — all links resolve correctly."]

### AGENTS.md → Context/ coverage: N of M files reachable
Files NOT reachable from AGENTS.md:
- Context/Memory/some-file.md — [first heading or "no heading"]
[If none: "All Context/ files are reachable from AGENTS.md."]

### Weekly Kanban → Tasks/ coverage: N of M task files linked
Task files NOT in Weekly Kanban:
- Tasks/some-task.md — [title from frontmatter]
[If none: "All active task files appear in Weekly Kanban.md."]

### GOALS.md alignment
Task files with no goal reference:
- Tasks/some-task.md — no goal cited in Context section
[If none: "All active tasks reference a goal."]

### Key identifiers not in hub
- Jira key PROJ-123 found in Tasks/foo.md but not in AGENTS.md
[If none: omit this section.]

### Suggested fixes
1. [Specific action — e.g., "Add 3 links to AGENTS.md for orphaned Context/ docs"]
2. [Specific action]
3. [Specific action — for broken links, ask the user before deleting]
```

After presenting the report, always ask explicitly: **"Want me to go ahead and
fix these?"** — wait for confirmation before proceeding to Phase 4. This is a
hard stop, not a suggestion. The user may want to adjust priorities or skip
certain fixes.

### Phase 4: Fix

Apply fixes only after the user confirms. Work in this order:

#### 1. Broken links first
Don't silently remove broken links — they may indicate files that *should* exist
but haven't been created yet. Present each one and ask whether to: fix the
target, stub out the missing file, or remove the link. Only remove if the user
confirms.

#### 2. Add missing links to AGENTS.md
Add orphaned `Context/` docs to the relevant section of AGENTS.md. Match the
existing format (AGENTS.md uses a table for folder roles — add a row or a
reference note in the appropriate section). Add a brief annotation per link:
```markdown
- `Context/Memory/bias.md` — Marlee motivational profile; read at session start
```

#### 3. Add missing task files to Weekly Kanban.md
For each active task file not in the Kanban, add an entry under the appropriate
column (default to "Backlog" if unsure). Match the existing wikilink format:
```markdown
- [ ] [[task-file-name]] — one-line summary #priority
```

#### 4. Add back-links to stranded files
For `Context/` files with no link back to AGENTS.md, add a navigation line near
the top (after the H1 heading):
```markdown
**See also:** [[AGENTS]] | [[related-file]]
```
Keep it minimal — 1–2 links. The goal is one-hop navigation, not full mesh.

#### 5. Flag GOALS.md alignment gaps
Don't automatically edit task files for goal alignment — this is a judgment
call. Instead, list the gaps and ask the user if they want to add goal refs or
if the tasks are intentionally unaligned.

### Phase 5: Verification

After applying fixes, re-run the discovery script to confirm:
- Zero broken links (or user-approved exceptions)
- All active `Context/` files reachable from AGENTS.md
- All active `Tasks/` files represented in Weekly Kanban.md

Report before/after numbers.

---

## Key principles

- **Don't restructure.** This skill adds navigation links and Kanban entries. It
  doesn't move, rename, or rewrite content.
- **Match existing conventions.** AGENTS.md uses markdown links; Weekly
  Kanban.md uses wikilinks. Follow what's already there.
- **Respect the two-hub model.** A task file doesn't need to link to AGENTS.md,
  and a Context doc doesn't need to be in the Kanban. The hubs are separate
  concerns.
- **Don't touch Tasks/Done/.** Completed tasks are archived intentionally.
- **BACKLOG.md is a inbox, not a doc.** Don't add navigation links to it.
