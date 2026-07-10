import { askGroq } from "./groqService.js";
import { POSTMORTEM_PROMPT } from "../../prompts/postmortemPrompt.js";

export async function generatePostmortem(incident) {

  const messages = [

    {
      role: "system",
      content: POSTMORTEM_PROMPT,
    },

    {
      role: "user",
      content: `
Service: ${incident.service}
Severity: ${incident.severity}
Environment: ${incident.environment}
Deployment: ${incident.deployment}
Customer Impact: ${incident.customerImpact}
Status: ${incident.status}

Timeline:

${incident.timeline
  .map(item => `- ${item.event}`)
  .join("\n")}
`,
    },

  ];

  const result = await askGroq(messages);

  console.log("===== POSTMORTEM RESPONSE =====");
  console.log(result);

  let cleaned = result
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  try {

    return JSON.parse(cleaned);

  } catch {

    return {

      summary: "Unable to generate summary.",

      rootCause: "Unknown",

      impact: "Unknown",

      resolution: "Unknown",

      lessonsLearned: [],

      actionItems: [],

    };

  }

}