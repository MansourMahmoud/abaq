import { useCallback, useEffect, useState, type ReactNode } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import { useI18n } from '../../i18n/I18nProvider';
import { useThemeSettings } from '../../settings/ThemeSettings';

/** Beyond this many pages the dots give way to the progress bar, which fits any count. */
const MAX_DOTS = 7;

interface CarouselProps {
  label: string;
  /**
   * Names the item-width preset in `components.css`. Widths are chosen so the
   * next item always peeks in, which is what tells the shopper the row moves.
   */
  variant: 'products' | 'categories' | 'reels' | 'cards' | 'deals' | 'tiles';
  children: ReactNode[];
}

/**
 * Carousel with mouse and touch dragging, arrows, and a page indicator (dots
 * or a thin progress bar, per the merchant's setting). Built on Embla, which
 * handles drag physics, snapping and right-to-left layouts.
 */
export function Carousel({ label, variant, children }: CarouselProps) {
  const { t, dir } = useI18n();
  const indicator = useThemeSettings().settings.home.carouselIndicator;
  const [viewport, embla] = useEmblaCarousel({ direction: dir, align: 'start', containScroll: 'trimSnaps', slidesToScroll: 'auto', duration: 38 });
  const [snaps, setSnaps] = useState<number[]>([]);
  const [selected, setSelected] = useState(0);
  const [progress, setProgress] = useState(0);

  const sync = useCallback(() => {
    if (!embla) return;
    setSnaps(embla.scrollSnapList());
    setSelected(embla.selectedScrollSnap());
    setProgress(Math.max(0, Math.min(1, embla.scrollProgress())));
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    sync();
    embla.on('select', sync).on('reInit', sync).on('scroll', sync);
    return () => {
      embla.off('select', sync).off('reInit', sync).off('scroll', sync);
    };
  }, [embla, sync]);

  const Previous = dir === 'rtl' ? LuChevronRight : LuChevronLeft;
  const Next = dir === 'rtl' ? LuChevronLeft : LuChevronRight;
  const pages = snaps.length;

  return (
    <div className="carousel" data-variant={variant}>
      <div ref={viewport} className="carousel__viewport">
        <ul className="carousel__track" aria-label={label}>
          {children.map((child, index) => (
            <li key={index} className="carousel__slide">
              {child}
            </li>
          ))}
        </ul>
      </div>

      {pages > 1 && (
        <div className="carousel__controls">
          <button className="icon-button" type="button" aria-label={t('action.previous')} disabled={selected === 0} onClick={() => embla?.scrollPrev()}>
            <Previous aria-hidden />
          </button>
          {indicator === 'dots' && pages <= MAX_DOTS ? (
            <div className="carousel__dots">
              {snaps.map((_, index) => (
                <button key={index} type="button" aria-label={t('carousel.page', { n: index + 1 })} aria-current={index === selected} onClick={() => embla?.scrollTo(index)} />
              ))}
            </div>
          ) : (
            <div className="carousel__bar" aria-hidden>
              <span style={{ inlineSize: `${Math.max(100 / pages, progress * 100)}%` }} />
            </div>
          )}
          <button className="icon-button" type="button" aria-label={t('action.next')} disabled={selected === pages - 1} onClick={() => embla?.scrollNext()}>
            <Next aria-hidden />
          </button>
        </div>
      )}
    </div>
  );
}
