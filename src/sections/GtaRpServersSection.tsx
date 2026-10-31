"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { ProgressSpinner } from "primereact/progressspinner";

import GameVerticalSection from "../shell/GameVerticalSection";
import dirStyles from "../shell/DirectoryToolbar.module.css";
import { useFilteredDirectory } from "../hooks/useFilteredDirectory";
import type {
  GtaRpServerEntry,
  GtaRpServerFilterState,
  GtaRpServerSort,
  GtaRpServersPayload,
} from "../types";
import {
  DEFAULT_GTA_RP_FILTERS,
  GTA_RP_SERVERS_PAGE_SIZE,
} from "../types";
import { getPublicErrorMessage } from "../lib/public-errors";

function filterRpServer(
  server: GtaRpServerEntry,
  filters: Record<string, unknown>
): boolean {
  const f = filters as GtaRpServerFilterState;
  const q = f.search?.trim().toLowerCase() ?? "";
  if (f.recommendedOnly && !server.recommended) return false;
  if (f.onlineOnly && !server.isOnline) return false;
  if (f.whitelistOnly && !server.whitelist) return false;
  if (f.language && server.language !== f.language) return false;
  if (f.rpStyle && server.rpStyle !== f.rpStyle) return false;
  if (q && !server.name.toLowerCase().includes(q)) return false;
  return true;
}

function compareRpServers(
  a: GtaRpServerEntry,
  b: GtaRpServerEntry,
  sort: GtaRpServerSort
): number {
  switch (sort) {
    case "players-asc":
      return a.playersOnline - b.playersOnline;
    case "name-asc":
      return a.name.localeCompare(b.name, undefined, { sensitivity: "base" });
    case "players-desc":
    default:
      return b.playersOnline - a.playersOnline;
  }
}

export default function GtaRpServersSection() {
  const t = useTranslations();
  const [servers, setServers] = useState<GtaRpServerEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        const res = await fetch("/api/gta-v/rp-servers");
        const json = (await res.json()) as GtaRpServersPayload & {
          code?: string;
          message?: string;
          error?: string;
        };
        if (!res.ok) {
          if (!cancelled) {
            setError(getPublicErrorMessage(json, t, "GTA_RP_FETCH_FAILED"));
          }
          return;
        }
        if (!cancelled) setServers(json.servers ?? []);
      } catch {
        if (!cancelled) setError(t("TIBIA_STATS_ERROR_UNKNOWN"));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [t]);

  const {
    filters,
    updateFilters,
    clearFilters,
    sort,
    setSort,
    pageItems,
    page,
    totalPages,
    totalCount,
    pageSize,
    goToPage,
  } = useFilteredDirectory<GtaRpServerEntry, GtaRpServerSort>({
    items: servers,
    pageSize: GTA_RP_SERVERS_PAGE_SIZE,
    defaultSort: "players-desc",
    filterFn: filterRpServer,
    compareFn: compareRpServers,
    initialFilters: { ...DEFAULT_GTA_RP_FILTERS },
  });

  const f = filters as GtaRpServerFilterState;

  const languages = Array.from(new Set(servers.map((s) => s.language))).sort();
  const rpStyles = Array.from(new Set(servers.map((s) => s.rpStyle))).sort();

  const rangeStart = totalCount === 0 ? 0 : (page - 1) * pageSize + 1;
  const rangeEnd = Math.min(page * pageSize, totalCount);

  return (
    <GameVerticalSection
      id="rp-servers"
      title={t("GTA_RP_TITLE")}
      subtitle={t("GTA_RP_SUB")}
      ariaLabel={t("GTA_RP_ARIA")}
    >
      {loading ? (
        <div className={dirStyles.loading}>
          <ProgressSpinner style={{ width: 40, height: 40 }} />
        </div>
      ) : error ? (
        <p className={dirStyles.error}>{error}</p>
      ) : (
        <>
          <div className={dirStyles.toolbar} role="search">
            <label className={dirStyles.field}>
              <span className={dirStyles.fieldLabel}>
                {t("TIBIA_OT_FILTER_SEARCH")}
              </span>
              <input
                type="search"
                className={dirStyles.input}
                value={f.search}
                onChange={(e) => updateFilters({ search: e.target.value })}
                placeholder={t("GTA_RP_SEARCH_PLACEHOLDER")}
              />
            </label>
            <label className={dirStyles.field}>
              <span className={dirStyles.fieldLabel}>{t("GTA_RP_LANGUAGE")}</span>
              <select
                className={dirStyles.select}
                value={f.language}
                onChange={(e) => updateFilters({ language: e.target.value })}
              >
                <option value="">{t("TIBIA_OT_FILTER_ALL_TYPES")}</option>
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </label>
            <label className={dirStyles.field}>
              <span className={dirStyles.fieldLabel}>{t("GTA_RP_STYLE")}</span>
              <select
                className={dirStyles.select}
                value={f.rpStyle}
                onChange={(e) => updateFilters({ rpStyle: e.target.value })}
              >
                <option value="">{t("TIBIA_OT_FILTER_ALL_TYPES")}</option>
                {rpStyles.map((style) => (
                  <option key={style} value={style}>
                    {style}
                  </option>
                ))}
              </select>
            </label>
            <label className={dirStyles.field}>
              <span className={dirStyles.fieldLabel}>
                {t("TIBIA_OT_FILTER_SORT")}
              </span>
              <select
                className={dirStyles.select}
                value={sort}
                onChange={(e) => setSort(e.target.value as GtaRpServerSort)}
              >
                <option value="players-desc">
                  {t("TIBIA_OT_SORT_PLAYERS_DESC")}
                </option>
                <option value="players-asc">
                  {t("TIBIA_OT_SORT_PLAYERS_ASC")}
                </option>
                <option value="name-asc">{t("TIBIA_OT_SORT_NAME")}</option>
              </select>
            </label>
            <div className={dirStyles.checkRow}>
              <label className={dirStyles.checkLabel}>
                <input
                  type="checkbox"
                  className={dirStyles.checkbox}
                  checked={f.recommendedOnly}
                  onChange={(e) =>
                    updateFilters({ recommendedOnly: e.target.checked })
                  }
                />
                {t("TIBIA_OT_FILTER_RECOMMENDED")}
              </label>
              <label className={dirStyles.checkLabel}>
                <input
                  type="checkbox"
                  className={dirStyles.checkbox}
                  checked={f.onlineOnly}
                  onChange={(e) =>
                    updateFilters({ onlineOnly: e.target.checked })
                  }
                />
                {t("TIBIA_OT_FILTER_ONLINE")}
              </label>
              <label className={dirStyles.checkLabel}>
                <input
                  type="checkbox"
                  className={dirStyles.checkbox}
                  checked={f.whitelistOnly}
                  onChange={(e) =>
                    updateFilters({ whitelistOnly: e.target.checked })
                  }
                />
                {t("GTA_RP_WHITELIST_ONLY")}
              </label>
            </div>
            <button
              type="button"
              className={dirStyles.clearBtn}
              onClick={clearFilters}
            >
              {t("TIBIA_OT_FILTER_CLEAR")}
            </button>
          </div>

          {totalCount === 0 ? (
            <p className={dirStyles.muted}>{t("TIBIA_OT_FILTER_NO_RESULTS")}</p>
          ) : (
            <>
              <p className={dirStyles.resultSummary}>
                {t("TIBIA_OT_RESULTS_RANGE", {
                  start: rangeStart,
                  end: rangeEnd,
                  total: totalCount,
                })}
              </p>
              <ul className={dirStyles.list}>
                {pageItems.map((server) => (
                  <li key={server.slug}>
                    <a
                      href={server.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={dirStyles.listCard}
                    >
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "0.35rem",
                            alignItems: "center",
                            marginBottom: "0.2rem",
                          }}
                        >
                          <span
                            style={{
                              width: 8,
                              height: 8,
                              borderRadius: "50%",
                              background: server.isOnline ? "#5cb85c" : "#6c757d",
                            }}
                            aria-hidden
                          />
                          <strong style={{ color: "#fff" }}>{server.name}</strong>
                          {server.recommended ? (
                            <span
                              style={{
                                fontSize: "0.625rem",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                background: "var(--vertical-accent, #f0c040)",
                                color: "#1a1c20",
                                padding: "0.1rem 0.35rem",
                                borderRadius: 4,
                              }}
                            >
                              {t("TIBIA_OT_RECOMMENDED_BADGE")}
                            </span>
                          ) : null}
                          {server.whitelist ? (
                            <span
                              style={{
                                fontSize: "0.625rem",
                                color: "#8f98a0",
                              }}
                            >
                              {t("GTA_RP_WHITELIST")}
                            </span>
                          ) : (
                            <span
                              style={{
                                fontSize: "0.625rem",
                                color: "#66c0f4",
                              }}
                            >
                              {t("GTA_RP_OPEN")}
                            </span>
                          )}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "0.5rem",
                            fontSize: "0.75rem",
                            color: "#8f98a0",
                          }}
                        >
                          <span style={{ color: "#66c0f4" }}>
                            {t("GTA_RP_PLAYERS", {
                              online: server.playersOnline.toLocaleString(),
                              max: server.maxPlayers.toLocaleString(),
                            })}
                          </span>
                          <span>{server.language}</span>
                          <span>{server.rpStyle}</span>
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
              {totalPages > 1 && (
                <nav
                  className={dirStyles.pagination}
                  aria-label={t("TIBIA_OT_PAGINATION_ARIA")}
                >
                  <button
                    type="button"
                    className={dirStyles.pageBtn}
                    disabled={page <= 1}
                    onClick={() => goToPage(page - 1)}
                  >
                    {t("TIBIA_OT_PAGE_PREV")}
                  </button>
                  <span className={dirStyles.pageStatus}>
                    {t("TIBIA_OT_PAGE_STATUS", { page, totalPages })}
                  </span>
                  <button
                    type="button"
                    className={dirStyles.pageBtn}
                    disabled={page >= totalPages}
                    onClick={() => goToPage(page + 1)}
                  >
                    {t("TIBIA_OT_PAGE_NEXT")}
                  </button>
                </nav>
              )}
            </>
          )}
        </>
      )}
    </GameVerticalSection>
  );
}
