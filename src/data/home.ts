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
  photos: ['souk', 'handsHolding', 'oudOil'] as [PhotoKey, PhotoKey, PhotoKey],
  /** Small badge over the main photo. */
  since: l('منذ ٢٠١٤', 'Since 2014'),
  /** What the store promises, shown as three short cards. */
  values: [
    { icon: 'notes', title: l('نوتات مكتوبة بوضوح', 'Notes spelled out'), text: l('تعرف المقدمة والقلب والقاعدة قبل الشراء.', 'Top, heart and base, before you buy.') },
    { icon: 'source', title: l('من المصدر مباشرة', 'Straight from the source'), text: l('نختار الزيوت بأنفسنا ونعبّئها عندنا.', 'We pick the oils ourselves and bottle them in-house.') },
    { icon: 'sample', title: l('جرّب أولاً', 'Try first'), text: l('عيّنة مع كل طلب، والزجاجة تبقى مغلقة.', 'A sample with every order; the bottle stays sealed.') },
  ] as { icon: 'notes' | 'source' | 'sample'; title: Localized; text: Localized }[],
  /** Figures shown under the text; the numbers count up when scrolled into view. */
  stats: [
    { value: 12000, suffix: '+', label: l('طلب تم توصيله', 'orders delivered') },
    { value: 4.8, suffix: '', label: l('متوسط التقييم', 'average rating') },
    { value: 3, suffix: '', label: l('فروع في المملكة', 'branches in the Kingdom') },
  ],
  link: { label: l('اقرأ حكايتنا', 'Read our story'), to: '/page/about' },
  secondaryLink: { label: l('زُر أقرب فرع', 'Visit a branch'), to: '/branches' },
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
  /** Story highlights shown as rings under the profile. */
  highlights: [
    { label: l('جديدنا', 'New in'), photo: 'pinkBottle' },
    { label: l('آراء العملاء', 'Reviews'), photo: 'handsHolding' },
    { label: l('من المعمل', 'The lab'), photo: 'rollOns' },
    { label: l('هدايا', 'Gifts'), photo: 'bottlesRow' },
    { label: l('البخور', 'Bakhoor'), photo: 'burnerMajlis' },
  ] as { label: Localized; photo: PhotoKey }[],
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
  text: l('مراجعات قصيرة، نصائح للثبات، وكواليس من المعمل كل أسبوع.', 'Short reviews, tips for lasting power and weekly scenes from the lab.'),
  handle: '@abaq',
  href: 'https://tiktok.com',
  stats: [
    { value: l('١٢٠ ألف', '120K'), label: l('متابع', 'followers') },
    { value: l('٢٫٤ مليون', '2.4M'), label: l('إعجاب', 'likes') },
  ],
  /** `file` names a clip in `data/videos.ts`. */
  videos: [
    { file: 'gift-moment', caption: l('فتح علبة طقم الثنائي', 'Unboxing the Duo Set'), views: l('٢١٤ ألف', '214K'), likes: l('١٨ ألف', '18K') },
    { file: 'spray-wrist', caption: l('أين ترشّ العطر ليثبت؟', 'Where to spray so it lasts'), views: l('١٨٠ ألف', '180K'), likes: l('١٥ ألف', '15K') },
    { file: 'bottle-reflective', caption: l('جديدنا: مسك الصباح', 'New in: Morning Musk'), views: l('٩٦ ألف', '96K'), likes: l('٧ آلاف', '7K') },
    { file: 'final-touch', caption: l('حرير الفانيلا عن قرب', 'Vanilla Silk up close'), views: l('٨٨ ألف', '88K'), likes: l('٦ آلاف', '6K') },
    { file: 'blending', caption: l('من داخل المعمل', 'Inside the lab'), views: l('٥٨ ألف', '58K'), likes: l('٤ آلاف', '4K') },
    { file: 'touching-bottle', caption: l('طقم الإرث هدية', 'The Heritage Set as a gift'), views: l('٤١ ألف', '41K'), likes: l('٣ آلاف', '3K') },
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

/* ---------- Scent finder ---------- */

export interface QuizOption {
  label: Localized;
  /** Category ids this answer points to; a product matching any of them fits the answer. */
  categories: string[];
}

/** Three questions; each answer narrows the catalogue by category. */
export const quiz: { question: Localized; options: QuizOption[] }[] = [
  {
    question: l('لمن العطر؟', 'Who is it for?'),
    options: [
      { label: l('له', 'For him'), categories: ['men', 'oud'] },
      { label: l('لها', 'For her'), categories: ['women', 'oud'] },
      { label: l('للبيت والمجلس', 'For home'), categories: ['bakhoor'] },
      { label: l('هدية', 'A gift'), categories: ['gifts', 'samples'] },
    ],
  },
  {
    question: l('ما الطابع الذي تميل إليه؟', 'Which character do you lean to?'),
    options: [
      { label: l('منعش وخفيف', 'Fresh and light'), categories: ['men-fresh', 'women-floral', 'samples'] },
      { label: l('دافئ وحلو', 'Warm and sweet'), categories: ['women-amber', 'men-oriental', 'bakhoor', 'gifts'] },
      { label: l('خشبي وعميق', 'Woody and deep'), categories: ['men-woody', 'oud', 'bakhoor'] },
      { label: l('زهري ناعم', 'Soft floral'), categories: ['women-floral', 'oud-blends', 'gifts'] },
    ],
  },
  {
    question: l('ما ميزانيتك؟', 'What is your budget?'),
    options: [
      { label: l('أقل من ٣٠٠ ر.س', 'Under SAR 300'), categories: ['max:300'] },
      { label: l('من ٣٠٠ إلى ٥٠٠ ر.س', 'SAR 300 to 500'), categories: ['min:300', 'max:500'] },
      { label: l('أكثر من ٥٠٠ ر.س', 'Over SAR 500'), categories: ['min:500'] },
      { label: l('لا يهم', 'No limit'), categories: [] },
    ],
  },
];

/* ---------- Perfume guide ---------- */

export const guide = {
  /** Concentrations from lightest to strongest; `hours` is typical lasting time and `strength` a 0–100 bar. */
  concentrations: [
    { name: l('أو دو تواليت', 'Eau de toilette'), share: l('٥–١٥٪ زيت عطري', '5–15% perfume oil'), hours: l('٣–٥', '3–5'), strength: 35 },
    { name: l('أو دو بارفان', 'Eau de parfum'), share: l('١٥–٢٠٪ زيت عطري', '15–20% perfume oil'), hours: l('٦–٨', '6–8'), strength: 60 },
    { name: l('بارفان', 'Parfum'), share: l('٢٠–٣٠٪ زيت عطري', '20–30% perfume oil'), hours: l('٨–١٠', '8–10'), strength: 80 },
    { name: l('دهن العود', 'Oud oil'), share: l('زيت صافٍ بلا كحول', 'Pure oil, no alcohol'), hours: l('+١٢', '12+'), strength: 100 },
  ],
  tips: [
    { title: l('على بشرة مرطّبة', 'On moisturised skin'), text: l('رشّ بعد الاستحمام أو بعد كريم بلا رائحة؛ البشرة الجافة لا تمسك العطر.', 'Spray after a shower or an unscented lotion; dry skin does not hold scent.') },
    { title: l('على نقاط النبض', 'On pulse points'), text: l('المعصم، خلف الأذن وأسفل العنق: حرارة الجسم تنشر العطر.', 'Wrists, behind the ears and the base of the neck: body heat carries the scent.') },
    { title: l('لا تفرك المعصمين', 'Do not rub your wrists'), text: l('الفرك يكسر النوتات العليا ويقصّر عمر العطر.', 'Rubbing breaks the top notes and shortens the life of the scent.') },
    { title: l('احفظه بعيداً عن الضوء', 'Store away from light'), text: l('مكان مظلم ومعتدل الحرارة يحفظ الزجاجة سنوات.', 'A dark, temperate place keeps a bottle good for years.') },
  ],
  link: { label: l('اقرأ الدليل كاملاً', 'Read the full guide'), to: '/blog' },
};

/* ---------- Layering routine ---------- */

/** Three products worn together, sold as one set from the home page. */
export const layering = {
  eyebrow: l('طبقات العطر', 'Scent layering'),
  title: l('ثلاث خطوات لعطر يدوم يومك كله', 'Three steps to a scent that lasts all day'),
  text: l('هكذا يتعطّر أهل الخليج: دهن على البشرة، عطر فوقه، وبخور للثوب. اطلب الثلاثة معاً بضغطة واحدة.', 'The Gulf way to wear scent: oil on the skin, perfume over it, bakhoor for the clothes. Order all three in one tap.'),
  steps: [
    { productId: 'p20', step: l('دهن على نقاط النبض', 'Oil on the pulse points') },
    { productId: 'p1', step: l('رشّتان من العطر فوقه', 'Two sprays of perfume over it') },
    { productId: 'p22', step: l('بخور للثوب والمجلس', 'Bakhoor for clothes and home') },
  ],
};

/* ---------- Loyalty ---------- */

export const loyalty = {
  eyebrow: l('برنامج الولاء', 'Loyalty programme'),
  title: l('كل طلب يقرّبك من عطرك القادم', 'Every order brings your next scent closer'),
  steps: [
    { value: l('١ ر.س = نقطة', 'SAR 1 = 1 point'), text: l('تجمع نقاطاً مع كل طلب تلقائياً.', 'Points add up with every order, automatically.') },
    { value: l('٢٠٠ نقطة', '200 points'), text: l('هدية ترحيب عند أول طلب.', 'A welcome gift on your first order.') },
    { value: l('٥٠٠ نقطة = ٢٥ ر.س', '500 points = SAR 25'), text: l('استبدلها خصماً عند إتمام الطلب.', 'Redeem them as a discount at checkout.') },
    { value: l('ادعُ صديقاً', 'Invite a friend'), text: l('لك وله ٥٠ ر.س على أول طلب له.', 'SAR 50 each on their first order.') },
  ],
  action: { label: l('انضم الآن', 'Join now'), to: '/page/about' },
};
