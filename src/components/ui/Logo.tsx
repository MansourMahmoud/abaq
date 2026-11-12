import { useI18n } from '../../i18n/I18nProvider';
import { STORE } from '../../data/content';

/**
 * Store mark: a drop of perfume oil inside a ring. Drawn as strokes so the
 * preloader can animate it with `stroke-dashoffset`; `pathLength="1"` lets the
 * animation run without knowing each path's real length.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="24" cy="24" r="22" pathLength={1} />
      <path d="M24 9c6.5 8 10.5 13.5 10.5 19.5a10.5 10.5 0 0 1-21 0C13.5 22.5 17.5 17 24 9z" pathLength={1} />
      <path d="M24 23c2.5 3 4 5 4 7a4 4 0 0 1-8 0" pathLength={1} />
    </svg>
  );
}

/** Mark plus wordmark. In the Salla theme the merchant's uploaded logo replaces both. */
export function Logo() {
  const { pick } = useI18n();
  return (
    <span className="logo">
      <LogoMark className="logo__mark" />
      <span className="logo__word">{pick(STORE.name)}</span>
    </span>
  );
}
