import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LuCheck, LuCopy, LuTestTubeDiagonal, LuTruck, LuX } from 'react-icons/lu';
import { welcomeOffer } from '../../data/home';
import { useI18n } from '../../i18n/I18nProvider';
import { copyText, readJson, writeJson } from '../../lib/storage';
import { useThemeSettings } from '../../settings/ThemeSettings';
import { Picture } from '../ui/Picture';

const STORAGE_KEY = 'abaq:welcome';
const DAY_MS = 86_400_000;

/** What the browser remembers about the popup: never again, or not before a date. */
interface Memory {
  never?: boolean;
  notBefore?: number;
}

/** Pages where an interruption would get in the way of buying. */
const QUIET_PATHS = ['/cart'];

/**
 * Welcome offer shown to a new visitor.
 *
 * It is built not to nag: it waits a few seconds after the first page loads,
 * stays away from the cart, and appears at most once per visit. Closing it
 * postpones it for a few days ("remind me later"); ticking "don't show
 * again", copying the code or following the button retires it for good.
 */
export function WelcomePopup() {
  const { t, pick, number } = useI18n();
  const { popup } = useThemeSettings().settings;
  const { pathname } = useLocation();
  const dialog = useRef<HTMLDialogElement>(null);
  const shown = useRef(false);
  const [copied, setCopied] = useState(false);
  const [never, setNever] = useState(false);

  useEffect(() => {
    if (!popup.enabled || shown.current || QUIET_PATHS.includes(pathname)) return;
    const memory = readJson<Memory>(STORAGE_KEY, {});
    if (memory.never || (memory.notBefore ?? 0) > Date.now()) return;
    const timer = window.setTimeout(() => {
      if (dialog.current?.open) return;
      shown.current = true;
      dialog.current?.showModal();
    }, popup.delaySeconds * 1000);
    return () => window.clearTimeout(timer);
  }, [popup.enabled, popup.delaySeconds, pathname]);

  /** Records the visitor's choice whenever the dialog closes, however it was closed. */
  const remember = (retire: boolean) => writeJson(STORAGE_KEY, retire || never || copied ? { never: true } : { notBefore: Date.now() + popup.remindAfterDays * DAY_MS });
  const close = () => dialog.current?.close();

  const copy = async () => {
    if (await copyText(welcomeOffer.code)) setCopied(true);
  };

  return (
    <dialog ref={dialog} className="welcome" aria-labelledby="welcome-title" onClose={() => remember(false)} onClick={(event) => event.target === dialog.current && close()}>
      <div className="welcome__layout">
        <div className="welcome__media scope-dark">
          <Picture photo={welcomeOffer.photo} alt="" sizes="(min-width: 760px) 380px, 100vw" />
          <span className="welcome__seal" aria-hidden>
            <strong>{number(welcomeOffer.percent)}٪</strong>
            <span>{t('welcome.off')}</span>
          </span>
        </div>

        <div className="welcome__body">
          <button className="icon-button welcome__close" type="button" aria-label={t('action.close')} onClick={close}>
            <LuX aria-hidden />
          </button>
          <p className="eyebrow">{pick(welcomeOffer.eyebrow)}</p>
          <h2 id="welcome-title" className="welcome__title">
            {pick(welcomeOffer.title)}
          </h2>
          <p className="text-soft">{pick(welcomeOffer.text)}</p>

          {/* The code, drawn as a ticket; pressing it copies the code. */}
          <button className="ticket" type="button" onClick={() => void copy()} aria-label={`${t('announcement.copy')}: ${welcomeOffer.code}`}>
            <span className="ticket__code">
              <small>{t('welcome.code')}</small>
              <bdi dir="ltr">{welcomeOffer.code}</bdi>
            </span>
            <span className="ticket__action">
              {copied ? <LuCheck aria-hidden /> : <LuCopy aria-hidden />}
              {copied ? t('announcement.copied') : t('welcome.copy')}
            </span>
          </button>

          <Link
            className="button w-full"
            to={welcomeOffer.to}
            onClick={() => {
              remember(true);
              close();
            }}
          >
            {t('welcome.shop')}
          </Link>

          <ul className="welcome__perks">
            <li>
              <LuTruck aria-hidden /> {pick(welcomeOffer.perks[0])}
            </li>
            <li>
              <LuTestTubeDiagonal aria-hidden /> {pick(welcomeOffer.perks[1])}
            </li>
          </ul>

          <div className="welcome__foot">
            <label>
              <input type="checkbox" checked={never} onChange={(event) => setNever(event.target.checked)} /> {t('welcome.never')}
            </label>
            <button type="button" onClick={close}>
              {t('welcome.later')}
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
