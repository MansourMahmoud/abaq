import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

/**
 * Merchant-facing theme settings.
 *
 * Each field here maps one-to-one to a setting the Salla theme will declare in
 * `twilight.json`, so components read their options from this object and never
 * from constants. The demo site keeps the values in memory; in the Salla theme
 * they arrive from `useTheme().settings`.
 */
export interface ThemeSettings {
  header: {
    /** overlay: transparent over the hero · classic: search + category row · drawer: categories behind a menu button */
    variant: 'overlay' | 'classic' | 'drawer';
    sticky: boolean;
    logoPosition: 'start' | 'center';
    /** Show a text label next to the account, wishlist and cart icons. */
    showActionLabels: boolean;
  };
  announcement: {
    enabled: boolean;
    /** marquee scrolls every message; static shows the first one only */
    mode: 'marquee' | 'static';
    dismissible: boolean;
    /** Keep the bar attached to a sticky header instead of scrolling away. */
    stickWithHeader: boolean;
  };
  productCard: {
    hover: 'zoom' | 'lift' | 'none';
    imageRatio: '1/1' | '4/5' | '3/4';
  };
  preloader: {
    enabled: boolean;
    /** blur: frosted view of the page behind · solid: the store background colour */
    background: 'blur' | 'solid';
  };
  home: {
    /** How the category and product sections lay out their items. */
    categoriesLayout: 'carousel' | 'grid';
    productsLayout: 'carousel' | 'grid';
    /** dots: one dot per page under the carousel · bar: a thin scrollbar */
    carouselIndicator: 'dots' | 'bar';
  };
  footer: {
    showSocial: boolean;
    showPayments: boolean;
    showCompliance: boolean;
    contactStyle: 'icons' | 'text';
  };
}

export const defaultSettings: ThemeSettings = {
  header: { variant: 'overlay', sticky: true, logoPosition: 'start', showActionLabels: false },
  announcement: { enabled: true, mode: 'marquee', dismissible: true, stickWithHeader: false },
  productCard: { hover: 'zoom', imageRatio: '4/5' },
  preloader: { enabled: true, background: 'blur' },
  home: { categoriesLayout: 'carousel', productsLayout: 'carousel', carouselIndicator: 'dots' },
  footer: { showSocial: true, showPayments: true, showCompliance: true, contactStyle: 'icons' },
};

interface SettingsValue {
  settings: ThemeSettings;
  /** Shallow-merge a change into one settings group. */
  update: <K extends keyof ThemeSettings>(group: K, patch: Partial<ThemeSettings[K]>) => void;
  reset: () => void;
}

const SettingsContext = createContext<SettingsValue | null>(null);

export function ThemeSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState(defaultSettings);

  const value = useMemo<SettingsValue>(
    () => ({
      settings,
      update: (group, patch) => setSettings((prev) => ({ ...prev, [group]: { ...prev[group], ...patch } })),
      reset: () => setSettings(defaultSettings),
    }),
    [settings],
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useThemeSettings(): SettingsValue {
  const value = useContext(SettingsContext);
  if (!value) throw new Error('useThemeSettings must be used inside <ThemeSettingsProvider>');
  return value;
}
