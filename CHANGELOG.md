# Changelog

All notable changes to the Revenue Team Economics Simulator will be documented here.

## [0.21.0] - 2026-06-19

### Simulation workspace concept pass

- Added `public/concept-command-center.html` to explore a full-width simulation command center with input console, central simulation canvas, decision cockpit, scenario deck, and artifact preview.
- Added `public/concept-financial-lab.html` to explore a calmer financial planning lab with assumptions, executive metrics, scenario table, motion economics, and decision memo preview.
- Added `public/concept-decision-cockpit.html` to explore a product-like strategy simulator where the selected plan is the central object with motion modules, scenario posture, risk summary, and artifact drawer.
- Added `public/assets/v21/concepts.css` as a shared static concept stylesheet for all three routes.
- Updated `public/index.html` and `public/build-info.html` to expose the concept routes clearly while preserving v0.20 and older prototype links.

### Product boundary

- v0.21 is a static UX concept pass, not a full simulator build.
- v0.20 remains the latest working simulator route.
- No real external AI, paid API provider, secrets, authentication, database persistence, production merge, or `main` update was added.
- Existing Cloudflare Pages Functions routes remain untouched: `GET /api/health`, `GET /api/ai/analyze`, and `POST /api/ai/analyze`.

### Recommendation

- Use v0.22 to turn the strongest chosen direction into a working simulator version. Initial recommendation: combine the Strategy Decision Cockpit's central plan object with the Financial Planning Lab's credible scenario table and memo preview.

## [0.20.0] - 2026-06-19

### Premium interface restraint + visual logic QA

- Added `public/simulator-v20.html` as the active branch-preview route on `preview-v020-premium-ui-qa`.
- Added `public/assets/v20/styles.css` for a quieter, more spacious workspace with restrained hierarchy, reduced visual noise, and mobile-safe layout rules.
- Added `public/assets/v20/app.js`, `public/assets/v20/calculations.js`, and `public/assets/v20/ai-contract.js` so v0.20 can harden readiness and analyst language without overwriting earlier prototype logic.
- Replaced targetless visual bars with ranked economics lists, plain funnel facts, scenario matrix rows, and motion audit tables.
- Updated `public/index.html` and `public/build-info.html` so the branch preview points to v0.20 while preserving older prototype routes.

### Profitability-gated readiness

- Corrected readiness logic so loss-making selected plans cannot show green readiness.
- Capped readiness below green when total portfolio profit is negative.
- Applied a stronger red `Economics fail` signal when every active motion is loss-making.
- Added user-facing interpretation language for cases where demand exists but economics are not viable yet.
- Updated deterministic analyst mock language and the Cloudflare Pages Function analyst response to respect the profitability gate.

### Preserved from v0.19 and v0.18

- Preserved scenario switching, assumption updates, local save/recall, copy/export behavior, backend connectivity status, and final artifact generation.
- Preserved Cloudflare Pages Functions routes: `GET /api/health`, `GET /api/ai/analyze`, and `POST /api/ai/analyze`.
- Preserved deterministic mocked analyst behavior. No real external AI, paid API provider, secrets, authentication, database persistence, production merge, or `main` update was added.

### Next

- Use v0.21 to validate the full guided journey in live preview, improve final artifact polish, and decide whether the next approved backend step is persistent saved plans, richer export/share, or a real AI endpoint boundary.

## [0.19.0] - 2026-06-19

### Workspace UX rebuild

- Added `public/simulator-v19.html` as the active branch-preview route on `preview-v019-workspace-ux`.
- Added `public/assets/v19/app.js` and `public/assets/v19/styles.css` for a full-width simulator workspace rather than another long stacked page.
- Rebuilt the interaction model around a module rail, central simulator canvas, persistent decision cockpit, scenario command center, backend analyst panel, and final artifact mode.
- Separated configuration from outputs so business context, motion selection, and assumptions live in an input console while calculated economics, scenario comparison, and the final plan live in distinct work areas.
- Added a scenario matrix for at-a-glance comparison and direct scenario selection.
- Added an always-visible decision cockpit with selected scenario, leading motion, deterministic warnings, and decision status.
- Added a focused artifact view so the final decision record feels like the destination of the product rather than a buried page section.

### Preserved from v0.18

- Preserved the Cloudflare Pages Functions backend foundation:
  - `GET /api/health`
  - `GET /api/ai/analyze`
  - `POST /api/ai/analyze`
- Preserved deterministic mocked analyst behavior. No real external AI, paid API provider, secrets, authentication, or database persistence were added.
- Preserved the v0.16 calculation, state, chart, component, storage, export, and AI payload modules as the simulator engine.
- Preserved scenario switching, assumption updates, local save/recall, copy/export behavior, and older prototype routes.

### Preservation

- Updated `public/index.html` to route the branch preview to v0.19 first while preserving v0.18 through v0.12 links.
- Updated `public/build-info.html` with v0.19 branch, route, API, and boundary information.
- Production branch `main` remains untouched.

### Next

- Use v0.20 to review the workspace in live use, tighten mobile ergonomics, improve final artifact packaging, and decide whether the next approved backend step is persistent saved plans, richer share/export, or a real AI endpoint boundary.

## [0.18.0] - 2026-06-19

### Guided product flow

- Added `public/simulator-v18.html` as the active branch-preview route on `preview-v018-guided-backend`.
- Added `public/assets/v18/app.js` and `public/assets/v18/styles.css` for a more intentional guided planning workspace.
- Reorganized the experience around a visible progress path: Context, Motions, Assumptions, Economics, Compare, Select, Analyst, and Artifact.
- Added a planning progress pulse and live decision snapshot so the user can see where they are in the decision journey.
- Preserved v0.16 calculation, state, chart, component, storage, and export modules rather than replacing the deterministic engine.

### Backend foundation

- Added Cloudflare Pages Functions under `functions/api/`:
  - `GET /api/health`
  - `POST /api/ai/analyze`
- Added visible backend connectivity status in the v0.18 frontend.
- Routed analyst actions through the deterministic backend mock when available, with a local deterministic fallback if the API is unavailable.
- Kept the analyst layer explicitly mocked. No real external AI, paid API provider, secrets, or authentication were added.

### Preservation

- Updated `public/index.html` to route the branch preview to v0.18 first while preserving older prototype links.
- Updated `public/build-info.html` with v0.18 branch, route, API, and boundary information.
- Production branch `main` remains untouched.

### Next

- Use v0.19 to harden the backend contract, improve true mobile QA, and decide whether the next approved backend step is plan persistence, report export, or a real AI endpoint boundary.

## [0.17.0] - 2026-06-19

### UX foundation

- Added `public/simulator-v17.html` as a frontend-only UX foundation preview on `preview-v017-ux-foundation`.
- Added `public/assets/v17/styles.css` for a lighter design system, clearer app shell, tighter section rhythm, and mobile-safe layout rules.
- Reorganized the v0.17 simulator into the approved planning path: Context, Revenue Motions, Assumptions, Economics, Scenario Comparison, Plan Selection, AI Analyst, and Final Output.
- Added visible v0.17 build/version visibility for EV-PROD-001, branch `preview-v017-ux-foundation`, and branch-head commit tracking.
- Updated `public/index.html` and `public/build-info.html` so the v0.17 preview is the active review route while preserving v0.16, v0.15, v0.14, v0.13, and v0.12 links.
- Improved the exported final plan artifact language so it reads more like an executive decision record while preserving the v0.16 calculation and state flow.

### Product boundary

- This build fixes the skeleton first. It does not add backend AI, new scenario math, new SaaS scope, production deployment, or changes to `main`.
- v0.16 calculation logic, local save/recall, scenario controls, copy/export flow, and mocked AI analyst behavior remain the foundation.

### Next

- Use v0.18 for focused final-output polish, artifact packaging, and copy/export/share confidence before starting any backend AI endpoint.

## [0.16.1] - 2026-06-19

### Review hardening

- Added a visible v0.16 review build badge to `public/simulator-v16.html` showing product ID, version, branch `preview-v016`, and commit `b0139f2`.
- Added `public/build-info.html` as a lightweight build visibility page for product ID, version, branch, commit, build purpose, route links, and current status.
- Linked the build-info page from the public gate while preserving access to v0.16, v0.15, v0.14, v0.13, and v0.12 routes.
- Kept the build frontend-only. Backend AI implementation has not started, and production branch `main` remains untouched.

### Next

- Use v0.17 for approved UX polish, final artifact quality, and packaging readiness before any backend AI implementation begins.

## [0.16.0] - 2026-06-18

### Added

- New `simulator-v16.html` static preview built from the v0.15 guided flow direction.
- Split v0.16 frontend into plain HTML/CSS/JS modules under `public/assets/v16/`:
  - `app.js`
  - `state.js`
  - `calculations.js`
  - `components.js`
  - `charts.js`
  - `storage.js`
  - `export.js`
  - `ai-contract.js`
- Added a clearer eight-step planning journey:
  - Context
  - Motions
  - Assumptions
  - Economics
  - Compare
  - Select
  - AI Analyst
  - Output
- Added stable HTML/CSS visual components for motion profit, CAC by motion, funnel flow, scenario comparison, and final-plan summary.
- Added backend-ready docs:
  - `docs/plan-object-model.md`
  - `docs/ai-payload-contract.md`
- Improved final plan output as a copyable/exportable Markdown artifact.
- Saved plans now store a structured snapshot containing workspace, plan, full motion state, selected scenario, active motions, analysis, and analyst output.
- Updated the landing page to route branch previews to v0.16 first while preserving v0.15, v0.14, v0.13, and v0.12 access.

### Product direction

v0.16 keeps the product as a static Cloudflare Pages preview while moving the codebase away from one-off prototype files. The deterministic simulator still shows facts, numbers, relationships, charts, and calculated outputs. The mocked AI Decision Analyst remains the place for interpretation, diagnosis, recommendations, and decision narrative.

### Status

Implemented on `v0-16-componentized-guided-flow` for preview testing. Production branch `main` remains unchanged.

### Next

- Verify v0.16 in the Cloudflare branch preview.
- Review UX polish, mobile behavior, and final artifact quality.
- Decide whether the next backend step should be a Cloudflare Pages Function or Worker for `POST /api/ai/analyze`.

## [0.15.0] - 2026-06-18

### Added

- New `simulator-v15.html` prototype focused on a guided visual planning flow.
- Replaced the dense v0.14 dashboard approach with a clearer six-step journey:
  - Context
  - Motions
  - Analysis
  - Best plan
  - AI analyst
  - Output
- Added stable bar-based visualizations instead of fragile custom SVG charts.
- Added motion profit, CAC, funnel flow, scenario comparison, and motion audit views.
- Added best-plan selection across conservative, base, and aggressive scenarios.
- Added final plan output with local save, recall, copy, and text export actions.
- Kept the AI Decision Analyst as a mocked shell until backend integration is ready.
- Updated public landing page to route users to v0.15 first while preserving v0.14, v0.13, and v0.12 access.

### Product direction

v0.15 corrects the first v0.14 review issue. The product should not simply show a dashboard; it should guide the user through a logical planning path and end with a best plan that can be preserved, exported, shared, and eventually recalled through the backend.

### Status

Implemented on `v0-15-guided-visual-flow` for preview testing. This is still frontend-only and backend-ready.

### Next

- Review v0.15 in-browser for layout, readability, and flow.
- Improve chart polish and mobile behavior.
- Reintroduce stronger v0.12 controls only where they support the journey.
- Prepare a Codex implementation brief for refactor into proper frontend components.
- Define the backend AI payload contract separately.

## [0.14.0] - 2026-06-18

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
- Connect the first real AI action through a backend endpoint.
- Add report/export flow once the visual dashboard is stable.

## [0.13.0] - 2026-06-17

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

## [0.12.0] - 2026-06-14

### Added

- Planning Canvas UX that keeps all sections in one continuous workspace instead of switching step pages.
- Scroll-to-section navigation for Setup, Motions, Inputs, Decision, and Reports.
- Sticky decision strip showing readiness, CAC, payback, profit, and best motion while users edit assumptions.
- Collapsible planning sections with summary text for completed areas.
- Planning mode selector: Quick, Detailed, and Consultant.
- Plan quality meter: Draft, Review-ready, and Share-ready states.
- Guided help tooltips using question-mark helper icons on key inputs, outputs, decisions, and motion assumptions.
- Explainable "Why this result?" decision panel with key drivers.
- Tooltip-ready motion field descriptions for outbound, inbound, paid acquisition, partner/referral, and agency/consulting motions.

### Status

Implemented on `v0-12-planning-canvas-guided-help` for preview testing. This version makes the product feel lighter, more explainable, and less like a long wizard.

## [0.11.0] - 2026-06-14

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

## [0.10.0] - 2026-06-14

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

## [0.9.0] - 2026-06-14

### Added

- Workspace-based planning UX built around Workspace -> Model -> Scenarios -> Decisions -> Reports.
- Backend-ready object framing while still running as a static prototype.
- Workspace dashboard with active model, scale readiness, best next move, and scenario count.
- Guided model builder that organizes profile, planning goal, GTM motion, team architecture, channel economics, funnel, and targets.
- Decision engine section with readiness score, CAC, payback, profit, bottlenecks, and recommended actions.
- Scenario library treated as planning objects instead of raw browser states.
- Reports and sharing section aligned to a future hosted/collaborative product.
- Sidebar command-center navigation for a more premium 2026 planning workflow.

### Status

Implemented on `v0-9-workspace-planning-ux` for preview testing.

## [0.8.0] - 2026-06-14

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
