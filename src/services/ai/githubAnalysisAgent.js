import { askGroq } from "./groqService.js";

export async function analyzeGithubCommits(commits, incident) {

  const prompt = `
You are an expert Site Reliability Engineer.

A production incident occurred.

Service:
${incident.service}

Severity:
${incident.severity}

Reason:
${incident.reason}

Recent GitHub commits:

${JSON.stringify(commits,null,2)}

Determine:

- Which commit is most suspicious
- Why
- Confidence (0-100)
- Recommended next action

Return ONLY JSON.

{
 "mostSuspiciousCommit":"",
 "reason":"",
 "confidence":"",
 "recommendation":""
}
`;

  const response = await askGroq([
    {
      role:"user",
      content:prompt
    }
  ]);

  const cleaned = response
    .replace(/```json/gi,"")
    .replace(/```/g,"")
    .trim();

  return JSON.parse(cleaned);

}