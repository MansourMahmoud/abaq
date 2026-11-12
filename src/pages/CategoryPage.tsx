import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { LuGalleryHorizontal, LuLayoutGrid } from 'react-icons/lu';
import { ProductRail } from '../components/product/ProductRail';
import { Picture } from '../components/ui/Picture';
import { findCategoryPath, productsInCategory } from '../data/catalog';
import { useI18n } from '../i18n/I18nProvider';
import { NotFoundPage } from './NotFoundPage';

/**
 * Category listing. Works at any depth of the category tree: the breadcrumb is
 * the path from the root, the chips are this category's children, and the
 * banner falls back to the nearest ancestor that defines one.
 */
export function CategoryPage() {
  const { slug = '' } = useParams();
  const { t, pick } = useI18n();
  const [layout, setLayout] = useState<'grid' | 'carousel'>('grid');

  const path = findCategoryPath(slug);
  if (!path) return <NotFoundPage title={t('category.notFound')} />;

  const category = path.at(-1)!;
  const parent = path.at(-2);
  const items = productsInCategory(category.id);
  const banner = [...path].reverse().find((entry) => entry.banner)?.banner;
  // A leaf category shows its siblings so the shopper can move sideways.
  const chips = category.children ?? parent?.children ?? [];
  const chipsRoot = category.children ? category : parent;

  return (
    <>
      <section className="container category-hero">
        <div className="banner category-hero__banner">
          <Picture photo={banner?.photo ?? category.photo} alt="" sizes="100vw" priority />
          <div className="banner__text">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link to="/">{t('nav.home')}</Link>
              {path.map((entry, index) =>
                index === path.length - 1 ? (
                  <span key={entry.id} aria-current="page">{pick(entry.name)}</span>
                ) : (
                  <Link key={entry.id} to={`/category/${entry.slug}`}>{pick(entry.name)}</Link>
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

        <div className="listing-bar">
          <p className="text-muted">{t('category.count', { count: items.length.toLocaleString() })}</p>
          <div className="listing-bar__layout">
            <button className="icon-button" type="button" aria-pressed={layout === 'grid'} aria-label="Grid" onClick={() => setLayout('grid')}>
              <LuLayoutGrid aria-hidden />
            </button>
            <button className="icon-button" type="button" aria-pressed={layout === 'carousel'} aria-label="Carousel" onClick={() => setLayout('carousel')}>
              <LuGalleryHorizontal aria-hidden />
            </button>
          </div>
        </div>

        {items.length > 0 ? (
          <ProductRail products={items} layout={layout} label={pick(category.name)} />
        ) : (
          <p className="empty-state">{t('category.empty')}</p>
        )}
      </section>
    </>
  );
}
