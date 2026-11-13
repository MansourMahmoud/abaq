import { Link } from 'react-router-dom';
import { LuArrowLeft, LuArrowRight, LuGift } from 'react-icons/lu';
import { occasions } from '../../data/home';
import { useI18n } from '../../i18n/I18nProvider';
import { Carousel } from '../ui/Carousel';
import { Picture } from '../ui/Picture';
import { Reveal } from '../ui/Reveal';

/** "A gift for every occasion": photo tiles that lead to the matching collection. */
export function Occasions() {
  const { t, pick, dir } = useI18n();
  const Arrow = dir === 'rtl' ? LuArrowLeft : LuArrowRight;
  return (
    <section className="section section--flush-top">
      <Reveal className="container">
        <div className="section__head">
          <div>
            <p className="eyebrow">{t('occasions.eyebrow')}</p>
            <h2 className="section__title">{t('occasions.title')}</h2>
          </div>
          <Link className="link" to="/category/gifts">
            {t('nav.viewAll')}
          </Link>
        </div>
        <Carousel label={t('occasions.title')} variant="tiles">
          {occasions.map((occasion) => (
            <Link key={occasion.name.en} to={occasion.to} className="occasion">
              <Picture photo={occasion.photo} alt="" sizes="(min-width: 1200px) 18vw, 42vw" />
              <span className="occasion__icon">
                <LuGift aria-hidden />
              </span>
              <span className="occasion__text">
                <strong>{pick(occasion.name)}</strong>
                <span>{pick(occasion.hint)}</span>
                <span className="occasion__cta">
                  {t('action.shopNow')} <Arrow aria-hidden />
                </span>
              </span>
            </Link>
          ))}
        </Carousel>
      </Reveal>
    </section>
  );
}
