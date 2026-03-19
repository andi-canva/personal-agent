---
name: steelman-advice
description: Stress-tests PRDs, strategy docs, initiative briefs, and goals using tailored critique lenses grounded in Lenny's content. Use when the user asks for a steelman, blind spot hunt, stress test, alternative framing, or exec-readiness review.
---

# /steelman-advice

Invoke: `/steelman-advice [doc] [--mode light|standard|stress-test]`

## Outcome

Review the target document and return:
- The single biggest blind spot
- A short table of perspectives, problems, and reframes
- A ranked improvement list
- Quote-backed evidence from Lenny's content
- Optional deep dives for each perspective when the mode or user request warrants it

Default behavior should be concise. Depth is opt-in.

## Review Modes

| Mode | Use when | Perspectives | Quotes | Output depth |
|---|---|---|---|---|
| `light` | Early thinking, quick blind-spot scan | 2 | 1 each | Summary only |
| `standard` | Normal review | 3 | 1 each | Summary + short rationale |
| `stress-test` | High-stakes review, explicit pushback, exec prep | 4 | 1-2 each | Summary + full deep dives |

If the user says "just run it," use `standard`.

## Step 1: Scope Lightly

Before asking anything, check whether the prompt or document already answers these.

Ask only the missing questions:
1. **What decision does this document support?**
2. **What kind of challenge do you want?**
   - Blind spot hunt
   - Stress test
   - Alternative framing
   - Exec readiness
3. **What feedback or pressure-testing already exists?**

Only ask about the user's current lean or confidence if it materially changes the review.

Defaults:
- Challenge type: `Blind spot hunt`
- Prior feedback: none assumed
- Mode: `standard`

## Step 2: Load The Document

If a file path is provided, read it directly.

If only a name is provided, search common locations:
1. `Tasks/` directory (if it exists)
2. `Context/Document Hub/` directory (if it exists)
3. Use Glob with the name pattern across the workspace

Once found, read the full document.

## Step 3: Resolve Context And Sources

### Required

Resolve the Lenny root in this order:
1. `Context/Knowledge/Product/Lenny`
2. `Knowledge/Product/Lenny`

`index.json` under the resolved root is required. If it does not exist, tell the user to run `setup.sh`.

### Optional

Read these if they exist:
- `GOALS.md`
- `Context/Memory/company.md`
- `Context/Reference/company.md`
- Other markdown content under the parent product-knowledge directory

### Important retrieval rule

Do **not** assume `index.json.filename` maps directly to an on-disk file path. Use the index for title, guest, tags, and description discovery, then locate the actual file under `podcasts/` or `newsletters/` with Glob or ripgrep before reading it.

## Step 4: Profile The Document

Extract:
- Document type: PRD, strategy doc, initiative brief, goal/OKR, org/process doc, other
- Core themes
- Stated success metrics
- Gaps or missing sections
- Sections or claims most worth challenging

## Step 5: Pick Perspectives With Presets

Start with the preset for the document type, then adjust one slot for the requested challenge or biggest gap.

| Document type | Default preset |
|---|---|
| PRD / feature spec | `Product Sense`, `Community-Centric Thinking`, `Metrics & Measurement` |
| Strategy / initiative brief | `Systems Thinking`, `Decision Quality`, `Competitive Moat` |
| Goal / OKR | `Ownership of Outcomes`, `Metrics & Measurement`, `Narrative Clarity` |
| Org / process / team doc | `Team Empowerment`, `Clarity from Chaos`, `Stakeholder Alignment` |
| Other / mixed | `Decision Quality`, `Narrative Clarity`, `Systems Thinking` |

Then adapt:
- `Blind spot hunt`: add the most obvious missing lens
- `Stress test`: bias toward `Decision Quality`, `Technical Feasibility`, `Stakeholder Alignment`
- `Alternative framing`: bias toward `Founder Mentality`, `Long-Term Thinking`, `Competitive Moat`
- `Exec readiness`: bias toward `Narrative Clarity`, `Stakeholder Alignment`, `Metrics & Measurement`

Rules:
- Always include at least one uncomfortable lens
- `light`: 2 perspectives
- `standard`: 3 perspectives
- `stress-test`: 4 perspectives
- Prefer depth over variety

### Perspective catalog

- `Founder Mentality`
- `Community-Centric Thinking`
- `Product Sense`
- `Technical Feasibility`
- `Long-Term Thinking`
- `Ownership of Outcomes`
- `Systems Thinking`
- `Decision Quality`
- `Narrative Clarity`
- `Stakeholder Alignment`
- `Clarity from Chaos`
- `Team Empowerment`
- `Growth & Retention`
- `Competitive Moat`
- `Metrics & Measurement`

## Step 6: Run The Analysis

If the host environment supports sub-agents, run the selected perspectives in parallel. Otherwise, run them sequentially in one agent.

Keep the execution contract tight:
- Use 1-2 Lenny sources per perspective
- Use 1 direct quote per perspective in `light` and `standard`
- Use 1-2 direct quotes per perspective in `stress-test`, but only if the second adds new information
- Do not read 2-3 long files per perspective by default
- If the document is long, pass a summary plus the most relevant sections instead of the entire file text

Use this per-perspective output shape:

```text
**Perspective: [NAME]**

**Observed Bias / Problem:** [Specific claim, section, or omission]

**Reframe:** [Concrete shift in approach]

**Evidence Quote:**
> "[Direct quote]"
**[Guest Name]**, [Episode or post title]

**What To Improve:**
1. [Actionable change]
2. [Actionable change]

**Discomfort Rating:** [Low / Medium / High]
```

## Step 7: Consolidate Once

Return one canonical report.

### Default report format

```text
# Steelman: [Document Name]
_Reviewed: [date] | Mode: [mode] | Perspectives: [list]_
_Why these perspectives: [1 sentence]_

## The Single Biggest Blind Spot
[Cross-perspective synthesis]

## Perspective Summary

| Perspective | Problem | Reframe | Discomfort |
|---|---|---|---|
| [Name] | [1 line] | [1 line] | [Low/Med/High] |

## What To Improve
1. [ ] [Highest-leverage change] — flagged by [perspective(s)]
2. [ ] [Next change] — flagged by [perspective(s)]
3. [ ] [Next change] — flagged by [perspective(s)]

## Evidence
[Include the per-perspective blocks here only when mode = stress-test or the user asked for full detail.]
```

Do not duplicate the same content as both a detailed narrative and a summary unless the user explicitly asks for both.

## Step 8: Offer Follow-Ups

Offer only the most relevant follow-up actions:
- Go deeper on one perspective
- Draft revised sections
- Re-run in a different mode
- Find more evidence on one topic

## Quality Bar

Before finishing, verify:
- The resolved Lenny root actually exists
- Paths in the report match this repo
- Perspective count matches the selected mode
- The report is concise by default
- Quotes add evidence rather than repeating the same point
