# Optional Connected Sources

This skill is portable by default. Its core contract is:
1. target document
2. local project files
3. Lenny corpus
4. optional local context paths from `config.json`

Connected sources like Slack, Confluence, Jira, Notion, or other MCP-backed systems are optional enhancements.

## When connected sources are available

Use them to:
- verify prior decisions or scope changes
- pull missing stakeholder context
- resolve contradictory signals from local docs
- increase confidence in a critique that would otherwise be too generic

## When connected sources are not available

Do not imply that they were searched.

Instead:
- say the critique is grounded in local files only
- surface any material context gaps briefly in `Bottom Line`
- choose one of two branches:
  - pause for clarification
  - continue with assumptions

## Good wording

- "grounded in the target doc, local project files, and the Lenny corpus"
- "i could not verify prior Slack or Confluence history in this environment"
- "this critique may miss scope-change context that lives outside local files"

## Bad wording

- "based on your project history" when only one file was read
- "this likely means leadership wanted X" without evidence
- any language that suggests broader context access than the tool actually had
