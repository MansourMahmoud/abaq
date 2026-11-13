import { Link } from 'react-router-dom';
import { story } from '../../data/home';
import { useI18n } from '../../i18n/I18nProvider';
import { CountUp } from '../ui/CountUp';
import { Picture } from '../ui/Picture';
import { Reveal } from '../ui/Reveal';

/** Brand story: two overlapping photos beside the text and three key figures. */
export function Story() {
  const { pick } = useI18n();
  return (
    <section className="section section--paper">
      <div className="container grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal className="relative pb-10 pe-10">
          <div className="media-zoom aspect-[4/5] overflow-hidden rounded-lg">
            <Picture photo={story.photos[0]} alt="" sizes="(min-width: 1024px) 40vw, 90vw" />
          </div>
          <div className="absolute bottom-0 end-0 aspect-square w-[44%] overflow-hidden rounded-lg border-[6px] border-paper shadow-[var(--shadow-card)]">
            <Picture photo={story.photos[1]} alt="" sizes="(min-width: 1024px) 18vw, 40vw" />
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="eyebrow">{pick(story.eyebrow)}</p>
          <h2 className="section__title mt-1">{pick(story.title)}</h2>
          <p className="mt-4 max-w-[52ch] text-lg leading-loose text-soft">{pick(story.text)}</p>
          <dl className="mt-8 grid grid-cols-3 gap-4 border-y border-line py-6">
            {story.stats.map((stat) => (
              <div key={stat.label.en} className="grid gap-1">
                <dd className="font-display text-3xl font-bold text-accent md:text-4xl">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </dd>
                <dt className="text-sm text-muted">{pick(stat.label)}</dt>
              </div>
            ))}
          </dl>
          <Link className="button button--ghost mt-8" to={story.link.to}>
            {pick(story.link.label)}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
