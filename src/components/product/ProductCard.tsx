import { Link } from 'react-router-dom';
import { LuHeart, LuStar } from 'react-icons/lu';
import { discountOf, type Product } from '../../data/catalog';
import { useI18n } from '../../i18n/I18nProvider';
import { useCart } from '../../lib/cart';
import { useThemeSettings } from '../../settings/ThemeSettings';
import { Picture } from '../ui/Picture';

interface ProductCardProps {
  product: Product;
  /** `sizes` hint for the image; depends on the grid the card sits in. */
  sizes?: string;
}

/**
 * Product tile used by every grid and carousel. A discounted product shows
 * the percentage on the photo and the amount saved under the price; a sold-out
 * one dims its photo and swaps the button for a notice.
 */
export function ProductCard({ product, sizes = '(min-width: 1024px) 25vw, 50vw' }: ProductCardProps) {
  const { pick, t, money, number } = useI18n();
  const { productCard } = useThemeSettings().settings;
  const { add } = useCart();
  const name = pick(product.name);
  const href = `/product/${product.slug}`;
  const discount = discountOf(product);

  return (
    <article className="product-card" data-hover={productCard.hover} data-sold-out={product.soldOut}>
      <div className="product-card__media" style={{ aspectRatio: productCard.imageRatio }}>
        <Link to={href} tabIndex={-1} aria-hidden>
          <Picture photo={product.photos[0]} alt="" sizes={sizes} />
          {/* Second photo fades in on hover, where the device can hover. */}
          {product.photos[1] && <Picture className="product-card__alt" photo={product.photos[1]} alt="" sizes={sizes} />}
        </Link>
        <div className="product-card__badges">
          {discount && <span className="product-card__badge product-card__badge--sale">{t('product.off', { percent: number(discount.percent) })}</span>}
          {product.badge && !discount && <span className="product-card__badge">{pick(product.badge)}</span>}
          {product.soldOut && <span className="product-card__badge product-card__badge--muted">{t('product.soldOut')}</span>}
        </div>
        <button className="icon-button product-card__wish" type="button" aria-label={`${t('action.addToWishlist')}: ${name}`}>
          <LuHeart aria-hidden />
        </button>
      </div>

      <div className="product-card__body">
        <p className="product-card__meta">
          <span>{pick(product.family)}</span>
          <span aria-label={`${t('product.rating')} ${product.rating}`}>
            <LuStar aria-hidden /> {number(product.rating)}
          </span>
        </p>
        <h3 className="product-card__name">
          <Link to={href}>{name}</Link>
        </h3>
        <p className="product-card__notes">{pick(product.notes)}</p>
        <div className="product-card__foot">
          <p className="product-card__price">
            <span>
              {money(product.price)}
              {product.compareAt && <s>{money(product.compareAt)}</s>}
            </span>
            {discount && <span className="product-card__save">{t('product.save', { amount: money(discount.saved) })}</span>}
          </p>
          <button className="button product-card__add" type="button" disabled={product.soldOut} onClick={() => add(product)}>
            {product.soldOut ? t('product.notify') : t('action.addToCart')}
          </button>
        </div>
      </div>
    </article>
  );
}
