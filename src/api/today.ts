import { NextResponse } from "next/server";

import { statsUnavailableBody } from "../lib/public-errors";
import { getGtaTodaySnapshot } from "../services/today";

export const revalidate = 900;

export async function GET() {
  try {
    const data = await getGtaTodaySnapshot();
    return NextResponse.json(data);
  } catch (err) {
    console.error("[API gta-v/today]", err);
    return NextResponse.json(statsUnavailableBody(), { status: 503 });
  }
}
