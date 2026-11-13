import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LuMinus, LuPlus, LuTrash2 } from 'react-icons/lu';
import { ProductRail } from '../components/product/ProductRail';
import { PaymentBadges } from '../components/ui/PaymentBadges';
import { Picture } from '../components/ui/Picture';
import { products } from '../data/catalog';
import { STORE } from '../data/content';
import { useI18n } from '../i18n/I18nProvider';
import { useCart } from '../lib/cart';
import { useThemeSettings } from '../settings/ThemeSettings';

export function CartPage() {
  const { t, pick, money, number } = useI18n();
  const { lines, subtotal, setQuantity, remove } = useCart();
  const { cart } = useThemeSettings().settings;
  const [gift, setGift] = useState(false);

  const untilFreeShipping = Math.max(0, STORE.freeShippingFrom - subtotal);
  const suggestions = products.filter((product) => !lines.some((line) => line.product.id === product.id));

  // The merchant sets the banner's height and whether it runs edge to edge.
  const banner = cart.banner && (
    <Link className="banner banner--strip cart__banner media-zoom" data-height={cart.bannerHeight} data-width={cart.bannerWidth} to="/category/bakhoor">
      <Picture photo="burnerMajlis" alt="" sizes="100vw" />
      <span className="banner__text">
        <span className="eyebrow">{pick({ ar: 'عرض السلة', en: 'Cart offer' })}</span>
        <span className="banner__title">{pick({ ar: 'أضف بخوراً لطلبك واحصل على مبخرة سفر هدية', en: 'Add bakhoor to your order and get a travel burner free' })}</span>
      </span>
    </Link>
  );

  return (
    <>
      {cart.bannerWidth === 'full' && banner}
      <section className="container cart">
        {cart.bannerWidth === 'contained' && banner}
        <h1 className="cart__title">{t('cart.title')}</h1>

        {lines.length === 0 ? (
          <div className="empty-state">
            <h2 className="section__title">{t('cart.empty')}</h2>
            <p className="text-muted">{t('cart.emptyLead')}</p>
            <Link className="button" to="/category/men">{t('action.shopNow')}</Link>
          </div>
        ) : (
          <div className="cart__layout">
            <div className="cart__lines">
              <div className="shipping-meter">
                <p>{untilFreeShipping > 0 ? t('cart.freeShippingLeft', { amount: money(untilFreeShipping) }) : t('cart.freeShippingDone')}</p>
                <span className="progress"><span style={{ inlineSize: `${Math.min(100, (subtotal / STORE.freeShippingFrom) * 100)}%` }} /></span>
              </div>

              <ul>
                {lines.map(({ key, product, quantity, unitPrice, option }) => (
                  <li key={key} className="cart-line">
                    <Link className="cart-line__media" to={`/product/${product.slug}`}>
                      <Picture photo={product.photos[0]} alt="" sizes="110px" />
                    </Link>
                    <div className="cart-line__text">
                      <Link className="cart-line__name" to={`/product/${product.slug}`}>{pick(product.name)}</Link>
                      <span className="text-muted">{pick(option ?? product.family)}</span>
                      <span className="text-muted">{t('cart.unit')}: {money(unitPrice)}</span>
                    </div>
                    <div className="quantity" role="group" aria-label={t('product.quantity')}>
                      <button type="button" aria-label={t('product.decrease')} onClick={() => setQuantity(key, quantity - 1)}>
                        <LuMinus aria-hidden />
                      </button>
                      <output aria-live="polite">{number(quantity)}</output>
                      <button type="button" aria-label={t('product.increase')} onClick={() => setQuantity(key, quantity + 1)}>
                        <LuPlus aria-hidden />
                      </button>
                    </div>
                    <strong className="cart-line__total">{money(unitPrice * quantity)}</strong>
                    <button className="icon-button" type="button" aria-label={`${t('cart.remove')}: ${pick(product.name)}`} onClick={() => remove(key)}>
                      <LuTrash2 aria-hidden />
                    </button>
                  </li>
                ))}
              </ul>

              <label className="gift-toggle">
                <input type="checkbox" checked={gift} onChange={(event) => setGift(event.target.checked)} />
                <span>{t('cart.gift')}</span>
                <span className="eyebrow">{t('cart.free')}</span>
              </label>
            </div>

            <aside className="summary" aria-label={t('cart.summary')}>
              <h2>{t('cart.summary')}</h2>
              <form className="coupon" onSubmit={(event) => event.preventDefault()}>
                <label className="visually-hidden" htmlFor="coupon">{t('cart.coupon')}</label>
                <input id="coupon" placeholder={t('cart.coupon')} />
                <button className="button button--outline" type="submit">{t('cart.apply')}</button>
              </form>
              <dl>
                <div><dt>{t('cart.subtotal')}</dt><dd>{money(subtotal)}</dd></div>
                <div><dt>{t('cart.shipping')}</dt><dd>{untilFreeShipping > 0 ? t('cart.shippingAtCheckout') : t('cart.free')}</dd></div>
                <div className="summary__total"><dt>{t('cart.total')}</dt><dd>{money(subtotal)}</dd></div>
              </dl>
              <p className="text-muted">{t('product.vat')}</p>
              <button className="button" type="button">{t('cart.checkout')}</button>
              <PaymentBadges />
              {/* A second promotional slot, beside the totals where the eye rests before checkout. */}
              <Link className="cart-ad" to="/product/discovery-set">
                <span className="cart-ad__media">
                  <Picture photo="rollOns" alt="" sizes="72px" />
                </span>
                <span className="cart-ad__text">
                  <strong>{pick({ ar: 'أضف طقم العيّنات بـ ٧٥ ر.س', en: 'Add the discovery set for SAR 75' })}</strong>
                  <span>{pick({ ar: 'خمسة عطور تجرّبها قبل الزجاجة الكاملة', en: 'Five scents to try before a full bottle' })}</span>
                </span>
              </Link>
            </aside>
          </div>
        )}
      </section>

      <section className="section section--flush-top container">
        <div className="grid gap-4 md:grid-cols-2">
          <Link className="banner banner--strip media-zoom" to="/category/gifts">
            <Picture photo="amberTrio" alt="" sizes="(min-width: 768px) 50vw, 100vw" />
            <span className="banner__text">
              <span className="eyebrow">{pick({ ar: 'للهدايا', en: 'For gifting' })}</span>
              <span className="banner__title">{pick({ ar: 'تغليف هدية وبطاقة مجاناً مع كل طلب', en: 'Free gift wrap and card with every order' })}</span>
            </span>
          </Link>
          <Link className="banner banner--strip media-zoom" to="/category/oud">
            <Picture photo="oudOil" alt="" sizes="(min-width: 768px) 50vw, 100vw" />
            <span className="banner__text">
              <span className="eyebrow">{pick({ ar: 'دهن العود', en: 'Oud oil' })}</span>
              <span className="banner__title">{pick({ ar: 'قسّط طلبك على ٤ دفعات بلا فوائد', en: 'Split your order into 4 interest-free payments' })}</span>
            </span>
          </Link>
        </div>
      </section>

      <section className="section section--surface">
        <div className="container">
          <div className="section__head">
            <h2 className="section__title">{t('cart.suggestions')}</h2>
          </div>
          <ProductRail products={suggestions} layout="carousel" limit={8} label={t('cart.suggestions')} />
        </div>
      </section>
    </>
  );
}
