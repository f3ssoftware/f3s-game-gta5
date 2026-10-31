/** Weekly GTA Online bonus snapshot (swap provider in services layer). */
export type GtaWeeklyBonusesPayload = {
  weekLabel: string;
  updatedAt: string;
  rpMultiplier: string | null;
  cashMultiplier: string | null;
  podiumVehicle: string | null;
  podiumVehicleImageUrl: string | null;
  discounts: string[];
  weeklyChallenge: string | null;
};

export type GtaTodayItemKind =
  | "gun-van"
  | "lucky-wheel"
  | "daily-objectives"
  | "featured-activity";

export type GtaTodayItem = {
  id: string;
  kind: GtaTodayItemKind;
  title: string;
  value: string;
  detail?: string;
};

export type GtaTodayPayload = {
  dateLabel: string;
  updatedAt: string;
  items: GtaTodayItem[];
};

export type GtaRpServerEntry = {
  slug: string;
  name: string;
  websiteUrl: string;
  playersOnline: number;
  maxPlayers: number;
  language: string;
  rpStyle: string;
  whitelist: boolean;
  recommended: boolean;
  isOnline: boolean;
};

export type GtaRpServersPayload = {
  servers: GtaRpServerEntry[];
};

export type GtaVehicleCategory =
  | "fastest"
  | "drift"
  | "armored"
  | "newest";

export type GtaVehicleEntry = {
  id: string;
  name: string;
  category: GtaVehicleCategory;
  classLabel: string;
  topSpeedMph?: number;
  imageUrl?: string | null;
  badge?: string;
};

export type GtaVehiclesPayload = {
  vehicles: GtaVehicleEntry[];
};

export type GtaRpServerSort =
  | "players-desc"
  | "players-asc"
  | "name-asc";

export type GtaRpServerFilterState = {
  search: string;
  language: string;
  rpStyle: string;
  whitelistOnly: boolean;
  recommendedOnly: boolean;
  onlineOnly: boolean;
};

export const GTA_RP_SERVERS_PAGE_SIZE = 5;

export const DEFAULT_GTA_RP_FILTERS: GtaRpServerFilterState = {
  search: "",
  language: "",
  rpStyle: "",
  whitelistOnly: false,
  recommendedOnly: true,
  onlineOnly: false,
};
