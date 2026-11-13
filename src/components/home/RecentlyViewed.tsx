import { products } from '../../data/catalog';
import { useI18n } from '../../i18n/I18nProvider';
import { useRecentlyViewed } from '../../lib/recentlyViewed';
import { ProductRail } from '../product/ProductRail';

interface RecentlyViewedProps {
  /** Product to leave out, for use on that product's own page. */
  excludeId?: string;
}

/**
 * Products this visitor opened recently, kept in their own browser. The
 * section renders nothing until there is something to show, and the visitor
 * can clear the list.
 */
export function RecentlyViewed({ excludeId }: RecentlyViewedProps) {
  const { t } = useI18n();
  const [ids, clear] = useRecentlyViewed();
  const items = ids.filter((id) => id !== excludeId).flatMap((id) => products.find((product) => product.id === id) ?? []);
  if (items.length === 0) return null;

  return (
    <section className="section section--flush-top">
      <div className="container">
        <div className="section__head">
          <div>
            <p className="eyebrow">{t('recent.eyebrow')}</p>
            <h2 className="section__title">{t('recent.title')}</h2>
          </div>
          <button type="button" onClick={clear} className="bg-transparent p-0 text-sm text-muted underline-offset-4 transition-colors duration-300 hover:text-accent hover:underline">
            {t('recent.clear')}
          </button>
        </div>
        <ProductRail products={items} layout="carousel" label={t('recent.title')} />
      </div>
    </section>
  );
}
