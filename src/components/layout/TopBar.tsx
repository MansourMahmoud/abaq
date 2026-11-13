import { Link } from 'react-router-dom';
import { LuGlobe, LuMail, LuMapPin, LuPhone } from 'react-icons/lu';
import { STORE } from '../../data/content';
import { useI18n } from '../../i18n/I18nProvider';
import { useThemeSettings } from '../../settings/ThemeSettings';
import { SocialLinks } from '../ui/SocialLinks';

interface TopBarProps {
  onLocale: () => void;
}

/**
 * Slim strip between the announcement bar and the header: social accounts on
 * one side, contact details and shortcuts on the other. Hidden on phones,
 * where the same links live in the category drawer and the footer.
 */
export function TopBar({ onLocale }: TopBarProps) {
  const { t, currency } = useI18n();
  const { header } = useThemeSettings().settings;
  if (!header.topBar) return null;

  const link = 'inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-accent';

  return (
    <div className="scope-dark hidden bg-bg text-[0.8rem] text-soft md:block">
      <div className="container flex h-10 items-center justify-between gap-6">
        <SocialLinks variant="plain" />
        <ul className="flex items-center gap-5">
          <li>
            <a className={link} href={`tel:${STORE.phone}`}>
              <LuPhone className="text-accent" aria-hidden /> <bdi dir="ltr">{STORE.phone}</bdi>
            </a>
          </li>
          <li>
            <a className={link} href={`mailto:${STORE.email}`}>
              <LuMail className="text-accent" aria-hidden /> <bdi dir="ltr">{STORE.email}</bdi>
            </a>
          </li>
          <li className="hidden lg:block">
            <Link className={link} to="/branches">
              <LuMapPin className="text-accent" aria-hidden /> {t('nav.branches')}
            </Link>
          </li>
          <li>
            <button className={`${link} bg-transparent p-0`} type="button" onClick={onLocale}>
              <LuGlobe className="text-accent" aria-hidden /> {t('locale.title')} · {currency}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
