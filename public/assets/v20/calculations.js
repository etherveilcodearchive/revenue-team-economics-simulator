import { scenarioDefinitions } from "../v16/state.js";

const percent = (value) => (Number(value) || 0) / 100;

export function calculateMotion(motion, planAssumptions, multiplier = 1) {
  const assumptions = motion.assumptions;
  const leads = (Number(assumptions.leads) || 0) * multiplier;
  const meetings = leads * percent(assumptions.meetingRate);
  const customers = meetings * percent(assumptions.winRate);
  const revenue = customers * (Number(planAssumptions.arpu) || 0);
  const grossProfit = revenue * percent(planAssumptions.margin);
  const cost = Number(assumptions.cost) || 0;
  const profit = grossProfit - cost;
  const cac = customers ? cost / customers : 0;

  return { id: motion.id, name: motion.name, leads, meetings, customers, revenue, grossProfit, cost, profit, cac };
}

export function calculatePortfolio(state, multiplier = 1) {
  const activeMotions = state.motions.filter((motion) => motion.active);
  const motionResults = activeMotions.map((motion) => calculateMotion(motion, state.plan.assumptions, multiplier));
  const sharedCost = Number(state.plan.assumptions.sharedCost) || 0;
  const motionCost = sum(motionResults, "cost");
  const totalCost = motionCost + sharedCost;
  const customers = sum(motionResults, "customers");
  const revenue = sum(motionResults, "revenue");
  const grossProfit = sum(motionResults, "grossProfit");
  const profit = grossProfit - totalCost;
  const cac = customers ? totalCost / customers : 0;
  const grossProfitPerCustomer = (Number(state.plan.assumptions.arpu) || 0) * percent(state.plan.assumptions.margin);
  const payback = grossProfitPerCustomer ? cac / grossProfitPerCustomer : 0;
  const ltv = grossProfitPerCustomer * (Number(state.plan.assumptions.ltvMonths) || 0);
  const ltvCac = cac ? ltv / cac : 0;
  const bestMotion = [...motionResults].sort((a, b) => b.profit - a.profit)[0] || null;
  const weakestMotion = [...motionResults].sort((a, b) => a.profit - b.profit)[0] || null;
  const readiness = scorePortfolio({ customers, profit, payback, ltvCac, revenue, motionResults });

  return {
    motionResults,
    motionCost,
    sharedCost,
    totalCost,
    customers,
    revenue,
    grossProfit,
    profit,
    cac,
    payback,
    ltv,
    ltvCac,
    readinessScore: readiness.score,
    readinessSignal: readiness.signal,
    readinessStatus: readiness.status,
    readinessMessage: readiness.message,
    readinessGate: readiness.gate,
    allMotionsLossMaking: readiness.allMotionsLossMaking,
    viableMotionCount: readiness.viableMotionCount,
    bestMotion,
    weakestMotion
  };
}

export function calculateScenarios(state) {
  return scenarioDefinitions.map((scenario) => ({ ...scenario, analysis: calculatePortfolio(state, scenario.multiplier) }));
}

export function calculateFullAnalysis(state) {
  const base = calculatePortfolio(state);
  const scenarios = calculateScenarios(state);
  const selectedScenario = scenarios.find((scenario) => scenario.id === state.plan.selectedScenarioId) || scenarios[1];
  const suggestedScenario = [...scenarios].sort((a, b) => {
    return b.analysis.readinessScore - a.analysis.readinessScore || b.analysis.profit - a.analysis.profit;
  })[0];

  return { base, scenarios, selectedScenario, suggestedScenario };
}

function scorePortfolio(portfolio) {
  const viableMotionCount = portfolio.motionResults.filter((motion) => motion.profit > 0).length;
  const activeMotionCount = portfolio.motionResults.length;
  const allMotionsLossMaking = activeMotionCount > 0 && viableMotionCount === 0;
  const demandExists = portfolio.customers > 0 || portfolio.revenue > 0;

  let score = 0;
  if (portfolio.customers >= 10) score += 20;
  if (portfolio.profit > 0) score += 25;
  if (portfolio.payback > 0 && portfolio.payback <= 12) score += 25;
  if (portfolio.ltvCac >= 3) score += 20;
  if (portfolio.revenue > 0) score += 10;

  if (allMotionsLossMaking) {
    return {
      score: Math.min(score, 34),
      signal: "red",
      status: "Economics fail",
      message: demandExists ? "Demand exists, but every active motion is loss-making." : "No viable motion economics yet.",
      gate: "all_motions_loss_making",
      allMotionsLossMaking,
      viableMotionCount
    };
  }

  if (portfolio.profit < 0) {
    return {
      score: Math.min(score, 54),
      signal: "yellow",
      status: "Needs economics review",
      message: demandExists ? "Demand exists, but economics are not viable yet." : "The selected plan is not profitable yet.",
      gate: "portfolio_loss_making",
      allMotionsLossMaking,
      viableMotionCount
    };
  }

  const signal = score >= 75 && portfolio.payback <= 12 && portfolio.ltvCac >= 3 && viableMotionCount > 0 ? "green" : score >= 45 ? "yellow" : "red";
  return {
    score: Math.min(100, score),
    signal,
    status: signal === "green" ? "Ready to review for scale" : signal === "yellow" ? "Needs review" : "High risk",
    message: signal === "green" ? "Profit, payback, LTV:CAC, and at least one motion support the plan." : "The plan needs validation before scale.",
    gate: "passed_profitability_gate",
    allMotionsLossMaking,
    viableMotionCount
  };
}

function sum(rows, key) {
  return rows.reduce((total, row) => total + (Number(row[key]) || 0), 0);
}
