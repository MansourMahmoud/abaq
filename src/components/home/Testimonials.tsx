import { products } from '../../data/catalog';
import { reviews } from '../../data/content';
import { useI18n } from '../../i18n/I18nProvider';
import { Carousel } from '../ui/Carousel';
import { ReviewCard } from '../product/ReviewCard';
import { Reveal } from '../ui/Reveal';

export function Testimonials() {
  const { t } = useI18n();
  return (
    <section className="section">
      <Reveal className="container">
        <div className="section__head">
          <h2 className="section__title">{t('reviews.home')}</h2>
        </div>
        <Carousel label={t('reviews.home')} variant="cards">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} product={products.find((product) => product.id === review.productId)} />
          ))}
        </Carousel>
      </Reveal>
    </section>
  );
}
