# Changelog

All notable changes to the Revenue Team Economics Simulator will be documented here.

## [0.7.0] — 2026-06-14

### Added

- Profile personalization fields for user name, company, industry, and region.
- Motion-aware role type options for outbound, inbound, paid acquisition, partner/referral, and agency/consulting motions.
- Motion-aware input groups that show/hide outbound activity, inbound/paid demand, and partner/referral controls.
- Motion-specific default assumptions when the GTM motion changes.
- Inbound and paid acquisition logic using inbound leads, marketing spend, CPL, and MQL qualification rate.
- Partner/referral logic using active partners, leads per partner, partner commission, and partner management cost.
- Personalized executive narrative using company, industry, region, GTM motion, and selected role type.
- Motion-aware bottleneck language for outbound, inbound, paid, partner, and agency flows.
- Channel-cost aware CAC and profit calculations.

### Status

Implemented on `v0-7-motion-aware` for preview testing. This version makes the model more adaptive to the user’s go-to-market motion before further benchmark and report-mode work.

## [0.6.0] — 2026-06-14

### Added

- Scale readiness score with Do Not Scale / Scale Carefully / Ready to Scale states.
- Bottleneck detector that identifies weak funnel, unit value, and cost-structure constraints.
- Recommended action plan generated from the current economics and target gap.
- Expanded target gap planner showing required reps, required actions, required opportunities, and customer gap.
- Scenario battle explanation showing profit, LTV:CAC, and payback movement between selected scenarios.
- Stronger decision framing around whether the model should be scaled, fixed, or validated first.

### Status

Implemented on `v0-6-scale-readiness` for preview testing.

## [0.5.0] — 2026-06-14

### Added

- Modern dashboard layout with a sticky input console.
- Executive decision verdict card with clearer health language.
- Operating diagnosis cards for CAC, payback, and funnel strength.
- Visual funnel-flow chart.
- Visual money movement chart for revenue, cost, profit, and CAC.
- Executive command cards with short metric explanations.
- Target gap planner that reverse-plans required customers, opportunities, and actions.
- Gross margin input and margin-adjusted LTV:CAC logic.
- CAC payback months calculation.
- Scenario battle board with selectable baseline and comparison scenario.
- Rule-based recommended levers for win rate, lead-to-opportunity rate, ARPU, and cost reduction.
- Collapsible scroll sections for unit economics, detailed metrics, and scenario table.
- Card-based scenario board retained and upgraded inside the modern layout.

### Status

Smart economics mechanism implemented on `v0-5-modern-dashboard` for preview testing before merge into `develop`.

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

### 0.8.0

- Add benchmark guidance.
- Add confidence/risk layer.
- Add report mode.
- Add ramp and hiring-over-time controls.

### 1.0.0

- Public-ready Gumroad package.
- Documentation bundle.
- Scenario guide.
- Release notes.
