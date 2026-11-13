import { Link } from 'react-router-dom';
import { categories, type Category } from '../../data/catalog';
import { useI18n } from '../../i18n/I18nProvider';
import { useThemeSettings } from '../../settings/ThemeSettings';
import { Carousel } from '../ui/Carousel';
import { Picture } from '../ui/Picture';
import { Reveal } from '../ui/Reveal';

function CategoryArch({ category }: { category: Category }) {
  const { pick } = useI18n();
  return (
    <Link className="category-arch" to={`/category/${category.slug}`}>
      <span className="category-arch__frame media-zoom">
        <Picture photo={category.photo} alt="" sizes="(min-width: 1200px) 16vw, (min-width: 900px) 20vw, (min-width: 560px) 30vw, 44vw" />
      </span>
      <span className="category-arch__name">{pick(category.name)}</span>
      {category.tagline && <span className="category-arch__tagline">{pick(category.tagline)}</span>}
    </Link>
  );
}

/** Top-level categories as arch-framed cards, in a carousel or a grid. */
export function CategoryShowcase() {
  const { t } = useI18n();
  const layout = useThemeSettings().settings.home.categoriesLayout;
  const cards = categories.map((category) => <CategoryArch key={category.id} category={category} />);

  return (
    <section className="section">
      <Reveal className="container">
        <div className="section__head">
          <div>
            <h2 className="section__title">{t('home.shopByCategory')}</h2>
            <p className="text-muted">{t('home.categoriesLead')}</p>
          </div>
        </div>
        {layout === 'carousel' ? (
          <Carousel label={t('home.shopByCategory')} variant="categories">
            {cards}
          </Carousel>
        ) : (
          <div className="category-grid">{cards}</div>
        )}
      </Reveal>
    </section>
  );
}
