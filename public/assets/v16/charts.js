export function renderBarChart(container, rows, options = {}) {
  const max = Math.max(1, ...rows.map((row) => Math.abs(row.value)));
  container.innerHTML = `<div class="chart-rows">${rows.map((row) => {
    const width = Math.max(3, Math.min(100, (Math.abs(row.value) / max) * 100));
    const tone = row.tone ? ` ${row.tone}` : "";
    return `
      <div class="chart-row">
        <div class="chart-label">${escapeHtml(row.label)}</div>
        <div class="track"><div class="fill${tone}" style="width:${width}%"></div></div>
        <div class="chart-value">${escapeHtml(row.display)}</div>
      </div>
    `;
  }).join("")}</div>`;

  if (!rows.length) {
    container.innerHTML = `<p class="note">${options.empty || "No active motions selected."}</p>`;
  }
}

export function renderFunnel(container, stages) {
  const max = Math.max(1, ...stages.map((stage) => stage.value));
  container.innerHTML = `<div class="funnel-stack">${stages.map((stage) => {
    const width = Math.max(18, Math.min(100, (stage.value / max) * 100));
    return `<div class="funnel-stage" style="width:${width}%;margin-left:auto;margin-right:auto">${escapeHtml(stage.label)} · ${escapeHtml(stage.display)}</div>`;
  }).join("")}</div>`;
}

export function scenarioBars(scenario, formatMoney) {
  const analysis = scenario.analysis;
  return `
    <div class="chart-rows">
      ${miniBar("Customers", analysis.customers, 40, analysis.customers.toFixed(1), "blue")}
      ${miniBar("Profit", Math.abs(analysis.profit), 25000, formatMoney(analysis.profit), analysis.profit >= 0 ? "green" : "red")}
      ${miniBar("Payback", Math.max(0, 18 - analysis.payback), 18, `${analysis.payback.toFixed(1)} mo`, "")}
    </div>
  `;
}

function miniBar(label, value, max, display, tone) {
  const width = Math.max(3, Math.min(100, max ? (value / max) * 100 : 0));
  return `
    <div class="chart-row">
      <div class="chart-label">${label}</div>
      <div class="track"><div class="fill ${tone}" style="width:${width}%"></div></div>
      <div class="chart-value">${display}</div>
    </div>
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
