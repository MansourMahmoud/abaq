import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/I18nProvider';

export function NotFoundPage({ title }: { title?: string }) {
  const { t } = useI18n();
  return (
    <section className="section container empty-state">
      <h1 className="section__title">{title ?? t('notFound.title')}</h1>
      <p className="text-muted">{t('notFound.body')}</p>
      <Link className="button" to="/">
        {t('notFound.cta')}
      </Link>
    </section>
  );
}
