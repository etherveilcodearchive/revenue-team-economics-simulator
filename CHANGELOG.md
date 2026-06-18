# Changelog

All notable changes to the Revenue Team Economics Simulator will be documented here.

## [0.16.0] — 2026-06-18

### Added

- New `simulator-v16.html` static preview built from the v0.15 guided flow direction.
- Split v0.16 frontend into plain HTML/CSS/JS modules under `public/assets/v16/`.
- Added a clearer eight-step planning journey: Context, Motions, Assumptions, Economics, Compare, Select, AI Analyst, Output.
- Added stable HTML/CSS visual components for motion profit, CAC by motion, funnel flow, scenario comparison, and final-plan summary.
- Added backend-ready docs: `docs/plan-object-model.md` and `docs/ai-payload-contract.md`.
- Improved final plan output as a copyable/exportable Markdown artifact.
- Saved plans now store a structured snapshot containing workspace, plan, motion state, selected scenario, active motions, analysis, and analyst output.
- Updated the landing page to route branch previews to v0.16 first while preserving older versions.

### Product direction

v0.16 keeps the product as a static Cloudflare Pages preview while moving the codebase away from one-off prototype files. The deterministic simulator still shows facts, numbers, relationships, charts, and calculated outputs. The mocked AI Decision Analyst remains the place for interpretation, diagnosis, recommendations, and decision narrative.

### Status

Implemented on `v0-16-componentized-guided-flow` for preview testing. Production branch `main` remains unchanged.

### Next

- Verify v0.16 in the Cloudflare branch preview.
- Review UX polish, mobile behavior, and final artifact quality.
- Decide the next backend step after frontend review.

## [0.15.0] — 2026-06-18

### Added

- New `simulator-v15.html` prototype focused on a guided visual planning flow.
- Replaced the dense v0.14 dashboard approach with a clearer six-step journey.
- Added stable bar-based visualizations instead of fragile custom SVG charts.
- Added motion profit, CAC, funnel flow, scenario comparison, and motion audit views.
- Added best-plan selection across conservative, base, and aggressive scenarios.
- Added final plan output with local save, recall, copy, and text export actions.
- Kept the AI Decision Analyst as a mocked shell until backend integration is ready.
- Updated public landing page to route users to v0.15 first while preserving v0.14, v0.13, and v0.12 access.

### Product direction

v0.15 corrects the first v0.14 review issue. The product should guide the user through a logical planning path and end with a best plan that can be preserved, exported, shared, and eventually recalled through the backend.

### Status

Implemented on `v0-15-guided-visual-flow` for preview testing. This is still frontend-only and backend-ready.

### Next

- Review v0.15 in-browser for layout, readability, and flow.
- Improve chart polish and mobile behavior.
- Reintroduce stronger v0.12 controls only where they support the journey.
- Prepare a Codex implementation brief for refactor into proper frontend components.
- Define the backend AI payload contract separately.

## [0.14.0] — 2026-06-18

### Added

- New `simulator-v14.html` prototype focused on a visual planning dashboard and embedded AI Decision Analyst shell.
- Sticky executive strip retained as the only high-level card layer.
- Visual dashboard modules for revenue vs cost trend, motion economics, funnel flow, motion mix, and scenario comparison.
- Controlled AI Decision Analyst shell with bounded actions.
- Deterministic mock AI output to validate product UX before connecting a backend endpoint.
- Landing page updated to route users to the v0.14 visual dashboard while preserving access to v0.13 and v0.12.

### Product direction

v0.14 establishes the separation between the deterministic simulator and the AI interpretation layer.

### Status

Implemented on `v0-14-visual-dashboard-ai-shell` for preview testing.

## [0.13.0] — 2026-06-17

### Added

- New `simulator-v13.html` prototype focused on a boardroom-grade decision memo workspace.
- Stronger final artifact concept through a decision memo destination.
- Auto-generated decision memo that can be copied or downloaded.

### Status

Implemented on `v0-13-decision-memo-workspace` for preview testing.

## [0.12.0] — 2026-06-14

### Added

- Planning Canvas UX in one continuous workspace.
- Sticky decision strip and guided help tooltips.
- Planning mode selector, plan quality meter, and explainable decision panel.

### Status

Implemented on `v0-12-planning-canvas-guided-help` for preview testing.

## [0.11.0] — 2026-06-14

### Added

- Save Plan modal, Share Center modal, and Report Builder modal.
- Report templates, logo upload, brand accent color, and confidentiality label.

### Status

Implemented on `v0-11-save-share-report-builder` for preview testing.

## [0.10.0] — 2026-06-14

### Added

- Multi-motion guided planning flow.
- Motion-specific mini-models and portfolio-level blended economics.
- Scenario save/load and multi-motion report generation.

### Status

Implemented on `v0-10-multi-motion-flow` for preview testing.

## [0.9.0] — 2026-06-14

### Added

- Workspace-based planning UX built around Workspace, Model, Scenarios, Decisions, and Reports.
- Backend-ready object framing while still running as a static prototype.

### Status

Implemented on `v0-9-workspace-planning-ux` for preview testing.

## [0.8.0] — 2026-06-14

### Added

- Static sharing toolkit without requiring a backend.
- JSON import/export, share links, executive summary, report mode, and download actions.

### Status

Implemented on `v0-8-sharing-report` for preview testing.
