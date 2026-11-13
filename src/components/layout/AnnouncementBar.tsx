import { useState } from 'react';
import type { IconType } from 'react-icons';
import { Link } from 'react-router-dom';
import { LuCheck, LuCopy, LuGift, LuStar, LuTag, LuTestTubeDiagonal, LuTruck, LuX } from 'react-icons/lu';
import { announcements, type Announcement } from '../../data/content';
import { useI18n } from '../../i18n/I18nProvider';
import { useThemeSettings } from '../../settings/ThemeSettings';

const ICONS: Record<Announcement['icon'], IconType> = {
  truck: LuTruck,
  gift: LuGift,
  sample: LuTestTubeDiagonal,
  tag: LuTag,
  star: LuStar,
};

/** How long the "copied" confirmation stays on a coupon button. */
const COPIED_MS = 2000;

/** One message: icon, text and its optional coupon or link button. */
function Message({ entry, showIcon, inert }: { entry: Announcement; showIcon: boolean; inert: boolean }) {
  const { pick, t } = useI18n();
  const [copied, setCopied] = useState(false);
  const Icon = ICONS[entry.icon];
  const { action } = entry;

  const copy = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), COPIED_MS);
    } catch {
      /* Clipboard blocked: the code is still readable on the button. */
    }
  };

  return (
    <>
      {showIcon && <Icon className="announcement__icon" aria-hidden />}
      <span>{pick(entry.text)}</span>
      {action?.kind === 'copy' && (
        <button className="announcement__action" type="button" tabIndex={inert ? -1 : 0} aria-label={`${t('announcement.copy')}: ${action.code}`} onClick={() => void copy(action.code)}>
          {copied ? <LuCheck aria-hidden /> : <LuCopy aria-hidden />}
          <bdi dir="ltr">{copied ? t('announcement.copied') : action.code}</bdi>
        </button>
      )}
      {action?.kind === 'link' && (
        <Link className="announcement__action" to={action.to} tabIndex={inert ? -1 : 0}>
          {pick(action.label)}
        </Link>
      )}
    </>
  );
}

/**
 * Promotional strip above the header.
 *
 * Marquee mode renders the message group twice. Each group is at least as wide
 * as the bar, and the track slides by exactly one group, so the second copy is
 * always in place when the first leaves: the loop never shows a gap, however
 * wide the screen. The copy is hidden from assistive technology and skipped by
 * the keyboard. Hovering pauses the strip so its buttons can be pressed.
 */
export function AnnouncementBar() {
  const { pick, t } = useI18n();
  const { announcement } = useThemeSettings().settings;
  const [dismissed, setDismissed] = useState(false);

  if (!announcement.enabled || dismissed || announcements.length === 0) return null;

  return (
    <div className="announcement" role="region" aria-label={pick(announcements[0].text)}>
      <div className="announcement__viewport">
        {announcement.mode === 'marquee' ? (
          <div className="announcement__track">
            {[false, true].map((isCopy) => (
              <ul key={String(isCopy)} className="announcement__group" aria-hidden={isCopy}>
                {/* Messages repeat inside a group so short lists still fill wide screens. */}
                {[...announcements, ...announcements].map((entry, index) => (
                  <li key={index}>
                    <Message entry={entry} showIcon={announcement.showIcons} inert={isCopy || index >= announcements.length} />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        ) : (
          <p className="announcement__single">
            <Message entry={announcements[0]} showIcon={announcement.showIcons} inert={false} />
          </p>
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
