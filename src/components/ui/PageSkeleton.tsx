import { useI18n } from '../../i18n/I18nProvider';

/**
 * Placeholder shown while a page's code is being fetched. It mirrors the
 * rough shape of a page (banner, heading, a row of cards) so the layout does
 * not jump when the real content arrives.
 */
export function PageSkeleton() {
  const { t } = useI18n();
  return (
    <div className="container grid gap-6 py-8" role="status" aria-label={t('loader.label')}>
      <div className="skeleton h-[clamp(160px,28vw,300px)] !rounded-lg" />
      <div className="skeleton h-9 w-1/3" />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="grid gap-3">
            <div className="skeleton aspect-[4/5] !rounded-md" />
            <div className="skeleton h-4 w-2/3" />
            <div className="skeleton h-4 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}
