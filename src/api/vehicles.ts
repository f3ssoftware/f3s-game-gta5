import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { statsUnavailableBody } from "../lib/public-errors";
import type { GtaVehicleCategory } from "../types";
import { getGtaTrendingVehicles } from "../services/vehicles";

export const revalidate = 86400;

const CATEGORIES = new Set<GtaVehicleCategory>([
  "fastest",
  "drift",
  "armored",
  "newest",
]);

export async function GET(request: NextRequest) {
  try {
    const raw = request.nextUrl.searchParams.get("category");
    const category =
      raw && CATEGORIES.has(raw as GtaVehicleCategory)
        ? (raw as GtaVehicleCategory)
        : undefined;
    const vehicles = await getGtaTrendingVehicles(category);
    return NextResponse.json({ vehicles });
  } catch (err) {
    console.error("[API gta-v/vehicles]", err);
    return NextResponse.json(statsUnavailableBody(), { status: 503 });
  }
}
