export function createIncidentRecord(incident) {
  return {
    id: incident.id,

    title: `${incident.service} Incident`,

    service: incident.service,

    severity: incident.severity,

    priority: "P0",

    owner: "Unassigned",

    status: "Investigating",

    environment: incident.environment,

    createdAt: new Date().toLocaleTimeString(),

    timeline: [
      {
        time: new Date().toLocaleTimeString(),
        event: "Incident created",
      },
    ],
  };
}