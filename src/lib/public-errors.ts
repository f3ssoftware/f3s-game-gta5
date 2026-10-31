/** Minimal public error helpers — no host secrets. */

export function statsUnavailableBody(extra?: Record<string, unknown>) {
  return {
    code: "STATS_UNAVAILABLE",
    message: "Stats couldn't be loaded right now.",
    ...extra,
  };
}

export type PublicApiErrorPayload = {
  code?: string;
  message?: string;
  error?: string;
};

type TranslateFn = (key: string) => string;

export function getPublicErrorMessage(
  data: PublicApiErrorPayload | null | undefined,
  t: TranslateFn,
  fallbackKey: string
): string {
  if (data?.message && typeof data.message === "string") {
    return data.message;
  }
  if (data?.error && typeof data.error === "string") {
    return data.error;
  }
  if (data?.code === "STATS_UNAVAILABLE") {
    try {
      return t("ERROR_STATS_UNAVAILABLE");
    } catch {
      /* fall through */
    }
  }
  try {
    return t(fallbackKey);
  } catch {
    return "Something went wrong. Please try again.";
  }
}
