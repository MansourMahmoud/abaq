import { LuBadgeCheck, LuStar } from 'react-icons/lu';
import type { Product } from '../../data/catalog';
import type { Review } from '../../data/content';
import { useI18n } from '../../i18n/I18nProvider';

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

interface ReviewCardProps {
  review: Review;
  /** When given, the card names the product the review is about. */
  product?: Product;
}

export function ReviewCard({ review, product }: ReviewCardProps) {
  const { t, pick } = useI18n();
  const author = pick(review.author);
  return (
    <figure className="review">
      <Stars rating={review.rating} />
      <blockquote>{pick(review.text)}</blockquote>
      <figcaption>
        {/* The customer's photo when the platform provides one; their initial otherwise. */}
        <span className="review__avatar" aria-hidden>{author.charAt(0)}</span>
        <span className="review__who">
          <strong>{author}</strong>
          {product && <span>{pick(product.name)}</span>}
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
