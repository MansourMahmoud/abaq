import { useState } from 'react';
import { useI18n } from '../../i18n/I18nProvider';

/**
 * Payment methods accepted by the store, shown with Salla's own payment icons.
 * These are platform assets served from Salla's CDN, the same files the
 * `<salla-payments>` component uses; the Salla theme lists whichever methods
 * the store has enabled.
 */
const METHODS = [
  { id: 'mada', name: 'mada' },
  { id: 'credit_card', name: 'Visa / Mastercard' },
  { id: 'apple_pay', name: 'Apple Pay' },
  { id: 'stc_pay', name: 'STC Pay' },
  { id: 'tabby_installment', name: 'tabby' },
  { id: 'tamara_installment', name: 'tamara' },
  { id: 'bank', name: 'Bank transfer' },
];

const iconUrl = (id: string) => `https://cdn.salla.network/images/payment/${id}_mini.png`;

function PaymentBadge({ id, name }: { id: string; name: string }) {
  // If an icon fails to load, the method's name stands in for it.
  const [failed, setFailed] = useState(false);
  return (
    <li title={name}>
      {failed ? name : <img src={iconUrl(id)} alt={name} width={48} height={30} loading="lazy" decoding="async" onError={() => setFailed(true)} />}
    </li>
  );
}

export function PaymentBadges() {
  const { t } = useI18n();
  return (
    <ul className="payments" aria-label={t('footer.payments')}>
      {METHODS.map((method) => (
        <PaymentBadge key={method.id} {...method} />
      ))}
    </ul>
  );
}
