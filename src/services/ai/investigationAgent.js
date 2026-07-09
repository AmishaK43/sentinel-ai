import { askGroq } from "./groqService.js";

export async function generateInvestigationSummary(incident) {
  const prompt = `
You are Sentinel AI, an expert Site Reliability Engineer.

Analyze this incident.

Incident:

Service: ${incident.service}
Environment: ${incident.environment}
Deployment: ${incident.deployment}
Customer Impact: ${incident.customerImpact}
Severity: ${incident.severity}

Return ONLY valid JSON.

{
  "rootCause":"",
  "analysis":"",
  "businessImpact":"",
  "priority":"",
  "recommendedActions":[]
}
`;

  const result = await askGroq([
    {
      role: "user",
      content: prompt,
    },
  ]);

  const cleaned = result
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleaned);
}