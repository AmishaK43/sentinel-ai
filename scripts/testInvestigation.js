import { generateInvestigationSummary } from "../src/services/ai/investigationAgent.js";

const incident = {
  service: "Payment API",
  environment: "Production",
  deployment: "Yes",
  customerImpact: "Yes",
  severity: "HIGH",
};

const result = await generateInvestigationSummary(incident);

console.log(result);