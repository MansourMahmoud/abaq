import { useState } from 'react';
import { LuX } from 'react-icons/lu';
import { useI18n, type Localized } from '../../i18n/I18nProvider';
import { useThemeSettings } from '../../settings/ThemeSettings';

const MESSAGES: Localized[] = [
  { ar: 'شحن مجاني للطلبات فوق ٣٠٠ ر.س', en: 'Free shipping on orders over SAR 300' },
  { ar: 'عيّنة مجانية مع كل طلب', en: 'A free sample with every order' },
  { ar: 'تغليف هدايا مع بطاقة إهداء', en: 'Gift wrapping with a personal card' },
];

/**
 * Promotional strip above the header.
 *
 * Marquee mode renders the message group twice. Each group is at least as wide
 * as the bar (`min-width: 100%`), and the track slides by exactly one group, so
 * the second copy is always in place when the first leaves: the loop never
 * shows a gap, however wide the screen. The copy is hidden from assistive tech.
 */
export function AnnouncementBar() {
  const { pick, t } = useI18n();
  const { announcement } = useThemeSettings().settings;
  const [dismissed, setDismissed] = useState(false);

  if (!announcement.enabled || dismissed) return null;

  return (
    <div className="announcement" role="region" aria-label={pick(MESSAGES[0])}>
      <div className="announcement__viewport">
        {announcement.mode === 'marquee' ? (
          <div className="announcement__track">
            {[false, true].map((isCopy) => (
              <ul key={String(isCopy)} className="announcement__group" aria-hidden={isCopy}>
                {/* Messages repeat inside a group so short lists still fill wide screens. */}
                {[...MESSAGES, ...MESSAGES].map((message, index) => (
                  <li key={index}>{pick(message)}</li>
                ))}
              </ul>
            ))}
          </div>
        ) : (
          <p className="announcement__single">{pick(MESSAGES[0])}</p>
        )}
      </div>
      {announcement.dismissible && (
        <button className="announcement__close" type="button" aria-label={t('action.close')} onClick={() => setDismissed(true)}>
          <LuX aria-hidden />
        </button>
      )}
    </div>
  );
}
