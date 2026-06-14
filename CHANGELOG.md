# Changelog

All notable changes to the Revenue Team Economics Simulator will be documented here.

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

Implemented on `v0-8-sharing-report` for preview testing. This version prepares the static Gumroad product for practical sharing before backend or account-based SaaS work.

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

Implemented on `v0-7-motion-aware` for preview testing.
