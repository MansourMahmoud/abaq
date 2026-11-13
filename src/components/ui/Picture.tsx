import { useState } from 'react';
import { LuImageOff } from 'react-icons/lu';
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
 * the layout. While the file loads the box shows a soft shimmer; if it fails,
 * a neutral placeholder takes its place instead of a broken-image icon.
 */
export function Picture({ photo, alt, sizes, priority = false, className }: PictureProps) {
  const [state, setState] = useState<'loading' | 'loaded' | 'failed'>('loading');

  if (state === 'failed') {
    return (
      <span className={`picture-fallback ${className ?? ''}`} role={alt ? 'img' : undefined} aria-label={alt || undefined}>
        <LuImageOff aria-hidden />
      </span>
    );
  }

  return (
    <img
      className={`picture ${className ?? ''}`}
      data-state={state}
      src={imageUrl(photo, 768)}
      srcSet={imageSrcSet(photo)}
      sizes={sizes}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      // A cached image can finish before React attaches the handler.
      ref={(element) => {
        if (element?.complete && element.naturalWidth > 0) setState('loaded');
      }}
      onLoad={() => setState('loaded')}
      onError={() => setState('failed')}
    />
  );
}
