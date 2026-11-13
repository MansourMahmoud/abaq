import { Link } from 'react-router-dom';
import { LuCrown } from 'react-icons/lu';
import { loyalty } from '../../data/home';
import { useI18n } from '../../i18n/I18nProvider';
import { Reveal } from '../ui/Reveal';

/**
 * Loyalty programme at a glance: how points are earned and spent, in four
 * short cards. The figures are the merchant's; Salla's loyalty app applies them.
 */
export function LoyaltyBand() {
  const { pick, number } = useI18n();
  return (
    <section className="section section--paper">
      <Reveal className="container">
        <div className="section__head">
          <div>
            <p className="eyebrow inline-flex items-center gap-2">
              <LuCrown aria-hidden /> {pick(loyalty.eyebrow)}
            </p>
            <h2 className="section__title">{pick(loyalty.title)}</h2>
          </div>
          <Link className="button" to={loyalty.action.to}>
            {pick(loyalty.action.label)}
          </Link>
        </div>
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {loyalty.steps.map((step, index) => (
            <li key={step.value.en} className="grid content-start gap-2 rounded-md border border-line bg-surface p-5">
              <span className="font-display text-4xl font-bold leading-none text-accent/30">{number(index + 1)}</span>
              <strong className="text-lg">{pick(step.value)}</strong>
              <span className="text-sm leading-relaxed text-muted">{pick(step.text)}</span>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
