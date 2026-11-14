import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LuGift, LuMail, LuPenLine } from 'react-icons/lu';
import { giftCard } from '../../data/home';
import { useI18n } from '../../i18n/I18nProvider';
import { LogoMark } from '../ui/Logo';
import { Reveal } from '../ui/Reveal';

/**
 * Digital gift card: the shopper picks an amount and sees it on the card.
 * For the shopper who does not know the recipient's taste, and for the
 * merchant a sale with no stock or shipping.
 */
export function GiftCardBand() {
  const { t, pick, money } = useI18n();
  const [amount, setAmount] = useState(giftCard.amounts[1]);

  return (
    <section className="section section--flush-top">
      <Reveal className="container">
        <div className="grid items-center gap-8 rounded-lg border border-line bg-surface p-6 md:p-10 lg:grid-cols-2 lg:gap-14">
          {/* The card itself */}
          <div className="gift-card scope-dark mx-auto w-full max-w-[440px]">
            <span className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 text-accent">
                <LogoMark className="h-8 w-8" /> <strong className="font-display text-2xl">{pick({ ar: 'فوح', en: 'Fawh' })}</strong>
              </span>
              <span className="text-xs tracking-[0.2em] text-soft">GIFT CARD</span>
            </span>
            <span className="grid gap-1">
              <span className="text-sm text-soft">{pick(giftCard.cardLine)}</span>
              <strong className="font-display text-5xl leading-none text-accent tabular-nums">{money(amount)}</strong>
            </span>
            <span className="flex items-center justify-between text-xs text-muted">
              <bdi dir="ltr">FAWH •••• •••• 2026</bdi>
              <LuGift className="text-lg text-accent" aria-hidden />
            </span>
          </div>

          <div className="grid gap-4">
            <p className="eyebrow">{pick(giftCard.eyebrow)}</p>
            <h2 className="section__title">{pick(giftCard.title)}</h2>
            <p className="max-w-[50ch] text-soft">{pick(giftCard.text)}</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label={t('gift.amount')}>
              {giftCard.amounts.map((value) => (
                <button key={value} type="button" className="filter-chip !min-h-[44px] !px-5 font-semibold tabular-nums" aria-pressed={value === amount} onClick={() => setAmount(value)}>
                  {money(value)}
                </button>
              ))}
            </div>
            <ul className="grid gap-2 text-sm text-soft sm:grid-cols-2">
              <li className="flex items-center gap-2">
                <LuMail className="text-accent" aria-hidden /> {pick(giftCard.points[0])}
              </li>
              <li className="flex items-center gap-2">
                <LuPenLine className="text-accent" aria-hidden /> {pick(giftCard.points[1])}
              </li>
            </ul>
            <Link className="button mt-1 w-fit" to="/category/gifts">
              {t('gift.send', { amount: money(amount) })}
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
