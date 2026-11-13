import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'motion/react';
import { useI18n } from '../../i18n/I18nProvider';

interface CountUpProps {
  value: number;
  suffix?: string;
}

/**
 * A figure that counts up from zero the first time it scrolls into view.
 * Whole numbers stay whole; decimals keep one digit (4.8 never reads "5").
 */
export function CountUp({ value, suffix = '' }: CountUpProps) {
  const { number } = useI18n();
  const element = useRef<HTMLSpanElement>(null);
  const inView = useInView(element, { once: true, margin: '0px 0px -10% 0px' });
  const [shown, setShown] = useState(0);
  const decimals = Number.isInteger(value) ? 0 : 1;

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(value);
      return;
    }
    const controls = animate(0, value, { duration: 1.6, ease: [0.22, 0.61, 0.36, 1], onUpdate: setShown });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={element} className="tabular-nums">
      {number(Number(shown.toFixed(decimals)))}
      {suffix}
    </span>
  );
}
