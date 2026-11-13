import { Link } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa6';
import { whatsappUrl } from '../../data/content';
import { footerPromo } from '../../data/home';
import { useI18n } from '../../i18n/I18nProvider';
import { useThemeSettings } from '../../settings/ThemeSettings';
import { Picture } from '../ui/Picture';
import { Reveal } from '../ui/Reveal';

/**
 * Promotional card that straddles the page and the footer: its lower half
 * sits on the footer's dark band (see `.prefooter` styles), so the two read
 * as one composition without changing the footer itself.
 */
export function FooterPromo() {
  const { t, pick } = useI18n();
  const { footer } = useThemeSettings().settings;
  if (!footer.showPromo) return null;

  return (
    <aside className="prefooter">
      <Reveal className="container">
        <div className="relative grid overflow-hidden rounded-lg border border-accent/30 bg-surface shadow-[0_30px_60px_rgb(0_0_0/0.35)] md:pe-[38%]">
          <div className="grid content-center gap-2 p-6 md:px-10 md:py-8">
            <p className="eyebrow">{pick(footerPromo.eyebrow)}</p>
            <h2 className="font-display text-2xl font-bold leading-[var(--lh-display)] md:text-3xl">{pick(footerPromo.title)}</h2>
            <p className="max-w-[48ch] text-soft">{pick(footerPromo.text)}</p>
            <div className="mt-3 flex flex-wrap gap-3">
              <a className="button" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <FaWhatsapp aria-hidden /> {t('action.whatsapp')}
              </a>
              <Link className="button button--ghost" to={footerPromo.secondary.to}>
                {pick(footerPromo.secondary.label)}
              </Link>
            </div>
          </div>
          <div className="absolute inset-y-0 end-0 hidden w-[38%] md:block">
            <Picture photo={footerPromo.photo} alt="" sizes="(min-width: 768px) 38vw, 100vw" />
            <span className="absolute inset-0 bg-gradient-to-r from-surface to-transparent rtl:bg-gradient-to-l" />
          </div>
        </div>
      </Reveal>
    </aside>
  );
}
