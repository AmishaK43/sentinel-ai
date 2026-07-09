import { createIncidentRecord } from "./incidentCreator.js";
import { buildIncidentWorkspace } from "../slack/incidentBlocks.js";
import { getLatestCommit } from "../github/githubService.js";
import { buildGithubSummary } from "../slack/githubBlocks.js";

/**
 * Creates the incident workspace
 */
export async function createIncidentWorkflow(client, channelId, incident) {

  // Step 1
  const record = createIncidentRecord(incident);

  // Step 2
  await client.chat.postMessage({

    channel: channelId,

    text: "Incident Created",

    blocks: buildIncidentWorkspace(record),

  });

  return record;

}

/**
 * GitHub Investigation
 * (Implementation tomorrow)
 */
export async function githubWorkflow(client, channelId) {

  const commit = await getLatestCommit();

  await client.chat.postMessage({

    channel: channelId,

    text: "GitHub Investigation",

    blocks: buildGithubSummary(commit),

  });

}

/**
 * Notify Team
 * (Implementation tomorrow)
 */
export async function notifyWorkflow(client, channelId, incident) {

  await client.chat.postMessage({

    channel: channelId,

    text:
      "📢 Notifying responders...\n\nThis will alert the on-call team."

  });

}

/**
 * Timeline
 */
export async function timelineWorkflow(client, channelId, incident) {

  const timeline = incident.timeline
    .map(item => `• ${item.time} — ${item.event}`)
    .join("\n");

  await client.chat.postMessage({

    channel: channelId,

    text:

`📋 Incident Timeline

${timeline}`

  });

}

/**
 * Resolve Incident
 */
export async function resolveWorkflow(client, channelId, incident) {

  await client.chat.postMessage({

    channel: channelId,

    text:

`✅ Incident ${incident.id} has been resolved.

Great work team! 🎉`

  });

}