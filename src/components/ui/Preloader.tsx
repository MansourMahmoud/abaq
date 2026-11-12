import { useEffect, useState } from 'react';
import { useI18n } from '../../i18n/I18nProvider';
import { useThemeSettings } from '../../settings/ThemeSettings';
import { LogoMark } from './Logo';

const SESSION_KEY = 'abaq:visited';
/** Long enough for the logo to draw once, short enough not to hold the page back. */
const MIN_VISIBLE_MS = 1300;
const FADE_MS = 500;

function isFirstVisit(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === null;
  } catch {
    return false; // without storage we cannot tell, so never block the page
  }
}

/**
 * Branded loading screen shown once per browser session. The page renders
 * underneath the whole time (the overlay only covers it), so this costs no
 * loading time: it hides the moment when fonts and the hero image pop in.
 */
export function Preloader() {
  const { t } = useI18n();
  const { preloader } = useThemeSettings().settings;
  const [phase, setPhase] = useState<'visible' | 'leaving' | 'gone'>(() => (preloader.enabled && isFirstVisit() ? 'visible' : 'gone'));

  // Runs once: the timers must outlive the phase changes they cause.
  useEffect(() => {
    if (phase !== 'visible') return;
    try {
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
      /* shown again next time; harmless */
    }
    const leave = window.setTimeout(() => setPhase('leaving'), MIN_VISIBLE_MS);
    const remove = window.setTimeout(() => setPhase('gone'), MIN_VISIBLE_MS + FADE_MS);
    return () => {
      window.clearTimeout(leave);
      window.clearTimeout(remove);
    };
  }, []);

  if (phase === 'gone') return null;

  return (
    <div className="preloader" data-background={preloader.background} data-leaving={phase === 'leaving'} role="status" aria-label={t('loader.label')}>
      <div className="preloader__badge">
        <LogoMark className="preloader__mark" />
      </div>
    </div>
  );
}
