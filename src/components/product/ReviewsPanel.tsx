import { useMemo, useState } from 'react';
import { LuCamera, LuStar, LuThumbsUp } from 'react-icons/lu';
import type { Review } from '../../data/content';
import { useI18n } from '../../i18n/I18nProvider';
import type { MessageKey } from '../../i18n/messages';
import { Picture } from '../ui/Picture';
import { ReviewCard, Stars } from './ReviewCard';

interface ReviewsPanelProps {
  reviews: Review[];
}

type Order = 'recent' | 'helpful' | 'highest' | 'lowest';

const ORDERS: { id: Order; label: MessageKey; compare: (a: Review, b: Review) => number }[] = [
  { id: 'helpful', label: 'reviews.sort.helpful', compare: (a, b) => b.helpful - a.helpful },
  { id: 'recent', label: 'reviews.sort.recent', compare: (a, b) => b.date.localeCompare(a.date) },
  { id: 'highest', label: 'reviews.sort.highest', compare: (a, b) => b.rating - a.rating },
  { id: 'lowest', label: 'reviews.sort.lowest', compare: (a, b) => a.rating - b.rating },
];

/** What customers rated, as shares out of 100. Demo figures; Salla supplies only the star rating. */
const ASPECTS: { label: MessageKey; value: number }[] = [
  { label: 'reviews.aspect.longevity', value: 92 },
  { label: 'reviews.aspect.sillage', value: 86 },
  { label: 'reviews.aspect.value', value: 88 },
  { label: 'reviews.aspect.packaging', value: 96 },
];

/** Reviews shown before the shopper asks for more. */
const PAGE = 4;

/**
 * Product reviews: an overall score with a clickable star breakdown, what
 * customers praised, a strip of customer photos, then the reviews themselves
 * with filters (stars, with photos, verified) and a sort order.
 */
export function ReviewsPanel({ reviews }: ReviewsPanelProps) {
  const { t, number } = useI18n();
  const [stars, setStars] = useState<number | null>(null);
  const [withPhotos, setWithPhotos] = useState(false);
  const [verified, setVerified] = useState(false);
  const [order, setOrder] = useState<Order>('helpful');
  const [limit, setLimit] = useState(PAGE);

  const total = reviews.length;
  const average = total ? reviews.reduce((sum, review) => sum + review.rating, 0) / total : 0;
  const recommend = total ? Math.round((reviews.filter((review) => review.rating >= 4).length / total) * 100) : 0;
  const photos = reviews.flatMap((review) => review.photos ?? []);

  const shown = useMemo(() => {
    const compare = ORDERS.find((entry) => entry.id === order)!.compare;
    return reviews.filter((review) => (stars === null || review.rating === stars) && (!withPhotos || review.photos?.length) && (!verified || review.verified)).sort(compare);
  }, [reviews, stars, withPhotos, verified, order]);

  // Any change of filter starts the list from its first page again.
  const refine = (change: () => void) => {
    change();
    setLimit(PAGE);
  };

  const chip = (pressed: boolean) =>
    `inline-flex min-h-[40px] items-center gap-2 rounded-pill border px-4 text-sm transition-colors duration-300 ${pressed ? 'border-accent bg-accent text-on-accent' : 'border-line bg-surface hover:border-accent hover:text-accent'}`;

  return (
    <div className="grid gap-8 lg:grid-cols-[340px_minmax(0,1fr)] lg:gap-12">
      <aside className="grid content-start gap-6 self-start rounded-lg border border-line bg-surface p-6 lg:sticky lg:top-28">
        <div className="flex items-center gap-5">
          <strong className="font-display text-6xl leading-none tabular-nums">{number(Number(average.toFixed(1)))}</strong>
          <div className="grid gap-1">
            <Stars rating={average} />
            <span className="text-sm text-muted">{t('reviews.count', { count: number(total) })}</span>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-success">
              <LuThumbsUp aria-hidden /> {t('reviews.recommend', { percent: number(recommend) })}
            </span>
          </div>
        </div>

        <ul className="grid gap-1.5" aria-label={t('reviews.breakdown')}>
          {[5, 4, 3, 2, 1].map((value) => {
            const count = reviews.filter((review) => review.rating === value).length;
            const pressed = stars === value;
            return (
              <li key={value}>
                <button
                  type="button"
                  aria-pressed={pressed}
                  disabled={count === 0}
                  onClick={() => refine(() => setStars(pressed ? null : value))}
                  className={`flex w-full items-center gap-3 rounded-sm bg-transparent px-2 py-1 text-sm transition-colors duration-300 enabled:hover:bg-raise disabled:cursor-default disabled:opacity-50 ${pressed ? '!bg-raise font-semibold text-accent' : ''}`}
                >
                  <span className="inline-flex w-8 items-center gap-1 tabular-nums">
                    {number(value)} <LuStar className="fill-accent text-accent" aria-hidden />
                  </span>
                  <span className="progress flex-1">
                    <span style={{ inlineSize: `${total ? (count / total) * 100 : 0}%` }} />
                  </span>
                  <span className="w-6 text-end tabular-nums text-muted">{number(count)}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <dl className="grid grid-cols-2 gap-x-5 gap-y-3 border-t border-line pt-5 text-sm">
          {ASPECTS.map((aspect) => (
            <div key={aspect.label} className="grid gap-1">
              <dt className="flex justify-between">
                {t(aspect.label)} <span className="tabular-nums text-muted">{number(aspect.value)}٪</span>
              </dt>
              <dd className="progress m-0">
                <span style={{ inlineSize: `${aspect.value}%` }} />
              </dd>
            </div>
          ))}
        </dl>

        <button className="button w-full" type="button">
          {t('reviews.add')}
        </button>
      </aside>

      <div className="grid min-w-0 content-start gap-5">
        {photos.length > 0 && (
          <div>
            <h3 className="mb-3 flex items-center gap-2 font-body text-base font-semibold">
              <LuCamera className="text-accent" aria-hidden /> {t('reviews.photos')} <span className="font-normal text-muted">({number(photos.length)})</span>
            </h3>
            <ul className="flex gap-2 overflow-x-auto pb-1">
              {photos.map((photo, index) => (
                <li key={`${photo}-${index}`} className="media-zoom h-24 w-24 shrink-0 rounded-md sm:h-28 sm:w-28">
                  <Picture photo={photo} alt="" sizes="112px" />
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2 border-y border-line py-3">
          <button type="button" className={chip(stars === null && !withPhotos && !verified)} onClick={() => refine(() => { setStars(null); setWithPhotos(false); setVerified(false); })}>
            {t('reviews.filter.all')}
          </button>
          <button type="button" aria-pressed={withPhotos} className={chip(withPhotos)} onClick={() => refine(() => setWithPhotos(!withPhotos))}>
            <LuCamera aria-hidden /> {t('reviews.filter.photos')}
          </button>
          <button type="button" aria-pressed={verified} className={chip(verified)} onClick={() => refine(() => setVerified(!verified))}>
            {t('reviews.verified')}
          </button>
          <label className="ms-auto">
            <span className="visually-hidden">{t('sort.label')}</span>
            <select value={order} onChange={(event) => refine(() => setOrder(event.target.value as Order))} className="h-10 cursor-pointer rounded-pill border border-line bg-surface px-4 text-sm transition-colors duration-300 hover:border-accent">
              {ORDERS.map((entry) => (
                <option key={entry.id} value={entry.id}>
                  {t(entry.label)}
                </option>
              ))}
            </select>
          </label>
        </div>

        {shown.length === 0 ? (
          <p className="py-10 text-center text-muted">{t('reviews.none')}</p>
        ) : (
          <ul className="grid gap-4">
            {shown.slice(0, limit).map((review) => (
              <li key={review.id}>
                <ReviewCard review={review} />
              </li>
            ))}
          </ul>
        )}

        {shown.length > limit && (
          <button className="button button--ghost justify-self-center" type="button" onClick={() => setLimit(limit + PAGE)}>
            {t('reviews.more', { count: number(shown.length - limit) })}
          </button>
        )}
      </div>
    </div>
  );
}
