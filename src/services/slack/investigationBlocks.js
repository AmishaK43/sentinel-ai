export function buildInvestigationSummary(summary) {
  return [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: "🧠 AI Investigation Summary",
      },
    },

    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*🔍 Likely Root Cause*\n${summary.rootCause}`,
      },
    },

    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*📊 Analysis*\n${summary.analysis}`,
      },
    },

    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*💼 Business Impact*\n${summary.businessImpact}`,
      },
    },

    {
      type: "section",
      text: {
        type: "mrkdwn",
        text:
          "*✅ Recommended Actions*\n• " +
          summary.recommendedActions.join("\n• "),
      },
    },

    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: `🚨 Priority: *${summary.priority}*`,
        },
      ],
    },

    {
      type: "divider",
    },

    {
      type: "actions",
      elements: [
        {
          type: "button",
          style: "primary",
          action_id: "create_incident",
          text: {
            type: "plain_text",
            text: "🚨 Create Incident",
          },
        },
      ],
    },
  ];
}