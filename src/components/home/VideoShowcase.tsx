import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { LuPlay } from 'react-icons/lu';
import { products } from '../../data/catalog';
import { clipPoster, clipSrc, clips } from '../../data/videos';
import { useI18n } from '../../i18n/I18nProvider';
import { useCart } from '../../lib/cart';

const showcaseClips = clips.filter((clip) => clip.orientation === 'landscape');
// Portrait clips are offered here too, letter-boxed, so the playlist shows how a longer list behaves.
const playlist = [...showcaseClips, ...clips.filter((clip) => clip.orientation === 'portrait').slice(0, 2)];

/**
 * "Watch, then shop": a player with a small playlist, and beside it the
 * product shown in the selected clip. Nothing is downloaded until the shopper
 * presses play (`preload="none"`), so the section costs one poster image.
 */
export function VideoShowcase() {
  const { t, pick, money } = useI18n();
  const { add } = useCart();
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const video = useRef<HTMLVideoElement>(null);

  const clip = playlist[index];
  const product = products.find((entry) => entry.id === clip.productId)!;

  const select = (next: number) => {
    setIndex(next);
    setPlaying(false);
  };

  const play = () => {
    setPlaying(true);
    void video.current?.play();
  };

  return (
    <section className="section section--flush-top">
      <div className="container video-showcase">
        <div className="video-showcase__stage">
          <div className="video-showcase__player" data-orientation={clip.orientation}>
            {/* `key` remounts the element so the new clip starts from its poster. */}
            <video
              key={clip.file}
              ref={video}
              src={clipSrc(clip)}
              poster={clipPoster(clip)}
              preload="none"
              muted
              loop
              playsInline
              controls={playing}
              onPause={() => setPlaying(false)}
              onPlay={() => setPlaying(true)}
            />
            {!playing && (
              <button className="video-showcase__play" type="button" aria-label={`${t('video.play')}: ${pick(clip.title)}`} onClick={play}>
                <LuPlay aria-hidden />
              </button>
            )}
          </div>
          <ul className="video-showcase__playlist">
            {playlist.map((entry, entryIndex) => (
              <li key={entry.file}>
                <button type="button" aria-pressed={entryIndex === index} onClick={() => select(entryIndex)}>
                  <img src={clipPoster(entry)} alt="" loading="lazy" decoding="async" />
                  <span>{pick(entry.title)}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="video-showcase__panel">
          <p className="eyebrow">{t('video.eyebrow')}</p>
          <h2 className="section__title">{t('video.title')}</h2>
          <p className="text-muted">{t('video.lead')}</p>
          <div className="video-showcase__product">
            <p className="text-muted">{pick(product.family)}</p>
            <Link className="video-showcase__name" to={`/product/${product.slug}`}>
              {pick(product.name)}
            </Link>
            <p className="product-card__price">{money(product.price)}</p>
          </div>
          <button className="button" type="button" onClick={() => add(product)}>
            {t('action.addToCart')}
          </button>
        </div>
      </div>
    </section>
  );
}
