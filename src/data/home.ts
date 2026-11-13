import type { Localized } from '../i18n/I18nProvider';
import type { PhotoKey } from '../lib/media';

/**
 * Editorial content of the home page sections. Everything here is text or a
 * picture the merchant sets in the theme editor, so it lives with the data
 * rather than with the interface strings in `i18n/messages.ts`.
 */

const l = (ar: string, en: string): Localized => ({ ar, en });

export const perks: { icon: 'truck' | 'shield' | 'sample' | 'card'; title: Localized; text: Localized }[] = [
  { icon: 'truck', title: l('توصيل خلال ١–٣ أيام', 'Delivery in 1–3 days'), text: l('ومجاني للطلبات فوق ٣٠٠ ر.س', 'Free on orders over SAR 300') },
  { icon: 'shield', title: l('أصلي ١٠٠٪', '100% authentic'), text: l('من المصدر مع فاتورة ضريبية', 'From the source, with a tax invoice') },
  { icon: 'sample', title: l('عيّنة مع كل طلب', 'A sample with every order'), text: l('جرّب قبل أن تفتح الزجاجة', 'Try before you open the bottle') },
  { icon: 'card', title: l('ادفع على راحتك', 'Pay your way'), text: l('مدى، Apple Pay، تابي وتمارا', 'mada, Apple Pay, Tabby and Tamara') },
];

/** "Shop by note" tiles. `to` is any storefront link. */
export const scentNotes: { name: Localized; hint: Localized; photo: PhotoKey; to: string }[] = [
  { name: l('عود', 'Oud'), hint: l('عميق ودافئ', 'Deep and warm'), photo: 'oudOil', to: '/category/oud' },
  { name: l('عنبر', 'Amber'), hint: l('حلو وناعم', 'Sweet and soft'), photo: 'amberTrio', to: '/category/women-amber' },
  { name: l('ورد', 'Rose'), hint: l('زهري طبيعي', 'Natural floral'), photo: 'daisyShadows', to: '/category/women-floral' },
  { name: l('مسك', 'Musk'), hint: l('نظيف ومنعش', 'Clean and fresh'), photo: 'clearOnFur', to: '/category/men-fresh' },
  { name: l('أخشاب', 'Woods'), hint: l('جاف وأنيق', 'Dry and elegant'), photo: 'goldBottle', to: '/category/men-woody' },
  { name: l('بخور', 'Bakhoor'), hint: l('للمجالس والبيت', 'For home and majlis'), photo: 'burnerCarpet', to: '/category/bakhoor' },
];

/** "Shop by budget" cards; each opens the full listing with a price filter applied. */
export const budgets: { title: Localized; text: Localized; photo: PhotoKey; max?: number; min?: number }[] = [
  { title: l('أقل من ٢٠٠ ر.س', 'Under SAR 200'), text: l('هدايا صغيرة وعيّنات', 'Small gifts and samples'), photo: 'rollOns', max: 200 },
  { title: l('من ٢٠٠ إلى ٤٠٠ ر.س', 'SAR 200 to 400'), text: l('عطور كل يوم', 'Everyday perfumes'), photo: 'monoBottle', min: 200, max: 400 },
  { title: l('أكثر من ٤٠٠ ر.س', 'Over SAR 400'), text: l('دهن العود والإصدارات الخاصة', 'Oud oils and special editions'), photo: 'handsHolding', min: 400 },
];

export const story = {
  eyebrow: l('حكايتنا', 'Our story'),
  title: l('من سوق العطارين إلى بيتك', 'From the perfumers’ souk to your home'),
  text: l(
    'بدأ عبق من محل صغير وقناعة بسيطة: أن تعرف ما في الزجاجة قبل أن تشتريها. لهذا نكتب نوتات كل عطر بوضوح، ونرسل مع كل طلب عيّنة تجرّبها أولاً.',
    'Abaq began as a small shop with a simple belief: you should know what is in the bottle before you buy it. So we spell out every note, and every order ships with a sample to try first.',
  ),
  photos: ['souk', 'handsHolding'] as [PhotoKey, PhotoKey],
  /** Figures shown under the text; the numbers count up when scrolled into view. */
  stats: [
    { value: 12000, suffix: '+', label: l('طلب تم توصيله', 'orders delivered') },
    { value: 4.8, suffix: '', label: l('متوسط التقييم', 'average rating') },
    { value: 3, suffix: '', label: l('فروع في المملكة', 'branches in the Kingdom') },
  ],
  link: { label: l('اقرأ حكايتنا', 'Read our story'), to: '/page/about' },
};

/**
 * Social sections. Counts and captions are what the merchant types in; the
 * Salla theme does not read them from the networks.
 */
export const instagram = {
  eyebrow: l('تابعنا على إنستغرام', 'Follow us on Instagram'),
  title: l('عبق في بيوتكم', 'Abaq at home'),
  handle: '@abaq',
  href: 'https://instagram.com',
  bio: l('عطور ودهن عود وبخور · صور من عملائنا كل أسبوع', 'Perfume, oud and bakhoor · customer photos every week'),
  stats: [
    { value: l('٤٨ ألف', '48K'), label: l('متابع', 'followers') },
    { value: l('٣١٢', '312'), label: l('منشور', 'posts') },
  ],
  posts: [
    { photo: 'goldBottle', likes: 1240, comments: 86 },
    { photo: 'burnerCarpet', likes: 980, comments: 41 },
    { photo: 'amberTrio', likes: 1530, comments: 112 },
    { photo: 'oudOil', likes: 870, comments: 37 },
    { photo: 'pinkBottle', likes: 1105, comments: 64 },
    { photo: 'bottlesRow', likes: 760, comments: 29 },
  ] as { photo: PhotoKey; likes: number; comments: number }[],
};

export const tiktok = {
  eyebrow: l('الأكثر مشاهدة على تيك توك', 'Most watched on TikTok'),
  title: l('شاهد عبق على تيك توك', 'Watch Abaq on TikTok'),
  handle: '@abaq',
  href: 'https://tiktok.com',
  /** `file` names a clip in `data/videos.ts`. */
  videos: [
    { file: 'touching-bottle', caption: l('فتح علبة طقم الإرث', 'Unboxing the Heritage Set'), views: l('٢١٤ ألف', '214K') },
    { file: 'spray-wrist', caption: l('أين ترشّ العطر ليثبت؟', 'Where to spray so it lasts'), views: l('١٨٠ ألف', '180K') },
    { file: 'bottle-reflective', caption: l('جديدنا: مسك الصباح', 'New in: Morning Musk'), views: l('٩٦ ألف', '96K') },
    { file: 'atomizer', caption: l('رشّة واحدة تكفي', 'One spray is enough'), views: l('٧٣ ألف', '73K') },
    { file: 'making-perfume', caption: l('من داخل المعمل', 'Inside the lab'), views: l('٥٨ ألف', '58K') },
  ],
};

/** Promotional card that overlaps the top edge of the footer. */
export const footerPromo = {
  eyebrow: l('استشارة مجانية', 'Free consultation'),
  title: l('لا تعرف أي عطر يناسبك؟', 'Not sure which scent suits you?'),
  text: l('أخبرنا بذوقك والمناسبة، ونرشّح لك ثلاثة عطور خلال دقائق.', 'Tell us your taste and the occasion, and we suggest three scents within minutes.'),
  photo: 'spraying' as PhotoKey,
  secondary: { label: l('اطلب طقم العيّنات', 'Get the discovery set'), to: '/product/discovery-set' },
};

export const helpCard = {
  title: l('ما زال لديك سؤال؟', 'Still have a question?'),
  text: l('فريقنا يرد من ٩ صباحاً إلى ١١ مساءً، كل أيام الأسبوع.', 'Our team answers from 9am to 11pm, every day.'),
  /** Extra buttons the merchant adds under the contact shortcuts. */
  links: [
    { label: l('تتبّع طلبك', 'Track your order'), to: '/page/shipping' },
    { label: l('زُر أقرب فرع', 'Visit a branch'), to: '/branches' },
  ],
};
