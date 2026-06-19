# Changelog

All notable changes to the Revenue Team Economics Simulator will be documented here.

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

- Use v0.20 to review the workspace in live use, tighten mobile ergonomics, improve final artifact packaging, and decide whether the next approved backend step is persistent saved plans, richer export/share, or a real AI endpoint boundary.

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
