# EV-PROD-001 AI Payload Contract

v0.16 does not call real AI. The AI Decision Analyst remains mocked in the frontend.

Future endpoint:

```http
POST /api/ai/analyze
```

API keys and provider secrets must stay on the backend. No secret values should be exposed in frontend code.

## Request Payload

```json
{
  "workspace": {},
  "plan": {},
  "scenario": {},
  "activeMotions": [],
  "assumptions": {},
  "analysis": {},
  "selectedScenario": {},
  "action": "explain_plan"
}
```

Allowed `action` values:

- `explain_plan`
- `diagnose_risk`
- `improve_economics`
- `draft_decision_memo`

## Example Request

```json
{
  "workspace": {
    "id": "workspace-local",
    "name": "Local planning workspace",
    "owner": "Current user"
  },
  "plan": {
    "id": "plan-001",
    "company": "Acme Growth Co.",
    "currency": "$",
    "period": "Monthly",
    "question": "Which revenue motion should we scale?",
    "assumptions": {
      "arpu": 250,
      "margin": 75,
      "ltvMonths": 18,
      "sharedCost": 5500
    }
  },
  "scenario": {
    "id": "base",
    "name": "Base",
    "multiplier": 1
  },
  "activeMotions": [
    {
      "id": "outbound",
      "name": "Outbound",
      "assumptions": {
        "cost": 14500,
        "leads": 2400,
        "meetingRate": 2.6,
        "winRate": 18
      }
    }
  ],
  "assumptions": {
    "arpu": 250,
    "margin": 75,
    "ltvMonths": 18,
    "sharedCost": 5500
  },
  "analysis": {
    "customers": 22.4,
    "revenue": 5600,
    "totalCost": 38500,
    "cac": 1718,
    "payback": 9.2,
    "ltvCac": 2,
    "profit": -34300,
    "readinessScore": 35,
    "readinessSignal": "red",
    "motionResults": []
  },
  "selectedScenario": {
    "id": "base",
    "name": "Base",
    "analysis": {}
  },
  "action": "explain_plan"
}
```

## Response Shape

```json
{
  "status": "success",
  "readinessSignal": "green",
  "summary": "",
  "risks": [],
  "recommendedActions": [],
  "decisionMemo": "",
  "confidenceNotes": []
}
```

`readinessSignal` must be one of:

- `green`
- `yellow`
- `red`

## Backend Direction

Preferred Cloudflare-compatible options:

- Cloudflare Pages Function at `/api/ai/analyze`
- Cloudflare Worker routed to `/api/ai/analyze`

The endpoint should:

1. Validate payload shape.
2. Reject unknown actions.
3. Keep provider API keys in backend secrets.
4. Send only necessary plan context to the model.
5. Return structured JSON, not free-form text only.
6. Avoid storing plan data unless a save/share backend is explicitly approved.

## Frontend Boundary

The deterministic simulator should continue to show facts, numbers, relationships, charts, and calculated outputs.

The AI Decision Analyst should handle interpretation, diagnosis, recommendations, decision memo, and stakeholder narrative.
