import type { Localized } from '../i18n/I18nProvider';

/**
 * Demo clips. Files live in `public/media/video` as `<file>.mp4` (H.264, 720p,
 * no audio track) with a `<file>-poster.webp` still. Each clip points at the
 * product it shows so the storefront can sell straight from the video.
 */
export interface Clip {
  file: string;
  title: Localized;
  productId: string;
  /** landscape clips feed the showcase player, portrait ones the reels rail */
  orientation: 'landscape' | 'portrait';
}

export const clips: Clip[] = [
  { file: 'atomizer', title: { ar: 'رشّة واحدة تكفي', en: 'One spray is enough' }, productId: 'p3', orientation: 'landscape' },
  { file: 'bottle-rose', title: { ar: 'ورد الطائف عن قرب', en: 'Taif Rose up close' }, productId: 'p4', orientation: 'landscape' },
  { file: 'making-perfume', title: { ar: 'كيف نصنع العطر', en: 'How the perfume is made' }, productId: 'p8', orientation: 'landscape' },
  { file: 'bottle-reflective', title: { ar: 'جديدنا', en: 'New in' }, productId: 'p2', orientation: 'portrait' },
  { file: 'spray-wrist', title: { ar: 'على البشرة', en: 'On skin' }, productId: 'p1', orientation: 'portrait' },
  { file: 'touching-bottle', title: { ar: 'فتح العلبة', en: 'Unboxing' }, productId: 'p10', orientation: 'portrait' },
];

export const clipSrc = (clip: Clip) => `/media/video/${clip.file}.mp4`;
export const clipPoster = (clip: Clip) => `/media/video/${clip.file}-poster.webp`;
