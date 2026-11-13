import { FaInstagram } from 'react-icons/fa6';
import { gallery } from '../../data/home';
import { useI18n } from '../../i18n/I18nProvider';
import { Picture } from '../ui/Picture';
import { Reveal } from '../ui/Reveal';

/** Customer photo wall linking to the store's Instagram account. */
export function Gallery() {
  const { pick } = useI18n();
  return (
    <section className="section section--flush-top">
      <Reveal className="container">
        <div className="section__head">
          <div>
            <p className="eyebrow">{pick(gallery.eyebrow)}</p>
            <h2 className="section__title">{pick(gallery.title)}</h2>
          </div>
          <a className="link inline-flex items-center gap-2" href={gallery.href} target="_blank" rel="noopener noreferrer">
            <FaInstagram aria-hidden /> <bdi dir="ltr">{gallery.handle}</bdi>
          </a>
        </div>
        {/* The first photo takes a 2×2 cell on wide screens, so the wall is not a plain row. */}
        <ul className="grid grid-cols-3 gap-2 md:grid-cols-4 md:gap-3">
          {gallery.photos.slice(0, 5).map((photo, index) => (
            <li key={photo} className={index === 0 ? 'col-span-2 row-span-2' : undefined}>
              <a href={gallery.href} target="_blank" rel="noopener noreferrer" aria-label={`Instagram ${gallery.handle}`} className="group relative block aspect-square h-full w-full overflow-hidden rounded-md">
                <Picture photo={photo} alt="" sizes={index === 0 ? '(min-width: 768px) 50vw, 66vw' : '(min-width: 768px) 25vw, 33vw'} />
                <span className="absolute inset-0 grid place-items-center bg-black/45 text-3xl text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <FaInstagram aria-hidden />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
