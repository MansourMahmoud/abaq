import { useState } from 'react';
import type { IconType } from 'react-icons';
import { Link } from 'react-router-dom';
import { LuBriefcase, LuMoon, LuPartyPopper, LuSun } from 'react-icons/lu';
import { products } from '../../data/catalog';
import { moments } from '../../data/home';
import { useI18n } from '../../i18n/I18nProvider';
import { ProductCard } from '../product/ProductCard';
import { Picture } from '../ui/Picture';
import { Reveal } from '../ui/Reveal';

const ICONS: Record<(typeof moments)[number]['icon'], IconType> = {
  sun: LuSun,
  work: LuBriefcase,
  moon: LuMoon,
  party: LuPartyPopper,
};

/** Products shown per moment. */
const PICKS = 3;

/**
 * "A scent for every moment": the shopper picks a time of day or an occasion
 * and sees a short editorial note with a few matching products. A lighter way
 * into the catalogue than a category list.
 */
export function MomentPicker() {
  const { t, pick } = useI18n();
  const [index, setIndex] = useState(0);
  const moment = moments[index];
  const picks = products.filter((product) => !product.soldOut && moment.categories.some((id) => product.categoryIds.includes(id))).sort((a, b) => b.rating - a.rating).slice(0, PICKS);

  return (
    <section className="section section--flush-top">
      <Reveal className="container">
        <div className="section__head">
          <div>
            <p className="eyebrow">{t('moments.eyebrow')}</p>
            <h2 className="section__title">{t('moments.title')}</h2>
          </div>
          <div className="tabs" role="tablist" aria-label={t('moments.title')}>
            {moments.map((entry, entryIndex) => {
              const Icon = ICONS[entry.icon];
              return (
                <button key={entry.name.en} role="tab" type="button" aria-selected={entryIndex === index} onClick={() => setIndex(entryIndex)} className="inline-flex items-center gap-2">
                  <Icon aria-hidden /> {pick(entry.name)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Keyed by moment so the panel fades when the choice changes. */}
        <div key={moment.name.en} className="moment grid gap-5 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)]">
          <Link to={moment.to} className="scope-dark media-zoom relative block min-h-[260px] rounded-lg text-white">
            <span className="absolute inset-0">
              <Picture photo={moment.photo} alt="" sizes="(min-width: 1024px) 30vw, 100vw" />
            </span>
            <span className="absolute inset-0 flex flex-col justify-end gap-2 bg-gradient-to-t from-black/90 via-black/60 to-black/10 p-5 sm:p-6">
              <strong className="font-display text-2xl leading-[var(--lh-display)] sm:text-3xl">{pick(moment.headline)}</strong>
              <span className="text-white/85">{pick(moment.text)}</span>
              <span className="button mt-2 w-fit">{t('action.shopNow')}</span>
            </span>
          </Link>
          <ul className="product-grid !grid-cols-2 md:!grid-cols-3">
            {picks.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} sizes="(min-width: 1024px) 20vw, 45vw" />
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
