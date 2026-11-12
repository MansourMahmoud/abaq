import { Link, NavLink, useParams } from 'react-router-dom';
import { Picture } from '../components/ui/Picture';
import { pages } from '../data/content';
import { useI18n } from '../i18n/I18nProvider';
import { NotFoundPage } from './NotFoundPage';

/** Informational page (about, policies): optional banner, page menu, content. */
export function StaticPage() {
  const { slug = '' } = useParams();
  const { t, pick } = useI18n();
  const page = pages.find((entry) => entry.slug === slug);

  if (!page) return <NotFoundPage title={t('page.notFound')} />;

  return (
    <section className="container static-page">
      <div className="banner static-page__banner">
        <Picture photo={page.photo} alt="" sizes="100vw" priority />
        <div className="banner__text">
          <nav className="breadcrumb" aria-label={t('nav.breadcrumb')}>
            <Link to="/">{t('nav.home')}</Link>
            <span aria-current="page">{pick(page.title)}</span>
          </nav>
          <h1 className="category-hero__title">{pick(page.title)}</h1>
        </div>
      </div>

      <div className="static-page__layout">
        <nav className="page-menu" aria-label={t('page.pages')}>
          <p className="eyebrow">{t('page.pages')}</p>
          {pages.map((entry) => (
            <NavLink key={entry.slug} to={`/page/${entry.slug}`}>
              {pick(entry.title)}
            </NavLink>
          ))}
          <NavLink to="/branches">{t('nav.branches')}</NavLink>
        </nav>

        <div className="prose">
          {page.sections.map((section, index) => (
            <div key={index} className="prose__block">
              {section.heading && <h2>{pick(section.heading)}</h2>}
              <p className={index === 0 ? 'prose__lead' : undefined}>{pick(section.text)}</p>
              {section.list && (
                <ul>
                  {section.list.map((item) => (
                    <li key={item.en}>{pick(item)}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
