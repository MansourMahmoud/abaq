import type { Localized } from '../i18n/I18nProvider';
import type { PhotoKey } from '../lib/media';

/**
 * Demo catalogue. Shapes follow what the Salla storefront API returns closely
 * enough that swapping this module for real loaders is a data change, not a
 * component change.
 */

export interface Category {
  id: string;
  slug: string;
  name: Localized;
  /** Short line shown under the name on category cards. */
  tagline?: Localized;
  description?: Localized;
  photo: PhotoKey;
  /** Hero banner shown at the top of the category page and in the drawer. */
  banner?: { title: Localized; photo: PhotoKey };
  children?: Category[];
}

export interface Product {
  id: string;
  slug: string;
  name: Localized;
  family: Localized;
  notes: Localized;
  price: number;
  /** Price before discount, when the product is on sale. */
  compareAt?: number;
  rating: number;
  badge?: Localized;
  /** Id of an entry in `brands`. */
  brand: string;
  /** Set when the product cannot be ordered right now. */
  soldOut?: boolean;
  photos: PhotoKey[];
  /** Ids of every category (at any depth) the product belongs to. */
  categoryIds: string[];
}

const l = (ar: string, en: string): Localized => ({ ar, en });

export const categories: Category[] = [
  {
    id: 'men',
    slug: 'men',
    name: l('عطور رجالية', 'For him'),
    tagline: l('خشبي · شرقي · منعش', 'Woody · oriental · fresh'),
    description: l('عطور خشبية وشرقية ومنعشة للاستخدام اليومي والمناسبات.', 'Woody, oriental and fresh scents for every day and for occasions.'),
    photo: 'monoBottle',
    banner: { title: l('حضور يسبقك', 'Arrive before you do'), photo: 'bottlesRow' },
    children: [
      { id: 'men-woody', slug: 'men-woody', name: l('خشبي', 'Woody'), photo: 'goldBottle' },
      { id: 'men-oriental', slug: 'men-oriental', name: l('شرقي', 'Oriental'), photo: 'amberTrio' },
      { id: 'men-fresh', slug: 'men-fresh', name: l('منعش', 'Fresh'), photo: 'clearOnFur' },
    ],
  },
  {
    id: 'women',
    slug: 'women',
    name: l('عطور نسائية', 'For her'),
    tagline: l('زهري · عنبري', 'Floral · amber'),
    description: l('زهرية وعنبرية وفاكهية، من الخفيف إلى الفاخر.', 'Floral, amber and fruity, from light to opulent.'),
    photo: 'daisyShadows',
    banner: { title: l('أنوثة تبقى في الذاكرة', 'Femininity that lingers'), photo: 'pinkBottle' },
    children: [
      { id: 'women-floral', slug: 'women-floral', name: l('زهري', 'Floral'), photo: 'daisyShadows' },
      { id: 'women-amber', slug: 'women-amber', name: l('عنبري', 'Amber'), photo: 'amberTrio' },
    ],
  },
  {
    id: 'oud',
    slug: 'oud',
    name: l('دهن العود', 'Oud oil'),
    tagline: l('هندي · كمبودي · مخلطات', 'Indian · Cambodian · blends'),
    description: l('دهن عود طبيعي بدرجات تعتيق مختلفة، بالتولة ونصف التولة وربعها.', 'Natural oud oil in several ages, sold by the tola, half and quarter.'),
    photo: 'oudOil',
    banner: { title: l('وصل حديثاً من كمبوديا', 'Just in from Cambodia'), photo: 'handsHolding' },
    children: [
      {
        id: 'oud-indian',
        slug: 'oud-indian',
        name: l('عود هندي', 'Indian oud'),
        photo: 'oudOil',
        children: [
          { id: 'oud-indian-aged', slug: 'oud-indian-aged', name: l('معتّق', 'Aged'), photo: 'rollOns' },
          { id: 'oud-indian-young', slug: 'oud-indian-young', name: l('حديث', 'Young'), photo: 'oudOil' },
        ],
      },
      { id: 'oud-cambodian', slug: 'oud-cambodian', name: l('عود كمبودي', 'Cambodian oud'), photo: 'handsHolding' },
      { id: 'oud-blends', slug: 'oud-blends', name: l('مخلطات', 'Blends'), photo: 'rollOns' },
    ],
  },
  {
    id: 'bakhoor',
    slug: 'bakhoor',
    name: l('البخور', 'Bakhoor'),
    tagline: l('معمول ودقة ومباخر', 'Maamoul and burners'),
    description: l('معمول ودقة وعود مروكي، ومباخر للبيت والسفر.', 'Maamoul, dukhoon and incense burners for home and travel.'),
    photo: 'burnerCarpet',
    banner: { title: l('رائحة المجالس', 'The scent of the majlis'), photo: 'burnerMajlis' },
  },
  {
    id: 'gifts',
    slug: 'gifts',
    name: l('أطقم الهدايا', 'Gift sets'),
    tagline: l('جاهزة بالتغليف', 'Wrapped and ready'),
    description: l('أطقم جاهزة بتغليف وبطاقة إهداء.', 'Ready-made sets, wrapped with a gift card.'),
    photo: 'amberTrio',
    banner: { title: l('هدية جاهزة باسم من تحب', 'A gift, ready with their name on it'), photo: 'bottlesRow' },
  },
  {
    id: 'samples',
    slug: 'samples',
    name: l('العيّنات', 'Samples'),
    tagline: l('جرّب قبل الشراء', 'Try before you buy'),
    description: l('جرّب قبل أن تشتري الزجاجة الكاملة.', 'Try before you buy the full bottle.'),
    photo: 'rollOns',
  },
];

export interface Brand {
  id: string;
  name: Localized;
}

export const brands: Brand[] = [
  { id: 'abaq', name: l('عبق', 'Abaq') },
  { id: 'nafha', name: l('نفحة', 'Nafha') },
  { id: 'sidra', name: l('سدرة', 'Sidra') },
  { id: 'wateen', name: l('وتين', 'Wateen') },
];

/**
 * Pseudo-category behind the "all products" page. It is not part of the tree,
 * but it has the same shape, so the listing page treats it like any other.
 */
export const ALL_PRODUCTS: Category = {
  id: 'all',
  slug: 'all',
  name: l('كل المنتجات', 'All products'),
  description: l('كل ما في المتجر في صفحة واحدة. استخدم الفلاتر للوصول إلى ما تبحث عنه.', 'Everything in the store on one page. Use the filters to narrow it down.'),
  photo: 'souk',
  banner: { title: l('كل المنتجات', 'All products'), photo: 'souk' },
};

export const products: Product[] = [
  {
    id: 'p1', brand: 'abaq', slug: 'royal-oud', name: l('عود ملكي', 'Royal Oud'), family: l('شرقي خشبي', 'Woody oriental'),
    notes: l('عود · زعفران · ورد طائفي', 'Oud · saffron · Taif rose'), price: 420, rating: 4.8,
    badge: l('الأكثر مبيعاً', 'Bestseller'), photos: ['goldBottle', 'spraying', 'handsHolding'], categoryIds: ['men', 'men-oriental'],
  },
  {
    id: 'p2', brand: 'nafha', slug: 'morning-musk', name: l('مسك الصباح', 'Morning Musk'), family: l('منعش', 'Fresh'),
    notes: l('برغموت · مسك أبيض', 'Bergamot · white musk'), price: 285, compareAt: 335, rating: 4.6,
    photos: ['clearOnFur', 'monoBottle'], categoryIds: ['men', 'men-fresh'],
  },
  {
    id: 'p3', brand: 'abaq', slug: 'night-amber', name: l('عنبر الليل', 'Night Amber'), family: l('عنبري', 'Amber'),
    notes: l('عنبر · فانيلا · باتشولي', 'Amber · vanilla · patchouli'), price: 306, compareAt: 360, rating: 4.7,
    badge: l('خصم ١٥٪', '15% off'), photos: ['amberTrio', 'goldBottle'], categoryIds: ['women', 'women-amber', 'men', 'men-oriental'],
  },
  {
    id: 'p4', brand: 'sidra', slug: 'taif-rose', name: l('ورد الطائف', 'Taif Rose'), family: l('زهري', 'Floral'),
    notes: l('ورد طائفي · صندل', 'Taif rose · sandalwood'), price: 340, rating: 4.9,
    badge: l('جديد', 'New'), photos: ['daisyShadows', 'pinkBottle'], categoryIds: ['women', 'women-floral'],
  },
  {
    id: 'p5', brand: 'wateen', slug: 'indian-oud-oil', name: l('دهن عود هندي', 'Indian Oud Oil'), family: l('تعتيق ٥ سنوات', 'Aged 5 years'),
    notes: l('ربع تولة · نصف تولة · تولة', 'Quarter · half · full tola'), price: 850, rating: 4.9,
    badge: l('الأكثر مبيعاً', 'Bestseller'), photos: ['oudOil', 'rollOns'], categoryIds: ['oud', 'oud-indian', 'oud-indian-aged'],
  },
  {
    id: 'p6', brand: 'wateen', slug: 'cambodian-oud', name: l('عود كمبودي', 'Cambodian Oud'), family: l('تعتيق ٣ سنوات', 'Aged 3 years'),
    notes: l('ربع تولة · نصف تولة', 'Quarter · half tola'), price: 580, rating: 4.7,
    photos: ['handsHolding', 'oudOil'], categoryIds: ['oud', 'oud-cambodian'],
  },
  {
    id: 'p7', brand: 'wateen', slug: 'young-indian-oud', name: l('عود هندي حديث', 'Young Indian Oud'), family: l('تعتيق سنة', 'Aged 1 year'),
    notes: l('ربع تولة · نصف تولة', 'Quarter · half tola'), price: 390, rating: 4.5,
    photos: ['rollOns', 'oudOil'], categoryIds: ['oud', 'oud-indian', 'oud-indian-young'],
  },
  {
    id: 'p8', brand: 'abaq', slug: 'royal-blend', name: l('مخلط ملكي', 'Royal Blend'), family: l('عود · ورد · مسك', 'Oud · rose · musk'),
    notes: l('نصف تولة · تولة', 'Half · full tola'), price: 440, rating: 4.6,
    photos: ['blueBottle', 'amberTrio'], categoryIds: ['oud', 'oud-blends'],
  },
  {
    id: 'p9', brand: 'sidra', slug: 'royal-maamoul', name: l('معمول ملكي', 'Royal Maamoul'), family: l('بخور', 'Bakhoor'),
    notes: l('عود · مسك · عنبر', 'Oud · musk · amber'), price: 180, rating: 4.5,
    photos: ['burnerCarpet', 'burnerMajlis'], categoryIds: ['bakhoor'],
  },
  {
    id: 'p10', brand: 'abaq', slug: 'heritage-set', name: l('طقم الإرث', 'Heritage Set'), family: l('هدية', 'Gift'),
    notes: l('ثلاثة عطور ٣٠ مل', 'Three 30 ml perfumes'), price: 690, compareAt: 790, rating: 4.8,
    badge: l('هدية', 'Gift'), photos: ['bottlesRow', 'amberTrio'], categoryIds: ['gifts'],
  },
  {
    id: 'p11', brand: 'abaq', slug: 'discovery-set', name: l('طقم العيّنات', 'Discovery Set'), family: l('خمس عيّنات', 'Five samples'),
    notes: l('٥ × ٢ مل', '5 × 2 ml'), price: 75, rating: 4.7,
    photos: ['rollOns', 'bottlesRow'], categoryIds: ['samples', 'gifts'],
  },
  {
    id: 'p12', brand: 'nafha', slug: 'cedar-leather', name: l('أرز وجلد', 'Cedar & Leather'), family: l('خشبي', 'Woody'),
    notes: l('أرز · جلد · فلفل أسود', 'Cedar · leather · black pepper'), price: 365, rating: 4.6,
    photos: ['monoBottle', 'goldBottle'], categoryIds: ['men', 'men-woody'],
  },
  {
    id: 'p13', brand: 'nafha', slug: 'sea-breeze', name: l('نسيم البحر', 'Sea Breeze'), family: l('منعش', 'Fresh'),
    notes: l('ليمون · نعناع · ملح البحر', 'Lemon · mint · sea salt'), price: 240, compareAt: 300, rating: 4.4,
    photos: ['blueBottle', 'clearOnFur'], categoryIds: ['men', 'men-fresh'],
  },
  {
    id: 'p14', brand: 'abaq', slug: 'black-saffron', name: l('زعفران أسود', 'Black Saffron'), family: l('شرقي', 'Oriental'),
    notes: l('زعفران · عود · عنبر', 'Saffron · oud · amber'), price: 510, rating: 4.9,
    badge: l('جديد', 'New'), photos: ['spraying', 'goldBottle'], categoryIds: ['men', 'men-oriental'],
  },
  {
    id: 'p15', brand: 'sidra', slug: 'smoked-vetiver', name: l('فيتيفر مدخّن', 'Smoked Vetiver'), family: l('خشبي', 'Woody'),
    notes: l('فيتيفر · دخان · صندل', 'Vetiver · smoke · sandalwood'), price: 330, rating: 4.3, soldOut: true,
    photos: ['goldBottle', 'monoBottle'], categoryIds: ['men', 'men-woody'],
  },
  {
    id: 'p16', brand: 'sidra', slug: 'white-jasmine', name: l('ياسمين أبيض', 'White Jasmine'), family: l('زهري', 'Floral'),
    notes: l('ياسمين · زهر البرتقال', 'Jasmine · orange blossom'), price: 295, rating: 4.7,
    photos: ['clearOnFur', 'daisyShadows'], categoryIds: ['women', 'women-floral'],
  },
  {
    id: 'p17', brand: 'abaq', slug: 'vanilla-silk', name: l('حرير الفانيلا', 'Vanilla Silk'), family: l('عنبري', 'Amber'),
    notes: l('فانيلا · تونكا · مسك', 'Vanilla · tonka · musk'), price: 320, compareAt: 400, rating: 4.8,
    photos: ['pinkBottle', 'amberTrio'], categoryIds: ['women', 'women-amber'],
  },
  {
    id: 'p18', brand: 'nafha', slug: 'peony-dew', name: l('ندى الفاوانيا', 'Peony Dew'), family: l('زهري', 'Floral'),
    notes: l('فاوانيا · كمثرى · مسك', 'Peony · pear · musk'), price: 275, rating: 4.5,
    photos: ['pinkBottle', 'daisyShadows'], categoryIds: ['women', 'women-floral'],
  },
  {
    id: 'p19', brand: 'wateen', slug: 'maroki-oud', name: l('عود مروكي', 'Maroki Oud'), family: l('تعتيق ٤ سنوات', 'Aged 4 years'),
    notes: l('ربع تولة · نصف تولة · تولة', 'Quarter · half · full tola'), price: 720, rating: 4.8,
    photos: ['oudOil', 'handsHolding'], categoryIds: ['oud', 'oud-cambodian'],
  },
  {
    id: 'p20', brand: 'wateen', slug: 'sandal-attar', name: l('عطر الصندل', 'Sandal Attar'), family: l('صندل · ورد', 'Sandalwood · rose'),
    notes: l('ربع تولة · نصف تولة', 'Quarter · half tola'), price: 260, compareAt: 310, rating: 4.4,
    photos: ['rollOns', 'blueBottle'], categoryIds: ['oud', 'oud-blends'],
  },
  {
    id: 'p21', brand: 'wateen', slug: 'oud-chips', name: l('كسر عود طبيعي', 'Natural Oud Chips'), family: l('بخور', 'Bakhoor'),
    notes: l('٢٥ غ · ٥٠ غ', '25 g · 50 g'), price: 450, rating: 4.9,
    badge: l('الأكثر مبيعاً', 'Bestseller'), photos: ['burnerMajlis', 'burnerCarpet'], categoryIds: ['bakhoor'],
  },
  {
    id: 'p22', brand: 'sidra', slug: 'majlis-bakhoor', name: l('بخور المجالس', 'Majlis Bakhoor'), family: l('بخور', 'Bakhoor'),
    notes: l('عود · ورد · صندل', 'Oud · rose · sandalwood'), price: 120, rating: 4.6,
    photos: ['burnerCarpet', 'souk'], categoryIds: ['bakhoor'],
  },
  {
    id: 'p23', brand: 'abaq', slug: 'amber-maamoul', name: l('معمول العنبر', 'Amber Maamoul'), family: l('بخور', 'Bakhoor'),
    notes: l('عنبر · مسك · زعفران', 'Amber · musk · saffron'), price: 140, compareAt: 175, rating: 4.5,
    photos: ['burnerMajlis', 'amberTrio'], categoryIds: ['bakhoor'],
  },
  {
    id: 'p24', brand: 'abaq', slug: 'duo-set', name: l('طقم الثنائي', 'The Duo Set'), family: l('هدية', 'Gift'),
    notes: l('عطران ٥٠ مل', 'Two 50 ml perfumes'), price: 520, compareAt: 600, rating: 4.7,
    photos: ['amberTrio', 'bottlesRow'], categoryIds: ['gifts'],
  },
];

export interface ProductDetails {
  description: Localized;
  /** Fragrance pyramid; only perfumes have one. */
  pyramid?: { top: Localized; heart: Localized; base: Localized };
  /** 1–5 scale. */
  longevity?: number;
  sillage?: number;
  stock: number;
}

const DEFAULT_DETAILS: ProductDetails = {
  description: l('منتج مختار بعناية من مجموعة عبق، يصلك بتغليف يحفظه ومعه عيّنة مجانية.', 'A carefully chosen piece from the Abaq collection, packed safely and shipped with a free sample.'),
  stock: 12,
};

const DETAILS: Record<string, ProductDetails> = {
  p1: {
    description: l('افتتاحية زعفران مشرقة تهدأ على قلب من الورد الطائفي، وتستقر على قاعدة عود كمبودي دافئة تبقى معك حتى المساء.', 'A bright saffron opening settles into a heart of Taif rose and rests on a warm Cambodian oud base that stays until evening.'),
    pyramid: { top: l('زعفران · برغموت', 'Saffron · bergamot'), heart: l('ورد طائفي · ياسمين', 'Taif rose · jasmine'), base: l('عود كمبودي · عنبر · صندل', 'Cambodian oud · amber · sandalwood') },
    longevity: 4, sillage: 4, stock: 6,
  },
  p2: {
    description: l('عطر نهاري نظيف: برغموت منعش فوق مسك أبيض ناعم، يناسب الدوام والأيام الحارة.', 'A clean daytime scent: fresh bergamot over soft white musk, made for work and warm days.'),
    pyramid: { top: l('برغموت · ليمون', 'Bergamot · lemon'), heart: l('زهر البرتقال', 'Orange blossom'), base: l('مسك أبيض · أرز', 'White musk · cedar') },
    longevity: 3, sillage: 2, stock: 18,
  },
  p3: {
    description: l('عنبر دافئ مع فانيلا وباتشولي، عطر مسائي عميق يناسب الشتاء والمناسبات.', 'Warm amber with vanilla and patchouli: a deep evening scent for winter and occasions.'),
    pyramid: { top: l('هيل · فلفل وردي', 'Cardamom · pink pepper'), heart: l('عنبر · لبان', 'Amber · frankincense'), base: l('فانيلا · باتشولي', 'Vanilla · patchouli') },
    longevity: 5, sillage: 4, stock: 9,
  },
  p4: {
    description: l('ورد طائفي في ذروة موسمه، مع لمسة فلفل وردي وقاعدة صندل كريمية.', 'Taif rose at the peak of its season, with a touch of pink pepper and a creamy sandalwood base.'),
    pyramid: { top: l('فلفل وردي · ليتشي', 'Pink pepper · lychee'), heart: l('ورد طائفي · فاوانيا', 'Taif rose · peony'), base: l('صندل · مسك', 'Sandalwood · musk') },
    longevity: 4, sillage: 3, stock: 14,
  },
};

export function productDetails(productId: string): ProductDetails {
  return DETAILS[productId] ?? DEFAULT_DETAILS;
}

/** Perfumes are sold in several concentrations and sizes; oils, bakhoor and sets are not. */
export function hasVariants(product: Product): boolean {
  return Boolean(DETAILS[product.id]?.pyramid);
}

export function findProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

/** Other products sharing a category with `product`, most shared first. */
export function relatedProducts(product: Product, limit = 8): Product[] {
  const shared = (other: Product) => other.categoryIds.filter((id) => product.categoryIds.includes(id)).length;
  return products
    .filter((other) => other.id !== product.id)
    .sort((a, b) => shared(b) - shared(a))
    .slice(0, limit);
}

/** Depth-first search for a category by slug, returning it with its ancestors. */
export function findCategoryPath(slug: string, tree: Category[] = categories, trail: Category[] = []): Category[] | null {
  for (const category of tree) {
    const path = [...trail, category];
    if (category.slug === slug) return path;
    const nested = category.children && findCategoryPath(slug, category.children, path);
    if (nested) return nested;
  }
  return null;
}

/** Discount on a product, or null when it sells at full price. */
export function discountOf(product: Product): { percent: number; saved: number } | null {
  if (!product.compareAt || product.compareAt <= product.price) return null;
  const saved = product.compareAt - product.price;
  return { percent: Math.round((saved / product.compareAt) * 100), saved };
}

export function productsInCategory(categoryId: string): Product[] {
  if (categoryId === ALL_PRODUCTS.id) return products;
  return products.filter((product) => product.categoryIds.includes(categoryId));
}
