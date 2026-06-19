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
  const readiness = analysis.readinessStatus || readinessLabel(analysis.readinessSignal);
  const economicsFail = analysis.profit < 0 || analysis.allMotionsLossMaking;
  const baseSummary = economicsFail
    ? `${payload.plan.company} is evaluating the ${payload.selectedScenario.name} scenario. Demand may exist, but economics are not viable yet: readiness is ${readiness} at ${analysis.readinessScore}/100, profit is ${formatMoney(analysis.profit)}, and scale should not be recommended.`
    : `${payload.plan.company} is evaluating the ${payload.selectedScenario.name} scenario. The plan shows ${readiness} readiness at ${analysis.readinessScore}/100, ${formatMoney(analysis.cac)} blended CAC, ${analysis.payback.toFixed(1)} month payback, and ${formatMoney(analysis.profit)} profit.`;

  const response = {
    status: "success",
    readinessSignal: analysis.readinessSignal,
    summary: baseSummary,
    risks: economicsFail ? [
      analysis.allMotionsLossMaking ? "Every active motion is loss-making." : "Portfolio profit is negative after costs and shared overhead.",
      "Do not treat this plan as scale-ready until the unit economics are repaired."
    ] : [
      `${weakestMotion} has the weakest profit signal in the selected scenario.`,
      analysis.payback > 12 ? "Payback is above the preferred planning threshold." : "Payback is inside a more workable planning range."
    ],
    recommendedActions: economicsFail ? [
      "Pause scale-readiness claims and repair the economics first.",
      `Review ${weakestMotion} cost, conversion, and revenue assumptions before adding spend.`,
      "Preserve this scenario as a loss-making decision record, not as a growth recommendation."
    ] : [
      `Use ${bestMotion} as the reference motion for the next planning conversation.`,
      `Review ${weakestMotion} assumptions before increasing budget or headcount.`,
      "Preserve this selected scenario before changing assumptions."
    ],
    decisionMemo: `Decision memo draft\n\nQuestion: ${payload.plan.question}\n\n${baseSummary}\n\nDecision posture: ${economicsFail ? "economics review required before scale" : "keep the selected scenario as the current plan of record, then validate the weakest motion assumptions before committing additional spend"}.`,
    confidenceNotes: [
      "This is mocked deterministic output for v0.20.",
      "Readiness is profitability-gated; loss-making plans cannot be green.",
      "Real AI should be served from POST /api/ai/analyze through a backend endpoint."
    ]
  };

  if (payload.action === "diagnose_risk") response.summary = `Risk diagnosis: ${baseSummary}`;
  if (payload.action === "improve_economics") response.summary = `Economics improvement path: ${baseSummary}`;
  if (payload.action === "draft_decision_memo") response.summary = "Decision memo prepared from the selected scenario.";

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

function readinessLabel(signal) {
  if (signal === "green") return "Ready to review for scale";
  if (signal === "yellow") return "Needs economics review";
  return "Economics fail";
}
