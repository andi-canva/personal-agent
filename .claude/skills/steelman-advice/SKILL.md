---
name: steelman-advice
description: Stress-test any product document (PRD, strategy doc, initiative, goal, pitch deck) using tailored critique lenses grounded in Lenny's Newsletter and Podcast content. Use when the user asks for a steelman, blind spot hunt, stress test, alternative framing, or exec-readiness review.
---

# /steelman-advice

Invoke: `/steelman-advice [doc] [--mode light|standard|stress-test]`

## What you get

A short, opinionated critique of your document — the kind of pushback you'd get from a room of senior PMs, except grounded in real evidence from Lenny's Newsletter and Podcast.

The report follows this shape:
- **TLDR** — what's strong, what's missing, what's worth sitting with
- **At a glance** — one-line summary per perspective
- **Perspectives** — quote first, then what's off, a different way to think about it, and two concrete directions you could go
- **The takeaway** — the core tension in 2–4 sentences

Default output is short. If you want more depth, ask for it or use `--mode stress-test`.

## What this tool does and doesn't do

This is a **thinking tool, not a fixing tool**. It challenges your assumptions and gives you options to wrestle with. It does not tell you what to do.

If you walk away saying "that gave me a lot to think about," it worked. If you walk away saying "it didn't give me the answer," that's not a bug — but it means the tool didn't make its intent clear enough.

## Interaction flow

The skill has up to three touchpoints with the user before delivering the report. This pacing is deliberate — it avoids wasting a long analysis on the wrong question.

| Step | What happens | User sees |
|---|---|---|
| **1. Scope** | Ask what decision this supports, what challenge they want, what input exists | A short set of questions that also explains what the tool can do |
| **4.5. Clarify** (optional) | After reading the doc and context, surface gaps that would change the critique | A mini-TLDR of what you understood + 2–4 targeted questions |
| **7. Report** | Deliver the steelman | The full report in `templates/report.md` format |

If the user provides everything in their initial prompt (doc + decision context + challenge type), the flow collapses to a single step: read → report. The interaction points exist to avoid going off in the wrong direction, not to slow things down.

## Review modes

| Mode | Perspectives | Quotes | Output |
|---|---|---|---|
| `light` | 2 | 1 each | Summary only |
| `standard` | 3 | 1 each | Summary + short rationale |
| `stress-test` | 4 | 1–2 each | Full perspectives with evidence |

Default: `standard`. If the user says "just run it," use `standard`.

## Step 1: Scope with the user

This step is a hard gate. Do not skip it. The scoping conversation steers which perspectives get picked and what the critique focuses on — running without it risks a review that's technically fine but aimed at the wrong thing.

Before loading the document, check whether the user's prompt already answers these three questions:

1. **What decision does this document support?**
   e.g., "Monday session with my skip-level," "exec review next week," "deciding whether to ship this," "personal sanity check before sharing"
2. **What kind of challenge do you want?**
   - **Blind spot hunt** — what am I not seeing?
   - **Stress test** — where does this break under pressure?
   - **Alternative framing** — what if I looked at this completely differently?
   - **Exec readiness** — will this survive a room of skeptical execs?
3. **What feedback or input already exists?**
   e.g., "my manager pushed back on the scope," "no one has seen this yet," "the eng lead thinks it's too ambitious"

**If all three are answered in the user's prompt:** proceed to Step 2 immediately. Don't ask what you already know.

**If any are missing:** pause and ask the user before doing anything else.

### How to ask

Use structured multiple-choice UI when the environment supports it (e.g., Cursor's `AskQuestion` tool, Claude Code's selection prompts). This is faster for the user and avoids walls of free text. Fall back to plain text only if no structured input tool is available.

Build one form with up to three questions, only including the ones the user hasn't already answered:

**Question 1 — Decision context** (free text, only if missing):
- Prompt: "What decision does this document support?"
- Placeholder examples: "Monday session with my skip-level," "exec review next week," "sanity check before sharing"

**Question 2 — Challenge type** (single-select, only if missing):
- Prompt: "What kind of challenge do you want?"
- Options:
  - **Blind spot hunt** — what am I not seeing?
  - **Stress test** — where does this break under pressure?
  - **Alternative framing** — what if I looked at this completely differently?
  - **Exec readiness** — will this survive a room of skeptical execs?

**Question 3 — Prior feedback** (single-select + optional free text, only if missing):
- Prompt: "Has anyone already given feedback on this?"
- Options:
  - **No — first time anyone's seeing it**
  - **Yes — I'll share what came up** (follow up for details if selected)

If structured input is not available, ask the same questions as a short numbered list in plain text. Never dump a paragraph per question — keep it scannable.

**Exception:** if the user explicitly says "just run it," "skip the questions," or "go," default to blind spot hunt, standard mode, no prior feedback.

Read `config.json` in this skill folder for default mode and challenge type.

## Step 2: Load the document

Read the file directly if a path is given. Otherwise search:
1. `Tasks/`
2. `Context/Document Hub/`
3. Glob the workspace

## Step 3: Find your sources

### Lenny content (required)

Check `config.json` for `lenny_root`. If set to `"auto"`, try these paths in order:
1. `Context/Knowledge/Product/Lenny`
2. `Knowledge/Product/Lenny`

Read `index.json` under the resolved root. If it doesn't exist, tell the user to run `setup.sh`.

**Watch out:** `index.json` filenames use prefixes like `03-podcasts/jenny-wen.md` but the actual file is at `podcasts/jenny-wen.md`. Always locate the real file with Glob before reading — don't blindly join the index path to the root.

### Project context (read aggressively, local files first)

Check `config.json` for `context_paths`. Read any non-null paths if the files exist.

Beyond config paths, actively search for related context the user may not have mentioned:
- Prior versions of the same document
- Related PRDs, meeting notes, or strategy docs in the same area
- Goals files and priority frameworks

The default contract is local files:
1. Target document
2. Local project files
3. Lenny corpus
4. Optional paths from `config.json`

Connected sources like Slack or Confluence are optional extras. If they're available, use them. If they're not, don't pretend you searched them. See `integrations.md` for how to talk about missing connected context.

**Generic advice is a failure mode.** If the output could apply to any company's document, you haven't read enough context.

## Step 4: Profile the document

Extract:
- Document type (PRD, strategy, goal/OKR, pitch deck, experiment, org doc, product vision, AI product, pricing, GTM plan, other)
- Core themes
- Stated success metrics
- Gaps or missing sections
- Sections most worth challenging

Also figure out your **context confidence**:
- What relevant context you actually read
- What related context probably exists but you couldn't find
- Whether the missing context is minor or would change your critique

If missing context would materially change the critique, don't proceed straight to a full report.

## Step 4.5: Clarify or continue

After profiling the document and reading context, you may find gaps that would change the critique. This is the second interaction point (Step 1 was the first).

### Branch A: Pause and ask

Stop and ask 2–4 targeted questions when:
- The document references prior decisions, scope changes, or stakeholder context you can't verify
- You found competing signals across docs, notes, or history
- Your critique would otherwise rely on generic assumptions

When you pause:
- Start with a 3-bullet mini-TLDR of what you think is true so far — this shows the user you've read the doc and gives them something to react to
- Say exactly what context is missing and why it matters
- Ask only the smallest set of questions that would change the review
- Use `templates/clarify.md` for format

This is different from the Step 1 scoping. Step 1 asks what the user wants. Step 4.5 asks what the user knows that the agent couldn't find. Both are interactive, but they serve different purposes.

### Branch B: Keep going with assumptions

Only do this if:
- The missing context is minor, or
- The user explicitly says to continue

If you keep going:
- Name your assumptions in the takeaway
- Keep the critique narrower and more conditional

## Step 5: Pick perspectives

Read `perspectives.md` in this skill folder. It has the full lens catalog, presets by document type, and challenge-type adjustments.

1. Start with the preset for the document type
2. Swap one slot for the requested challenge or biggest gap
3. Always include at least one uncomfortable lens — the one the author probably didn't want to hear

How many perspectives depends on the mode:
- `light`: 2
- `standard`: 3
- `stress-test`: 4

**Don't confuse similar lenses.** Technical Feasibility asks "can you build it?" AI Product Discipline asks "are you building it like deterministic software when it's actually probabilistic?" They sound related but challenge very different things.

## Step 6: Run the analysis

Each perspective should research independently and then converge. This means the perspectives don't see each other's work — they each go off, search the Lenny corpus, read project context, and come back with their own findings. The parent agent then synthesizes.

### How to run perspectives

**If the environment supports sub-agents (preferred):**

Launch each perspective as a parallel sub-agent using the Task tool (`subagent_type: "generalPurpose"`). Each sub-agent gets:

1. **The document** — a summary plus the most relevant sections (not the full text if it's long)
2. **The lens** — which perspective they're reviewing through, and the critique question from `perspectives.md`
3. **The Lenny root path** — so they can search independently
4. **Project context paths** — goals, company context, related docs
5. **The voice rules** — from the Voice section below
6. **The output shape** — from Per-perspective output shape below

Launch all sub-agents at once. They are independent — no sequencing needed. Wait for all to return, then move to Step 7.

**If sub-agents are not available:**

Run each perspective sequentially in the same agent. Same research steps, same output shape, just one at a time.

### What each perspective does

For each perspective:
1. Search Lenny content using keywords from the document and the lens
2. Read the most relevant section — not the full transcript. Grep first, then read ±50 lines around the match. One well-chosen quote beats two mediocre ones.
3. Figure out what's off in the document
4. Frame a different way to look at it
5. Show two concrete directions the user could go
6. Find 1 direct quote (2 only in stress-test mode, and only if the second adds something new)

### Voice

Write each perspective as if you're explaining the issue to a smart colleague who hasn't read the doc. Lead with the quote so the reader understands why this perspective matters before you explain it. Use "you" and "your" — not "the document" or "the author."

**Do this:**
- Use short sentences. 2–4 sentence paragraphs max.
- Use "you" as the default subject
- Frame advice as contrast pairs: "instead of X, try Y"
- Make options concrete enough to act on without a follow-up question
- Write the way you'd explain it over coffee, not in a review doc

**Don't do this:**
- Abstract openings ("In today's rapidly evolving...")
- Jargon without explanation
- Passive or corporate voice ("It has been determined that...")
- Long unbroken prose
- Generic motivational language ("Remember to stay curious!")
- Labels that sound like a form ("Observed Bias / Problem")

**Before and after:**

| Instead of this | Write this |
|---|---|
| "Observed Bias / Problem: the current name is trying to explain the mechanism and the why at the same time, which makes it defensible but not crisp." | "What's off: Your goal name is doing two jobs — explaining the mechanism and signaling the why. That makes it defensible, but nobody walks away with a crisp sense of what changed." |
| "Reframe: make the success condition explicit so the name, scope, and metric tell one story instead of three partial ones." | "A different way to look at it: Right now your name says one thing, your scope says another, and your metric says a third. What if they told the same story?" |

### Per-perspective output shape

```
**[NAME]**

> "[Direct quote]"
**[Guest Name]**, on *[Episode title or newsletter post title]* (Lenny's Podcast / Lenny's Newsletter)

**What's off:** [1–2 sentences. Use "you" and "your." Be specific about which section or claim.]

**A different way to look at it:** [Concrete shift. Frame as contrast: "Instead of [current], what if you [alternative]?"]

**Two ways you could go:**
- [ ] **A:** [What this would look like concretely]
- [ ] **B:** [What this would look like concretely]
```

## Step 7: Put it together

Use `templates/report.md`. Return one report.

Structure:
1. `TLDR`
2. `At a glance`
3. `Perspectives`
4. `The takeaway`

In `light` mode, include only the 2 highest-signal perspectives. In `standard`, keep each one tight. In `stress-test`, include all selected perspectives with full evidence.

Don't repeat the same content as both a table row and a full narrative. Keep the report short — if a perspective adds nothing beyond the TLDR, compress it or drop it.

## Step 7.5: Offer to apply

After delivering the report, present a structured multiple-choice form so the user can decide which recommendations to apply to the document.

### How to present

Use the environment's structured input tool (e.g., `AskQuestion` in Cursor). Build one form with **one question per perspective** from the report. Each question has three options:

- **A:** [Option A label from that perspective — keep it short, ~10 words]
- **B:** [Option B label from that perspective — keep it short, ~10 words]
- **Skip** — don't apply this one

Title the form: "Which recommendations do you want applied to the doc?"

### When to trigger

Present this form when **any** of these are true:
- The user explicitly asks to apply changes
- The report targets a specific file that was loaded in Step 2 (not a pasted snippet)
- The user's original prompt included intent to improve the doc

**Do not present** if the document was pasted inline or the user explicitly said they only want feedback.

If the trigger conditions are ambiguous, include the apply offer as the **first** follow-up option in Step 8: _"Want me to apply any of these? I can give you a quick picker."_

### How to apply

After the user selects:
1. Re-read the target document (it may have changed)
2. For each non-skipped selection, draft and apply the concrete edit
3. Show a short summary of what changed

Keep edits surgical. Add or restructure — don't rewrite sections the user didn't select. Preserve the author's voice.

## Step 8: Offer to go further

End the report with an invitation. Offer only the most relevant:
- Go deeper on one perspective
- Draft revised sections
- Re-run in a different mode
- Find more evidence on a topic
- Show the deeper rationale, context used, or a more recommendation-style version

## Quality checklist

Before finishing, verify:
- The resolved Lenny root actually exists
- Perspective count matches the mode
- The report follows `templates/report.md`
- Quotes are verbatim and attributed
- At least one lens is uncomfortable
- Every perspective includes concrete options, not just observations
- The TLDR alone is useful enough to act on without reading the rest
- The output is specific to this document — not advice that could apply to anyone
- Any material assumption is briefly visible in the takeaway
- If context gaps were decision-changing, you either paused to ask or explicitly continued with assumptions
- Quotes lead each perspective, not trail behind the analysis
- The report is compact enough to hold the key choices in one screen
- The language sounds like a smart friend explaining something, not a PM filling out a template
- No jargon-heavy labels like "Observed Bias / Problem" or "Reframe" — use plain language
- Short paragraphs, active voice, "you" as default subject
- If the user reads only the first screen, they already know the main thing
