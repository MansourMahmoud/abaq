import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { ar, en, type MessageKey } from './messages';

export type Locale = 'ar' | 'en';

/** Text that exists in both languages, e.g. a product name or a banner title. */
export type Localized = Record<Locale, string>;

/**
 * Currencies the shopper can display prices in. Catalogue prices are stored in
 * SAR; `rate` converts one riyal. Rates here are fixed demo values: the Salla
 * theme reads live ones from the store's currency settings.
 */
export const CURRENCIES = [
  { code: 'SAR', rate: 1, name: { ar: 'ريال سعودي', en: 'Saudi Riyal' }, symbol: { ar: 'ر.س', en: 'SAR' } },
  { code: 'AED', rate: 0.98, name: { ar: 'درهم إماراتي', en: 'UAE Dirham' }, symbol: { ar: 'د.إ', en: 'AED' } },
  { code: 'KWD', rate: 0.082, name: { ar: 'دينار كويتي', en: 'Kuwaiti Dinar' }, symbol: { ar: 'د.ك', en: 'KWD' } },
  { code: 'USD', rate: 0.2667, name: { ar: 'دولار أمريكي', en: 'US Dollar' }, symbol: { ar: '$', en: 'USD' } },
] as const;

export type CurrencyCode = (typeof CURRENCIES)[number]['code'];

interface I18nValue {
  locale: Locale;
  dir: 'rtl' | 'ltr';
  currency: CurrencyCode;
  setLocale: (locale: Locale) => void;
  setCurrency: (currency: CurrencyCode) => void;
  /** Translate a UI key, filling `{name}` placeholders from `vars`. */
  t: (key: MessageKey, vars?: Record<string, string | number>) => string;
  /** Pick the current language out of merchant-authored content. */
  pick: (value: Localized) => string;
  /** Format a SAR amount in the selected currency with locale digits. */
  money: (amount: number) => string;
  /** Format a plain number with locale digits. */
  number: (value: number) => string;
}

const LOCALE_KEY = 'fawh:locale';
const CURRENCY_KEY = 'fawh:currency';
const dictionaries = { ar, en };

const I18nContext = createContext<I18nValue | null>(null);

/** Read a stored preference; storage can be blocked (private mode). */
function readStored<T extends string>(key: string, allowed: readonly T[], fallback: T): T {
  try {
    const stored = localStorage.getItem(key) as T | null;
    return stored && allowed.includes(stored) ? stored : fallback;
  } catch {
    return fallback;
  }
}

function store(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* the preference simply won't persist */
  }
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => readStored(LOCALE_KEY, ['ar', 'en'], 'ar'));
  const [currency, setCurrencyState] = useState<CurrencyCode>(() =>
    readStored(CURRENCY_KEY, CURRENCIES.map((entry) => entry.code), 'SAR'),
  );
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  // Direction and language live on <html> so CSS logical properties and the
  // `html[lang]` font overrides follow the switch without re-rendering styles.
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale, dir]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    store(LOCALE_KEY, next);
  }, []);

  const setCurrency = useCallback((next: CurrencyCode) => {
    setCurrencyState(next);
    store(CURRENCY_KEY, next);
  }, []);

  const value = useMemo<I18nValue>(() => {
    const active = CURRENCIES.find((entry) => entry.code === currency)!;
    const tag = locale === 'ar' ? 'ar-SA' : 'en-US';
    const plain = new Intl.NumberFormat(tag);
    // Whole amounts print without decimals; fractions (converted currencies, odd prices) keep up to two.
    const price = new Intl.NumberFormat(tag, { maximumFractionDigits: 2 });
    return {
      locale,
      dir,
      currency,
      setLocale,
      setCurrency,
      t: (key, vars) => {
        const template: string = dictionaries[locale][key];
        if (!vars) return template;
        return template.replace(/\{(\w+)\}/g, (_, name: string) => String(vars[name] ?? ''));
      },
      pick: (content) => content[locale],
      money: (amount) => `${price.format(amount * active.rate)} ${active.symbol[locale]}`,
      number: (number) => plain.format(number),
    };
  }, [locale, dir, currency, setLocale, setCurrency]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const value = useContext(I18nContext);
  if (!value) throw new Error('useI18n must be used inside <I18nProvider>');
  return value;
}
