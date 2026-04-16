---
name: autoeval
description: "Autonomously optimize any Agent skill by running it repeatedly, scoring outputs against binary evals, mutating the prompt, and keeping improvements. Based on Karpathy's autoresearch methodology. Use when: optimize this skill, improve this skill, run autoeval on, make this skill better, self-improve skill, benchmark skill, eval my skill, run evals on. Outputs: an improved SKILL.md, a results log, and a changelog of every mutation tried."
---

# Auto-Eval: Autonomous Skill Optimization

Most skills work about 70% of the time. The other 30% you get garbage. The fix isn't to rewrite the skill from scratch. It's to let an agent run it dozens of times, score every output, and tighten the prompt until that 30% disappears.

Adapted from Andrej Karpathy's autoresearch methodology (autonomous experimentation loops), applied to Agent skill prompts instead of ML training code. The key architectural principle: **the agent doing the optimization must never control the evaluation.** In Karpathy's setup, `prepare.py` (the evaluation harness) is read-only. Here, the evaluator runs as an isolated sub-agent that never sees the skill prompt, and the mutator never sees the eval criteria.

---

## Is Auto-Eval Right for This?

Not every skill benefits from autonomous optimization. Before starting, check the fit.

| Good fit | Poor fit |
|----------|----------|
| Classification tasks (intent routing, triage) with labeled datasets | Open-ended generation (creative writing, strategy docs) |
| Tasks with objective/measurable criteria (accuracy, format compliance) | Tasks where requirements keep expanding |
| Tasks with stable eval criteria that don't change run-to-run | Tasks where "good" is highly subjective and context-dependent |
| Skills where you have 5+ golden examples of good output | Skills with no reference outputs |

For poor-fit tasks, use the manual correction loop (Step 7) instead: run the skill, fix the output yourself, convert each fix into a new eval, repeat. The human stays in the loop every cycle.

---

## Architecture: Four Isolated Agents

The skill uses four agents with strict isolation boundaries. This prevents the optimizer from gaming the evaluation.

**Orchestrator** (this skill, the main loop):
- Manages the experiment loop, records results, coordinates agents
- Calls mutator, evaluator, and gating agents as sub-agents via the `Task` tool
- Sanitizes information flowing between them
- Manages trace saving and suite promotion

**Mutator agent** (`agents/mutator.md`):
- Receives: current SKILL.md, changelog, sanitized failure descriptions, trace file paths for failing outputs
- Returns: one targeted mutation with reasoning
- Never sees: eval criteria, scores, evaluator reasoning, suite.json

**Evaluator agent** (`agents/evaluator.md`):
- Receives: one raw output + one eval criterion
- Returns: PASS or FAIL with one-sentence justification
- Never sees: skill prompt, mutation history, prior scores, other evals

**Gating agent** (`agents/gating.md`):
- Receives: current results, suite.json, results.tsv history
- Returns: PASS or FAIL with per-step breakdown (regression, val_score, promotion candidates)
- Never sees: skill prompt, mutation history, evaluator reasoning

The evaluator scores one eval at a time in a separate agent call. No batching multiple evals into one prompt (cross-contamination makes a strong pass on eval 1 bias the judge toward passing eval 2).

---

## The Core Job

Take any existing skill, define what "good output" looks like as binary yes/no checks, then run an autonomous loop that:

1. Generates outputs from the skill using tuning-set inputs
2. Scores every output via the isolated evaluator agent
3. Sends failure descriptions to the mutator agent
4. Mutator proposes one targeted change to the skill prompt
5. Keeps mutations that clear the improvement threshold, discards the rest
6. Repeats until the score ceiling is hit or the user stops it

**Output:** An improved SKILL.md + `results.tsv` score log + `changelog.md` of every mutation attempted + frozen `eval-criteria.md` + `suite.json` regression suite + `learnings.md` persistent log + `traces/` output archive.

---

## Before Starting: Gather Context

**STOP. Do not read the skill, do not define evals, do not run any experiments until all fields below are explicitly confirmed by the user in this conversation. This gate holds regardless of how much context the user has already provided.**

**Why this matters:** Inferring evals from context is how you get evals that sound right but test the wrong thing. The user may have additional failure modes in mind, different test inputs, or a different pass threshold. Always confirm before proceeding.

**Ask the user for all of the following in a single message. Do not proceed until they respond:**

1. **Target skill** — Which skill do you want to optimize? (need the exact path to SKILL.md)
2. **Test inputs** — What 6-8 different prompts/scenarios should we test the skill with? (need at least 6 so we can split into tuning and holdout sets. Variety matters, pick inputs that cover different use cases so we don't overfit to one scenario)
3. **Eval criteria** — What 3-6 binary yes/no checks define a good output? (see [eval-guide.md](eval-guide.md) for how to write good evals). If the user says "based on our conversations" or similar, propose your best-guess evals and ask them to confirm or correct.
4. **Reference corpus** — Optional but powerful for voice/style skills. Does the user have 3-5 real examples of good output they actually used? If yes, collect them into a `references/golden-examples/` folder.
5. **Banned patterns** — Optional. A list of words, phrases, or regex patterns that should never appear in the output. (see [eval-guide.md](eval-guide.md) "Banned-pattern evals" section)
6. **Runs per experiment** — How many times should we run the skill per mutation? Default: 5.
7. **Budget cap** — Optional. Max number of experiment cycles before stopping. Default: no cap (runs until you stop it).

---

## Step 1: Read the Skill

Before changing anything, read and understand the target skill completely.

1. Read the full SKILL.md file
2. Read any files in `references/` that the skill links to
3. Identify the skill's core job, process steps, and output format
4. Note any existing quality checks or anti-patterns already in the skill

Do NOT skip this. You need to understand what the skill does before you can improve it.

---

## Step 2: Build the Eval Suite and Lock It

Convert the user's eval criteria into the frozen eval spec. This file becomes read-only once the loop starts.

1. Create `autoeval-[skill-name]/eval-criteria.md` using the template at `templates/eval-criteria.md`
2. Write all eval criteria into the file
3. Split test inputs into two sets:
   - **Tuning set** (60-70%): used during the experiment loop. The mutator sees failure descriptions from these.
   - **Holdout set** (30-40%): NEVER shown to the mutator. Only run at the very end (Step 6) to validate that improvements generalize.
4. Compute an MD5 checksum of the file and record it in the header
5. Confirm the eval suite with the user before proceeding

**Three types of evals (use all three when applicable):**

### a) Standard binary evals

```
EVAL [N]: [Short name]
Question: [Yes/no question about the output]
Pass: [What "yes" looks like — be specific]
Fail: [What triggers a "no"]
```

### b) Banned-pattern evals

```
EVAL [N]: No banned patterns
Question: Does the output contain zero matches from the banned list?
Banned list: [list every banned string/phrase/regex]
Pass: Zero matches found
Fail: One or more matches found
```

### c) Reference corpus evals (for voice/style skills)

```
EVAL [N]: Voice match
Question: Could this output and the reference example have been written by the same person?
Pass: Tone, structure, word choice, and level of detail are consistent with the reference
Fail: Output reads noticeably different
```

**Rules for good evals:**
- Binary only. No scales.
- Specific enough to be consistent. "Is the text readable?" is too vague.
- Not so narrow that the skill games the eval.
- 3-6 evals is the sweet spot.
- Banned-pattern evals count as one eval regardless of how many patterns are in the list.

See [eval-guide.md](eval-guide.md) for detailed examples.

**Max score calculation:**
```
max_score = [number of evals] × [number of tuning inputs]
val_score = total passes / max_score  (float 0.0–1.0)
```

**Once the loop starts, eval-criteria.md is READ-ONLY.** If criteria need updating: stop the loop, user approves changes, re-establish baseline. The mutator agent never reads this file.

---

## Step 3: Establish Baseline

Run the skill AS-IS before changing anything. This is experiment #0.

1. Create a working directory: `autoeval-[skill-name]/` adjacent to the target skill or task (same parent folder as the SKILL.md being optimized)
2. Create `results.tsv` with the header row
3. Back up the original SKILL.md as `SKILL.md.baseline`
4. Initialize `suite.json` using the template at `templates/suite.json` (empty entries, threshold 0.8)
5. Initialize `learnings.md` using the template at `templates/learnings.md`
6. Create `traces/baseline/` and `traces/latest/` directories
7. Run the skill using **tuning set inputs only** (holdout is reserved for final validation)
8. **Save baseline traces.** Write each raw output to `traces/baseline/input-[N].md` and `traces/latest/input-[N].md`. Baseline traces are never overwritten. Latest traces are overwritten each experiment.
9. Score every output via the evaluator agent (one eval per call, scored twice per output, pass only if both runs agree)
10. Compute `val_score` = total passes / (number of evals x number of tuning inputs). This is the mean pass rate.
11. Record the baseline in results.tsv
12. **Promote passing combos into suite.** Any input+eval pair that passed at baseline gets added to `suite.json`. These must never regress.

**If a prior `autoeval-[skill-name]/` directory exists** (from a previous optimization session), read `learnings.md` and `suite.json` before starting. Resume from the existing suite — do not reset it. The regression suite accumulates across sessions.

**results.tsv format (tab-separated):**

```
experiment	score	max_score	pass_rate	val_score	suite_pass_rate	stability	status	description
0	14	20	70.0%	0.7000	-	-	baseline	original skill, no changes
```

- `val_score` = mean pass rate across all evals and tuning inputs (float 0.0-1.0)
- `suite_pass_rate` = pass rate on regression suite entries. "-" when suite is empty.
- `stability` = standard deviation of val_scores over last 3 experiments. "-" for the first two.

**IMPORTANT:** After establishing baseline, confirm the score with the user before proceeding. If baseline is already 90%+, the skill may not need optimization — ask the user if they want to continue.

---

## Step 4: Run the Experiment Loop

This is the core autoeval loop. Once started, run autonomously until stopped.

**Before each cycle, verify the MD5 checksum of eval-criteria.md. If it has changed, halt and alert the user.**

**LOOP:**

1. **Analyze failures (orchestrator).** Look at which evals failed on which tuning-set inputs. Write sanitized failure descriptions: "input 3 failed eval 2: [brief description of the failing output]". Include the trace file path (`traces/latest/input-[N].md`) so the mutator can read the failing output directly. Do NOT include eval criteria text or scores in the description.

2. **Call the mutator agent.** Send: current SKILL.md, the changelog, the sanitized failure descriptions, and trace file paths for failing outputs. The mutator proposes ONE change. Launched via `Task` tool with `subagent_type: "generalPurpose"`, passing `agents/mutator.md` instructions.

3. **Apply the mutation.** Edit SKILL.md with the mutator's change.

4. **Run the experiment.** Execute the skill [N] times using tuning set inputs. **Save traces:** overwrite `traces/latest/input-[N].md` with each new output. Never overwrite `traces/baseline/`.

5. **Call the evaluator agent.** For each output, for each eval: launch a separate evaluator agent call. Each call receives only the raw output and one eval criterion. Score each eval **twice** per output, only count as PASS if both runs agree. Launched via `Task` tool with `subagent_type: "generalPurpose"`, passing `agents/evaluator.md` instructions.

6. **Three-step gate.** Call the gating agent (`agents/gating.md`) or run the gate logic directly:

   **Step 1 — Regression suite.** Re-score all entries in `suite.json` against the new outputs. Pass rate must be >= threshold (default 0.8). If the suite is empty, this step auto-passes.

   **Step 2 — Val score gate.** Compute `val_score` (mean pass rate across all evals and all tuning inputs). It must be >= the best `val_score` recorded in `results.tsv`. This is the never-regress rule — no change is accepted if the overall score drops below the best ever seen.

   **Step 3 — Suite promotion.** Only runs if Steps 1 and 2 both pass. Check all input+eval combos that previously failed. Any that now pass get promoted into `suite.json`. Update `suite.json` with the new entries and latest results.

   **Gate outcomes:**
   - Steps 1 and 2 both PASS → **KEEP.** This is the new best. Log it. Promote newly-passing combos (Step 3).
   - Step 1 FAIL (regression) → **DISCARD.** Revert SKILL.md. Log which suite entries regressed.
   - Step 2 FAIL (val_score dropped) → **DISCARD.** Revert SKILL.md. Log the score drop.

   **Simplicity criterion:** A mutation that maintains val_score while reducing complexity (fewer lines, simpler instructions) is a KEEP — it passes Step 2 (score >= best) even without improvement. From Karpathy: "a 0.001 improvement that adds ugly complexity is not worth it."

7. **Log the result** in results.tsv and changelog.md.

8. **Check stopping signals:**
   - Compute stability (standard deviation of val_scores over last 3 experiments). Record in results.tsv.
   - If val_score declined across 3 consecutive experiments → stop the loop and alert the user.
   - 5+ consecutive discards (no improvement) → stop the loop and report what's stuck.
   - 95%+ val_score sustained for 3 consecutive experiments → stop (diminishing returns).

9. **Calibration checkpoint (every 5 experiments, ad-hoc mode only).** When running in ad-hoc mode (not via `/skill-tune`), present the user with two outputs side by side: one from a high-scoring run, one from a low-scoring run. Ask: "is the high-scoring one actually better?" If the user says no, the evals need rewriting. Pause the loop and flag the issue. When running via `/skill-tune` weekly mode, skip this step.

10. **Repeat.** Go back to step 1 of the loop.

**NEVER STOP** (except for the conditions above). Once the loop starts, do not pause to ask the user if you should continue. They may be away from the computer. Run autonomously until:
- The user manually stops you
- You hit the budget cap (if one was set)
- 95%+ val_score for 3 consecutive experiments (diminishing returns)
- val_score declining across 3 consecutive experiments (degrading)
- 5+ consecutive discards (stuck)

**If you run out of ideas:** Re-read the failing traces in `traces/latest/`. Try combining two previous near-miss mutations. Try a completely different approach to the same problem. Try removing things instead of adding them.

---

## Step 5: Write the Changelog and Update Learnings

After each experiment (whether kept or discarded), do both:

### a) Append to `changelog.md`:

```markdown
## Experiment [N] — [keep/discard]

**Score:** [X]/[max] ([percent]%) | val_score: [X.XXXX]
**Suite:** [N] entries, [pass_rate]% pass rate
**Change:** [One sentence describing what was changed]
**Reasoning:** [Why this change was expected to help]
**Result:** [What actually happened, which evals improved/declined]
**Failing outputs:** [Brief description of what still fails, if anything]
```

### b) Append to `learnings.md`:

```markdown
## Iteration [N] — val_score: [X.XX] → [Y.YY] [keep/discard]

**What changed:** [one sentence]
**Pattern confirmed:** [failure mode this addresses, or "new pattern"]
**What worked / didn't work:** [specifics]
**Needs from human:** [or "none"]
```

The changelog is the per-experiment log. `learnings.md` is the persistent knowledge base that accumulates across optimization sessions — when auto-eval runs again on the same skill, it reads `learnings.md` first to avoid repeating failed approaches. This is the equivalent of auto-harness's `workspace/learnings.md`.

---

## Step 6: Deliver Results

When the user returns or the loop stops:

1. **Run the holdout set.** Execute the improved skill on holdout inputs for the first time. Score via the evaluator agent.
2. **Compare tuning vs holdout scores.** If tuning score is high but holdout score is significantly lower, flag as overfitting.
3. **Report calibration issues** if any checkpoint flagged a mismatch between scores and actual quality.

Present:
1. **Score summary:** Baseline → Final (tuning set) + Holdout score
2. **Overfitting check:** tuning vs holdout gap
3. **Total experiments run:** how many mutations were tried
4. **Keep rate:** how many kept vs discarded
5. **Top 3 changes that helped most** (from the changelog)
6. **Remaining failure patterns** (what still fails)
7. **The improved SKILL.md** (already saved in place)
8. **Location of all output files** for reference

---

## Output Format

The skill produces these files in `autoeval-[skill-name]/`:

```
autoeval-[skill-name]/
├── results.tsv          # score log with val_score and suite columns
├── changelog.md         # per-experiment mutation log
├── learnings.md         # persistent cumulative learnings (survives across sessions)
├── eval-criteria.md     # frozen eval spec (checksummed, read-only during loop)
├── suite.json           # self-maintaining regression suite (grows automatically)
├── SKILL.md.baseline    # original skill before optimization
├── corrections.md       # post-deployment correction log (Step 7)
└── traces/
    ├── baseline/        # experiment 0 outputs (never overwritten)
    │   ├── input-1.md
    │   └── input-2.md
    └── latest/          # most recent experiment outputs (overwritten each run)
        ├── input-1.md
        └── input-2.md
```

Plus the improved SKILL.md saved back to its original location.

**results.tsv example:**

```
experiment	score	max_score	pass_rate	val_score	suite_pass_rate	stability	status	description
0	14	20	70.0%	0.7000	-	-	baseline	original skill, no changes
1	14	20	70.0%	0.7000	100%	-	discard	added explicit anti-numbering (val_score not improved)
2	18	20	90.0%	0.9000	100%	0.0	keep	replaced vague colors with hex codes
3	18	20	90.0%	0.9000	100%	0.0	discard	added anti-pattern for neon, no improvement
4	19	20	95.0%	0.9500	100%	0.03	keep	added worked example showing correct labels
```

**suite.json example:**

```json
{
  "entries": [
    {"input_id": 1, "eval_id": 1},
    {"input_id": 1, "eval_id": 2},
    {"input_id": 2, "eval_id": 1}
  ],
  "threshold": 0.8,
  "last_results": {
    "1-1": "PASS",
    "1-2": "PASS",
    "2-1": "PASS"
  }
}
```

---

## Step 7: Post-Deployment Correction Tracking (Optional but High-Value)

The eval loop catches problems you can anticipate. But the best eval signal comes from what the user has to fix *after* running the improved skill in production. This step closes that gap.

**After the user runs the improved skill on real work:**

1. Ask: "what did you have to manually change before using the output?"
2. For each correction, identify the specific pattern that triggered it:
   - User removed all names? → add "no individual names" to banned-pattern eval
   - User rewrote the opener? → add the opener pattern to banned list
   - User changed the tone? → collect the before/after as a reference pair
3. Convert each correction into a new eval criterion or banned pattern
4. Run one more experiment cycle with the expanded eval suite
5. Append the new evals to the eval suite file for future runs

**Why this matters:** the auto-eval loop optimizes against your *predicted* failure modes. Post-deployment corrections reveal the failure modes you didn't predict. Every correction that gets converted into an eval makes the next run better.

**Format for tracking corrections:**
```
## Correction log — [skill name]

### [date]
- User changed: [what they edited]
- Pattern: [the specific string/structure that was wrong]
- New eval: [the binary check that would have caught this]
- Added to: [banned list / new eval / reference corpus]
```

Store this in `autoeval-[skill-name]/corrections.md`.

---

## How This Connects to Other Skills

**What feeds into autoeval:**
- Any existing skill that needs optimization
- User-defined eval criteria (or help them define evals using the eval guide)
- Post-deployment corrections from real usage (Step 7)
- Reference corpus of known-good outputs for voice/style skills
- `/skill-tune` weekly runner — automatically identifies skills to optimize and runs bounded autoeval loops

**What autoeval feeds into:**
- The improved skill replaces the original
- The changelog and learnings can be passed to future models for continued optimization
- The eval suite and regression suite (suite.json) persist across sessions
- The correction log feeds the next optimization cycle
- `/skill-tune` reads autoeval output directories to identify candidates for weekly optimization

---

## The Test

A good autoeval run:

1. **Used isolated agents** — the mutator never saw eval criteria, the evaluator never saw the skill prompt, the gating agent never saw the mutation
2. **Locked eval criteria** — eval-criteria.md was frozen before the loop started and checksummed
3. **Split tuning and holdout** — holdout inputs were only run at the end to catch overfitting
4. **Started with a baseline** — never changed anything before measuring the starting point
5. **Used binary evals only** — no scales, no vibes, no "rate this 1-10"
6. **Scored independently** — one eval per agent call, each scored twice, pass only on agreement
7. **Three-step gated** — regression suite passed, val_score never regressed below best-ever, newly-passing combos were promoted
8. **Changed one thing at a time** — so you know exactly what helped
9. **Saved traces** — baseline outputs preserved, latest outputs available for failure analysis
10. **Ran autonomously** — didn't stop to ask permission between experiments
11. **Updated learnings** — persistent log maintained across sessions
12. **Validated on holdout** — compared tuning score to holdout score at the end

If the skill "passes" all evals but the actual output quality hasn't improved, the evals are bad, not the skill. Go back to Step 2 and write better evals.

If the tuning score is high but the holdout score is low, the skill is overfitting to the tuning inputs. Go back to Step 2 and add more diverse test inputs.

If the user has to make the same correction twice after the loop finishes, the correction tracking (Step 7) isn't running. That correction should already be an eval.

If the regression suite keeps growing but val_score plateaus, the suite is testing easy cases. Review which combos are in the suite and whether they represent meaningful coverage.
