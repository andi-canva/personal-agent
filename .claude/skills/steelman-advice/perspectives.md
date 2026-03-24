# Perspective Catalog

22 core lenses across 5 categories, plus 1 bonus lens for marketplace-shaped documents. The skill picks 2–4 based on document type, review mode, and challenge type. You can add custom lenses at the bottom.

## How to read this file

Each lens has a **name**, a **critique question** (what it challenges in the document), a **category**, and a **risk mapping** (which Cagan product risk it primarily addresses).

The skill uses **presets** to select lenses automatically. You can override any preset by telling the skill which lenses to use.

---

## Craft

| Lens | Critique question | Risk |
|---|---|---|
| **Founder Mentality** | Is this 10x or incremental? Would you bet your own money on this? | Value |
| **User Advocacy** | Are real user needs driving this? Who's being left out? What evidence exists? | Value |
| **Product Sense** | Are the trade-offs right? What would a great PM push back on? | Usability |
| **Technical Feasibility** | Can this actually be built? What are the hidden integration costs and scaling risks? | Feasibility |
| **AI Product Discipline** | Is this treating a probabilistic system like deterministic software? Are evals, non-determinism, and model lifecycle addressed? | Feasibility |

## Strategy

| Lens | Critique question | Risk |
|---|---|---|
| **Long-Term Thinking** | What optionality are you killing? Where does this lead in 2–3 years? What are you locking in? | Alignment |
| **Outcome Ownership** | Are success metrics owned and measurable? Who is accountable? What does failure look like? | Viability |
| **Systems Thinking** | What are the second-order effects? Feedback loops? Unintended consequences across the ecosystem? | Feasibility |
| **Decision Quality** | Are the key decisions reversible? Is there enough data to decide? What's the cost of being wrong? | Alignment |
| **Pricing & Monetization** | Does the pricing model reflect how users get value? Is there WTP evidence? Packaging risks? | Viability |

## Communication

| Lens | Critique question | Risk |
|---|---|---|
| **Stakeholder Buy-In** | Who needs to say yes? What objections will surface? Are political dynamics named? | Alignment |
| **Narrative Clarity** | Does this pass the "so what?" test in 5 minutes? Is the story compelling to the intended audience? | Alignment |
| **Writing Clarity** | Is the document structured, scannable, and free of ambiguity? Can someone act on it without asking follow-up questions? | Usability |
| **Cross-Functional Alignment** | Are dependencies named? Is this designed for collaboration or does it assume a single-team world? | Alignment |

## Leadership & Coaching

| Lens | Critique question | Risk |
|---|---|---|
| **Team Growth** | Does this create learning and capability, or just output? Will the team be stronger after executing this? | Alignment |
| **Team Empowerment** | Can the team run with this without the author? Does it create agency or dependency? | Alignment |
| **Clarity from Chaos** | Is this cutting through ambiguity or adding to it? Is the path forward obvious after reading? | Usability |

## Additional

| Lens | Critique question | Risk |
|---|---|---|
| **Growth & Retention** | What do growth loops, activation, and retention patterns look like? Is good retention distinguished from bad retention? | Value |
| **Competitive Moat** | Does this build defensibility? Can a competitor replicate this in 6 months? Which of the 7 Powers does this build? | Viability |
| **Metrics & Measurement** | Are the KPIs the right ones? Goodhart's Law risks? Vanity metrics hiding real problems? | Viability |
| **Positioning & GTM Fit** | Is the category framing right? Does the distribution motion match how users actually buy? | Alignment |
| **Discovery & Evidence Quality** | Are claims backed by rigorous, continuous discovery — or by anecdotes and stakeholder opinion? | Value |

## Bonus

Use when the document is about a marketplace or platform with multiple user sides.

| Lens | Critique question | Risk |
|---|---|---|
| **Marketplace Dynamics** | Is liquidity addressed? Chicken-and-egg risks? Supply/demand balance? Two-sided trust mechanisms? | Viability |

---

## Cagan Risk Mapping

Each lens maps to one or more of Marty Cagan's four product risks, plus an alignment risk. This mapping helps the skill select lenses that cover different failure modes.

| Risk | Lenses |
|---|---|
| **Value** | Founder Mentality, User Advocacy, Growth & Retention, Discovery & Evidence Quality |
| **Usability** | Product Sense, Writing Clarity, Clarity from Chaos |
| **Feasibility** | Technical Feasibility, Systems Thinking, AI Product Discipline |
| **Viability** | Competitive Moat, Metrics & Measurement, Outcome Ownership, Pricing & Monetization, Marketplace Dynamics |
| **Alignment** | Narrative Clarity, Stakeholder Buy-In, Cross-Functional Alignment, Decision Quality, Team Empowerment, Team Growth, Long-Term Thinking, Positioning & GTM Fit |

---

## Presets

The skill starts with a preset based on document type, then adjusts one slot for the requested challenge or the document's biggest gap.

| Document type | Default preset |
|---|---|
| PRD / feature spec | Product Sense, User Advocacy, Metrics & Measurement |
| Strategy / initiative | Systems Thinking, Decision Quality, Competitive Moat |
| Goal / OKR | Outcome Ownership, Metrics & Measurement, Narrative Clarity |
| Pitch deck / investor update | Narrative Clarity, Competitive Moat, Growth & Retention |
| Experiment / hypothesis | Decision Quality, Metrics & Measurement, User Advocacy |
| Org / process doc | Team Empowerment, Clarity from Chaos, Stakeholder Buy-In |
| Product vision | Long-Term Thinking, Founder Mentality, Systems Thinking |
| AI product / ML feature | AI Product Discipline, Metrics & Measurement, User Advocacy |
| Pricing / packaging | Pricing & Monetization, Competitive Moat, Discovery & Evidence Quality |
| GTM / launch plan | Positioning & GTM Fit, Stakeholder Buy-In, Growth & Retention |
| Other | Decision Quality, Narrative Clarity, Systems Thinking |

### Challenge-type adjustments

After applying the preset, bias one slot toward:

- **Blind spot hunt**: the most obvious missing lens from the catalog
- **Stress test**: Decision Quality, Technical Feasibility, or Stakeholder Buy-In
- **Alternative framing**: Founder Mentality, Long-Term Thinking, or Competitive Moat
- **Exec readiness**: Narrative Clarity, Stakeholder Buy-In, or Metrics & Measurement

---

## Adding Your Own Lenses

Add rows to any category table above. Each lens needs:
- A **name** (2–3 words)
- A **critique question** (what it challenges)
- A **risk** mapping (Value, Usability, Feasibility, Viability, or Alignment)

The skill will discover new lenses when it reads this file.
