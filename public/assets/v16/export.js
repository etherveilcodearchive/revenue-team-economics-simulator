import { readinessLabel } from "./components.js";

export function buildFinalPlanMarkdown(snapshot, formatMoney) {
  const { workspace, plan, activeMotions, selectedScenario } = snapshot;
  const analysis = selectedScenario.analysis;
  const bestMotion = analysis.bestMotion?.name || "Not available";
  const readiness = readinessLabel(analysis.readinessSignal);

  return `# Revenue Motion Decision Record

Product: EV-PROD-001 - Revenue Team Economics Simulator
Company: ${plan.company}
Workspace: ${workspace.name}
Planning period: ${plan.period}
Strategic question: ${plan.question}

## Decision Summary

Selected scenario: ${selectedScenario.name}
Readiness: ${readiness} (${analysis.readinessScore}/100)
Recommended leading motion: ${bestMotion}
Monthly profit: ${formatMoney(analysis.profit)}
Blended CAC: ${formatMoney(analysis.cac)}
Payback period: ${analysis.payback.toFixed(1)} months
LTV:CAC: ${analysis.ltvCac.toFixed(1)}x

## Portfolio Economics

- Customers per month: ${analysis.customers.toFixed(1)}
- Monthly revenue: ${formatMoney(analysis.revenue)}
- Monthly cost: ${formatMoney(analysis.totalCost)}
- Monthly profit: ${formatMoney(analysis.profit)}
- Blended CAC: ${formatMoney(analysis.cac)}
- Payback: ${analysis.payback.toFixed(1)} months
- LTV:CAC: ${analysis.ltvCac.toFixed(1)}x

## Motion Mix

${activeMotions.map((motion) => {
  const result = analysis.motionResults.find((row) => row.id === motion.id);
  return `- ${motion.name}: ${result.customers.toFixed(1)} customers/month, ${formatMoney(result.revenue)} revenue, ${formatMoney(result.cost)} cost, ${formatMoney(result.cac)} CAC, ${formatMoney(result.profit)} profit`;
}).join("\n")}

## Decision Boundary

This artifact preserves the selected plan and the deterministic economics used to compare options. Interpretation, diagnosis, recommendations, and stakeholder narrative should be generated through the AI Decision Analyst after the economics are reviewed.

## Preservation Note

This is a local v0.17 preview artifact. Future backend save/share links should persist the workspace, plan, scenario, assumptions, analysis, decision memo, and export metadata.`;
}

export async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const area = document.createElement("textarea");
  area.value = text;
  document.body.appendChild(area);
  area.select();
  document.execCommand("copy");
  area.remove();
}

export function downloadMarkdown(filename, text) {
  const blob = new Blob([text], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}
