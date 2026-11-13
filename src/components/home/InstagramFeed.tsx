import { FaInstagram } from 'react-icons/fa6';
import { LuHeart, LuMessageCircle } from 'react-icons/lu';
import { instagram } from '../../data/home';
import { useI18n } from '../../i18n/I18nProvider';
import { LogoMark } from '../ui/Logo';
import { Picture } from '../ui/Picture';
import { Reveal } from '../ui/Reveal';

/**
 * Instagram section: the account's profile card beside a wall of its posts.
 * Hovering a post shows its likes and comments; every tile opens the account.
 */
export function InstagramFeed() {
  const { t, pick, number } = useI18n();
  return (
    <section className="section section--flush-top">
      <Reveal className="container grid gap-5 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-6">
        <div className="grid content-between gap-6 rounded-lg border border-line bg-surface p-6">
          <div className="grid gap-4">
            <div className="flex items-center gap-4">
              {/* Ring in Instagram's gradient around the store mark. */}
              <span className="grid h-[72px] w-[72px] shrink-0 place-items-center rounded-pill bg-[conic-gradient(from_210deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5,#feda75)] p-[3px]">
                <span className="grid h-full w-full place-items-center rounded-pill bg-[#15110e] text-[#d4af72]">
                  <LogoMark className="h-9 w-9" />
                </span>
              </span>
              <p className="grid min-w-0 leading-snug">
                <bdi dir="ltr" className="truncate text-lg font-semibold">
                  {instagram.handle}
                </bdi>
                <span className="text-sm text-muted">{pick(instagram.eyebrow)}</span>
              </p>
            </div>
            <h2 className="font-display text-3xl font-bold leading-[var(--lh-display)]">{pick(instagram.title)}</h2>
            <p className="text-soft">{pick(instagram.bio)}</p>
            <dl className="flex gap-8 border-y border-line py-4">
              {instagram.stats.map((stat) => (
                <div key={stat.label.en} className="grid">
                  <dd className="m-0 text-xl font-bold">{pick(stat.value)}</dd>
                  <dt className="text-sm text-muted">{pick(stat.label)}</dt>
                </div>
              ))}
            </dl>
          </div>
          <a className="button w-full" href={instagram.href} target="_blank" rel="noopener noreferrer">
            <FaInstagram aria-hidden /> {t('social.follow')}
          </a>
        </div>

        <ul className="grid grid-cols-3 gap-2 md:gap-3">
          {instagram.posts.map((post) => (
            <li key={post.photo}>
              <a href={instagram.href} target="_blank" rel="noopener noreferrer" aria-label={`Instagram ${instagram.handle}`} className="group relative block aspect-square overflow-hidden rounded-md">
                <Picture photo={post.photo} alt="" sizes="(min-width: 1024px) 22vw, 33vw" />
                <span className="absolute inset-0 flex items-center justify-center gap-4 bg-black/55 text-sm font-semibold text-white opacity-0 transition-opacity duration-700 ease-theme group-hover:opacity-100 group-focus-visible:opacity-100">
                  <span className="inline-flex items-center gap-1.5">
                    <LuHeart className="fill-white" aria-hidden /> {number(post.likes)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <LuMessageCircle className="fill-white" aria-hidden /> {number(post.comments)}
                  </span>
                </span>
                <FaInstagram className="absolute end-2 top-2 text-white drop-shadow" aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
