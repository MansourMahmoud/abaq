import { useEffect, useState, type CSSProperties, type MouseEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { LuBadgeCheck, LuGift, LuHeart, LuMinus, LuPlay, LuPlus, LuRefreshCw, LuTestTubeDiagonal, LuTruck, LuZap } from 'react-icons/lu';
import type { IconType } from 'react-icons';
import { RecentlyViewed } from '../components/home/RecentlyViewed';
import { ProductRail } from '../components/product/ProductRail';
import { VariantPicker } from '../components/product/VariantPicker';
import { Stars } from '../components/product/ReviewCard';
import { ReviewsPanel } from '../components/product/ReviewsPanel';
import { ClipPlayer } from '../components/ui/ClipPlayer';
import { PaymentBadges } from '../components/ui/PaymentBadges';
import { Picture } from '../components/ui/Picture';
import { brands, categories, discountOf, findProduct, productDetails, relatedProducts } from '../data/catalog';
import { reviews } from '../data/content';
import { clipPoster, clips } from '../data/videos';
import { useI18n, type Localized } from '../i18n/I18nProvider';
import type { MessageKey } from '../i18n/messages';
import { useCart } from '../lib/cart';
import { useVariant } from '../lib/variants';
import { rememberProduct } from '../lib/recentlyViewed';
import { NotFoundPage } from './NotFoundPage';

const PERKS: { key: MessageKey; Icon: IconType }[] = [
  { key: 'product.perk.delivery', Icon: LuTruck },
  { key: 'product.perk.sample', Icon: LuTestTubeDiagonal },
  { key: 'product.perk.returns', Icon: LuRefreshCw },
  { key: 'product.perk.gift', Icon: LuGift },
];

const MAX_QUANTITY = 9;

export function ProductPage() {
  const { slug = '' } = useParams();
  const { t, pick, money, number, locale } = useI18n();
  const { add } = useCart();
  const navigate = useNavigate();
  const product = findProduct(slug);

  const [media, setMedia] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const variant = useVariant(product);
  const [zoom, setZoom] = useState<CSSProperties>({});
  const [tab, setTab] = useState<'description' | 'reviews'>('description');

  useEffect(() => {
    if (product) rememberProduct(product.id);
  }, [product]);

  if (!product) return <NotFoundPage title={t('product.notFound')} />;

  const details = productDetails(product.id);
  const discount = discountOf(product);
  const clip = clips.find((entry) => entry.productId === product.id);
  const category = categories.find((entry) => product.categoryIds.includes(entry.id));
  // Demo data has only a few reviews per product, so the page shows this product's first, then the rest.
  const productReviews = [...reviews].sort((a, b) => Number(b.productId === product.id) - Number(a.productId === product.id));
  const brand = brands.find((entry) => entry.id === product.brand);
  const name = pick(product.name);

  /** Turns a dotted note list ("saffron · bergamot") into running text for the section's intro. */
  const inSentence = (notes: Localized) =>
    new Intl.ListFormat(locale, { type: 'conjunction' }).format(
      pick(notes)
        .split('·')
        .map((note) => note.trim())
        .filter(Boolean),
    );

  // Gallery entries: every photo, then the product's clip when it has one.
  const showingClip = clip !== undefined && media === product.photos.length;
  const { unitPrice, option } = variant;
  // The discount applies to every option, so the "before" price scales with the chosen one.
  const compareAt = discount ? Math.round((unitPrice / (1 - discount.percent / 100)) / 5) * 5 : unitPrice;

  // Zoom follows the pointer by moving the transform origin under it.
  const trackPointer = (event: MouseEvent<HTMLDivElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    setZoom({ transform: 'scale(2)', transformOrigin: `${((event.clientX - box.left) / box.width) * 100}% ${((event.clientY - box.top) / box.height) * 100}%` });
  };

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
                <ClipPlayer clip={clip} autoPlay />
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
              {brand && <span className="flag flag--brand">{pick(brand.name)}</span>}
              <span className="flag flag--accent">
                <LuBadgeCheck aria-hidden /> {t('product.authentic')}
              </span>
              <span className="text-muted">{pick(product.family)}</span>
            </div>

            <h1 className="product__title">{name}</h1>

            <div className="product__meta">
              <Stars rating={product.rating} />
              <span className="text-muted">
                {number(product.rating)} · {t('reviews.count', { count: number(productReviews.length) })}
              </span>
              {product.soldOut ? (
                <span className="text-muted">{t('product.soldOut')}</span>
              ) : (
                <span className="stock">
                  <span className="stock__dot" /> {t('product.inStock')} · {t('product.left', { count: number(details.stock) })}
                </span>
              )}
            </div>

            <p className="product__price">
              {money(unitPrice)}
              {discount && (
                <>
                  <s>{money(compareAt)}</s>
                  <span className="product__save">
                    {t('product.off', { percent: number(discount.percent) })} · {t('product.save', { amount: money(compareAt - unitPrice) })}
                  </span>
                </>
              )}
              <span className="text-muted">{t('product.vat')}</span>
            </p>

            <VariantPicker variant={variant} />

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
              <button className="button buy-bar__add" type="button" disabled={product.soldOut} onClick={addToCart}>
                {product.soldOut ? t('product.notify') : `${t('action.addToCart')} · ${money(unitPrice * quantity)}`}
              </button>
              <button className="icon-button" type="button" aria-label={`${t('action.addToWishlist')}: ${name}`}>
                <LuHeart aria-hidden />
              </button>
            </div>

            {!product.soldOut && (
              <button
                className="button button--ghost w-full"
                type="button"
                onClick={() => {
                  addToCart();
                  navigate('/cart');
                }}
              >
                <LuZap aria-hidden /> {t('action.buyNow')}
              </button>
            )}

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
              <p className="eyebrow">{t('product.notesEyebrow', { name })}</p>
              <h2 className="section__title">{t('product.notesTitle', { name })}</h2>
              <p className="text-soft">
                {t('product.notesLead', {
                  name,
                  top: inSentence(details.pyramid.top),
                  heart: inSentence(details.pyramid.heart),
                  base: inSentence(details.pyramid.base),
                })}
              </p>
              {([['product.longevity', 'product.longevityHint', details.longevity], ['product.sillage', 'product.sillageHint', details.sillage]] as const).map(
                ([key, hint, value]) =>
                  value !== undefined && (
                    <div key={key} className="meter">
                      <p>
                        <strong>{t(key)}</strong>
                        <span>{t('product.outOfFive', { value: number(value) })}</span>
                      </p>
                      <span className="meter__bar" role="img" aria-label={t('product.outOfFive', { value: number(value) })}>
                        {Array.from({ length: 5 }, (_, index) => (
                          <span key={index} data-on={index < value} />
                        ))}
                      </span>
                      <small>{t(hint, { name })}</small>
                    </div>
                  ),
              )}
            </div>
            {/* Three stages, narrowest first: the shape of the pyramid follows how long each lasts. */}
            <ol className="pyramid">
              {([['top', details.pyramid.top], ['heart', details.pyramid.heart], ['base', details.pyramid.base]] as const).map(([stage, notes], index) => (
                <li key={stage}>
                  <span className="pyramid__step">{number(index + 1)}</span>
                  <span className="pyramid__text">
                    <span className="pyramid__when">
                      <strong>{t(`product.${stage}`)}</strong> · {t(`product.${stage}When`)}
                    </span>
                    <span className="pyramid__notes">{pick(notes)}</span>
                    <small>{t(`product.${stage}Hint`)}</small>
                  </span>
                </li>
              ))}
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
            {t('product.tab.reviews')} ({number(productReviews.length)})
          </button>
        </div>

        {tab === 'description' ? (
          <div className="prose">
            <p>{pick(details.description)}</p>
            <p className="text-muted">{pick(product.notes)}</p>
          </div>
        ) : (
          <ReviewsPanel reviews={productReviews} />
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

      <RecentlyViewed excludeId={product.id} />

      {/* Phones: the add-to-cart action stays reachable while scrolling. */}
      <div className="sticky-buy">
        <span>
          <strong>{name}</strong>
          <span>{money(unitPrice * quantity)}</span>
        </span>
        <button className="button" type="button" disabled={product.soldOut} onClick={addToCart}>
          {product.soldOut ? t('product.notify') : t('action.addToCart')}
        </button>
      </div>
    </>
  );
}
