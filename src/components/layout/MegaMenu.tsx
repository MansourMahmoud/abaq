import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LuArrowLeft, LuArrowRight, LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import { productsInCategory, type Category } from '../../data/catalog';
import { useI18n } from '../../i18n/I18nProvider';
import { Picture } from '../ui/Picture';

interface MegaMenuProps {
  category: Category;
  /** Called when a link is chosen, so the header can close the panel. */
  onNavigate: () => void;
}

/** Products previewed for the hovered sub-category. */
const PREVIEW_PRODUCTS = 4;

/**
 * Sub-category panel for one top-level category, using the full width of the
 * header. It has three parts:
 *
 * 1. a list of the sub-categories, which scrolls on its own, so it holds any
 *    number of them;
 * 2. the content of whichever sub-category is hovered or focused: its own
 *    children as photo cards when it branches further, then a few of its
 *    products;
 * 3. the category banner.
 */
export function MegaMenu({ category, onNavigate }: MegaMenuProps) {
  const { t, pick, number, money, dir } = useI18n();
  const children = category.children ?? [];
  const [activeId, setActiveId] = useState(children[0]?.id);
  const active = children.find((child) => child.id === activeId) ?? children[0];
  const Arrow = dir === 'rtl' ? LuArrowLeft : LuArrowRight;
  const Chevron = dir === 'rtl' ? LuChevronLeft : LuChevronRight;

  if (!active) return null;
  const branches = active.children ?? [];
  const products = productsInCategory(active.id).slice(0, PREVIEW_PRODUCTS);

  return (
    <div className="mega">
      <div className="scope-light overflow-hidden rounded-lg border border-line bg-surface shadow-[0_24px_60px_rgb(29_26_23/0.16)]">
        <div className="grid lg:grid-cols-[250px_minmax(0,1fr)_260px]">
          {/* 1. Sub-categories */}
          <div className="border-e border-line bg-raise p-3">
            <p className="px-3 pb-2 pt-1 text-xs text-muted">
              {t('nav.subcategories')} · {number(children.length)}
            </p>
            <ul className="mega__list grid gap-0.5">
              {children.map((child) => {
                const current = child.id === active.id;
                return (
                  <li key={child.id}>
                    <Link
                      to={`/category/${child.slug}`}
                      onClick={onNavigate}
                      onMouseEnter={() => setActiveId(child.id)}
                      onFocus={() => setActiveId(child.id)}
                      className={`flex items-center gap-3 rounded-md px-3 py-2 transition-colors duration-300 ${current ? 'bg-surface text-accent shadow-[var(--shadow-card)]' : 'hover:bg-surface'}`}
                    >
                      <span className="h-9 w-9 shrink-0 overflow-hidden rounded-pill border border-line">
                        <Picture photo={child.photo} alt="" sizes="36px" />
                      </span>
                      <span className="min-w-0 flex-1 truncate font-semibold">{pick(child.name)}</span>
                      {child.children?.length ? <Chevron className="shrink-0 text-muted" aria-hidden /> : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* 2. The hovered sub-category */}
          <div className="mega__content min-w-0 p-6">
            <div className="mb-4 flex items-end justify-between gap-4 border-b border-line pb-4">
              <p className="grid min-w-0 leading-snug">
                <strong className="truncate font-display text-2xl">{pick(active.name)}</strong>
                <span className="truncate text-sm text-muted">{active.tagline ? pick(active.tagline) : t('category.count', { count: number(productsInCategory(active.id).length) })}</span>
              </p>
              <Link to={`/category/${active.slug}`} onClick={onNavigate} className="inline-flex shrink-0 items-center gap-2 rounded-pill border border-accent px-4 py-1.5 text-sm font-semibold text-accent transition-colors duration-300 hover:bg-accent hover:text-on-accent">
                {t('category.all')} <Arrow aria-hidden />
              </Link>
            </div>

            {branches.length > 0 && (
              <div className="mb-5">
                <p className="mb-3 text-xs text-muted">{t('nav.insideCount', { name: pick(active.name), count: number(branches.length) })}</p>
                <ul className="grid grid-cols-2 gap-3 xl:grid-cols-3">
                  {branches.map((leaf) => (
                    <li key={leaf.id}>
                      <Link to={`/category/${leaf.slug}`} onClick={onNavigate} className="group flex items-center gap-3 rounded-md border border-line p-2 transition-colors duration-300 hover:border-accent hover:bg-raise">
                        <span className="media-zoom h-16 w-16 shrink-0 rounded-sm">
                          <Picture photo={leaf.photo} alt="" sizes="64px" />
                        </span>
                        <span className="grid min-w-0 leading-snug">
                          <strong className="truncate transition-colors duration-300 group-hover:text-accent">{pick(leaf.name)}</strong>
                          <span className="line-clamp-2 text-xs text-muted">{leaf.tagline ? pick(leaf.tagline) : t('category.count', { count: number(productsInCategory(leaf.id).length) })}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {products.length > 0 && (
              <div>
                <p className="mb-3 text-xs text-muted">{t('nav.topIn', { name: pick(active.name) })}</p>
                <ul className="grid grid-cols-2 gap-3">
                  {products.map((product) => (
                    <li key={product.id}>
                      <Link to={`/product/${product.slug}`} onClick={onNavigate} className="group flex items-center gap-3 rounded-md border border-line p-2 transition-colors duration-300 hover:border-accent hover:bg-raise">
                        <span className="h-16 w-14 shrink-0 overflow-hidden rounded-sm bg-raise">
                          <Picture photo={product.photos[0]} alt="" sizes="56px" />
                        </span>
                        <span className="grid min-w-0 leading-snug">
                          <strong className="truncate transition-colors duration-300 group-hover:text-accent">{pick(product.name)}</strong>
                          <span className="truncate text-xs text-muted">{pick(product.notes)}</span>
                          <span className="text-sm font-semibold tabular-nums">{money(product.price)}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {branches.length === 0 && products.length === 0 && <p className="py-8 text-center text-muted">{t('category.none')}</p>}
          </div>

          {/* 3. Category banner */}
          <Link to={`/category/${category.slug}`} onClick={onNavigate} className="scope-dark media-zoom relative hidden min-h-[260px] text-white lg:block">
            <span className="absolute inset-0">
              <Picture photo={category.banner?.photo ?? category.photo} alt="" sizes="260px" />
            </span>
            <span className="absolute inset-0 flex flex-col justify-end gap-1 bg-gradient-to-t from-black/85 via-black/20 to-transparent p-5">
              <span className="text-xs text-[#d4af72]">{pick(category.name)}</span>
              <span className="font-display text-2xl font-bold leading-snug">{pick(category.banner?.title ?? category.name)}</span>
              <span className="mt-1 inline-flex items-center gap-2 text-sm">
                {t('nav.viewAllIn', { name: pick(category.name) })} <Arrow aria-hidden />
              </span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
