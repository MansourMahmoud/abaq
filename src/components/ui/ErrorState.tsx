import { Link } from 'react-router-dom';
import { LuRefreshCw, LuTriangleAlert } from 'react-icons/lu';
import type { FallbackProps } from 'react-error-boundary';
import { useI18n } from '../../i18n/I18nProvider';

/**
 * Shown by the error boundary when a page fails to render or its code fails
 * to load (a dropped connection, for example). The header and footer stay in
 * place, so the shopper can retry or carry on elsewhere.
 */
export function ErrorState({ resetErrorBoundary }: FallbackProps) {
  const { t } = useI18n();
  return (
    <section className="container grid justify-items-center gap-4 py-24 text-center" role="alert">
      <span className="grid h-16 w-16 place-items-center rounded-pill bg-raise text-3xl text-accent">
        <LuTriangleAlert aria-hidden />
      </span>
      <h1 className="section__title">{t('error.title')}</h1>
      <p className="max-w-[46ch] text-muted">{t('error.lead')}</p>
      <div className="flex flex-wrap justify-center gap-3">
        <button className="button" type="button" onClick={resetErrorBoundary}>
          <LuRefreshCw aria-hidden /> {t('error.retry')}
        </button>
        <Link className="button button--ghost" to="/" onClick={resetErrorBoundary}>
          {t('nav.home')}
        </Link>
      </div>
    </section>
  );
}
