export function buildNotificationBlock(incident) {
  return [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: "🚨 Incident Alert",
      },
    },

    {
      type: "section",
      fields: [
        {
          type: "mrkdwn",
          text: `*Incident ID*\n${incident.id}`,
        },
        {
          type: "mrkdwn",
          text: `*Priority*\n🔴 ${incident.priority}`,
        },
        {
          type: "mrkdwn",
          text: `*Service*\n${incident.service}`,
        },
        {
          type: "mrkdwn",
          text: `*Environment*\n${incident.environment}`,
        },
        {
          type: "mrkdwn",
          text: `*Status*\n🟠 ${incident.status}`,
        },
        {
          type: "mrkdwn",
          text: `*Owner*\n${incident.owner}`,
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
          "📢 *Sentinel AI recommends immediate investigation.*\n\n" +
          "The latest deployment should be reviewed and rollback considered if customer impact continues.",
      },
    },

    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: "🤖 Generated automatically by Sentinel AI",
        },
      ],
    },
  ];
}