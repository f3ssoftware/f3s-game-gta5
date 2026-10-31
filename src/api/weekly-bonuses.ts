import { NextResponse } from "next/server";

import { statsUnavailableBody } from "../lib/public-errors";
import { getGtaWeeklyBonuses } from "../services/weeklyBonuses";

export const revalidate = 3600;

export async function GET() {
  try {
    const data = await getGtaWeeklyBonuses();
    return NextResponse.json(data);
  } catch (err) {
    console.error("[API gta-v/weekly-bonuses]", err);
    return NextResponse.json(statsUnavailableBody(), { status: 503 });
  }
}
