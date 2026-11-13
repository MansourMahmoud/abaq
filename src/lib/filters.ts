import { discountOf, type Product } from '../data/catalog';

/**
 * Listing filters. The state lives in the URL query string, so a filtered
 * listing can be shared, bookmarked and reached with the back button. These
 * are the filters Salla's product listing supports: category, brand, price
 * range, rating, availability and offers, plus the sort order.
 */

export const SORTS = ['featured', 'priceAsc', 'priceDesc', 'rating', 'discount'] as const;
export type Sort = (typeof SORTS)[number];

export interface Filters {
  /** Sub-category ids; a product matches when it belongs to any of them. */
  categories: string[];
  brands: string[];
  min?: number;
  max?: number;
  /** Minimum average rating. */
  rating?: number;
  onSale: boolean;
  inStock: boolean;
  sort: Sort;
}

const list = (value: string | null) => (value ? value.split(',').filter(Boolean) : []);
const amount = (value: string | null) => {
  const parsed = Number(value);
  return value !== null && value !== '' && Number.isFinite(parsed) && parsed >= 0 ? parsed : undefined;
};

export function readFilters(params: URLSearchParams): Filters {
  const sort = params.get('sort') as Sort | null;
  return {
    categories: list(params.get('cat')),
    brands: list(params.get('brand')),
    min: amount(params.get('min')),
    max: amount(params.get('max')),
    rating: amount(params.get('rating')),
    onSale: params.get('sale') === '1',
    inStock: params.get('stock') === '1',
    sort: sort && SORTS.includes(sort) ? sort : 'featured',
  };
}

/** Query string for a filter state; defaults are left out to keep URLs short. */
export function writeFilters(filters: Filters): URLSearchParams {
  const params = new URLSearchParams();
  if (filters.categories.length) params.set('cat', filters.categories.join(','));
  if (filters.brands.length) params.set('brand', filters.brands.join(','));
  if (filters.min !== undefined) params.set('min', String(filters.min));
  if (filters.max !== undefined) params.set('max', String(filters.max));
  if (filters.rating !== undefined) params.set('rating', String(filters.rating));
  if (filters.onSale) params.set('sale', '1');
  if (filters.inStock) params.set('stock', '1');
  if (filters.sort !== 'featured') params.set('sort', filters.sort);
  return params;
}

/** Number of active filters, not counting the sort order. */
export function countFilters(filters: Filters): number {
  return filters.categories.length + filters.brands.length + Number(filters.min !== undefined || filters.max !== undefined) + Number(filters.rating !== undefined) + Number(filters.onSale) + Number(filters.inStock);
}

const COMPARE: Record<Sort, ((a: Product, b: Product) => number) | null> = {
  featured: null,
  priceAsc: (a, b) => a.price - b.price,
  priceDesc: (a, b) => b.price - a.price,
  rating: (a, b) => b.rating - a.rating,
  discount: (a, b) => (discountOf(b)?.percent ?? 0) - (discountOf(a)?.percent ?? 0),
};

export function applyFilters(products: Product[], filters: Filters): Product[] {
  const matches = products.filter(
    (product) =>
      (filters.categories.length === 0 || filters.categories.some((id) => product.categoryIds.includes(id))) &&
      (filters.brands.length === 0 || filters.brands.includes(product.brand)) &&
      (filters.min === undefined || product.price >= filters.min) &&
      (filters.max === undefined || product.price <= filters.max) &&
      (filters.rating === undefined || product.rating >= filters.rating) &&
      (!filters.onSale || discountOf(product) !== null) &&
      (!filters.inStock || !product.soldOut),
  );
  const compare = COMPARE[filters.sort];
  return compare ? [...matches].sort(compare) : matches;
}
