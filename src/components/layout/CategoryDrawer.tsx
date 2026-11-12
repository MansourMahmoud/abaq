import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { LuChevronLeft, LuChevronRight, LuX } from 'react-icons/lu';
import { categories, type Category } from '../../data/catalog';
import { useI18n } from '../../i18n/I18nProvider';
import { Picture } from '../ui/Picture';

interface CategoryDrawerProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Off-canvas category menu. Categories can nest to any depth: selecting one
 * with children pushes it onto `trail` and the panel shows that level, with a
 * back button to pop. The current level's banner is shown beside the list.
 */
export function CategoryDrawer({ open, onClose }: CategoryDrawerProps) {
  const { pick, t, dir } = useI18n();
  const [trail, setTrail] = useState<Category[]>([]);
  const closeButton = useRef<HTMLButtonElement>(null);

  const current = trail.at(-1);
  const level = current?.children ?? categories;
  const banner = current?.banner ?? categories.find((category) => category.banner)?.banner;
  const Forward = dir === 'rtl' ? LuChevronLeft : LuChevronRight;
  const Back = dir === 'rtl' ? LuChevronRight : LuChevronLeft;

  useEffect(() => {
    if (!open) return;
    closeButton.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden'; // the page must not scroll behind the drawer
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  const close = () => {
    setTrail([]);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="drawer" role="dialog" aria-modal="true" aria-label={t('nav.categories')}>
      <button className="drawer__scrim" type="button" aria-label={t('nav.close')} onClick={close} />
      <div className="drawer__panel">
        <div className="drawer__list">
          <div className="drawer__bar">
            {current ? (
              <button className="drawer__back" type="button" onClick={() => setTrail(trail.slice(0, -1))}>
                <Back aria-hidden /> {t('nav.back')}
              </button>
            ) : (
              <span className="eyebrow">{t('nav.categories')}</span>
            )}
            <button ref={closeButton} className="icon-button" type="button" aria-label={t('nav.close')} onClick={close}>
              <LuX aria-hidden />
            </button>
          </div>

          {current && (
            <Link className="drawer__all" to={`/category/${current.slug}`} onClick={close}>
              {t('category.all')} · {pick(current.name)}
            </Link>
          )}

          <ul>
            {level.map((category) => (
              <li key={category.id}>
                {category.children?.length ? (
                  <button className="drawer__item" type="button" onClick={() => setTrail([...trail, category])}>
                    {pick(category.name)} <Forward aria-hidden />
                  </button>
                ) : (
                  <Link className="drawer__item" to={`/category/${category.slug}`} onClick={close}>
                    {pick(category.name)}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {banner && (
          <Link className="drawer__banner media-zoom" to={`/category/${(current ?? categories[0]).slug}`} onClick={close}>
            <Picture photo={banner.photo} alt="" sizes="280px" />
            <span className="drawer__banner-text">{pick(banner.title)}</span>
          </Link>
        )}
      </div>
    </div>
  );
}
