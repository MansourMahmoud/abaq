import { createContext, useContext } from 'react';
import type { Product } from '../data/catalog';

/**
 * "Add to cart" from anywhere outside the product page. A product sold as it
 * is goes straight into the cart; one with options opens a small dialog to
 * choose them first, so the cart never receives a product without its options.
 */
export const QuickAddContext = createContext<((product: Product) => void) | null>(null);

export function useQuickAdd(): (product: Product) => void {
  const value = useContext(QuickAddContext);
  if (!value) throw new Error('useQuickAdd must be used inside <QuickAddProvider>');
  return value;
}
