---
name: autoeval
description: "Autonomously optimize any Claude Code skill by running it repeatedly, scoring outputs against binary evals, mutating the prompt, and keeping improvements. Based on Karpathy's autoresearch methodology. Use when: optimize this skill, improve this skill, run autoresearch on, make this skill better, self-improve skill, benchmark skill, eval my skill, run evals on. Outputs: an improved SKILL.md, a results log, and a changelog of every mutation tried."
---

# Autoresearch for Skills

Most skills work about 70% of the time. The other 30% you get garbage. The fix isn't to rewrite the skill from scratch. It's to let an agent run it dozens of times, score every output, and tighten the prompt until that 30% disappears.

This skill adapts Andrej Karpathy's autoresearch methodology (autonomous experimentation loops) to Claude Code skills. Instead of optimizing ML training code, we optimize skill prompts.

---

## the core job

Take any existing skill, define what "good output" looks like as binary yes/no checks, then run an autonomous loop that:

1. Generates outputs from the skill using test inputs
2. Scores every output against the eval criteria
3. Mutates the skill prompt to fix failures
4. Keeps mutations that improve the score, discards the rest
5. Repeats until the score ceiling is hit or the user stops it

**Output:** An improved SKILL.md + `results.tsv` score log + `changelog.md` of every mutation attempted.

---

## before starting: gather context

**STOP. Do not read the skill, do not define evals, do not run any experiments until all fields below are explicitly confirmed by the user in this conversation. This gate holds regardless of how much context the user has already provided — even if they describe failure modes, past mistakes, or reference prior conversations.**

**Why this matters:** Inferring evals from context is how you get evals that sound right but test the wrong thing. The user may have additional failure modes in mind, different test inputs, or a different pass threshold. Always confirm before proceeding.

**Ask the user for all of the following in a single message. Do not proceed until they respond:**

1. **Target skill** — Which skill do you want to optimize? (need the exact path to SKILL.md)
2. **Test inputs** — What 3-5 different prompts/scenarios should we test the skill with? (variety matters — pick inputs that cover different use cases so we don't overfit to one scenario)
3. **Eval criteria** — What 3-6 binary yes/no checks define a good output? (these are your "test questions" — see [references/eval-guide.md](references/eval-guide.md) for how to write good evals). If the user says "based on our conversations" or similar, propose your best-guess evals and ask them to confirm or correct before proceeding.
4. **Reference corpus** — Optional but powerful for voice/style skills. Does the user have 3-5 real examples of good output they actually used? If yes, collect them into a `references/golden-examples/` folder. These become eval anchors — the agent compares generated output against them during scoring. (see "reference corpus eval" below)
5. **Banned patterns** — Optional. A list of words, phrases, or regex patterns that should never appear in the output. Build this from known anti-patterns. These are the highest-signal, lowest-effort evals. (see [references/eval-guide.md](references/eval-guide.md) "Banned-pattern evals" section)
6. **Runs per experiment** — How many times should we run the skill per mutation? Default: 5. (more runs = more reliable scores, but slower and more expensive. 5 is the sweet spot for most skills.)
7. **Run interval** — How often should experiments cycle? Default: every 2 minutes. (shorter = faster iteration, but costs more)
8. **Budget cap** — Optional. Max number of experiment cycles before stopping. Default: no cap (runs until you stop it).

---

## step 1: read the skill

Before changing anything, read and understand the target skill completely.

1. Read the full SKILL.md file
2. Read any files in `references/` that the skill links to
3. Identify the skill's core job, process steps, and output format
4. Note any existing quality checks or anti-patterns already in the skill

Do NOT skip this. You need to understand what the skill does before you can improve it.

---

## step 2: build the eval suite

Convert the user's eval criteria into a structured test. Every check must be binary — pass or fail, no scales.

**Three types of evals (use all three when applicable):**

### a) Standard binary evals

```
EVAL [number]: [Short name]
Question: [Yes/no question about the output]
Pass condition: [What "yes" looks like — be specific]
Fail condition: [What triggers a "no"]
```

### b) Banned-pattern evals

Compile the user's banned patterns into a single eval. These are the highest-signal checks because they're greppable and agents score them consistently. Build the list from: the skill's existing exclude/avoid rules, anti-patterns the user has corrected in the past, and jargon or filler patterns common to AI output.

```
EVAL [N]: No banned patterns
Question: Does the output contain zero matches from the banned list?
Banned list: [list every banned string/phrase/regex]
Pass: Zero matches found
Fail: One or more matches found
```

### c) Reference corpus evals (for voice/style skills)

If the user provided golden examples in `references/golden-examples/`, add a comparative eval. Present the agent with the generated output alongside one reference example and ask:

```
EVAL [N]: Voice match
Question: Could this output and the reference example have been written by the same person?
Pass: Tone, structure, word choice, and level of detail are consistent with the reference
Fail: Output reads noticeably different — more formal, more verbose, different structure, or uses patterns absent from the references
```

This catches voice drift that no checklist will find. It's subjective but surprisingly reliable when the agent has concrete examples to compare against, not just a description of the desired voice.

**Rules for good evals:**
- Binary only. Yes or no. No "rate 1-7" scales. Scales compound variability and give unreliable results.
- Specific enough to be consistent. "Is the text readable?" is too vague. "Are all words spelled correctly with no truncated sentences?" is testable.
- Not so narrow that the skill games the eval. "Contains fewer than 200 words" will make the skill optimize for brevity at the expense of everything else.
- 3-6 evals is the sweet spot. More than that and the skill starts parroting eval criteria back instead of actually improving.
- Banned-pattern evals count as one eval regardless of how many patterns are in the list.

See [references/eval-guide.md](references/eval-guide.md) for detailed examples of good vs bad evals.

**Max score calculation:**
```
max_score = [number of evals] × [runs per experiment]
```

Example: 4 evals × 5 runs = max score of 20.

---

## step 3: establish baseline

Run the skill AS-IS before changing anything. This is experiment #0.

1. Create a working directory: `autoresearch-[skill-name]/` inside the skill's folder
2. Create `results.tsv` with the header row
3. Back up the original SKILL.md as `SKILL.md.baseline`
4. Run the skill [N] times using the test inputs
5. Score every output against every eval
6. Record the baseline score in results.tsv

**results.tsv format (tab-separated):**

```
experiment	score	max_score	pass_rate	status	description
0	14	20	70.0%	baseline	original skill — no changes
```

**IMPORTANT:** After establishing baseline, confirm the score with the user before proceeding. If baseline is already 90%+, the skill may not need optimization — ask the user if they want to continue.

---

## step 4: run the experiment loop

This is the core autoresearch loop. Once started, run autonomously until stopped.

**LOOP:**

1. **Analyze failures.** Look at which evals are failing most. Read the actual outputs that failed. Identify the pattern — is it a formatting issue? A missing instruction? An ambiguous directive?

2. **Form a hypothesis.** Pick ONE thing to change. Don't change 5 things at once — you won't know what helped.

   Good mutations:
   - Add a specific instruction that addresses the most common failure
   - Reword an ambiguous instruction to be more explicit
   - Add an anti-pattern ("Do NOT do X") for a recurring mistake
   - Move a buried instruction higher in the skill (priority = position)
   - Add or improve an example that shows the correct behavior
   - Remove an instruction that's causing the skill to over-optimize for one thing at the expense of others

   Bad mutations:
   - Rewriting the entire skill from scratch
   - Adding 10 new rules at once
   - Making the skill longer without a specific reason
   - Adding vague instructions like "make it better" or "be more creative"

3. **Make the change.** Edit SKILL.md with ONE targeted mutation.

4. **Run the experiment.** Execute the skill [N] times with the same test inputs.

5. **Score it.** Run every output through every eval. Calculate total score.

6. **Decide: keep or discard.**
   - Score improved → **KEEP.** Log it. This is the new baseline.
   - Score stayed the same → **DISCARD.** Revert SKILL.md to previous version. The change added complexity without improvement.
   - Score got worse → **DISCARD.** Revert SKILL.md to previous version.

7. **Log the result** in results.tsv.

8. **Repeat.** Go back to step 1 of the loop.

**NEVER STOP.** Once the loop starts, do not pause to ask the user if you should continue. They may be away from the computer. Run autonomously until:
- The user manually stops you
- You hit the budget cap (if one was set)
- You hit 95%+ pass rate for 3 consecutive experiments (diminishing returns)

**If you run out of ideas:** Re-read the failing outputs. Try combining two previous near-miss mutations. Try a completely different approach to the same problem. Try removing things instead of adding them. Simplification that maintains the score is a win.

---

## step 5: write the changelog

After each experiment (whether kept or discarded), append to `changelog.md`:

```markdown
## Experiment [N] — [keep/discard]

**Score:** [X]/[max] ([percent]%)
**Change:** [One sentence describing what was changed]
**Reasoning:** [Why this change was expected to help]
**Result:** [What actually happened — which evals improved/declined]
**Failing outputs:** [Brief description of what still fails, if anything]
```

This changelog is the most valuable artifact. It's a research log that any future agent (or smarter future model) can pick up and continue from.

---

## step 6: deliver results

When the user returns or the loop stops, present:

1. **Score summary:** Baseline score → Final score (percent improvement)
2. **Total experiments run:** How many mutations were tried
3. **Keep rate:** How many mutations were kept vs discarded
4. **Top 3 changes that helped most** (from the changelog)
5. **Remaining failure patterns** (what the skill still gets wrong, if anything)
6. **The improved SKILL.md** (already saved in place)
7. **Location of results.tsv and changelog.md** for reference

---

## output format

The skill produces three files in `autoresearch-[skill-name]/`:

```
autoresearch-[skill-name]/
├── results.tsv          # score log for every experiment
├── changelog.md         # detailed mutation log
└── SKILL.md.baseline    # original skill before optimization
```

Plus the improved SKILL.md saved back to its original location.

**results.tsv example:**

```
experiment	score	max_score	pass_rate	status	description
0	14	20	70.0%	baseline	original skill — no changes
1	16	20	80.0%	keep	added explicit instruction to avoid numbering in diagrams
2	16	20	80.0%	discard	tried enforcing left-to-right layout — no improvement
3	18	20	90.0%	keep	added color palette hex codes instead of vague "pastel" description
4	18	20	90.0%	discard	added anti-pattern for neon colors — no improvement
5	19	20	95.0%	keep	added worked example showing correct label formatting
```

---

## example: optimizing a diagram-generator skill

**Context gathered:**
- Target skill: `~/.claude/skills/diagram-generator/SKILL.md`
- Test inputs: "OAuth flow diagram", "CI/CD pipeline", "microservices architecture", "user onboarding funnel", "database schema relationships"
- Evals: (1) All text legible and spelled correctly? (2) Uses only pastel/soft colors? (3) Linear layout — left-to-right or top-to-bottom? (4) Free of numbers, ordinals, and ordering?
- Runs per experiment: 10
- Max score: 40

**Baseline run (experiment 0):**
Generated 10 diagrams. Scored each against 4 evals. Result: 32/40 (80%).
Common failures: 3 diagrams had numbered steps, 2 had bright red elements, 3 had illegible small text.

**Experiment 1 — KEEP (35/40, 87.5%):**
Change: Added "NEVER include step numbers, ordinal numbers (1st, 2nd), or any numerical ordering in diagrams" to the anti-patterns section.
Result: Numbering failures dropped from 3 to 1. Other evals held steady.

**Experiment 2 — DISCARD (34/40, 85%):**
Change: Added "All text must be minimum 14px font size."
Result: Legibility improved by 1, but color compliance dropped by 2. Reverted.

**Experiment 3 — KEEP (37/40, 92.5%):**
Change: Replaced vague "pastel colors" instruction with specific hex codes: `#A8D8EA, #AA96DA, #FCBAD3, #FFFFD2, #B5EAD7`.
Result: Color eval went from 8/10 to 10/10. Other evals held.

**Experiment 4 — DISCARD (37/40, 92.5%):**
Change: Added anti-pattern "Do NOT use red (#FF0000), orange (#FF8C00), or neon green (#39FF14)."
Result: No change. The hex codes from experiment 3 already solved the color problem. Reverted to keep skill simpler.

**Experiment 5 — KEEP (39/40, 97.5%):**
Change: Added a worked example showing a correct diagram with properly formatted labels (no numbers, pastel fills, left-to-right flow, legible text).
Result: Hit 39/40. One remaining failure: a complex diagram with overlapping labels. Diminishing returns — stopped.

**Final delivery:**
- Baseline: 32/40 (80%) → Final: 39/40 (97.5%)
- 5 experiments, 3 kept, 2 discarded
- Top changes: specific hex codes for colors, explicit anti-numbering rule, worked example
- Remaining issue: very complex diagrams occasionally get overlapping labels (1/40 failure rate)

---

## step 7: post-deployment correction tracking (optional but high-value)

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

**Why this matters:** the auto-eval loop optimizes against your *predicted* failure modes. Post-deployment corrections reveal the failure modes you didn't predict. Every correction that gets converted into an eval makes the next run better. This is how the skill compounds — the eval suite grows from real usage, not just upfront guesses.

**Format for tracking corrections:**
```
## Correction log — [skill name]

### [date]
- User changed: [what they edited]
- Pattern: [the specific string/structure that was wrong]
- New eval: [the binary check that would have caught this]
- Added to: [banned list / new eval / reference corpus]
```

Store this in `autoresearch-[skill-name]/corrections.md`. It's the bridge between "lab performance" and "production performance."

---

## how this connects to other skills

**What feeds into autoresearch:**
- Any existing skill that needs optimization
- User-defined eval criteria (or help them define evals using the eval guide)
- Post-deployment corrections from real usage (step 8)
- Reference corpus of known-good outputs for voice/style skills

**What autoresearch feeds into:**
- The improved skill replaces the original
- The changelog can be passed to future models for continued optimization
- The eval suite can be reused whenever the skill is updated
- The correction log feeds the next optimization cycle

---

## the test

A good autoresearch run:

1. **Started with a baseline** — never changed anything before measuring the starting point
2. **Used binary evals only** — no scales, no vibes, no "rate this 1-10"
3. **Used banned-pattern evals** — converted known anti-patterns into greppable checks
4. **Used reference examples** — for voice/style skills, compared against real human-written outputs
5. **Changed one thing at a time** — so you know exactly what helped
6. **Kept a complete log** — every experiment recorded, kept or discarded
7. **Improved the score** — measurable improvement from baseline to final
8. **Didn't overfit** — the skill got better at the actual job, not just at passing the specific test inputs
9. **Ran autonomously** — didn't stop to ask permission between experiments
10. **Tracked post-deployment corrections** — captured what the user still had to fix and fed it back into the eval suite

If the skill "passes" all evals but the actual output quality hasn't improved — the evals are bad, not the skill. Go back to step 2 and write better evals.

If the user has to make the same correction twice after the loop finishes — the correction tracking (step 8) isn't running. That correction should already be an eval.
