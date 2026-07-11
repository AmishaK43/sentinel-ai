export function buildPostmortemBlocks(report) {

  return [

    {
      type: "header",
      text: {
        type: "plain_text",
        text: "📝 AI Incident Postmortem",
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

    {
      type: "divider",
    },

    {
      type: "section",
      text: {
        type: "mrkdwn",
        text:
`📊 *Executive Summary*

${report.summary}`,
      },
    },

    {
      type: "section",
      text: {
        type: "mrkdwn",
        text:
`🧩 *Root Cause*

${report.rootCause}`,
      },
    },

    {
      type: "section",
      text: {
        type: "mrkdwn",
        text:
`⚠️ *Business Impact*

${report.impact}`,
      },
    },

    {
      type: "section",
      text: {
        type: "mrkdwn",
        text:
`✅ *Resolution*

${report.resolution}`,
      },
    },

    {
      type: "divider",
    },

    {
      type: "section",
      text: {
        type: "mrkdwn",
        text:
`📚 *Lessons Learned*

• ${report.lessonsLearned.join("\n• ")}`,
      },
    },

    {
      type: "section",
      text: {
        type: "mrkdwn",
        text:
`📌 *Action Items*

• ${report.actionItems.join("\n• ")}`,
      },
    },

    {
      type: "divider",
    },

    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text:
            "💡 This report was generated using AI and should be reviewed by the engineering team.",
        },
      ],
    },

  ];

}