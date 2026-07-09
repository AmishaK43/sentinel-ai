export function buildIncidentCard(incident) {
  return [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: "🚨 Incident Detected"
      }
    },
    {
      type: "section",
      fields: [
        {
          type: "mrkdwn",
          text: `*Service:*\n${incident.service}`
        },
        {
          type: "mrkdwn",
          text: `*Severity:*\n${incident.severity}`
        }
      ]
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*Reason:*\n${incident.reason}`
      }
    },
    {
      type: "actions",
      elements: [
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "🔍 Investigate"
          },
          action_id: "investigate"
        },
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "📄 Create Incident"
          },
          action_id: "create_incident",
          style: "primary"
        },
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "❌ Ignore"
          },
          action_id: "ignore",
          style: "danger"
        }
      ]
    }
  ];
}