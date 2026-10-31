import { NextResponse } from "next/server";

import { statsUnavailableBody } from "../lib/public-errors";
import { getGtaRpServers } from "../services/rpServers";

export const revalidate = 300;

export async function GET() {
  try {
    const servers = await getGtaRpServers();
    return NextResponse.json({ servers });
  } catch (err) {
    console.error("[API gta-v/rp-servers]", err);
    return NextResponse.json(statsUnavailableBody(), { status: 503 });
  }
}
