import { useEffect, useState } from 'react';

const STORAGE_KEY = 'abaq:recent';
const MAX_ITEMS = 8;

function read(): string[] {
  try {
    const stored: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    return Array.isArray(stored) ? stored.filter((entry): entry is string => typeof entry === 'string') : [];
  } catch {
    return []; // storage blocked or corrupted: behave as if nothing was viewed
  }
}

/** Records a product as just viewed; the newest comes first and the list stays short. */
export function rememberProduct(productId: string): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([productId, ...read().filter((id) => id !== productId)].slice(0, MAX_ITEMS)));
  } catch {
    /* without storage the section simply stays hidden */
  }
}

/** Ids of the products this visitor opened most recently, newest first. */
export function useRecentlyViewed(): string[] {
  const [ids, setIds] = useState<string[]>([]);
  // Read after mount: storage is not available while rendering on a server.
  useEffect(() => setIds(read()), []);
  return ids;
}
