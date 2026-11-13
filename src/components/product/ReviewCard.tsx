import { Link } from 'react-router-dom';
import { LuBadgeCheck, LuStar, LuThumbsUp } from 'react-icons/lu';
import type { Product } from '../../data/catalog';
import type { Review } from '../../data/content';
import { useI18n } from '../../i18n/I18nProvider';
import { Picture } from '../ui/Picture';
import { Price } from '../ui/Price';

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
  /**
   * compact: every card has the same parts in the same places (author, stars,
   * a fixed number of text lines, the product reviewed), so a row of cards
   * lines up whether or not a review has photos.
   * full: the whole text, the customer's photos and the "helpful" count.
   */
  variant?: 'compact' | 'full';
  /** The product the review is about; shown at the foot of a compact card. */
  product?: Product;
}

export function ReviewCard({ review, variant = 'full', product }: ReviewCardProps) {
  const { t, pick, number, locale } = useI18n();
  const date = new Intl.DateTimeFormat(locale === 'ar' ? 'ar-SA-u-ca-gregory' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(review.date));

  return (
    <figure className="review" data-variant={variant}>
      <figcaption>
        <ReviewAvatar review={review} />
        <span className="review__who">
          <strong>{pick(review.author)}</strong>
          <time dateTime={review.date}>{date}</time>
        </span>
        {review.verified && (
          <span className="review__verified">
            <LuBadgeCheck aria-hidden /> {t('reviews.verified')}
          </span>
        )}
      </figcaption>

      <Stars rating={review.rating} />
      <blockquote>{pick(review.text)}</blockquote>

      {variant === 'full' && review.photos && (
        <ul className="review__photos" aria-label={t('reviews.photos')}>
          {review.photos.map((photo) => (
            <li key={photo}>
              <Picture photo={photo} alt="" sizes="72px" />
            </li>
          ))}
        </ul>
      )}

      {variant === 'full' && (
        <p className="review__helpful">
          <LuThumbsUp aria-hidden /> {t('reviews.helpful', { count: number(review.helpful) })}
        </p>
      )}

      {variant === 'compact' && product && (
        <Link className="review__product" to={`/product/${product.slug}`}>
          <span className="review__product-thumb">
            <Picture photo={product.photos[0]} alt="" sizes="44px" />
          </span>
          <span className="review__who">
            <strong>{pick(product.name)}</strong>
            <Price product={product} />
          </span>
        </Link>
      )}
    </figure>
  );
}
