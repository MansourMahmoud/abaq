import { Link } from 'react-router-dom';
import { FaInstagram, FaSnapchat, FaTiktok, FaWhatsapp, FaXTwitter, FaYoutube } from 'react-icons/fa6';
import { LuBadgeCheck, LuFileBadge, LuMail, LuPhone, LuReceiptText, LuScrollText } from 'react-icons/lu';
import type { IconType } from 'react-icons';
import { categories } from '../../data/catalog';
import { STORE, pages, whatsappUrl } from '../../data/content';
import { useI18n } from '../../i18n/I18nProvider';
import type { MessageKey } from '../../i18n/messages';
import { useThemeSettings } from '../../settings/ThemeSettings';
import { Logo } from '../ui/Logo';
import { PaymentBadges } from '../ui/PaymentBadges';

const SOCIAL: { label: string; href: string; Icon: IconType }[] = [
  { label: 'Instagram', href: 'https://instagram.com', Icon: FaInstagram },
  { label: 'X', href: 'https://x.com', Icon: FaXTwitter },
  { label: 'TikTok', href: 'https://tiktok.com', Icon: FaTiktok },
  { label: 'Snapchat', href: 'https://snapchat.com', Icon: FaSnapchat },
  { label: 'YouTube', href: 'https://youtube.com', Icon: FaYoutube },
];

/**
 * Registration and verification details. Values are demo placeholders; only
 * entries with a value render, so a store without a freelance licence simply
 * shows no badge for it.
 */
const COMPLIANCE: { key: MessageKey; value: string; Icon: IconType }[] = [
  { key: 'footer.businessCenter', value: '0000000000', Icon: LuBadgeCheck },
  { key: 'footer.commercialRecord', value: '1010000000', Icon: LuFileBadge },
  { key: 'footer.taxNumber', value: '300000000000003', Icon: LuReceiptText },
  { key: 'footer.freelance', value: '', Icon: LuScrollText },
];

export function Footer() {
  const { t, pick } = useI18n();
  const { footer } = useThemeSettings().settings;
  const compliance = COMPLIANCE.filter((entry) => entry.value);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Link className="header__logo" to="/" aria-label={t('nav.home')}>
              <Logo />
            </Link>
            <p className="text-muted">{pick(STORE.description)}</p>
            {footer.showSocial && (
              <ul className="footer__social">
                {SOCIAL.map(({ label, href, Icon }) => (
                  <li key={label}>
                    <a className="icon-button" href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                      <Icon aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <nav aria-label={t('footer.shop')}>
            <h2 className="footer__title">{t('footer.shop')}</h2>
            <ul>
              {categories.map((category) => (
                <li key={category.id}>
                  <Link to={`/category/${category.slug}`}>{pick(category.name)}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t('footer.links')}>
            <h2 className="footer__title">{t('footer.links')}</h2>
            <ul>
              {pages.map((page) => (
                <li key={page.slug}>
                  <Link to={`/page/${page.slug}`}>{pick(page.title)}</Link>
                </li>
              ))}
              <li><Link to="/branches">{t('nav.branches')}</Link></li>
              <li><Link to="/blog">{t('nav.blog')}</Link></li>
            </ul>
          </nav>

          <div>
            <h2 className="footer__title">{t('footer.contact')}</h2>
            <ul className="footer__contact" data-style={footer.contactStyle}>
              <li>
                <a href={`tel:${STORE.phone}`}>
                  <LuPhone aria-hidden /> <bdi dir="ltr">{STORE.phone}</bdi>
                </a>
              </li>
              <li>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp aria-hidden /> {t('footer.whatsapp')}
                </a>
              </li>
              <li>
                <a href={`mailto:${STORE.email}`}>
                  <LuMail aria-hidden /> <bdi dir="ltr">{STORE.email}</bdi>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {footer.showCompliance && compliance.length > 0 && (
          <dl className="footer__compliance">
            {compliance.map(({ key, value, Icon }) => (
              <div key={key}>
                <Icon aria-hidden />
                <dt>{t(key)}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        )}

        <div className="footer__bottom">
          <p>
            {t('footer.rights')} · {pick(STORE.name)} {new Date().getFullYear()}
          </p>
          {footer.showPayments && <PaymentBadges />}
        </div>
      </div>
    </footer>
  );
}
