import { askGroq } from "./groqService.js";

export async function detectIncident(userMessage) {
  const prompt = `
You are Sentinel AI, an expert Site Reliability Engineer (SRE).

Your job is to determine whether a Slack message describes a REAL software or infrastructure incident.

Return ONLY valid JSON.

Schema:

{
  "isIncident": boolean,
  "severity": "NONE | LOW | MEDIUM | HIGH | CRITICAL",
  "service": "service name or empty string",
  "reason": "short explanation"
}

Treat these as incidents:

- API failures
- HTTP 500 errors
- HTTP 503
- Database failures
- Login failures
- Payment failures
- Production outages
- Timeouts
- Deployment failures
- Kubernetes problems
- Crash loops
- High latency
- Service unavailable
- Memory leaks
- CPU spikes
- Disk full

Treat these as NOT incidents:

- hello
- hi
- hey
- good morning
- good afternoon
- thanks
- thank you
- who are you
- help
- how are you
- random conversation
- jokes
- greetings

If the message is NOT an incident return:

{
  "isIncident": false,
  "severity": "NONE",
  "service": "",
  "reason": "This is not an incident."
}

Slack Message:
${userMessage}

IMPORTANT:
Return ONLY the JSON object.
Do NOT wrap it inside \`\`\`json.
Do NOT add explanations.
`;

  const result = await askGroq([
    {
      role: "user",
      content: prompt,
    },
  ]);

  console.log("===== GROQ RESPONSE =====");
  console.log(result);
  console.log("=========================");

  // Clean the response in case the model returns markdown
  let cleaned = result.trim();

  cleaned = cleaned
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  console.log("===== CLEANED RESPONSE =====");
  console.log(cleaned);
  console.log("============================");

  try {
    return JSON.parse(cleaned);
  } catch (error) {
    console.error("❌ Invalid JSON returned by Groq:");
    console.error(cleaned);

    // Fallback response so the Slack app never crashes
    return {
      isIncident: false,
      severity: "NONE",
      service: "",
      reason: "Unable to parse AI response."
    };
  }
}
