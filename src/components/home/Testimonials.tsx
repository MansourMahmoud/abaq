import { products } from '../../data/catalog';
import { reviews } from '../../data/content';
import { useI18n } from '../../i18n/I18nProvider';
import { ReviewAvatar, ReviewCard, Stars } from '../product/ReviewCard';
import { Carousel } from '../ui/Carousel';
import { Reveal } from '../ui/Reveal';

/** How many customer photos overlap in the summary's avatar stack. */
const STACK_SIZE = 5;

/** Store-wide reviews: an overall score with customer faces, then the reviews in a carousel. */
export function Testimonials() {
  const { t, number } = useI18n();
  const average = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const faces = reviews.filter((review) => review.avatar).slice(0, STACK_SIZE);

  return (
    <section className="section">
      <Reveal className="container">
        <div className="section__head">
          <div>
            <p className="eyebrow">{t('reviews.eyebrow')}</p>
            <h2 className="section__title">{t('reviews.home')}</h2>
          </div>
          <div className="flex max-w-full items-center gap-3 rounded-pill border border-line bg-surface py-2 pe-5 ps-2">
            <ul className="flex" aria-hidden>
              {faces.map((review, index) => (
                <li key={review.id} className={`${index > 0 ? '-ms-3' : ''} ${index > 2 ? 'hidden sm:block' : ''}`}>
                  <ReviewAvatar review={review} />
                </li>
              ))}
            </ul>
            <p className="grid leading-tight">
              <span className="flex items-center gap-2">
                <strong className="text-xl tabular-nums">{number(Number(average.toFixed(1)))}</strong>
                <Stars rating={average} />
              </span>
              <span className="text-xs text-muted">{t('reviews.basedOn', { count: number(1280) })}</span>
            </p>
          </div>
        </div>
        <Carousel label={t('reviews.home')} variant="cards">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} variant="compact" product={products.find((product) => product.id === review.productId)} />
          ))}
        </Carousel>
      </Reveal>
    </section>
  );
}
