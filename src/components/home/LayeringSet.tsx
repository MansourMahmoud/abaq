import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LuCheck, LuPlus, LuShoppingBag } from 'react-icons/lu';
import { products } from '../../data/catalog';
import { layering } from '../../data/home';
import { useI18n } from '../../i18n/I18nProvider';
import { useCart } from '../../lib/cart';
import { Picture } from '../ui/Picture';
import { Reveal } from '../ui/Reveal';
import { Price } from '../ui/Price';

/** How long the button confirms that the set went into the cart. */
const ADDED_MS = 2200;

/**
 * "Complete the routine": three products that are worn together, shown as
 * numbered steps with their combined price and one button that adds all of
 * them to the cart. A way to raise the order value from the home page.
 */
export function LayeringSet() {
  const { t, pick, money, number } = useI18n();
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const steps = layering.steps.flatMap((entry) => {
    const product = products.find((candidate) => candidate.id === entry.productId);
    return product ? [{ ...entry, product }] : [];
  });
  const total = steps.reduce((sum, entry) => sum + entry.product.price, 0);

  const addAll = () => {
    steps.forEach((entry) => add(entry.product));
    setAdded(true);
    window.setTimeout(() => setAdded(false), ADDED_MS);
  };

  return (
    <section className="section section--flush-top">
      <Reveal className="container">
        <div className="scope-dark grid gap-8 rounded-lg bg-bg p-6 md:p-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:items-center">
          <div className="grid gap-3">
            <p className="eyebrow">{pick(layering.eyebrow)}</p>
            <h2 className="font-display text-3xl font-bold leading-[var(--lh-display)] md:text-4xl">{pick(layering.title)}</h2>
            <p className="text-soft">{pick(layering.text)}</p>
            <div className="mt-3 flex flex-wrap items-center gap-4">
              <button className="button" type="button" onClick={addAll}>
                {added ? <LuCheck aria-hidden /> : <LuShoppingBag aria-hidden />}
                {added ? t('layering.added') : t('layering.addAll', { count: number(steps.length) })}
              </button>
              <p className="grid leading-tight">
                <span className="text-xs text-muted">{t('layering.total')}</span>
                <strong className="text-2xl tabular-nums text-accent">{money(total)}</strong>
              </p>
            </div>
          </div>

          <ol className="grid gap-3 sm:grid-cols-3">
            {steps.map(({ product, step }, index) => (
              <li key={product.id} className="relative">
                <Link to={`/product/${product.slug}`} className="group grid h-full content-start gap-3 rounded-md border border-line bg-surface p-3 transition-colors duration-500 hover:border-accent">
                  <span className="media-zoom relative block aspect-square rounded-sm">
                    <Picture photo={product.photos[0]} alt="" sizes="(min-width: 640px) 20vw, 90vw" />
                    <span className="absolute start-2 top-2 grid h-8 w-8 place-items-center rounded-pill bg-accent font-display text-lg font-bold text-on-accent">{number(index + 1)}</span>
                  </span>
                  <span className="grid gap-0.5 leading-snug">
                    <span className="text-xs text-accent">{pick(step)}</span>
                    <strong className="truncate font-display text-xl transition-colors duration-300 group-hover:text-accent">{pick(product.name)}</strong>
                    <Price product={product} className="text-sm" />
                  </span>
                </Link>
                {/* Plus sign between steps, on wide screens. */}
                {index < steps.length - 1 && (
                  <span className="absolute -end-[22px] top-[30%] z-[1] hidden h-8 w-8 place-items-center rounded-pill border border-line bg-bg text-accent sm:grid" aria-hidden>
                    <LuPlus />
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </Reveal>
    </section>
  );
}
