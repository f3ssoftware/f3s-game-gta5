/**
 * F3S editorial picks for GTA RP / FiveM-style servers.
 * Extend slugs when wiring a live directory API.
 */
export const RECOMMENDED_GTA_RP_SERVER_SLUGS = [
  "nopixel",
  "prodigy-rp",
  "escape-rp",
  "gtaw-roleplay",
  "majestic-rp",
  "grand-rp",
] as const;

export type RecommendedGtaRpServerSlug =
  (typeof RECOMMENDED_GTA_RP_SERVER_SLUGS)[number];
