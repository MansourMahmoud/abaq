import { useCallback, useEffect, useMemo, useState, type CSSProperties } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';
import useEmblaCarousel from 'embla-carousel-react';
import { Link } from 'react-router-dom';
import { LuChevronLeft, LuChevronRight, LuPlus } from 'react-icons/lu';
import { products } from '../../data/catalog';
import { heroSlides } from '../../data/content';
import { useI18n } from '../../i18n/I18nProvider';
import { useCart } from '../../lib/cart';
import { useThemeSettings } from '../../settings/ThemeSettings';
import { Picture } from '../ui/Picture';
import { Price } from '../ui/Price';

/**
 * Full-bleed hero with image and video slides.
 *
 * Slides change by dragging (mouse or touch), with the arrows or dots, or on
 * a timer. The active slide's photo drifts slowly (Ken Burns) and its copy
 * rises in line by line; the active dot fills over the autoplay interval.
 * Autoplay pauses while the pointer is over the hero and is left out entirely
 * for visitors who ask for reduced motion.
 */
export function HeroSlider() {
  const { t, pick, dir } = useI18n();
  const { add } = useCart();
  const { hero } = useThemeSettings().settings;
  const delay = hero.autoplaySeconds * 1000;

  const plugins = useMemo(() => {
    const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return [...(hero.effect === 'fade' ? [Fade()] : []), ...(reduced ? [] : [Autoplay({ delay, stopOnInteraction: false, stopOnMouseEnter: true })])];
  }, [hero.effect, delay]);

  const [viewport, embla] = useEmblaCarousel({ loop: true, direction: dir, duration: 32 }, plugins);
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

  return (
    <section className="hero" aria-roledescription="carousel" data-effect={hero.effect} style={{ '--hero-delay': `${delay}ms` } as CSSProperties}>
      <div ref={viewport} className="hero__viewport">
        <div className="hero__track">
          {heroSlides.map((slide, slideIndex) => {
            const active = slideIndex === index;
            const product = products.find((entry) => entry.id === slide.productId);
            return (
              <div key={slide.id} className="hero__slide" data-active={active} aria-hidden={!active}>
                {slide.media.kind === 'image' ? (
                  <Picture className="hero__media" photo={slide.media.photo} alt="" sizes="100vw" priority={slideIndex === 0} />
                ) : (
                  // The clip only loads once its slide has been shown.
                  <video className="hero__media" src={active ? `/media/video/${slide.media.file}.mp4` : undefined} poster={`/media/video/${slide.media.file}-poster.webp`} autoPlay muted loop playsInline preload="none" />
                )}
                <div className="hero__content container">
                  <div className="hero__copy">
                    <p className="eyebrow">{pick(slide.eyebrow)}</p>
                    {/* One <h1> per page: the first slide owns it. */}
                    {slideIndex === 0 ? <h1 className="hero__title">{pick(slide.title)}</h1> : <p className="hero__title">{pick(slide.title)}</p>}
                    <p className="hero__lead text-soft">{pick(slide.lead)}</p>
                    <Link className="button" to={slide.link} tabIndex={active ? 0 : -1}>
                      {t('action.shopNow')}
                    </Link>
                  </div>

                  {product && (
                    <div className="hero__product">
                      <Link className="hero__product-thumb" to={`/product/${product.slug}`} tabIndex={active ? 0 : -1}>
                        <Picture photo={product.photos[0]} alt={pick(product.name)} sizes="84px" />
                      </Link>
                      <p className="hero__product-text">
                        <span className="eyebrow">{t('home.heroProduct')}</span>
                        <Link to={`/product/${product.slug}`} tabIndex={active ? 0 : -1}>
                          {pick(product.name)}
                        </Link>
                        <Price product={product} />
                      </p>
                      <button className="icon-button" type="button" tabIndex={active ? 0 : -1} aria-label={`${t('action.addToCart')}: ${pick(product.name)}`} onClick={() => add(product)}>
                        <LuPlus aria-hidden />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {heroSlides.length > 1 && (
        <div className="hero__controls container">
          <button className="icon-button" type="button" aria-label={t('action.previous')} onClick={() => embla?.scrollPrev()}>
            <Previous aria-hidden />
          </button>
          <div className="hero__dots">
            {heroSlides.map((slide, slideIndex) => (
              <button key={slide.id} type="button" aria-label={t('carousel.page', { n: slideIndex + 1 })} aria-current={slideIndex === index} onClick={() => embla?.scrollTo(slideIndex)}>
                <span />
              </button>
            ))}
          </div>
          <button className="icon-button" type="button" aria-label={t('action.next')} onClick={() => embla?.scrollNext()}>
            <Next aria-hidden />
          </button>
          <span className="hero__counter" aria-hidden>
            {String(index + 1).padStart(2, '0')} <i /> {String(heroSlides.length).padStart(2, '0')}
          </span>
        </div>
      )}
    </section>
  );
}
