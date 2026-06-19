import { createInitialState, getActiveMotions } from "../v16/state.js";
import { calculateFullAnalysis } from "./calculations.js";
import { renderMotionInputs, renderMotionSelect, renderMotionTable, renderSavedPlans } from "../v16/components.js";
import { buildFinalPlanMarkdown, copyText, downloadMarkdown } from "../v16/export.js";
import { loadSavedPlans, savePlanSnapshot } from "../v16/storage.js";
import { buildAiPayload, formatMockAiResponse, mockAiResponse } from "./ai-contract.js";

let state = createInitialState();
let savedPlans = loadSavedPlans();
let backend = { available: false, mode: "checking" };

const $ = (id) => document.getElementById(id);
const els = {
  company: $("company"), currency: $("currency"), period: $("period"), question: $("question"),
  arpu: $("arpu"), margin: $("margin"), ltvMonths: $("ltvMonths"), sharedCost: $("sharedCost"),
  motionSelect: $("motionSelect"), motionInputs: $("motionInputs"), motionTable: $("motionTable"),
  scenarioMatrix: $("scenarioMatrix"), scenarioPicker: $("scenarioPicker"), profitRank: $("profitRank"), cacRank: $("cacRank"), funnelFacts: $("funnelFacts"),
  selectedScenarioTitle: $("selectedScenarioTitle"), selectedScenarioCopy: $("selectedScenarioCopy"), readinessReason: $("readinessReason"),
  finalTitle: $("finalTitle"), finalReadiness: $("finalReadiness"), finalMemo: $("finalMemo"), savedPlans: $("savedPlans"), artifactPreview: $("artifactPreview"),
  aiOutput: $("aiOutput"), metricReadiness: $("metricReadiness"), metricCac: $("metricCac"), metricPayback: $("metricPayback"), metricProfit: $("metricProfit"), metricSelected: $("metricSelected"),
  backendStatus: $("backendStatus"), backendDetail: $("backendDetail"), analystSource: $("analystSource"), activeMotionCount: $("activeMotionCount"), workspacePulse: $("workspacePulse"),
  decisionSignal: $("decisionSignal"), cockpitScenario: $("cockpitScenario"), cockpitBestMotion: $("cockpitBestMotion"), cockpitDecision: $("cockpitDecision"), cockpitWarnings: $("cockpitWarnings"),
  viewButtons: Array.from(document.querySelectorAll("[data-view]")), panels: Array.from(document.querySelectorAll("[data-panel]"))
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
  const finalMarkdown = buildFinalPlanMarkdown(buildSnapshot(), formatMoney)
    .replace("local v0.17 preview artifact", "v0.20 premium interface QA artifact")
    .replace("Interpretation, diagnosis, recommendations", "Readiness is profitability-gated. Interpretation, diagnosis, recommendations");

  if (options.controls) {
    renderMotionSelect(els.motionSelect, state, updateMotionActive);
    renderMotionInputs(els.motionInputs, state, updateMotionAssumption);
  }

  renderSummaryMetrics(selectedScenario);
  renderRankedEconomics(base);
  renderMotionTable(els.motionTable, base.motionResults, formatMoney);
  renderScenarioMatrix(scenarios, suggestedScenario);
  renderScenarioPicker(scenarios);
  renderSelection(selectedScenario, suggestedScenario);
  renderDecisionCockpit(selectedScenario, suggestedScenario);
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
  document.querySelectorAll("[data-ai-action]").forEach((button) => button.addEventListener("click", () => runAnalystAction(button.dataset.aiAction)));
  $("savePlan").addEventListener("click", () => { savedPlans = savePlanSnapshot(buildSnapshot()); renderSavedPlans(els.savedPlans, savedPlans, recallSavedPlan); });
  $("copyPlan").addEventListener("click", async () => copyText(els.finalMemo.textContent));
  $("exportPlan").addEventListener("click", () => downloadMarkdown(`${slug(state.plan.company)}-v020-revenue-plan.md`, els.finalMemo.textContent));
}

function wireWorkspaceViews() {
  els.viewButtons.forEach((button) => button.addEventListener("click", () => setActiveView(button.dataset.view)));
}

function setActiveView(view) {
  els.viewButtons.forEach((button) => button.classList.toggle("active", button.dataset.view === view));
  els.panels.forEach((panel) => panel.classList.toggle("active", panel.dataset.panel === view));
}

async function checkBackend() {
  setBackendStatus("Checking API", "Connecting to /api/health...");
  try {
    const response = await fetch("/api/health", { headers: { accept: "application/json" } });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    backend = { available: true, mode: data.analystMode || "deterministic mock" };
    setBackendStatus("API connected", `${data.runtime}. Analyst mode: ${data.analystMode}.`);
    els.analystSource.textContent = "Backend mock connected";
  } catch (error) {
    backend = { available: false, mode: "local fallback" };
    setBackendStatus("API fallback", "Backend route unavailable here. Local deterministic analyst remains available.");
    els.analystSource.textContent = "Local fallback";
  }
}

async function runAnalystAction(action) {
  const payload = buildAiPayload(buildSnapshot(), action);
  els.aiOutput.textContent = "Asking the backend analyst mock...";
  setActiveView("analyst");

  if (backend.available) {
    try {
      const response = await fetch("/api/ai/analyze", {
        method: "POST",
        headers: { "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      els.aiOutput.textContent = formatBackendResponse(await response.json());
      els.analystSource.textContent = "Backend mock response";
      return;
    } catch (error) {
      els.analystSource.textContent = "Local fallback after API error";
    }
  }

  els.aiOutput.textContent = formatMockAiResponse(mockAiResponse(payload, formatMoney));
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

function updateMotionActive(id, active) { const motion = state.motions.find((item) => item.id === id); if (motion) motion.active = active; render({ controls: true }); }
function updateMotionAssumption(id, key, value) { const motion = state.motions.find((item) => item.id === id); if (motion) motion.assumptions[key] = value; render(); }
function selectScenario(id) { state.plan.selectedScenarioId = id; render(); }

function renderSummaryMetrics(selectedScenario) {
  const analysis = selectedScenario.analysis;
  els.metricReadiness.textContent = `${analysis.readinessStatus} (${analysis.readinessScore})`;
  els.metricReadiness.className = analysis.readinessSignal;
  els.metricCac.textContent = formatMoney(analysis.cac);
  els.metricPayback.textContent = `${analysis.payback.toFixed(1)} mo`;
  els.metricProfit.textContent = formatMoney(analysis.profit);
  els.metricProfit.className = analysis.profit >= 0 ? "good" : "bad";
  els.metricSelected.textContent = selectedScenario.name;
  els.activeMotionCount.textContent = String(getActiveMotions(state).length);
}

function renderRankedEconomics(base) {
  const profitRows = [...base.motionResults].sort((a, b) => b.profit - a.profit);
  const cacRows = [...base.motionResults].sort((a, b) => a.cac - b.cac);
  els.profitRank.innerHTML = rankedList(profitRows, (row) => formatMoney(row.profit), "profit");
  els.cacRank.innerHTML = rankedList(cacRows, (row) => formatMoney(row.cac), "cac");
  els.funnelFacts.innerHTML = `
    <div><span>Leads</span><strong>${formatNumber(sum(base.motionResults, "leads"))}</strong></div>
    <div><span>Meetings</span><strong>${formatNumber(sum(base.motionResults, "meetings"))}</strong></div>
    <div><span>Customers</span><strong>${base.customers.toFixed(1)}</strong></div>
  `;
}

function rankedList(rows, valueFn, key) {
  if (!rows.length) return `<p class="quiet-copy">No active motions selected.</p>`;
  return `<ol class="rank-list">${rows.map((row, index) => `
    <li>
      <span class="rank-index">${index + 1}</span>
      <span><strong>${escapeHtml(row.name)}</strong><small>${key === "profit" ? "Net contribution" : "Cost per customer"}</small></span>
      <b class="${row.profit < 0 && key === "profit" ? "bad" : ""}">${valueFn(row)}</b>
    </li>`).join("")}</ol>`;
}

function renderScenarioMatrix(scenarios, suggestedScenario) {
  els.scenarioMatrix.innerHTML = scenarios.map((scenario) => {
    const a = scenario.analysis;
    const active = scenario.id === state.plan.selectedScenarioId;
    const suggested = scenario.id === suggestedScenario.id;
    return `<button class="matrix-row ${active ? "active" : ""}" type="button" data-scenario-id="${scenario.id}">
      <span><strong>${escapeHtml(scenario.name)}</strong>${suggested ? "<em>Suggested</em>" : ""}</span>
      <span>${escapeHtml(a.readinessStatus)} · ${a.readinessScore}/100</span>
      <span>${formatMoney(a.profit)}</span>
      <span>${formatMoney(a.cac)}</span>
      <span>${a.payback.toFixed(1)} mo</span>
    </button>`;
  }).join("");
  els.scenarioMatrix.querySelectorAll("[data-scenario-id]").forEach((button) => button.addEventListener("click", () => selectScenario(button.dataset.scenarioId)));
}

function renderScenarioPicker(scenarios) {
  els.scenarioPicker.innerHTML = scenarios.map((scenario) => `<button class="scenario-button ${scenario.id === state.plan.selectedScenarioId ? "active" : ""}" type="button" data-pick-scenario="${scenario.id}"><strong>${escapeHtml(scenario.name)}</strong><span>${escapeHtml(scenario.analysis.readinessStatus)} · ${scenario.analysis.readinessScore}/100</span></button>`).join("");
  els.scenarioPicker.querySelectorAll("[data-pick-scenario]").forEach((button) => button.addEventListener("click", () => selectScenario(button.dataset.pickScenario)));
}

function renderSelection(selectedScenario, suggestedScenario) {
  const a = selectedScenario.analysis;
  els.selectedScenarioTitle.textContent = selectedScenario.name;
  els.selectedScenarioCopy.textContent = `${a.readinessMessage} Profit: ${formatMoney(a.profit)}. Model-suggested scenario: ${suggestedScenario.name}.`;
  els.readinessReason.textContent = a.readinessGate === "passed_profitability_gate" ? "Profitability gate passed." : "Profitability gate is blocking scale-readiness.";
}

function renderDecisionCockpit(selectedScenario, suggestedScenario) {
  const a = selectedScenario.analysis;
  els.decisionSignal.textContent = a.readinessStatus;
  els.decisionSignal.className = `decision-signal ${a.readinessSignal}`;
  els.cockpitScenario.textContent = selectedScenario.name;
  els.cockpitBestMotion.textContent = a.bestMotion?.name || "No viable motion";
  els.cockpitDecision.textContent = buildDecisionLine(selectedScenario, suggestedScenario);
  els.cockpitWarnings.innerHTML = buildWarnings(a).map((warning) => `<li>${escapeHtml(warning)}</li>`).join("");
}

function buildDecisionLine(selectedScenario, suggestedScenario) {
  const a = selectedScenario.analysis;
  if (a.profit < 0) return "Demand may exist, but economics are not viable yet.";
  if (selectedScenario.id !== suggestedScenario.id) return `Reviewing ${selectedScenario.name}; model currently favors ${suggestedScenario.name}.`;
  if (a.payback > 12) return "Profitable, but payback still needs review.";
  return "Selected plan can be preserved for stakeholder review.";
}

function buildWarnings(a) {
  const warnings = [];
  if (a.allMotionsLossMaking) warnings.push("Every active motion is loss-making.");
  else if (a.profit < 0) warnings.push("Portfolio profit is negative after shared overhead.");
  if (a.profit < 0) warnings.push("Readiness is capped below green until profit is positive.");
  if (a.payback > 12) warnings.push("Payback exceeds a one-year comfort threshold.");
  if (!warnings.length) warnings.push("No critical deterministic warnings in the selected scenario.");
  return warnings;
}

function renderFinal(selectedScenario, finalMarkdown) {
  const a = selectedScenario.analysis;
  els.finalTitle.textContent = `${state.plan.company} - ${selectedScenario.name} decision record`;
  els.finalReadiness.textContent = a.readinessStatus;
  els.finalReadiness.className = `readiness-pill ${a.readinessSignal}`;
  els.finalMemo.textContent = finalMarkdown;
  els.artifactPreview.textContent = finalMarkdown.split("\n").slice(0, 18).join("\n");
}

function renderWorkspacePulse(selectedScenario) {
  const a = selectedScenario.analysis;
  els.workspacePulse.textContent = `${a.readinessStatus} - ${getActiveMotions(state).length} motions - ${selectedScenario.name} selected`;
}

function buildSnapshot() {
  const selectedScenario = state.analysis.selectedScenario;
  return {
    workspace: { ...state.workspace, version: "v0.20", backend: backend.available ? "connected" : "fallback" },
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
  els.company.value = state.plan.company; els.currency.value = state.plan.currency; els.period.value = state.plan.period; els.question.value = state.plan.question;
  els.arpu.value = state.plan.assumptions.arpu; els.margin.value = state.plan.assumptions.margin; els.ltvMonths.value = state.plan.assumptions.ltvMonths; els.sharedCost.value = state.plan.assumptions.sharedCost;
  render({ controls: true });
}

function setBackendStatus(label, detail) { els.backendStatus.textContent = label; els.backendDetail.textContent = detail; }
function formatMoney(value) { return `${state.plan.currency || "$"}${Math.round(Number(value) || 0).toLocaleString()}`; }
function formatNumber(value) { return Math.round(Number(value) || 0).toLocaleString(); }
function sum(rows, key) { return rows.reduce((total, row) => total + (Number(row[key]) || 0), 0); }
function slug(value) { return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "revenue-plan"; }
function structuredCloneSafe(value) { if (window.structuredClone) return window.structuredClone(value); return JSON.parse(JSON.stringify(value)); }
function escapeHtml(value) { return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;"); }
