# EV-PROD-001 Plan Object Model

v0.16 keeps persistence local, but the frontend state now maps to backend-ready planning objects.

## Workspace

Container for one user, client, or consulting engagement.

```json
{
  "id": "workspace-local",
  "name": "Local planning workspace",
  "owner": "Current user",
  "createdAt": "2026-06-18T00:00:00.000Z"
}
```

## Plan

The decision context and shared assumptions for the current planning model.

```json
{
  "id": "plan-001",
  "version": "0.16.0",
  "company": "Acme Growth Co.",
  "currency": "$",
  "period": "Monthly",
  "question": "Which revenue motion should we scale?",
  "assumptions": {
    "arpu": 250,
    "margin": 75,
    "ltvMonths": 18,
    "sharedCost": 5500
  },
  "selectedScenarioId": "base"
}
```

## Scenario

A calculated version of the plan using a demand multiplier.

```json
{
  "id": "base",
  "name": "Base",
  "multiplier": 1,
  "analysis": {}
}
```

## Motion

An acquisition motion included in the model.

```json
{
  "id": "outbound",
  "name": "Outbound",
  "description": "Prospecting-led sales motion.",
  "active": true,
  "assumptions": {
    "cost": 14500,
    "leads": 2400,
    "meetingRate": 2.6,
    "winRate": 18
  }
}
```

## AssumptionSet

Shared plan assumptions plus each active motion's assumptions. This can become a backend table or JSON column later.

```json
{
  "shared": {
    "arpu": 250,
    "margin": 75,
    "ltvMonths": 18,
    "sharedCost": 5500
  },
  "motions": []
}
```

## Analysis

Deterministic calculated output. This should be reproducible from a Plan, Scenario, and AssumptionSet.

```json
{
  "customers": 22.4,
  "revenue": 5600,
  "totalCost": 38500,
  "cac": 1718,
  "payback": 9.2,
  "ltvCac": 2.0,
  "profit": -34300,
  "readinessScore": 35,
  "readinessSignal": "red",
  "motionResults": []
}
```

## DecisionMemo

AI or deterministic narrative attached to a selected scenario.

```json
{
  "id": "memo-001",
  "planId": "plan-001",
  "scenarioId": "base",
  "source": "mock_ai",
  "summary": "",
  "risks": [],
  "recommendedActions": [],
  "memo": "",
  "createdAt": "2026-06-18T00:00:00.000Z"
}
```

## Export

The preserved artifact generated from the selected plan.

```json
{
  "id": "export-001",
  "planId": "plan-001",
  "scenarioId": "base",
  "format": "markdown",
  "filename": "acme-growth-co-revenue-motion-plan.md",
  "createdAt": "2026-06-18T00:00:00.000Z"
}
```

## Persistence Direction

For v0.16, saved plans are stored in browser localStorage as snapshots containing:

- workspace
- plan
- selectedScenario
- motions
- activeMotions
- analysis
- analyst output

Future backend persistence can store the same objects in a database without changing the product vocabulary.
