import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { LuHeart, LuMenu, LuSearch, LuShoppingBag, LuUser } from 'react-icons/lu';
import { categories } from '../../data/catalog';
import { useI18n } from '../../i18n/I18nProvider';
import { useThemeSettings } from '../../settings/ThemeSettings';
import { CategoryDrawer } from './CategoryDrawer';

interface HeaderProps {
  /** True on pages that open with a full-bleed hero the header may sit on. */
  overHero: boolean;
  cartCount: number;
}

/**
 * Site header. One markup tree serves the three merchant-selectable variants;
 * the variant is exposed as a `data-variant` attribute and the stylesheet
 * shows, hides and re-orders the parts. Below the tablet breakpoint every
 * variant collapses to the drawer layout, because a category row cannot fit.
 */
export function Header({ overHero, cartCount }: HeaderProps) {
  const { t, pick, locale, setLocale } = useI18n();
  const { header } = useThemeSettings().settings;
  const [drawerOpen, setDrawerOpen] = useState(false);

  const floats = overHero && header.variant !== 'classic';

  return (
    <header
      className="header"
      data-variant={header.variant}
      data-floating={floats}
      data-sticky={header.sticky}
      data-logo={header.logoPosition}
      data-labels={header.showActionLabels}
    >
      <div className="header__utility container">
        <Link to="/branches">{t('nav.branches')}</Link>
        <button type="button" className="header__language" onClick={() => setLocale(locale === 'ar' ? 'en' : 'ar')}>
          {t('header.language')}
        </button>
      </div>

      <div className="header__main container">
        <button className="header__menu" type="button" aria-label={t('nav.open')} aria-expanded={drawerOpen} onClick={() => setDrawerOpen(true)}>
          <LuMenu aria-hidden />
          <span>{t('nav.categories')}</span>
        </button>

        <Link className="header__logo" to="/" aria-label={t('nav.home')}>
          {locale === 'ar' ? 'عبق' : 'Abaq'}
        </Link>

        <form className="header__search" role="search" onSubmit={(event) => event.preventDefault()}>
          <LuSearch aria-hidden />
          <input type="search" aria-label={t('action.search')} placeholder={t('search.placeholder')} />
        </form>

        <nav className="header__nav" aria-label={t('nav.main')}>
          <NavLink to="/" end>
            {t('nav.home')}
          </NavLink>
          {categories.slice(0, 5).map((category) => (
            <NavLink key={category.id} to={`/category/${category.slug}`}>
              {pick(category.name)}
            </NavLink>
          ))}
        </nav>

        <div className="header__actions">
          <button className="icon-button header__search-toggle" type="button" aria-label={t('action.search')}>
            <LuSearch aria-hidden />
          </button>
          <button className="icon-button header__action--secondary" type="button" aria-label={t('action.account')}>
            <LuUser aria-hidden />
            <span className="header__label">{t('action.account')}</span>
          </button>
          <button className="icon-button header__action--secondary" type="button" aria-label={t('action.wishlist')}>
            <LuHeart aria-hidden />
            <span className="header__label">{t('action.wishlist')}</span>
          </button>
          <Link className="icon-button header__cart" to="/cart" aria-label={`${t('action.cart')} (${cartCount})`}>
            <LuShoppingBag aria-hidden />
            <span className="header__label">{t('action.cart')}</span>
            {cartCount > 0 && <span className="header__count">{cartCount}</span>}
          </Link>
        </div>
      </div>

      <CategoryDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </header>
  );
}
