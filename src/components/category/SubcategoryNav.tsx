import { Link } from 'react-router-dom';
import { LuCheck, LuLayoutGrid } from 'react-icons/lu';
import { productsInCategory, type Category } from '../../data/catalog';
import { useI18n } from '../../i18n/I18nProvider';
import { Picture } from '../ui/Picture';

interface SubcategoryNavProps {
  /** The category whose children are listed. */
  root: Category;
  /** The category being viewed: the root itself or one of its children. */
  currentId: string;
}

/**
 * Sub-categories as photo cards in a row that scrolls sideways on small
 * screens. The first card stands for the whole parent category; the card of
 * the category being viewed is marked.
 */
export function SubcategoryNav({ root, currentId }: SubcategoryNavProps) {
  const { t, pick, number } = useI18n();
  const children = root.children ?? [];
  if (children.length === 0) return null;

  const card = (active: boolean) =>
    `group relative flex w-[150px] shrink-0 snap-start flex-col gap-2 rounded-md border bg-surface p-2 transition-all duration-500 ease-theme sm:w-[170px] ${active ? 'border-accent shadow-[var(--shadow-card)]' : 'border-line hover:border-accent'}`;
  const check = (
    <span className="absolute end-3 top-3 z-[1] grid h-6 w-6 place-items-center rounded-pill bg-accent text-sm text-on-accent">
      <LuCheck aria-hidden />
    </span>
  );

  return (
    <nav className="mb-8" aria-label={t('nav.subcategories')}>
      <p className="mb-3 flex items-center gap-3 text-sm text-muted">
        {t('nav.subcategories')} <span className="h-px flex-1 bg-line" />
      </p>
      <ul className="subcategory-row flex snap-x gap-3 overflow-x-auto pb-2">
        <li>
          <Link className={card(currentId === root.id)} aria-current={currentId === root.id ? 'page' : undefined} to={`/category/${root.slug}`}>
            {currentId === root.id && check}
            <span className="grid aspect-[4/3] place-items-center rounded-sm bg-raise text-3xl text-accent">
              <LuLayoutGrid aria-hidden />
            </span>
            <span className="grid px-1 leading-snug">
              <strong>{t('category.all')}</strong>
              <span className="text-xs text-muted">{t('category.count', { count: number(productsInCategory(root.id).length) })}</span>
            </span>
          </Link>
        </li>
        {children.map((child) => (
          <li key={child.id}>
            <Link className={card(child.id === currentId)} aria-current={child.id === currentId ? 'page' : undefined} to={`/category/${child.slug}`}>
              {child.id === currentId && check}
              <span className="media-zoom block aspect-[4/3] rounded-sm">
                <Picture photo={child.photo} alt="" sizes="170px" />
              </span>
              <span className="grid px-1 leading-snug">
                <strong className="truncate transition-colors duration-300 group-hover:text-accent">{pick(child.name)}</strong>
                <span className="text-xs text-muted">{t('category.count', { count: number(productsInCategory(child.id).length) })}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
