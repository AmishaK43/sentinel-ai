// In-memory Incident Store
// Later we'll replace this with Supabase

const incidents = new Map();

/**
 * Create a new incident
 */
export function createIncident(channelId, incidentData) {
  const incident = {
    id: `INC-${Date.now()}`,

    ...incidentData,

    status: "NEW",
    currentStep: "NONE",

    environment: null,
    deployment: null,
    customerImpact: null,

    timeline: [],

    createdAt: new Date(),
  };

  incidents.set(channelId, incident);

  return incident;
}

/**
 * Get incident by Slack channel
 */
export function getIncident(channelId) {
  return incidents.get(channelId);
}

/**
 * Update incident
 */
export function updateIncident(channelId, updates) {
  const incident = incidents.get(channelId);

  if (!incident) return null;

  Object.assign(incident, updates);

  incidents.set(channelId, incident);

  return incident;
}

/**
 * Add timeline event
 */
export function addTimeline(channelId, event) {
  const incident = incidents.get(channelId);

  if (!incident) return;

  incident.timeline.push({
    event,
    timestamp: new Date(),
  });

  incidents.set(channelId, incident);
}

/**
 * Delete incident
 */
export function deleteIncident(channelId) {
  incidents.delete(channelId);
}

/**
 * Get all incidents (Useful later for dashboard)
 */
export function getAllIncidents() {
  return [...incidents.values()];
}