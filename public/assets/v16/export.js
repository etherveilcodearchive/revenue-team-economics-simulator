import { readinessLabel } from "./components.js";

export function buildFinalPlanMarkdown(snapshot, formatMoney) {
  const { workspace, plan, activeMotions, selectedScenario } = snapshot;
  const analysis = selectedScenario.analysis;
  const bestMotion = analysis.bestMotion?.name || "Not available";

  return `# Revenue Motion Plan

Company: ${plan.company}
Workspace: ${workspace.name}
Planning period: ${plan.period}
Strategic question: ${plan.question}

## Selected Plan

Scenario: ${selectedScenario.name}
Readiness: ${readinessLabel(analysis.readinessSignal)} (${analysis.readinessScore}/100)
Best motion by profit: ${bestMotion}

## Portfolio Economics

- Customers: ${analysis.customers.toFixed(1)}
- Revenue: ${formatMoney(analysis.revenue)}
- Total cost: ${formatMoney(analysis.totalCost)}
- Blended CAC: ${formatMoney(analysis.cac)}
- Payback: ${analysis.payback.toFixed(1)} months
- LTV:CAC: ${analysis.ltvCac.toFixed(1)}x
- Profit: ${formatMoney(analysis.profit)}

## Active Motions

${activeMotions.map((motion) => {
  const result = analysis.motionResults.find((row) => row.id === motion.id);
  return `- ${motion.name}: ${result.customers.toFixed(1)} customers, ${formatMoney(result.cac)} CAC, ${formatMoney(result.profit)} profit`;
}).join("\n")}

## Preservation Note

This is a local v0.16 plan artifact. Future backend save/share links should persist the workspace, plan, scenario, assumptions, analysis, decision memo, and export metadata.`;
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
