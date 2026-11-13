import type { IconType } from 'react-icons';
import { LuCreditCard, LuShieldCheck, LuTestTubeDiagonal, LuTruck } from 'react-icons/lu';
import { perks } from '../../data/home';
import { useI18n } from '../../i18n/I18nProvider';

const ICONS: Record<(typeof perks)[number]['icon'], IconType> = {
  truck: LuTruck,
  shield: LuShieldCheck,
  sample: LuTestTubeDiagonal,
  card: LuCreditCard,
};

/** Four reasons to buy, in a card that overlaps the bottom edge of the hero. */
export function PerksStrip() {
  const { pick } = useI18n();
  return (
    <section className="container relative z-[2] -mt-10 md:-mt-12" aria-label={pick({ ar: 'مزايا المتجر', en: 'Store benefits' })}>
      <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line shadow-[var(--shadow-card)] lg:grid-cols-4">
        {perks.map((perk) => {
          const Icon = ICONS[perk.icon];
          return (
            <li key={perk.icon} className="group flex flex-col items-center gap-2 bg-surface px-3 py-5 text-center sm:flex-row sm:gap-4 sm:px-5 sm:text-start">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-pill bg-raise text-xl text-accent transition-all duration-500 ease-theme group-hover:bg-accent group-hover:text-on-accent">
                <Icon aria-hidden />
              </span>
              <span className="grid min-w-0 leading-snug">
                <strong className="text-[0.95rem]">{pick(perk.title)}</strong>
                <span className="text-xs text-muted sm:text-sm">{pick(perk.text)}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
