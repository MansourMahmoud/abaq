import { Link } from 'react-router-dom';
import { LuArrowLeft, LuArrowRight, LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import { productsInCategory, type Category } from '../../data/catalog';
import { useI18n } from '../../i18n/I18nProvider';
import { Picture } from '../ui/Picture';

/**
 * Dropdown panel for one top-level category. It reads top to bottom as the
 * category tree does: the main category in the heading row, its
 * sub-categories as photo cards, and each sub-category's own children as
 * links under its card. The category banner sits beside them.
 *
 * The panel is a descendant of the navigation item, so hover and keyboard
 * focus keep it open without any script (see `.header__nav-item` styles).
 */
export function MegaMenu({ category }: { category: Category }) {
  const { t, pick, number, dir } = useI18n();
  const Arrow = dir === 'rtl' ? LuArrowLeft : LuArrowRight;
  const Branch = dir === 'rtl' ? LuChevronLeft : LuChevronRight;
  const children = category.children ?? [];

  return (
    <div className="mega">
      <div className="scope-light mega__panel overflow-hidden rounded-lg border border-line bg-surface shadow-[0_24px_60px_rgb(29_26_23/0.16)]">
        {/* Main category */}
        <div className="flex items-center justify-between gap-6 border-b border-line bg-raise px-6 py-4">
          <p className="grid leading-snug">
            <span className="text-xs text-muted">{t('nav.mainCategory')}</span>
            <strong className="font-display text-2xl">{pick(category.name)}</strong>
          </p>
          <Link to={`/category/${category.slug}`} className="inline-flex items-center gap-2 rounded-pill border border-accent px-4 py-2 text-sm font-semibold text-accent transition-colors duration-300 hover:bg-accent hover:text-on-accent">
            {t('nav.viewAllIn', { name: pick(category.name) })} <Arrow aria-hidden />
          </Link>
        </div>

        <div className="grid gap-6 p-6 lg:grid-cols-[minmax(0,1fr)_260px]">
          {/* Sub-categories, each with its own children */}
          <div>
            <p className="mb-3 text-xs text-muted">{t('nav.subcategories')}</p>
            <ul className="grid gap-4 sm:grid-cols-3">
              {children.map((child) => (
                <li key={child.id} className="min-w-0">
                  <Link to={`/category/${child.slug}`} className="scope-dark media-zoom group/card relative block aspect-[4/3] rounded-md">
                    <Picture photo={child.photo} alt="" sizes="200px" />
                    <span className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/10 to-transparent p-3 text-white">
                      <strong className="font-display text-lg leading-snug">{pick(child.name)}</strong>
                      <span className="truncate text-xs text-white/75">{child.tagline ? pick(child.tagline) : t('category.count', { count: number(productsInCategory(child.id).length) })}</span>
                    </span>
                  </Link>
                  {child.children && (
                    <div className="mt-2 rounded-md bg-raise p-2">
                      <p className="px-1 pb-1 text-[0.72rem] text-muted">{t('nav.inside', { name: pick(child.name) })}</p>
                      <ul className="grid gap-0.5 text-[0.88rem]">
                        {child.children.map((leaf) => (
                          <li key={leaf.id}>
                            <Link to={`/category/${leaf.slug}`} className="flex items-center gap-2 rounded-sm p-1 text-soft transition-colors duration-300 hover:bg-surface hover:text-accent">
                              <span className="h-7 w-7 shrink-0 overflow-hidden rounded-pill">
                                <Picture photo={leaf.photo} alt="" sizes="28px" />
                              </span>
                              <span className="min-w-0 flex-1 truncate">{pick(leaf.name)}</span>
                              <Branch className="shrink-0 text-muted" aria-hidden />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Category banner */}
          <Link to={`/category/${category.slug}`} className="scope-dark media-zoom relative hidden min-h-[230px] min-w-0 rounded-md lg:block">
            <span className="absolute inset-0">
              <Picture photo={category.banner?.photo ?? category.photo} alt="" sizes="260px" />
            </span>
            <span className="absolute inset-0 flex flex-col justify-end gap-1 bg-gradient-to-t from-black/85 to-transparent p-4 text-white">
              {category.tagline && <span className="text-xs text-[#d4af72]">{pick(category.tagline)}</span>}
              <span className="font-display text-xl font-bold leading-snug">{pick(category.banner?.title ?? category.name)}</span>
              <span className="mt-1 inline-flex items-center gap-2 text-sm">
                {t('action.shopNow')} <Arrow aria-hidden />
              </span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
