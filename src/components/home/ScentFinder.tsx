import { Link } from 'react-router-dom';
import { scentNotes } from '../../data/home';
import { useI18n } from '../../i18n/I18nProvider';
import { Picture } from '../ui/Picture';
import { Reveal } from '../ui/Reveal';

/** "Shop by note": round tiles that lead to the matching category. */
export function ScentFinder() {
  const { t, pick } = useI18n();
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
        <ul className="grid grid-cols-3 gap-x-3 gap-y-6 md:grid-cols-6 md:gap-6">
          {scentNotes.map((note) => (
            <li key={note.name.en}>
              <Link to={note.to} className="group grid justify-items-center gap-3 text-center">
                <span className="relative block aspect-square w-full max-w-[150px] rounded-pill p-1.5 ring-1 ring-line transition-all duration-300 ease-theme group-hover:ring-2 group-hover:ring-accent">
                  <span className="media-zoom block h-full w-full rounded-pill">
                    <Picture photo={note.photo} alt="" sizes="(min-width: 768px) 150px, 30vw" />
                  </span>
                </span>
                <span className="grid leading-snug">
                  <strong className="font-display text-xl transition-colors duration-200 group-hover:text-accent">{pick(note.name)}</strong>
                  <span className="text-xs text-muted">{pick(note.hint)}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
