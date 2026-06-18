export const motionDefinitions = [
  {
    id: "outbound",
    name: "Outbound",
    description: "Prospecting-led sales motion with people, tools, lead volume, and conversion assumptions.",
    active: true,
    assumptions: { cost: 14500, leads: 2400, meetingRate: 2.6, winRate: 18 }
  },
  {
    id: "inbound",
    name: "Inbound",
    description: "Demand capture motion using inbound lead flow and sales qualification.",
    active: true,
    assumptions: { cost: 6500, leads: 850, meetingRate: 7, winRate: 22 }
  },
  {
    id: "paid",
    name: "Paid Acquisition",
    description: "Spend-led acquisition motion that converts paid demand into customers.",
    active: true,
    assumptions: { cost: 9000, leads: 1300, meetingRate: 3.8, winRate: 16 }
  },
  {
    id: "partner",
    name: "Partner / Referral",
    description: "Lower-cost partner or referral motion with smaller volume and stronger intent.",
    active: true,
    assumptions: { cost: 3000, leads: 250, meetingRate: 12, winRate: 28 }
  }
];

export const scenarioDefinitions = [
  { id: "conservative", name: "Conservative", multiplier: 0.75 },
  { id: "base", name: "Base", multiplier: 1 },
  { id: "aggressive", name: "Aggressive", multiplier: 1.25 }
];

export function createInitialState() {
  return {
    workspace: {
      id: "workspace-local",
      name: "Local planning workspace",
      owner: "Current user",
      createdAt: new Date().toISOString()
    },
    plan: {
      id: `plan-${Date.now()}`,
      version: "0.16.0",
      company: "Acme Growth Co.",
      currency: "$",
      period: "Monthly",
      question: "Which revenue motion should we scale, fix, or pause before adding more budget?",
      assumptions: {
        arpu: 250,
        margin: 75,
        ltvMonths: 18,
        sharedCost: 5500
      },
      selectedScenarioId: "base"
    },
    motions: motionDefinitions.map((motion) => ({
      id: motion.id,
      name: motion.name,
      description: motion.description,
      active: motion.active,
      assumptions: { ...motion.assumptions }
    })),
    analysis: null,
    analyst: {
      lastAction: null,
      output: "Review the calculated economics, select a scenario, then ask the analyst for interpretation."
    }
  };
}

export function getActiveMotions(state) {
  return state.motions.filter((motion) => motion.active);
}

export function getSelectedScenario(state) {
  return scenarioDefinitions.find((scenario) => scenario.id === state.plan.selectedScenarioId) || scenarioDefinitions[1];
}
