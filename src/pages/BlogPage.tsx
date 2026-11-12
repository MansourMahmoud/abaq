import { Link } from 'react-router-dom';
import { PostCard, useDateFormat } from '../components/blog/PostCard';
import { Picture } from '../components/ui/Picture';
import { posts } from '../data/content';
import { useI18n } from '../i18n/I18nProvider';

export function BlogPage() {
  const { t, pick, number } = useI18n();
  const formatDate = useDateFormat();
  const [featured, ...rest] = posts;

  return (
    <section className="container blog">
      <h1 className="visually-hidden">{t('blog.title')}</h1>
      <div className="blog__lead">
        <Link className="banner blog__featured media-zoom" to={`/blog/${featured.slug}`}>
          <Picture photo={featured.photo} alt="" sizes="(min-width: 960px) 62vw, 100vw" priority />
          <span className="banner__text">
            <span className="flag flag--solid">{t('blog.featured')}</span>
            <span className="banner__title">{pick(featured.title)}</span>
            <span className="text-soft">
              {pick(featured.author)} · {formatDate(featured.date)} · {t('blog.minutes', { count: number(featured.minutes) })}
            </span>
          </span>
        </Link>
        <aside>
          <h2 className="eyebrow">{t('blog.popular')}</h2>
          <ol className="ranked">
            {rest.map((post, index) => (
              <li key={post.slug}>
                <span aria-hidden>{number(index + 1)}</span>
                <Link to={`/blog/${post.slug}`}>{pick(post.title)}</Link>
              </li>
            ))}
          </ol>
        </aside>
      </div>

      <div className="post-grid">
        {rest.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      <Link className="banner banner--strip media-zoom" to="/category/samples">
        <Picture photo="rollOns" alt="" sizes="100vw" />
        <span className="banner__text">
          <span className="eyebrow">{pick({ ar: 'من المدونة إلى التجربة', en: 'From reading to trying' })}</span>
          <span className="banner__title">{pick({ ar: 'قرأت عن العود؟ جرّبه بطقم العيّنات', en: 'Read about oud? Try it with the discovery set' })}</span>
        </span>
      </Link>
    </section>
  );
}
