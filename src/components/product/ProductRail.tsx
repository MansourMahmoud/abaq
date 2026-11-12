import { useRef } from 'react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import type { Product } from '../../data/catalog';
import { useI18n } from '../../i18n/I18nProvider';
import { ProductCard } from './ProductCard';

interface ProductRailProps {
  products: Product[];
  /** grid wraps onto rows; carousel scrolls sideways with snap points */
  layout: 'grid' | 'carousel';
  /** Maximum number of products to show. */
  limit?: number;
  label: string;
}

/**
 * A set of product cards in either layout. The carousel is a native scroll
 * container (touch, trackpad and keyboard work without script); the arrow
 * buttons only call `scrollBy`, so there is no slider library to ship.
 */
export function ProductRail({ products, layout, limit, label }: ProductRailProps) {
  const { t, dir } = useI18n();
  const scroller = useRef<HTMLUListElement>(null);
  const items = limit ? products.slice(0, limit) : products;

  const scroll = (direction: 1 | -1) => {
    const element = scroller.current;
    if (!element) return;
    // scrollBy uses physical pixels, so "next" is negative-x in RTL.
    const sign = dir === 'rtl' ? -direction : direction;
    element.scrollBy({ left: sign * element.clientWidth * 0.85, behavior: 'smooth' });
  };

  const Previous = dir === 'rtl' ? LuChevronRight : LuChevronLeft;
  const Next = dir === 'rtl' ? LuChevronLeft : LuChevronRight;

  return (
    <div className="product-rail" data-layout={layout}>
      <ul ref={scroller} className="product-rail__list" aria-label={label}>
        {items.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
      {layout === 'carousel' && (
        <div className="product-rail__controls">
          <button className="icon-button" type="button" aria-label={t('action.previous')} onClick={() => scroll(-1)}>
            <Previous aria-hidden />
          </button>
          <button className="icon-button" type="button" aria-label={t('action.next')} onClick={() => scroll(1)}>
            <Next aria-hidden />
          </button>
        </div>
      )}
    </div>
  );
}
