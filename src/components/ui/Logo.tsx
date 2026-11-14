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
const WORDMARK = { width: 1302, height: 869, path: 'M119 858Q76 845 44 805Q12 765 12 695Q12 672 20 646Q28 620 44 595.5Q60 571 83 553Q67 537 51.5 519Q36 501 23 481.5Q10 462 0 444L66 316Q103 372 148 418Q193 464 236 491Q279 518 310 518L478 518L418 658L204 658Q192 658 175 665.5Q158 673 145.5 688.5Q133 704 133 730Q133 762 150 781.5Q167 801 194 809.5Q221 818 251.5 819Q282 820 310.5 816Q339 812 358 805Q335 832 293 848Q251 864 204 866.5Q157 869 119 858ZM695 658L725 518L922 518L922 658L695 658ZM562 790Q619 805 652.5 798.5Q686 792 702 774Q718 756 722.5 737.5Q727 719 727 710L727 530L867 488L867 680Q867 739 842 776.5Q817 814 778.5 831.5Q740 849 697.5 849Q655 849 618.5 833.5Q582 818 562 790ZM867 488L698 318Q711 318 735 316.5Q759 315 785.5 309.5Q812 304 834.5 292.5Q857 281 867 262L867 488ZM698 658Q652 658 613 635Q574 612 550.5 573Q527 534 527 488Q527 441 550.5 402.5Q574 364 613 341Q652 318 699 318Q745 318 783 341Q821 364 844 402.5Q867 441 867 488Q867 535 844 573.5Q821 612 783 635Q745 658 698 658ZM698 518Q711 518 719 509.5Q727 501 727 488Q727 475 719 466.5Q711 458 698 458Q685 458 676 466.5Q667 475 667 488Q667 501 676 509.5Q685 518 698 518ZM1132 116Q1108 116 1091 99Q1074 82 1074 58Q1074 34 1091 17Q1108 0 1132 0Q1156 0 1173 17Q1190 34 1190 58Q1190 82 1173 99Q1156 116 1132 116ZM882 658L882 518L1162 518L1162 390L1302 318L1302 635Q1302 647 1292 652Q1282 657 1272 657.5Q1262 658 1262 658L882 658ZM1133 488Q1087 488 1048 465Q1009 442 985.5 403Q962 364 962 318Q962 271 985.5 232.5Q1009 194 1048 171Q1087 148 1134 148Q1180 148 1218 171Q1256 194 1279 232.5Q1302 271 1302 318Q1302 365 1279 403.5Q1256 442 1218 465Q1180 488 1133 488ZM1133 348Q1146 348 1154 339.5Q1162 331 1162 318Q1162 305 1154 296.5Q1146 288 1133 288Q1120 288 1111 296.5Q1102 305 1102 318Q1102 331 1111 339.5Q1120 348 1133 348Z' };

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
