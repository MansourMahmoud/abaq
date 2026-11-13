import { useEffect, useState } from 'react';
import { AnimatePresence, m } from 'motion/react';
import { FaWhatsapp } from 'react-icons/fa6';
import { LuArrowUp, LuX } from 'react-icons/lu';
import { STORE, chatPrompts, whatsappUrl } from '../../data/content';
import { useI18n } from '../../i18n/I18nProvider';
import { useThemeSettings } from '../../settings/ThemeSettings';
import { LogoMark } from '../ui/Logo';

/** Timing of the prompt bubble: wait, show, hide, then move to the next prompt. */
const FIRST_PROMPT_MS = 4000;
const PROMPT_VISIBLE_MS = 6000;
const PROMPT_GAP_MS = 9000;

/**
 * Cycles through the chat prompts: each one shows for a few seconds, then the
 * bubble hides for a while before the next. Returns the prompt index to show,
 * or null while hidden. Dismissing stops the cycle for the rest of the visit.
 */
function usePromptCycle(count: number, enabled: boolean): [number | null, () => void] {
  const [shown, setShown] = useState<number | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!enabled || dismissed || count === 0) return;
    let index = 0;
    let timer: number;
    const show = () => {
      setShown(index % count);
      timer = window.setTimeout(hide, PROMPT_VISIBLE_MS);
    };
    const hide = () => {
      setShown(null);
      index += 1;
      timer = window.setTimeout(show, PROMPT_GAP_MS);
    };
    timer = window.setTimeout(show, FIRST_PROMPT_MS);
    return () => window.clearTimeout(timer);
  }, [count, enabled, dismissed]);

  return [dismissed ? null : shown, () => setDismissed(true)];
}

/**
 * WhatsApp shortcut with rotating prompt bubbles, and a back-to-top button
 * that appears after one screen of scroll. The bubble always opens toward the
 * middle of the screen (to the left of a button on the right edge), is small enough to stay clear of the content, and never
 * takes focus.
 */
export function FloatingActions() {
  const { t, pick } = useI18n();
  const { floating } = useThemeSettings().settings;
  const [scrolled, setScrolled] = useState(false);
  const [prompt, dismissPrompt] = usePromptCycle(chatPrompts.length, floating.whatsapp && floating.prompts);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="floating-actions" data-side={floating.side}>
      <AnimatePresence>
        {scrolled && (
          <m.button
            key="top"
            className="icon-button floating-actions__top"
            type="button"
            aria-label={t('action.backToTop')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <LuArrowUp aria-hidden />
          </m.button>
        )}
      </AnimatePresence>

      {floating.whatsapp && (
        <div className="floating-actions__chat">
          <AnimatePresence mode="wait">
            {prompt !== null && (
              <m.div
                key={prompt}
                className="floating-actions__prompt"
                role="status"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <span className="floating-actions__avatar" aria-hidden>
                  <LogoMark />
                </span>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <span className="floating-actions__who">
                    {pick(STORE.name)} <i /> {t('chat.online')}
                  </span>
                  <span>{pick(chatPrompts[prompt])}</span>
                </a>
                <button type="button" aria-label={t('action.close')} onClick={dismissPrompt}>
                  <LuX aria-hidden />
                </button>
              </m.div>
            )}
          </AnimatePresence>
          <a className="floating-actions__whatsapp" href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label={t('action.whatsapp')}>
            <FaWhatsapp aria-hidden />
          </a>
        </div>
      )}
    </div>
  );
}
