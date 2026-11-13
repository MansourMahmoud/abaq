import { Link } from 'react-router-dom';
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
 * Sub-categories in a panel that overlaps the bottom edge of the listing
 * banner, so banner and navigation read as one block. Each entry is a round
 * photo with the name and product count; the first stands for the whole
 * parent category, and the one being viewed carries the accent ring.
 */
export function SubcategoryNav({ root, currentId }: SubcategoryNavProps) {
  const { t, pick, number } = useI18n();
  const entries = [{ category: root, label: t('category.all') }, ...(root.children ?? []).map((child) => ({ category: child, label: pick(child.name) }))];
  if (entries.length < 2) return null;

  return (
    <nav className="category-subnav" aria-label={t('nav.subcategories')}>
      <p className="category-subnav__title">
        <span className="eyebrow">{t('nav.subcategories')}</span>
        <strong>{pick(root.name)}</strong>
      </p>
      <ul className="subcategory-row">
        {entries.map(({ category, label }) => {
          const active = category.id === currentId;
          return (
            <li key={category.id}>
              <Link className="category-subnav__item" aria-current={active ? 'page' : undefined} to={`/category/${category.slug}`}>
                <span className="category-subnav__photo">
                  <Picture photo={category.photo} alt="" sizes="88px" />
                </span>
                <strong>{label}</strong>
                <small>{t('category.count', { count: number(productsInCategory(category.id).length) })}</small>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
