import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

/** Product id → quantity. */
type CartLines = Record<string, number>;

interface CartValue {
  lines: CartLines;
  count: number;
  add: (productId: string, quantity?: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  remove: (productId: string) => void;
}

const CartContext = createContext<CartValue | null>(null);

/**
 * In-memory cart for the demo storefront. The Salla theme replaces this with
 * the platform cart (`salla.cart`), keeping the same hook surface.
 */
export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLines>({});

  const setQuantity = useCallback((productId: string, quantity: number) => {
    setLines((prev) => {
      const next = { ...prev };
      if (quantity <= 0) delete next[productId];
      else next[productId] = quantity;
      return next;
    });
  }, []);

  const value = useMemo<CartValue>(
    () => ({
      lines,
      count: Object.values(lines).reduce((total, quantity) => total + quantity, 0),
      add: (productId, quantity = 1) => setQuantity(productId, (lines[productId] ?? 0) + quantity),
      setQuantity,
      remove: (productId) => setQuantity(productId, 0),
    }),
    [lines, setQuantity],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartValue {
  const value = useContext(CartContext);
  if (!value) throw new Error('useCart must be used inside <CartProvider>');
  return value;
}
