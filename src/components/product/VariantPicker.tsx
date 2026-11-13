import { useI18n } from '../../i18n/I18nProvider';
import { CONCENTRATIONS, SIZES, type Variant } from '../../lib/variants';

/** Concentration and size choices for a product that has options; nothing otherwise. */
export function VariantPicker({ variant }: { variant: Variant }) {
  const { t, pick, money } = useI18n();
  if (!variant.hasOptions) return null;

  return (
    <>
      <fieldset className="options">
        <legend>{t('product.concentration')}</legend>
        {CONCENTRATIONS.map((entry, index) => (
          <button key={entry.name.en} type="button" aria-pressed={index === variant.concentration} onClick={() => variant.setConcentration(index)}>
            {pick(entry.name)}
            <small>{pick(entry.hint)}</small>
          </button>
        ))}
      </fieldset>
      <fieldset className="options">
        <legend>{t('product.size')}</legend>
        {SIZES.map((entry, index) => (
          <button key={entry.name.en} type="button" aria-pressed={index === variant.size} onClick={() => variant.setSize(index)}>
            {pick(entry.name)}
            <small>{money(variant.priceForSize(index))}</small>
          </button>
        ))}
      </fieldset>
    </>
  );
}
