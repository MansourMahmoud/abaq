import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { LuPlay, LuPlus } from 'react-icons/lu';
import { products } from '../../data/catalog';
import { clipPoster, clipSrc, clips, type Clip } from '../../data/videos';
import { useI18n } from '../../i18n/I18nProvider';
import { useCart } from '../../lib/cart';
import { Carousel } from '../ui/Carousel';
import { Picture } from '../ui/Picture';
import { Reveal } from '../ui/Reveal';

/** Portrait clips lead; landscape ones are centre-cropped to the same tall frame. */
const reelClips = [...clips].sort((a, b) => Number(a.orientation !== 'portrait') - Number(b.orientation !== 'portrait'));

function Reel({ clip }: { clip: Clip }) {
  const { t, pick, money } = useI18n();
  const { add } = useCart();
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const product = products.find((entry) => entry.id === clip.productId)!;

  // Plays while hovered or focused and rewinds on leave; on touch devices a
  // tap toggles playback. The file is only requested on first play.
  const start = () => void video.current?.play();
  const stop = () => {
    if (!video.current) return;
    video.current.pause();
    video.current.currentTime = 0;
  };
  const toggle = () => (video.current?.paused ? start() : stop());

  return (
    <article className="reel" data-playing={playing}>
      {/* Story-style progress line across the top of the clip. */}
      <span className="reel__progress" aria-hidden>
        <span style={{ inlineSize: `${progress * 100}%` }} />
      </span>
      <button className="reel__media" type="button" aria-label={`${t('video.play')}: ${pick(clip.title)}`} onMouseEnter={start} onMouseLeave={stop} onFocus={start} onBlur={stop} onClick={toggle}>
        <video
          ref={video}
          src={clipSrc(clip)}
          poster={clipPoster(clip)}
          preload="none"
          muted
          loop
          playsInline
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onTimeUpdate={(event) => setProgress(event.currentTarget.duration ? event.currentTarget.currentTime / event.currentTarget.duration : 0)}
        />
        <span className="reel__shade" />
        <span className="reel__tag">{pick(clip.title)}</span>
        <span className="reel__play">
          <LuPlay aria-hidden />
        </span>
      </button>
      <div className="reel__product">
        <Link className="reel__thumb" to={`/product/${product.slug}`} tabIndex={-1} aria-hidden>
          <Picture photo={product.photos[0]} alt="" sizes="44px" />
        </Link>
        <p>
          <Link to={`/product/${product.slug}`}>{pick(product.name)}</Link>
          <span className="reel__price">{money(product.price)}</span>
        </p>
        <button className="icon-button" type="button" aria-label={`${t('action.addToCart')}: ${pick(product.name)}`} onClick={() => add(product)}>
          <LuPlus aria-hidden />
        </button>
      </div>
    </article>
  );
}

/** Short vertical clips, each tied to a product. Any number of clips fits: the row scrolls. */
export function Reels() {
  const { t } = useI18n();
  return (
    <section className="section section--flush-top">
      <Reveal className="container">
        <div className="section__head">
          <div>
            <p className="eyebrow">{t('reels.eyebrow')}</p>
            <h2 className="section__title">{t('reels.title')}</h2>
          </div>
        </div>
        <Carousel label={t('reels.title')} variant="reels">
          {reelClips.map((clip) => (
            <Reel key={clip.file} clip={clip} />
          ))}
        </Carousel>
      </Reveal>
    </section>
  );
}
