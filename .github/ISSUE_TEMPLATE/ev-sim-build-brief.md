---
name: EV-SIM Build Brief
description: Approved simulator build-loop brief for non-production preview work
title: "EV-SIM Build Brief — <version/scope>"
labels: ["ev-sim", "build-brief"]
assignees: []
---

## Product / Realm
EV-SIM-001 — Revenue Team Economics Simulator

## Source Feedback
Link the Notion Build Feedback record or GitHub comment that created this brief.

## Approved Scope
Describe exactly what may be changed.

## Non-Goals
List what must not be changed. Include product, production, backend, cost, and credential boundaries where relevant.

## Acceptance Criteria
- [ ] Scope is clear and bounded.
- [ ] Main remains untouched.
- [ ] No production deploy is performed.
- [ ] Cloudflare preview URL is recorded if a preview branch is created.
- [ ] Notion Build Record is updated.
- [ ] Review / Approval record is created or updated.

## Branch Naming
Use `preview-vNNN-short-scope` for product preview branches after approval.
Use `codex/<governance-scope>` for non-product governance scaffolding.

## PR Convention
Open a draft PR only when review benefits from GitHub diff visibility. Do not merge until Shehzad explicitly approves production promotion.

## Cost / Secret Guardrail
- No paid services.
- No secrets.
- No MiniMax.
- No Workers AI.
- No OpenAI credentials.
- No Cloudflare Pages, DNS, Access, Workers, R2, route, or secret changes unless separately approved.

## Required Preservation
- Branch:
- Commit:
- Files changed:
- Preview URL/status:
- Notion Build Record:
- Review decision:
