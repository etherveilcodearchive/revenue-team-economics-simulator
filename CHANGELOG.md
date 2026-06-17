# Changelog

All notable changes to the Revenue Team Economics Simulator will be documented here.

## [0.14.0] — 2026-06-18

### Added

- New `simulator-v14.html` prototype focused on a visual planning dashboard and embedded AI Decision Analyst shell.
- Sticky executive strip retained as the only high-level card layer: readiness, blended CAC, payback, monthly profit, and best motion.
- Visual dashboard modules for:
  - Revenue vs cost trend
  - Motion economics by acquisition motion
  - Funnel flow from leads to meetings to customers
  - Motion mix by customer contribution
  - Conservative / base / aggressive scenario comparison
- Controlled AI Decision Analyst shell with bounded actions:
  - Explain this plan
  - Diagnose risk
  - Improve economics
  - Generate decision memo
- Deterministic mock AI output to validate product UX before connecting a backend endpoint.
- Landing page updated to route users to the v0.14 visual dashboard while preserving access to v0.13 and v0.12.

### Product direction

v0.14 establishes the separation between the deterministic simulator and the AI interpretation layer. The simulator UI should show facts, numbers, relationships, and charts. Strategic interpretation, diagnosis, recommendations, and decision narrative should belong to the AI Decision Analyst layer.

### Status

Implemented on `v0-14-visual-dashboard-ai-shell` for preview testing. This version is a frontend/product-experience prototype and is still backend-ready rather than backend-connected.

### Next

- Refine chart quality, chart labels, and mobile visual behavior.
- Merge stronger v0.12 planning controls into the v0.14 visual dashboard.
- Define the backend AI payload contract.
- Connect the first real AI action through a Cloudflare Worker endpoint.
- Add report/export flow once the visual dashboard is stable.

## [0.13.0] — 2026-06-17

### Added

- New `simulator-v13.html` prototype focused on a boardroom-grade decision memo workspace.
- Etherveil Forge visual treatment using dark parchment, gold, rune/codex styling, and a stronger artifact-like interface.
- Single-motion economics model for rapid scenario testing.
- Live calculations for customers/month, monthly revenue, CAC, payback, LTV:CAC, monthly profit, readiness, and plan quality.
- Auto-generated decision memo that can be copied or downloaded as a `.txt` file.
- Sample scenario loader for quick demos.
- Updated public index page to point to the v0.13 workspace while preserving access to the v0.12 planning canvas.

### Status

Implemented on `v0-13-decision-memo-workspace` for preview testing. This version explores the next product direction: turning model outputs into a clear decision artifact that founders, operators, consultants, or stakeholders can actually use.

### Next

- Merge the v0.13 decision memo layer back into the existing v0.12 multi-motion planning canvas.
- Add multi-motion memo generation.
- Add branded report preview/export flow.
- Connect scenario save/load logic to memo outputs.

## [0.12.0] — 2026-06-14

### Added

- Planning Canvas UX that keeps all sections in one continuous workspace instead of switching step pages.
- Scroll-to-section navigation for Setup, Motions, Inputs, Decision, and Reports.
- Sticky decision strip showing readiness, CAC, payback, profit, and best motion while users edit assumptions.
- Collapsible planning sections with summary text for completed areas.
- Planning mode selector: Quick, Detailed, and Consultant.
- Plan quality meter: Draft, Review-ready, and Share-ready states.
- Guided help tooltips using question-mark helper icons on key inputs, outputs, decisions, and motion assumptions.
- Explainable “Why this result?” decision panel with key drivers.
- Tooltip-ready motion field descriptions for outbound, inbound, paid acquisition, partner/referral, and agency/consulting motions.

### Status

Implemented on `v0-12-planning-canvas-guided-help` for preview testing. This version makes the product feel lighter, more explainable, and less like a long wizard.

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

Implemented on `v0-9-workspace-planning-ux` for preview testing.

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