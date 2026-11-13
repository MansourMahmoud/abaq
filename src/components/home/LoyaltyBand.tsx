import { Link } from 'react-router-dom';
import { LuArrowLeft, LuArrowRight, LuCrown, LuGift, LuTicketPercent, LuTruck } from 'react-icons/lu';
import type { IconType } from 'react-icons';
import { loyalty } from '../../data/home';
import { useI18n } from '../../i18n/I18nProvider';
import { Reveal } from '../ui/Reveal';

export const REWARD_ICONS: Record<(typeof loyalty.rewards)[number]['kind'], IconType> = {
  coupon: LuTicketPercent,
  shipping: LuTruck,
  product: LuGift,
};

/**
 * Loyalty programme teaser on the home page: what it is, the first few ways
 * to earn, a sample of rewards with their cost in points, and a button to the
 * programme's own page.
 */
export function LoyaltyBand() {
  const { t, pick, number, dir } = useI18n();
  const Arrow = dir === 'rtl' ? LuArrowLeft : LuArrowRight;

  return (
    <section className="section section--paper">
      <Reveal className="container grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center lg:gap-12">
        <div className="grid gap-4">
          <p className="eyebrow inline-flex items-center gap-2">
            <LuCrown aria-hidden /> {pick(loyalty.eyebrow)}
          </p>
          <h2 className="section__title">{pick(loyalty.title)}</h2>
          <p className="max-w-[48ch] text-soft">{pick(loyalty.text)}</p>
          <ul className="grid gap-2">
            {loyalty.earn.slice(0, 3).map((way) => (
              <li key={way.title.en} className="flex items-center justify-between gap-4 rounded-md border border-line bg-surface px-4 py-3">
                <span>{pick(way.title)}</span>
                <strong className="shrink-0 text-accent">{pick(way.points)}</strong>
              </li>
            ))}
          </ul>
          <Link className="button mt-2 w-fit" to="/loyalty">
            {t('loyalty.open')} <Arrow aria-hidden />
          </Link>
        </div>

        <ul className="grid gap-3 sm:grid-cols-3">
          {loyalty.rewards.slice(0, 3).map((reward) => {
            const Icon = REWARD_ICONS[reward.kind];
            return (
              <li key={reward.title.en}>
                <Link to="/loyalty" className="group grid h-full content-start justify-items-center gap-3 rounded-lg border border-line bg-surface p-6 text-center transition-colors duration-500 hover:border-accent">
                  <span className="grid h-16 w-16 place-items-center rounded-pill bg-raise text-3xl text-accent transition-colors duration-500 group-hover:bg-accent group-hover:text-on-accent">
                    <Icon aria-hidden />
                  </span>
                  <strong className="font-display text-xl leading-snug">{pick(reward.title)}</strong>
                  <span className="text-sm text-muted">{pick(reward.text)}</span>
                  <span className="mt-auto rounded-pill bg-raise px-4 py-1 text-sm font-semibold text-accent">{t('loyalty.cost', { points: number(reward.cost) })}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </section>
  );
}
