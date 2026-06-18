import { scenarioBars } from "./charts.js";

export function renderMotionSelect(container, state, onToggle) {
  container.innerHTML = state.motions.map((motion) => `
    <label class="motion-option ${motion.active ? "active" : ""}">
      <span><input type="checkbox" data-motion-toggle="${motion.id}" ${motion.active ? "checked" : ""} />${escapeHtml(motion.name)}</span>
      <p>${escapeHtml(motion.description)}</p>
    </label>
  `).join("");

  container.querySelectorAll("[data-motion-toggle]").forEach((input) => {
    input.addEventListener("change", () => onToggle(input.dataset.motionToggle, input.checked));
  });
}

export function renderMotionInputs(container, state, onInput) {
  const activeMotions = state.motions.filter((motion) => motion.active);
  container.innerHTML = activeMotions.map((motion) => `
    <article class="motion-card">
      <div class="motion-card-head">
        <div>
          <h3>${escapeHtml(motion.name)}</h3>
          <p>${escapeHtml(motion.description)}</p>
        </div>
      </div>
      <div class="form-grid">
        ${motionInput(motion, "cost", "Monthly cost")}
        ${motionInput(motion, "leads", "Leads")}
        ${motionInput(motion, "meetingRate", "Lead to meeting %")}
        ${motionInput(motion, "winRate", "Meeting to customer %")}
      </div>
    </article>
  `).join("") || `<div class="panel"><p>Select at least one acquisition motion to continue.</p></div>`;

  container.querySelectorAll("[data-motion-input]").forEach((input) => {
    input.addEventListener("input", () => {
      onInput(input.dataset.motionId, input.dataset.motionInput, Number(input.value) || 0);
    });
  });
}

export function renderScenarioCards(container, scenarios, suggestedScenario, formatMoney) {
  container.innerHTML = scenarios.map((scenario) => {
    const isBest = scenario.id === suggestedScenario.id;
    return `
      <article class="scenario-card ${isBest ? "best" : ""}">
        <h3>${escapeHtml(scenario.name)}${isBest ? " · Suggested" : ""}</h3>
        <p>${readinessLabel(scenario.analysis.readinessSignal)} readiness · ${scenario.analysis.readinessScore}/100 score</p>
        <div class="scenario-score"><div style="width:${scenario.analysis.readinessScore}%"></div></div>
        ${scenarioBars(scenario, formatMoney)}
      </article>
    `;
  }).join("");
}

export function renderScenarioPicker(container, scenarios, selectedScenarioId, onSelect) {
  container.innerHTML = scenarios.map((scenario) => `
    <button class="scenario-button ${scenario.id === selectedScenarioId ? "active" : ""}" data-scenario-id="${scenario.id}" type="button">
      <strong>${escapeHtml(scenario.name)}</strong>
      <span>${readinessLabel(scenario.analysis.readinessSignal)} · ${scenario.analysis.readinessScore}/100</span>
    </button>
  `).join("");

  container.querySelectorAll("[data-scenario-id]").forEach((button) => {
    button.addEventListener("click", () => onSelect(button.dataset.scenarioId));
  });
}

export function renderMotionTable(container, motionResults, formatMoney) {
  container.innerHTML = motionResults.map((motion) => `
    <tr>
      <td><strong>${escapeHtml(motion.name)}</strong></td>
      <td>${motion.customers.toFixed(1)}</td>
      <td>${formatMoney(motion.cac)}</td>
      <td class="${motion.profit >= 0 ? "good" : "bad"}">${formatMoney(motion.profit)}</td>
    </tr>
  `).join("");
}

export function renderSavedPlans(container, savedPlans, onRecall) {
  if (!savedPlans.length) {
    container.innerHTML = `<p>No saved plans yet.</p>`;
    return;
  }

  container.innerHTML = `<div class="saved-list">${savedPlans.map((plan, index) => `
    <div class="saved-item">
      <strong>${escapeHtml(plan.plan.company)}</strong>
      <p>${escapeHtml(plan.selectedScenario.name)} · ${new Date(plan.savedAt).toLocaleString()}</p>
      <button class="button secondary" type="button" data-saved-index="${index}">Recall</button>
    </div>
  `).join("")}</div>`;

  container.querySelectorAll("[data-saved-index]").forEach((button) => {
    button.addEventListener("click", () => onRecall(Number(button.dataset.savedIndex)));
  });
}

export function readinessLabel(signal) {
  if (signal === "green") return "Green";
  if (signal === "yellow") return "Yellow";
  return "Red";
}

function motionInput(motion, key, label) {
  return `
    <label>${label}
      <input type="number" min="0" data-motion-id="${motion.id}" data-motion-input="${key}" value="${motion.assumptions[key]}" />
    </label>
  `;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
