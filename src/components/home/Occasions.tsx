import { Link } from 'react-router-dom';
import { occasions } from '../../data/home';
import { useI18n } from '../../i18n/I18nProvider';
import { Carousel } from '../ui/Carousel';
import { Picture } from '../ui/Picture';
import { Reveal } from '../ui/Reveal';

/** "A gift for every occasion": photo tiles that lead to the matching collection. */
export function Occasions() {
  const { t, pick } = useI18n();
  return (
    <section className="section section--flush-top">
      <Reveal className="container">
        <div className="section__head">
          <div>
            <p className="eyebrow">{t('occasions.eyebrow')}</p>
            <h2 className="section__title">{t('occasions.title')}</h2>
          </div>
        </div>
        <Carousel label={t('occasions.title')} variant="tiles">
          {occasions.map((occasion) => (
            <Link key={occasion.name.en} to={occasion.to} className="scope-dark media-zoom group relative block aspect-[3/4] rounded-lg text-white">
              <Picture photo={occasion.photo} alt="" sizes="(min-width: 1200px) 18vw, 42vw" />
              <span className="absolute inset-0 flex flex-col justify-end gap-1 bg-gradient-to-t from-black/85 via-black/10 to-transparent p-4">
                <strong className="font-display text-2xl leading-snug">{pick(occasion.name)}</strong>
                <span className="text-sm text-white/80">{pick(occasion.hint)}</span>
                <span className="mt-2 w-fit rounded-pill border border-white/60 px-3 py-1 text-xs transition-colors duration-500 group-hover:border-[#d4af72] group-hover:bg-[#d4af72] group-hover:text-black">{t('action.shopNow')}</span>
              </span>
            </Link>
          ))}
        </Carousel>
      </Reveal>
    </section>
  );
}
