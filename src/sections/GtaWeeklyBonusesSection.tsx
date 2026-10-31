"use client";

import { useTranslations } from "next-intl";
import { ProgressSpinner } from "primereact/progressspinner";

import GameVerticalSection from "../shell/GameVerticalSection";
import InsightCard from "../shell/InsightCard";
import { useVerticalSectionFetch } from "../hooks/useVerticalSectionFetch";
import type { GtaWeeklyBonusesPayload } from "../types";
import { GTA5_API_ROUTES } from "../contract";
import styles from "./gta-sections.module.css";

export default function GtaWeeklyBonusesSection() {
  const t = useTranslations();
  const { data, loading, error } = useVerticalSectionFetch<GtaWeeklyBonusesPayload>(
    GTA5_API_ROUTES.weeklyBonuses,
    t("GTA_WEEKLY_FETCH_FAILED")
  );

  return (
    <GameVerticalSection
      id="weekly-bonuses"
      title={t("GTA_WEEKLY_TITLE")}
      subtitle={t("GTA_WEEKLY_SUB")}
      ariaLabel={t("GTA_WEEKLY_ARIA")}
    >
      {loading ? (
        <div className={styles.loading}>
          <ProgressSpinner style={{ width: 40, height: 40 }} />
        </div>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : data ? (
        <div className={styles.cardGrid}>
          {data.rpMultiplier ? (
            <InsightCard
              label={t("GTA_WEEKLY_RP")}
              title={data.rpMultiplier}
              accent
            />
          ) : null}
          {data.cashMultiplier ? (
            <InsightCard
              label={t("GTA_WEEKLY_CASH")}
              title={data.cashMultiplier}
              accent
            />
          ) : null}
          {data.podiumVehicle ? (
            <InsightCard
              label={t("GTA_WEEKLY_PODIUM")}
              title={data.podiumVehicle}
              imageUrl={data.podiumVehicleImageUrl}
              accent
            />
          ) : null}
          {data.weeklyChallenge ? (
            <InsightCard
              label={t("GTA_WEEKLY_CHALLENGE")}
              title={data.weeklyChallenge}
            />
          ) : null}
          {data.discounts.length > 0 ? (
            <InsightCard
              label={t("GTA_WEEKLY_DISCOUNTS")}
              title={t("GTA_WEEKLY_DISCOUNT_COUNT", {
                count: data.discounts.length,
              })}
              description={data.discounts.join(" · ")}
            />
          ) : null}
        </div>
      ) : null}
    </GameVerticalSection>
  );
}
