import { useEffect, useState } from 'react';

/** Scroll distance (px) that counts as a deliberate move rather than jitter. */
const DIRECTION_THRESHOLD = 8;
/** The header never hides this close to the top of the page. */
const HIDE_AFTER = 240;
/** Past this point the page counts as scrolled. */
const SCROLLED_AFTER = 24;

interface ScrollState {
  /** True once the page has moved away from the top. */
  scrolled: boolean;
  /** True while the shopper is scrolling down, well below the top. */
  goingDown: boolean;
}

/**
 * Tracks whether the page is scrolled and in which direction it last moved.
 * The header uses it to slide out of the way on the way down and come back
 * as soon as the shopper scrolls up.
 */
export function useScrollState(): ScrollState {
  const [state, setState] = useState<ScrollState>({ scrolled: false, goingDown: false });

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - last;
      if (Math.abs(delta) < DIRECTION_THRESHOLD && y > SCROLLED_AFTER) return;
      last = y;
      const next = { scrolled: y > SCROLLED_AFTER, goingDown: delta > 0 && y > HIDE_AFTER };
      setState((current) => (current.scrolled === next.scrolled && current.goingDown === next.goingDown ? current : next));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return state;
}
