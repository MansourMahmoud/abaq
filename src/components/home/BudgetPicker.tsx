import { Link } from 'react-router-dom';
import { LuArrowLeft, LuArrowRight } from 'react-icons/lu';
import { budgets } from '../../data/home';
import { useI18n } from '../../i18n/I18nProvider';
import { Picture } from '../ui/Picture';
import { Reveal } from '../ui/Reveal';

/** "Shop by budget": each card opens the full listing with its price range applied. */
export function BudgetPicker() {
  const { t, pick, dir } = useI18n();
  const Arrow = dir === 'rtl' ? LuArrowLeft : LuArrowRight;

  return (
    <section className="section section--flush-top">
      <Reveal className="container">
        <div className="section__head">
          <h2 className="section__title">{t('home.budgetTitle')}</h2>
        </div>
        <ul className="grid gap-4 md:grid-cols-3">
          {budgets.map((budget) => {
            const query = new URLSearchParams();
            if (budget.min) query.set('min', String(budget.min));
            if (budget.max) query.set('max', String(budget.max));
            return (
              <li key={budget.title.en}>
                <Link to={`/category/all?${query}`} className="group flex items-center gap-4 rounded-lg border border-line bg-surface p-3 transition-all duration-500 ease-theme hover:-translate-y-1 hover:border-accent hover:shadow-[var(--shadow-card)]">
                  <span className="media-zoom h-24 w-24 shrink-0 rounded-md">
                    <Picture photo={budget.photo} alt="" sizes="96px" />
                  </span>
                  <span className="grid min-w-0 flex-1 leading-snug">
                    <strong className="font-display text-2xl">{pick(budget.title)}</strong>
                    <span className="text-sm text-muted">{pick(budget.text)}</span>
                  </span>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-pill border border-line text-lg transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent">
                    <Arrow aria-hidden />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </section>
  );
}
