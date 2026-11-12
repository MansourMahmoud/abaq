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
 * Promotional strip above the header. In marquee mode the message list is
 * rendered twice so the CSS animation can loop without a visible seam; the
 * duplicate is hidden from assistive technology.
 */
export function AnnouncementBar() {
  const { pick, t } = useI18n();
  const { announcement } = useThemeSettings().settings;
  const [dismissed, setDismissed] = useState(false);

  if (!announcement.enabled || dismissed) return null;

  const isMarquee = announcement.mode === 'marquee';

  return (
    <div className="announcement" role="region" aria-label={pick(MESSAGES[0])}>
      <div className="announcement__viewport">
        {isMarquee ? (
          <div className="announcement__track">
            {[false, true].map((isClone) => (
              <ul key={String(isClone)} className="announcement__list" aria-hidden={isClone}>
                {MESSAGES.map((message) => (
                  <li key={message.en}>{pick(message)}</li>
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
