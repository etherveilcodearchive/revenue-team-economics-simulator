const jsonHeaders = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store"
};

const readinessLabels = {
  green: "Ready to review for scale",
  yellow: "Needs economics review",
  red: "Economics fail"
};

export function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      ...jsonHeaders,
      "access-control-allow-methods": "POST, OPTIONS",
      "access-control-allow-headers": "content-type"
    }
  });
}

export function onRequestGet() {
  return Response.json({
    ok: true,
    productId: "EV-PROD-001",
    version: "v0.20",
    endpoint: "POST /api/ai/analyze",
    mode: "deterministic mock",
    externalAi: false,
    message: "Send a selected scenario payload to receive a mocked analyst interpretation. Readiness is profitability-gated; no paid AI provider or secret is used."
  }, { headers: jsonHeaders });
}

export async function onRequestPost(context) {
  try {
    const payload = await readJson(context.request);
    const analysis = payload?.analysis || payload?.selectedScenario?.analysis || payload?.scenario?.analysis;
    const plan = payload?.plan || {};
    const scenario = payload?.selectedScenario || payload?.scenario || {};
    const action = payload?.action || "explain_plan";

    if (!analysis || typeof analysis !== "object") {
      return Response.json({
        ok: false,
        error: "Missing analysis payload.",
        expected: "Send plan, selectedScenario, activeMotions, and analysis from the simulator."
      }, { status: 400, headers: jsonHeaders });
    }

    const response = buildResponse({ plan, scenario, analysis, action, activeMotions: payload?.activeMotions || [] });
    return Response.json(response, { headers: jsonHeaders });
  } catch (error) {
    return Response.json({
      ok: false,
      error: "Invalid request body.",
      detail: error?.message || "Unable to parse JSON."
    }, { status: 400, headers: jsonHeaders });
  }
}

async function readJson(request) {
  const text = await request.text();
  if (!text.trim()) return {};
  return JSON.parse(text);
}

function buildResponse({ plan, scenario, analysis, action, activeMotions }) {
  const currency = plan.currency || "$";
  const company = plan.company || "This company";
  const scenarioName = scenario.name || "selected";
  const readiness = analysis.readinessStatus || readinessLabels[analysis.readinessSignal] || "Needs economics review";
  const bestMotion = analysis.bestMotion?.name || activeMotions[0]?.name || "the strongest active motion";
  const weakestMotion = analysis.weakestMotion?.name || activeMotions[activeMotions.length - 1]?.name || "the weakest motion";
  const profit = money(analysis.profit, currency);
  const cac = money(analysis.cac, currency);
  const payback = Number.isFinite(Number(analysis.payback)) ? Number(analysis.payback).toFixed(1) : "n/a";
  const readinessScore = Number.isFinite(Number(analysis.readinessScore)) ? Number(analysis.readinessScore) : 0;
  const lossMaking = Number(analysis.profit) < 0;
  const allMotionsLossMaking = Boolean(analysis.allMotionsLossMaking);
  const economicsFail = lossMaking || allMotionsLossMaking;

  const explainSummary = economicsFail
    ? `${company} is evaluating the ${scenarioName} plan. Demand may exist, but economics are not viable yet: readiness is ${readiness} at ${readinessScore}/100, projected profit is ${profit}, and this should not be treated as scale-ready.`
    : `${company} is evaluating the ${scenarioName} plan. The model shows ${readiness} readiness at ${readinessScore}/100, ${cac} blended CAC, ${payback} month payback, and ${profit} projected profit.`;

  const summaryByAction = {
    explain_plan: explainSummary,
    diagnose_risk: economicsFail
      ? `${company}'s main planning risk is economic viability: ${allMotionsLossMaking ? "every active motion is loss-making" : "portfolio profit is negative"}.`
      : `${company}'s main planning risk is concentration around ${weakestMotion}. Validate that motion before adding budget or headcount.`,
    improve_economics: economicsFail
      ? `Repair economics before scale: reduce cost leakage, improve conversion, or increase revenue quality in ${weakestMotion}.`
      : `The fastest economics improvement path is to use ${bestMotion} as the benchmark, then reduce CAC or cost leakage in ${weakestMotion}.`,
    draft_decision_memo: `Decision memo prepared for ${company}'s ${scenarioName} scenario.`
  };

  const summary = summaryByAction[action] || summaryByAction.explain_plan;

  return {
    ok: true,
    productId: "EV-PROD-001",
    version: "v0.20",
    endpoint: "POST /api/ai/analyze",
    source: "cloudflare-pages-function",
    mode: "deterministic mock",
    externalAi: false,
    action,
    summary,
    diagnosis: economicsFail ? [
      `Readiness signal: ${readiness} (${readinessScore}/100).`,
      allMotionsLossMaking ? "Every active motion is loss-making." : "Portfolio profit is negative after costs and shared overhead.",
      "Demand may exist, but economics are not viable yet.",
      `Payback checkpoint: ${payback} months.`
    ] : [
      `Readiness signal: ${readiness} (${readinessScore}/100).`,
      `Best motion signal: ${bestMotion}.`,
      `Weakest motion signal: ${weakestMotion}.`,
      `Payback checkpoint: ${payback} months.`
    ],
    recommendations: economicsFail ? [
      "Do not present this plan as green or scale-ready.",
      `Review ${weakestMotion} cost, conversion, and revenue assumptions before adding spend.`,
      "Preserve this decision artifact as an economics review record, not as a growth recommendation."
    ] : [
      `Treat ${scenarioName} as the plan of record only after reviewing ${weakestMotion}.`,
      `Use ${bestMotion} as the reference motion for the next operating conversation.`,
      "Preserve this decision artifact before changing assumptions again."
    ],
    decisionMemo: [
      `Decision: Review the ${scenarioName} revenue motion plan for ${company}.`,
      `Strategic question: ${plan.question || "Not provided"}`,
      `Economic readout: ${profit} profit, ${cac} blended CAC, ${payback} month payback.`,
      `Analyst posture: ${economicsFail ? "economics repair required before scale" : "proceed only after validating the weakest motion assumptions"}.`
    ].join("\n\n"),
    confidenceNotes: [
      "This response is generated by a deterministic backend mock.",
      "Readiness is profitability-gated; loss-making plans cannot be green.",
      "No external AI provider, paid API, secret, or authentication is active in v0.20."
    ]
  };
}

function money(value, currency) {
  const numeric = Math.round(Number(value) || 0).toLocaleString();
  return `${currency}${numeric}`;
}
