import { useState } from 'react';
import type { IconType } from 'react-icons';
import { Link } from 'react-router-dom';
import { LuCheck, LuCrown, LuLock, LuShare2, LuShoppingBag, LuStar, LuUserCheck, LuUserPlus, LuUsers } from 'react-icons/lu';
import { REWARD_ICONS } from '../components/home/LoyaltyBand';
import { Picture } from '../components/ui/Picture';
import { loyalty } from '../data/home';
import { useI18n } from '../i18n/I18nProvider';
import type { MessageKey } from '../i18n/messages';

const EARN_ICONS: Record<(typeof loyalty.earn)[number]['icon'], IconType> = {
  bag: LuShoppingBag,
  user: LuUserPlus,
  profile: LuUserCheck,
  star: LuStar,
  share: LuShare2,
  friend: LuUsers,
};

type Kind = (typeof loyalty.rewards)[number]['kind'];

const FILTERS: { id: Kind | 'all'; label: MessageKey }[] = [
  { id: 'all', label: 'reviews.filter.all' },
  { id: 'coupon', label: 'loyalty.kind.coupon' },
  { id: 'shipping', label: 'loyalty.kind.shipping' },
  { id: 'product', label: 'loyalty.kind.product' },
];

/**
 * Loyalty programme page, following the parts of Salla's loyalty page: the
 * customer's balance, every way to earn points, the rewards to exchange them
 * for (filtered by kind), recent point movements and the terms. Balance and
 * history are a sample member's; the Salla theme reads the signed-in
 * customer's and performs the exchange with the store.
 */
export function LoyaltyPage() {
  const { t, pick, number, locale } = useI18n();
  const [kind, setKind] = useState<Kind | 'all'>('all');
  const [redeemed, setRedeemed] = useState<string[]>([]);
  const { member } = loyalty;

  const spent = loyalty.rewards.filter((reward) => redeemed.includes(reward.title.en)).reduce((sum, reward) => sum + reward.cost, 0);
  const balance = member.points - spent;
  const rewards = loyalty.rewards.filter((reward) => kind === 'all' || reward.kind === kind).sort((a, b) => a.cost - b.cost);
  const next = [...loyalty.rewards].sort((a, b) => a.cost - b.cost).find((reward) => reward.cost > balance);
  const formatDate = (iso: string) => new Intl.DateTimeFormat(locale === 'ar' ? 'ar-SA-u-ca-gregory' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(iso));

  return (
    <>
      <section className="container pt-6">
        <div className="scope-dark relative grid gap-8 overflow-hidden rounded-lg bg-bg p-6 md:p-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-center">
          <div className="grid gap-3">
            <nav className="breadcrumb" aria-label={t('nav.breadcrumb')}>
              <Link to="/">{t('nav.home')}</Link>
              <span aria-current="page">{pick(loyalty.eyebrow)}</span>
            </nav>
            <p className="eyebrow inline-flex items-center gap-2">
              <LuCrown aria-hidden /> {pick(loyalty.eyebrow)}
            </p>
            <h1 className="font-display text-4xl font-bold leading-[var(--lh-display)] md:text-5xl">{pick(loyalty.title)}</h1>
            <p className="max-w-[52ch] text-soft">{pick(loyalty.text)}</p>
          </div>

          {/* Balance card */}
          <div className="grid gap-4 rounded-lg border border-accent/40 bg-surface p-6">
            <p className="flex items-center justify-between text-sm text-muted">
              {t('loyalty.balance')}
              <span className="rounded-pill bg-raise px-3 py-0.5 text-xs">{t('loyalty.pending', { points: number(member.pending) })}</span>
            </p>
            <p className="flex items-baseline gap-2">
              <strong className="font-display text-6xl leading-none tabular-nums text-accent">{number(balance)}</strong>
              <span className="text-soft">{t('loyalty.points')}</span>
            </p>
            {next && (
              <div className="grid gap-2">
                <span className="progress">
                  <span style={{ inlineSize: `${Math.min(100, (balance / next.cost) * 100)}%` }} />
                </span>
                <p className="text-sm text-soft">{t('loyalty.toNext', { points: number(next.cost - balance), reward: pick(next.title) })}</p>
              </div>
            )}
            <p className="border-t border-line pt-3 text-xs text-muted">{t('loyalty.expiry', { date: pick(member.expiry) })}</p>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section__head">
          <div>
            <p className="eyebrow">{t('loyalty.earnEyebrow')}</p>
            <h2 className="section__title">{t('loyalty.earnTitle')}</h2>
          </div>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {loyalty.earn.map((way) => {
            const Icon = EARN_ICONS[way.icon];
            return (
              <li key={way.title.en} className="flex gap-4 rounded-lg border border-line bg-surface p-5">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-pill bg-raise text-xl text-accent">
                  <Icon aria-hidden />
                </span>
                <div className="grid min-w-0 flex-1 content-start gap-1">
                  <p className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <strong className="text-lg">{pick(way.title)}</strong>
                    <span className="font-semibold text-accent">{pick(way.points)}</span>
                  </p>
                  <p className="text-sm text-muted">{pick(way.text)}</p>
                  {way.action && (
                    <Link className="link mt-1 w-fit text-sm" to={way.action.to}>
                      {pick(way.action.label)}
                    </Link>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="section section--paper">
        <div className="container">
          <div className="section__head">
            <div>
              <p className="eyebrow">{t('loyalty.rewardsEyebrow')}</p>
              <h2 className="section__title">{t('loyalty.rewardsTitle')}</h2>
            </div>
            <div className="tabs" role="tablist" aria-label={t('loyalty.rewardsTitle')}>
              {FILTERS.map((filter) => (
                <button key={filter.id} role="tab" type="button" aria-selected={filter.id === kind} onClick={() => setKind(filter.id)}>
                  {t(filter.label)}
                </button>
              ))}
            </div>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rewards.map((reward) => {
              const Icon = REWARD_ICONS[reward.kind];
              const done = redeemed.includes(reward.title.en);
              const affordable = reward.cost <= balance;
              return (
                <li key={reward.title.en} className="flex flex-col overflow-hidden rounded-lg border border-line bg-surface">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Picture photo={reward.photo} alt="" sizes="(min-width: 1024px) 30vw, 90vw" />
                    <span className="absolute start-3 top-3 inline-flex items-center gap-1.5 rounded-pill bg-surface px-3 py-1 text-xs font-semibold">
                      <Icon className="text-accent" aria-hidden /> {t(`loyalty.kind.${reward.kind}` as MessageKey)}
                    </span>
                  </div>
                  <div className="grid flex-1 content-start gap-2 p-5">
                    <strong className="font-display text-2xl leading-snug">{pick(reward.title)}</strong>
                    <p className="text-sm text-muted">{pick(reward.text)}</p>
                    <div className="mt-3 flex items-center justify-between gap-3 border-t border-line pt-4">
                      <span className="font-semibold text-accent">{t('loyalty.cost', { points: number(reward.cost) })}</span>
                      {done ? (
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-success">
                          <LuCheck aria-hidden /> {t('loyalty.redeemed')}
                        </span>
                      ) : affordable ? (
                        <button className="button !min-h-[42px] !px-5 text-sm" type="button" onClick={() => setRedeemed([...redeemed, reward.title.en])}>
                          {t('loyalty.redeem')}
                        </button>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-sm text-muted">
                          <LuLock aria-hidden /> {t('loyalty.need', { points: number(reward.cost - balance) })}
                        </span>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="section container grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div>
          <h2 className="section__title mb-5">{t('loyalty.history')}</h2>
          <ul className="divide-y divide-line rounded-lg border border-line bg-surface">
            {loyalty.history.map((entry) => (
              <li key={entry.label.en} className="flex items-center justify-between gap-4 px-5 py-4">
                <span className="grid leading-snug">
                  <strong>{pick(entry.label)}</strong>
                  <time className="text-sm text-muted" dateTime={entry.date}>
                    {formatDate(entry.date)}
                  </time>
                </span>
                <span className={`shrink-0 font-semibold tabular-nums ${entry.points > 0 ? 'text-success' : 'text-sale'}`} dir="ltr">
                  {entry.points > 0 ? '+' : '−'}
                  {number(Math.abs(entry.points))}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <aside>
          <h2 className="section__title mb-5">{t('loyalty.terms')}</h2>
          <ul className="grid gap-3 rounded-lg border border-line bg-surface p-5">
            {loyalty.terms.map((term) => (
              <li key={term.en} className="flex gap-3 text-soft">
                <LuCheck className="mt-1 shrink-0 text-accent" aria-hidden /> {pick(term)}
              </li>
            ))}
          </ul>
        </aside>
      </section>
    </>
  );
}
