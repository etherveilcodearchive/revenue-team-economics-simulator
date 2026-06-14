# Revenue Team Economics Simulator

**EV-PROD-001 — Etherveil Product Forge**

A browser-based decision engine for modeling the cost, performance, and economic impact of revenue team design before hiring decisions are made.

## Current status

- Deployment pipeline: active
- Hosting: Cloudflare Pages
- Source: GitHub
- Build type: static HTML/CSS/JS
- Output directory: `public`
- Product phase: v0.1 foundation

## Product purpose

The simulator is intended to help founders, revenue leaders, RevOps teams, and consultants answer:

> If I build this revenue team, what happens economically?

It will model:

- Team size and role assumptions
- Compensation and commission structures
- Hiring and ramp timing
- Funnel conversion rates
- Meeting/opportunity/closed-won output
- CAC and LTV:CAC
- Revenue output
- Scenario comparison

## Repository structure

```text
public/
  index.html
  simulator.html

README.md
DEPLOYMENT.md
CHANGELOG.md
```

## Deployment

Cloudflare Pages should be configured with:

```text
Build command: blank
Build output directory: public
Production branch: main
```

## Product doctrine

Design revenue teams with confidence before you hire.
