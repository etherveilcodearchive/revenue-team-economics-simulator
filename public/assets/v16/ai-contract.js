import { readinessLabel } from "./components.js";

export function buildAiPayload(snapshot, action) {
  return {
    workspace: snapshot.workspace,
    plan: snapshot.plan,
    scenario: snapshot.selectedScenario,
    activeMotions: snapshot.activeMotions,
    assumptions: snapshot.plan.assumptions,
    analysis: snapshot.selectedScenario.analysis,
    selectedScenario: snapshot.selectedScenario,
    action
  };
}

export function mockAiResponse(payload, formatMoney) {
  const analysis = payload.analysis;
  const bestMotion = analysis.bestMotion?.name || "the strongest active motion";
  const weakestMotion = analysis.weakestMotion?.name || "the weakest active motion";
  const readiness = readinessLabel(analysis.readinessSignal);
  const baseSummary = `${payload.plan.company} is evaluating the ${payload.selectedScenario.name} scenario. The plan shows ${readiness} readiness, ${formatMoney(analysis.cac)} blended CAC, ${analysis.payback.toFixed(1)} month payback, and ${formatMoney(analysis.profit)} profit.`;

  const response = {
    status: "success",
    readinessSignal: analysis.readinessSignal,
    summary: baseSummary,
    risks: [
      `${weakestMotion} has the weakest profit signal in the selected scenario.`,
      analysis.payback > 12 ? "Payback is above the preferred planning threshold." : "Payback is inside a more workable planning range."
    ],
    recommendedActions: [
      `Use ${bestMotion} as the reference motion for the next planning conversation.`,
      `Review ${weakestMotion} assumptions before increasing budget or headcount.`,
      "Preserve this selected scenario before changing assumptions."
    ],
    decisionMemo: `Decision memo draft\n\nQuestion: ${payload.plan.question}\n\n${baseSummary}\n\nDecision posture: keep the selected scenario as the current plan of record, then validate the weakest motion assumptions before committing additional spend.`,
    confidenceNotes: [
      "This is mocked deterministic output for v0.16.",
      "Real AI should be served from POST /api/ai/analyze through a backend endpoint."
    ]
  };

  if (payload.action === "diagnose_risk") {
    response.summary = `Risk diagnosis: ${baseSummary}`;
  }
  if (payload.action === "improve_economics") {
    response.summary = `Economics improvement path: ${baseSummary}`;
  }
  if (payload.action === "draft_decision_memo") {
    response.summary = "Decision memo prepared from the selected scenario.";
  }

  return response;
}

export function formatMockAiResponse(response) {
  return `${response.summary}

Risks
${response.risks.map((risk) => `- ${risk}`).join("\n")}

Recommended actions
${response.recommendedActions.map((action) => `- ${action}`).join("\n")}

Decision memo
${response.decisionMemo}

Confidence notes
${response.confidenceNotes.map((note) => `- ${note}`).join("\n")}`;
}
