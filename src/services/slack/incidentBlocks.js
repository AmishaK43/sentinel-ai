export function buildIncidentWorkspace(record) {
  return [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: "🚨 Incident Created",
      },
    },

    {
      type: "section",
      fields: [
        {
          type: "mrkdwn",
          text: `*Incident ID*\n${record.id}`,
        },
        {
          type: "mrkdwn",
          text: `*Priority*\n🔴 ${record.priority}`,
        },
        {
          type: "mrkdwn",
          text: `*Service*\n${record.service}`,
        },
        {
          type: "mrkdwn",
          text: `*Status*\n🟠 ${record.status}`,
        },
        {
          type: "mrkdwn",
          text: `*Environment*\n${record.environment}`,
        },
        {
          type: "mrkdwn",
          text: `*Owner*\n${record.owner}`,
        },
      ],
    },

    {
      type: "divider",
    },

    {
      type: "section",
      text: {
        type: "mrkdwn",
        text:
          "🤖 *Sentinel AI has created an incident workspace.*\n" +
          "Choose the next action to continue the investigation.",
      },
    },

    {
      type: "actions",
      elements: [
        {
          type: "button",
          action_id: "github_check",
          text: {
            type: "plain_text",
            text: "📂 Check GitHub",
          },
        },

        {
          type: "button",
          action_id: "notify_team",
          text: {
            type: "plain_text",
            text: "📢 Notify Team",
          },
        },

        {
          type: "button",
          action_id: "timeline",
          text: {
            type: "plain_text",
            text: "📋 Timeline",
          },
        },

        {
          type: "button",
          style: "primary",
          action_id: "resolve_incident",
          text: {
            type: "plain_text",
            text: "✅ Resolve",
          },
        },
      ],
    },

    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: "🧠 Powered by Sentinel AI • Autonomous Incident Commander",
        },
      ],
    },
  ];
}