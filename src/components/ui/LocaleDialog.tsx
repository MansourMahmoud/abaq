import { useEffect, useRef, useState } from 'react';
import { LuX } from 'react-icons/lu';
import { CURRENCIES, useI18n, type CurrencyCode, type Locale } from '../../i18n/I18nProvider';

const LANGUAGES: { code: Locale; name: string }[] = [
  { code: 'ar', name: 'العربية' },
  { code: 'en', name: 'English' },
];

/**
 * Language and currency picker. Built on the native <dialog> element, which
 * provides the focus trap, Escape handling and backdrop. Choices are staged
 * locally and applied together on confirm, so closing the dialog discards them.
 */
export function LocaleDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, pick, locale, currency, setLocale, setCurrency } = useI18n();
  const dialog = useRef<HTMLDialogElement>(null);
  const [draftLocale, setDraftLocale] = useState(locale);
  const [draftCurrency, setDraftCurrency] = useState<CurrencyCode>(currency);

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (open && !element.open) {
      setDraftLocale(locale);
      setDraftCurrency(currency);
      element.showModal();
    } else if (!open && element.open) {
      element.close();
    }
  }, [open, locale, currency]);

  const confirm = () => {
    setLocale(draftLocale);
    setCurrency(draftCurrency);
    onClose();
  };

  return (
    <dialog ref={dialog} className="dialog" aria-labelledby="locale-dialog-title" onClose={onClose} onClick={(event) => event.target === dialog.current && onClose()}>
      <form
        className="dialog__body"
        onSubmit={(event) => {
          event.preventDefault();
          confirm();
        }}
      >
        <div className="dialog__head">
          <h2 id="locale-dialog-title">{t('locale.title')}</h2>
          <button className="icon-button" type="button" aria-label={t('action.close')} onClick={onClose}>
            <LuX aria-hidden />
          </button>
        </div>

        <fieldset className="choice-list">
          <legend>{t('locale.language')}</legend>
          {LANGUAGES.map((language) => (
            <label key={language.code}>
              <input type="radio" name="locale" checked={draftLocale === language.code} onChange={() => setDraftLocale(language.code)} />
              <span lang={language.code}>{language.name}</span>
            </label>
          ))}
        </fieldset>

        <fieldset className="choice-list">
          <legend>{t('locale.currency')}</legend>
          {CURRENCIES.map((entry) => (
            <label key={entry.code}>
              <input type="radio" name="currency" checked={draftCurrency === entry.code} onChange={() => setDraftCurrency(entry.code)} />
              <span>{pick(entry.name)}</span>
              <span className="choice-list__hint">{pick(entry.symbol)}</span>
            </label>
          ))}
        </fieldset>

        <button className="button" type="submit">
          {t('locale.confirm')}
        </button>
      </form>
    </dialog>
  );
}
