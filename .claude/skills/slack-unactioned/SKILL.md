---
name: slack-unactioned
description: "Fetch and triage unactioned Slack messages — classify as Tonight (time-sensitive) or Tomorrow (can wait). Use when asked to check unread messages, triage Slack, or see what needs attention."
---

Fetch and triage unactioned Slack messages for the relevant time period.

Steps:
- **Get the current date** — run `date +%Y-%m-%d` to determine today's date. Do NOT rely on the currentDate context block
- Determine the time period at hand (e.g. today's date if run standalone, or the day being summarised if run as part of a daily summary)
- Fetch messages from the relevant time period:
  1. Use available Slack MCP tools to find notification-triggering messages (e.g. fetch notifications, unread counts, or DMs)
  2. Check `Context/Memory/` for any stored priority channels or contacts — read those channels too
  3. Use available Slack MCP tools to read messages in each relevant channel for the time period
- For each message or thread:
  1. Read the full thread
  2. Check whether the user has already replied or reacted in that thread — if so, it is actioned and can be skipped
  3. Refer to active tasks in `Tasks/` and goals in `GOALS.md` to understand context and priority
  4. Classify unactioned messages as **Tonight** (time-sensitive: someone is blocked, a decision is needed for work happening imminently, or an urgent direct ask from a senior stakeholder) or **Tomorrow** (everything else: FYIs, async updates, questions that can wait overnight)
  5. Capture a one-line summary and a direct link to the thread

Format the output as two groups:

**Tonight**
- [thread summary] [Slack link]

**Tomorrow**
- [thread summary] [Slack link]

If there are no items in a group, omit that group entirely.

Print the result directly. Do not write it to any file.
