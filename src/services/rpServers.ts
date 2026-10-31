import type { GtaRpServerEntry } from "../types";
import { GTA_RP_SERVERS_FIXTURE } from "../fixtures/data";

/**
 * Domain service — replace with FiveM / Cfx.re list proxy when ready.
 */
export async function getGtaRpServers(): Promise<GtaRpServerEntry[]> {
  return [...GTA_RP_SERVERS_FIXTURE];
}
