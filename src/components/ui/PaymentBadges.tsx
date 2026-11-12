import { FaApplePay, FaCcMastercard, FaCcVisa } from 'react-icons/fa6';
import type { IconType } from 'react-icons';
import { useI18n } from '../../i18n/I18nProvider';

/**
 * Payment methods accepted by the store. Networks with a published icon use
 * it; regional methods without one render as a labelled badge. The Salla theme
 * replaces this list with the store's enabled methods and their official icons.
 */
const METHODS: { name: string; Icon?: IconType }[] = [
  { name: 'mada' },
  { name: 'Visa', Icon: FaCcVisa },
  { name: 'Mastercard', Icon: FaCcMastercard },
  { name: 'Apple Pay', Icon: FaApplePay },
  { name: 'STC Pay' },
  { name: 'tabby' },
  { name: 'tamara' },
];

export function PaymentBadges() {
  const { t } = useI18n();
  return (
    <ul className="payments" aria-label={t('footer.payments')}>
      {METHODS.map(({ name, Icon }) => (
        <li key={name} title={name}>
          {Icon ? (
            <>
              <Icon aria-hidden />
              <span className="visually-hidden">{name}</span>
            </>
          ) : (
            name
          )}
        </li>
      ))}
    </ul>
  );
}
