import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../../data/catalog';
import { useI18n } from '../../i18n/I18nProvider';
import type { MessageKey } from '../../i18n/messages';
import { Picture } from '../ui/Picture';
import { Reveal } from '../ui/Reveal';

/** Demo offer: ends a fixed span after the page loads. A real one carries an end date. */
const OFFER_SPAN_MS = ((2 * 24 + 14) * 60 + 36) * 60 * 1000;

const DEALS = [
  { productId: 'p5', discount: 30, sold: 70 },
  { productId: 'p6', discount: 20, sold: 45 },
  { productId: 'p9', discount: 15, sold: 25 },
];

const UNITS: { key: MessageKey; ms: number; modulo: number }[] = [
  { key: 'offer.days', ms: 86_400_000, modulo: Infinity },
  { key: 'offer.hours', ms: 3_600_000, modulo: 24 },
  { key: 'offer.minutes', ms: 60_000, modulo: 60 },
  { key: 'offer.seconds', ms: 1000, modulo: 60 },
];

export function OfferCountdown() {
  const { t, pick, money, number } = useI18n();
  const [endsAt] = useState(() => Date.now() + OFFER_SPAN_MS);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const remaining = Math.max(0, endsAt - now);

  return (
    <section className="section offer">
      <Reveal className="container offer__layout">
        <div className="offer__intro">
          <p className="eyebrow">{t('offer.eyebrow')}</p>
          <h2 className="section__title">{t('offer.title')}</h2>
          <div className="countdown" role="timer">
            {UNITS.map((unit) => (
              <div key={unit.key}>
                <strong>{number(Math.floor(remaining / unit.ms) % unit.modulo).padStart(2, number(0))}</strong>
                <span>{t(unit.key)}</span>
              </div>
            ))}
          </div>
        </div>

        <ul className="offer__deals">
          {DEALS.map((deal) => {
            const product = products.find((entry) => entry.id === deal.productId)!;
            const price = Math.round(product.price * (1 - deal.discount / 100));
            return (
              <li key={deal.productId}>
                <Link className="deal" to={`/product/${product.slug}`}>
                  <span className="deal__media media-zoom">
                    <Picture photo={product.photos[0]} alt="" sizes="(min-width: 900px) 18vw, 60vw" />
                    <span className="product-card__badge">-{number(deal.discount)}٪</span>
                  </span>
                  <span className="deal__name">{pick(product.name)}</span>
                  <span className="product-card__price">
                    {money(price)}
                    <s>{money(product.price)}</s>
                  </span>
                  <span className="progress" role="img" aria-label={t('offer.sold', { percent: number(deal.sold) })}>
                    <span style={{ inlineSize: `${deal.sold}%` }} />
                  </span>
                  <span className="deal__sold">{t('offer.sold', { percent: number(deal.sold) })}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </section>
  );
}
