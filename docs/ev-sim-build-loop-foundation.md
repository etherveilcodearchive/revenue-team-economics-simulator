# EV-SIM-001A Build Loop Foundation

Status: foundation scaffold only. This document does not start v0.22 product implementation.

## Safety boundary

- Do not touch `main` without explicit production approval.
- Do not start GitHub Issue #5 from this foundation pass.
- Do not create a v0.22 product branch from this document alone.
- Do not deploy production.
- Do not add secrets, paid services, MiniMax, Workers AI, OpenAI credentials, Cloudflare Pages/DNS/Access/Workers/R2 changes, or active schedules.

## Notion loop objects

The deterministic loop is:

1. Build Feedback
2. Build Brief
3. GitHub proof item
4. Build Record / Automation Run preservation
5. Review / Approval record

A build may start only when a Build Brief is explicitly marked Approved for Build.

## GitHub operating structure

### Labels

Required repository labels:

- `ev-sim`
- `build-brief`
- `approved-for-build`
- `ready-for-review`
- `revision-required`
- `blocked`

### Branch naming

Product preview branches should use:

```text
preview-vNNN-short-scope
```

Governance-only scaffolding branches should use:

```text
codex/<governance-scope>
```

### PR convention

Use draft PRs when GitHub diff visibility helps review. A draft PR is not approval to merge. Merge permission remains No unless Shehzad explicitly approves production promotion.

## No-secret static check workflow

`.github/workflows/ev-sim-static-check.yml` provides a lightweight static guardrail check. It has no deploy step and no secrets. It can run manually through `workflow_dispatch` or on pull requests that touch public assets, functions, docs, or workflow/template files.

## Paused Loom/n8n workflow specs

These workflows are specifications only until separately created and activated in Loom/n8n.

### EV-SIM Build Pickup

Trigger: manual or scheduled, but inactive until approved.

Inputs:

- Notion Build Brief ID
- GitHub issue URL
- requested branch convention

Guardrails:

- Build Brief status must be Approved for Build.
- Cost Guardrail must be No paid services.
- Main must not be changed.
- No secrets or Cloudflare configuration changes.

Actions:

- Create Notion Automation Run / preservation record first.
- Post GitHub pickup proof.
- Mark the GitHub issue as claimed/running if labels exist.
- Stop if the brief is not approved.

Outputs:

- Notion run URL
- GitHub proof comment
- status: claimed, blocked, or no eligible task

### EV-SIM Run Watcher

Trigger: poll active Build Records, inactive until approved.

Inputs:

- Build Record ID
- branch
- commit
- optional PR URL
- optional workflow run URL

Guardrails:

- Never merge.
- Never deploy production.
- Never modify product files.

Actions:

- Detect stale Running records.
- Record success, failure, timeout, or blocked state.
- Preserve failure evidence in Notion and GitHub.

Outputs:

- durable status update
- failure report if needed

### EV-SIM Preview Review

Trigger: manual or after a preview branch is available, inactive until approved.

Inputs:

- preview URL
- branch
- expected commit
- route checklist

Guardrails:

- HTTP checks only unless Cloudflare Operator approves deeper read access.
- No Pages/DNS/Access/Workers/R2 mutations.

Actions:

- Check preview route availability.
- Check `/api/health` and `/api/ai/analyze` only by safe GET/POST where applicable.
- Record uncertainty honestly if deployed commit cannot be confirmed.

Outputs:

- route check status
- preview evidence
- Ready for Review handoff if checks pass

### EV-SIM Nightly Preserve

Trigger: nightly, inactive until approved.

Inputs:

- active Build Records
- Automation Runs
- GitHub issues/PRs

Guardrails:

- Reporting and preservation only.
- No implementation.
- No branch creation.
- No commit, push, merge, or deploy.

Actions:

- Find unpreserved runs.
- Write Notion/GitHub summary.
- Flag blocked or stale work.

Outputs:

- daily preservation report
- next-action recommendations

## Diagnostic loop expectation

A no-product diagnostic loop should prove:

```text
sample feedback -> sample build brief -> GitHub proof issue/comment -> build record -> pending review record
```

The diagnostic loop must not start v0.22, modify simulator code, or touch `main`.
