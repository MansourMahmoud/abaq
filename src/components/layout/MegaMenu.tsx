import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { LuArrowLeft, LuArrowRight, LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import { productsInCategory, type Category } from '../../data/catalog';
import { useI18n } from '../../i18n/I18nProvider';
import { Picture } from '../ui/Picture';
import { Price } from '../ui/Price';

interface MegaMenuProps {
  category: Category;
  /** Called when a link is chosen, so the header can close the panel. */
  onNavigate: () => void;
}

/** Products previewed for the hovered sub-category. */
const PREVIEW_PRODUCTS = 3;
/** How long the pointer must rest on a sub-category before the content switches to it. */
const HOVER_INTENT_MS = 160;

/**
 * Sub-category panel for one top-level category, using the full width of the
 * header. It has three parts:
 *
 * 1. a list of the sub-categories, which scrolls on its own, so it holds any
 *    number of them;
 * 2. the content of whichever sub-category the pointer rests on: its own
 *    children as photo tiles when it branches further, then a few of its
 *    products;
 * 3. the category banner.
 *
 * The content only changes once the pointer has paused on an entry, and the
 * new content fades in, so moving down the list does not make the panel flash.
 */
export function MegaMenu({ category, onNavigate }: MegaMenuProps) {
  const { t, pick, number, dir } = useI18n();
  const children = category.children ?? [];
  const [activeId, setActiveId] = useState<string | undefined>(children[0]?.id);
  const intent = useRef<number | undefined>(undefined);
  const Arrow = dir === 'rtl' ? LuArrowLeft : LuArrowRight;
  const Chevron = dir === 'rtl' ? LuChevronLeft : LuChevronRight;

  // A different top-level category starts on its first sub-category.
  useEffect(() => {
    setActiveId(category.children?.[0]?.id);
  }, [category]);

  useEffect(() => () => window.clearTimeout(intent.current), []);

  const activateOnRest = (id: string) => {
    window.clearTimeout(intent.current);
    intent.current = window.setTimeout(() => setActiveId(id), HOVER_INTENT_MS);
  };

  const active = children.find((child) => child.id === activeId) ?? children[0];
  if (!active) return null;
  const branches = active.children ?? [];
  const products = productsInCategory(active.id).slice(0, PREVIEW_PRODUCTS);

  return (
    <div className="mega">
      <div className="scope-light overflow-hidden rounded-lg border border-line bg-surface shadow-[0_24px_60px_rgb(29_26_23/0.16)]">
        <div className="grid lg:grid-cols-[240px_minmax(0,1fr)_250px]">
          {/* 1. Sub-categories */}
          <div className="bg-raise p-3">
            <p className="px-3 pb-2 pt-2 text-xs text-muted">
              {t('nav.subcategories')} · {number(children.length)}
            </p>
            <ul className="mega__list grid gap-0.5" onMouseLeave={() => window.clearTimeout(intent.current)}>
              {children.map((child) => {
                const current = child.id === active.id;
                return (
                  <li key={child.id}>
                    <Link to={`/category/${child.slug}`} onClick={onNavigate} onMouseEnter={() => activateOnRest(child.id)} onFocus={() => setActiveId(child.id)} className="mega__entry" data-current={current}>
                      <span className="h-9 w-9 shrink-0 overflow-hidden rounded-pill">
                        <Picture photo={child.photo} alt="" sizes="36px" />
                      </span>
                      <span className="min-w-0 flex-1 truncate">{pick(child.name)}</span>
                      {child.children?.length ? <Chevron className="shrink-0 opacity-50" aria-hidden /> : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* 2. The sub-category the pointer rests on. Keyed so each one fades in. */}
          <div key={active.id} className="mega__content min-w-0 px-8 py-7">
            <div className="flex items-start justify-between gap-6">
              <p className="grid min-w-0 gap-1">
                <strong className="truncate font-display text-3xl leading-[var(--lh-display)]">{pick(active.name)}</strong>
                <span className="truncate text-muted">{active.tagline ? pick(active.tagline) : t('category.count', { count: number(productsInCategory(active.id).length) })}</span>
              </p>
              <Link to={`/category/${active.slug}`} onClick={onNavigate} className="link mt-2 inline-flex shrink-0 items-center gap-2 text-sm font-semibold">
                {t('category.allOf', { name: pick(active.name) })} <Arrow aria-hidden />
              </Link>
            </div>

            {branches.length > 0 && (
              <div className="mt-7">
                <p className="mega__label">{t('nav.insideCount', { name: pick(active.name), count: number(branches.length) })}</p>
                <ul className="grid grid-cols-4 gap-5">
                  {branches.map((leaf) => (
                    <li key={leaf.id}>
                      <Link to={`/category/${leaf.slug}`} onClick={onNavigate} className="group grid gap-2.5">
                        <span className="media-zoom block aspect-[3/2] rounded-md">
                          <Picture photo={leaf.photo} alt="" sizes="200px" />
                        </span>
                        <span className="grid leading-snug">
                          <strong className="truncate transition-colors duration-300 group-hover:text-accent">{pick(leaf.name)}</strong>
                          <span className="line-clamp-1 text-sm text-muted">{leaf.tagline ? pick(leaf.tagline) : t('category.count', { count: number(productsInCategory(leaf.id).length) })}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {products.length > 0 && (
              <div className="mt-7">
                <p className="mega__label">{t('nav.topIn', { name: pick(active.name) })}</p>
                <ul className="grid grid-cols-3 gap-5">
                  {products.map((product) => (
                    <li key={product.id}>
                      <Link to={`/product/${product.slug}`} onClick={onNavigate} className="group flex items-center gap-3">
                        <span className="h-[72px] w-16 shrink-0 overflow-hidden rounded-md bg-raise">
                          <Picture photo={product.photos[0]} alt="" sizes="64px" />
                        </span>
                        <span className="grid min-w-0 gap-0.5 leading-snug">
                          <strong className="truncate transition-colors duration-300 group-hover:text-accent">{pick(product.name)}</strong>
                          <span className="truncate text-sm text-muted">{pick(product.family)}</span>
                          <Price product={product} className="text-sm font-semibold" />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {branches.length === 0 && products.length === 0 && <p className="py-10 text-center text-muted">{t('category.none')}</p>}
          </div>

          {/* 3. Category banner */}
          <Link to={`/category/${category.slug}`} onClick={onNavigate} className="scope-dark media-zoom relative hidden min-h-[300px] text-white lg:block">
            <span className="absolute inset-0">
              <Picture photo={category.banner?.photo ?? category.photo} alt="" sizes="250px" />
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
