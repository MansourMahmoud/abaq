import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { LuChevronDown, LuGlobe, LuHeart, LuMenu, LuSearch, LuShoppingBag, LuUser } from 'react-icons/lu';
import { categories } from '../../data/catalog';
import { useI18n } from '../../i18n/I18nProvider';
import { useScrollState } from '../../lib/useScrollState';
import { useThemeSettings } from '../../settings/ThemeSettings';
import { Logo } from '../ui/Logo';
import { CategoryDrawer } from './CategoryDrawer';
import { MegaMenu } from './MegaMenu';
import { SearchDialog } from './SearchDialog';

/** Top-level categories shown in the navigation row; the rest open from the drawer. */
const NAV_ITEMS = 5;
/** Grace period before the panel closes once the pointer leaves it. */
const MENU_CLOSE_DELAY_MS = 260;
/** How long the pointer must rest on a category before its panel opens or replaces another. */
const MENU_OPEN_DELAY_MS = 200;

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
 * shows, hides and re-orders the parts. When sticky, the header slides out of
 * view on the way down the page and returns on the first scroll up. Below the tablet breakpoint every
 * variant collapses to the drawer layout, because a category row cannot fit.
 */
export function Header({ overHero, cartCount, onLocale }: HeaderProps) {
  const { t, pick } = useI18n();
  const { header } = useThemeSettings().settings;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const [menu, setMenu] = useState<string | null>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const openTimer = useRef<number | undefined>(undefined);
  const { pathname, search } = useLocation();
  const { scrolled, goingDown } = useScrollState();

  /*
   * The sub-category panel is opened by hover or keyboard focus and closed by
   * leaving it (after a short grace period, so the pointer can cross the gap),
   * by Escape, by choosing a link, and whenever the page changes.
   */
  const openMenu = (id: string) => {
    window.clearTimeout(closeTimer.current);
    window.clearTimeout(openTimer.current);
    setMenu(id);
  };
  /** Opens after the pointer has rested on the link, so passing over the row opens nothing. */
  const openMenuOnRest = (id: string) => {
    window.clearTimeout(closeTimer.current);
    window.clearTimeout(openTimer.current);
    openTimer.current = window.setTimeout(() => setMenu(id), MENU_OPEN_DELAY_MS);
  };
  const closeMenu = () => {
    window.clearTimeout(closeTimer.current);
    window.clearTimeout(openTimer.current);
    setMenu(null);
  };
  const scheduleClose = () => {
    window.clearTimeout(closeTimer.current);
    window.clearTimeout(openTimer.current);
    closeTimer.current = window.setTimeout(() => setMenu(null), MENU_CLOSE_DELAY_MS);
  };

  const menuCategory = header.megaMenu ? categories.find((category) => category.id === menu && category.children?.length) : undefined;

  // Navigating anywhere closes every panel the header owns.
  useEffect(() => {
    setMenu(null);
    setDrawerOpen(false);
    setSearchOpen(false);
  }, [pathname, search]);

  useEffect(() => {
    if (!menu) return;
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setMenu(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menu]);

  useEffect(
    () => () => {
      window.clearTimeout(closeTimer.current);
      window.clearTimeout(openTimer.current);
    },
    [],
  );

  // Over the hero the header is transparent until the page scrolls, then it turns solid.
  const overlaysHero = overHero && header.variant !== 'classic';
  const floats = overlaysHero && !scrolled;
  // A sticky header slides away while scrolling down, unless one of its panels is open.
  const hidden = header.sticky && goingDown && !drawerOpen && !searchOpen && !menu;

  return (
    <header
      className="header"
      data-variant={header.variant}
      data-floating={floats}
      data-over-hero={overlaysHero}
      data-scrolled={scrolled}
      data-hidden={hidden}
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
          {categories.slice(0, NAV_ITEMS).map((category) => {
            const hasMenu = header.megaMenu && Boolean(category.children?.length);
            const open = menu === category.id;
            return (
              <div key={category.id} className="header__nav-item" onMouseEnter={hasMenu ? () => openMenuOnRest(category.id) : scheduleClose} onMouseLeave={hasMenu ? scheduleClose : undefined}>
                <NavLink
                  className="header__nav-link"
                  to={`/category/${category.slug}`}
                  aria-haspopup={hasMenu ? 'true' : undefined}
                  aria-expanded={hasMenu ? open : undefined}
                  data-open={open}
                  onFocus={hasMenu ? () => openMenu(category.id) : undefined}
                  onClick={closeMenu}
                >
                  {pick(category.name)}
                  {hasMenu && <LuChevronDown className="header__nav-caret" aria-hidden />}
                </NavLink>
              </div>
            );
          })}
          {/* Categories beyond the first few live in the drawer. */}
          {categories.length > NAV_ITEMS && (
            <button type="button" className="header__nav-link header__nav-more" onClick={() => {
                closeMenu();
                setDrawerOpen(true);
              }}
            >
              {t('nav.more')} <LuChevronDown className="header__nav-caret" aria-hidden />
            </button>
          )}
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

      {/*
       * The panel is a child of the header row, not of the navigation pill: the
       * pill has a backdrop filter, which would confine an absolutely placed
       * child to its own width. Hovering the panel keeps it open.
       */}
      {menuCategory && (
        <div className="container header__mega" onMouseEnter={() => openMenu(menuCategory.id)} onMouseLeave={scheduleClose}>
          <MegaMenu category={menuCategory} onNavigate={closeMenu} />
        </div>
      )}

      <CategoryDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} onLocale={onLocale} onSearch={() => setSearchOpen(true)} cartCount={cartCount} />
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
