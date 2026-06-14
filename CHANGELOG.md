# Changelog

All notable changes to the Revenue Team Economics Simulator will be documented here.

## [0.5.0] — 2026-06-14

### Added

- Modern dashboard layout with a sticky input console.
- Executive decision verdict card with clearer health language.
- Operating diagnosis cards for CAC, profit, and funnel strength.
- Visual funnel-flow chart.
- Visual money movement chart for revenue, cost, profit, and CAC.
- Executive command cards with short metric explanations.
- Collapsible scroll sections for unit economics, detailed metrics, cost breakdown, ramp impact, attainment sensitivity, and scenario table.
- Card-based scenario board retained and upgraded inside the modern layout.

### Status

Implemented on `v0-5-modern-dashboard` for preview testing before merge into `develop`.

## [0.4.0] — 2026-06-14

### Added

- Multi-currency display selector: EUR, USD, GBP, PKR, AED, and SAR.
- GTM motion selector to adapt input language.
- Role type selector to adapt rep labels.
- Side-by-side realtime comparison cards.
- Current Model card compared against saved scenarios.
- Delta indicators for customers, revenue, profit, CAC, and LTV:CAC.
- Cleaner comparison UX while keeping the detailed table.

### Status

Implemented on `v0-4-ui-currency-comparison` for preview testing.
Preview rebuild trigger added after Cloudflare did not show a new branch build automatically.

## [0.3.0] — 2026-06-14

### Added

- Scenario saving with browser localStorage.
- Scenario load/delete controls.
- Default scenario restoration.
- Conservative, base, and aggressive saved scenario set.
- Scenario comparison table.
- Compare view for reps, customers, revenue, cost, profit, CAC, and LTV:CAC.
- Branch-based development on `feature/v0-3-scenario-system`.

### Status

Scenario system implemented and promoted to production.

## [0.2.0] — 2026-06-14

### Added

- Generalized revenue economics simulator engine.
- Editable team architecture assumptions.
- Editable activity and funnel assumptions.
- Editable revenue model assumptions.
- Conservative, base, and aggressive scenario presets.
- Executive health snapshot.
- Core output metrics: actions, connects, qualified leads, opportunities, customers, revenue, cost, CAC, LTV:CAC, profit, and break-even customers.
- Cost breakdown table.
- Ramp impact table.
- Attainment sensitivity table.
- Print summary action.

### Status

First functional simulator engine deployed. Calculations are generalized and no longer tied to a single company use case.

## [0.1.0] — 2026-06-14

### Added

- Cloudflare Pages deployment foundation.
- `public/index.html` placeholder landing page.
- Repository README.
- Deployment guide.
- Changelog.
- Initial simulator shell.

### Status

Infrastructure live. Product engine not yet ported.

## Planned

### 0.6.0

- Add ramp controls.
- Add hiring-over-time mode.
- Add lead source modes.
- Add optional acquisition costs.
- Add target planning inputs.

### 1.0.0

- Public-ready Gumroad package.
- Documentation bundle.
- Scenario guide.
- Release notes.
