---
name: prd-update
description: "Sync a PRD after prototype changes — updates scope, features, golden examples, and changelog to keep the PRD as a living document."
---

# /prd-update — Sync PRD After Prototype Changes

Keep the PRD in sync with the prototype as it evolves. Prototypes are cheap to iterate; the PRD must keep up or it becomes stale.

## Instructions

When the user invokes `/prd-update [prd-path] [what-changed]`, run through all steps in sequence.

If only a name is provided (e.g., "VoiceAgent PRD"), search:
1. `Tasks/` directory
2. `Context/Document Hub/` directory
3. Use Glob with the name pattern

If `[what-changed]` is not provided, ask: "What changed in the prototype?"

---

### Step 1: Load the PRD

1. Read the existing PRD file
2. Read `Context/Reference/writing-styles/prd.md` for voice

### Step 2: Parse What Changed

Based on the user's description, categorize the changes:

| Change Type | Sections to Update |
|---|---|
| Feature added | Scope (in-scope), Key Features, Golden Examples |
| Feature cut | Scope (out-of-scope), Key Features |
| Scope expanded | Scope, Risks, Success Metrics |
| Scope narrowed | Scope, Key Features |
| New edge case discovered | Golden Examples, Risks |
| Architecture changed | Proposed Solution, Feasibility Review |
| Hypothesis shifted | Success, Working Hypothesis |
| Prototype rebuilt | Interactive Prototype (what is real vs simulated) |

### Step 3: Update Affected Sections

For each affected section:
- Edit the content to reflect the change
- Keep the same voice and formatting as the rest of the PRD
- If a change introduces uncertainty, flag with `[REVIEW]`
- Do NOT touch sections unaffected by the change

### Step 4: Update Changelog

Add a new row to the changelog table:

```
| YYYY-MM-DD | [Description of what changed via /prd-update] |
```

### Step 5: Present Summary

Show a diff-style summary of what was updated:

```
PRD Updated: [Name]

Changed:
  ~ Scope — added [feature], moved [feature] to out-of-scope
  ~ Golden Examples — added 2 new examples (#6, #7)
  ~ Risks — new risk: [risk name]

Unchanged: Problem, Hypothesis, Milestones, Rollout Plan
```

Then ask: "Want me to run `/prd-ready` to check if this is ready for review?"

## Key Principles

- Only update what changed — don't rewrite the whole document
- Preserve the original author's voice and structure
- Flag new uncertainties with `[REVIEW]` rather than inventing answers
- Always add a changelog entry so readers can track evolution
