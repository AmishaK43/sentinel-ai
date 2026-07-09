import { createIncidentRecord } from "./incidentCreator.js";
import { updateIncident, addTimeline } from "./incidentManager.js";
import { buildIncidentWorkspace } from "../slack/incidentBlocks.js";
import { getRecentCommits } from "../github/githubService.js";
import { buildGithubSummary } from "../slack/githubBlocks.js";
import { buildNotificationBlock } from "../slack/notificationBlocks.js";
import { buildTimelineBlocks } from "../slack/timelineBlocks.js";

/**
 * Creates the incident workspace
 */
export async function createIncidentWorkflow(client, channelId, incident) {

  // Step 1
  const record = createIncidentRecord(incident);
  updateIncident(channelId, record);
  addTimeline(channelId, "🚨 Incident Workspace Created");
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

  const commits = await getRecentCommits();

  console.log("GitHub Commits:", commits);

  const latestCommit = commits[0];

  console.log("Latest Commit:", latestCommit);
  addTimeline(channelId, "📂 GitHub Investigation Completed");

  await client.chat.postMessage({

    channel: channelId,

    text: "GitHub Investigation",

    blocks: buildGithubSummary(latestCommit),

  });

}

/**
 * Notify Team
 * (Implementation tomorrow)
 */
export async function notifyWorkflow(client, channelId, incident) {
  addTimeline(channelId, "📢 Team Notified");
  await client.chat.postMessage({

    channel: channelId,

    text: "Incident Alert",

    blocks: buildNotificationBlock(incident),

  });

}

/**
 * Timeline
 */
export async function timelineWorkflow(client, channelId, incident) {
  console.log("Timeline Data:");
  console.log(incident.timeline);
  await client.chat.postMessage({

    channel: channelId,

    text: "Incident Timeline",

    blocks: buildTimelineBlocks(incident),

  });

}

/**
 * Resolve Incident
 */
export async function resolveWorkflow(client, channelId, incident) {
  addTimeline(channelId, "✅ Incident Resolved");
  await client.chat.postMessage({

    channel: channelId,

    text:

`✅ Incident ${incident.id} has been resolved.

Great work team! 🎉`

  });

}