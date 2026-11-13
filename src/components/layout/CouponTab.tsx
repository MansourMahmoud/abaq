import { useEffect, useState } from 'react';
import { LuCheck, LuCopy, LuPercent, LuX } from 'react-icons/lu';
import { welcomeOffer } from '../../data/home';
import { useI18n } from '../../i18n/I18nProvider';
import { copyText } from '../../lib/storage';
import { useThemeSettings } from '../../settings/ThemeSettings';

const SESSION_KEY = 'abaq:coupon-tab';
const COPIED_MS = 2200;

/**
 * Discount ticket tucked against the edge of the screen, opposite the chat
 * button. Only its stub shows; hovering or focusing slides the whole ticket
 * out, and pressing it copies the code. On touch screens the first tap slides
 * it out and the second copies. It can be dismissed for the rest of the visit.
 */
export function CouponTab() {
  const { t, number } = useI18n();
  const { floating } = useThemeSettings().settings;
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [dismissed, setDismissed] = useState(true);

  // Decided after mount, so the server render and the first client render agree.
  useEffect(() => {
    try {
      setDismissed(sessionStorage.getItem(SESSION_KEY) === 'closed');
    } catch {
      setDismissed(false);
    }
  }, []);

  if (!floating.coupon || dismissed) return null;

  const press = async () => {
    if (!open) return setOpen(true);
    if (await copyText(welcomeOffer.code)) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), COPIED_MS);
    }
  };

  const dismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem(SESSION_KEY, 'closed');
    } catch {
      /* it will simply return on the next page load */
    }
  };

  return (
    <aside className="coupon-tab" data-open={open} data-side={floating.side === 'right' ? 'left' : 'right'} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button className="coupon-tab__ticket" type="button" aria-label={`${t('announcement.copy')}: ${welcomeOffer.code}`} aria-expanded={open} onClick={() => void press()} onFocus={() => setOpen(true)} onBlur={() => setOpen(false)}>
        <span className="coupon-tab__body">
          <small>{t('coupon.label', { percent: number(welcomeOffer.percent) })}</small>
          <bdi dir="ltr">{welcomeOffer.code}</bdi>
          <span className="coupon-tab__hint">
            {copied ? <LuCheck aria-hidden /> : <LuCopy aria-hidden />}
            {copied ? t('announcement.copied') : t('coupon.press')}
          </span>
        </span>
        <span className="coupon-tab__stub">
          <LuPercent aria-hidden />
          <span>{t('coupon.stub')}</span>
        </span>
      </button>
      <button className="coupon-tab__close" type="button" aria-label={t('action.close')} onClick={dismiss}>
        <LuX aria-hidden />
      </button>
    </aside>
  );
}
