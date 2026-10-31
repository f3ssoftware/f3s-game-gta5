"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { ProgressSpinner } from "primereact/progressspinner";

import GameVerticalSection from "../shell/GameVerticalSection";
import InsightCard from "../shell/InsightCard";
import { useVerticalSectionFetch } from "../hooks/useVerticalSectionFetch";
import type { GtaVehicleCategory, GtaVehiclesPayload } from "../types";
import { GTA5_API_ROUTES } from "../contract";
import styles from "./gta-sections.module.css";

const CATEGORIES: GtaVehicleCategory[] = [
  "fastest",
  "drift",
  "armored",
  "newest",
];

export default function GtaTrendingVehiclesSection() {
  const t = useTranslations();
  const [category, setCategory] = useState<GtaVehicleCategory | "all">("all");
  const url =
    category === "all"
      ? GTA5_API_ROUTES.vehicles
      : `${GTA5_API_ROUTES.vehicles}?category=${category}`;

  const { data, loading, error } = useVerticalSectionFetch<GtaVehiclesPayload>(
    url,
    t("GTA_VEHICLES_FETCH_FAILED")
  );

  const categoryLabel = useMemo(
    () => ({
      fastest: t("GTA_VEHICLES_CAT_FASTEST"),
      drift: t("GTA_VEHICLES_CAT_DRIFT"),
      armored: t("GTA_VEHICLES_CAT_ARMORED"),
      newest: t("GTA_VEHICLES_CAT_NEWEST"),
      all: t("GTA_VEHICLES_CAT_ALL"),
    }),
    [t]
  );

  return (
    <GameVerticalSection
      id="vehicles"
      title={t("GTA_VEHICLES_TITLE")}
      subtitle={t("GTA_VEHICLES_SUB")}
      ariaLabel={t("GTA_VEHICLES_ARIA")}
    >
      <div className={styles.tabRow} role="tablist" aria-label={t("GTA_VEHICLES_ARIA")}>
        <button
          type="button"
          role="tab"
          aria-selected={category === "all"}
          className={`${styles.tab}${category === "all" ? ` ${styles.tabActive}` : ""}`}
          onClick={() => setCategory("all")}
        >
          {categoryLabel.all}
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={category === cat}
            className={`${styles.tab}${category === cat ? ` ${styles.tabActive}` : ""}`}
            onClick={() => setCategory(cat)}
          >
            {categoryLabel[cat]}
          </button>
        ))}
      </div>

      {loading ? (
        <div className={styles.loading}>
          <ProgressSpinner style={{ width: 40, height: 40 }} />
        </div>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : (
        <div className={styles.cardGrid}>
          {(data?.vehicles ?? []).map((v) => (
            <InsightCard
              key={v.id}
              label={v.classLabel}
              title={v.name}
              badge={v.badge}
              description={
                v.topSpeedMph
                  ? t("GTA_VEHICLES_SPEED", { speed: v.topSpeedMph })
                  : undefined
              }
              imageUrl={v.imageUrl}
              accent={v.category === "newest"}
            />
          ))}
        </div>
      )}
    </GameVerticalSection>
  );
}
