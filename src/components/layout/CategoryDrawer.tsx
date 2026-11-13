import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa6';
import { LuArrowLeft, LuArrowRight, LuChevronLeft, LuChevronRight, LuGlobe, LuHeart, LuLayoutGrid, LuMapPin, LuNewspaper, LuPhone, LuSearch, LuShoppingBag, LuUser, LuX } from 'react-icons/lu';
import type { IconType } from 'react-icons';
import { ALL_PRODUCTS, categories, productsInCategory, type Category } from '../../data/catalog';
import { STORE, whatsappUrl } from '../../data/content';
import { useI18n } from '../../i18n/I18nProvider';
import type { MessageKey } from '../../i18n/messages';
import { Logo } from '../ui/Logo';
import { Picture } from '../ui/Picture';
import { SocialLinks } from '../ui/SocialLinks';

interface CategoryDrawerProps {
  open: boolean;
  onClose: () => void;
  /** Opens the language and currency picker (the only entry point on phones). */
  onLocale: () => void;
  onSearch: () => void;
  cartCount: number;
}

const PAGES: { to: string; label: MessageKey; Icon: IconType }[] = [
  { to: `/category/${ALL_PRODUCTS.slug}`, label: 'nav.allProducts', Icon: LuLayoutGrid },
  { to: '/branches', label: 'nav.branches', Icon: LuMapPin },
  { to: '/blog', label: 'nav.blog', Icon: LuNewspaper },
];

/**
 * Off-canvas menu: search, account shortcuts, the category tree, the current
 * category's banner, store pages and contact details.
 *
 * Categories can nest to any depth. Selecting one with children pushes it
 * onto `trail` and the list shows that level, with a back button to pop and
 * a link to the whole category. The banner follows the level being viewed.
 */
export function CategoryDrawer({ open, onClose, onLocale, onSearch, cartCount }: CategoryDrawerProps) {
  const { pick, t, dir, number, currency } = useI18n();
  const [trail, setTrail] = useState<Category[]>([]);
  const closeButton = useRef<HTMLButtonElement>(null);

  const current = trail.at(-1);
  const level = current?.children ?? categories;
  const bannerOwner = [...trail].reverse().find((entry) => entry.banner) ?? categories.find((category) => category.banner);
  const Forward = dir === 'rtl' ? LuChevronLeft : LuChevronRight;
  const Back = dir === 'rtl' ? LuChevronRight : LuChevronLeft;
  const Arrow = dir === 'rtl' ? LuArrowLeft : LuArrowRight;

  useEffect(() => {
    if (!open) return;
    closeButton.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden'; // the page must not scroll behind the drawer
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  const close = () => {
    setTrail([]);
    onClose();
  };

  /** Closes the drawer, then runs an action that opens something else. */
  const leaveFor = (action: () => void) => () => {
    close();
    action();
  };

  if (!open) return null;

  const shortcut = 'relative grid justify-items-center gap-1.5 rounded-md border border-line bg-surface py-3 text-xs text-soft transition-colors duration-300 hover:border-accent hover:text-accent';
  const row = 'flex w-full items-center gap-3 rounded-md bg-transparent p-2 text-start transition-colors duration-300 hover:bg-raise';

  return (
    <div className="drawer" role="dialog" aria-modal="true" aria-label={t('nav.categories')}>
      <button className="drawer__scrim" type="button" aria-label={t('nav.close')} onClick={close} />
      <div className="scope-light drawer__panel">
        <div className="flex items-center justify-between gap-3">
          <Link className="header__logo text-accent" to="/" onClick={close} aria-label={t('nav.home')}>
            <Logo />
          </Link>
          <button ref={closeButton} className="icon-button" type="button" aria-label={t('nav.close')} onClick={close}>
            <LuX aria-hidden />
          </button>
        </div>

        <button type="button" onClick={leaveFor(onSearch)} className="flex h-12 w-full shrink-0 items-center gap-3 rounded-pill border border-line bg-surface px-4 text-start text-muted transition-colors duration-300 hover:border-accent">
          <LuSearch className="text-lg text-accent" aria-hidden /> {t('search.placeholder')}
        </button>

        <div className="grid shrink-0 grid-cols-3 gap-2">
          <button type="button" className={shortcut}>
            <LuUser className="text-xl text-accent" aria-hidden /> {t('action.account')}
          </button>
          <button type="button" className={shortcut}>
            <LuHeart className="text-xl text-accent" aria-hidden /> {t('action.wishlist')}
          </button>
          <Link to="/cart" onClick={close} className={shortcut}>
            <LuShoppingBag className="text-xl text-accent" aria-hidden /> {t('action.cart')}
            {cartCount > 0 && <span className="header__count">{number(cartCount)}</span>}
          </Link>
        </div>

        {/* Category tree */}
        <nav aria-label={t('nav.categories')}>
          {current ? (
            <div className="mb-2 flex items-center justify-between gap-3 rounded-md bg-raise p-2">
              <button type="button" onClick={() => setTrail(trail.slice(0, -1))} className="inline-flex items-center gap-1 rounded-pill bg-surface px-3 py-1.5 text-sm transition-colors duration-300 hover:text-accent">
                <Back aria-hidden /> {t('nav.back')}
              </button>
              <strong className="truncate font-display text-xl">{pick(current.name)}</strong>
              <Link to={`/category/${current.slug}`} onClick={close} className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-accent">
                {t('category.all')} <Arrow aria-hidden />
              </Link>
            </div>
          ) : (
            <p className="eyebrow mb-2 px-2">{t('nav.categories')}</p>
          )}

          <ul className="grid gap-0.5">
            {level.map((category) => {
              const body = (
                <>
                  <span className="h-12 w-12 shrink-0 overflow-hidden rounded-pill border border-line">
                    <Picture photo={category.photo} alt="" sizes="48px" />
                  </span>
                  <span className="grid min-w-0 flex-1 leading-snug">
                    <strong className="truncate font-display text-lg">{pick(category.name)}</strong>
                    <span className="truncate text-xs text-muted">{category.tagline ? pick(category.tagline) : t('category.count', { count: number(productsInCategory(category.id).length) })}</span>
                  </span>
                </>
              );
              return (
                <li key={category.id}>
                  {category.children?.length ? (
                    <button className={row} type="button" onClick={() => setTrail([...trail, category])}>
                      {body}
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-pill border border-line text-muted">
                        <Forward aria-hidden />
                      </span>
                    </button>
                  ) : (
                    <Link className={row} to={`/category/${category.slug}`} onClick={close}>
                      {body}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Banner of the category being viewed */}
        {bannerOwner?.banner && (
          <Link to={`/category/${bannerOwner.slug}`} onClick={close} className="scope-dark media-zoom relative block aspect-[16/9] shrink-0 rounded-md text-white">
            <span className="absolute inset-0">
              <Picture photo={bannerOwner.banner.photo} alt="" sizes="380px" />
            </span>
            <span className="absolute inset-0 flex flex-col justify-end gap-0.5 bg-gradient-to-t from-black/85 via-black/20 to-transparent p-4">
              <span className="text-xs text-[#d4af72]">{pick(bannerOwner.name)}</span>
              <span className="font-display text-2xl font-bold leading-snug">{pick(bannerOwner.banner.title)}</span>
              <span className="mt-1 inline-flex items-center gap-2 text-sm">
                {t('action.shopNow')} <Arrow aria-hidden />
              </span>
            </span>
          </Link>
        )}

        <ul className="grid gap-0.5 border-t border-line pt-3">
          {PAGES.map(({ to, label, Icon }) => (
            <li key={to}>
              <Link to={to} onClick={close} className="flex items-center gap-3 rounded-md p-2 text-soft transition-colors duration-300 hover:bg-raise hover:text-accent">
                <Icon className="text-lg text-accent" aria-hidden /> {t(label)}
              </Link>
            </li>
          ))}
          <li>
            <button type="button" onClick={leaveFor(onLocale)} className="flex w-full items-center gap-3 rounded-md bg-transparent p-2 text-start text-soft transition-colors duration-300 hover:bg-raise hover:text-accent">
              <LuGlobe className="text-lg text-accent" aria-hidden /> {t('locale.title')} · {currency}
            </button>
          </li>
        </ul>

        {/* Contact */}
        <div className="mt-auto grid gap-3 border-t border-line pt-4">
          <div className="grid grid-cols-2 gap-2">
            <a className="button !min-h-[44px] !px-3 text-sm" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <FaWhatsapp aria-hidden /> {t('footer.whatsapp')}
            </a>
            <a className="button button--ghost !min-h-[44px] !px-3 text-sm" href={`tel:${STORE.phone}`}>
              <LuPhone aria-hidden /> {t('help.call')}
            </a>
          </div>
          <SocialLinks className="justify-center" />
        </div>
      </div>
    </div>
  );
}
