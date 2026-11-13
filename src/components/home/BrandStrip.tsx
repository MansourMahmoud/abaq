import { Link } from 'react-router-dom';
import { ALL_PRODUCTS, brands, products } from '../../data/catalog';
import { useI18n } from '../../i18n/I18nProvider';
import { Reveal } from '../ui/Reveal';

/** The store's brands as a row of links; each opens the full listing filtered to that brand. */
export function BrandStrip() {
  const { t, pick, number } = useI18n();
  return (
    <section className="section section--flush-top">
      <Reveal className="container">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 rounded-lg border border-line bg-surface px-6 py-5">
          <p className="grid shrink-0 leading-snug">
            <span className="eyebrow">{t('brands.eyebrow')}</span>
            <strong className="font-display text-2xl">{t('brands.title')}</strong>
          </p>
          <ul className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-4">
            {brands.map((brand) => (
              <li key={brand.id}>
                <Link to={`/category/${ALL_PRODUCTS.slug}?brand=${brand.id}`} className="group grid justify-items-center rounded-md border border-transparent px-3 py-3 text-center leading-snug transition-colors duration-500 hover:border-accent hover:bg-raise">
                  <strong className="font-display text-2xl tracking-wide transition-colors duration-300 group-hover:text-accent">{pick(brand.name)}</strong>
                  <span className="text-xs text-muted">{t('category.count', { count: number(products.filter((product) => product.brand === brand.id).length) })}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
