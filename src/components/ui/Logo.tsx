import { STORE } from '../../data/content';
import { useI18n } from '../../i18n/I18nProvider';

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

/**
 * The wordmark as outlines, so it renders identically before web fonts load
 * and wherever the logo file is used. Source files live in `public/brand`.
 */
const WORDMARK = { width: 1374, height: 773, path: 'M390 116Q366 116 349 99Q332 82 332 58Q332 34 349 17Q366 0 390 0Q414 0 431 17Q448 34 448 58Q448 82 431 99Q414 116 390 116ZM217 116Q193 116 176 99Q159 82 159 58Q159 34 176 17Q193 0 217 0Q241 0 258 17Q275 34 275 58Q275 82 258 99Q241 116 217 116ZM306 558Q260 558 221.5 535Q183 512 160.5 473.5Q138 435 138 388Q138 341 160.5 302.5Q183 264 221.5 241Q260 218 306 218Q353 218 391 241Q429 264 452 302.5Q475 341 475 388V418H584V558H471Q468 588 456 624Q443 661 416.5 695Q390 729 345 751Q300 773 231 773Q170 773 126 753.5Q82 734 54 702.5Q26 671 13 634Q0 597 0 563Q0 497 23 444.5Q46 392 82 360Q84 379 88.5 396.5Q93 414 79 433Q87 432 101 444.5Q115 457 120 485Q99 482 89 483.5Q79 485 68 492Q54 501 47 519.5Q40 538 40 563Q40 601 60.5 633.5Q81 666 117.5 686Q154 706 201 706Q278 706 307 668Q333 633 335 558ZM306 419V418H314Q322 416 329 410Q338 401 338 388Q338 375 328.5 366Q319 357 306 357Q293 357 284 366Q275 375 275 388Q275 401 284 410Q293 419 306 419ZM647 766Q623 766 606 749Q589 732 589 708Q589 684 606 667Q623 650 647 650Q671 650 688 667Q705 684 705 708Q705 732 688 749Q671 766 647 766ZM544 558V418H624V249L764 218V418H884V558ZM824 558V418H921Q917 405 914 389Q911 373 913 356Q915 339 925 324Q942 297 974 279Q1006 261 1061 246Q1116 231 1201 215L1208 224Q1136 257 1104.5 281.5Q1073 306 1061 326Q1055 336 1056.5 350Q1058 364 1065 374Q1080 392 1095.5 405Q1111 418 1134 418H1374L1315 558Z' };

/** Mark plus wordmark. In the Salla theme the merchant's uploaded logo replaces both. */
export function Logo() {
  const { pick } = useI18n();
  return (
    <span className="logo">
      <LogoMark className="logo__mark" />
      <svg className="logo__word" viewBox={`0 0 ${WORDMARK.width} ${WORDMARK.height}`} fill="currentColor" role="img" aria-label={pick(STORE.name)}>
        <path d={WORDMARK.path} />
      </svg>
    </span>
  );
}
