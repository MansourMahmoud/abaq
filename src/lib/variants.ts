import { useState } from 'react';
import { hasVariants, type Product } from '../data/catalog';
import type { Localized } from '../i18n/I18nProvider';

/**
 * Product options. Perfumes are sold in several concentrations and sizes; the
 * catalogue price is for eau de parfum, 50 ml, and every other combination is
 * a multiple of it. In the Salla theme these come from the product's own
 * options and prices.
 */
export const CONCENTRATIONS: { name: Localized; hint: Localized; factor: number }[] = [
  { name: { ar: 'أو دو بارفان', en: 'Eau de parfum' }, hint: { ar: 'ثبات ٦–٨ ساعات', en: 'Lasts 6–8 hours' }, factor: 1 },
  { name: { ar: 'بارفان', en: 'Parfum' }, hint: { ar: 'ثبات ٨–١٠ ساعات', en: 'Lasts 8–10 hours' }, factor: 1.19 },
  { name: { ar: 'إكستريه', en: 'Extrait' }, hint: { ar: 'ثبات +١٢ ساعة', en: 'Lasts 12+ hours' }, factor: 1.4 },
];

export const SIZES: { name: Localized; factor: number }[] = [
  { name: { ar: '٣٠ مل', en: '30 ml' }, factor: 0.69 },
  { name: { ar: '٥٠ مل', en: '50 ml' }, factor: 1 },
  { name: { ar: '١٠٠ مل', en: '100 ml' }, factor: 1.31 },
];

const DEFAULT_SIZE = 1;

export interface Variant {
  /** False for products sold as they are (oils, bakhoor, sets). */
  hasOptions: boolean;
  concentration: number;
  size: number;
  setConcentration: (index: number) => void;
  setSize: (index: number) => void;
  /** Price of one unit for the current choice, rounded to the nearest 5. */
  unitPrice: number;
  /** Price of one unit at another size, keeping the chosen concentration. */
  priceForSize: (sizeIndex: number) => number;
  /** The choice as shown in the cart, e.g. "Parfum · 100 ml". */
  option?: Localized;
}

/** Tracks the shopper's choice of options for one product and prices it. */
export function useVariant(product: Product | undefined): Variant {
  const [concentration, setConcentration] = useState(0);
  const [size, setSize] = useState(DEFAULT_SIZE);
  const hasOptions = product ? hasVariants(product) : false;
  const base = product?.price ?? 0;

  const priceForSize = (sizeIndex: number) => Math.round((base * CONCENTRATIONS[concentration].factor * SIZES[sizeIndex].factor) / 5) * 5;

  return {
    hasOptions,
    concentration,
    size,
    setConcentration,
    setSize,
    unitPrice: hasOptions ? priceForSize(size) : base,
    priceForSize,
    option: hasOptions ? { ar: `${CONCENTRATIONS[concentration].name.ar} · ${SIZES[size].name.ar}`, en: `${CONCENTRATIONS[concentration].name.en} · ${SIZES[size].name.en}` } : undefined,
  };
}
