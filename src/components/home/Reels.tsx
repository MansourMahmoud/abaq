import { useRef } from 'react';
import { LuPlus } from 'react-icons/lu';
import { products } from '../../data/catalog';
import { clipPoster, clipSrc, clips, type Clip } from '../../data/videos';
import { useI18n } from '../../i18n/I18nProvider';
import { useCart } from '../../lib/cart';

const reelClips = clips.filter((clip) => clip.orientation === 'portrait');

function Reel({ clip }: { clip: Clip }) {
  const { t, pick, money } = useI18n();
  const { add } = useCart();
  const video = useRef<HTMLVideoElement>(null);
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
    <article className="reel">
      <button className="reel__media" type="button" aria-label={`${t('video.play')}: ${pick(clip.title)}`} onMouseEnter={start} onMouseLeave={stop} onFocus={start} onBlur={stop} onClick={toggle}>
        <video ref={video} src={clipSrc(clip)} poster={clipPoster(clip)} preload="none" muted loop playsInline />
        <span className="reel__tag">{pick(clip.title)}</span>
      </button>
      <div className="reel__product">
        <p>
          <span>{pick(product.name)}</span>
          <span className="reel__price">{money(product.price)}</span>
        </p>
        <button className="icon-button" type="button" aria-label={`${t('action.addToCart')}: ${pick(product.name)}`} onClick={() => add(product.id)}>
          <LuPlus aria-hidden />
        </button>
      </div>
    </article>
  );
}

/** Short vertical clips, each tied to a product. Scrolls sideways on phones. */
export function Reels() {
  const { t } = useI18n();
  return (
    <section className="section section--flush-top">
      <div className="container">
        <div className="section__head">
          <div>
            <p className="eyebrow">{t('reels.eyebrow')}</p>
            <h2 className="section__title">{t('reels.title')}</h2>
          </div>
        </div>
        <ul className="reels">
          {reelClips.map((clip) => (
            <li key={clip.file}>
              <Reel clip={clip} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
