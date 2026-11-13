import { products } from '../../data/catalog';
import { useI18n } from '../../i18n/I18nProvider';
import { useRecentlyViewed } from '../../lib/recentlyViewed';
import { ProductRail } from '../product/ProductRail';

/**
 * Products this visitor opened recently, kept in their browser. The section
 * renders nothing until at least two products have been viewed.
 */
export function RecentlyViewed() {
  const { t } = useI18n();
  const ids = useRecentlyViewed();
  const items = ids.flatMap((id) => products.find((product) => product.id === id) ?? []);
  if (items.length < 2) return null;

  return (
    <section className="section section--flush-top">
      <div className="container">
        <div className="section__head">
          <div>
            <p className="eyebrow">{t('recent.eyebrow')}</p>
            <h2 className="section__title">{t('recent.title')}</h2>
          </div>
        </div>
        <ProductRail products={items} layout="carousel" label={t('recent.title')} />
      </div>
    </section>
  );
}
