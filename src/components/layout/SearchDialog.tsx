import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { LuSearch, LuX } from 'react-icons/lu';
import { products } from '../../data/catalog';
import { useI18n } from '../../i18n/I18nProvider';
import { Picture } from '../ui/Picture';
import { Price } from '../ui/Price';

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

const MAX_RESULTS = 6;

/**
 * Search overlay with results as you type. It is a native <dialog>, so focus
 * trapping, Escape and the backdrop come from the browser. The demo searches
 * the local catalogue; the Salla theme queries the store's search endpoint.
 */
export function SearchDialog({ open, onClose }: SearchDialogProps) {
  const { t, pick } = useI18n();
  const dialog = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (open && !element.open) element.showModal();
    if (!open && element.open) element.close();
  }, [open]);

  const term = query.trim().toLowerCase();
  const results = useMemo(() => {
    if (!term) return products.filter((product) => product.badge).slice(0, 4);
    return products
      .filter((product) => [product.name.ar, product.name.en, product.notes.ar, product.notes.en, product.family.ar, product.family.en].some((field) => field.toLowerCase().includes(term)))
      .slice(0, MAX_RESULTS);
  }, [term]);

  const close = () => {
    setQuery('');
    onClose();
  };

  return (
    <dialog ref={dialog} className="dialog search-dialog" aria-label={t('action.search')} onClose={close} onClick={(event) => event.target === dialog.current && close()}>
      <form className="flex items-center gap-3 border-b border-line px-5 py-3" role="search" onSubmit={(event) => event.preventDefault()}>
        <LuSearch className="shrink-0 text-xl text-accent" aria-hidden />
        <input
          autoFocus
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label={t('action.search')}
          placeholder={t('search.placeholder')}
          className="h-12 min-w-0 flex-1 bg-transparent text-lg outline-none placeholder:text-muted"
        />
        <button className="icon-button" type="button" aria-label={t('action.close')} onClick={close}>
          <LuX aria-hidden />
        </button>
      </form>

      <div className="max-h-[60vh] overflow-y-auto p-3">
        <p className="px-2 pb-2 text-sm text-muted">{term ? t('search.results', { count: results.length }) : t('search.popular')}</p>
        {results.length === 0 ? (
          <p className="px-2 py-8 text-center text-muted">{t('search.empty')}</p>
        ) : (
          <ul className="grid gap-1">
            {results.map((product) => (
              <li key={product.id}>
                <Link to={`/product/${product.slug}`} onClick={close} className="flex items-center gap-3 rounded-sm p-2 transition-colors duration-300 hover:bg-raise">
                  <span className="h-14 w-12 shrink-0 overflow-hidden rounded-[8px] bg-raise">
                    <Picture photo={product.photos[0]} alt="" sizes="48px" />
                  </span>
                  <span className="grid min-w-0 flex-1 leading-snug">
                    <span className="truncate font-semibold">{pick(product.name)}</span>
                    <span className="truncate text-sm text-muted">{pick(product.notes)}</span>
                  </span>
                  <Price product={product} className="shrink-0 justify-end font-semibold" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </dialog>
  );
}
