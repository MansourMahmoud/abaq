import type { ReactNode } from 'react';
import { LuStar } from 'react-icons/lu';
import { brands, type Category, type Product } from '../../data/catalog';
import { useI18n } from '../../i18n/I18nProvider';
import type { Filters } from '../../lib/filters';
import { PriceRange } from './PriceRange';

interface FilterPanelProps {
  filters: Filters;
  onChange: (patch: Partial<Filters>) => void;
  /** Every product of the category before filtering, used for counts and price bounds. */
  products: Product[];
  /** Sub-categories offered as a filter, when the category has any. */
  subcategories: Category[];
}

const RATINGS = [4.5, 4, 3];

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="filter-group">
      <legend>{title}</legend>
      {children}
    </fieldset>
  );
}

/** Adds or removes `value` from a list of selected ids. */
const toggle = (values: string[], value: string) => (values.includes(value) ? values.filter((entry) => entry !== value) : [...values, value]);

/**
 * The listing filters. The same panel renders in the sidebar on wide screens
 * and inside a bottom sheet on phones. Options that match nothing in the
 * current category are left out, and each option shows how many products it has.
 */
export function FilterPanel({ filters, onChange, products, subcategories }: FilterPanelProps) {
  const { t, pick, number } = useI18n();
  const prices = products.map((product) => product.price);
  const bounds: [number, number] = [Math.floor(Math.min(...prices) / 10) * 10, Math.ceil(Math.max(...prices) / 10) * 10];
  const availableBrands = brands.map((brand) => ({ ...brand, count: products.filter((product) => product.brand === brand.id).length })).filter((brand) => brand.count > 0);
  const offered = subcategories.map((entry) => ({ ...entry, count: products.filter((product) => product.categoryIds.includes(entry.id)).length })).filter((entry) => entry.count > 0);

  return (
    <div className="grid gap-1">
      {offered.length > 1 && (
        <Group title={t('filters.category')}>
          {offered.map((entry) => (
            <label key={entry.id} className="filter-option">
              <input type="checkbox" checked={filters.categories.includes(entry.id)} onChange={() => onChange({ categories: toggle(filters.categories, entry.id) })} />
              <span>{pick(entry.name)}</span>
              <small>{number(entry.count)}</small>
            </label>
          ))}
        </Group>
      )}

      {bounds[1] > bounds[0] && (
        <Group title={t('filters.price')}>
          <PriceRange bounds={bounds} min={filters.min} max={filters.max} onChange={(min, max) => onChange({ min, max })} />
        </Group>
      )}

      {availableBrands.length > 1 && (
        <Group title={t('filters.brand')}>
          {availableBrands.map((brand) => (
            <label key={brand.id} className="filter-option">
              <input type="checkbox" checked={filters.brands.includes(brand.id)} onChange={() => onChange({ brands: toggle(filters.brands, brand.id) })} />
              <span>{pick(brand.name)}</span>
              <small>{number(brand.count)}</small>
            </label>
          ))}
        </Group>
      )}

      <Group title={t('filters.rating')}>
        {RATINGS.map((rating) => (
          <label key={rating} className="filter-option">
            <input type="radio" name="rating" checked={filters.rating === rating} onChange={() => onChange({ rating })} onClick={() => filters.rating === rating && onChange({ rating: undefined })} />
            <span className="inline-flex items-center gap-1">
              <LuStar className="fill-accent text-accent" aria-hidden /> {t('filters.ratingFrom', { rating: number(rating) })}
            </span>
          </label>
        ))}
      </Group>

      <Group title={t('filters.more')}>
        <label className="filter-option">
          <input type="checkbox" checked={filters.onSale} onChange={(event) => onChange({ onSale: event.target.checked })} />
          <span>{t('filters.onSale')}</span>
        </label>
        <label className="filter-option">
          <input type="checkbox" checked={filters.inStock} onChange={(event) => onChange({ inStock: event.target.checked })} />
          <span>{t('filters.inStock')}</span>
        </label>
      </Group>
    </div>
  );
}
