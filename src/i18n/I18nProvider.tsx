import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { ar, en, type MessageKey } from './messages';

export type Locale = 'ar' | 'en';

/** Text that exists in both languages, e.g. a product name or a banner title. */
export type Localized = Record<Locale, string>;

interface I18nValue {
  locale: Locale;
  dir: 'rtl' | 'ltr';
  setLocale: (locale: Locale) => void;
  /** Translate a UI key, filling `{name}` placeholders from `vars`. */
  t: (key: MessageKey, vars?: Record<string, string | number>) => string;
  /** Pick the current language out of merchant-authored content. */
  pick: (value: Localized) => string;
  /** Format a price with locale digits. */
  money: (amount: number) => string;
}

const STORAGE_KEY = 'abaq:locale';
const dictionaries = { ar, en };

const I18nContext = createContext<I18nValue | null>(null);

function readStoredLocale(): Locale {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'en' ? 'en' : 'ar';
  } catch {
    return 'ar'; // storage can be blocked (private mode); Arabic is the default
  }
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readStoredLocale);
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  // Direction and language live on <html> so CSS logical properties and the
  // `html[lang]` font overrides follow the switch without re-rendering styles.
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale, dir]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* preference simply won't persist */
    }
  }, []);

  const value = useMemo<I18nValue>(() => {
    const numberFormat = new Intl.NumberFormat(locale === 'ar' ? 'ar-SA' : 'en-US');
    return {
      locale,
      dir,
      setLocale,
      t: (key, vars) => {
        const template: string = dictionaries[locale][key];
        if (!vars) return template;
        return template.replace(/\{(\w+)\}/g, (_, name: string) => String(vars[name] ?? ''));
      },
      pick: (content) => content[locale],
      money: (amount) => `${numberFormat.format(amount)} ${dictionaries[locale]['currency.sar']}`,
    };
  }, [locale, dir, setLocale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const value = useContext(I18nContext);
  if (!value) throw new Error('useI18n must be used inside <I18nProvider>');
  return value;
}
