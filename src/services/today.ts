import type { GtaTodayPayload } from "../types";
import { GTA_TODAY_FIXTURE } from "../fixtures/data";

export async function getGtaTodaySnapshot(): Promise<GtaTodayPayload> {
  return {
    ...GTA_TODAY_FIXTURE,
    dateLabel: new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    }),
    updatedAt: new Date().toISOString(),
  };
}
