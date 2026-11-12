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

export function CartPage() {
  const { t, pick, money, number } = useI18n();
  const { lines, subtotal, setQuantity, remove } = useCart();
  const [gift, setGift] = useState(false);

  const untilFreeShipping = Math.max(0, STORE.freeShippingFrom - subtotal);
  const suggestions = products.filter((product) => !lines.some((line) => line.product.id === product.id));

  const banner = (
    <Link className="banner banner--strip media-zoom" to="/category/bakhoor">
      <Picture photo="burnerMajlis" alt="" sizes="100vw" />
      <span className="banner__text">
        <span className="eyebrow">{pick({ ar: 'عرض السلة', en: 'Cart offer' })}</span>
        <span className="banner__title">{pick({ ar: 'أضف بخوراً لطلبك واحصل على مبخرة سفر هدية', en: 'Add bakhoor to your order and get a travel burner free' })}</span>
      </span>
    </Link>
  );

  return (
    <>
      <section className="container cart">
        {banner}
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
            </aside>
          </div>
        )}
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
