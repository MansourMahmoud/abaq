import type { ReactNode } from 'react';
import { m } from 'motion/react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds to wait before animating, for staggering siblings. */
  delay?: number;
}

/**
 * Fades its content up into place the first time it scrolls into view.
 * Visitors who prefer reduced motion get the content without movement
 * (handled once by <MotionConfig reducedMotion="user"> in App).
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 1, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </m.div>
  );
}
