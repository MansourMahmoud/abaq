import type { Localized } from '../i18n/I18nProvider';
import type { PhotoKey } from '../lib/media';

/**
 * Editorial content of the demo store: hero slides, journal, static pages,
 * branches, reviews and FAQ. In the Salla theme the hero, FAQ and branches
 * come from theme settings and the rest from the store's own data.
 */

const l = (ar: string, en: string): Localized => ({ ar, en });

/** Store identity. In the Salla theme these come from the store profile. */
export const STORE = {
  name: l('عبق', 'Abaq'),
  description: l('عطور ودهن عود وبخور مختارة بعناية، بنوتات واضحة تساعدك على الاختيار.', 'Carefully chosen perfumes, oud oils and bakhoor, with clear notes to help you choose.'),
  phone: '+201021786873',
  email: 'get.digimarket@gmail.com',
  social: [
    { network: 'instagram', href: 'https://instagram.com' },
    { network: 'x', href: 'https://x.com' },
    { network: 'tiktok', href: 'https://tiktok.com' },
    { network: 'snapchat', href: 'https://snapchat.com' },
    { network: 'youtube', href: 'https://youtube.com' },
  ],
  /** Order total (SAR) from which shipping is free. */
  freeShippingFrom: 300,
};

export const whatsappUrl = `https://wa.me/${STORE.phone.replace(/\D/g, '')}`;

/* ---------- Hero ---------- */

export interface HeroSlide {
  id: string;
  /** A slide shows either a photo or a looping clip (file name in `public/media/video`). */
  media: { kind: 'image'; photo: PhotoKey } | { kind: 'video'; file: string };
  eyebrow: Localized;
  title: Localized;
  lead: Localized;
  link: string;
  /** Product promoted on the slide, shown as a quick-add card. */
  productId?: string;
}

export const heroSlides: HeroSlide[] = [
  {
    id: 'winter',
    media: { kind: 'image', photo: 'bottlesRow' },
    eyebrow: l('مجموعة الشتاء · إصدار محدود', 'Winter collection · limited edition'),
    title: l('أثرٌ يبقى بعد أن تغادر', 'A trace that stays after you leave'),
    lead: l('عطور ودهن عود وبخور مختارة، بنوتات واضحة تساعدك على الاختيار قبل أن تشمّ.', 'Chosen perfumes, oud oils and bakhoor, with clear notes to help you choose before you smell.'),
    link: '/category/men',
    productId: 'p1',
  },
  {
    id: 'rose',
    media: { kind: 'video', file: 'bottle-rose' },
    eyebrow: l('جديد الموسم', 'New this season'),
    title: l('ورد الطائف، كما لم تشمّه من قبل', 'Taif rose as you have never smelled it'),
    lead: l('ورد قُطف فجراً، في زجاجة تبقى معك النهار كله.', 'Rose picked at dawn, in a bottle that lasts the whole day.'),
    link: '/product/taif-rose',
    productId: 'p4',
  },
  {
    id: 'bakhoor',
    media: { kind: 'image', photo: 'burnerMajlis' },
    eyebrow: l('للمجالس والبيت', 'For the home and the majlis'),
    title: l('بخور يستقبل ضيوفك قبلك', 'Bakhoor that greets your guests first'),
    lead: l('معمول ودقة وعود مروكي، مع مباخر للبيت والسفر.', 'Maamoul, dukhoon and incense burners for home and travel.'),
    link: '/category/bakhoor',
    productId: 'p9',
  },
];

/* ---------- Journal ---------- */

export interface Post {
  slug: string;
  title: Localized;
  excerpt: Localized;
  category: Localized;
  photo: PhotoKey;
  author: Localized;
  /** ISO date. */
  date: string;
  minutes: number;
  body: { heading?: Localized; text: Localized; quote?: Localized }[];
  /** Category the article sends readers to shop. */
  shopSlug: string;
}

export const posts: Post[] = [
  {
    slug: 'oud-grades',
    title: l('درجات دهن العود وكيف تميّز الأصلي منها', 'Oud oil grades and how to tell the real thing'),
    excerpt: l('الفرق بين الهندي والكمبودي والمروكي، وما الذي يصنع سعر التولة.', 'Indian, Cambodian and maroki: what separates them and what sets the price of a tola.'),
    category: l('عود وبخور', 'Oud and bakhoor'),
    photo: 'handsHolding',
    author: l('فريق عبق', 'Abaq team'),
    date: '2026-10-28',
    minutes: 6,
    shopSlug: 'oud',
    body: [
      { text: l('دهن العود ليس منتجاً واحداً. يختلف باختلاف الشجرة والمنطقة وطريقة التقطير وسنوات التعتيق، وكل عامل منها يغيّر الرائحة والسعر.', 'Oud oil is not one product. It changes with the tree, the region, the distillation and the years of ageing, and each of these changes the scent and the price.') },
      { heading: l('الهندي والكمبودي', 'Indian and Cambodian'), text: l('الهندي أعمق وأقرب للجلد والدخان، والكمبودي أحلى وأقرب للفاكهة. لا يوجد أفضل مطلقاً؛ الاختيار ذوق.', 'Indian oud is deeper, closer to leather and smoke; Cambodian is sweeter, closer to fruit. Neither is better: it is a matter of taste.'), quote: l('العود الجيد يتغيّر على بشرتك خلال اليوم، ولا يبقى على نغمة واحدة.', 'Good oud changes on your skin through the day; it never stays on one note.') },
      { heading: l('كيف تختبره', 'How to test it'), text: l('ضع نقطة صغيرة على ظاهر اليد وانتظر ربع ساعة قبل الحكم. الافتتاحية الحادة تهدأ، وما يبقى بعدها هو العطر الحقيقي.', 'Put a small drop on the back of your hand and wait a quarter of an hour before judging. The sharp opening settles, and what remains is the real scent.') },
    ],
  },
  {
    slug: 'parfum-vs-edp',
    title: l('الفرق بين البارفان وأو دو بارفان', 'Parfum versus eau de parfum'),
    excerpt: l('التركيز يحدد الثبات والفوحان، وليس الجودة.', 'Concentration sets longevity and sillage, not quality.'),
    category: l('دليل الشراء', 'Buying guide'),
    photo: 'clearOnFur',
    author: l('فريق عبق', 'Abaq team'),
    date: '2026-10-14',
    minutes: 4,
    shopSlug: 'men',
    body: [
      { text: l('الاسم على الزجاجة يصف نسبة الزيت العطري. كلما زادت النسبة طال الثبات وهدأ الفوحان.', 'The name on the bottle describes the share of perfume oil. The higher it is, the longer it lasts and the closer it sits to the skin.') },
      { heading: l('متى تختار كل واحد', 'When to pick each'), text: l('أو دو بارفان للنهار والدوام، والبارفان للمساء والمناسبات، والإكستريه لمن يريد عطراً يبقى حتى اليوم التالي.', 'Eau de parfum for daytime and work, parfum for evenings and occasions, extrait if you want a scent that lasts into the next day.') },
    ],
  },
  {
    slug: 'store-your-perfume',
    title: l('كيف تحفظ عطرك ليبقى سنوات', 'How to store perfume so it lasts for years'),
    excerpt: l('الضوء والحرارة أعداء العطر. ثلاث عادات بسيطة تحميه.', 'Light and heat are the enemies. Three simple habits protect it.'),
    category: l('العناية بالعطر', 'Perfume care'),
    photo: 'amberTrio',
    author: l('فريق عبق', 'Abaq team'),
    date: '2026-09-30',
    minutes: 3,
    shopSlug: 'samples',
    body: [
      { text: l('احفظ الزجاجة في علبتها، بعيداً عن الشمس والحمّام، ولا ترجّها. بهذه العادات الثلاث يبقى العطر كما اشتريته.', 'Keep the bottle in its box, away from sunlight and the bathroom, and do not shake it. With these three habits the perfume stays as you bought it.') },
    ],
  },
  {
    slug: 'gift-a-perfume',
    title: l('كيف تختار عطراً هدية دون أن تسأل', 'How to gift a perfume without asking'),
    excerpt: l('ثلاثة أسئلة عن صاحب الهدية تكفي للاختيار.', 'Three questions about the person are enough to choose.'),
    category: l('هدايا', 'Gifts'),
    photo: 'bottlesRow',
    author: l('فريق عبق', 'Abaq team'),
    date: '2026-09-12',
    minutes: 5,
    shopSlug: 'gifts',
    body: [
      { text: l('اسأل نفسك: هل يفضّل العطور الهادئة أم القوية؟ نهارية أم مسائية؟ وما آخر عطر رأيته عنده؟ الإجابات تحدد العائلة العطرية.', 'Ask yourself: quiet or bold scents? Day or evening? And what was the last bottle you saw on their shelf? The answers point to a fragrance family.') },
    ],
  },
];

/* ---------- Static pages ---------- */

export interface StaticPage {
  slug: string;
  title: Localized;
  photo: PhotoKey;
  sections: { heading?: Localized; text: Localized; list?: Localized[] }[];
}

export const pages: StaticPage[] = [
  {
    slug: 'about',
    title: l('من نحن', 'About us'),
    photo: 'souk',
    sections: [
      { text: l('بدأ عبق من محل صغير في سوق العطارين، ومن قناعة بسيطة: أن يعرف العميل ما في الزجاجة قبل أن يشتريها.', 'Abaq began as a small shop in the perfumers’ souk, with one simple belief: a customer should know what is in the bottle before buying it.') },
      { heading: l('ما نلتزم به', 'What we stand by'), text: l('نختار كل عطر بأنفسنا ونكتب نوتاته بوضوح.', 'We choose every perfume ourselves and describe its notes plainly.'), list: [l('منتجات أصلية من مصادرها', 'Authentic products from their sources'), l('عيّنة مجانية مع كل طلب', 'A free sample with every order'), l('استبدال خلال سبعة أيام', 'Exchange within seven days')] },
    ],
  },
  {
    slug: 'returns',
    title: l('سياسة الاستبدال والاسترجاع', 'Returns and exchange'),
    photo: 'clearOnFur',
    sections: [
      { text: l('يمكنك استبدال المنتج خلال سبعة أيام من الاستلام ما دام بحالته الأصلية وغير مفتوح.', 'You can exchange a product within seven days of delivery as long as it is unopened and in its original condition.') },
      { heading: l('الخطوات', 'Steps'), text: l('راسلنا برقم الطلب، ونرتّب استلام المنتج من عنوانك.', 'Message us with your order number and we will arrange pickup from your address.') },
    ],
  },
  {
    slug: 'shipping',
    title: l('الشحن والتوصيل', 'Shipping and delivery'),
    photo: 'rollOns',
    sections: [
      { text: l('نوصل لكل مدن المملكة خلال يوم إلى ثلاثة أيام عمل. الشحن مجاني للطلبات فوق ٣٠٠ ريال.', 'We deliver across the Kingdom in one to three working days. Shipping is free on orders over SAR 300.') },
    ],
  },
];

/* ---------- Branches ---------- */

export interface Branch {
  id: string;
  name: Localized;
  address: Localized;
  phone: string;
  /** Coordinates used for the embedded map and the directions link. */
  location: { lat: number; lng: number };
  hours: { days: Localized; time: Localized }[];
}

const weekdays = l('السبت – الخميس', 'Saturday – Thursday');
const friday = l('الجمعة', 'Friday');

export const branches: Branch[] = [
  {
    id: 'riyadh',
    name: l('فرع الرياض', 'Riyadh'),
    address: l('طريق الملك فهد، حي العليا، الرياض', 'King Fahd Road, Al Olaya, Riyadh'),
    phone: '+966110000000',
    location: { lat: 24.7136, lng: 46.6753 },
    hours: [{ days: weekdays, time: l('١٠ ص – ١١ م', '10 am – 11 pm') }, { days: friday, time: l('٤ م – ١١ م', '4 pm – 11 pm') }],
  },
  {
    id: 'jeddah',
    name: l('فرع جدة', 'Jeddah'),
    address: l('شارع التحلية، حي الأندلس، جدة', 'Tahlia Street, Al Andalus, Jeddah'),
    phone: '+966120000000',
    location: { lat: 21.5433, lng: 39.1728 },
    hours: [{ days: weekdays, time: l('١٠ ص – ١٢ م', '10 am – midnight') }, { days: friday, time: l('٥ م – ١٢ م', '5 pm – midnight') }],
  },
  {
    id: 'dammam',
    name: l('فرع الدمام', 'Dammam'),
    address: l('طريق الأمير محمد بن فهد، الدمام', 'Prince Mohammed bin Fahd Road, Dammam'),
    phone: '+966130000000',
    location: { lat: 26.4207, lng: 50.0888 },
    hours: [{ days: weekdays, time: l('١٠ ص – ١١ م', '10 am – 11 pm') }, { days: friday, time: l('٤ م – ١١ م', '4 pm – 11 pm') }],
  },
];

/* ---------- Reviews and FAQ ---------- */

export interface Review {
  id: string;
  author: Localized;
  /** Customer photo from their store account; reviews without one show an initial. */
  avatar?: string;
  rating: number;
  text: Localized;
  productId: string;
  verified: boolean;
  /** ISO date the review was posted. */
  date: string;
  /** Photos the customer attached to the review. */
  photos?: PhotoKey[];
  /** How many shoppers marked the review as helpful. */
  helpful: number;
}

const avatar = (name: string) => `/media/avatars/${name}.webp`;

/** Sample reviews for the demo store; the Salla theme shows the store's real ones. */
export const reviews: Review[] = [
  { id: 'r1', author: l('سارة م.', 'Sara M.'), avatar: avatar('f1'), rating: 5, productId: 'p1', verified: true, date: '2026-11-02', helpful: 24, photos: ['goldBottle', 'spraying'], text: l('ثباته ممتاز، بقي معي من الصباح حتى المساء. التغليف أنيق والعيّنة المرفقة لفتة جميلة.', 'Lasting power is excellent, it stayed with me from morning to evening. Lovely wrapping, and the sample was a nice touch.') },
  { id: 'r2', author: l('عبدالله ر.', 'Abdullah R.'), avatar: avatar('m1'), rating: 5, productId: 'p5', verified: true, date: '2026-10-28', helpful: 18, photos: ['oudOil'], text: l('دهن عود نظيف وواضح، والوصف مطابق تماماً لما وصلني.', 'A clean, clear oud oil, and it matched the description exactly.') },
  { id: 'r3', author: l('نورة ع.', 'Noura A.'), rating: 4, productId: 'p4', verified: true, date: '2026-10-21', helpful: 9, text: l('رائحة الورد طبيعية وليست حادة. تمنيت لو كان الحجم الكبير متوفراً.', 'The rose smells natural, not sharp. I only wish the large size were available.') },
  { id: 'r4', author: l('فهد س.', 'Fahad S.'), avatar: avatar('m2'), rating: 5, productId: 'p9', verified: true, date: '2026-10-17', helpful: 12, photos: ['burnerCarpet'], text: l('البخور يملأ المجلس برائحة هادئة، والتوصيل كان خلال يومين.', 'The bakhoor fills the majlis with a calm scent, and delivery took two days.') },
  { id: 'r5', author: l('ريم ك.', 'Reem K.'), avatar: avatar('f2'), rating: 5, productId: 'p3', verified: true, date: '2026-10-11', helpful: 31, photos: ['amberTrio'], text: l('عنبر الليل صار عطري اليومي. دافئ من غير ما يكون ثقيل، وكل من حولي يسأل عنه.', 'Night Amber became my daily scent. Warm without being heavy, and everyone asks about it.') },
  { id: 'r6', author: l('ماجد ح.', 'Majed H.'), rating: 4, productId: 'p1', verified: true, date: '2026-10-05', helpful: 6, text: l('عطر فخم ويناسب المناسبات. الفوحان قوي أول ساعة ثم يهدأ.', 'A rich scent that suits occasions. Projection is strong for the first hour, then it settles.') },
  { id: 'r7', author: l('خالد ب.', 'Khaled B.'), avatar: avatar('m3'), rating: 5, productId: 'p10', verified: true, date: '2026-09-29', helpful: 15, photos: ['bottlesRow'], text: l('اشتريت طقم الإرث هدية لوالدي، والعلبة وحدها تستحق. وصل مع بطاقة إهداء مكتوبة بخط جميل.', 'I bought the Heritage Set for my father, and the box alone is worth it. It came with a beautifully written card.') },
  { id: 'r8', author: l('لمى ف.', 'Lama F.'), rating: 5, productId: 'p4', verified: false, date: '2026-09-22', helpful: 4, text: l('ورد الطائف أنعم ورد جربته. طلبته مرتين.', 'Taif Rose is the softest rose I have tried. I have ordered it twice.') },
  { id: 'r9', author: l('تركي ن.', 'Turki N.'), rating: 3, productId: 'p3', verified: true, date: '2026-09-14', helpful: 2, text: l('الرائحة جميلة لكن الثبات على بشرتي متوسط. خدمة العملاء اقترحت عليّ تركيز البارفان.', 'A lovely scent, but lasting power on my skin is average. Support suggested the parfum concentration.') },
  { id: 'r10', author: l('هند ص.', 'Hind S.'), rating: 5, productId: 'p5', verified: true, date: '2026-09-03', helpful: 20, photos: ['rollOns'], text: l('ثالث مرة أطلب دهن العود الهندي. نفس الجودة في كل مرة، وهذا أهم شيء عندي.', 'My third order of the Indian oud oil. Same quality every time, which matters most to me.') },
];

export interface Faq {
  topic: 'orders' | 'products' | 'returns';
  question: Localized;
  answer: Localized;
  /** Optional button under the answer; the merchant sets its label and link. */
  action?: { label: Localized; to: string };
}

export const faqs: Faq[] = [
  { topic: 'products', question: l('هل العطور أصلية؟', 'Are the perfumes authentic?'), answer: l('نعم. نشتري من المصدر مباشرة، ومع كل طلب فاتورة ضريبية.', 'Yes. We buy directly from the source, and every order comes with a tax invoice.'), action: { label: l('تعرّف علينا', 'About us'), to: '/page/about' } },
  { topic: 'products', question: l('كيف أختار عطراً هدية؟', 'How do I choose a gift?'), answer: l('أطقم الهدايا تجمع عطوراً متنوعة، وطقم العيّنات خيار آمن إن لم تعرف الذوق.', 'Gift sets combine different scents, and the discovery set is a safe choice when you are unsure of their taste.'), action: { label: l('تصفّح أطقم الهدايا', 'Browse gift sets'), to: '/category/gifts' } },
  { topic: 'products', question: l('ما الفرق بين تراكيز العطر؟', 'What is the difference between concentrations?'), answer: l('كلما زاد التركيز زاد الثبات: أو دو بارفان ٦–٨ ساعات، بارفان ٨–١٠، إكستريه أكثر من ١٢ ساعة.', 'Higher concentration lasts longer: eau de parfum 6–8 hours, parfum 8–10, extrait more than 12.'), action: { label: l('اقرأ الدليل', 'Read the guide'), to: '/blog' } },
  { topic: 'orders', question: l('كم يستغرق التوصيل؟', 'How long does delivery take?'), answer: l('من يوم إلى ثلاثة أيام عمل داخل المملكة.', 'One to three working days within the Kingdom.'), action: { label: l('سياسة الشحن', 'Shipping policy'), to: '/page/shipping' } },
  { topic: 'orders', question: l('ما طرق الدفع المتاحة؟', 'Which payment methods do you accept?'), answer: l('مدى، فيزا وماستركارد، Apple Pay، STC Pay، والتقسيط عبر تابي وتمارا.', 'mada, Visa and Mastercard, Apple Pay, STC Pay, and instalments with Tabby and Tamara.') },
  { topic: 'orders', question: l('هل أستطيع الاستلام من الفرع؟', 'Can I collect from a branch?'), answer: l('نعم، اختر «الاستلام من الفرع» عند إتمام الطلب ويجهز طلبك خلال ساعتين.', 'Yes. Choose "collect from branch" at checkout and your order is ready within two hours.'), action: { label: l('مواقع الفروع', 'Find a branch'), to: '/branches' } },
  { topic: 'returns', question: l('هل يمكن استبدال العطر بعد فتحه؟', 'Can I exchange an opened perfume?'), answer: l('لا يُستبدل المنتج المفتوح، ولهذا نرسل عيّنة مع كل طلب لتجرّب قبل فتح الزجاجة.', 'Opened products cannot be exchanged, which is why every order includes a sample to try first.'), action: { label: l('سياسة الاستبدال', 'Returns policy'), to: '/page/returns' } },
  { topic: 'returns', question: l('وصلني المنتج تالفاً، ماذا أفعل؟', 'My order arrived damaged. What now?'), answer: l('راسلنا خلال ٤٨ ساعة مع صورة للمنتج، ونرسل بديلاً على حسابنا.', 'Message us within 48 hours with a photo and we send a replacement at our cost.') },
];

/* ---------- Announcement bar ---------- */

export interface Announcement {
  /** Icon name from the announcement icon set (see AnnouncementBar). */
  icon: 'truck' | 'gift' | 'sample' | 'tag' | 'star';
  text: Localized;
  /** A coupon to copy, or a link to follow, shown as a small button after the text. */
  action?: { kind: 'copy'; code: string } | { kind: 'link'; label: Localized; to: string };
}

export const announcements: Announcement[] = [
  { icon: 'truck', text: l('شحن مجاني على كل طلب يتجاوز ٣٠٠ ر.س', 'Free shipping on every order over SAR 300') },
  { icon: 'tag', text: l('خصم ١٠٪ على طلبك الأول', '10% off your first order'), action: { kind: 'copy', code: 'ABAQ10' } },
  { icon: 'sample', text: l('عيّنة هدية داخل كل شحنة', 'A free sample in every parcel') },
  { icon: 'gift', text: l('أطقم هدايا بتغليف فاخر وبطاقة باسمك', 'Gift sets, finely wrapped, with a card in your name'), action: { kind: 'link', label: l('اكتشف الأطقم', 'See the sets'), to: '/category/gifts' } },
];

/** Short prompts that pop up beside the WhatsApp button, one at a time. */
export const chatPrompts: Localized[] = [
  l('محتار بين عطرين؟ نساعدك تختار', 'Torn between two scents? We can help'),
  l('اسألنا عن أفضل عطر للهدية', 'Ask us for the best gift pick'),
  l('نرد خلال دقائق من ٩ ص إلى ١١ م', 'We reply within minutes, 9am to 11pm'),
];
