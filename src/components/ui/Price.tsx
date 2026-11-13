import { discountOf, type Product } from '../../data/catalog';
import { useI18n } from '../../i18n/I18nProvider';

interface PriceProps {
  product: Product;
  /** Show the percentage chip beside the prices. Off where space is very tight. */
  badge?: boolean;
  className?: string;
}

/**
 * A product's price, used wherever a product appears outside a product card
 * (hero, video, reels, search, menus, reviews). A discounted product always
 * shows the reduced price, the old one struck through and, unless `badge` is
 * off, the percentage saved, so an offer is never hidden by where it appears.
 */
export function Price({ product, badge = true, className }: PriceProps) {
  const { t, money, number } = useI18n();
  const discount = discountOf(product);

  return (
    <span className={`price ${className ?? ''}`} data-sale={discount !== null}>
      <span className="price__now">{money(product.price)}</span>
      {discount && (
        <>
          <s>{money(product.compareAt!)}</s>
          {badge && <span className="price__off">{t('product.off', { percent: number(discount.percent) })}</span>}
        </>
      )}
    </span>
  );
}
