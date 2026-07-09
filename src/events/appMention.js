import { detectIncident } from "../services/ai/detectionAgent.js";
import { buildIncidentCard } from "../services/slack/blockBuilder.js";
import { createIncident } from "../services/incident/incidentManager.js";

export default function registerAppMention(app) {
  app.event("app_mention", async ({ event, say }) => {
    try {
      // Remove the bot mention from the message
      const userMessage = event.text.replace(/<@[^>]+>/g, "").trim();

      console.log("User Message:", userMessage);

      // Analyze the message using AI
      const incident = await detectIncident(userMessage);

      console.log("AI Result:", incident);

      if (incident.isIncident) {

        // ✅ Save the incident
        createIncident(event.channel, incident);

        await say({
          text: "🚨 Incident Detected",
          blocks: buildIncidentCard(incident),
        });

      } else {

        await say(
          `👋 Hello <@${event.user}>! I don't think this is an incident.\n\nHow can I help you today?`
        );

      }

    } catch (error) {

      console.error("App Mention Error:", error);

      await say(
        "⚠️ Sorry, I couldn't analyze this message. Please try again."
      );

    }
  });
}