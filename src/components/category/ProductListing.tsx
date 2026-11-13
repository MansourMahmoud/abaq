import { Fragment, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import type { Product } from '../../data/catalog';
import { useI18n } from '../../i18n/I18nProvider';
import { usePagedList } from '../../lib/usePagedList';
import { useThemeSettings } from '../../settings/ThemeSettings';
import { ProductCard } from '../product/ProductCard';
import { Picture } from '../ui/Picture';

interface ProductListingProps {
  products: Product[];
  label: string;
  /** compact fits one more card per row. */
  density: 'comfortable' | 'compact';
}

/** Position in the grid (counted in products) where the promotional card goes. */
const BANNER_AFTER = 4;

function CardSkeleton() {
  return (
    <li aria-hidden>
      <div className="product-card">
        <div className="skeleton aspect-square !rounded-md" />
        <div className="skeleton h-4 w-1/2" />
        <div className="skeleton h-6 w-3/4" />
        <div className="skeleton h-10 w-full !rounded-pill" />
      </div>
    </li>
  );
}

/** Promotional card that takes two cells of the grid. The merchant sets its picture, text and link. */
function ListingBanner() {
  const { t, pick } = useI18n();
  return (
    <li className="listing-grid__banner">
      <Link className="banner media-zoom" to="/product/discovery-set">
        <Picture photo="rollOns" alt="" sizes="(min-width: 768px) 40vw, 100vw" />
        <span className="banner__text">
          <span className="eyebrow">{pick({ ar: 'جرّب قبل أن تختار', en: 'Try before you choose' })}</span>
          <span className="banner__title">{pick({ ar: 'طقم العيّنات: خمسة عطور بـ ٧٥ ر.س', en: 'Discovery set: five scents for SAR 75' })}</span>
          <span className="button mt-2 w-fit">{t('action.shopNow')}</span>
        </span>
      </Link>
    </li>
  );
}

/**
 * The paged product grid of a listing page. Depending on the merchant's
 * setting, the next page loads when the shopper nears the end of the grid or
 * when they press "show more". Skeleton cards hold the layout while a page
 * loads, and a counter tells the shopper how far through the list they are.
 */
export function ProductListing({ products, label, density }: ProductListingProps) {
  const { t, number } = useI18n();
  const { category } = useThemeSettings().settings;
  const { visible, hasMore, loading, loadMore } = usePagedList(products, category.perPage);
  const { ref: sentinel, inView } = useInView({ rootMargin: '0px 0px 400px 0px' });

  useEffect(() => {
    if (category.pagination === 'infinite' && inView) loadMore();
  }, [category.pagination, inView, loadMore]);

  const showBanner = category.inlineBanner && products.length > BANNER_AFTER;
  const pendingCards = Math.min(category.perPage, products.length - visible.length);

  return (
    <>
      <ul className="product-grid listing-grid" data-density={density} aria-label={label} aria-busy={loading}>
        {visible.map((product, index) => (
          <Fragment key={product.id}>
            {showBanner && index === BANNER_AFTER && <ListingBanner />}
            <li>
              <ProductCard product={product} sizes="(min-width: 1200px) 22vw, (min-width: 768px) 30vw, 48vw" />
            </li>
          </Fragment>
        ))}
        {loading && Array.from({ length: pendingCards }, (_, index) => <CardSkeleton key={`skeleton-${index}`} />)}
      </ul>

      <div className="mt-8 grid justify-items-center gap-3 text-center">
        <p className="text-sm text-muted" aria-live="polite">
          {t('category.shown', { shown: number(visible.length), total: number(products.length) })}
        </p>
        <span className="progress w-48">
          <span style={{ inlineSize: `${(visible.length / products.length) * 100}%` }} />
        </span>
        {hasMore && category.pagination === 'button' && (
          <button className="button button--ghost" type="button" disabled={loading} onClick={loadMore}>
            {loading ? t('loader.label') : t('category.more')}
          </button>
        )}
        {/* Watched element: the next page loads when it comes within reach of the viewport. */}
        {hasMore && category.pagination === 'infinite' && <span ref={sentinel} className="h-px w-px" />}
      </div>
    </>
  );

}
