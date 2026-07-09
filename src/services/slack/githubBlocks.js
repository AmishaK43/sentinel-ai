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
      fields: [

        {
          type: "mrkdwn",
          text: `*Repository*\nAmishaK43/sentinel-ai`,
        },

        {
          type: "mrkdwn",
          text: `*Commit*\n${commit.sha}`,
        },

        {
          type: "mrkdwn",
          text: `*Author*\n${commit.author}`,
        },

        {
          type: "mrkdwn",
          text: `*Date*\n${new Date(commit.date).toLocaleString()}`,
        },

      ],
    },

    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*Latest Commit Message*\n${commit.message}`,
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
`🤖 *Sentinel AI Assessment*

The latest deployment modified the application.

Please review this commit as part of the investigation.

Confidence: *90%*`,
      },
    },

    {
      type: "actions",
      elements: [

        {
          type: "button",
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