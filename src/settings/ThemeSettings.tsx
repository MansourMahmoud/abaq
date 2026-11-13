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
    /** Slim strip above the header with social accounts, phone and email. */
    topBar: boolean;
    /** Open a panel of sub-categories (with the category banner) under the navigation. */
    megaMenu: boolean;
  };
  announcement: {
    enabled: boolean;
    /** marquee scrolls every message; static shows the first one only */
    mode: 'marquee' | 'static';
    dismissible: boolean;
    /** Keep the bar attached to a sticky header instead of scrolling away. */
    stickWithHeader: boolean;
    /** Show each message's icon. */
    showIcons: boolean;
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
  hero: {
    /** How one slide gives way to the next. */
    effect: 'fade' | 'slide';
    autoplaySeconds: number;
  };
  category: {
    /** Products fetched per page of the listing. */
    perPage: number;
    /** infinite: the next page loads as the shopper nears the end · button: a "show more" button */
    pagination: 'infinite' | 'button';
    filters: boolean;
    /** Promotional card placed inside the product grid. */
    inlineBanner: boolean;
    /** Banners under the listing: one wide banner, two side by side, or none. */
    bottomBanners: 'one' | 'two' | 'none';
    /** Store benefits strip under the listing. */
    showPerks: boolean;
    /** Customer reviews under the listing. */
    showReviews: boolean;
  };
  cart: {
    banner: boolean;
    bannerHeight: 'short' | 'medium' | 'tall';
    /** contained: aligned with the page content · full: edge to edge */
    bannerWidth: 'contained' | 'full';
  };
  floating: {
    whatsapp: boolean;
    /** Physical side of the screen the chat button sits on. */
    side: 'right' | 'left';
    /** Rotate short prompts beside the chat button. */
    prompts: boolean;
    /** Call button above the chat button. */
    phone: boolean;
    /** Discount ticket on the edge of the screen opposite the chat button. */
    coupon: boolean;
  };
  popup: {
    /** Welcome offer shown to new visitors. */
    enabled: boolean;
    /** Seconds to wait after the page loads before showing it. */
    delaySeconds: number;
    /** Days before it may return after being closed without "don't show again". */
    remindAfterDays: number;
  };
  footer: {
    /** Promotional card that overlaps the top edge of the footer. */
    showPromo: boolean;
    showSocial: boolean;
    showPayments: boolean;
    showCompliance: boolean;
    contactStyle: 'icons' | 'text';
  };
}

export const defaultSettings: ThemeSettings = {
  header: { variant: 'overlay', sticky: true, logoPosition: 'start', showActionLabels: false, topBar: true, megaMenu: true },
  announcement: { enabled: true, mode: 'marquee', dismissible: true, stickWithHeader: false, showIcons: true },
  productCard: { hover: 'zoom', imageRatio: '4/5' },
  preloader: { enabled: true, background: 'blur' },
  home: { categoriesLayout: 'carousel', productsLayout: 'carousel', carouselIndicator: 'dots' },
  hero: { effect: 'fade', autoplaySeconds: 7 },
  category: { perPage: 8, pagination: 'infinite', filters: true, inlineBanner: true, bottomBanners: 'one', showPerks: true, showReviews: true },
  cart: { banner: true, bannerHeight: 'medium', bannerWidth: 'contained' },
  floating: { whatsapp: true, side: 'right', prompts: true, phone: true, coupon: true },
  popup: { enabled: true, delaySeconds: 6, remindAfterDays: 3 },
  footer: { showPromo: true, showSocial: true, showPayments: true, showCompliance: true, contactStyle: 'icons' },
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
