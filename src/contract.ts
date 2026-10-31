/**
 * Host ↔ remote contract for the GTA V game vertical (issue #22).
 *
 * Host: f3sNextjsSite (catalog, auth, Convex header, Twitch proxy, URL shell)
 * Remote: @f3s/game-gta5 (this package — UI sections, domain, BFF handlers)
 */

/** Stable public URL on the host (locale prefix applied by host). */
export const GTA5_PUBLIC_PATH = "/games/gta5" as const;

/** Legacy aliases the host must keep redirecting to the canonical slug. */
export const GTA5_LEGACY_SLUGS = ["gta-v", "gtav"] as const;

/** BFF routes the host mounts (same-origin). Handlers live in this package. */
export const GTA5_API_ROUTES = {
  weeklyBonuses: "/api/gta-v/weekly-bonuses",
  today: "/api/gta-v/today",
  rpServers: "/api/gta-v/rp-servers",
  vehicles: "/api/gta-v/vehicles",
} as const;

/**
 * Header DTO loaded by the host (Convex `games:getBySlug` + defaults).
 * Remotes must treat this as read-only input — never require Convex admin secrets.
 */
export type VerticalGameHeader = {
  slug: string;
  name: string;
  image: string;
  description?: string;
  videoUrl?: string;
  releaseDate?: string;
  platforms?: string[];
  license?: string;
  developer?: string;
  publisher?: string;
  languages?: string[];
  engine?: string;
  tags?: string[];
  twitchGameName?: string;
};

/** Registry metadata the host merges into GAME_VERTICAL_REGISTRY. */
export const GTA5_VERTICAL_DEFINITION = {
  id: "gta5" as const,
  slug: "gta5",
  gameSlug: "gta5",
  convexSlugAliases: ["gta-v", "gtav", "grand-theft-auto-v"] as const,
  paletteClass: "gta5",
  defaultTwitchGameName: "Grand Theft Auto V",
  mount: "package" as const,
  packageName: "@f3s/game-gta5",
  sections: [
    { id: "header", titleKey: "GTA_SECTION_HEADER", enabled: true },
    {
      id: "weekly-bonuses",
      titleKey: "GTA_SECTION_WEEKLY",
      enabled: true,
      anchorId: "weekly-bonuses",
    },
    {
      id: "today",
      titleKey: "GTA_SECTION_TODAY",
      enabled: true,
      anchorId: "today",
    },
    {
      id: "twitch",
      titleKey: "GTA_SECTION_TWITCH",
      enabled: true,
      anchorId: "live-streams",
    },
    {
      id: "rp-servers",
      titleKey: "GTA_SECTION_RP",
      enabled: true,
      anchorId: "rp-servers",
    },
    {
      id: "vehicles",
      titleKey: "GTA_SECTION_VEHICLES",
      enabled: true,
      anchorId: "vehicles",
    },
  ],
};

/**
 * Ownership matrix (secrets stay on host).
 *
 * | Concern              | Host | Remote |
 * |----------------------|------|--------|
 * | Catalog / favorites  | ✅   | ❌     |
 * | Convex game header   | ✅   | consume DTO |
 * | Twitch client secret | ✅   | ❌ (slot only) |
 * | Vertical UI/sections | ❌   | ✅     |
 * | Game BFF / fixtures  | mount| ✅     |
 * | next-intl GTA_* keys | ✅   | consume |
 * | NextAuth / Keycloak  | ✅   | rely on host session |
 */
export const SECRET_BOUNDARY = {
  hostOnly: [
    "TWITCH_CLIENT_ID",
    "TWITCH_CLIENT_SECRET",
    "CONVEX admin / membership secrets",
    "Keycloak / NextAuth secrets",
  ],
  remoteAllowed: [
    "Public fixture data",
    "Server-side scrapers with remote-owned keys (never NEXT_PUBLIC_*)",
  ],
} as const;

/** Resolve Twitch game name for the host when composing the `twitch` slot (server-safe). */
export function resolveGtaTwitchGameName(game: VerticalGameHeader): string {
  return (
    game.twitchGameName ??
    GTA5_VERTICAL_DEFINITION.defaultTwitchGameName ??
    game.name
  );
}
