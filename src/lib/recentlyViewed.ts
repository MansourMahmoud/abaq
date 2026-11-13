import { useCallback, useEffect, useState } from 'react';
import { readJson, writeJson } from './storage';

const STORAGE_KEY = 'abaq:recent';
const MAX_ITEMS = 8;

function read(): string[] {
  const stored = readJson<unknown>(STORAGE_KEY, []);
  return Array.isArray(stored) ? stored.filter((entry): entry is string => typeof entry === 'string') : [];
}

/** Records a product as just viewed; the newest comes first and the list stays short. */
export function rememberProduct(productId: string): void {
  writeJson(STORAGE_KEY, [productId, ...read().filter((id) => id !== productId)].slice(0, MAX_ITEMS));
}

/**
 * Ids of the products this visitor opened most recently, newest first, and a
 * function that forgets them.
 */
export function useRecentlyViewed(): [string[], () => void] {
  const [ids, setIds] = useState<string[]>([]);
  // Read after mount: storage is not available while rendering on a server.
  useEffect(() => setIds(read()), []);
  const clear = useCallback(() => {
    writeJson(STORAGE_KEY, []);
    setIds([]);
  }, []);
  return [ids, clear];
}
