export function createIncidentRecord(incident) {

  let priority = "P2";

  switch ((incident.severity || "").toUpperCase()) {

    case "CRITICAL":
      priority = "P0";
      break;

    case "HIGH":
      priority = "P1";
      break;

    case "MEDIUM":
      priority = "P2";
      break;

    case "LOW":
      priority = "P3";
      break;

    default:
      priority = "P2";
  }

  return {
    id: incident.id,

    title: `${incident.service} Incident`,

    service: incident.service,

    severity: incident.severity,

    priority,

    owner: incident.owner || "Unassigned",

    status: "Investigating",

    environment: incident.environment,

    createdAt: new Date(),

    timeline: incident.timeline || [],
  };
}