import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { LuMaximize, LuPause, LuPlay, LuPlus, LuVolume2, LuVolumeX } from 'react-icons/lu';
import { products } from '../../data/catalog';
import { clipPoster, clipSrc, clips } from '../../data/videos';
import { useI18n } from '../../i18n/I18nProvider';
import { useCart } from '../../lib/cart';
import { Picture } from '../ui/Picture';
import { Reveal } from '../ui/Reveal';

/** Landscape clips first; portrait ones follow, letter-boxed in the stage. */
const playlist = [...clips].sort((a, b) => Number(a.orientation === 'portrait') - Number(b.orientation === 'portrait'));

/** Seconds as m:ss. */
function clock(seconds: number): string {
  const whole = Math.floor(seconds);
  return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, '0')}`;
}

/**
 * "Watch, then shop": a player with its own controls, a playlist, and the
 * product shown in the selected clip pinned over the video. Nothing downloads
 * until the shopper presses play (`preload="none"`); after that, clips advance
 * through the playlist on their own.
 */
export function VideoShowcase() {
  const { t, pick, money } = useI18n();
  const { add } = useCart();
  const stage = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  /** Whether the next clip should start playing once it is mounted. */
  const continuePlaying = useRef(false);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [time, setTime] = useState(0);

  const clip = playlist[index];
  const product = products.find((entry) => entry.id === clip.productId)!;

  useEffect(() => {
    setTime(0);
    if (continuePlaying.current) void video.current?.play();
  }, [index]);

  const select = (next: number) => {
    continuePlaying.current = playing || next !== index;
    setIndex(next);
  };

  const toggle = () => {
    const element = video.current;
    if (!element) return;
    if (element.paused) void element.play();
    else element.pause();
  };

  const seek = (seconds: number) => {
    if (video.current) video.current.currentTime = seconds;
    setTime(seconds);
  };

  const controlButton = 'grid h-11 w-11 shrink-0 place-items-center rounded-pill bg-transparent text-lg text-text transition-colors duration-300 hover:bg-accent hover:text-on-accent';

  return (
    <section className="section">
      <Reveal className="container">
        <div className="section__head">
          <div>
            <p className="eyebrow">{t('video.eyebrow')}</p>
            <h2 className="section__title">{t('video.title')}</h2>
          </div>
          <p className="max-w-[46ch] text-muted">{t('video.lead')}</p>
        </div>

        <div className="cinema grid gap-3 rounded-lg bg-bg p-3 md:gap-4 md:p-4 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div ref={stage} className="group relative aspect-video overflow-hidden rounded-md bg-black">
            {/* `key` remounts the element so each clip starts from its own poster. */}
            <video
              key={clip.file}
              ref={video}
              className={`h-full w-full ${clip.orientation === 'portrait' ? 'object-contain' : 'object-cover'}`}
              src={clipSrc(clip)}
              poster={clipPoster(clip)}
              preload="none"
              muted={muted}
              playsInline
              onClick={toggle}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onTimeUpdate={(event) => setTime(event.currentTarget.currentTime)}
              onEnded={() => select((index + 1) % playlist.length)}
            />

            <span className="pointer-events-none absolute start-3 top-3 rounded-pill bg-black/60 px-3 py-1 text-xs backdrop-blur md:start-4 md:top-4 md:text-sm">
              {pick(clip.title)}
            </span>

            {!playing && (
              <button
                type="button"
                aria-label={`${t('video.play')}: ${pick(clip.title)}`}
                onClick={toggle}
                className="absolute inset-0 m-auto grid h-20 w-20 place-items-center rounded-pill bg-accent text-3xl text-on-accent shadow-[0_0_0_10px_rgb(212_175_114/0.25)] transition-transform duration-500 ease-theme hover:scale-110 md:h-24 md:w-24"
              >
                <LuPlay aria-hidden className="translate-x-0.5 rtl:-translate-x-0.5" />
              </button>
            )}

            {/* Product in the clip: pinned above the controls on wider screens. */}
            <div className="absolute bottom-20 end-4 hidden w-72 items-center gap-3 rounded-md border border-accent/40 bg-black/70 p-2.5 backdrop-blur md:flex">
              <Link to={`/product/${product.slug}`} className="h-16 w-14 shrink-0 overflow-hidden rounded-sm">
                <Picture photo={product.photos[0]} alt="" sizes="56px" />
              </Link>
              <p className="grid min-w-0 flex-1 leading-snug">
                <span className="text-xs text-accent">{t('video.inThisVideo')}</span>
                <Link to={`/product/${product.slug}`} className="truncate font-display text-lg font-bold transition-colors hover:text-accent">
                  {pick(product.name)}
                </Link>
                <span className="text-sm">{money(product.price)}</span>
              </p>
              <button type="button" aria-label={`${t('action.addToCart')}: ${pick(product.name)}`} onClick={() => add(product)} className="grid h-11 w-11 shrink-0 place-items-center rounded-pill bg-accent text-lg text-on-accent transition-colors duration-300 hover:bg-text hover:text-bg">
                <LuPlus aria-hidden />
              </button>
            </div>

            <div className="absolute inset-x-0 bottom-0 flex items-center gap-1 bg-gradient-to-t from-black/85 to-transparent px-2 pb-2 pt-10 md:gap-2 md:px-4 md:pb-3" dir="ltr">
              <button type="button" className={controlButton} aria-label={playing ? t('video.pause') : t('video.play')} onClick={toggle}>
                {playing ? <LuPause aria-hidden /> : <LuPlay aria-hidden />}
              </button>
              <span className="w-[5.5rem] shrink-0 text-center text-xs tabular-nums text-white/85 md:text-sm">
                {clock(time)} / {clock(clip.seconds)}
              </span>
              <input
                type="range"
                className="cinema__seek min-w-0 flex-1"
                aria-label={t('video.seek')}
                min={0}
                max={clip.seconds}
                step={0.1}
                value={Math.min(time, clip.seconds)}
                style={{ '--progress': `${Math.min(100, (time / clip.seconds) * 100)}%` } as React.CSSProperties}
                onChange={(event) => seek(Number(event.target.value))}
              />
              <button type="button" className={controlButton} aria-label={muted ? t('video.unmute') : t('video.mute')} onClick={() => setMuted(!muted)}>
                {muted ? <LuVolumeX aria-hidden /> : <LuVolume2 aria-hidden />}
              </button>
              <button type="button" className={`${controlButton} hidden sm:grid`} aria-label={t('video.fullscreen')} onClick={() => void stage.current?.requestFullscreen?.()}>
                <LuMaximize aria-hidden />
              </button>
            </div>
          </div>

          <aside className="flex min-w-0 flex-col gap-3">
            <p className="flex items-center justify-between px-1 text-sm">
              <span className="font-semibold">{t('video.upNext')}</span>
              <span className="text-muted">
                {index + 1} / {playlist.length}
              </span>
            </p>
            {/* A row that scrolls sideways on phones, a column beside the stage on desktop. */}
            <div className="relative min-h-0 lg:flex-1">
              <ul className="cinema__list flex gap-2 overflow-x-auto lg:absolute lg:inset-0 lg:flex-col lg:overflow-y-auto lg:overflow-x-hidden">
              {playlist.map((entry, entryIndex) => {
                const active = entryIndex === index;
                const entryProduct = products.find((candidate) => candidate.id === entry.productId)!;
                return (
                  <li key={entry.file} className="w-56 shrink-0 lg:w-auto">
                    <button
                      type="button"
                      aria-pressed={active}
                      onClick={() => select(entryIndex)}
                      className={`flex w-full items-center gap-3 rounded-sm border p-2 text-start transition-colors duration-300 hover:border-accent ${active ? 'border-accent bg-raise' : 'border-transparent bg-surface'}`}
                    >
                      <span className="relative h-14 w-24 shrink-0 overflow-hidden rounded-[8px] bg-black">
                        <img src={clipPoster(entry)} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
                        <span className="absolute bottom-1 end-1 rounded bg-black/75 px-1 text-[0.65rem] tabular-nums">{clock(entry.seconds)}</span>
                      </span>
                      <span className="grid min-w-0 leading-snug">
                        <span className="truncate text-sm font-semibold">{pick(entry.title)}</span>
                        <span className="truncate text-xs text-muted">{pick(entryProduct.name)}</span>
                        {active && (
                          <span className="mt-0.5 flex items-center gap-1.5 text-xs text-accent">
                            <span className="cinema__bars" data-playing={playing} aria-hidden>
                              <i />
                              <i />
                              <i />
                            </span>
                            {t('video.nowPlaying')}
                          </span>
                        )}
                      </span>
                    </button>
                  </li>
                );
              })}
              </ul>
            </div>
          </aside>
        </div>

        {/* Phones: the product card sits under the player instead of over it. */}
        <div className="mt-3 flex items-center gap-3 rounded-md border border-line bg-surface p-3 md:hidden">
          <Link to={`/product/${product.slug}`} className="h-16 w-14 shrink-0 overflow-hidden rounded-sm">
            <Picture photo={product.photos[0]} alt="" sizes="56px" />
          </Link>
          <p className="grid min-w-0 flex-1 leading-snug">
            <span className="text-xs text-accent">{t('video.inThisVideo')}</span>
            <Link to={`/product/${product.slug}`} className="truncate font-display text-lg font-bold">
              {pick(product.name)}
            </Link>
            <span className="text-sm">{money(product.price)}</span>
          </p>
          <button className="button !min-h-[44px] !px-5 text-sm" type="button" onClick={() => add(product)}>
            {t('action.addToCart')}
          </button>
        </div>
      </Reveal>
    </section>
  );
}
