# Changelog

All notable changes to the Revenue Team Economics Simulator will be documented here.

## [0.11.0] — 2026-06-14

### Added

- Save Plan modal with backend-ready save options: new plan, new scenario, or new version.
- Plan metadata fields: description, visibility, and status.
- Share Center modal with report link, email invite, stakeholder summary, and role concepts.
- Report Builder modal with report template selector and section toggles.
- Report templates for Executive Brief, Client Strategy Report, Manager Review, Investor GTM Snapshot, Board Summary, and Internal Planning Memo.
- Company logo upload and local logo preview.
- Brand accent color setting for future branded report exports.
- Confidentiality label for reports.
- Export Data Backup renamed and repositioned as an advanced/backup action instead of primary sharing.
- Email draft flow using mailto for early prototype sharing.

### Status

Implemented on `v0-11-save-share-report-builder` for preview testing. This version refines the save, share, and report workflows around the hosted backend product vision.

## [0.10.0] — 2026-06-14

### Added

- Multi-motion guided planning flow.
- Minimal premium visual system using warm paper, graphite, bronze, and deep green tones.
- Step-based process: setup, goal, active motions, motion inputs, shared costs, decision review, and reports.
- Multi-select acquisition motions instead of single GTM motion selection.
- Motion-specific mini-models for outbound, inbound, paid acquisition, partner/referral, and agency/consulting.
- Motion-level economics: customers, revenue, cost, CAC, payback, LTV:CAC, and profit.
- Portfolio-level blended economics across all selected motions.
- Shared cost and overhead layer applied at portfolio level.
- Motion mix visualization by customer contribution.
- Decision engine that identifies best and weakest active motion.
- Portfolio scenario save/load and share-link support.
- Multi-motion report generation and download.

### Status

Implemented on `v0-10-multi-motion-flow` for preview testing. This version reframes the product around realistic mixed acquisition motions instead of forcing a single sales motion.

## [0.9.0] — 2026-06-14

### Added

- Workspace-based planning UX built around Workspace → Model → Scenarios → Decisions → Reports.
- Backend-ready object framing while still running as a static prototype.
- Workspace dashboard with active model, scale readiness, best next move, and scenario count.
- Guided model builder that organizes profile, planning goal, GTM motion, team architecture, channel economics, funnel, and targets.
- Decision engine section with readiness score, CAC, payback, profit, bottlenecks, and recommended actions.
- Scenario library treated as planning objects instead of raw browser states.
- Reports and sharing section aligned to a future hosted/collaborative product.
- Sidebar command-center navigation for a more premium 2026 planning workflow.

### Status

Implemented on `v0-9-workspace-planning-ux` for preview testing. This version shifts the product from a calculator page toward a backend-ready revenue planning workspace.

## [0.8.0] — 2026-06-14

### Added

- Static sharing toolkit without requiring a backend.
- Export current scenario as JSON.
- Export all saved scenarios as a scenario pack.
- Import scenario JSON and scenario pack JSON.
- Copy encoded share link for current scenario state.
- Copy executive summary to clipboard.
- Report mode with generated client/manager-ready text report.
- Copy report and download report actions.
- Region / market changed from free text to structured dropdown.

### Status

Implemented on `v0-8-sharing-report` for preview testing.
