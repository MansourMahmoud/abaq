import { Link } from 'react-router-dom';
import { LuArrowLeft, LuArrowRight, LuClock3 } from 'react-icons/lu';
import { products } from '../../data/catalog';
import { guide, guideShop } from '../../data/home';
import { useI18n } from '../../i18n/I18nProvider';
import { useCart } from '../../lib/cart';
import { Picture } from '../ui/Picture';
import { Reveal } from '../ui/Reveal';
import { Price } from '../ui/Price';

/**
 * Short buying guide: how the concentrations compare (share of perfume oil
 * and typical lasting time) and four habits that make a scent last.
 */
export function PerfumeGuide() {
  const { t, pick, number, dir } = useI18n();
  const { add } = useCart();
  const Arrow = dir === 'rtl' ? LuArrowLeft : LuArrowRight;
  const starter = products.find((product) => product.slug === 'discovery-set');
  return (
    <section className="section section--flush-top">
      <Reveal className="container">
        <div className="section__head">
          <div>
            <p className="eyebrow">{t('guide.eyebrow')}</p>
            <h2 className="section__title">{t('guide.title')}</h2>
          </div>
          <Link className="link" to={guide.link.to}>
            {pick(guide.link.label)}
          </Link>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <div className="scope-dark rounded-lg bg-bg p-6 md:p-8">
            <h3 className="font-body text-lg font-semibold text-accent">{t('guide.concentration')}</h3>
            <ul className="mt-5 grid gap-5">
              {guide.concentrations.map((entry, index) => (
                <li key={entry.name.en} className="grid gap-2">
                  <p className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <strong className="font-display text-xl">{pick(entry.name)}</strong>
                    <span className="inline-flex items-center gap-1.5 text-sm text-soft">
                      <LuClock3 className="text-accent" aria-hidden /> {t('guide.hours', { hours: pick(entry.hours) })}
                    </span>
                  </p>
                  <span className="progress">
                    <span style={{ inlineSize: `${entry.strength}%` }} />
                  </span>
                  <p className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted">
                    {pick(entry.share)}
                    <Link to={guideShop[index]} className="inline-flex items-center gap-1.5 rounded-pill border border-line px-3 py-1 text-xs font-semibold text-text transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-on-accent">
                      {t('guide.shop', { name: pick(entry.name) })} <Arrow aria-hidden />
                    </Link>
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-line bg-surface p-6 md:p-8">
            <h3 className="font-body text-lg font-semibold text-accent">{t('guide.tips')}</h3>
            <ol className="mt-5 grid gap-5">
              {guide.tips.map((tip, index) => (
                <li key={tip.title.en} className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-pill bg-raise font-display text-xl font-bold text-accent">{number(index + 1)}</span>
                  <p className="grid gap-0.5 leading-relaxed">
                    <strong>{pick(tip.title)}</strong>
                    <span className="text-sm text-muted">{pick(tip.text)}</span>
                  </p>
                </li>
              ))}
            </ol>
            {/* The product that goes with the tips: a sample set to practise on. */}
            {starter && (
              <div className="mt-6 flex items-center gap-4 rounded-md bg-raise p-3">
                <Link to={`/product/${starter.slug}`} className="media-zoom h-20 w-20 shrink-0 rounded-sm">
                  <Picture photo={starter.photos[0]} alt="" sizes="80px" />
                </Link>
                <p className="grid min-w-0 flex-1 leading-snug">
                  <span className="text-xs text-accent">{t('guide.starter')}</span>
                  <strong className="truncate font-display text-xl">{pick(starter.name)}</strong>
                  <Price product={starter} className="text-sm" />
                </p>
                <button className="button !min-h-[44px] !px-5 text-sm" type="button" onClick={() => add(starter)}>
                  {t('action.addToCart')}
                </button>
              </div>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
