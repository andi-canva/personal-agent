# /steelman-advice

Stress-test any product document using tailored critique lenses grounded in Lenny's Newsletter and Podcast content. Point it at a PRD, strategy doc, pitch deck, or goal, it picks 2–4 perspectives, searches for real-world evidence, and returns blind spots, reframes, and options to stress-test against your current thinking.

## Quick Start

```bash
# 1. Copy this folder into your project
cp -r steelman-advice/ your-project/.claude/skills/steelman-advice/

# 2. Run setup to download Lenny's content
bash your-project/.claude/skills/steelman-advice/setup.sh

# 3. Use it in Cursor or Claude Code
/steelman-advice path/to/your-prd.md
/steelman-advice path/to/your-prd.md --mode stress-test
```

## What It Does

1. **Scopes with you first** — asks what decision the doc supports, what kind of challenge you want (blind spot hunt, stress test, alternative framing, exec readiness), and what feedback already exists. This steers the analysis and doubles as an explanation of what the tool can do. Skippable if you provide everything upfront.
2. **Reads your document** and extracts type, themes, metrics, and gaps
3. **May ask clarifying questions** if it finds gaps in context that would change the critique
4. **Picks 2–4 perspectives** from a catalog of 23 lenses using doc-type presets
5. **Searches Lenny's content** for evidence that challenges your thinking
6. **Returns one report** — TLDR, at-a-glance table, quote-first perspectives with concrete options, and a takeaway

## What It Will And Won't Do

**It will:**
- challenge your framing
- surface blind spots and missing context
- show concrete options to stress-test against your current approach
- tell you what sources it used and what it could not verify

**It won't:**
- rewrite your document for you
- make the decision on your behalf
- pretend it has context it could not actually find
- force a full report when a few clarifying questions would materially improve the critique

## Review Modes

| Mode | Perspectives | Quotes | Output |
|---|---|---|---|
| `light` | 2 | 1 each | Summary only |
| `standard` | 3 | 1 each | Summary + short rationale |
| `stress-test` | 4 | 1–2 each | Summary + full evidence section |

## Local Files First

By default, this skill is designed to work well with:
- the target document
- local project files
- the Lenny corpus
- optional local context paths from `config.json`

If your environment also exposes Slack, Confluence, or other connected sources, the skill can use them. But those are optional enhancements, not part of the default contract.

## The 23 Lenses

Organized across 5 categories, with 1 bonus lens for marketplace-shaped documents.

| Category | Lenses |
|---|---|
| **Craft** | Founder Mentality, User Advocacy, Product Sense, Technical Feasibility, AI Product Discipline |
| **Strategy** | Long-Term Thinking, Outcome Ownership, Systems Thinking, Decision Quality, Pricing & Monetization |
| **Communication** | Stakeholder Buy-In, Narrative Clarity, Writing Clarity, Cross-Functional Alignment |
| **Leadership** | Team Growth, Team Empowerment, Clarity from Chaos |
| **Additional** | Growth & Retention, Competitive Moat, Metrics & Measurement, Positioning & GTM Fit, Discovery & Evidence Quality |
| **Bonus** | Marketplace Dynamics |

Each lens maps to a Cagan product risk (Value, Usability, Feasibility, Viability, Alignment). See `perspectives.md` for the full catalog with critique questions, risk mappings, and presets.

## Folder Structure

```
steelman-advice/
├── SKILL.md              # Core workflow
├── config.json           # Your settings: Lenny path, context files, defaults
├── perspectives.md       # Full lens catalog — add your own lenses here
├── integrations.md       # Optional connected-source behavior and fallbacks
├── templates/
│   ├── report.md         # Output template — edit the format without touching the workflow
│   └── clarify.md        # Clarification template when missing context would change the critique
├── examples/
│   ├── clarification.md  # Example pause-for-context output
│   └── final-report.md   # Example final report output
├── setup.sh              # Downloads Lenny's free starter pack
└── README.md             # This file
```

## Configuration

Edit `config.json` to customize:

```json
{
  "lenny_root": "auto",
  "context_paths": {
    "goals": "GOALS.md",
    "company": null
  },
  "defaults": {
    "mode": "standard",
    "challenge": "blind-spot-hunt"
  }
}
```

| Field | What it does |
|---|---|
| `lenny_root` | `"auto"` resolves at runtime (tries `Context/Knowledge/Product/Lenny`, then `Knowledge/Product/Lenny`). Set a path to override. |
| `context_paths.goals` | Path to your goals file. Helps weight perspective selection. Set to `null` to skip. |
| `context_paths.company` | Path to company context. Grounds feedback in your reality. Set to `null` to skip. |
| `defaults.mode` | Default review mode when none is specified. |
| `defaults.challenge` | Default challenge type: `blind-spot-hunt`, `stress-test`, `alternative-framing`, or `exec-readiness`. |

## Clarification Branch

If missing context would materially change the critique, the skill should not bluff past it.

It should do one of two things:
- **Pause for clarification:** ask 2–4 targeted questions, using `templates/clarify.md`
- **Continue with assumptions:** only if the user explicitly says to keep going

See `examples/clarification.md` for what this should look like in practice.

## Customizing Perspectives

Open `perspectives.md` and:
- **Add a lens**: add a row to any category table with a name, critique question, and risk mapping
- **Remove a lens**: delete the row (the skill only uses what it finds in the file)
- **Change presets**: edit the preset table at the bottom to change which lenses are selected for each document type

## Upgrading to Full Lenny's Archive

The free starter pack includes 50 podcast transcripts and 10 newsletter posts. Paid subscribers to Lenny's Newsletter can get the full archive (289 podcasts, 349 newsletters) from [lennysdata.com](https://www.lennysdata.com/).

To upgrade:
1. Download the full archive ZIP from lennysdata.com
2. Extract `podcasts/` and `newsletters/` into your resolved Lenny root, replacing the existing folders

## Adding Your Own Content

Drop any markdown files into the parent directory of your Lenny root and the skill will search them alongside Lenny's content. Good candidates:

- Internal playbooks or frameworks
- Product strategy docs you admire
- Podcast transcripts from other shows
- Blog posts or essays on product craft

## Optional Connected Sources

If your environment exposes connected tools like Slack, Confluence, or other MCP-backed sources, use them as **supplementary context** only.

The portable default remains:
1. target document
2. local project files
3. Lenny corpus
4. optional local context paths from `config.json`

See `integrations.md` for the fallback behavior and how to talk about missing connected context explicitly.

## Works With

- Cursor (as a skill in `.claude/skills/`)
- Claude Code (as a skill in `.claude/skills/`)
- Any AI coding agent that reads SKILL.md files
