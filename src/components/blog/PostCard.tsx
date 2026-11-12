import { Link } from 'react-router-dom';
import type { Post } from '../../data/content';
import { useI18n } from '../../i18n/I18nProvider';
import { Picture } from '../ui/Picture';

/** Format an ISO date for the current language. */
export function useDateFormat() {
  const { locale } = useI18n();
  const formatter = new Intl.DateTimeFormat(locale === 'ar' ? 'ar-SA-u-ca-gregory' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  return (iso: string) => formatter.format(new Date(iso));
}

export function PostCard({ post }: { post: Post }) {
  const { pick } = useI18n();
  const formatDate = useDateFormat();
  return (
    <Link className="post-card" to={`/blog/${post.slug}`}>
      <span className="post-card__media media-zoom">
        <Picture photo={post.photo} alt="" sizes="(min-width: 900px) 30vw, (min-width: 560px) 46vw, 92vw" />
      </span>
      <span className="eyebrow">{pick(post.category)}</span>
      <span className="post-card__title">{pick(post.title)}</span>
      <span className="text-muted">{pick(post.excerpt)}</span>
      <span className="post-card__meta">
        {pick(post.author)} · <time dateTime={post.date}>{formatDate(post.date)}</time>
      </span>
    </Link>
  );
}
