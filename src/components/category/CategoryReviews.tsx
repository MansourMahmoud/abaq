import { products, productsInCategory, type Category } from '../../data/catalog';
import { reviews } from '../../data/content';
import { useI18n } from '../../i18n/I18nProvider';
import { ReviewCard, Stars } from '../product/ReviewCard';
import { Carousel } from '../ui/Carousel';

/** Fewer reviews than this and the section widens to the whole store's reviews. */
const MIN_REVIEWS = 3;

/**
 * Customer reviews on a listing page: reviews of this category's products,
 * or of the whole store when the category has too few of its own.
 */
export function CategoryReviews({ category }: { category: Category }) {
  const { t, pick, number } = useI18n();
  const ids = new Set(productsInCategory(category.id).map((product) => product.id));
  const own = reviews.filter((review) => ids.has(review.productId));
  const shown = own.length >= MIN_REVIEWS ? own : reviews;
  const average = shown.reduce((sum, review) => sum + review.rating, 0) / shown.length;

  return (
    <section className="section container">
      <div className="section__head">
        <div>
          <p className="eyebrow">{t('reviews.eyebrow')}</p>
          <h2 className="section__title">{own.length >= MIN_REVIEWS ? t('reviews.inCategory', { name: pick(category.name) }) : t('reviews.home')}</h2>
        </div>
        <p className="flex items-center gap-3 rounded-pill border border-line bg-surface px-5 py-2">
          <strong className="text-xl tabular-nums">{number(Number(average.toFixed(1)))}</strong>
          <Stars rating={average} />
          <span className="text-sm text-muted">{t('reviews.count', { count: number(shown.length) })}</span>
        </p>
      </div>
      <Carousel label={t('reviews.home')} variant="cards">
        {shown.map((review) => (
          <ReviewCard key={review.id} review={review} variant="compact" product={products.find((product) => product.id === review.productId)} />
        ))}
      </Carousel>
    </section>
  );
}
