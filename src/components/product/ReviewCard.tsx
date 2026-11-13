import { LuBadgeCheck, LuStar, LuThumbsUp } from 'react-icons/lu';
import type { Product } from '../../data/catalog';
import type { Review } from '../../data/content';
import { useI18n } from '../../i18n/I18nProvider';
import { Picture } from '../ui/Picture';

/** Five stars with `rating` of them filled. */
export function Stars({ rating }: { rating: number }) {
  const { t, number } = useI18n();
  return (
    <span className="stars" role="img" aria-label={`${t('product.rating')} ${number(rating)}`}>
      {Array.from({ length: 5 }, (_, index) => (
        <LuStar key={index} data-filled={index < Math.round(rating)} aria-hidden />
      ))}
    </span>
  );
}

/** The customer's photo when the platform provides one; their initial otherwise. */
export function ReviewAvatar({ review }: { review: Review }) {
  const { pick } = useI18n();
  return (
    <span className="review__avatar" aria-hidden>
      {review.avatar ? <img src={review.avatar} alt="" width={48} height={48} loading="lazy" decoding="async" /> : pick(review.author).charAt(0)}
    </span>
  );
}

interface ReviewCardProps {
  review: Review;
  /** When given, the card names the product the review is about. */
  product?: Product;
  /** Show the photos the customer attached and the "helpful" count. */
  detailed?: boolean;
}

export function ReviewCard({ review, product, detailed = false }: ReviewCardProps) {
  const { t, pick, number, locale } = useI18n();
  const date = new Intl.DateTimeFormat(locale === 'ar' ? 'ar-SA-u-ca-gregory' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(review.date));

  return (
    <figure className="review">
      <div className="review__top">
        <Stars rating={review.rating} />
        <time dateTime={review.date}>{date}</time>
      </div>
      <blockquote>{pick(review.text)}</blockquote>
      {detailed && review.photos && (
        <ul className="review__photos" aria-label={t('reviews.photos')}>
          {review.photos.map((photo) => (
            <li key={photo}>
              <Picture photo={photo} alt="" sizes="72px" />
            </li>
          ))}
        </ul>
      )}
      <figcaption>
        <ReviewAvatar review={review} />
        <span className="review__who">
          <strong>{pick(review.author)}</strong>
          {product && <span>{pick(product.name)}</span>}
          {detailed && (
            <span className="review__helpful">
              <LuThumbsUp aria-hidden /> {t('reviews.helpful', { count: number(review.helpful) })}
            </span>
          )}
        </span>
        {review.verified && (
          <span className="review__verified">
            <LuBadgeCheck aria-hidden /> {t('reviews.verified')}
          </span>
        )}
      </figcaption>
    </figure>
  );
}
