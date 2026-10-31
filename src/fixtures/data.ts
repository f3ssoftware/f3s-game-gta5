import type {
  GtaRpServerEntry,
  GtaTodayPayload,
  GtaVehicleEntry,
  GtaWeeklyBonusesPayload,
} from "../types";
import { RECOMMENDED_GTA_RP_SERVER_SLUGS } from "../recommendedRpServers";

const recommended = new Set<string>(RECOMMENDED_GTA_RP_SERVER_SLUGS);

/** Replace with Rockstar / community API adapters in services/*. */
export const GTA_WEEKLY_BONUSES_FIXTURE: GtaWeeklyBonusesPayload = {
  weekLabel: "Current week",
  updatedAt: new Date().toISOString(),
  rpMultiplier: "3× RP",
  cashMultiplier: "2× GTA$ on select modes",
  podiumVehicle: "Pegassi Torero XO",
  podiumVehicleImageUrl: null,
  discounts: [
    "50% off selected businesses",
    "30% off high-end apartments",
    "25% off weapon upgrades",
  ],
  weeklyChallenge: "Complete 3 Adversary Modes for bonus rewards",
};

export const GTA_TODAY_FIXTURE: GtaTodayPayload = {
  dateLabel: new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  }),
  updatedAt: new Date().toISOString(),
  items: [
    {
      id: "gun-van",
      kind: "gun-van",
      title: "Gun Van",
      value: "Chumash — west highway",
      detail: "Inventory rotates daily",
    },
    {
      id: "lucky-wheel",
      kind: "lucky-wheel",
      title: "Lucky Wheel",
      value: "Pegassi Torero XO",
      detail: "Diamond Casino & Resort",
    },
    {
      id: "daily-objectives",
      kind: "daily-objectives",
      title: "Daily Objectives",
      value: "Deliver supplies · Win race · Sell product",
    },
    {
      id: "featured-activity",
      kind: "featured-activity",
      title: "Featured activity",
      value: "Survival Series — 2× payouts",
    },
  ],
};

const RP_BASE: Omit<GtaRpServerEntry, "recommended">[] = [
  {
    slug: "nopixel",
    name: "NoPixel",
    websiteUrl: "https://nopixel.net/",
    playersOnline: 420,
    maxPlayers: 500,
    language: "English",
    rpStyle: "Serious",
    whitelist: true,
    isOnline: true,
  },
  {
    slug: "prodigy-rp",
    name: "Prodigy RP",
    websiteUrl: "https://prodigyrp.net/",
    playersOnline: 310,
    maxPlayers: 400,
    language: "English",
    rpStyle: "Serious",
    whitelist: true,
    isOnline: true,
  },
  {
    slug: "escape-rp",
    name: "Escape RP",
    websiteUrl: "https://www.escape-rp.com/",
    playersOnline: 180,
    maxPlayers: 300,
    language: "English",
    rpStyle: "Semi-serious",
    whitelist: true,
    isOnline: true,
  },
  {
    slug: "gtaw-roleplay",
    name: "GTA World",
    websiteUrl: "https://gtaw.io/",
    playersOnline: 890,
    maxPlayers: 1200,
    language: "English",
    rpStyle: "Text / Voice RP",
    whitelist: true,
    isOnline: true,
  },
  {
    slug: "majestic-rp",
    name: "Majestic RP",
    websiteUrl: "https://majestic-rp.com/",
    playersOnline: 2400,
    maxPlayers: 5000,
    language: "Russian",
    rpStyle: "Arcade",
    whitelist: false,
    isOnline: true,
  },
  {
    slug: "grand-rp",
    name: "Grand RP",
    websiteUrl: "https://gta5grand.com/",
    playersOnline: 1200,
    maxPlayers: 3000,
    language: "Russian",
    rpStyle: "Arcade",
    whitelist: false,
    isOnline: true,
  },
  {
    slug: "lspd-first-response",
    name: "LSPDFR Community Hub",
    websiteUrl: "https://www.lcpdfr.com/",
    playersOnline: 0,
    maxPlayers: 0,
    language: "English",
    rpStyle: "Modding",
    whitelist: false,
    isOnline: false,
  },
  {
    slug: "paris-life-rp",
    name: "Paris Life RP",
    websiteUrl: "https://example.com/paris-life-rp",
    playersOnline: 95,
    maxPlayers: 200,
    language: "French",
    rpStyle: "Serious",
    whitelist: true,
    isOnline: true,
  },
];

export const GTA_RP_SERVERS_FIXTURE: GtaRpServerEntry[] = RP_BASE.map((s) => ({
  ...s,
  recommended: recommended.has(s.slug),
}));

export const GTA_VEHICLES_FIXTURE: GtaVehicleEntry[] = [
  {
    id: "torero-xo",
    name: "Pegassi Torero XO",
    category: "fastest",
    classLabel: "Super",
    topSpeedMph: 131,
    badge: "Podium",
  },
  {
    id: "virtue",
    name: "Ocelot Virtue",
    category: "fastest",
    classLabel: "Super",
    topSpeedMph: 128,
  },
  {
    id: "euros-x32",
    name: "Annis Euros X32",
    category: "drift",
    classLabel: "Sports",
    badge: "Drift king",
  },
  {
    id: "drift-tampa",
    name: "Declasse Drift Tampa",
    category: "drift",
    classLabel: "Sports",
  },
  {
    id: "nightshark",
    name: "HVY Nightshark",
    category: "armored",
    classLabel: "Off-road",
    badge: "Armored",
  },
  {
    id: "insurgent",
    name: "HVY Insurgent Pick-Up",
    category: "armored",
    classLabel: "Off-road",
  },
  {
    id: "panthere",
    name: "Toundra Panthere",
    category: "newest",
    classLabel: "Sports",
    badge: "New",
  },
  {
    id: "coureur",
    name: "Penaud Coureur",
    category: "newest",
    classLabel: "Super",
    badge: "New",
  },
];
