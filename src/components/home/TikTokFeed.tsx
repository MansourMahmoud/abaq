import { useRef } from 'react';
import { FaTiktok } from 'react-icons/fa6';
import { LuHeart, LuPlay } from 'react-icons/lu';
import { tiktok } from '../../data/home';
import { clipPoster, clipSrc, clips } from '../../data/videos';
import { useI18n } from '../../i18n/I18nProvider';
import { Carousel } from '../ui/Carousel';
import { LogoMark } from '../ui/Logo';
import { Reveal } from '../ui/Reveal';

type Video = (typeof tiktok.videos)[number];

/** One TikTok tile: previews on hover or focus, opens the account when pressed. */
function Tile({ video, rank }: { video: Video; rank: number }) {
  const { pick, number } = useI18n();
  const element = useRef<HTMLVideoElement>(null);
  const clip = clips.find((entry) => entry.file === video.file);
  if (!clip) return null;

  const start = () => void element.current?.play();
  const stop = () => {
    if (!element.current) return;
    element.current.pause();
    element.current.currentTime = 0;
  };

  return (
    <a
      href={tiktok.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`TikTok: ${pick(video.caption)}`}
      className="tiktok-tile group relative block aspect-[9/16] overflow-hidden rounded-lg bg-black text-white"
      onMouseEnter={start}
      onMouseLeave={stop}
      onFocus={start}
      onBlur={stop}
    >
      <video ref={element} className="h-full w-full object-cover" src={clipSrc(clip)} poster={clipPoster(clip)} preload="none" muted loop playsInline />
      <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/35" />
      <span className="absolute start-3 top-3 grid h-8 min-w-8 place-items-center rounded-pill bg-white/15 px-2 text-sm font-bold backdrop-blur">{number(rank)}</span>
      <FaTiktok className="tiktok-glyph absolute end-3 top-3 text-xl" aria-hidden />
      <span className="absolute inset-0 m-auto grid h-14 w-14 place-items-center rounded-pill bg-white/20 text-xl backdrop-blur transition-opacity duration-700 ease-theme group-hover:opacity-0">
        <LuPlay className="fill-white" aria-hidden />
      </span>
      <span className="absolute inset-x-3 bottom-3 grid gap-1.5 leading-snug">
        <span className="font-semibold">{pick(video.caption)}</span>
        <span className="flex items-center gap-4 text-xs text-white/85">
          <span className="inline-flex items-center gap-1.5">
            <LuPlay className="fill-current" aria-hidden /> {pick(video.views)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <LuHeart className="fill-current" aria-hidden /> {pick(video.likes)}
          </span>
        </span>
      </span>
    </a>
  );
}

/**
 * TikTok section on a dark band: the account's profile beside its most
 * watched videos, ranked, in a row that scrolls.
 */
export function TikTokFeed() {
  const { t, pick } = useI18n();
  return (
    <section className="section scope-dark tiktok">
      <Reveal className="container grid items-center gap-8 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-10">
        <div className="grid gap-4">
          <div className="flex items-center gap-4">
            <span className="tiktok-ring grid h-[72px] w-[72px] shrink-0 place-items-center rounded-pill p-[3px]">
              <span className="grid h-full w-full place-items-center rounded-pill bg-[#15110e] text-[#d4af72]">
                <LogoMark className="h-9 w-9" />
              </span>
            </span>
            <p className="grid min-w-0 leading-snug">
              <bdi dir="ltr" className="flex items-center gap-2 text-lg font-semibold">
                <FaTiktok className="tiktok-glyph" aria-hidden /> {tiktok.handle}
              </bdi>
              <span className="text-sm text-muted">{pick(tiktok.eyebrow)}</span>
            </p>
          </div>
          <h2 className="font-display text-3xl font-bold leading-[var(--lh-display)] md:text-4xl">{pick(tiktok.title)}</h2>
          <p className="text-soft">{pick(tiktok.text)}</p>
          <dl className="flex gap-8 border-y border-line py-4">
            {tiktok.stats.map((stat) => (
              <div key={stat.label.en} className="grid">
                <dd className="m-0 text-xl font-bold">{pick(stat.value)}</dd>
                <dt className="text-sm text-muted">{pick(stat.label)}</dt>
              </div>
            ))}
          </dl>
          <a className="button w-full sm:w-fit" href={tiktok.href} target="_blank" rel="noopener noreferrer">
            <FaTiktok aria-hidden /> {t('social.follow')}
          </a>
        </div>

        <div className="min-w-0">
          <Carousel label={pick(tiktok.title)} variant="deals">
            {tiktok.videos.map((video, index) => (
              <Tile key={video.file} video={video} rank={index + 1} />
            ))}
          </Carousel>
        </div>
      </Reveal>
    </section>
  );
}
