import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { LuGrid2X2, LuGrid3X3, LuSlidersHorizontal, LuX } from 'react-icons/lu';
import { FilterPanel } from '../components/category/FilterPanel';
import { ProductListing } from '../components/category/ProductListing';
import { ProductRail } from '../components/product/ProductRail';
import { Picture } from '../components/ui/Picture';
import { ALL_PRODUCTS, brands, categories, findCategoryPath, productsInCategory, type Category } from '../data/catalog';
import { useI18n } from '../i18n/I18nProvider';
import type { MessageKey } from '../i18n/messages';
import { SORTS, applyFilters, countFilters, readFilters, writeFilters, type Filters, type Sort } from '../lib/filters';
import { useThemeSettings } from '../settings/ThemeSettings';
import { NotFoundPage } from './NotFoundPage';

const SORT_LABELS: Record<Sort, MessageKey> = {
  featured: 'sort.featured',
  priceAsc: 'sort.priceAsc',
  priceDesc: 'sort.priceDesc',
  rating: 'sort.rating',
  discount: 'sort.discount',
};

/** Path from the root to the category with this slug; the "all products" page is its own root. */
function resolvePath(slug: string): Category[] | null {
  return slug === ALL_PRODUCTS.slug ? [{ ...ALL_PRODUCTS, children: categories }] : findCategoryPath(slug);
}

/**
 * Category listing. Works at any depth of the category tree: the breadcrumb is
 * the path from the root, the chips are this category's children, and the
 * banner falls back to the nearest ancestor that defines one. Filters and the
 * sort order live in the URL (see `lib/filters`).
 */
export function CategoryPage() {
  const { slug = '' } = useParams();
  const { t, pick, money, number } = useI18n();
  const settings = useThemeSettings().settings.category;
  const [params, setParams] = useSearchParams();
  const [density, setDensity] = useState<'comfortable' | 'compact'>('comfortable');
  const sheet = useRef<HTMLDialogElement>(null);

  const path = useMemo(() => resolvePath(slug), [slug]);
  const category = path?.at(-1);
  const all = useMemo(() => (category ? productsInCategory(category.id) : []), [category]);
  const filters = useMemo(() => readFilters(params), [params]);
  const items = useMemo(() => applyFilters(all, filters), [all, filters]);

  // The filter sheet belongs to one listing; moving to another closes it.
  useEffect(() => sheet.current?.close(), [slug]);

  if (!path || !category) return <NotFoundPage title={t('category.notFound')} />;

  const parent = path.at(-2);
  const banner = [...path].reverse().find((entry) => entry.banner)?.banner;
  // A leaf category shows its siblings so the shopper can move sideways.
  const chips = category.children ?? parent?.children ?? [];
  const chipsRoot = category.children ? category : parent;
  const activeCount = countFilters(filters);

  const update = (patch: Partial<Filters>) => setParams(writeFilters({ ...filters, ...patch }), { replace: true, preventScrollReset: true });
  const clear = () => setParams(writeFilters({ ...readFilters(new URLSearchParams()), sort: filters.sort }), { replace: true });

  /** One removable chip per active filter. */
  const active: { label: string; remove: () => void }[] = [
    ...filters.categories.map((id) => ({ label: pick(category.children?.find((entry) => entry.id === id)?.name ?? { ar: id, en: id }), remove: () => update({ categories: filters.categories.filter((entry) => entry !== id) }) })),
    ...filters.brands.map((id) => ({ label: pick(brands.find((brand) => brand.id === id)?.name ?? { ar: id, en: id }), remove: () => update({ brands: filters.brands.filter((entry) => entry !== id) }) })),
    ...(filters.min !== undefined || filters.max !== undefined
      ? [{ label: [filters.min !== undefined && `${t('filters.from')} ${money(filters.min)}`, filters.max !== undefined && `${t('filters.to')} ${money(filters.max)}`].filter(Boolean).join(' '), remove: () => update({ min: undefined, max: undefined }) }]
      : []),
    ...(filters.rating !== undefined ? [{ label: t('filters.ratingFrom', { rating: number(filters.rating) }), remove: () => update({ rating: undefined }) }] : []),
    ...(filters.onSale ? [{ label: t('filters.onSale'), remove: () => update({ onSale: false }) }] : []),
    ...(filters.inStock ? [{ label: t('filters.inStock'), remove: () => update({ inStock: false }) }] : []),
  ];

  const panel = <FilterPanel filters={filters} onChange={update} products={all} subcategories={category.children ?? []} />;

  return (
    <>
      <section className="container category-hero">
        <div className="banner category-hero__banner">
          <Picture photo={banner?.photo ?? category.photo} alt="" sizes="100vw" priority />
          <div className="banner__text">
            <nav className="breadcrumb" aria-label={t('nav.breadcrumb')}>
              <Link to="/">{t('nav.home')}</Link>
              {path.map((entry, index) =>
                index === path.length - 1 ? (
                  <span key={entry.id} aria-current="page">
                    {pick(entry.name)}
                  </span>
                ) : (
                  <Link key={entry.id} to={`/category/${entry.slug}`}>
                    {pick(entry.name)}
                  </Link>
                ),
              )}
            </nav>
            <h1 className="category-hero__title">{pick(category.name)}</h1>
            {category.description && <p className="text-soft category-hero__lead">{pick(category.description)}</p>}
          </div>
        </div>
      </section>

      <section className="section container">
        {chips.length > 0 && chipsRoot && (
          <ul className="chips" aria-label={pick(chipsRoot.name)}>
            <li>
              <Link className="chip" aria-current={category.id === chipsRoot.id ? 'page' : undefined} to={`/category/${chipsRoot.slug}`}>
                {t('category.all')}
              </Link>
            </li>
            {chips.map((child) => (
              <li key={child.id}>
                <Link className="chip" aria-current={child.id === category.id ? 'page' : undefined} to={`/category/${child.slug}`}>
                  <span className="chip__thumb">
                    <Picture photo={child.photo} alt="" sizes="40px" />
                  </span>
                  {pick(child.name)}
                </Link>
              </li>
            ))}
          </ul>
        )}

        <div className="listing" data-filters={settings.filters}>
          {settings.filters && all.length > 0 && (
            <aside className="listing__sidebar" aria-label={t('filters.title')}>
              <div className="flex items-center justify-between pb-2">
                <h2 className="font-body text-lg font-semibold">{t('filters.title')}</h2>
                {activeCount > 0 && (
                  <button className="bg-transparent p-0 text-sm text-accent underline-offset-4 hover:underline" type="button" onClick={clear}>
                    {t('filters.clear')}
                  </button>
                )}
              </div>
              {panel}
            </aside>
          )}

          <div className="min-w-0">
            <div className="listing-bar">
              <p className="text-muted">{t('category.count', { count: number(items.length) })}</p>
              <div className="flex flex-wrap items-center gap-2">
                {settings.filters && (
                  <button className="listing-bar__filters" type="button" onClick={() => sheet.current?.showModal()}>
                    <LuSlidersHorizontal aria-hidden /> {t('filters.title')}
                    {activeCount > 0 && <span className="header__count !static">{number(activeCount)}</span>}
                  </button>
                )}
                <label className="listing-bar__sort">
                  <span className="visually-hidden">{t('sort.label')}</span>
                  <select value={filters.sort} onChange={(event) => update({ sort: event.target.value as Sort })}>
                    {SORTS.map((sort) => (
                      <option key={sort} value={sort}>
                        {t(SORT_LABELS[sort])}
                      </option>
                    ))}
                  </select>
                </label>
                <div className="listing-bar__layout">
                  <button className="icon-button" type="button" aria-pressed={density === 'comfortable'} aria-label={t('category.comfortable')} onClick={() => setDensity('comfortable')}>
                    <LuGrid2X2 aria-hidden />
                  </button>
                  <button className="icon-button" type="button" aria-pressed={density === 'compact'} aria-label={t('category.compact')} onClick={() => setDensity('compact')}>
                    <LuGrid3X3 aria-hidden />
                  </button>
                </div>
              </div>
            </div>

            {active.length > 0 && (
              <ul className="mb-5 flex flex-wrap gap-2" aria-label={t('filters.active')}>
                {active.map((entry) => (
                  <li key={entry.label}>
                    <button type="button" onClick={entry.remove} className="inline-flex items-center gap-2 rounded-pill border border-accent bg-surface px-3 py-1.5 text-sm text-accent transition-colors duration-300 hover:bg-accent hover:text-on-accent">
                      {entry.label} <LuX aria-hidden />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {items.length > 0 ? (
              <ProductListing products={items} label={pick(category.name)} density={density} />
            ) : (
              <div className="empty-state">
                <p>{all.length > 0 ? t('filters.empty') : t('category.empty')}</p>
                {activeCount > 0 && (
                  <button className="button button--ghost" type="button" onClick={clear}>
                    {t('filters.clear')}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Supporting sections under the listing; each can be switched off by the merchant. */}
      <section className="section section--flush-top container">
        <div className="grid gap-4 md:grid-cols-2">
          <Link className="banner banner--strip media-zoom" to="/category/gifts">
            <Picture photo="bottlesRow" alt="" sizes="(min-width: 768px) 50vw, 100vw" />
            <span className="banner__text">
              <span className="eyebrow">{pick({ ar: 'أطقم الهدايا', en: 'Gift sets' })}</span>
              <span className="banner__title">{pick({ ar: 'هدية جاهزة بالتغليف والبطاقة', en: 'A gift, wrapped and signed' })}</span>
            </span>
          </Link>
          <Link className="banner banner--strip media-zoom" to="/category/bakhoor">
            <Picture photo="burnerMajlis" alt="" sizes="(min-width: 768px) 50vw, 100vw" />
            <span className="banner__text">
              <span className="eyebrow">{pick({ ar: 'البخور', en: 'Bakhoor' })}</span>
              <span className="banner__title">{pick({ ar: 'رائحة المجالس تبدأ من هنا', en: 'The scent of the majlis starts here' })}</span>
            </span>
          </Link>
        </div>
      </section>

      <section className="section section--surface">
        <div className="container">
          <div className="section__head">
            <h2 className="section__title">{t('category.bestsellers')}</h2>
          </div>
          <ProductRail products={productsInCategory(ALL_PRODUCTS.id).filter((product) => product.rating >= 4.8)} layout="carousel" label={t('category.bestsellers')} />
        </div>
      </section>

      {/* Phones: the filters open in a sheet from the bottom of the screen. */}
      {settings.filters && (
        <dialog ref={sheet} className="sheet" aria-label={t('filters.title')} onClick={(event) => event.target === sheet.current && sheet.current?.close()}>
          <div className="sheet__head">
            <h2 className="font-body text-lg font-semibold">{t('filters.title')}</h2>
            <button className="icon-button" type="button" aria-label={t('action.close')} onClick={() => sheet.current?.close()}>
              <LuX aria-hidden />
            </button>
          </div>
          <div className="sheet__body">{panel}</div>
          <div className="sheet__foot">
            <button className="button button--ghost" type="button" onClick={clear}>
              {t('filters.clear')}
            </button>
            <button className="button" type="button" onClick={() => sheet.current?.close()}>
              {t('filters.show', { count: number(items.length) })}
            </button>
          </div>
        </dialog>
      )}
    </>
  );
}
