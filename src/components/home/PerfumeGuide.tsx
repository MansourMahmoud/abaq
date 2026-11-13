import { Link } from 'react-router-dom';
import { LuClock3 } from 'react-icons/lu';
import { guide } from '../../data/home';
import { useI18n } from '../../i18n/I18nProvider';
import { Reveal } from '../ui/Reveal';

/**
 * Short buying guide: how the concentrations compare (share of perfume oil
 * and typical lasting time) and four habits that make a scent last.
 */
export function PerfumeGuide() {
  const { t, pick, number } = useI18n();
  return (
    <section className="section section--flush-top">
      <Reveal className="container">
        <div className="section__head">
          <div>
            <p className="eyebrow">{t('guide.eyebrow')}</p>
            <h2 className="section__title">{t('guide.title')}</h2>
          </div>
          <Link className="link" to={guide.link.to}>
            {pick(guide.link.label)}
          </Link>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <div className="scope-dark rounded-lg bg-bg p-6 md:p-8">
            <h3 className="font-body text-lg font-semibold text-accent">{t('guide.concentration')}</h3>
            <ul className="mt-5 grid gap-5">
              {guide.concentrations.map((entry) => (
                <li key={entry.name.en} className="grid gap-2">
                  <p className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <strong className="font-display text-xl">{pick(entry.name)}</strong>
                    <span className="inline-flex items-center gap-1.5 text-sm text-soft">
                      <LuClock3 className="text-accent" aria-hidden /> {t('guide.hours', { hours: pick(entry.hours) })}
                    </span>
                  </p>
                  <span className="progress">
                    <span style={{ inlineSize: `${entry.strength}%` }} />
                  </span>
                  <span className="text-sm text-muted">{pick(entry.share)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-line bg-surface p-6 md:p-8">
            <h3 className="font-body text-lg font-semibold text-accent">{t('guide.tips')}</h3>
            <ol className="mt-5 grid gap-5">
              {guide.tips.map((tip, index) => (
                <li key={tip.title.en} className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-pill bg-raise font-display text-xl font-bold text-accent">{number(index + 1)}</span>
                  <p className="grid gap-0.5 leading-relaxed">
                    <strong>{pick(tip.title)}</strong>
                    <span className="text-sm text-muted">{pick(tip.text)}</span>
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
