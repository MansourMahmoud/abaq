import { useRef } from 'react';
import { FaTiktok } from 'react-icons/fa6';
import { LuPlay } from 'react-icons/lu';
import { tiktok } from '../../data/home';
import { clipPoster, clipSrc, clips } from '../../data/videos';
import { useI18n } from '../../i18n/I18nProvider';
import { Carousel } from '../ui/Carousel';
import { Reveal } from '../ui/Reveal';

type Video = (typeof tiktok.videos)[number];

/** One TikTok tile: previews on hover or focus, opens the account when pressed. */
function Tile({ video }: { video: Video }) {
  const { t, pick } = useI18n();
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
      className="scope-dark group relative block aspect-[9/16] overflow-hidden rounded-lg bg-black text-white"
      onMouseEnter={start}
      onMouseLeave={stop}
      onFocus={start}
      onBlur={stop}
    >
      <video ref={element} className="h-full w-full object-cover" src={clipSrc(clip)} poster={clipPoster(clip)} preload="none" muted loop playsInline />
      <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
      <FaTiktok className="absolute end-3 top-3 text-xl drop-shadow" aria-hidden />
      <span className="absolute inset-0 m-auto grid h-14 w-14 place-items-center rounded-pill bg-white/20 text-xl backdrop-blur transition-opacity duration-700 ease-theme group-hover:opacity-0">
        <LuPlay className="fill-white" aria-hidden />
      </span>
      <span className="absolute inset-x-3 bottom-3 grid gap-1 leading-snug">
        <span className="font-semibold">{pick(video.caption)}</span>
        <span className="inline-flex items-center gap-1.5 text-xs text-white/80">
          <LuPlay className="fill-current" aria-hidden /> {pick(video.views)} {t('social.views')}
        </span>
      </span>
    </a>
  );
}

/** TikTok section: the account's most watched videos in a row that scrolls. */
export function TikTokFeed() {
  const { t, pick } = useI18n();
  return (
    <section className="section section--flush-top">
      <Reveal className="container">
        <div className="section__head">
          <div>
            <p className="eyebrow">{pick(tiktok.eyebrow)}</p>
            <h2 className="section__title">{pick(tiktok.title)}</h2>
          </div>
          <a className="button button--ghost" href={tiktok.href} target="_blank" rel="noopener noreferrer">
            <FaTiktok aria-hidden /> {t('social.follow')} <bdi dir="ltr">{tiktok.handle}</bdi>
          </a>
        </div>
        <Carousel label={pick(tiktok.title)} variant="reels">
          {tiktok.videos.map((video) => (
            <Tile key={video.file} video={video} />
          ))}
        </Carousel>
      </Reveal>
    </section>
  );
}
