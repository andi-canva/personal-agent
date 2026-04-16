---
name: prd-draft
description: "Sharpen a product idea into a discovery-ready opportunity brief through critical questioning, strategic framing, and hypothesis formulation. Used by PMs to define the opportunity space before committing to solution work."
---

# /prd-draft — Discovery Opportunity Brief

Turn a raw idea into a sharp, strategically grounded discovery brief. The brief defines the opportunity space, problem, and hypothesis so it's ready for continuous discovery and planning. The output is a living document that improves over each interaction.

**This is not a full PRD.** It's the opportunity space only: problem, evidence, strategic fit, and hypothesis. Solution space comes later, after discovery validates the opportunity.

## When to Use

- You have an idea or observation and needs to sharpen it
- An opportunity needs framing before it enters the backlog or planning
- A team wants to pressure-test whether a problem is worth solving
- Before committing engineering or design time to discovery

**Scaling to PM experience:** The skill works at different depths. A junior PM with a vague idea will get more questions and more scaffolding. A senior PM with sharp input can move through Phase 2 in 3 questions and get a draft fast. The skill adapts — it doesn't force everyone through the same level of interrogation.

## Instructions

When the user invokes `/prd-draft [idea, problem, or observation]`, follow these phases in order.

---

### Phase 1: Brain Dump

Prompt the PM to share everything they have. The goal is to get the messy, unstructured thinking out of their head before any structure is applied.

**Opening prompt:**
> "Share everything you've got on this idea. Voice note transcript, Slack thread, meeting notes, data you've seen, customer quotes, a half-formed hunch — anything. Don't worry about structure. Just dump it all and I'll pull out what matters."

Accept any format:
- Voice note transcripts (raw, unedited)
- Pasted Slack messages or email threads
- Meeting notes or doc links
- Screenshots or data references
- Stream-of-consciousness text
- Multiple messages — let them keep going until they say they're done

**Do not interrupt.** Let the PM finish. If they pause, ask: "Anything else? Other conversations, data points, or context I should know about?"

**Do not fabricate missing information.** Work only with what the PM provides.

---

### Phase 2: Distill and Challenge

This is the core of the skill. Process the raw dump, extract the signal, and challenge where the thinking is fuzzy or contradictory.

#### Step A: Play back the essentials

Summarize what you heard in 5-8 bullets, structured as:
- **The problem as I understand it:** [1-2 sentences]
- **Who's affected:** [segment]
- **Evidence you mentioned:** [list what they cited]
- **What success would look like:** [if stated]
- **Contradictions or tensions I noticed:** [where the dump said conflicting things]

This playback does two things: confirms you understood correctly, and forces the PM to see their own thinking reflected back — including the messy parts.

#### Step B: Challenge and clarify

Based on what's **missing or contradictory** in the dump, ask 3-5 targeted questions. Don't ask what's already clear. Draw from these categories:

**Problem Clarity** — when the dump describes a solution but not a problem, or names multiple problems without prioritizing:
- What specific user pain or friction are you observing? (Not the solution, the problem.)
- How do users work around this today? What's their current alternative?
- Is this a problem for all users or a specific segment?
- You mentioned [X] and [Y] — are those the same problem or two different ones?

**Impact and Evidence** — when the dump has assertions without data, or data without interpretation:
- You said [claim] — what data supports that? Or is that a hunch?
- How many users are affected? What's the reach?
- What's the business cost of not solving this?
- You cited [data point] — does that prove the problem exists, or just that something is happening?

**Strategic Fit** — when the dump doesn't connect to goals, or the timing rationale is missing:
- Which company or team goal does this directly advance?
- Why this problem over the 10 other problems you could solve?
- Why now? What's changed that makes this urgent?
- What would you stop doing to make room for this?

**Contradictions** — when the dump says conflicting things:
- You said [X] earlier but also [Y] — which one is closer to the truth?
- The data you mentioned suggests [A], but your hypothesis assumes [B]. How do you reconcile that?
- You framed this as [scope X] but then described [scope Y]. What's actually in scope?

**Hypothesis Strength** — when the dump has no clear bet, or the bet isn't falsifiable:
- If you solve this, what specific outcome do you expect? (Metric + direction + magnitude)
- What's the riskiest assumption in your thinking right now?
- What would make you abandon this idea?

**After the PM responds**, assess whether the brief is ready to draft.

A **critical gap** means at least one of these is still missing:
- No identifiable user or segment (who has the problem?)
- No problem statement (only a solution or feature request)
- No success signal at all (no metric, no behavior change, nothing to measure)
- An irreversible bet with no acknowledgment of risk

If critical gaps remain, ask up to 3 more targeted follow-ups. Maximum two rounds of questions total. Then draft — missing evidence is flagged as "Bet" in the evidence snapshot, not left as a blocker.

---

### Phase 3: Draft the Discovery Brief

Before drafting, check for related context:
1. Search `Tasks/` and `Tasks/Backlog/` for existing work on the same problem space (avoid duplicating or contradicting existing briefs)
2. If the user named a specific team goal or company strategy, search `Context/Document Hub/` for relevant strategy docs

Draft the brief using the template below. The output has two layers:

1. **Lightweight Discovery Goal** — the mandatory sections. Always fill these. This is the core artifact that enters planning.
2. **PRD Opportunity Space** — optional deeper sections that expand the brief. Only fill after the lightweight draft is reviewed and the user asks to go deeper.

**Reader map:**
- Phase 2 questions sharpen *your thinking*. Phase 4 questions sharpen *the brief*.
- The lightweight template is what goes into planning. The expansion adds depth for kickoff.
- Lightweight sections map to expansion sections: Problem Context → deeper in Evidence; Impact → deeper in Opportunity Sizing; Why Now → deeper in Strategic Fit. The expansion adds *new* depth, not duplicate headings.

Write in Minto principle (lead with the conclusion, then support). Bullet points, not paragraphs. Simple language for non-technical stakeholders. 250 characters max per bullet.

**Save to:** `Tasks/[InitiativeName] Discovery Brief.md`

```markdown
---
title: "[Initiative Name] Discovery Brief"
description: "[~150 chars: what opportunity this explores and why it matters now]"
type: task
category: research
topics: []
priority: [P0|P1|P2|P3]
status: n
created_date: [YYYY-MM-DD]
resource_refs: []
---

# Lightweight Discovery Goal

## [Verb] + [Initiative] + [Impact on Outcome]
_e.g., Launch visionRAG capability to increase CSAT_

## Opportunity Statement

_Transform the problem into an opportunity to improve people's experiences. One sentence._

## Problem Context

_Describe the background or current situation that reveals the problem or unmet need._

## Impact

_Describe how the problem affects the customer experience. Highlight how it impacts business objectives._

## Working Hypothesis

_"We believe that [doing X] will result in [outcome Y] for [user segment Z], measured by [metric]."_

- Riskiest assumption:
- Reversible? Y / N — if no, what would undo look like:

## What Is the Outcome

_Define what success looks like if this problem is solved, using measurable metrics or a change to the user experience where possible._

-
-

## So What? Why Should We Do This?

_A short description on relevance and strategic importance._

-
-

## Why Now?

_A short description of why this matters strategically right now._

-
-

---

# Notes and Open Questions for Discovery

_What must be true for this to work? What do we still need to learn?_

1.
2.
3.

### Evidence snapshot

_List what you have. It's fine to have gaps — flag them as bets, not blanks._

| What we believe | Evidence type | Strength | Next check |
|----------------|--------------|----------|------------|
| | Behavioral data / Metric / User interview / Survey / Support ticket / Competitive signal / Assumption | Strong / Moderate / Bet | |

_Strength guide: Behavioral data or metrics > multiple interview signals > single quote or anecdote. Two independent sources beat one. "Bet" means no evidence yet — name the cheapest way to validate within 48 hours._

---

# Resources

- PRD / spec:
- Loom Video:
- Design file:
- Data / dashboards:

---

# PRD Opportunity Space [Optional: expand after lightweight draft is reviewed]

_These sections add depth to the lightweight brief. They don't repeat it._

## Who: Target Users

- Who are you building for? Be specific: device, market, plan tier, behavior pattern.

## Evidence

### Supporting Data

- Analytics, user feedback, surveys, market trends, device/demographic/behavioral data

### Competitive Research

- What are competitors doing? What inspires us? What are they missing?

### Opportunity Sizing

- Key benefits for users and the business: MAUs, Reach, ARR

## Strategic Fit (expands Why Now)

- Why is this the right problem to solve now over other opportunities?
- What company goal or strategy does this relate to?
- Non-goals:

## Dependencies, Risk and Mitigations

### Risks

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| | H / M / L | |

### Dependencies

| Dependency | Type | Mitigation |
|-----------|------|------------|
| | Stakeholder / Technical / Calendar / Other | |
```

**Filling rules:**
- The Lightweight Discovery Goal sections are **mandatory**. Always fill them from the user's input and Phase 2 answers.
- The PRD Opportunity Space sections are **optional**. Leave them as prompts unless the user explicitly asks to expand.
- The Working Hypothesis must be falsifiable: includes a specific metric and direction. If the PM can't state one yet, write their best guess and mark the riskiest assumption.
- Every field the user provides a number for: use that number, don't replace with placeholders
- Fields with no information: leave the prompt text and flag in Notes and Open Questions
- In the Evidence snapshot: use "Bet" for claims with no supporting data. A bet is not a failure — it's an honest signal that this needs validation.
- No marketing language ("revolutionary", "game-changing") — use concrete impact language
- No em dashes in headings (use colons or hyphens)
- Opportunity Statement: frame as upside, not just a restated problem
- 250 characters max per bullet in outcome, so-what, and why-now sections

---

### Phase 4: Improve the Draft

After presenting the brief, always end with:

1. **3 sharpening questions** — selected to improve the weakest parts of the brief. Focus especially on:
   - Impact estimation if no numbers exist yet
   - Evidence gaps that could sink the case
   - Strategic fit if the "why now" is weak

2. **A self-assessment** — rate the brief on three dimensions:
   - Problem clarity: [Sharp / Needs work / Unclear]
   - Evidence strength: [Strong / Moderate / Thin]
   - Strategic fit: [Tight / Plausible / Weak]

3. **Next steps prompt:**
   > "Review your discovery goal. I can help you:
   > - **Sharpen** any section with more questions
   > - **Expand** the PRD Opportunity Space (target users, evidence, competitive research, risks, dependencies)
   > - **Full PRD** when you're ready for solution space and delivery planning
   > - **Add to backlog** to schedule for planning
   >
   > What would be most useful?"

---

### Phase 5: Iterate or Expand

If the user wants to sharpen: repeat Phase 2 targeting the weak areas, then update the brief in place.

If the user wants to expand the PRD Opportunity Space:
1. Fill the optional PRD Opportunity Space sections in the same document using the user's answers
2. Ask targeted questions for any sections that still have gaps (Target Users, Evidence, Risks, Dependencies)
3. Update the brief in place

If the user wants to expand to a full PRD (Solution Space + Delivery):
1. Read `Tasks/Templates/prd.md` for the full structure
2. Append Solution Space, Eval Strategy, and Delivery sections to the document
3. Suggest: "Run `/prd-ready` before sending to reviewers to catch gaps."

If the user wants to add to backlog:
1. Add a kanban entry to `Weekly Kanban.md` under Backlog
2. Confirm the priority level

---

## Key Principles

Grounded in best practices from product leadership (sources: Lenny's Newsletter and Podcast archive).

1. **Problem before solution** — "Many PMs jump into solution-finding before they truly understand the problem. If you understand why a problem exists and frame it clearly, only a few solutions will be left." Force problem clarity first.

2. **Hypothesis as strategy** — Every brief must contain a falsifiable hypothesis with a metric and direction. "A good strategy is, in the end, a hypothesis about what will work."

3. **Evidence over assertion** — "Look at both quantitative and qualitative evidence. Quality over quantity. Three to five strong data points." Flag weak evidence honestly rather than padding.

4. **Strategic sequencing** — "Prioritizing is another word for sequencing." The brief must answer why *this* problem, why *now*, and what you'd stop doing to make room.

5. **Short learning loops** — Design for fast validation. "The advantage is in latency: short cycle time between an assumption and being able to validate that hypothesis." Include a 2-week early signal and kill criteria.

6. **Start from objectives, not solutions** — "Go back to the objectives you were trying to solve and now with this technology, how can you do that objective better?" Don't let shiny solutions drive problem framing.

7. **The brief is a living document** — It improves through each conversation. Don't aim for perfection on the first pass. Aim for sharp enough to make a resource decision.

## Anti-Patterns to Challenge

When you spot these in the user's input, call them out directly:

- **Solution masquerading as a problem** — "We need to build X" is not a problem statement. Ask what user pain X would solve.
- **Vague impact** — "Improve user experience" is not impact. Push for a metric, a direction, and a magnitude.
- **Missing counterfactual** — "We should do this" without "and here's what happens if we don't" lacks strategic grounding.
- **HIPPO-driven priority** — If the only rationale is "leadership wants this," ask what evidence leadership is responding to.
- **Boiling the ocean** — If the opportunity affects "all users" with "many problems," push for the sharpest wedge: narrowest segment, clearest pain, fastest validation.
- **Why-now without a trigger** — If nothing changed to make this urgent, it may not be urgent. Ask what the timing trigger is.
- **Analysis paralysis** — If the PM keeps refining the problem statement, requesting more data, or hesitating to commit to a hypothesis, name it. A brief with an honest "Bet" is more useful than a perfect brief that never ships. Push for: "What's your best guess right now? We can be wrong — that's what discovery is for."
