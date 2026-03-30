---
name: prd-ready
description: "Pre-flight checklist before human EPD review. Catches missing elements so reviewers don't waste time on incomplete docs."
---

# /prd-ready — Pre-flight Check Before Human Review

Check whether a PRD is ready for human EPD review. Reviewers' time is the scarce resource — don't waste it on incomplete docs.

## Instructions

When the user invokes `/prd-ready [prd-path]`, run through all steps in sequence.

If only a name is provided (e.g., "VoiceAgent PRD"), search:
1. `Tasks/` directory
2. `Context/Document Hub/` directory
3. Use Glob with the name pattern

---

### Step 1: Load the PRD

1. Read the full PRD file
2. Read `Context/Reference/writing-styles/prd.md` for what a complete PRD looks like
3. Read `GOALS.md` to verify goal alignment

### Step 2: Run Checklist

Check each item against the PRD content:

| # | Check | Section | Pass Criteria |
|---|---|---|---|
| 1 | Problem defined | Problem Statement | Non-empty, references a specific user pain point |
| 2 | Target users named | Who: Target Users | Specific segment (not "all users") |
| 3 | Hypothesis present | Success | "We believe..." statement with testable outcome |
| 4 | Success metrics | Success | At least one metric with a numeric threshold |
| 5 | P0 scope clear | Scope | Both in-scope and out-of-scope filled |
| 6 | Prototype linked | Interactive Prototype | URL or file path present |
| 7 | Golden examples | Eval Strategy | At least 5 examples in the behavior table (for AI features) |
| 8 | Risks with owners | Risks | At least one risk with a named owner or mitigation |
| 9 | Goal alignment | Any section | References a goal from GOALS.md |
| 10 | Priority tiers | Priority Tiers | P0/P1/P2 table filled with at least one capability |
| 11 | Review readiness | Review Readiness Checklist | Pass criteria filled for Product, Engineering, Design |
| 12 | Review summary | Review Summary | Problem, hypothesis, P0 scope, and prototype link filled |

For non-AI features, skip check #7 (golden examples).

### Step 3: Output Report

Present the results in this format:

```
PRD Review Readiness: [Document Name]

Pass: X/12  |  Fail: Y/12

PASS:
  [x] Problem defined
  [x] Hypothesis present
  [x] Target users named
  ...

FAIL:
  [ ] Golden examples — only 2 found, need at least 5
  [ ] Risks — no owner assigned to any risk

Recommendation: Fix the Y items above, then run /review [doc] for full EPD review.
```

### Step 4: Offer to Fix

For each failing check, offer a specific fix:

| Failing Check | Offer |
|---|---|
| Problem defined | "Want me to draft a problem statement from the prototype?" |
| Hypothesis missing | "Want me to draft a hypothesis based on the scope and metrics?" |
| Golden examples short | "Want me to generate more examples from the prototype behavior?" |
| Risks empty | "Want me to suggest risks based on the scope and dependencies?" |
| No prototype link | "Where is the prototype? I'll add the link." |
| Goal alignment missing | "Which goal from GOALS.md does this support?" |

After fixing, re-run the checklist and show updated results.

### Step 5: Handoff

When all checks pass:
> "This PRD passes pre-flight. Run `/review [doc]` for full multi-perspective EPD review, or share with reviewers directly."

## Key Principles

- Binary pass/fail — no partial credit, no subjective ratings
- Fix before review — don't send incomplete docs to human reviewers
- Quick to run — this should take under a minute
- Chain to `/review` — this is the gate before the full review skill
