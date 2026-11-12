import { Link } from 'react-router-dom';
import { FaInstagram, FaSnapchat, FaTiktok, FaWhatsapp, FaXTwitter, FaYoutube } from 'react-icons/fa6';
import { LuMail, LuPhone } from 'react-icons/lu';
import { categories } from '../../data/catalog';
import { useI18n } from '../../i18n/I18nProvider';
import type { MessageKey } from '../../i18n/messages';
import { useThemeSettings } from '../../settings/ThemeSettings';

/** Store identity. In the Salla theme these come from `useStore()`. */
const STORE = {
  phone: '+201021786873',
  email: 'get.digimarket@gmail.com',
  social: [
    { label: 'Instagram', href: 'https://instagram.com', Icon: FaInstagram },
    { label: 'X', href: 'https://x.com', Icon: FaXTwitter },
    { label: 'TikTok', href: 'https://tiktok.com', Icon: FaTiktok },
    { label: 'Snapchat', href: 'https://snapchat.com', Icon: FaSnapchat },
    { label: 'YouTube', href: 'https://youtube.com', Icon: FaYoutube },
  ],
  payments: ['mada', 'Visa', 'Mastercard', 'Apple Pay', 'Tabby', 'Tamara'],
  /** Only entries with a value render, so an unverified store shows nothing. */
  compliance: [
    { key: 'footer.businessCenter', value: '0000000000' },
    { key: 'footer.commercialRecord', value: '1010000000' },
    { key: 'footer.taxNumber', value: '300000000000003' },
    { key: 'footer.freelance', value: '' },
  ] satisfies { key: MessageKey; value: string }[],
};

export function Footer() {
  const { t, pick, locale } = useI18n();
  const { footer } = useThemeSettings().settings;
  const whatsappHref = `https://wa.me/${STORE.phone.replace(/\D/g, '')}`;
  const compliance = STORE.compliance.filter((entry) => entry.value);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Link className="header__logo" to="/">
              {locale === 'ar' ? 'عبق' : 'Abaq'}
            </Link>
            <p className="text-muted">
              {locale === 'ar'
                ? 'عطور ودهن عود وبخور مختارة بعناية، بنوتات واضحة تساعدك على الاختيار.'
                : 'Carefully chosen perfumes, oud oils and bakhoor, with clear notes to help you choose.'}
            </p>
            {footer.showSocial && (
              <ul className="footer__social">
                {STORE.social.map(({ label, href, Icon }) => (
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
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
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
            {compliance.map((entry) => (
              <div key={entry.key}>
                <dt>{t(entry.key)}</dt>
                <dd>{entry.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <div className="footer__bottom">
          <p>
            {t('footer.rights')} · {locale === 'ar' ? 'عبق' : 'Abaq'} {new Date().getFullYear()}
          </p>
          {footer.showPayments && (
            <ul className="footer__payments" aria-label={t('footer.payments')}>
              {STORE.payments.map((method) => (
                <li key={method}>{method}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </footer>
  );
}
