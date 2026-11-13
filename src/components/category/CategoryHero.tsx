import { useCallback, useEffect, useMemo, useState, type CSSProperties } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';
import useEmblaCarousel from 'embla-carousel-react';
import { Link } from 'react-router-dom';
import { LuArrowLeft, LuArrowRight, LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import type { Category } from '../../data/catalog';
import { useI18n, type Localized } from '../../i18n/I18nProvider';
import type { PhotoKey } from '../../lib/media';
import { Picture } from '../ui/Picture';

export interface CategorySlide {
  id: string;
  photo: PhotoKey;
  eyebrow?: Localized;
  title: Localized;
  lead?: Localized;
  /** Button under the text. The first slide (the category itself) has none. */
  action?: { label: Localized; to: string };
}

interface CategoryHeroProps {
  /** Path from the root category to the current one, for the breadcrumb. */
  path: Category[];
  slides: CategorySlide[];
}

const AUTOPLAY_MS = 6000;

/**
 * Banner carousel at the top of a listing page. The first slide introduces
 * the category and carries the page's <h1>; the rest are promotions the
 * merchant attaches to it. The breadcrumb stays put while the slides change.
 * Slides change by dragging, with the arrows or dots, or on a timer.
 */
export function CategoryHero({ path, slides }: CategoryHeroProps) {
  const { t, pick, dir } = useI18n();
  const plugins = useMemo(() => {
    const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return [Fade(), ...(reduced ? [] : [Autoplay({ delay: AUTOPLAY_MS, stopOnInteraction: false, stopOnMouseEnter: true })])];
  }, []);
  const [viewport, embla] = useEmblaCarousel({ loop: slides.length > 1, direction: dir, duration: 36 }, plugins);
  const [index, setIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (embla) setIndex(embla.selectedScrollSnap());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    embla.on('select', onSelect).on('reInit', onSelect);
    return () => {
      embla.off('select', onSelect).off('reInit', onSelect);
    };
  }, [embla, onSelect]);

  const Previous = dir === 'rtl' ? LuChevronRight : LuChevronLeft;
  const Next = dir === 'rtl' ? LuChevronLeft : LuChevronRight;
  const Arrow = dir === 'rtl' ? LuArrowLeft : LuArrowRight;

  return (
    <section className="container category-hero">
      <div className="scope-dark hero category-hero__slider" aria-roledescription="carousel" style={{ '--hero-delay': `${AUTOPLAY_MS}ms` } as CSSProperties}>
        <div ref={viewport} className="hero__viewport">
          <div className="hero__track">
            {slides.map((slide, slideIndex) => {
              const active = slideIndex === index;
              return (
                <div key={slide.id} className="hero__slide" data-active={active} aria-hidden={!active}>
                  <Picture className="hero__media" photo={slide.photo} alt="" sizes="(min-width: 1400px) 1360px, 100vw" priority={slideIndex === 0} />
                  <div className="category-hero__content">
                    {slide.eyebrow && <p className="eyebrow">{pick(slide.eyebrow)}</p>}
                    {slideIndex === 0 ? <h1 className="category-hero__title">{pick(slide.title)}</h1> : <p className="category-hero__title">{pick(slide.title)}</p>}
                    {slide.lead && <p className="text-soft category-hero__lead">{pick(slide.lead)}</p>}
                    {slide.action && (
                      <Link className="button mt-3 w-fit" to={slide.action.to} tabIndex={active ? 0 : -1}>
                        {pick(slide.action.label)} <Arrow aria-hidden />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <nav className="breadcrumb category-hero__crumbs" aria-label={t('nav.breadcrumb')}>
          <Link to="/">{t('nav.home')}</Link>
          {path.map((entry, entryIndex) =>
            entryIndex === path.length - 1 ? (
              <span key={entry.id} aria-current="page">
                {pick(entry.name)}
              </span>
            ) : (
              <Link key={entry.id} to={`/category/${entry.slug}`}>
                {pick(entry.name)}
              </Link>
            ),
          )}
        </nav>

        {slides.length > 1 && (
          <div className="category-hero__controls">
            <button className="icon-button" type="button" aria-label={t('action.previous')} onClick={() => embla?.scrollPrev()}>
              <Previous aria-hidden />
            </button>
            <div className="hero__dots">
              {slides.map((slide, slideIndex) => (
                <button key={slide.id} type="button" aria-label={t('carousel.page', { n: slideIndex + 1 })} aria-current={slideIndex === index} onClick={() => embla?.scrollTo(slideIndex)}>
                  <span />
                </button>
              ))}
            </div>
            <button className="icon-button" type="button" aria-label={t('action.next')} onClick={() => embla?.scrollNext()}>
              <Next aria-hidden />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
