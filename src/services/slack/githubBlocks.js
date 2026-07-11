export function buildGithubSummary(commit) {

  return [

    {
      type: "header",
      text: {
        type: "plain_text",
        text: "📂 GitHub Investigation",
      },
    },

    {
      type: "section",
      text: {
        type: "mrkdwn",
        text:
`🤖 *Sentinel AI analyzed the latest repository activity.*

The latest deployment may be related to the current incident.`,
      },
    },

    {
      type: "divider",
    },

    {
      type: "section",
      fields: [

        {
          type: "mrkdwn",
          text: `📦 *Repository*\nAmishaK43/sentinel-ai`,
        },

        {
          type: "mrkdwn",
          text: `📝 *Commit*\n\`${commit.sha}\``,
        },

        {
          type: "mrkdwn",
          text: `👤 *Author*\n${commit.author}`,
        },

        {
          type: "mrkdwn",
          text: `🕒 *Commit Time*\n${new Date(commit.date).toLocaleString()}`,
        },

      ],
    },

    {
      type: "section",
      text: {
        type: "mrkdwn",
        text:
`📌 *Latest Commit Message*

${commit.message}`,
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
`### 🤖 AI Assessment

• Recent deployment detected

• Deployment timing overlaps with incident

• Recommend reviewing this commit before rollback

• Confidence: *90%*`,
      },
    },

    {
      type: "actions",
      elements: [

        {
          type: "button",
          style: "primary",
          text: {
            type: "plain_text",
            text: "🔗 Open Commit",
          },
          url: commit.url,
        },

      ],
    },

  ];

}