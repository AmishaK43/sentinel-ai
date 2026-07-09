export function buildTimelineBlocks(incident) {

  const events = incident.timeline.map(item => {

    const time = new Date(item.timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    return {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*${time}*\n${item.event}`,
      },
    };

  });

  return [

    {
      type: "header",
      text: {
        type: "plain_text",
        text: "📋 Incident Timeline",
      },
    },

    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: `Incident: *${incident.id}*`,
        },
      ],
    },

    {
      type: "divider",
    },

    ...events,

  ];

}