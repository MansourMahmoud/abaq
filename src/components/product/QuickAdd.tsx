import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { LuX } from 'react-icons/lu';
import { hasVariants, type Product } from '../../data/catalog';
import { useI18n } from '../../i18n/I18nProvider';
import { useCart } from '../../lib/cart';
import { QuickAddContext } from '../../lib/quickAdd';
import { useVariant } from '../../lib/variants';
import { Picture } from '../ui/Picture';
import { VariantPicker } from './VariantPicker';

/** The options form for one product. Keyed by product, so each starts from the defaults. */
function Options({ product, onDone }: { product: Product; onDone: () => void }) {
  const { t, pick, money } = useI18n();
  const { add } = useCart();
  const variant = useVariant(product);

  return (
    <div className="dialog__body">
      <div className="dialog__head">
        <h2 id="quick-add-title">{t('quick.title')}</h2>
        <button className="icon-button" type="button" aria-label={t('action.close')} onClick={onDone}>
          <LuX aria-hidden />
        </button>
      </div>
      <div className="flex items-center gap-4">
        <span className="h-24 w-20 shrink-0 overflow-hidden rounded-md bg-raise">
          <Picture photo={product.photos[0]} alt="" sizes="80px" />
        </span>
        <p className="grid min-w-0 leading-snug">
          <span className="text-xs text-accent">{pick(product.family)}</span>
          <strong className="font-display text-2xl">{pick(product.name)}</strong>
          <Link className="link w-fit text-sm" to={`/product/${product.slug}`} onClick={onDone}>
            {t('quick.details')}
          </Link>
        </p>
      </div>
      <VariantPicker variant={variant} />
      <button
        className="button w-full"
        type="button"
        onClick={() => {
          add(product, { unitPrice: variant.unitPrice, option: variant.option });
          onDone();
        }}
      >
        {t('action.addToCart')} · {money(variant.unitPrice)}
      </button>
    </div>
  );
}

/** Provides `useQuickAdd` and owns the options dialog it may open. */
export function QuickAddProvider({ children }: { children: ReactNode }) {
  const { t } = useI18n();
  const { add } = useCart();
  const dialog = useRef<HTMLDialogElement>(null);
  const [product, setProduct] = useState<Product | null>(null);

  const quickAdd = useCallback(
    (target: Product) => {
      if (target.soldOut) return;
      if (hasVariants(target)) setProduct(target);
      else add(target);
    },
    [add],
  );

  useEffect(() => {
    if (product && !dialog.current?.open) dialog.current?.showModal();
  }, [product]);

  const close = () => dialog.current?.close();

  return (
    <QuickAddContext.Provider value={quickAdd}>
      {children}
      <dialog ref={dialog} className="dialog" aria-labelledby="quick-add-title" aria-label={t('quick.title')} onClose={() => setProduct(null)} onClick={(event) => event.target === dialog.current && close()}>
        {product && <Options key={product.id} product={product} onDone={close} />}
      </dialog>
    </QuickAddContext.Provider>
  );
}
