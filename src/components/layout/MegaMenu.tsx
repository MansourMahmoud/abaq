import { Link } from 'react-router-dom';
import { LuArrowLeft, LuArrowRight } from 'react-icons/lu';
import { productsInCategory, type Category } from '../../data/catalog';
import { useI18n } from '../../i18n/I18nProvider';
import { Picture } from '../ui/Picture';

/**
 * Dropdown panel for one top-level category, laid out as a classic mega menu:
 * one column per sub-category (photo, name, product count as the column
 * heading; its own children as a plain list underneath), the category banner
 * on the side, and a footer row with the link to the whole category.
 *
 * The panel is a descendant of the navigation item, so hover and keyboard
 * focus keep it open without any script (see `.header__nav-item` styles).
 */
/*
 * The panel stays a fixed, readable size however large the tree is: at most
 * this many sub-categories, each with this many of its children. The rest is
 * one click away through the "view all" links (the listing page shows every
 * sub-category in a row that scrolls).
 */
const MAX_COLUMNS = 8;
const MAX_LEAVES = 4;
/** With many columns, each lists fewer children so the panel stays short. */
const MAX_LEAVES_DENSE = 3;

export function MegaMenu({ category }: { category: Category }) {
  const { t, pick, number, dir } = useI18n();
  const Arrow = dir === 'rtl' ? LuArrowLeft : LuArrowRight;
  const all = category.children ?? [];
  const children = all.slice(0, MAX_COLUMNS);

  return (
    <div className="mega">
      <div className="scope-light mega__panel overflow-hidden rounded-lg border border-line bg-surface shadow-[0_24px_60px_rgb(29_26_23/0.16)]">
        <div className="mega__body grid gap-8 p-6 lg:grid-cols-[minmax(0,1fr)_230px]">
          <ul className={`grid content-start gap-x-6 gap-y-6 ${children.length > 6 ? 'sm:grid-cols-4' : 'sm:grid-cols-3'}`}>
            {children.map((child) => (
              <li key={child.id} className="min-w-0">
                <Link to={`/category/${child.slug}`} className="group/head flex items-center gap-3 border-b border-line pb-3">
                  <span className="h-12 w-12 shrink-0 overflow-hidden rounded-pill border border-line transition-colors duration-500 group-hover/head:border-accent">
                    <Picture photo={child.photo} alt="" sizes="48px" />
                  </span>
                  <span className="grid min-w-0 leading-snug">
                    <strong className="line-clamp-2 font-display text-lg leading-snug transition-colors duration-300 group-hover/head:text-accent" title={pick(child.name)}>
                      {pick(child.name)}
                    </strong>
                    <span className="text-xs text-muted">{t('category.count', { count: number(productsInCategory(child.id).length) })}</span>
                  </span>
                </Link>
                <ul className="mt-2 grid gap-0.5 text-[0.92rem]">
                  {(child.children ?? []).slice(0, children.length > 6 ? MAX_LEAVES_DENSE : MAX_LEAVES).map((leaf) => (
                    <li key={leaf.id}>
                      <Link to={`/category/${leaf.slug}`} className="mega__leaf" title={pick(leaf.name)}>
                        {pick(leaf.name)}
                      </Link>
                    </li>
                  ))}
                  {(child.children?.length ?? 0) > 0 && (
                    <li>
                      <Link to={`/category/${child.slug}`} className="mega__leaf text-muted">
                        {t('category.all')}
                      </Link>
                    </li>
                  )}
                </ul>
              </li>
            ))}
          </ul>

          <Link to={`/category/${category.slug}`} className="scope-dark media-zoom relative hidden aspect-[4/5] min-w-0 self-start rounded-md lg:block">
            <span className="absolute inset-0">
              <Picture photo={category.banner?.photo ?? category.photo} alt="" sizes="250px" />
            </span>
            <span className="absolute inset-0 flex flex-col justify-end gap-1 bg-gradient-to-t from-black/85 to-transparent p-4 text-white">
              {category.tagline && <span className="text-xs text-[#d4af72]">{pick(category.tagline)}</span>}
              <span className="font-display text-xl font-bold leading-snug">{pick(category.banner?.title ?? category.name)}</span>
            </span>
          </Link>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-line bg-raise px-6 py-3 text-sm">
          <span className="min-w-0 truncate text-muted">{category.description ? pick(category.description) : ''}</span>
          <Link to={`/category/${category.slug}`} className="inline-flex shrink-0 items-center gap-2 font-semibold text-accent transition-opacity duration-300 hover:opacity-70">
            {all.length > children.length ? t('nav.moreCategories', { count: number(all.length - children.length) }) : t('nav.viewAllIn', { name: pick(category.name) })} <Arrow aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}
