import { useRef, useState, type CSSProperties } from 'react';
import { LuPause, LuPlay, LuVolume2, LuVolumeX } from 'react-icons/lu';
import { clipPoster, clipSrc, type Clip } from '../../data/videos';
import { useI18n } from '../../i18n/I18nProvider';

interface ClipPlayerProps {
  clip: Clip;
  /** Start playing as soon as the player mounts (muted, as browsers require). */
  autoPlay?: boolean;
  className?: string;
}

/**
 * Compact video player with the store's own controls: play and pause, a seek
 * bar and mute. Used wherever a single clip is shown (the product gallery),
 * so shoppers never see the browser's default player chrome.
 */
export function ClipPlayer({ clip, autoPlay = false, className }: ClipPlayerProps) {
  const { t, pick } = useI18n();
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [time, setTime] = useState(0);

  const toggle = () => {
    const element = video.current;
    if (!element) return;
    if (element.paused) void element.play();
    else element.pause();
  };

  const button = 'grid h-10 w-10 shrink-0 place-items-center rounded-pill bg-transparent text-lg text-white transition-colors duration-200 hover:bg-white hover:text-black';

  return (
    <div className={`scope-dark group relative h-full w-full overflow-hidden bg-black ${className ?? ''}`}>
      <video
        ref={video}
        className="h-full w-full object-cover"
        src={clipSrc(clip)}
        poster={clipPoster(clip)}
        autoPlay={autoPlay}
        muted={muted}
        loop
        playsInline
        onClick={toggle}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(event) => setTime(event.currentTarget.currentTime)}
      />
      {!playing && (
        <button type="button" aria-label={`${t('video.play')}: ${pick(clip.title)}`} onClick={toggle} className="absolute inset-0 m-auto grid h-16 w-16 place-items-center rounded-pill bg-accent text-2xl text-on-accent transition-transform duration-300 ease-theme hover:scale-110">
          <LuPlay aria-hidden />
        </button>
      )}
      <div className="absolute inset-x-0 bottom-0 flex items-center gap-1 bg-gradient-to-t from-black/80 to-transparent px-2 pb-2 pt-8" dir="ltr">
        <button type="button" className={button} aria-label={playing ? t('video.pause') : t('video.play')} onClick={toggle}>
          {playing ? <LuPause aria-hidden /> : <LuPlay aria-hidden />}
        </button>
        <input
          type="range"
          className="cinema__seek min-w-0 flex-1"
          aria-label={t('video.seek')}
          min={0}
          max={clip.seconds}
          step={0.1}
          value={Math.min(time, clip.seconds)}
          style={{ '--progress': `${Math.min(100, (time / clip.seconds) * 100)}%` } as CSSProperties}
          onChange={(event) => {
            const seconds = Number(event.target.value);
            if (video.current) video.current.currentTime = seconds;
            setTime(seconds);
          }}
        />
        <button type="button" className={button} aria-label={muted ? t('video.unmute') : t('video.mute')} onClick={() => setMuted(!muted)}>
          {muted ? <LuVolumeX aria-hidden /> : <LuVolume2 aria-hidden />}
        </button>
      </div>
    </div>
  );
}
