import { useEffect, useState } from 'react';
import { AnimatePresence, m } from 'motion/react';
import { FaWhatsapp } from 'react-icons/fa6';
import { LuArrowUp, LuX } from 'react-icons/lu';
import { chatPrompts, whatsappUrl } from '../../data/content';
import { useI18n } from '../../i18n/I18nProvider';
import { useThemeSettings } from '../../settings/ThemeSettings';

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
 * that appears after one screen of scroll. The bubble opens toward the middle
 * of the screen, is small enough to stay clear of the content, and never
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
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
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
                initial={{ opacity: 0, scale: 0.85, x: floating.side === 'right' ? 16 : -16 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: floating.side === 'right' ? 10 : -10 }}
                transition={{ type: 'spring', stiffness: 380, damping: 26 }}
              >
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  {pick(chatPrompts[prompt])}
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
