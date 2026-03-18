---
name: draft
description: "Draft content in your voice — emails, Slack messages, strategy docs, posts"
---

# Draft

Generate written content that sounds like you, not generic AI.

## Instructions

When the user invokes `/draft [topic or description]`, run through all steps in sequence.

If the topic is ambiguous, ask:
- What type of content? (email, Slack message, strategy doc, LinkedIn post, etc.)
- Who's the audience?
- What's the goal? (inform, persuade, align, request)

### Step 1: Check Voice & Preferences

1. Check `Context/Memory/` for voice notes, writing style preferences, or tone guidance
2. Look for `Context/Memory/Reference/writing-styles/` — if voice guides exist there, read and apply
3. If no voice reference exists, default to: direct, conversational, confident, specific over vague

### Step 2: Gather Context

Based on the content type, pull relevant context:

| Content Type | Where to Look |
|---|---|
| Email / Slack message | `Context/Meeting Notes/` for relationship context, `Tasks/` for project status |
| Strategy doc / memo | `GOALS.md`, `Context/Document Hub/` |
| Update / status | `Context/Progress Updates/`, active `Tasks/`, recent completions in `Tasks/Done/` |
| Post / article | `GOALS.md` for positioning, `Context/Memory/` for voice |

If connected tools are available (Slack, Confluence), check for recent threads related to the topic.

### Step 3: Draft

Apply these principles (override with user's voice guide if available):

**Structure:**
- Lead with the point, not throat-clearing
- Short paragraphs (2-3 sentences max)
- Clear, direct sentences

**Tone:**
- Conversational but professional
- Confident without being salesy
- Specific over vague

**Avoid:**
- "Key insight" / "Here's the thing" / "Let's be real"
- "I hope this email finds you well"
- Excessive emojis or bullet points
- Rhetorical questions followed by answers
- Generic AI phrasing

### Step 4: Present with Options

Show the draft and ask:
> "Here's a draft. Want me to adjust the tone (more casual / more formal), shorten or expand, or change the emphasis?"

## Voice Guide Bootstrap

If no voice guide or samples exist and the user wants to establish their voice:

1. Ask for 5-10 writing samples (emails, posts, docs they liked)
2. Save samples to `Context/Memory/Reference/writing-styles/voice-samples/`
3. Analyze patterns and create `Context/Memory/Reference/writing-styles/voice-guide.md` with: sentence style, openers, signature phrases, "never say" list, tone by context (internal/external/public)

This only needs to happen once — future `/draft` runs will read the guide automatically.

## Output Format

Present the draft in a copy-pasteable block. Keep meta-commentary minimal — the user wants the content, not a description of the content.
