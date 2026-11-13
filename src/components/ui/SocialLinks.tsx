import type { IconType } from 'react-icons';
import { FaInstagram, FaSnapchat, FaTiktok, FaXTwitter, FaYoutube } from 'react-icons/fa6';
import { STORE } from '../../data/content';

const NETWORKS: Record<string, { label: string; Icon: IconType }> = {
  instagram: { label: 'Instagram', Icon: FaInstagram },
  x: { label: 'X', Icon: FaXTwitter },
  tiktok: { label: 'TikTok', Icon: FaTiktok },
  snapchat: { label: 'Snapchat', Icon: FaSnapchat },
  youtube: { label: 'YouTube', Icon: FaYoutube },
};

interface SocialLinksProps {
  /** `buttons` draws bordered circles (footer); `plain` draws bare icons (top bar). */
  variant?: 'buttons' | 'plain';
  className?: string;
}

/** The store's social accounts. Networks the store has not filled in are skipped. */
export function SocialLinks({ variant = 'buttons', className }: SocialLinksProps) {
  return (
    <ul className={`flex flex-wrap items-center ${variant === 'buttons' ? 'gap-2' : 'gap-1'} ${className ?? ''}`}>
      {STORE.social.map(({ network, href }) => {
        const entry = NETWORKS[network];
        if (!entry) return null;
        const { label, Icon } = entry;
        return (
          <li key={network}>
            <a
              className={variant === 'buttons' ? 'icon-button' : 'grid h-8 w-8 place-items-center rounded-pill text-[0.95rem] transition-colors duration-200 hover:bg-accent hover:text-on-accent'}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
            >
              <Icon aria-hidden />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
