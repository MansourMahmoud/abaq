import { Link } from 'react-router-dom';
import { LuArrowLeft, LuArrowRight } from 'react-icons/lu';
import type { Category } from '../../data/catalog';
import { useI18n } from '../../i18n/I18nProvider';
import { Picture } from '../ui/Picture';

/**
 * Dropdown panel for one top-level category: its sub-categories as columns,
 * each with its own children underneath, and the category banner beside them.
 * The panel is a descendant of the navigation item, so hover and keyboard
 * focus keep it open without any script (see `.header__nav-item` styles).
 */
export function MegaMenu({ category }: { category: Category }) {
  const { t, pick, dir } = useI18n();
  const Arrow = dir === 'rtl' ? LuArrowLeft : LuArrowRight;
  const children = category.children ?? [];

  return (
    <div className="mega">
      <div className="scope-light mega__panel grid gap-8 rounded-lg border border-line bg-surface p-6 shadow-[0_24px_60px_rgb(29_26_23/0.16)] lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="grid content-start gap-x-6 gap-y-6 sm:grid-cols-3">
          {children.map((child) => (
            <div key={child.id} className="min-w-0">
              <Link to={`/category/${child.slug}`} className="group/item flex items-center gap-3">
                <span className="h-12 w-12 shrink-0 overflow-hidden rounded-pill border border-line">
                  <Picture photo={child.photo} alt="" sizes="48px" />
                </span>
                <span className="whitespace-nowrap font-display text-lg font-bold transition-colors duration-200 group-hover/item:text-accent">{pick(child.name)}</span>
              </Link>
              {child.children && (
                <ul className="mt-3 grid gap-1 border-s border-line ps-4 text-[0.92rem] text-soft">
                  {child.children.map((leaf) => (
                    <li key={leaf.id}>
                      <Link to={`/category/${leaf.slug}`} className="inline-block py-1 transition-colors duration-200 hover:text-accent">
                        {pick(leaf.name)}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <Link to={`/category/${category.slug}`} className="col-span-full inline-flex items-center gap-2 justify-self-start border-b border-current pb-0.5 text-sm font-semibold text-accent transition-opacity hover:opacity-75">
            {t('nav.viewAllIn', { name: pick(category.name) })} <Arrow aria-hidden />
          </Link>
        </div>

        <Link to={`/category/${category.slug}`} className="scope-dark media-zoom relative hidden min-h-[220px] min-w-0 rounded-md lg:block">
          <span className="absolute inset-0">
            <Picture photo={category.banner?.photo ?? category.photo} alt="" sizes="300px" />
          </span>
          <span className="absolute inset-0 flex flex-col justify-end gap-1 bg-gradient-to-t from-black/85 to-transparent p-5 text-white">
            {category.tagline && <span className="text-xs text-accent">{pick(category.tagline)}</span>}
            <span className="font-display text-2xl font-bold leading-snug">{pick(category.banner?.title ?? category.name)}</span>
          </span>
        </Link>
      </div>
    </div>
  );
}
