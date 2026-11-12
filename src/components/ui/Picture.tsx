import { imageSrcSet, imageUrl, type PhotoKey } from '../../lib/media';

interface PictureProps {
  photo: PhotoKey;
  alt: string;
  /** CSS `sizes` value describing how wide the image renders at each breakpoint. */
  sizes: string;
  /** Above-the-fold images load eagerly and get fetch priority (LCP). */
  priority?: boolean;
  className?: string;
}

/**
 * Responsive image. The parent sets the box (usually with `aspect-ratio`), the
 * image fills it with `object-fit: cover`, so mixed photo ratios never shift
 * the layout.
 */
export function Picture({ photo, alt, sizes, priority = false, className }: PictureProps) {
  return (
    <img
      className={className}
      src={imageUrl(photo, 768)}
      srcSet={imageSrcSet(photo)}
      sizes={sizes}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
    />
  );
}
