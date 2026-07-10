import {
  updateIncident,
  addTimeline,
  getIncident,
} from "../services/incident/incidentManager.js";

import {
  createIncidentWorkflow,
  githubWorkflow,
  notifyWorkflow,
  timelineWorkflow,
  resolveWorkflow,
} from "../services/incident/workflowEngine.js";

import { generateInvestigationSummary } from "../services/ai/investigationAgent.js";
import { buildInvestigationSummary } from "../services/slack/investigationBlocks.js";
import { generatePostmortem } from "../services/ai/postmortemAgent.js";
import { buildPostmortemBlocks } from "../services/slack/postmortemBlocks.js";

export default function registerButtons(app) {

  /*
   * ==========================================================
   * Investigate Button
   * ==========================================================
   */

  app.action("investigate", async ({ ack, body, client }) => {

    await ack();

    const channelId = body.channel.id;

    updateIncident(channelId, {
      status: "INVESTIGATING",
      currentStep: "ENVIRONMENT",
    });

    addTimeline(
        channelId,
        "🔍 Investigation Started"
    );


    await client.chat.postMessage({
      channel: channelId,
      text: "Investigation started",
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "*🔍 Investigation Started*\n\nWhich environment is affected?",
          },
        },
        {
          type: "actions",
          elements: [
            {
              type: "button",
              text: {
                type: "plain_text",
                text: "🟢 Production",
              },
              action_id: "env_prod",
            },
            {
              type: "button",
              text: {
                type: "plain_text",
                text: "🟡 Staging",
              },
              action_id: "env_stage",
            },
            {
              type: "button",
              text: {
                type: "plain_text",
                text: "🔵 Development",
              },
              action_id: "env_dev",
            },
          ],
        },
      ],
    });

  });

  /*
   * ==========================================================
   * Production Selected
   * ==========================================================
   */

  app.action("env_prod", async ({ ack, body, client }) => {

    await ack();

    const channelId = body.channel.id;

    updateIncident(channelId, {
      environment: "Production",
      currentStep: "DEPLOYMENT",
    });
    addTimeline(
    channelId,
    "🌍 Environment: Production"
    );

    

    await client.chat.postMessage({
      channel: channelId,
      text: "Was there a deployment recently?",
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "*Was there a deployment recently?*",
          },
        },
        {
          type: "actions",
          elements: [
            {
              type: "button",
              text: {
                type: "plain_text",
                text: "✅ Yes",
              },
              action_id: "deploy_yes",
            },
            {
              type: "button",
              text: {
                type: "plain_text",
                text: "❌ No",
              },
              action_id: "deploy_no",
            },
            {
              type: "button",
              text: {
                type: "plain_text",
                text: "🤷 Don't Know",
              },
              action_id: "deploy_unknown",
            },
          ],
        },
      ],
    });

  });

  /*
   * ==========================================================
   * Deployment = YES
   * ==========================================================
   */

  app.action("deploy_yes", async ({ ack, body, client }) => {

    await ack();

    const channelId = body.channel.id;

    updateIncident(channelId, {
      deployment: "Yes",
      currentStep: "CUSTOMER_IMPACT",
    });
    addTimeline(
    channelId,
    "🚀 Recent Deployment Confirmed"
    );
    

    await client.chat.postMessage({
      channel: channelId,
      text: "Are customers currently affected?",
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "*Are customers currently affected?*",
          },
        },
        {
          type: "actions",
          elements: [
            {
              type: "button",
              text: {
                type: "plain_text",
                text: "✅ Yes",
              },
              action_id: "impact_yes",
            },
            {
              type: "button",
              text: {
                type: "plain_text",
                text: "❌ No",
              },
              action_id: "impact_no",
            },
          ],
        },
      ],
    });

  });

  /*
   * ==========================================================
   * Customer Impact = YES
   * ==========================================================
   */

  app.action("impact_yes", async ({ ack, body, client }) => {

    await ack();

    const channelId = body.channel.id;

    updateIncident(channelId, {
      customerImpact: "Yes",
      status: "INVESTIGATING",
      currentStep: "AI_ANALYSIS",
    });

    addTimeline(channelId, "👥 Customer Impact Confirmed");

    const incident = getIncident(channelId);

    if (!incident) {
      await client.chat.postMessage({
        channel: channelId,
        text: "❌ Incident not found.",
      });
      return;
    }

    const summary = await generateInvestigationSummary(incident);
    addTimeline(
    channelId,
    "🧠 AI Investigation Completed"
    );

    

    await client.chat.postMessage({
      channel: channelId,
      text: "AI Investigation Summary",
      blocks: buildInvestigationSummary(summary),
    });

  });

  /*
   * ==========================================================
   * Create Incident
   * ==========================================================
   */

  app.action("create_incident", async ({ ack, body, client }) => {

    await ack();

    const channelId = body.channel.id;

    const incident = getIncident(channelId);

    if (!incident) {
      await client.chat.postMessage({
        channel: channelId,
        text: "❌ Incident not found.",
      });
      return;
    }

    await createIncidentWorkflow(client, channelId, incident);

    

  });

  /*
   * ==========================================================
   * GitHub Investigation
   * ==========================================================
   */

  app.action("github_check", async ({ ack, body, client }) => {

    await ack();

    const channelId = body.channel.id;

    await githubWorkflow(client, channelId);

    

  });

  /*
   * ==========================================================
   * Notify Team
   * ==========================================================
   */

  app.action("notify_team", async ({ ack, body, client }) => {

    await ack();

    const channelId = body.channel.id;

    const incident = getIncident(channelId);

    if (!incident) {
      await client.chat.postMessage({
        channel: channelId,
        text: "❌ Incident not found.",
      });
      return;
    }

    await notifyWorkflow(client, channelId, incident);

    

  });

  app.action("timeline", async ({ ack, body, client }) => {

    await ack();

    const channelId = body.channel.id;

    const incident = getIncident(channelId);

    if (!incident) {

      await client.chat.postMessage({

        channel: channelId,

        text: "❌ Incident not found.",

      });

      return;

    }

    await timelineWorkflow(

      client,
      channelId,
      incident

    );

  });

  app.action("resolve_incident", async ({ ack, body, client }) => {

    await ack();

    const channelId = body.channel.id;

    const incident = getIncident(channelId);

    if (!incident) {

      await client.chat.postMessage({
        channel: channelId,
        text: "❌ Incident not found.",
      });

      return;

    }

    await resolveWorkflow(
      client,
      channelId,
      incident
    );

  });

  app.action("generate_postmortem", async ({ ack, body, client }) => {

    await ack();

    const channelId = body.channel.id;

    const incident = getIncident(channelId);

    if (!incident) {

      await client.chat.postMessage({
        channel: channelId,
        text: "❌ Incident not found.",
      });

      return;
    }

    // Show loading message
    await client.chat.postMessage({
      channel: channelId,
      text: "🤖 Sentinel AI is generating the postmortem...",
    });

    try {

      const report = await generatePostmortem(incident);

      await client.chat.postMessage({

        channel: channelId,

        text: "AI Incident Postmortem",

        blocks: buildPostmortemBlocks(report),

      });

    } catch (error) {

      console.error(error);

      await client.chat.postMessage({

        channel: channelId,

        text: "❌ Failed to generate postmortem.",

      });

    }

  });
}