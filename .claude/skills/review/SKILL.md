---
name: review
description: Multi-perspective document review using 7 specialized reviewer agents. Reviews a document from engineering, design, exec, legal/T&S, UX research, devil's advocate, and customer perspectives.
---

# /review — Multi-Perspective Document Review

Invoke: `/review [doc]` or `/review [doc] --reviewers engineer,exec,devil` or `/review [doc] --with-prototype [link|path]`

## What This Does
Reviews any document (PRD, strategy doc, roadmap, etc.) from up to 7 specialist perspectives. Each reviewer returns a rating, top 3 findings, and a critical blocker if one exists. Results are consolidated into a Summary Table and Must-Fix / Should-Fix list.

When `--with-prototype` is provided, each reviewer also evaluates PRD-Prototype alignment.

---

## Step 1: Load the Document

If a file path is provided, read it directly.

If only a name is provided (e.g., "VoiceAgent PRD"), search:
1. `Tasks/` directory
2. `Context/Document Hub/` directory
3. Use Glob with the name pattern

Once found, read the full document.

---

## Step 2: Load Context

Always read:
- `Context/Reference/company.md` — Canva context, AIRR metric, tech stack, decision patterns
- `Context/Reference/stakeholders.md` — stakeholder profiles and communication rules
- `GOALS.md` — current priorities and success criteria

---

## Step 3: Determine Reviewers

**Default (no --reviewers flag):** Run all 7 reviewers.

**With --reviewers flag:** Run only named reviewers. Valid values:
`engineer`, `designer`, `exec`, `legal-ts`, `ux-researcher`, `devil`, `customer`

**Example:** `/review Tasks/VoiceAgent PRD.md --reviewers exec,devil,engineer`

---

## Step 3b: Load Prototype (if --with-prototype)

When `--with-prototype [link|path]` is provided:

1. Note the prototype link/path for each reviewer
2. If the prototype is a local file, read it for context
3. Each reviewer gets an additional review lens:

| Reviewer | Prototype Question |
|---|---|
| Engineer | Does the prototype match the technical approach described in the PRD? |
| Designer | Does the prototype cover all P0 flows and named edge cases? |
| Product (Exec) | Can we test the working hypothesis with this prototype? |
| UX Researcher | Does the prototype expose the user flows needed for testing? |
| Customer Voice | Is the prototype experience intuitive for the target user? |

4. Add a **PRD-Prototype Alignment** section to the consolidated output:

```
## PRD-Prototype Alignment
| Check | Status | Detail |
|-------|--------|--------|
| P0 flows covered | Match / Gap / Mismatch | [specifics] |
| Edge cases handled | Match / Gap / Mismatch | [specifics] |
| Technical approach | Match / Gap / Mismatch | [specifics] |
| Hypothesis testable | Match / Gap / Mismatch | [specifics] |
```

---

## Step 4: Run Reviews

For each requested reviewer, invoke the corresponding agent from `.claude/agents/[name]/AGENT.md`.

Each reviewer returns:
- **Rating:** 🟢 / 🟡 / 🔴
- **Top 3 Findings**
- **Critical Blocker** (if any)
- **Minor Suggestions**

Run reviewers in parallel where possible (they are independent).

---

## Step 5: Consolidate Results

### Output Format

```
# Review: [Document Name]
_Reviewed: [date] | Reviewers: [list]_

## Summary Table

| Reviewer | Rating | Top Finding | Blocker? |
|----------|--------|-------------|----------|
| Engineer | 🟡 | [finding] | No |
| Designer | 🔴 | [finding] | Yes — [blocker] |
| Exec | 🟢 | [finding] | No |
| Legal/T&S | 🟡 | [finding] | No |
| UX Research | 🟡 | [finding] | No |
| Devil's Advocate | 🟡 | [finding] | No |
| Customer Voice | 🟢 | [finding] | No |

## Overall Readiness: [🟢 Ready / 🟡 Needs revision / 🔴 Not ready]
[1-2 sentence overall assessment]

## Cross-Reviewer Themes
_(Issues flagged by 3+ reviewers)_
- [Theme 1]: Flagged by [reviewer list]
- [Theme 2]: Flagged by [reviewer list]

## Must-Fix (Blockers)
- [ ] [Critical issue from reviewer X]
- [ ] [Critical issue from reviewer Y]

## Should-Fix (High Priority)
- [ ] [Top finding from reviewer X]
- [ ] [Top finding from reviewer Y]
- [ ] [Top finding from reviewer Z]

## Strengths / Agreements
- [What multiple reviewers praised or found strong]

---

## Detailed Reviewer Findings

[Full output from each reviewer, in sections]
```

---

## Step 6: Offer Follow-Up Actions

After presenting the consolidated output, offer:
1. **Go deep on a reviewer:** "Want me to go deeper on [reviewer]'s findings?"
2. **Re-run after revision:** "Once you've addressed the Must-Fix items, run `/review [doc] --rerun` to re-check"
3. **Draft revision language:** "Want me to draft the revised [section name] based on [reviewer]'s feedback?"

---

## Re-Run Support

`/review [doc] --rerun [reviewer]` — Re-run a specific reviewer (e.g., after revising the exec framing)

`/review [doc] --rerun` — Re-run all reviewers, comparing against previous round

When re-running, note what changed: "Previously 🔴, now 🟡 — [what improved]"
