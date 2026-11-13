import { useMemo, useState } from 'react';
import { AnimatePresence, m } from 'motion/react';
import { LuRotateCcw, LuSparkles } from 'react-icons/lu';
import { products, type Product } from '../../data/catalog';
import { quiz, type QuizOption } from '../../data/home';
import { useI18n } from '../../i18n/I18nProvider';
import { ProductCard } from '../product/ProductCard';
import { Picture } from '../ui/Picture';
import { Reveal } from '../ui/Reveal';

const RESULTS = 3;

/** Whether a product satisfies one answer: any of its categories, and every price bound. */
function fits(product: Product, option: QuizOption): boolean {
  const bounds = option.categories.filter((entry) => entry.includes(':'));
  const categories = option.categories.filter((entry) => !entry.includes(':'));
  const inBounds = bounds.every((bound) => {
    const [kind, value] = bound.split(':');
    return kind === 'min' ? product.price >= Number(value) : product.price <= Number(value);
  });
  return inBounds && (categories.length === 0 || categories.some((id) => product.categoryIds.includes(id)));
}

/**
 * Picks for a set of answers: products matching every answer first, then
 * those matching the most, best rated first, so there is always a result.
 */
function recommend(answers: QuizOption[]): { picks: Product[]; exact: boolean } {
  const scored = products
    .filter((product) => !product.soldOut)
    .map((product) => ({ product, score: answers.filter((answer) => fits(product, answer)).length }))
    .sort((a, b) => b.score - a.score || b.product.rating - a.product.rating);
  return { picks: scored.slice(0, RESULTS).map((entry) => entry.product), exact: scored[0]?.score === answers.length };
}

/**
 * Scent finder: three questions, one at a time, then three products from the
 * store that match the answers. Everything runs on the catalogue the page
 * already has, so there is nothing to load.
 */
export function ScentQuiz() {
  const { t, pick, number } = useI18n();
  const [answers, setAnswers] = useState<QuizOption[]>([]);
  const step = answers.length;
  const done = step === quiz.length;
  const result = useMemo(() => (done ? recommend(answers) : null), [done, answers]);

  return (
    <section className="section section--paper">
      <Reveal className="container grid items-start gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-12">
        <div className="grid gap-4 lg:sticky lg:top-28">
          <p className="eyebrow inline-flex items-center gap-2">
            <LuSparkles aria-hidden /> {t('quiz.eyebrow')}
          </p>
          <h2 className="section__title">{t('quiz.title')}</h2>
          <p className="max-w-[46ch] text-soft">{t('quiz.lead')}</p>
          <div className="media-zoom hidden aspect-[16/10] rounded-lg lg:block">
            <Picture photo="spraying" alt="" sizes="36vw" />
          </div>
        </div>

        <div className="min-w-0 rounded-lg border border-line bg-surface p-5 md:p-8">
          {/* Progress: one segment per question. */}
          <div className="mb-6 flex gap-2" role="img" aria-label={t('quiz.step', { n: number(Math.min(step + 1, quiz.length)), total: number(quiz.length) })}>
            {quiz.map((_, index) => (
              <span key={index} className={`h-1.5 flex-1 rounded-pill transition-colors duration-700 ${index < step ? 'bg-accent' : index === step ? 'bg-accent/40' : 'bg-line'}`} />
            ))}
          </div>

          <AnimatePresence mode="wait" initial={false}>
            {!done ? (
              <m.div key={step} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}>
                <p className="text-sm text-muted">{t('quiz.step', { n: number(step + 1), total: number(quiz.length) })}</p>
                <h3 className="mt-1 text-2xl md:text-3xl">{pick(quiz[step].question)}</h3>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {quiz[step].options.map((option) => (
                    <li key={option.label.en}>
                      <button type="button" onClick={() => setAnswers([...answers, option])} className="flex min-h-[64px] w-full items-center justify-between gap-3 rounded-md border border-line bg-bg px-5 text-start text-lg font-semibold transition-colors duration-300 hover:border-accent hover:bg-raise hover:text-accent">
                        {pick(option.label)}
                        <span className="h-3 w-3 shrink-0 rounded-pill border border-current" />
                      </button>
                    </li>
                  ))}
                </ul>
                {step > 0 && (
                  <button type="button" onClick={() => setAnswers(answers.slice(0, -1))} className="mt-5 bg-transparent p-0 text-sm text-muted underline-offset-4 hover:text-accent hover:underline">
                    {t('nav.back')}
                  </button>
                )}
              </m.div>
            ) : (
              <m.div key="result" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-2xl md:text-3xl">{t('quiz.result')}</h3>
                  <button type="button" onClick={() => setAnswers([])} className="inline-flex items-center gap-2 rounded-pill border border-line bg-transparent px-4 py-2 text-sm transition-colors duration-300 hover:border-accent hover:text-accent">
                    <LuRotateCcw aria-hidden /> {t('quiz.restart')}
                  </button>
                </div>
                <p className="mt-1 text-sm text-muted">{answers.map((answer) => pick(answer.label)).join(' · ')}</p>
                {result && !result.exact && <p className="mt-2 text-sm text-soft">{t('quiz.none')}</p>}
                <ul className="product-grid mt-5 !grid-cols-2 md:!grid-cols-3">
                  {result?.picks.map((product) => (
                    <li key={product.id}>
                      <ProductCard product={product} sizes="(min-width: 1024px) 20vw, 45vw" />
                    </li>
                  ))}
                </ul>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </Reveal>
    </section>
  );
}
