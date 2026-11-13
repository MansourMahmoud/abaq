import { FaInstagram } from 'react-icons/fa6';
import { LuHeart, LuMessageCircle } from 'react-icons/lu';
import { instagram } from '../../data/home';
import { useI18n } from '../../i18n/I18nProvider';
import { LogoMark } from '../ui/Logo';
import { Picture } from '../ui/Picture';
import { Reveal } from '../ui/Reveal';

/** Instagram's brand gradient, used for the rings around the avatar and highlights. */
const RING = 'bg-[conic-gradient(from_210deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5,#feda75)]';

/**
 * Instagram section laid out like the account's profile: avatar, handle,
 * figures and a follow button; a row of story highlights; then a wall of
 * posts where the first is featured at double size. Hovering a post shows
 * its likes and comments; every tile opens the account.
 */
export function InstagramFeed() {
  const { t, pick, number } = useI18n();
  return (
    <section className="section">
      <Reveal className="container">
        <div className="rounded-lg border border-line bg-surface p-4 md:p-7">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-5">
            <div className="flex min-w-0 flex-1 items-center gap-4">
              <span className={`grid h-20 w-20 shrink-0 place-items-center rounded-pill p-[3px] md:h-24 md:w-24 ${RING}`}>
                <span className="grid h-full w-full place-items-center rounded-pill border-[3px] border-surface bg-[#15110e] text-[#d4af72]">
                  <LogoMark className="h-10 w-10" />
                </span>
              </span>
              <div className="grid min-w-0 gap-0.5">
                <p className="eyebrow">{pick(instagram.eyebrow)}</p>
                <h2 className="font-display text-2xl font-bold leading-[var(--lh-display)] md:text-3xl">{pick(instagram.title)}</h2>
                <p className="text-sm text-muted">
                  <bdi dir="ltr" className="font-semibold text-text">
                    {instagram.handle}
                  </bdi>{' '}
                  · {pick(instagram.bio)}
                </p>
              </div>
            </div>
            <dl className="flex gap-8">
              {instagram.stats.map((stat) => (
                <div key={stat.label.en} className="grid text-center">
                  <dd className="m-0 text-xl font-bold md:text-2xl">{pick(stat.value)}</dd>
                  <dt className="text-sm text-muted">{pick(stat.label)}</dt>
                </div>
              ))}
            </dl>
            <a className="button" href={instagram.href} target="_blank" rel="noopener noreferrer">
              <FaInstagram aria-hidden /> {t('social.follow')}
            </a>
          </div>

          <ul className="subcategory-row mt-6 flex gap-5 overflow-x-auto border-y border-line py-4">
            {instagram.highlights.map((highlight) => (
              <li key={highlight.label.en} className="shrink-0">
                <a href={instagram.href} target="_blank" rel="noopener noreferrer" className="group grid w-[76px] justify-items-center gap-1.5 text-center text-xs">
                  <span className={`block h-[68px] w-[68px] rounded-pill p-[2px] ${RING}`}>
                    <span className="block h-full w-full overflow-hidden rounded-pill border-[3px] border-surface">
                      <Picture photo={highlight.photo} alt="" sizes="68px" />
                    </span>
                  </span>
                  <span className="w-full truncate transition-colors duration-300 group-hover:text-accent">{pick(highlight.label)}</span>
                </a>
              </li>
            ))}
          </ul>

          {/* Six columns; the first post takes a 2×2 cell so the wall has a focal point. */}
          <ul className="mt-5 grid grid-cols-3 gap-2 md:grid-cols-6 md:gap-3">
            {instagram.posts.slice(0, 5).map((post, index) => (
              <li key={post.photo} className={index === 0 ? 'col-span-2 row-span-2' : 'md:col-span-2'}>
                <a href={instagram.href} target="_blank" rel="noopener noreferrer" aria-label={`Instagram ${instagram.handle}`} className={`group relative block h-full overflow-hidden rounded-md ${index === 0 ? 'aspect-square md:aspect-auto' : 'aspect-square md:aspect-[2/1]'}`}>
                  <Picture photo={post.photo} alt="" sizes={index === 0 ? '(min-width: 768px) 33vw, 66vw' : '33vw'} />
                  <span className="absolute inset-0 flex items-center justify-center gap-4 bg-black/55 text-sm font-semibold text-white opacity-0 transition-opacity duration-700 ease-theme group-hover:opacity-100 group-focus-visible:opacity-100">
                    <span className="inline-flex items-center gap-1.5">
                      <LuHeart className="fill-white" aria-hidden /> {number(post.likes)}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <LuMessageCircle className="fill-white" aria-hidden /> {number(post.comments)}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
