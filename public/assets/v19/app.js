import { createInitialState, getActiveMotions } from "../v16/state.js";
import { calculateFullAnalysis } from "../v16/calculations.js";
import { renderBarChart, renderFunnel } from "../v16/charts.js";
import {
  readinessLabel,
  renderMotionInputs,
  renderMotionSelect,
  renderMotionTable,
  renderSavedPlans,
  renderScenarioCards,
  renderScenarioPicker
} from "../v16/components.js";
import { buildFinalPlanMarkdown, copyText, downloadMarkdown } from "../v16/export.js";
import { loadSavedPlans, savePlanSnapshot } from "../v16/storage.js";
import { buildAiPayload, formatMockAiResponse, mockAiResponse } from "../v16/ai-contract.js";

let state = createInitialState();
let savedPlans = loadSavedPlans();
let backend = { available: false, mode: "checking" };
let activeView = "configure";
let focusMode = false;

const els = {
  company: document.getElementById("company"),
  currency: document.getElementById("currency"),
  period: document.getElementById("period"),
  question: document.getElementById("question"),
  arpu: document.getElementById("arpu"),
  margin: document.getElementById("margin"),
  ltvMonths: document.getElementById("ltvMonths"),
  sharedCost: document.getElementById("sharedCost"),
  motionSelect: document.getElementById("motionSelect"),
  motionInputs: document.getElementById("motionInputs"),
  profitChart: document.getElementById("profitChart"),
  cacChart: document.getElementById("cacChart"),
  funnelChart: document.getElementById("funnelChart"),
  motionTable: document.getElementById("motionTable"),
  scenarioCards: document.getElementById("scenarioCards"),
  scenarioPicker: document.getElementById("scenarioPicker"),
  selectedScenarioTitle: document.getElementById("selectedScenarioTitle"),
  selectedScenarioCopy: document.getElementById("selectedScenarioCopy"),
  finalTitle: document.getElementById("finalTitle"),
  finalReadiness: document.getElementById("finalReadiness"),
  finalMemo: document.getElementById("finalMemo"),
  savedPlans: document.getElementById("savedPlans"),
  aiOutput: document.getElementById("aiOutput"),
  metricReadiness: document.getElementById("metricReadiness"),
  metricCac: document.getElementById("metricCac"),
  metricPayback: document.getElementById("metricPayback"),
  metricProfit: document.getElementById("metricProfit"),
  metricSelected: document.getElementById("metricSelected"),
  backendStatus: document.getElementById("backendStatus"),
  backendDetail: document.getElementById("backendDetail"),
  analystSource: document.getElementById("analystSource"),
  activeMotionCount: document.getElementById("activeMotionCount"),
  workspacePulse: document.getElementById("workspacePulse"),
  decisionSignal: document.getElementById("decisionSignal"),
  cockpitCompany: document.getElementById("cockpitCompany"),
  cockpitQuestion: document.getElementById("cockpitQuestion"),
  cockpitScenario: document.getElementById("cockpitScenario"),
  cockpitBestMotion: document.getElementById("cockpitBestMotion"),
  cockpitDecision: document.getElementById("cockpitDecision"),
  cockpitWarnings: document.getElementById("cockpitWarnings"),
  scenarioMatrix: document.getElementById("scenarioMatrix"),
  impactFeed: document.getElementById("impactFeed"),
  artifactPreview: document.getElementById("artifactPreview"),
  focusArtifact: document.getElementById("focusArtifact"),
  exitFocus: document.getElementById("exitFocus"),
  viewButtons: Array.from(document.querySelectorAll("[data-view]")),
  panels: Array.from(document.querySelectorAll("[data-panel]"))
};

wireBaseInputs();
wireActions();
wireWorkspaceViews();
render({ controls: true });
checkBackend();

function render(options = { controls: false }) {
  syncStateFromInputs();
  state.analysis = calculateFullAnalysis(state);
  const { base, selectedScenario, suggestedScenario, scenarios } = state.analysis;
  const finalSnapshot = buildSnapshot();
  const finalMarkdown = buildFinalPlanMarkdown(finalSnapshot, formatMoney)
    .replace("local v0.17 preview artifact", "v0.19 workspace preview artifact")
    .replace("Future backend save/share links", "Future backend save/share links from the v0.19 workspace");

  if (options.controls) {
    renderMotionSelect(els.motionSelect, state, updateMotionActive);
    renderMotionInputs(els.motionInputs, state, updateMotionAssumption);
  }

  renderSummaryMetrics(selectedScenario);
  renderCharts(base);
  renderMotionTable(els.motionTable, base.motionResults, formatMoney);
  renderScenarioCards(els.scenarioCards, scenarios, suggestedScenario, formatMoney);
  renderScenarioPicker(els.scenarioPicker, scenarios, state.plan.selectedScenarioId, selectScenario);
  renderScenarioMatrix(scenarios, suggestedScenario);
  renderSelection(selectedScenario, suggestedScenario);
  renderDecisionCockpit(selectedScenario, suggestedScenario);
  renderImpactFeed(base, selectedScenario);
  renderFinal(selectedScenario, finalMarkdown);
  renderSavedPlans(els.savedPlans, savedPlans, recallSavedPlan);
  renderWorkspacePulse(selectedScenario);
}

function wireBaseInputs() {
  [els.company, els.currency, els.period, els.question, els.arpu, els.margin, els.ltvMonths, els.sharedCost].forEach((input) => {
    input.addEventListener("input", () => render());
    input.addEventListener("change", () => render());
  });
}

function wireActions() {
  document.querySelectorAll("[data-ai-action]").forEach((button) => {
    button.addEventListener("click", () => runAnalystAction(button.dataset.aiAction));
  });

  document.getElementById("savePlan").addEventListener("click", () => {
    savedPlans = savePlanSnapshot(buildSnapshot());
    renderSavedPlans(els.savedPlans, savedPlans, recallSavedPlan);
  });

  document.getElementById("copyPlan").addEventListener("click", async () => {
    await copyText(els.finalMemo.textContent);
  });

  document.getElementById("exportPlan").addEventListener("click", () => {
    const company = state.plan.company.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "revenue-plan";
    downloadMarkdown(`${company}-v019-revenue-plan.md`, els.finalMemo.textContent);
  });

  els.focusArtifact?.addEventListener("click", () => setFocusMode(true));
  els.exitFocus?.addEventListener("click", () => setFocusMode(false));
}

function wireWorkspaceViews() {
  els.viewButtons.forEach((button) => {
    button.addEventListener("click", () => setActiveView(button.dataset.view));
  });
}

function setActiveView(view) {
  activeView = view;
  els.viewButtons.forEach((button) => button.classList.toggle("active", button.dataset.view === view));
  els.panels.forEach((panel) => panel.classList.toggle("active", panel.dataset.panel === view));
}

function setFocusMode(enabled) {
  focusMode = enabled;
  document.body.classList.toggle("artifact-focus", enabled);
  if (enabled) setActiveView("artifact");
}

async function checkBackend() {
  setBackendStatus("Checking API", "Connecting to /api/health...");
  try {
    const response = await fetch("/api/health", { headers: { accept: "application/json" } });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    backend = { available: true, mode: data.analystMode || "deterministic mock" };
    setBackendStatus("API connected", `${data.runtime}. Analyst mode: ${data.analystMode}.`);
    if (els.analystSource) els.analystSource.textContent = "Backend mock connected";
  } catch (error) {
    backend = { available: false, mode: "local fallback" };
    setBackendStatus("API fallback", "Backend route unavailable in this environment. Local deterministic analyst remains available.");
    if (els.analystSource) els.analystSource.textContent = "Local fallback";
  }
}

async function runAnalystAction(action) {
  const payload = buildAiPayload(buildSnapshot(), action);
  els.aiOutput.textContent = "Asking the backend analyst mock...";
  state.analyst.lastAction = action;
  setActiveView("analyst");

  if (backend.available) {
    try {
      const response = await fetch("/api/ai/analyze", {
        method: "POST",
        headers: { "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      state.analyst.output = formatBackendResponse(data);
      els.aiOutput.textContent = state.analyst.output;
      if (els.analystSource) els.analystSource.textContent = "Backend mock response";
      renderDecisionCockpit(state.analysis.selectedScenario, state.analysis.suggestedScenario);
      return;
    } catch (error) {
      state.analyst.output = `Backend analyst failed (${error.message}). Falling back to local deterministic analyst.\n\n${formatLocalAi(payload)}`;
      els.aiOutput.textContent = state.analyst.output;
      if (els.analystSource) els.analystSource.textContent = "Local fallback after API error";
      renderDecisionCockpit(state.analysis.selectedScenario, state.analysis.suggestedScenario);
      return;
    }
  }

  state.analyst.output = formatLocalAi(payload);
  els.aiOutput.textContent = state.analyst.output;
  renderDecisionCockpit(state.analysis.selectedScenario, state.analysis.suggestedScenario);
}

function formatLocalAi(payload) {
  return formatMockAiResponse(mockAiResponse(payload, formatMoney));
}

function formatBackendResponse(response) {
  return `${response.summary}

Diagnosis
${(response.diagnosis || []).map((item) => `- ${item}`).join("\n")}

Recommendations
${(response.recommendations || []).map((item) => `- ${item}`).join("\n")}

Decision memo
${response.decisionMemo || "No memo returned."}

Backend notes
${(response.confidenceNotes || []).map((item) => `- ${item}`).join("\n")}`;
}

function setBackendStatus(label, detail) {
  if (els.backendStatus) els.backendStatus.textContent = label;
  if (els.backendDetail) els.backendDetail.textContent = detail;
}

function syncStateFromInputs() {
  state.plan.company = els.company.value.trim() || "Untitled company";
  state.plan.currency = els.currency.value;
  state.plan.period = els.period.value;
  state.plan.question = els.question.value.trim();
  state.plan.assumptions.arpu = Number(els.arpu.value) || 0;
  state.plan.assumptions.margin = Number(els.margin.value) || 0;
  state.plan.assumptions.ltvMonths = Number(els.ltvMonths.value) || 0;
  state.plan.assumptions.sharedCost = Number(els.sharedCost.value) || 0;
}

function updateMotionActive(id, active) {
  const motion = state.motions.find((item) => item.id === id);
  if (motion) motion.active = active;
  render({ controls: true });
}

function updateMotionAssumption(id, key, value) {
  const motion = state.motions.find((item) => item.id === id);
  if (motion) motion.assumptions[key] = value;
  render();
}

function selectScenario(id) {
  state.plan.selectedScenarioId = id;
  render();
}

function renderSummaryMetrics(selectedScenario) {
  const analysis = selectedScenario.analysis;
  const readiness = readinessLabel(analysis.readinessSignal);
  els.metricReadiness.textContent = `${readiness} (${analysis.readinessScore})`;
  els.metricReadiness.className = analysis.readinessSignal;
  els.metricCac.textContent = formatMoney(analysis.cac);
  els.metricPayback.textContent = `${analysis.payback.toFixed(1)} mo`;
  els.metricProfit.textContent = formatMoney(analysis.profit);
  els.metricProfit.className = analysis.profit >= 0 ? "good" : "bad";
  els.metricSelected.textContent = selectedScenario.name;
  els.activeMotionCount.textContent = String(getActiveMotions(state).length);
}

function renderWorkspacePulse(selectedScenario) {
  const activeMotionCount = getActiveMotions(state).length;
  const analysis = selectedScenario.analysis;
  const checks = [
    state.plan.question.length > 18,
    activeMotionCount > 0,
    Number.isFinite(analysis.cac),
    Boolean(state.plan.selectedScenarioId),
    Boolean(els.finalMemo?.textContent?.trim())
  ];
  const complete = checks.filter(Boolean).length;
  els.workspacePulse.textContent = `${complete}/5 checkpoints ready - ${activeMotionCount} active motions - ${selectedScenario.name} selected`;
}

function renderCharts(base) {
  renderBarChart(
    els.profitChart,
    base.motionResults.map((motion) => ({
      label: motion.name,
      value: motion.profit,
      display: formatMoney(motion.profit),
      tone: motion.profit >= 0 ? "green" : "red"
    }))
  );

  renderBarChart(
    els.cacChart,
    base.motionResults.map((motion) => ({
      label: motion.name,
      value: motion.cac,
      display: formatMoney(motion.cac),
      tone: "blue"
    }))
  );

  renderFunnel(els.funnelChart, [
    { label: "Leads", value: sum(base.motionResults, "leads"), display: formatNumber(sum(base.motionResults, "leads")) },
    { label: "Meetings", value: sum(base.motionResults, "meetings"), display: formatNumber(sum(base.motionResults, "meetings")) },
    { label: "Customers", value: base.customers, display: base.customers.toFixed(1) }
  ]);
}

function renderScenarioMatrix(scenarios, suggestedScenario) {
  els.scenarioMatrix.innerHTML = scenarios.map((scenario) => {
    const analysis = scenario.analysis;
    const active = scenario.id === state.plan.selectedScenarioId;
    const suggested = scenario.id === suggestedScenario.id;
    return `
      <button class="matrix-row ${active ? "active" : ""}" type="button" data-matrix-scenario="${scenario.id}">
        <span><strong>${escapeHtml(scenario.name)}</strong>${suggested ? "<em>Suggested</em>" : ""}</span>
        <span>${readinessLabel(analysis.readinessSignal)} ${analysis.readinessScore}/100</span>
        <span>${formatMoney(analysis.profit)}</span>
        <span>${formatMoney(analysis.cac)}</span>
        <span>${analysis.payback.toFixed(1)} mo</span>
      </button>
    `;
  }).join("");

  els.scenarioMatrix.querySelectorAll("[data-matrix-scenario]").forEach((button) => {
    button.addEventListener("click", () => selectScenario(button.dataset.matrixScenario));
  });
}

function renderSelection(selectedScenario, suggestedScenario) {
  const analysis = selectedScenario.analysis;
  els.selectedScenarioTitle.textContent = selectedScenario.name;
  els.selectedScenarioCopy.textContent = `${readinessLabel(analysis.readinessSignal)} readiness, ${analysis.readinessScore}/100 score, ${formatMoney(analysis.profit)} profit. Model-suggested scenario: ${suggestedScenario.name}.`;
}

function renderDecisionCockpit(selectedScenario, suggestedScenario) {
  const analysis = selectedScenario.analysis;
  const readiness = readinessLabel(analysis.readinessSignal);
  const bestMotion = analysis.bestMotion?.name || "No clear motion";
  els.decisionSignal.textContent = `${readiness} readiness`;
  els.decisionSignal.className = `decision-signal ${analysis.readinessSignal}`;
  els.cockpitCompany.textContent = state.plan.company;
  els.cockpitQuestion.textContent = state.plan.question || "No decision question set.";
  els.cockpitScenario.textContent = selectedScenario.name;
  els.cockpitBestMotion.textContent = bestMotion;
  els.cockpitDecision.textContent = buildDecisionLine(selectedScenario, suggestedScenario);
  els.cockpitWarnings.innerHTML = buildWarnings(analysis).map((warning) => `<li>${escapeHtml(warning)}</li>`).join("");
}

function buildDecisionLine(selectedScenario, suggestedScenario) {
  const analysis = selectedScenario.analysis;
  if (selectedScenario.id !== suggestedScenario.id) {
    return `You are reviewing ${selectedScenario.name}, while the model currently favors ${suggestedScenario.name}.`;
  }
  if (analysis.profit < 0) return "The selected scenario needs economic repair before scale.";
  if (analysis.payback > 12) return "The selected scenario is viable but payback is still long.";
  return "The selected scenario is the current best plan to preserve for review.";
}

function buildWarnings(analysis) {
  const warnings = [];
  if (analysis.profit < 0) warnings.push("Profit is negative after shared overhead.");
  if (analysis.cac > analysis.ltv * 0.45) warnings.push("CAC is consuming too much of modeled lifetime value.");
  if (analysis.payback > 12) warnings.push("Payback exceeds a one-year comfort threshold.");
  if (!warnings.length) warnings.push("No critical deterministic warnings in the selected scenario.");
  return warnings;
}

function renderImpactFeed(base, selectedScenario) {
  const sorted = [...base.motionResults].sort((a, b) => b.profit - a.profit);
  const leader = sorted[0];
  const drag = sorted[sorted.length - 1];
  const items = [
    `Revenue per customer is ${formatMoney(state.plan.assumptions.arpu)} with ${state.plan.assumptions.margin}% gross margin.`,
    leader ? `${leader.name} is the strongest contributor at ${formatMoney(leader.profit)} profit.` : "No active motion is contributing yet.",
    drag && drag.id !== leader?.id ? `${drag.name} is the lowest contributor at ${formatMoney(drag.profit)} profit.` : "Motion mix is not yet diversified enough for a weakest-motion read.",
    `${selectedScenario.name} scenario currently produces ${formatMoney(selectedScenario.analysis.profit)} profit and ${selectedScenario.analysis.payback.toFixed(1)} month payback.`
  ];
  els.impactFeed.innerHTML = items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
}

function renderFinal(selectedScenario, finalMarkdown) {
  const analysis = selectedScenario.analysis;
  els.finalTitle.textContent = `${state.plan.company} - ${selectedScenario.name} decision record`;
  els.finalReadiness.textContent = readinessLabel(analysis.readinessSignal);
  els.finalReadiness.className = `readiness-pill ${analysis.readinessSignal}`;
  els.finalMemo.textContent = finalMarkdown;
  els.artifactPreview.textContent = finalMarkdown.split("\n").slice(0, 20).join("\n");
}

function buildSnapshot() {
  const selectedScenario = state.analysis.selectedScenario;
  return {
    workspace: { ...state.workspace, version: "v0.19", backend: backend.available ? "connected" : "fallback" },
    plan: structuredCloneSafe(state.plan),
    motions: structuredCloneSafe(state.motions),
    selectedScenario: structuredCloneSafe(selectedScenario),
    activeMotions: structuredCloneSafe(getActiveMotions(state)),
    analysis: structuredCloneSafe(state.analysis),
    analyst: structuredCloneSafe(state.analyst)
  };
}

function recallSavedPlan(index) {
  const saved = savedPlans[index];
  if (!saved) return;
  state.plan = structuredCloneSafe(saved.plan);
  state.motions = structuredCloneSafe(saved.motions || saved.activeMotions).map((motion) => ({ ...motion }));
  els.company.value = state.plan.company;
  els.currency.value = state.plan.currency;
  els.period.value = state.plan.period;
  els.question.value = state.plan.question;
  els.arpu.value = state.plan.assumptions.arpu;
  els.margin.value = state.plan.assumptions.margin;
  els.ltvMonths.value = state.plan.assumptions.ltvMonths;
  els.sharedCost.value = state.plan.assumptions.sharedCost;
  render({ controls: true });
}

function formatMoney(value) {
  const symbol = state.plan.currency || "$";
  return `${symbol}${Math.round(Number(value) || 0).toLocaleString()}`;
}

function formatNumber(value) {
  return Math.round(Number(value) || 0).toLocaleString();
}

function sum(rows, key) {
  return rows.reduce((total, row) => total + (Number(row[key]) || 0), 0);
}

function structuredCloneSafe(value) {
  if (window.structuredClone) return window.structuredClone(value);
  return JSON.parse(JSON.stringify(value));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
