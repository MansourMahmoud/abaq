import { FaWhatsapp } from 'react-icons/fa6';
import { faqs, whatsappUrl } from '../../data/content';
import { useI18n } from '../../i18n/I18nProvider';
import { Reveal } from '../ui/Reveal';

/**
 * FAQ beside a contact card. The card links to WhatsApp, which every store
 * has, instead of a newsletter form that only works with an email service.
 */
export function FaqHelp() {
  const { t, pick } = useI18n();
  return (
    <section className="section section--flush-top">
      <Reveal className="container faq-layout">
        <div>
          <h2 className="section__title faq-layout__title">{t('faq.title')}</h2>
          {faqs.map((entry, index) => (
            <details key={entry.question.en} className="faq" open={index === 0}>
              <summary>{pick(entry.question)}</summary>
              <p>{pick(entry.answer)}</p>
            </details>
          ))}
        </div>
        <aside className="help-card">
          <h2 className="section__title">{t('help.title')}</h2>
          <p>{t('help.lead')}</p>
          <a className="button" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <FaWhatsapp aria-hidden /> {t('action.whatsapp')}
          </a>
        </aside>
      </Reveal>
    </section>
  );
}
