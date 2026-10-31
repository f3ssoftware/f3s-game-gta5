"use client";

import type { ReactNode } from "react";
import { PrimeReactProvider } from "primereact/api";

import type { VerticalGameHeader } from "./contract";
import GtaVerticalShell from "./shell/GtaVerticalShell";
import GtaWeeklyBonusesSection from "./sections/GtaWeeklyBonusesSection";
import GtaTodaySection from "./sections/GtaTodaySection";
import GtaRpServersSection from "./sections/GtaRpServersSection";
import GtaTrendingVehiclesSection from "./sections/GtaTrendingVehiclesSection";

export type GtaVVerticalViewProps = {
  game: VerticalGameHeader;
  /**
   * Host-owned header (GamePageHeader + Convex DTO).
   * Kept as a slot so the remote never imports host catalog components.
   */
  header: ReactNode;
  /**
   * Host-owned Twitch block (uses host Twitch BFF / secrets).
   * Must be a ReactNode — Server Components cannot pass render functions to clients.
   */
  twitch: ReactNode;
};

/**
 * GTA V vertical composition mounted by the catalog host at `/{locale}/games/gta5`.
 */
export default function GtaVVerticalView({
  header,
  twitch,
}: GtaVVerticalViewProps) {
  return (
    <PrimeReactProvider>
      <GtaVerticalShell>
        {header}
        <GtaWeeklyBonusesSection />
        <GtaTodaySection />
        {twitch}
        <GtaRpServersSection />
        <GtaTrendingVehiclesSection />
      </GtaVerticalShell>
    </PrimeReactProvider>
  );
}
