"use client";

import { useTranslations } from "next-intl";
import { ProgressSpinner } from "primereact/progressspinner";

import GameVerticalSection from "../shell/GameVerticalSection";
import InsightCard from "../shell/InsightCard";
import { useVerticalSectionFetch } from "../hooks/useVerticalSectionFetch";
import type { GtaTodayPayload } from "../types";
import { GTA5_API_ROUTES } from "../contract";
import styles from "./gta-sections.module.css";

export default function GtaTodaySection() {
  const t = useTranslations();
  const { data, loading, error } = useVerticalSectionFetch<GtaTodayPayload>(
    GTA5_API_ROUTES.today,
    t("GTA_TODAY_FETCH_FAILED")
  );

  return (
    <GameVerticalSection
      id="today"
      title={t("GTA_TODAY_TITLE")}
      subtitle={data?.dateLabel ?? t("GTA_TODAY_SUB")}
      ariaLabel={t("GTA_TODAY_ARIA")}
    >
      {loading ? (
        <div className={styles.loading}>
          <ProgressSpinner style={{ width: 40, height: 40 }} />
        </div>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : data ? (
        <div className={styles.cardGrid}>
          {data.items.map((item) => (
            <InsightCard
              key={item.id}
              label={item.title}
              title={item.value}
              description={item.detail}
              accent={item.kind === "gun-van" || item.kind === "lucky-wheel"}
            />
          ))}
        </div>
      ) : null}
    </GameVerticalSection>
  );
}
