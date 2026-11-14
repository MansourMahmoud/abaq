import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { products, type Product } from '../data/catalog';
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

const STORAGE_KEY = 'fawh:cart';
/** Upper bound on one line's quantity, so a stored or typed value can never run away. */
const MAX_QUANTITY = 99;

/** A stored line refers to its product by id, so a product removed from the catalogue drops out. */
interface StoredLine {
  key: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  option?: Localized;
}

/** Reads the saved cart, discarding anything malformed or no longer in the catalogue. */
function restore(): CartLine[] {
  try {
    const stored: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    if (!Array.isArray(stored)) return [];
    return (stored as StoredLine[]).flatMap((entry) => {
      const product = products.find((candidate) => candidate.id === entry?.productId);
      const valid = product && !product.soldOut && typeof entry.key === 'string' && Number.isFinite(entry.unitPrice) && entry.unitPrice >= 0 && Number.isInteger(entry.quantity) && entry.quantity > 0;
      return valid ? [{ key: entry.key, product, quantity: Math.min(entry.quantity, MAX_QUANTITY), unitPrice: entry.unitPrice, option: entry.option }] : [];
    });
  } catch {
    return []; // storage blocked or corrupted: start with an empty cart
  }
}

/**
 * Cart for the demo storefront, kept in the browser so it survives a reload.
 * The Salla theme replaces this with the platform cart (`salla.cart`),
 * keeping the same hook surface.
 */
export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(restore);

  useEffect(() => {
    try {
      const stored: StoredLine[] = lines.map(({ key, product, quantity, unitPrice, option }) => ({ key, productId: product.id, quantity, unitPrice, option }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    } catch {
      /* without storage the cart simply lasts for this visit */
    }
  }, [lines]);

  const add = useCallback((product: Product, { quantity = 1, unitPrice = product.price, option }: AddOptions = {}) => {
    if (product.soldOut) return;
    const key = option ? `${product.id}:${option.en}` : product.id;
    setLines((current) =>
      current.some((line) => line.key === key)
        ? current.map((line) => (line.key === key ? { ...line, quantity: Math.min(MAX_QUANTITY, line.quantity + quantity) } : line))
        : [...current, { key, product, quantity, unitPrice, option }],
    );
  }, []);

  const setQuantity = useCallback((key: string, quantity: number) => {
    setLines((current) =>
      quantity <= 0 ? current.filter((line) => line.key !== key) : current.map((line) => (line.key === key ? { ...line, quantity: Math.min(MAX_QUANTITY, quantity) } : line)),
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
