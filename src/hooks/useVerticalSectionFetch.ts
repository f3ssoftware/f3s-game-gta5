"use client";

import { useCallback, useEffect, useState } from "react";

export type VerticalFetchState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
};

/**
 * Standardized client fetch for vertical section API routes.
 */
export function useVerticalSectionFetch<T>(
  url: string,
  fallbackError = "Failed to load data"
): VerticalFetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(url);
      const json = (await res.json()) as T & { error?: string };
      if (!res.ok) {
        setError(
          typeof json === "object" && json && "error" in json && json.error
            ? String(json.error)
            : fallbackError
        );
        setData(null);
        return;
      }
      setData(json);
    } catch {
      setError(fallbackError);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [url, fallbackError]);

  useEffect(() => {
    void load();
  }, [load]);

  return { data, loading, error, refetch: load };
}
