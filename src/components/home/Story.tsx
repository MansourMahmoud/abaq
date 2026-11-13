import type { IconType } from 'react-icons';
import { Link } from 'react-router-dom';
import { LuDroplets, LuListChecks, LuStar, LuTestTubeDiagonal } from 'react-icons/lu';
import { story } from '../../data/home';
import { useI18n } from '../../i18n/I18nProvider';
import { CountUp } from '../ui/CountUp';
import { Picture } from '../ui/Picture';
import { Reveal } from '../ui/Reveal';

const VALUE_ICONS: Record<(typeof story.values)[number]['icon'], IconType> = {
  notes: LuListChecks,
  source: LuDroplets,
  sample: LuTestTubeDiagonal,
};

/**
 * Brand story. One side is a photo collage with a "since" badge and a rating
 * chip; the other tells the story, lists what the store promises, and closes
 * with three figures that count up when they scroll into view.
 */
export function Story() {
  const { pick, number } = useI18n();
  const rating = story.stats.find((stat) => !Number.isInteger(stat.value));

  return (
    <section className="section section--paper overflow-hidden">
      <div className="container grid items-center gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] lg:gap-16">
        <Reveal className="relative mx-auto w-full max-w-[560px] pb-12 ps-8 sm:ps-12">
          {/* Thin frame offset behind the main photo. */}
          <span className="absolute -top-4 bottom-16 end-4 start-4 rounded-lg border border-accent/40 sm:start-8" aria-hidden />
          <div className="media-zoom relative aspect-[4/5] rounded-lg shadow-[0_24px_60px_rgb(29_26_23/0.18)]">
            <Picture photo={story.photos[0]} alt="" sizes="(min-width: 1024px) 40vw, 90vw" />
          </div>
          <span className="absolute end-4 top-4 rounded-pill bg-accent px-4 py-1.5 text-sm font-semibold text-on-accent shadow-lg">{pick(story.since)}</span>
          <div className="absolute bottom-0 start-0 aspect-square w-[42%] overflow-hidden rounded-lg border-[6px] border-paper shadow-[var(--shadow-card)]">
            <Picture photo={story.photos[1]} alt="" sizes="(min-width: 1024px) 18vw, 40vw" />
          </div>
          {rating && (
            <p className="absolute bottom-16 end-[-8px] flex items-center gap-3 rounded-md border border-line bg-surface px-4 py-3 shadow-[var(--shadow-card)] sm:end-[-20px]">
              <span className="grid h-10 w-10 place-items-center rounded-pill bg-raise text-accent">
                <LuStar className="fill-accent" aria-hidden />
              </span>
              <span className="grid leading-tight">
                <strong className="text-lg tabular-nums">{number(rating.value)} / {number(5)}</strong>
                <span className="text-xs text-muted">{pick(rating.label)}</span>
              </span>
            </p>
          )}
        </Reveal>

        <Reveal delay={0.15}>
          <p className="eyebrow">{pick(story.eyebrow)}</p>
          <h2 className="section__title mt-1">{pick(story.title)}</h2>
          <p className="mt-4 max-w-[54ch] text-lg leading-loose text-soft">{pick(story.text)}</p>

          <ul className="mt-7 grid gap-3 sm:grid-cols-3">
            {story.values.map((value) => {
              const Icon = VALUE_ICONS[value.icon];
              return (
                <li key={value.icon} className="grid content-start gap-2 rounded-md border border-line bg-surface p-4">
                  <span className="grid h-10 w-10 place-items-center rounded-pill bg-raise text-lg text-accent">
                    <Icon aria-hidden />
                  </span>
                  <strong className="leading-snug">{pick(value.title)}</strong>
                  <span className="text-sm leading-relaxed text-muted">{pick(value.text)}</span>
                </li>
              );
            })}
          </ul>

          <dl className="mt-7 grid grid-cols-3 divide-x divide-line rounded-md border border-line bg-surface rtl:divide-x-reverse">
            {story.stats.map((stat) => (
              <div key={stat.label.en} className="grid gap-1 px-3 py-4 text-center">
                <dd className="m-0 text-2xl font-bold text-accent md:text-3xl">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </dd>
                <dt className="text-xs text-muted sm:text-sm">{pick(stat.label)}</dt>
              </div>
            ))}
          </dl>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link className="button" to={story.link.to}>
              {pick(story.link.label)}
            </Link>
            <Link className="button button--ghost" to={story.secondaryLink.to}>
              {pick(story.secondaryLink.label)}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
