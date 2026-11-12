import { useState } from 'react';
import { LuClock, LuMapPin, LuNavigation, LuPhone } from 'react-icons/lu';
import { branches } from '../data/content';
import { useI18n } from '../i18n/I18nProvider';

/**
 * Store locator: a list of branches and a map of the selected one. The map is
 * a keyless Google Maps embed, lazy-loaded so it costs nothing until visible.
 */
export function BranchesPage() {
  const { t, pick, locale } = useI18n();
  const [selectedId, setSelectedId] = useState(branches[0].id);
  const selected = branches.find((branch) => branch.id === selectedId)!;
  const { lat, lng } = selected.location;

  return (
    <section className="container branches">
      <header className="branches__head">
        <h1 className="category-hero__title">{t('branches.title')}</h1>
        <p className="text-muted">{t('branches.lead')}</p>
      </header>

      <div className="branches__layout">
        <ul className="branches__list">
          {branches.map((branch) => (
            <li key={branch.id}>
              <article className="branch" data-selected={branch.id === selectedId}>
                <button className="branch__select" type="button" aria-pressed={branch.id === selectedId} onClick={() => setSelectedId(branch.id)}>
                  <h2>{pick(branch.name)}</h2>
                  <p><LuMapPin aria-hidden /> {pick(branch.address)}</p>
                </button>
                <dl className="branch__hours" aria-label={t('branches.hours')}>
                  {branch.hours.map((slot) => (
                    <div key={slot.days.en}>
                      <dt><LuClock aria-hidden /> {pick(slot.days)}</dt>
                      <dd>{pick(slot.time)}</dd>
                    </div>
                  ))}
                </dl>
                <div className="branch__actions">
                  <a className="button button--outline" href={`tel:${branch.phone}`}>
                    <LuPhone aria-hidden /> {t('branches.call')}
                  </a>
                  <a className="button" href={`https://www.google.com/maps/dir/?api=1&destination=${branch.location.lat},${branch.location.lng}`} target="_blank" rel="noopener noreferrer">
                    <LuNavigation aria-hidden /> {t('branches.directions')}
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <div className="branches__map">
          <iframe
            key={selected.id}
            title={t('branches.map', { name: pick(selected.name) })}
            src={`https://www.google.com/maps?q=${lat},${lng}&z=15&hl=${locale}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
