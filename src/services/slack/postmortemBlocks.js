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
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*Summary*\n${report.summary}`,
      },
    },

    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*Root Cause*\n${report.rootCause}`,
      },
    },

    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*Business Impact*\n${report.impact}`,
      },
    },

    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*Resolution*\n${report.resolution}`,
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
          "*📚 Lessons Learned*\n• " +
          report.lessonsLearned.join("\n• "),
      },
    },

    {
      type: "section",
      text: {
        type: "mrkdwn",
        text:
          "*✅ Action Items*\n• " +
          report.actionItems.join("\n• "),
      },
    },

  ];

}