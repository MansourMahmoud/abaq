import { useState, type CSSProperties, type MouseEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import { LuBadgeCheck, LuGift, LuHeart, LuMinus, LuPlay, LuPlus, LuRefreshCw, LuTestTubeDiagonal, LuTruck } from 'react-icons/lu';
import type { IconType } from 'react-icons';
import { ProductRail } from '../components/product/ProductRail';
import { ReviewCard, Stars } from '../components/product/ReviewCard';
import { PaymentBadges } from '../components/ui/PaymentBadges';
import { Picture } from '../components/ui/Picture';
import { categories, findProduct, hasVariants, productDetails, relatedProducts } from '../data/catalog';
import { reviews } from '../data/content';
import { clipPoster, clipSrc, clips } from '../data/videos';
import { useI18n, type Localized } from '../i18n/I18nProvider';
import type { MessageKey } from '../i18n/messages';
import { useCart } from '../lib/cart';
import { NotFoundPage } from './NotFoundPage';

/** Price multipliers relative to the catalogue price (eau de parfum, 50 ml). */
const CONCENTRATIONS: { name: Localized; hint: Localized; factor: number }[] = [
  { name: { ar: 'أو دو بارفان', en: 'Eau de parfum' }, hint: { ar: 'ثبات ٦–٨ ساعات', en: 'Lasts 6–8 hours' }, factor: 1 },
  { name: { ar: 'بارفان', en: 'Parfum' }, hint: { ar: 'ثبات ٨–١٠ ساعات', en: 'Lasts 8–10 hours' }, factor: 1.19 },
  { name: { ar: 'إكستريه', en: 'Extrait' }, hint: { ar: 'ثبات +١٢ ساعة', en: 'Lasts 12+ hours' }, factor: 1.4 },
];

const SIZES: { name: Localized; factor: number }[] = [
  { name: { ar: '٣٠ مل', en: '30 ml' }, factor: 0.69 },
  { name: { ar: '٥٠ مل', en: '50 ml' }, factor: 1 },
  { name: { ar: '١٠٠ مل', en: '100 ml' }, factor: 1.31 },
];

const PERKS: { key: MessageKey; Icon: IconType }[] = [
  { key: 'product.perk.delivery', Icon: LuTruck },
  { key: 'product.perk.sample', Icon: LuTestTubeDiagonal },
  { key: 'product.perk.returns', Icon: LuRefreshCw },
  { key: 'product.perk.gift', Icon: LuGift },
];

/** Share of reviews per star, five stars first. Demo figures. */
const RATING_SPREAD = [82, 12, 4, 1, 1];
const REVIEW_COUNT = 128;
const MAX_QUANTITY = 9;

export function ProductPage() {
  const { slug = '' } = useParams();
  const { t, pick, money, number } = useI18n();
  const { add } = useCart();
  const product = findProduct(slug);

  const [media, setMedia] = useState(0);
  const [concentration, setConcentration] = useState(0);
  const [size, setSize] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [zoom, setZoom] = useState<CSSProperties>({});
  const [tab, setTab] = useState<'description' | 'reviews'>('description');

  if (!product) return <NotFoundPage title={t('product.notFound')} />;

  const details = productDetails(product.id);
  const variants = hasVariants(product);
  const clip = clips.find((entry) => entry.productId === product.id);
  const category = categories.find((entry) => product.categoryIds.includes(entry.id));
  const productReviews = reviews.filter((review) => review.productId === product.id);
  const shownReviews = productReviews.length > 0 ? productReviews : reviews.slice(0, 2);
  const name = pick(product.name);

  // Gallery entries: every photo, then the product's clip when it has one.
  const showingClip = clip !== undefined && media === product.photos.length;
  const priceFor = (sizeIndex: number) => Math.round((product.price * CONCENTRATIONS[concentration].factor * SIZES[sizeIndex].factor) / 5) * 5;
  const unitPrice = variants ? priceFor(size) : product.price;

  // Zoom follows the pointer by moving the transform origin under it.
  const trackPointer = (event: MouseEvent<HTMLDivElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    setZoom({ transform: 'scale(2)', transformOrigin: `${((event.clientX - box.left) / box.width) * 100}% ${((event.clientY - box.top) / box.height) * 100}%` });
  };

  const option = variants
    ? { ar: `${CONCENTRATIONS[concentration].name.ar} · ${SIZES[size].name.ar}`, en: `${CONCENTRATIONS[concentration].name.en} · ${SIZES[size].name.en}` }
    : undefined;
  const addToCart = () => add(product, { quantity, unitPrice, option });

  return (
    <>
      <section className="container product">
        <nav className="breadcrumb" aria-label={t('nav.breadcrumb')}>
          <Link to="/">{t('nav.home')}</Link>
          {category && <Link to={`/category/${category.slug}`}>{pick(category.name)}</Link>}
          <span aria-current="page">{name}</span>
        </nav>

        <div className="product__layout">
          <div className="gallery">
            <div className="gallery__stage" onMouseMove={showingClip ? undefined : trackPointer} onMouseLeave={() => setZoom({})} title={showingClip ? undefined : t('product.zoom')}>
              {showingClip && clip ? (
                <video src={clipSrc(clip)} poster={clipPoster(clip)} controls muted loop playsInline autoPlay />
              ) : (
                <img
                  src={`/media/img/${product.photos[media]}-1600.webp`}
                  srcSet={`/media/img/${product.photos[media]}-960.webp 960w, /media/img/${product.photos[media]}-1600.webp 1600w`}
                  sizes="(min-width: 960px) 50vw, 100vw"
                  alt={name}
                  fetchPriority="high"
                  style={zoom}
                />
              )}
              {product.badge && <span className="product-card__badge">{pick(product.badge)}</span>}
            </div>
            <ul className="gallery__thumbs">
              {product.photos.map((photo, index) => (
                <li key={photo}>
                  <button type="button" aria-label={t('product.image', { n: number(index + 1) })} aria-pressed={media === index} onClick={() => setMedia(index)}>
                    <Picture photo={photo} alt="" sizes="96px" />
                  </button>
                </li>
              ))}
              {clip && (
                <li>
                  <button type="button" aria-label={t('product.video')} aria-pressed={showingClip} onClick={() => setMedia(product.photos.length)}>
                    <img src={clipPoster(clip)} alt="" loading="lazy" />
                    <LuPlay className="gallery__play" aria-hidden />
                  </button>
                </li>
              )}
            </ul>
          </div>

          <div className="product__info">
            <div className="product__flags">
              <span className="flag flag--brand">{pick({ ar: 'عبق', en: 'Abaq' })}</span>
              <span className="flag flag--accent">
                <LuBadgeCheck aria-hidden /> {t('product.authentic')}
              </span>
              <span className="text-muted">{pick(product.family)}</span>
            </div>

            <h1 className="product__title">{name}</h1>

            <div className="product__meta">
              <Stars rating={product.rating} />
              <span className="text-muted">
                {number(product.rating)} · {t('reviews.count', { count: number(REVIEW_COUNT) })}
              </span>
              <span className="stock">
                <span className="stock__dot" /> {t('product.inStock')} · {t('product.left', { count: number(details.stock) })}
              </span>
            </div>

            <p className="product__price">
              {money(unitPrice)}
              {product.compareAt && !variants && <s>{money(product.compareAt)}</s>}
              <span className="text-muted">{t('product.vat')}</span>
            </p>

            {variants && (
              <>
                <fieldset className="options">
                  <legend>{t('product.concentration')}</legend>
                  {CONCENTRATIONS.map((option, index) => (
                    <button key={option.name.en} type="button" aria-pressed={index === concentration} onClick={() => setConcentration(index)}>
                      {pick(option.name)}
                      <small>{pick(option.hint)}</small>
                    </button>
                  ))}
                </fieldset>
                <fieldset className="options">
                  <legend>{t('product.size')}</legend>
                  {SIZES.map((option, index) => (
                    <button key={option.name.en} type="button" aria-pressed={index === size} onClick={() => setSize(index)}>
                      {pick(option.name)}
                      <small>{money(priceFor(index))}</small>
                    </button>
                  ))}
                </fieldset>
              </>
            )}

            <div className="buy-bar">
              <div className="quantity" role="group" aria-label={t('product.quantity')}>
                <button type="button" aria-label={t('product.decrease')} disabled={quantity === 1} onClick={() => setQuantity(quantity - 1)}>
                  <LuMinus aria-hidden />
                </button>
                <output aria-live="polite">{number(quantity)}</output>
                <button type="button" aria-label={t('product.increase')} disabled={quantity === MAX_QUANTITY} onClick={() => setQuantity(quantity + 1)}>
                  <LuPlus aria-hidden />
                </button>
              </div>
              <button className="button buy-bar__add" type="button" onClick={addToCart}>
                {t('action.addToCart')} · {money(unitPrice * quantity)}
              </button>
              <button className="icon-button" type="button" aria-label={`${t('action.addToWishlist')}: ${name}`}>
                <LuHeart aria-hidden />
              </button>
            </div>

            <ul className="perks">
              {PERKS.map(({ key, Icon }) => (
                <li key={key}>
                  <Icon aria-hidden /> {t(key)}
                </li>
              ))}
            </ul>

            <div className="product__payments">
              <span className="text-muted">{t('product.payWith')}</span>
              <PaymentBadges />
            </div>

            <Link className="banner banner--inline media-zoom" to="/category/bakhoor">
              <Picture photo="burnerCarpet" alt="" sizes="(min-width: 960px) 40vw, 100vw" />
              <span className="banner__text">
                <span className="eyebrow">{pick({ ar: 'هدية مع هذا الطلب', en: 'A gift with this order' })}</span>
                <span className="banner__title">{pick({ ar: 'مبخرة سفر مجاناً للطلبات فوق ٥٠٠ ر.س', en: 'A free travel burner on orders over SAR 500' })}</span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {details.pyramid && (
        <section className="section section--surface">
          <div className="container pyramid-layout">
            <div className="pyramid-layout__intro">
              <p className="eyebrow">{t('product.notesEyebrow')}</p>
              <h2 className="section__title">{t('product.notesTitle')}</h2>
              {([['product.longevity', details.longevity], ['product.sillage', details.sillage]] as const).map(
                ([key, value]) =>
                  value !== undefined && (
                    <div key={key} className="meter">
                      <span>{t(key)}</span>
                      <span className="meter__bar" role="img" aria-label={`${number(value)} / ${number(5)}`}>
                        {Array.from({ length: 5 }, (_, index) => (
                          <span key={index} data-on={index < value} />
                        ))}
                      </span>
                    </div>
                  ),
              )}
            </div>
            <ol className="pyramid">
              <li><small>{t('product.top')}</small>{pick(details.pyramid.top)}</li>
              <li><small>{t('product.heart')}</small>{pick(details.pyramid.heart)}</li>
              <li><small>{t('product.base')}</small>{pick(details.pyramid.base)}</li>
            </ol>
          </div>
        </section>
      )}

      <section className="section container">
        <div className="tabs tabs--wide" role="tablist">
          <button role="tab" type="button" aria-selected={tab === 'description'} onClick={() => setTab('description')}>
            {t('product.tab.description')}
          </button>
          <button role="tab" type="button" aria-selected={tab === 'reviews'} onClick={() => setTab('reviews')}>
            {t('product.tab.reviews')} ({number(REVIEW_COUNT)})
          </button>
        </div>

        {tab === 'description' ? (
          <div className="prose">
            <p>{pick(details.description)}</p>
            <p className="text-muted">{pick(product.notes)}</p>
          </div>
        ) : (
          <div className="reviews">
            <div className="reviews__summary">
              <strong className="reviews__score">{number(product.rating)}</strong>
              <Stars rating={product.rating} />
              <span className="text-muted">{t('reviews.count', { count: number(REVIEW_COUNT) })}</span>
              <ul className="reviews__bars">
                {RATING_SPREAD.map((percent, index) => (
                  <li key={index}>
                    <span>{number(5 - index)}</span>
                    <span className="progress"><span style={{ inlineSize: `${percent}%` }} /></span>
                    <span>{number(percent)}٪</span>
                  </li>
                ))}
              </ul>
              <button className="button button--outline" type="button">{t('reviews.add')}</button>
            </div>
            <div className="reviews__list">
              {shownReviews.map((review, index) => (
                <div key={review.id} className={index === 0 ? 'reviews__featured' : undefined}>
                  {index === 0 && <p className="eyebrow">{t('reviews.featured')}</p>}
                  <ReviewCard review={review} />
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="section section--surface">
        <div className="container">
          <div className="section__head">
            <h2 className="section__title">{t('product.related')}</h2>
          </div>
          <ProductRail products={relatedProducts(product)} layout="carousel" label={t('product.related')} />
        </div>
      </section>

      {/* Phones: the add-to-cart action stays reachable while scrolling. */}
      <div className="sticky-buy">
        <span>
          <strong>{name}</strong>
          <span>{money(unitPrice * quantity)}</span>
        </span>
        <button className="button" type="button" onClick={addToCart}>
          {t('action.addToCart')}
        </button>
      </div>
    </>
  );
}
