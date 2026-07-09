import { detectIncident } from "../src/services/ai/detectionAgent.js";

const result = await detectIncident(
  "Payment API is returning HTTP 500 errors after deployment."
);

console.log(result);