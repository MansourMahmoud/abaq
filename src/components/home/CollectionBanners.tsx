import { Link } from 'react-router-dom';
import { LuArrowUpLeft, LuArrowUpRight } from 'react-icons/lu';
import { categories, productsInCategory } from '../../data/catalog';
import { useI18n } from '../../i18n/I18nProvider';
import { Picture } from '../ui/Picture';
import { Reveal } from '../ui/Reveal';

/** Categories promoted here; the first takes the tall cell. The merchant picks them. */
const FEATURED = ['oud', 'bakhoor', 'gifts'].flatMap((id) => categories.find((category) => category.id === id) ?? []);

/**
 * Three collection banners: one tall, two wide. Each carries the collection's
 * name as a label, its headline, a line of supporting text and a round arrow
 * button, over a shade deep enough to keep the text readable on any photo.
 */
export function CollectionBanners() {
  const { t, pick, number, dir } = useI18n();
  const Arrow = dir === 'rtl' ? LuArrowUpLeft : LuArrowUpRight;

  return (
    <section className="section section--flush-top">
      <Reveal className="container">
        <div className="section__head">
          <div>
            <p className="eyebrow">{t('collections.eyebrow')}</p>
            <h2 className="section__title">{t('collections.title')}</h2>
          </div>
        </div>
        <div className="banner-trio">
          {FEATURED.map((category, index) => (
            <Link key={category.id} className="collection" data-size={index === 0 ? 'tall' : undefined} to={`/category/${category.slug}`}>
              <Picture photo={category.banner?.photo ?? category.photo} alt="" sizes="(min-width: 900px) 50vw, 100vw" />
              <span className="collection__label">
                {pick(category.name)} · {t('category.count', { count: number(productsInCategory(category.id).length) })}
              </span>
              <span className="collection__text">
                <strong>{pick(category.banner?.title ?? category.name)}</strong>
                {category.description && <span>{pick(category.description)}</span>}
              </span>
              <span className="collection__arrow" aria-hidden>
                <Arrow />
              </span>
            </Link>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
