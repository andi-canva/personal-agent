---
name: prd-draft
description: "Draft a first-pass PRD from a prototype or idea. Fills the template with problem, hypothesis, scope, golden examples, and prototype link."
---

# /prd-draft — First PRD Draft from Prototype

Generate a lightweight PRD alongside a prototype. The PRD captures *why* this matters and *what "great" looks like* — the stuff a prototype alone can't communicate.

## Instructions

When the user invokes `/prd-draft [prototype-link-or-description]`, run through all steps in sequence.

If the input is ambiguous, ask (batch these):
- What problem does this solve?
- Who is the target user?
- Which goal from GOALS.md does this support?

---

### Step 1: Load Context

Read these files:
1. `Context/Reference/company.md` — Canva context, AIRR metric, tech stack
2. `Context/Reference/stakeholders.md` — stakeholder profiles
3. `GOALS.md` — current priorities and success criteria

### Step 2: Load Voice & Template

1. Read `Context/Reference/writing-styles/prd.md` — PRD voice guide
2. Read `Tasks/Templates/prd.md` — PRD template structure

### Step 3: Gather Prototype Context

Based on what the user provides:

| Input Type | How to Use |
|---|---|
| URL / link | Note it for the Interactive Prototype section |
| Description of what was built | Extract capabilities, scope, and user flows |
| File path to code | Read and infer features, architecture, edge cases |
| Verbal idea (no prototype yet) | Draft the PRD to *guide* prototype creation |

If relevant context exists in `Context/Document Hub/` or `Tasks/Backlog/`, read it.

### Step 4: Generate the PRD

Using the template structure, fill in:

| Section | Source |
|---|---|
| **Problem + Target Users** | User input + company context |
| **Working Hypothesis** | Infer from problem + prototype purpose |
| **Success Metrics** | Best guess with thresholds; flag for review |
| **Scope (in/out)** | From prototype capabilities |
| **Key Features** | From prototype behavior |
| **Interactive Prototype** | Link or path from user input |
| **AI Task Definition** | From prototype's AI behavior (if applicable) |
| **Golden Examples** | 5-10 examples from observed/expected prototype behavior |
| **Risks + Dependencies** | Best guess; flag for review |
| **Milestones** | Phase 1 = prototype scope |

Leave Optional sections (Product Vision, Product Strategy, Definitions) empty unless the user provided relevant input.

### Step 5: Save and Present

1. Save to `Tasks/[InitiativeName] PRD.md`
2. Add a changelog entry: today's date, "Initial draft from /prd-draft"
3. Present a short summary:
   - Hypothesis
   - P0 scope (3-5 bullets)
   - Number of golden examples
   - Sections flagged for review
4. Ask: "Want me to adjust the scope, hypothesis, or examples? When ready, run `/prd-ready` to check review readiness."

## Key Principles

- The PRD is written *alongside* the prototype, not before it
- Keep it concise — fill-in prompts, not essays
- Flag uncertain sections with `[REVIEW]` rather than guessing confidently
- Apply the voice guide: hypothesis-driven, evidence over assertion, no marketing language
