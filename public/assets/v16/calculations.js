import { scenarioDefinitions } from "./state.js";

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

  return {
    id: motion.id,
    name: motion.name,
    leads,
    meetings,
    customers,
    revenue,
    grossProfit,
    cost,
    profit,
    cac
  };
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
  const readinessScore = scorePortfolio({ customers, profit, payback, ltvCac, revenue });
  const readinessSignal = readinessScore >= 75 ? "green" : readinessScore >= 45 ? "yellow" : "red";
  const bestMotion = [...motionResults].sort((a, b) => b.profit - a.profit)[0] || null;
  const weakestMotion = [...motionResults].sort((a, b) => a.profit - b.profit)[0] || null;

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
    readinessScore,
    readinessSignal,
    bestMotion,
    weakestMotion
  };
}

export function calculateScenarios(state) {
  return scenarioDefinitions.map((scenario) => {
    const analysis = calculatePortfolio(state, scenario.multiplier);
    return {
      ...scenario,
      analysis
    };
  });
}

export function calculateFullAnalysis(state) {
  const base = calculatePortfolio(state);
  const scenarios = calculateScenarios(state);
  const selectedScenario = scenarios.find((scenario) => scenario.id === state.plan.selectedScenarioId) || scenarios[1];
  const suggestedScenario = [...scenarios].sort((a, b) => {
    return b.analysis.readinessScore - a.analysis.readinessScore || b.analysis.profit - a.analysis.profit;
  })[0];

  return {
    base,
    scenarios,
    selectedScenario,
    suggestedScenario
  };
}

function scorePortfolio(portfolio) {
  let score = 0;
  if (portfolio.customers >= 10) score += 20;
  if (portfolio.profit > 0) score += 25;
  if (portfolio.payback > 0 && portfolio.payback <= 12) score += 25;
  if (portfolio.ltvCac >= 3) score += 20;
  if (portfolio.revenue > 0) score += 10;
  return Math.min(100, score);
}

function sum(rows, key) {
  return rows.reduce((total, row) => total + (Number(row[key]) || 0), 0);
}
