import { Link, useParams } from 'react-router-dom';
import { useDateFormat } from '../components/blog/PostCard';
import { Picture } from '../components/ui/Picture';
import { categories } from '../data/catalog';
import { posts } from '../data/content';
import { useI18n } from '../i18n/I18nProvider';
import { NotFoundPage } from './NotFoundPage';

export function ArticlePage() {
  const { slug = '' } = useParams();
  const { t, pick, number } = useI18n();
  const formatDate = useDateFormat();
  const post = posts.find((entry) => entry.slug === slug);

  if (!post) return <NotFoundPage title={t('blog.notFound')} />;

  const shop = categories.find((category) => category.slug === post.shopSlug);
  const related = posts.filter((entry) => entry.slug !== post.slug).slice(0, 3);

  return (
    <section className="container article">
      <article className="prose">
        <nav className="breadcrumb" aria-label={t('nav.breadcrumb')}>
          <Link to="/">{t('nav.home')}</Link>
          <Link to="/blog">{t('nav.blog')}</Link>
          <span aria-current="page">{pick(post.category)}</span>
        </nav>
        <h1>{pick(post.title)}</h1>
        <p className="article__meta">
          {pick(post.author)} · <time dateTime={post.date}>{formatDate(post.date)}</time> · {t('blog.minutes', { count: number(post.minutes) })}
        </p>
        <div className="article__cover">
          <Picture photo={post.photo} alt="" sizes="(min-width: 960px) 60vw, 100vw" priority />
        </div>
        <p className="prose__lead">{pick(post.excerpt)}</p>
        {post.body.map((block, index) => (
          <div key={index} className="prose__block">
            {block.heading && <h2>{pick(block.heading)}</h2>}
            <p>{pick(block.text)}</p>
            {block.quote && <blockquote>{pick(block.quote)}</blockquote>}
          </div>
        ))}
      </article>

      <aside className="article__aside">
        {shop && (
          <Link className="banner banner--portrait media-zoom" to={`/category/${shop.slug}`}>
            <Picture photo={shop.photo} alt="" sizes="(min-width: 960px) 26vw, 100vw" />
            <span className="banner__text">
              <span className="eyebrow">{t('action.shopNow')}</span>
              <span className="banner__title">{pick(shop.name)}</span>
            </span>
          </Link>
        )}
        <h2 className="eyebrow">{t('blog.related')}</h2>
        <ul className="related-posts">
          {related.map((entry) => (
            <li key={entry.slug}>
              <Link to={`/blog/${entry.slug}`}>
                <span className="related-posts__thumb">
                  <Picture photo={entry.photo} alt="" sizes="84px" />
                </span>
                {pick(entry.title)}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </section>
  );
}
