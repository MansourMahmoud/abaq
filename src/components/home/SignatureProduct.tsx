import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LuMinus, LuPlus, LuShoppingBag, LuZap } from 'react-icons/lu';
import { discountOf, productDetails, products } from '../../data/catalog';
import { signature } from '../../data/home';
import { useI18n } from '../../i18n/I18nProvider';
import { useCart } from '../../lib/cart';
import { useVariant } from '../../lib/variants';
import { Stars } from '../product/ReviewCard';
import { VariantPicker } from '../product/VariantPicker';
import { Picture } from '../ui/Picture';
import { Reveal } from '../ui/Reveal';

const MAX_QUANTITY = 9;

/**
 * The store's hero product, presented on its own ornamented stage: the photo
 * in a double gold arch over a geometric pattern, the notes pyramid, and the
 * full buying form (options, quantity, add to cart, buy now), so the shopper
 * can order without opening the product page.
 */
export function SignatureProduct() {
  const { t, pick, money, number } = useI18n();
  const { add } = useCart();
  const navigate = useNavigate();
  const product = products.find((entry) => entry.id === signature.productId);
  const variant = useVariant(product);
  const [quantity, setQuantity] = useState(1);
  const [photo, setPhoto] = useState(0);

  if (!product || product.soldOut) return null;

  const details = productDetails(product.id);
  const discount = discountOf(product);
  const { unitPrice } = variant;
  // The discount applies to every option, so the "before" price scales with the chosen one.
  const before = discount ? Math.round(unitPrice / (1 - discount.percent / 100) / 5) * 5 : unitPrice;
  const addToCart = () => add(product, { quantity, unitPrice, option: variant.option });
  const notes = details.pyramid ? ([['product.top', details.pyramid.top], ['product.heart', details.pyramid.heart], ['product.base', details.pyramid.base]] as const) : [];

  return (
    <section className="section">
      <Reveal className="container">
        <div className="signature scope-dark">
          <span className="signature__corner" data-corner="start" aria-hidden />
          <span className="signature__corner" data-corner="end" aria-hidden />

          <div className="signature__stage">
            <div className="signature__arch">
              <span>
                <Picture key={product.photos[photo]} photo={product.photos[photo]} alt={pick(product.name)} sizes="(min-width: 1024px) 34vw, 80vw" />
              </span>
            </div>
            {discount && (
              <span className="signature__seal">
                <strong>{number(discount.percent)}٪</strong>
                {t('welcome.off')}
              </span>
            )}
            {product.photos.length > 1 && (
              <ul className="signature__thumbs">
                {product.photos.map((entry, index) => (
                  <li key={entry}>
                    <button type="button" aria-label={t('product.image', { n: number(index + 1) })} aria-pressed={index === photo} onClick={() => setPhoto(index)}>
                      <Picture photo={entry} alt="" sizes="56px" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="signature__body">
            <p className="signature__eyebrow">
              <span aria-hidden /> {pick(signature.eyebrow)} <span aria-hidden />
            </p>
            <h2 className="signature__title">
              <Link to={`/product/${product.slug}`}>{pick(product.name)}</Link>
            </h2>
            <p className="flex flex-wrap items-center justify-center gap-3 text-sm text-soft lg:justify-start">
              <Stars rating={product.rating} /> {number(product.rating)} · {pick(product.family)}
            </p>
            <p className="max-w-[52ch] leading-loose text-soft">{pick(details.description)}</p>

            {notes.length > 0 && (
              <dl className="signature__notes">
                {notes.map(([key, value]) => (
                  <div key={key}>
                    <dt>{t(key)}</dt>
                    <dd>{pick(value)}</dd>
                  </div>
                ))}
              </dl>
            )}

            <VariantPicker variant={variant} />

            <div className="signature__buy">
              <p className="signature__price">
                <strong>{money(unitPrice * quantity)}</strong>
                {discount && <s>{money(before * quantity)}</s>}
                {discount && <span>{t('product.save', { amount: money((before - unitPrice) * quantity) })}</span>}
              </p>
              <div className="quantity" role="group" aria-label={t('product.quantity')}>
                <button type="button" aria-label={t('product.decrease')} disabled={quantity === 1} onClick={() => setQuantity(quantity - 1)}>
                  <LuMinus aria-hidden />
                </button>
                <output aria-live="polite">{number(quantity)}</output>
                <button type="button" aria-label={t('product.increase')} disabled={quantity === MAX_QUANTITY} onClick={() => setQuantity(quantity + 1)}>
                  <LuPlus aria-hidden />
                </button>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <button className="button" type="button" onClick={addToCart}>
                <LuShoppingBag aria-hidden /> {t('action.addToCart')}
              </button>
              <button
                className="button button--ghost"
                type="button"
                onClick={() => {
                  addToCart();
                  navigate('/cart');
                }}
              >
                <LuZap aria-hidden /> {t('action.buyNow')}
              </button>
            </div>
            <p className="text-center text-xs text-muted lg:text-start">{pick(signature.note)}</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
