const STORAGE_KEY = "ev_prod_001_v16_plans";

export function loadSavedPlans() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function savePlanSnapshot(snapshot) {
  const saved = loadSavedPlans();
  saved.unshift({ ...snapshot, savedAt: new Date().toISOString() });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(saved.slice(0, 10)));
  return loadSavedPlans();
}
