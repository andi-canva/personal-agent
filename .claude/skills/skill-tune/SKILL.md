---
name: skill-tune
description: "Weekly skill maintenance — mine corrections, identify underperforming skills, run bounded autoeval loops, and report improvements. The weekly wrap equivalent for skill quality. Run on Friday or Monday."
---

# Skill Tune: Weekly Skill Maintenance

Run a bounded optimization pass over skills that need it. Mines corrections from real usage, identifies candidates, runs short autoeval loops with three-step gating, and reports what improved.

This is the weekly wrapper around `/auto-eval`. Where auto-eval is a deep, ad-hoc optimization session for a single skill, skill-tune is the weekly rhythm that keeps all skills gradually improving.

Adapted from the [auto-harness](https://github.com/neosigmaai/auto-harness) methodology: program the loop, gate every change, accumulate learnings, never regress.

---

## When to Run

- **Weekly cadence:** Friday afternoon or Monday morning (pairs with `/weekly-wrap` or `/plan-week`)
- **Ad-hoc:** After a week where you corrected multiple skill outputs manually
- **Trigger words:** `skill tune`, `tune skills`, `skill maintenance`, `improve my skills`, `run skill-tune`, `/skill-tune`, `weekly tune`, `optimize skills`

---

## Instructions

Run all steps in sequence. Be decisive — present candidates and recommendations, don't ask repeatedly.

---

### Step 1: Mine Corrections

Scan for accumulated correction signal across all skills.

1. **Scan autoeval directories.** Look for `autoeval-*/corrections.md` files in `.claude/skills/*/` and adjacent to any skill folders. Read entries added since the last `/skill-tune` run (check the date headers in each corrections.md).

2. **Check recent session activity.** If agent transcripts are available, scan the last 7 days for patterns:
   - Skills that were invoked and then the user manually edited the output
   - Skills where the user said something like "not quite", "fix this", "change the tone", or re-ran with corrections
   - Repeated invocations of the same skill (suggests it's not getting it right)

3. **Compile a correction inventory.** For each skill with corrections:
   - How many new corrections since last tune
   - What patterns do they share (banned words, structural issues, voice drift)
   - Can each correction be converted to a binary eval?

---

### Step 2: Identify Candidates

Prioritize which skills to optimize this week. Check all three sources:

**Priority 1 — Skills with unprocessed corrections** (highest signal)
- These have known failures from real usage
- Each correction is a future eval waiting to be written

**Priority 2 — Skills with existing eval suites below 90% val_score**
- Read `autoeval-*/results.tsv` for each skill that has a prior autoeval directory
- If the last recorded val_score is below 0.90, the skill is a candidate

**Priority 3 — User-flagged skills**
- The user may name specific skills they want improved
- Accept these at any priority level

**Present the candidate list to the user:**

```
## Skill Tune Candidates — Week [N]

| Skill | Priority | Corrections | Last val_score | Reason |
|-------|----------|-------------|----------------|--------|
| /draft | P1 | 3 new | 0.78 | Voice drift: banned phrases appearing |
| /today | P2 | 0 | 0.85 | Below 90% threshold |
| /weekly-wrap | P1 | 2 new | - | New corrections, no prior evals |

Recommend optimizing: /draft (3 corrections, existing eval suite)
Skip: /weekly-wrap (needs eval suite created first — flag for ad-hoc /auto-eval session)
```

**Confirm with the user before proceeding.** Max 2 skills per weekly run to keep runtime reasonable.

---

### Step 3: Run Bounded Optimization

For each confirmed candidate, run a short autoeval loop. This is a bounded version of `/auto-eval` — same three-step gating, same isolation, just fewer cycles.

**3a. Load existing state**

- Read the skill's `autoeval-[skill-name]/` directory if it exists
- Load `learnings.md` (cumulative patterns from prior sessions)
- Load `suite.json` (regression suite — must not regress)
- Load `eval-criteria.md` (frozen eval spec)
- Load `results.tsv` (score history)

If no autoeval directory exists, the skill needs a full `/auto-eval` setup first. Flag it and skip.

**3b. Incorporate new corrections**

For each unprocessed correction in `corrections.md`:
1. Convert it to a binary eval criterion or banned-pattern entry
2. Append the new eval(s) to `eval-criteria.md`
3. Recompute the MD5 checksum
4. Mark the correction as processed (add `[processed: YYYY-MM-DD]` tag)

This requires unlocking `eval-criteria.md` temporarily. Re-establish baseline after adding new evals:
- Run the current (best) skill version against all tuning inputs
- Score with the expanded eval suite
- Record the new baseline in results.tsv
- This becomes the new best val_score for the gate

**3c. Run the loop**

Execute the auto-eval experiment loop (Step 4 from `/auto-eval`) with these constraints:
- **Budget cap: 5 cycles** per skill per weekly run
- **Skip calibration checkpoints** (weekly mode runs without human-in-the-loop calibration)
- **Three-step gating** applies to every mutation (regression suite, val_score gate, promotion)
- **Save traces** to `traces/latest/` for failure analysis
- **Update learnings** after every cycle (kept or discarded)

**Stopping conditions (same as auto-eval):**
- Budget cap reached (5 cycles)
- 95%+ val_score sustained for 3 consecutive experiments
- val_score declining across 3 consecutive experiments
- 5+ consecutive discards

---

### Step 4: Weekly Tune Report

After all candidates have been processed, generate a summary.

```markdown
# Skill Tune Report — Week [N], [YYYY-MM-DD]

## Summary
- Skills scanned: [N]
- Candidates identified: [N]
- Skills optimized: [N]
- Total experiments run: [N]
- Total mutations kept: [N]

## Per-Skill Results

### /draft
- **Before:** val_score 0.7800 | suite: 12 entries
- **After:** val_score 0.9200 | suite: 16 entries (+4 promoted)
- **Experiments:** 5 run, 2 kept, 3 discarded
- **Key improvement:** Added banned-phrase list from corrections, voice match tightened
- **Corrections processed:** 3/3

### /today
- **Before:** val_score 0.8500 | suite: 8 entries
- **After:** val_score 0.9000 | suite: 10 entries (+2 promoted)
- **Experiments:** 4 run (stopped at 95%), 1 kept, 3 discarded
- **Key improvement:** Moved priority-selection instruction higher in skill

## Skipped / Needs Attention
- **/weekly-wrap** — needs eval suite created. Run `/auto-eval` on this skill for initial setup.

## Regression Suite Health
- Total suite entries across all skills: [N]
- All suites passing: [yes/no]

## Next Week
- [Skill] has 2 corrections queued — will be first candidate next week
- [Skill] is at 88% — close to 90% threshold, may resolve with one more cycle
```

---

### Step 5: Feed Back

1. **Append to `Context/Memory/learnings.md`** — one synthesized bullet about skill quality this week:
   ```
   - **Skill-tune CW[N]:** [N] skills optimized, val_score improved [X]→[Y] on /draft (banned-phrase corrections were the highest-signal input). [Skill] still needs eval suite — flag for ad-hoc session.
   ```

2. **Update each skill's autoeval `learnings.md`** — already done during Step 3, but verify the entries are clean.

---

## How This Connects

**What feeds into skill-tune:**
- `corrections.md` files from real usage (Step 7 of `/auto-eval`)
- Existing autoeval directories with results history
- User-flagged skills
- Weekly usage patterns

**What skill-tune feeds into:**
- Improved skills (SKILL.md updated in place)
- Growing regression suites (suite.json)
- Cumulative learnings (per-skill learnings.md + global learnings.md)
- `/weekly-wrap` can reference the tune report for the week's progress

**Rhythm:**
```
Monday: /plan-week → /today → /pulse
Daily:  /today
Friday: /skill-tune → /weekly-wrap
```

---

## Rules

1. **Max 2 skills per weekly run.** More than 2 makes the session too long and the mutations too shallow.
2. **Max 5 cycles per skill.** This is maintenance, not a deep optimization. Use `/auto-eval` directly for intensive sessions.
3. **Never skip the gate.** Every mutation goes through the three-step gate, even in weekly mode.
4. **Never create eval suites automatically.** If a skill has no `autoeval-*/eval-criteria.md`, flag it for a full `/auto-eval` session where the user defines evals. The weekly runner only optimizes skills that already have evals.
5. **Always process corrections first.** Corrections from real usage are the highest-signal input. Convert them to evals before running the loop.
6. **Always update learnings.** Both the per-skill learnings.md and the global `Context/Memory/learnings.md`.
