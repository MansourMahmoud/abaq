import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { LuChevronDown, LuGlobe, LuHeart, LuMenu, LuSearch, LuShoppingBag, LuUser } from 'react-icons/lu';
import { categories } from '../../data/catalog';
import { useI18n } from '../../i18n/I18nProvider';
import { useThemeSettings } from '../../settings/ThemeSettings';
import { Logo } from '../ui/Logo';
import { CategoryDrawer } from './CategoryDrawer';
import { MegaMenu } from './MegaMenu';
import { SearchDialog } from './SearchDialog';

interface HeaderProps {
  /** True on pages that open with a full-bleed hero the header may sit on. */
  overHero: boolean;
  cartCount: number;
  /** Opens the language and currency picker, which the layout owns. */
  onLocale: () => void;
}

/**
 * Site header. One markup tree serves the three merchant-selectable variants;
 * the variant is exposed as a `data-variant` attribute and the stylesheet
 * shows, hides and re-orders the parts. Below the tablet breakpoint every
 * variant collapses to the drawer layout, because a category row cannot fit.
 */
export function Header({ overHero, cartCount, onLocale }: HeaderProps) {
  const { t, pick } = useI18n();
  const { header } = useThemeSettings().settings;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

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
      <div className="header__main container">
        <button className="header__menu" type="button" aria-label={t('nav.open')} aria-expanded={drawerOpen} onClick={() => setDrawerOpen(true)}>
          <LuMenu aria-hidden />
          <span>{t('nav.categories')}</span>
        </button>

        <Link className="header__logo" to="/" aria-label={t('nav.home')}>
          <Logo />
        </Link>

        <form className="header__search" role="search" onSubmit={(event) => event.preventDefault()}>
          <LuSearch aria-hidden />
          <input type="search" aria-label={t('action.search')} placeholder={t('search.placeholder')} readOnly onFocus={() => setSearchOpen(true)} />
        </form>

        <nav className="header__nav" aria-label={t('nav.main')}>
          <NavLink className="header__nav-link" to="/" end>
            {t('nav.home')}
          </NavLink>
          {categories.slice(0, 5).map((category) => (
            <div key={category.id} className="header__nav-item">
              <NavLink className="header__nav-link" to={`/category/${category.slug}`} aria-haspopup={header.megaMenu && category.children ? 'true' : undefined}>
                {pick(category.name)}
                {header.megaMenu && category.children && <LuChevronDown className="header__nav-caret" aria-hidden />}
              </NavLink>
              {header.megaMenu && category.children && <MegaMenu category={category} />}
            </div>
          ))}
        </nav>

        <div className="header__actions">
          <button className="icon-button header__search-toggle" type="button" aria-label={t('action.search')} onClick={() => setSearchOpen(true)}>
            <LuSearch aria-hidden />
          </button>
          <button className="icon-button header__action--secondary header__locale" type="button" aria-label={t('locale.title')} onClick={onLocale}>
            <LuGlobe aria-hidden />
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

      <CategoryDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} onLocale={onLocale} />
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
