import { useState } from 'react';
import { AnimatePresence, m } from 'motion/react';
import { Link } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa6';
import { LuArrowLeft, LuArrowRight, LuMail, LuPhone, LuPlus } from 'react-icons/lu';
import { STORE, faqs, whatsappUrl, type Faq } from '../../data/content';
import { helpCard } from '../../data/home';
import { useI18n } from '../../i18n/I18nProvider';
import type { MessageKey } from '../../i18n/messages';
import { Reveal } from '../ui/Reveal';

const TOPICS: { id: Faq['topic']; label: MessageKey }[] = [
  { id: 'products', label: 'faq.topic.products' },
  { id: 'orders', label: 'faq.topic.orders' },
  { id: 'returns', label: 'faq.topic.returns' },
];

/**
 * Questions grouped by topic, one open at a time, beside a contact card.
 * An answer may end with a button the merchant points at any page. The card
 * offers WhatsApp, phone and email, which every store has, instead of a
 * newsletter form that only works with an email service.
 */
export function FaqHelp() {
  const { t, pick, dir } = useI18n();
  const [topic, setTopic] = useState<Faq['topic']>('products');
  const [open, setOpen] = useState<number | null>(0);
  const Arrow = dir === 'rtl' ? LuArrowLeft : LuArrowRight;
  const entries = faqs.filter((entry) => entry.topic === topic);

  const selectTopic = (next: Faq['topic']) => {
    setTopic(next);
    setOpen(0);
  };

  return (
    <section className="section">
      <Reveal className="container grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-12">
        <div className="min-w-0">
          <p className="eyebrow">{t('faq.eyebrow')}</p>
          <h2 className="section__title">{t('faq.title')}</h2>

          <div className="tabs mt-5 w-fit" role="tablist" aria-label={t('faq.title')}>
            {TOPICS.map((entry) => (
              <button key={entry.id} role="tab" type="button" aria-selected={entry.id === topic} onClick={() => selectTopic(entry.id)}>
                {t(entry.label)}
              </button>
            ))}
          </div>

          <ul className="mt-5 grid gap-3">
            {entries.map((entry, index) => {
              const expanded = open === index;
              const panelId = `faq-${topic}-${index}`;
              return (
                <li key={entry.question.en} className={`rounded-md border bg-surface transition-colors duration-500 ${expanded ? 'border-accent shadow-[var(--shadow-card)]' : 'border-line hover:border-accent/60'}`}>
                  <h3 className="font-body text-base">
                    <button type="button" aria-expanded={expanded} aria-controls={panelId} onClick={() => setOpen(expanded ? null : index)} className="flex w-full items-center gap-4 bg-transparent px-5 py-4 text-start font-semibold">
                      <span className="w-7 shrink-0 font-display text-xl text-accent tabular-nums">{String(index + 1).padStart(2, '0')}</span>
                      <span className="flex-1">{pick(entry.question)}</span>
                      <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-pill border transition-all duration-500 ease-theme ${expanded ? 'rotate-45 border-accent bg-accent text-on-accent' : 'border-line text-text'}`}>
                        <LuPlus aria-hidden />
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {expanded && (
                      <m.div id={panelId} role="region" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }} className="overflow-hidden">
                        <div className="grid gap-3 px-5 pb-5 ps-16">
                          <p className="leading-loose text-soft">{pick(entry.answer)}</p>
                          {entry.action && (
                            <Link to={entry.action.to} className="inline-flex items-center gap-2 justify-self-start rounded-pill border border-accent px-4 py-2 text-sm font-semibold text-accent transition-colors duration-300 hover:bg-accent hover:text-on-accent">
                              {pick(entry.action.label)} <Arrow aria-hidden />
                            </Link>
                          )}
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>

        <aside className="scope-dark grid content-start gap-4 self-start rounded-lg bg-bg p-6 md:p-8 lg:sticky lg:top-28">
          <h2 className="font-display text-3xl font-bold leading-[var(--lh-display)]">{pick(helpCard.title)}</h2>
          <p className="text-soft">{pick(helpCard.text)}</p>
          <a className="button w-full" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <FaWhatsapp aria-hidden /> {t('action.whatsapp')}
          </a>
          <div className="grid grid-cols-2 gap-3">
            <a className="button button--ghost !px-3 text-sm" href={`tel:${STORE.phone}`}>
              <LuPhone aria-hidden /> {t('help.call')}
            </a>
            <a className="button button--ghost !px-3 text-sm" href={`mailto:${STORE.email}`}>
              <LuMail aria-hidden /> {t('help.email')}
            </a>
          </div>
          <ul className="grid gap-1 border-t border-line pt-4 text-sm">
            {helpCard.links.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="flex items-center justify-between py-1.5 text-soft transition-colors duration-300 hover:text-accent">
                  {pick(link.label)} <Arrow aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </Reveal>
    </section>
  );
}
