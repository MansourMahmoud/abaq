import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Stand-in for the request the Salla theme makes when it fetches the next
 * page of a listing. The demo catalogue is local, so the wait is simulated to
 * let the loading state show.
 */
const DEMO_LATENCY_MS = 500;

interface PagedList<T> {
  /** Items loaded so far. */
  visible: T[];
  hasMore: boolean;
  /** True while the next page is on its way. */
  loading: boolean;
  loadMore: () => void;
}

/**
 * Reveals a list one page at a time. Going back to page one whenever the
 * list itself changes (a new filter or sort order) is handled here, so
 * callers only render `visible` and call `loadMore`.
 */
export function usePagedList<T>(items: T[], perPage: number): PagedList<T> {
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    window.clearTimeout(timer.current);
    setPages(1);
    setLoading(false);
  }, [items, perPage]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const hasMore = pages * perPage < items.length;

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;
    setLoading(true);
    timer.current = window.setTimeout(() => {
      setPages((current) => current + 1);
      setLoading(false);
    }, DEMO_LATENCY_MS);
  }, [loading, hasMore]);

  return { visible: items.slice(0, pages * perPage), hasMore, loading, loadMore };
}
