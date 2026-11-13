import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa6';
import { LuBadgeCheck, LuMail, LuPhone, LuReceiptText, LuScrollText } from 'react-icons/lu';
import type { IconType } from 'react-icons';
import { ALL_PRODUCTS, categories } from '../../data/catalog';
import { STORE, pages, whatsappUrl } from '../../data/content';
import { useI18n } from '../../i18n/I18nProvider';
import type { MessageKey } from '../../i18n/messages';
import { useThemeSettings } from '../../settings/ThemeSettings';
import { Logo } from '../ui/Logo';
import { PaymentBadges } from '../ui/PaymentBadges';
import { SocialLinks } from '../ui/SocialLinks';

const YEAR = new Date().getFullYear();

/**
 * Registration and verification details. The Business Center and VAT marks
 * are Salla platform assets served from its CDN. Values are demo placeholders; only
 * entries with a value render, so a store without a freelance licence simply
 * shows no badge for it.
 */
const COMPLIANCE: { key: MessageKey; value: string; Icon: IconType; image?: string }[] = [
  { key: 'footer.businessCenter', value: '0000000000', Icon: LuBadgeCheck, image: 'https://cdn.salla.network/images/sbc.png?v=2.0.5' },
  { key: 'footer.commercialRecord', value: '1010000000', Icon: CommercialRecordIcon },
  { key: 'footer.taxNumber', value: '300000000000003', Icon: LuReceiptText, image: 'https://cdn.salla.network/images/tax.png?v=2.0.5' },
  { key: 'footer.freelance', value: '', Icon: LuScrollText },
];

/**
 * Commercial registration mark: a certificate with a seal. Drawn in-house
 * because the platform does not supply an image for it.
 */
function CommercialRecordIcon() {
  return (
    <svg className="footer__cr" viewBox="0 0 44 44" aria-hidden>
      <rect width="44" height="44" rx="8" fill="#fff" />
      <path d="M12 9h15l6 6v20H12z" fill="#eef4ef" stroke="#1c6b3c" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M27 9v6h6" fill="none" stroke="#1c6b3c" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M16 19h10M16 23h7" stroke="#1c6b3c" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="27.5" cy="29.5" r="4.5" fill="#c9a24a" />
      <path d="m25.4 29.6 1.5 1.5 2.7-3" fill="none" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** A badge's official platform image when it has one, falling back to an icon if it fails to load. */
function ComplianceMark({ image, Icon }: { image?: string; Icon: IconType }) {
  const [failed, setFailed] = useState(false);
  if (!image || failed) return <Icon aria-hidden />;
  return <img src={image} alt="" width={44} height={44} loading="lazy" decoding="async" onError={() => setFailed(true)} />;
}

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
            {footer.showSocial && <SocialLinks className="footer__social" />}
          </div>

          <nav aria-label={t('footer.shop')}>
            <h2 className="footer__title">{t('footer.shop')}</h2>
            <ul>
              {categories.map((category) => (
                <li key={category.id}>
                  <Link to={`/category/${category.slug}`}>{pick(category.name)}</Link>
                </li>
              ))}
              <li>
                <Link to={`/category/${ALL_PRODUCTS.slug}`}>{pick(ALL_PRODUCTS.name)}</Link>
              </li>
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
              <li><Link to="/loyalty">{t('loyalty.name')}</Link></li>
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
            {compliance.map(({ key, value, Icon, image }) => (
              <div key={key}>
                <ComplianceMark image={image} Icon={Icon} />
                <dt>{t(key)}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        )}

        <div className="footer__bottom">
          <p>
            {t('footer.rights')} · {pick(STORE.name)} {YEAR}
          </p>
          {footer.showPayments && <PaymentBadges />}
        </div>
      </div>
    </footer>
  );
}
