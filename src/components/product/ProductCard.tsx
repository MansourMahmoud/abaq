import { Link } from 'react-router-dom';
import { LuHeart, LuStar } from 'react-icons/lu';
import type { Product } from '../../data/catalog';
import { useI18n } from '../../i18n/I18nProvider';
import { useCart } from '../../lib/cart';
import { useThemeSettings } from '../../settings/ThemeSettings';
import { Picture } from '../ui/Picture';

interface ProductCardProps {
  product: Product;
  /** `sizes` hint for the image; depends on the grid the card sits in. */
  sizes?: string;
}

export function ProductCard({ product, sizes = '(min-width: 1024px) 25vw, 50vw' }: ProductCardProps) {
  const { pick, t, money } = useI18n();
  const { productCard } = useThemeSettings().settings;
  const { add } = useCart();
  const name = pick(product.name);
  const href = `/product/${product.slug}`;

  return (
    <article className="product-card" data-hover={productCard.hover}>
      <div className="product-card__media" style={{ aspectRatio: productCard.imageRatio }}>
        <Link to={href} tabIndex={-1} aria-hidden>
          <Picture photo={product.photos[0]} alt="" sizes={sizes} />
        </Link>
        {product.badge && <span className="product-card__badge">{pick(product.badge)}</span>}
        <button className="icon-button product-card__wish" type="button" aria-label={`${t('action.addToWishlist')}: ${name}`}>
          <LuHeart aria-hidden />
        </button>
      </div>

      <div className="product-card__body">
        <p className="product-card__meta">
          <span>{pick(product.family)}</span>
          <span aria-label={`${t('product.rating')} ${product.rating}`}>
            <LuStar aria-hidden /> {product.rating.toLocaleString()}
          </span>
        </p>
        <h3 className="product-card__name">
          <Link to={href}>{name}</Link>
        </h3>
        <p className="product-card__notes">{pick(product.notes)}</p>
        <div className="product-card__foot">
          <p className="product-card__price">
            {money(product.price)}
            {product.compareAt && <s>{money(product.compareAt)}</s>}
          </p>
          <button className="button product-card__add" type="button" onClick={() => add(product.id)}>
            {t('action.addToCart')}
          </button>
        </div>
      </div>
    </article>
  );
}
