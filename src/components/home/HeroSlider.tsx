import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LuChevronLeft, LuChevronRight, LuPlus } from 'react-icons/lu';
import { products } from '../../data/catalog';
import { heroSlides } from '../../data/content';
import { useI18n } from '../../i18n/I18nProvider';
import { useCart } from '../../lib/cart';
import { Picture } from '../ui/Picture';

const AUTOPLAY_MS = 7000;

/**
 * Full-bleed hero with image and video slides. Slides are stacked and
 * cross-fade; only the active one is exposed to assistive technology. Autoplay
 * pauses while the pointer or keyboard focus is inside and is skipped entirely
 * for visitors who ask for reduced motion.
 */
export function HeroSlider() {
  const { t, pick, money, dir } = useI18n();
  const { add } = useCart();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = heroSlides.length;

  useEffect(() => {
    if (paused || count < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setTimeout(() => setIndex((current) => (current + 1) % count), AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [index, paused, count]);

  const step = (delta: number) => setIndex((current) => (current + delta + count) % count);
  const Previous = dir === 'rtl' ? LuChevronRight : LuChevronLeft;
  const Next = dir === 'rtl' ? LuChevronLeft : LuChevronRight;

  return (
    <section className="hero" aria-roledescription="carousel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
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
                    <Link to={`/product/${product.slug}`} tabIndex={active ? 0 : -1}>{pick(product.name)}</Link>
                    <span>{money(product.price)}</span>
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

      {count > 1 && (
        <div className="hero__controls container">
          <button className="icon-button" type="button" aria-label={t('action.previous')} onClick={() => step(-1)}>
            <Previous aria-hidden />
          </button>
          <div className="carousel__dots">
            {heroSlides.map((slide, slideIndex) => (
              <button key={slide.id} type="button" aria-label={t('carousel.page', { n: slideIndex + 1 })} aria-current={slideIndex === index} onClick={() => setIndex(slideIndex)} />
            ))}
          </div>
          <button className="icon-button" type="button" aria-label={t('action.next')} onClick={() => step(1)}>
            <Next aria-hidden />
          </button>
        </div>
      )}
    </section>
  );
}
