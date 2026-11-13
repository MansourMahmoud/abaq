import { Link } from 'react-router-dom';
import { LuArrowLeft, LuArrowRight } from 'react-icons/lu';
import { productsInCategory, type Category } from '../../data/catalog';
import { useI18n } from '../../i18n/I18nProvider';
import { Carousel } from '../ui/Carousel';
import { Picture } from '../ui/Picture';

interface SubcategoryNavProps {
  /** The category whose children are listed. */
  root: Category;
  /** The category above `root`, when there is one, for the "back" link. */
  parent?: Category;
  /** The category being viewed: the root itself or one of its children. */
  currentId: string;
}

/**
 * The sub-categories of the listing being viewed, as a row of arch-shaped photos that
 * scrolls once there are more than fit. It works at every level of the tree:
 * on a category it lists that category's children; on a leaf it lists the
 * leaf's siblings, so the shopper can move sideways. Each entry says what the
 * sub-category is, how many products it holds and whether it branches further.
 */
export function SubcategoryNav({ root, parent, currentId }: SubcategoryNavProps) {
  const { t, pick, number, dir } = useI18n();
  const children = root.children ?? [];
  if (children.length === 0) return null;
  const Back = dir === 'rtl' ? LuArrowRight : LuArrowLeft;

  const entries = [{ category: root, name: t('category.allOf', { name: pick(root.name) }), hint: root.tagline }, ...children.map((child) => ({ category: child, name: pick(child.name), hint: child.tagline }))];

  return (
    <section className="container subcategories" aria-label={t('nav.subcategories')}>
      <div className="section__head !mb-5">
        <div>
          <p className="eyebrow">{t('nav.subcategories')}</p>
          <h2 className="font-display text-2xl font-bold leading-[var(--lh-display)] md:text-3xl">{t('category.browse', { name: pick(root.name) })}</h2>
        </div>
        {parent && (
          <Link className="link inline-flex items-center gap-2" to={`/category/${parent.slug}`}>
            <Back aria-hidden /> {t('category.backTo', { name: pick(parent.name) })}
          </Link>
        )}
      </div>

      <Carousel label={t('nav.subcategories')} variant="tiles">
        {entries.map(({ category, name, hint }) => {
          const active = category.id === currentId;
          const count = productsInCategory(category.id).length;
          const branches = category.id === root.id ? 0 : (category.children?.length ?? 0);
          return (
            <Link key={category.id} className="subcategory" aria-current={active ? 'page' : undefined} to={`/category/${category.slug}`}>
              <span className="subcategory__media">
                <span>
                  <Picture photo={category.photo} alt="" sizes="190px" />
                </span>
                {active && <span className="subcategory__current">{t('category.viewing')}</span>}
              </span>
              <strong className="subcategory__name">{name}</strong>
              {hint && <span className="subcategory__hint">{pick(hint)}</span>}
              <span className="subcategory__meta">
                {count > 0 ? t('category.count', { count: number(count) }) : t('category.none')}
                {branches > 0 && (
                  <>
                    {' · '}
                    <b>{t('category.branches', { count: number(branches) })}</b>
                  </>
                )}
              </span>
            </Link>
          );
        })}
      </Carousel>
    </section>
  );
}
