import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import type { Product } from '../data/catalog';
import type { Localized } from '../i18n/I18nProvider';

export interface CartLine {
  /** Product id plus the chosen option, so two sizes of one perfume are separate lines. */
  key: string;
  product: Product;
  quantity: number;
  /** Price of one unit in SAR for the chosen option. */
  unitPrice: number;
  /** Chosen option as shown to the shopper, e.g. "Parfum · 100 ml". */
  option?: Localized;
}

interface AddOptions {
  quantity?: number;
  unitPrice?: number;
  option?: Localized;
}

interface CartValue {
  lines: CartLine[];
  /** Total number of units across all lines. */
  count: number;
  subtotal: number;
  add: (product: Product, options?: AddOptions) => void;
  setQuantity: (key: string, quantity: number) => void;
  remove: (key: string) => void;
}

const CartContext = createContext<CartValue | null>(null);

/**
 * In-memory cart for the demo storefront. The Salla theme replaces this with
 * the platform cart (`salla.cart`), keeping the same hook surface.
 */
export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  const add = useCallback((product: Product, { quantity = 1, unitPrice = product.price, option }: AddOptions = {}) => {
    const key = option ? `${product.id}:${option.en}` : product.id;
    setLines((current) =>
      current.some((line) => line.key === key)
        ? current.map((line) => (line.key === key ? { ...line, quantity: line.quantity + quantity } : line))
        : [...current, { key, product, quantity, unitPrice, option }],
    );
  }, []);

  const setQuantity = useCallback((key: string, quantity: number) => {
    setLines((current) =>
      quantity <= 0 ? current.filter((line) => line.key !== key) : current.map((line) => (line.key === key ? { ...line, quantity } : line)),
    );
  }, []);

  const value = useMemo<CartValue>(
    () => ({
      lines,
      count: lines.reduce((total, line) => total + line.quantity, 0),
      subtotal: lines.reduce((total, line) => total + line.unitPrice * line.quantity, 0),
      add,
      setQuantity,
      remove: (key) => setQuantity(key, 0),
    }),
    [lines, add, setQuantity],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartValue {
  const value = useContext(CartContext);
  if (!value) throw new Error('useCart must be used inside <CartProvider>');
  return value;
}
