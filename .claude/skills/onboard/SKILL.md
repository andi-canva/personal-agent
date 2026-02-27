---
name: onboard
description: "Run a structured onboarding interview to populate GOALS.md with goals and profile context"
---

# Onboard

Guide the user through a structured interview to populate `GOALS.md` with goals, priorities, and profile context.

## Instructions

When the user invokes `/onboard`, run through all steps in sequence.

### Step 1: Check Current State

1. Read `GOALS.md`
2. Determine whether it's still a blank template:
   - **Blank/template**: contains placeholder text — strings like `[Your role`, `[Date]`, `[Priority 1]`, `[placeholder]`, etc.
   - **Already filled**: real content has replaced the placeholders
3. If already filled:
   - Tell the user: "Looks like you're already set up. Want to review and refresh your goals instead of starting over?"
   - If yes: proceed with the interview but frame it as a refresh, pre-populate answers from current values, and confirm changes before writing
   - If no: stop
4. If blank or template: proceed to Step 2

### Step 2: Choose a path

Ask the user which approach they'd like in a single message:

> **Two ways to get set up — pick whichever feels easier:**
>
> **Option A — Quick bootstrap via ChatGPT (or Claude in Slack):**
> Paste the following prompt into ChatGPT (check Personalisation → Memory first for best results) or into Claude in Slack. Copy the output and paste it back here — I'll take it from there.
>
> ---
> *I'd like you to bootstrap the following personal data about me by looking at my biggest documents, meetings and conversations over the past 3 months. Follow this exact template and answer the questions:*
> - *What's your current role, and what company/team are you on?*
> - *What's your primary professional vision? What are you building toward?*
> - *In 12 months, what would make you think 'this was a successful year'?*
> - *What's your 5-year north star? Where do you want to be?*
> - *What are you actively working on right now?*
> - *What are your objectives for THIS QUARTER (next 90 days)?*
> - *What skills do you need to develop to achieve your vision?*
> - *What key relationships or network do you need to build?*
> - *What's currently blocking you or slowing you down?*
> - *What opportunities are you exploring or considering?*
> - *Any working style preferences or constraints worth noting?*
> ---
>
> **Option B — Answer my questions directly** (2 quick rounds, takes about 5 minutes)

Wait for the user's choice before continuing.

- If they choose **Option A** (or paste output): go to Step 3A
- If they choose **Option B**: go to Step 3B

### Step 3A: Bootstrap from AI output

1. Accept the pasted output from ChatGPT or Claude
2. If any connected tools are available (Confluence, Slack, Jira), search them for context that enriches the answers — e.g. recent project docs, OKRs, or team discussions that add depth to what was pasted
3. Synthesize everything into a `GOALS.md` draft, then go to Step 4

### Step 3B: Interview — Round 1 (Who you are & where you're going)

Ask all of the following in a single message:

> **A few questions to get you set up** — answer as much or as little as you like:
>
> 1. What's your current role, and what are you primarily building or working on?
> 2. What company or team are you on? Who do you report to? *(Optional)*
> 3. What's your professional north star — where are you trying to get in the next year?
> 4. What would make this year feel like a genuine success? Be specific if you can.
> 5. *(Optional)* Where do you want to be in 5 years?

Wait for the user's response, then ask Round 2:

> **One more round — your current priorities:**
>
> 1. What active projects or initiatives are you working on right now?
> 2. What are your objectives for the next 90 days? (3–5 concrete, measurable outcomes)
> 3. What are your top 3 priorities right now — the things that matter most this week and month?
> 4. What's currently blocking you or slowing you down?
> 5. *(Optional)* Any skills you want to build, key relationships to develop, or working style preferences worth noting?

Wait for the user's response, then go to Step 4.

### Step 4: Draft & Confirm

1. Synthesize all answers into a fully populated `GOALS.md` draft
2. Use the existing `GOALS.md` structure — replace every placeholder with the user's actual answers
3. Add a **Profile** section at the top (after "Last updated") with any facts that don't fit elsewhere:
   - Company / Team (if provided)
   - Reporting structure (if provided)
   - Working style notes or preferences (if mentioned)
   - Omit fields the user didn't provide
4. Set "Last updated" to today's date
5. **If refreshing** (GOALS.md was already filled): merge new answers into the existing content — preserve anything not covered in this session, update fields that were answered, add new fields where missing. Do not erase existing content the user did not revisit.
6. Present the full draft to the user as a readable preview
7. Ask: *"Does this capture it accurately? Any changes before I save?"*
8. Wait for confirmation. Apply any corrections before writing.

### Step 5: Write GOALS.md

On confirmation, write the final draft to `GOALS.md`.

### Step 6: Close

Tell the user what was written and suggest next steps — keep it brief:

> "Done. `GOALS.md` is up to date with your goals and profile.
>
> Next steps:
> - `/today` — build your first daily plan
> - Drop items into `BACKLOG.md` and run `/backlog` to turn them into goal-aligned tasks"

## Output Format

- Batch questions into exactly 2 rounds — never ask one question at a time
- Show the full `GOALS.md` draft as a readable preview before writing anything
- Never write files without explicit user confirmation
- Keep the closing message brief — no walls of text
