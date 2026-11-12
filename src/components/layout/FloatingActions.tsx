import { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa6';
import { LuArrowUp } from 'react-icons/lu';
import { whatsappUrl } from '../../data/content';
import { useI18n } from '../../i18n/I18nProvider';

/** WhatsApp shortcut and a back-to-top button that appears after one screen of scroll. */
export function FloatingActions() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="floating-actions">
      {scrolled && (
        <button className="icon-button floating-actions__top" type="button" aria-label={t('action.backToTop')} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <LuArrowUp aria-hidden />
        </button>
      )}
      <a className="floating-actions__whatsapp" href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label={t('action.whatsapp')}>
        <FaWhatsapp aria-hidden />
      </a>
    </div>
  );
}
