export function createIncidentRecord(incident) {
  return {
    id: incident.id,

    title: `${incident.service} Incident`,

    service: incident.service,

    severity: incident.severity,

    priority: "P0",

    // Auto assigned owner
    owner: incident.owner || "Unassigned",

    status: "Investigating",

    environment: incident.environment,

    createdAt: new Date(),

    timeline: incident.timeline || [],
  };
}