"use client";

import { useCallback, useMemo, useState } from "react";

export type DirectorySortOption<T extends string> = T;

export type UseFilteredDirectoryOptions<TItem, TSort extends string> = {
  items: TItem[];
  pageSize: number;
  defaultSort: TSort;
  filterFn: (item: TItem, filters: Record<string, unknown>) => boolean;
  compareFn: (a: TItem, b: TItem, sort: TSort) => number;
  initialFilters?: Record<string, unknown>;
};

/**
 * Generic client-side filter + sort + pagination for vertical directories
 * (OT servers, GTA RP servers, future Minecraft servers, etc.).
 */
export function useFilteredDirectory<TItem, TSort extends string>({
  items,
  pageSize,
  defaultSort,
  filterFn,
  compareFn,
  initialFilters = {},
}: UseFilteredDirectoryOptions<TItem, TSort>) {
  const [filters, setFilters] = useState<Record<string, unknown>>(initialFilters);
  const [sort, setSort] = useState<TSort>(defaultSort);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const list = items.filter((item) => filterFn(item, filters));
    return [...list].sort((a, b) => compareFn(a, b, sort));
  }, [items, filters, sort, filterFn, compareFn]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);

  const pageItems = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, safePage, pageSize]);

  const updateFilters = useCallback((patch: Record<string, unknown>) => {
    setFilters((prev) => ({ ...prev, ...patch }));
    setPage(1);
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(initialFilters);
    setSort(defaultSort);
    setPage(1);
  }, [initialFilters, defaultSort]);

  const goToPage = useCallback(
    (next: number) => {
      setPage(Math.max(1, Math.min(totalPages, next)));
    },
    [totalPages]
  );

  return {
    filters,
    sort,
    setSort: (value: TSort) => {
      setSort(value);
      setPage(1);
    },
    updateFilters,
    clearFilters,
    filtered,
    pageItems,
    page: safePage,
    totalPages,
    totalCount: filtered.length,
    pageSize,
    goToPage,
  };
}
