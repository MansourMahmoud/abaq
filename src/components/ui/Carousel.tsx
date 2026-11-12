import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import { useI18n } from '../../i18n/I18nProvider';
import { useThemeSettings } from '../../settings/ThemeSettings';

interface CarouselProps {
  label: string;
  /**
   * Names the item-width preset in `carousel.css` (products, categories,
   * reels, clips). Widths are percentages chosen so the next item always
   * peeks in, which is what tells a touch user the row scrolls.
   */
  variant: 'products' | 'categories' | 'reels' | 'clips' | 'cards';
  children: ReactNode[];
}

/**
 * Horizontal carousel built on a native scroll container: touch, trackpad and
 * keyboard scrolling work without script. The component only adds arrows and a
 * page indicator, both derived from the scroll position.
 */
export function Carousel({ label, variant, children }: CarouselProps) {
  const { t, dir } = useI18n();
  const indicator = useThemeSettings().settings.home.carouselIndicator;
  const track = useRef<HTMLUListElement>(null);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(0);

  const measure = useCallback(() => {
    const element = track.current;
    // A zero-width track (hidden, or not laid out yet) has no pages to count.
    if (!element || element.clientWidth === 0) return;
    const max = element.scrollWidth - element.clientWidth;
    // In RTL the scroll offset runs negative from zero.
    const offset = Math.abs(element.scrollLeft);
    const count = max > 4 ? Math.ceil(element.scrollWidth / element.clientWidth) : 1;
    setPages(count);
    setPage(offset >= max - 4 ? count - 1 : Math.min(count - 1, Math.round(offset / element.clientWidth)));
  }, []);

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    element.addEventListener('scroll', measure, { passive: true });
    return () => {
      observer.disconnect();
      element.removeEventListener('scroll', measure);
    };
  }, [measure, children.length]);

  const goTo = (target: number) => {
    const element = track.current;
    if (!element) return;
    const max = element.scrollWidth - element.clientWidth;
    const left = Math.min(max, Math.max(0, target) * element.clientWidth);
    element.scrollTo({ left: dir === 'rtl' ? -left : left, behavior: 'smooth' });
  };

  const Previous = dir === 'rtl' ? LuChevronRight : LuChevronLeft;
  const Next = dir === 'rtl' ? LuChevronLeft : LuChevronRight;

  return (
    <div className="carousel" data-variant={variant} data-indicator={indicator}>
      <ul ref={track} className="carousel__track" aria-label={label}>
        {children.map((child, index) => (
          <li key={index}>{child}</li>
        ))}
      </ul>

      {pages > 1 && (
        <div className="carousel__controls">
          <button className="icon-button" type="button" aria-label={t('action.previous')} disabled={page === 0} onClick={() => goTo(page - 1)}>
            <Previous aria-hidden />
          </button>
          {indicator === 'dots' && (
            <div className="carousel__dots">
              {Array.from({ length: pages }, (_, index) => (
                <button key={index} type="button" aria-label={t('carousel.page', { n: index + 1 })} aria-current={index === page} onClick={() => goTo(index)} />
              ))}
            </div>
          )}
          <button className="icon-button" type="button" aria-label={t('action.next')} disabled={page === pages - 1} onClick={() => goTo(page + 1)}>
            <Next aria-hidden />
          </button>
        </div>
      )}
    </div>
  );
}
