# Eval Criteria — [Skill Name]

_Generated: [date]_
_Checksum: [MD5 hash — computed at loop start, verified before each scoring step]_

**This file is READ-ONLY once the experiment loop begins.** If criteria need updating, the loop must stop, the user must approve changes, and a new baseline must be established.

The mutator agent never reads this file. Only the evaluator agent and the orchestrator have access.

---

## Test Inputs

### Tuning Set (used during experiment loop)

The mutator sees failure descriptions from these inputs.

1. [input/scenario description]
2. [input/scenario description]
3. [input/scenario description]
4. [input/scenario description]

### Holdout Set (used only at final validation)

Never shown to the mutator. Run once at the end to check for overfitting.

5. [input/scenario description]
6. [input/scenario description]
7. [input/scenario description]

---

## Eval Criteria

Each eval is scored independently by the evaluator agent. One eval per agent call.

### EVAL 1: [Short name]

**Question:** [Yes/no question about the output]
**Pass:** [What "yes" looks like — one sentence, specific]
**Fail:** [What triggers "no" — one sentence, specific]

### EVAL 2: [Short name]

**Question:** [Yes/no question about the output]
**Pass:** [What "yes" looks like — one sentence, specific]
**Fail:** [What triggers "no" — one sentence, specific]

### EVAL 3: No Banned Patterns

**Question:** Does the output contain zero matches from the banned list?
**Banned list:**
- [pattern] ([reason])
- [pattern] ([reason])

**Pass:** Zero matches found
**Fail:** One or more matches found

### EVAL 4: [Optional — Voice Match]

**Question:** Could this output and the reference example have been written by the same person?
**Reference:** [path to golden example file]
**Pass:** Tone, structure, word choice, and level of detail are consistent with the reference
**Fail:** Output reads noticeably different in formality, verbosity, structure, or word patterns

---

## Scoring Rules

- Each eval is scored by the evaluator agent in an isolated call (no batching)
- Each eval is scored twice per output — only counts as PASS if both runs agree
- The evaluator sees only the raw output and the single eval criterion — no skill context, no mutation history
- Max score = [number of evals] x [runs per experiment]
