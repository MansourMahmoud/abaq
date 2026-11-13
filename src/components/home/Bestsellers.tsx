import { useState } from 'react';
import { Link } from 'react-router-dom';
import { products, type Product } from '../../data/catalog';
import { useI18n } from '../../i18n/I18nProvider';
import type { MessageKey } from '../../i18n/messages';
import { useThemeSettings } from '../../settings/ThemeSettings';
import { ProductRail } from '../product/ProductRail';
import { Picture } from '../ui/Picture';
import { Reveal } from '../ui/Reveal';

const TABS: { key: MessageKey; select: () => Product[] }[] = [
  { key: 'home.tab.bestsellers', select: () => products.filter((product) => product.rating >= 4.7) },
  { key: 'home.tab.new', select: () => [...products].reverse() },
  { key: 'home.tab.offers', select: () => products.filter((product) => product.compareAt) },
];

/**
 * Tabbed product section with an editorial banner beside it. The banner gives
 * the section a focal point; on narrow screens it sits above the products.
 */
export function Bestsellers() {
  const { t } = useI18n();
  const layout = useThemeSettings().settings.home.productsLayout;
  const [tab, setTab] = useState(0);

  return (
    <section className="section section--paper">
      <Reveal className="container">
        <div className="section__head">
          <h2 className="section__title">{t('home.bestsellers')}</h2>
          <div className="tabs" role="tablist">
            {TABS.map((entry, index) => (
              <button key={entry.key} role="tab" type="button" aria-selected={index === tab} onClick={() => setTab(index)}>
                {t(entry.key)}
              </button>
            ))}
          </div>
        </div>

        <div className="feature-layout">
          <Link className="feature-banner media-zoom" to="/category/women-amber">
            <Picture photo="amberTrio" alt="" sizes="(min-width: 1000px) 28vw, 100vw" />
            <span className="feature-banner__text">
              <span className="eyebrow">{t('home.featureEyebrow')}</span>
              <span className="feature-banner__title">{t('home.featureTitle')}</span>
              <span>{t('home.featureLead')}</span>
              <span className="button">{t('action.shopNow')}</span>
            </span>
          </Link>
          <div className="feature-layout__products">
            <ProductRail products={TABS[tab].select()} layout={layout} label={t(TABS[tab].key)} />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
