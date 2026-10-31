import type { GtaVehicleCategory, GtaVehicleEntry } from "../types";
import { GTA_VEHICLES_FIXTURE } from "../fixtures/data";

export async function getGtaTrendingVehicles(
  category?: GtaVehicleCategory
): Promise<GtaVehicleEntry[]> {
  const all = GTA_VEHICLES_FIXTURE;
  if (!category) return all;
  return all.filter((v) => v.category === category);
}
