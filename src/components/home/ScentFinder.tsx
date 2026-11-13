import { Link } from 'react-router-dom';
import { productsInCategory } from '../../data/catalog';
import { scentNotes } from '../../data/home';
import { useI18n } from '../../i18n/I18nProvider';
import { Picture } from '../ui/Picture';
import { Reveal } from '../ui/Reveal';

/** "Shop by note": round tiles that lead to the matching category. */
export function ScentFinder() {
  const { t, pick, number } = useI18n();
  return (
    <section className="section">
      <Reveal className="container">
        <div className="section__head">
          <div>
            <p className="eyebrow">{t('home.notesEyebrow')}</p>
            <h2 className="section__title">{t('home.notesTitle')}</h2>
          </div>
          <p className="max-w-[44ch] text-muted">{t('home.notesLead')}</p>
        </div>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
          {scentNotes.map((note) => {
            // The note links to a category, so its product count is that category's.
            const count = productsInCategory(note.to.split('/').pop() ?? '').length;
            return (
              <li key={note.name.en}>
                <Link to={note.to} className="note-card">
                  <span className="note-card__photo">
                    <Picture photo={note.photo} alt="" sizes="104px" />
                  </span>
                  <strong>{pick(note.name)}</strong>
                  <span className="note-card__hint">{pick(note.hint)}</span>
                  <span className="note-card__count">{count > 0 ? t('category.count', { count: number(count) }) : t('notes.shop')}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </section>
  );
}
