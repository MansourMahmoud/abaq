import AutoScroll from 'embla-carousel-auto-scroll';
import useEmblaCarousel from 'embla-carousel-react';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ALL_PRODUCTS, brandLogo, brands } from '../../data/catalog';
import { useI18n } from '../../i18n/I18nProvider';
import { Reveal } from '../ui/Reveal';

/**
 * "Shop by brand": brand logos drifting past in an endless row. There are no
 * arrows; the row moves on its own, pauses under the pointer and can be
 * dragged either way with the mouse or a finger. Each logo opens the full
 * listing filtered to that brand.
 */
export function BrandStrip() {
  const { t, pick, dir } = useI18n();
  const plugins = useMemo(() => {
    const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return reduced ? [] : [AutoScroll({ speed: 0.7, stopOnInteraction: false, stopOnMouseEnter: true, startDelay: 0 })];
  }, []);
  const [viewport] = useEmblaCarousel({ loop: true, dragFree: true, direction: dir, align: 'start' }, plugins);
  // The list is repeated so the loop has enough slides to fill wide screens.
  const logos = [...brands, ...brands];

  return (
    <section className="section section--flush-top">
      <Reveal className="container">
        <div className="section__head !mb-5">
          <div>
            <p className="eyebrow">{t('brands.eyebrow')}</p>
            <h2 className="font-display text-2xl font-bold leading-[var(--lh-display)] md:text-3xl">{t('brands.title')}</h2>
          </div>
        </div>
        <div ref={viewport} className="brand-strip">
          <ul className="flex">
            {logos.map((brand, index) => (
              <li key={`${brand.id}-${index}`} className="min-w-0 shrink-0 grow-0 basis-[46%] ps-3 sm:basis-[30%] md:basis-[22%] lg:basis-[16.66%]">
                <Link to={`/category/${ALL_PRODUCTS.slug}?brand=${brand.id}`} aria-label={pick(brand.name)} draggable={false} className="brand-strip__logo">
                  <img src={brandLogo(brand)} alt={pick(brand.name)} loading="lazy" decoding="async" draggable={false} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
