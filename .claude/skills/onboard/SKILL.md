---
name: onboard
description: "Run a structured onboarding interview to populate GOALS.md and seed Context/Memory/profile.md"
---

# Onboard

Guide the user through a structured interview to populate `GOALS.md` from scratch and seed `Context/Memory/` with a basic profile.

## Instructions

When the user invokes `/onboard`, run through all steps in sequence.

### Step 1: Check Current State

1. Read `GOALS.md`
2. Determine whether it's still a blank template:
   - **Blank/template**: contains placeholder text — strings like `[Your role`, `[Date]`, `[Priority 1]`, `[placeholder]`, etc.
   - **Already filled**: real content has replaced the placeholders
3. If already filled:
   - Tell the user: "Looks like you're already set up. Want to review and refresh your goals instead of starting over?"
   - If yes: proceed with the interview but frame it as a refresh, pre-populate answers from current values, and confirm changes before overwriting
   - If no: stop
4. If blank or template: proceed to Step 2

### Step 2: Round 1 — Who you are & where you're going

Ask all of the following in a single message (never split into separate prompts):

> **A few questions to get you set up** — answer as much or as little as you like:
>
> 1. What's your current role, and what are you primarily building or working on?
> 2. What's your professional north star — where are you trying to get in the next year?
> 3. What would make this year feel like a genuine success? Be specific if you can.
> 4. *(Optional)* Where do you want to be in 5 years?

Wait for the user's response before continuing.

### Step 3: Round 2 — Right now

Ask all of the following in a single message:

> **One more round — your current priorities:**
>
> 1. What active projects or initiatives are you working on right now?
> 2. What are your objectives for the next 90 days? (3–5 concrete, measurable outcomes)
> 3. What are your top 3 priorities right now — the things that matter most this week and month?
> 4. What's currently blocking you or slowing you down?
> 5. *(Optional)* Any skills you want to build, or key relationships to develop?

Wait for the user's response before continuing.

### Step 4: Draft & Confirm

1. Synthesize all answers into a fully populated `GOALS.md` draft
2. Use the existing `GOALS.md` structure — replace every placeholder with the user's actual answers
3. Set "Last updated" to today's date
4. Present the full draft to the user as a readable preview
5. Ask: *"Does this capture it accurately? Any changes before I save?"*
6. Wait for confirmation. Apply any corrections before writing.

### Step 5: Write GOALS.md

On confirmation, overwrite `GOALS.md` with the final draft.

### Step 6: Seed Context/Memory/profile.md

1. Extract profile facts from the interview:
   - Role and what they're building
   - Company or team (if mentioned)
   - Reporting structure (if mentioned)
   - Working style hints — preferences or constraints mentioned in passing
   - 1-year vision and 5-year vision (brief)
2. Check if `Context/Memory/profile.md` already exists:
   - If yes: merge new information rather than discarding existing content
   - If no: create it fresh
3. Write or update `Context/Memory/profile.md` with this structure:

**Profile fields to include:**
- Last updated date
- Role and what they're building
- Company/Team (if known)
- 1-year north star
- 5-year vision (if provided)
- Any working style notes or preferences mentioned

### Step 7: Close

Tell the user what was written and suggest next steps — keep it brief:

> "You're set up. `GOALS.md` is populated and your profile is saved to `Context/Memory/profile.md`.
>
> Next steps:
> - `/today` — build your first daily plan
> - Drop items into `BACKLOG.md` and run `/process-backlog` to turn them into goal-aligned tasks"

## Output Format

- Batch questions into exactly 2 rounds — never ask one question at a time
- Show the full `GOALS.md` draft as a readable preview before writing anything
- Never overwrite files without explicit user confirmation
- Keep the closing message brief — no walls of text
