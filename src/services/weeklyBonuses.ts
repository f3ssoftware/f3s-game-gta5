import type { GtaWeeklyBonusesPayload } from "../types";
import { GTA_WEEKLY_BONUSES_FIXTURE } from "../fixtures/data";

/**
 * Domain service — swap implementation for Rockstar Newswire scrape or partner API.
 */
export async function getGtaWeeklyBonuses(): Promise<GtaWeeklyBonusesPayload> {
  return { ...GTA_WEEKLY_BONUSES_FIXTURE, updatedAt: new Date().toISOString() };
}
