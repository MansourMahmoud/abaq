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
    description: l('معمول ودقة وعود مروكي، ومباخر للبيت والسفر.', 'Maamoul, dukhoon and incense burners for home and travel.'),
    photo: 'burnerCarpet',
    banner: { title: l('رائحة المجالس', 'The scent of the majlis'), photo: 'burnerMajlis' },
  },
  {
    id: 'gifts',
    slug: 'gifts',
    name: l('أطقم الهدايا', 'Gift sets'),
    description: l('أطقم جاهزة بتغليف وبطاقة إهداء.', 'Ready-made sets, wrapped with a gift card.'),
    photo: 'amberTrio',
    banner: { title: l('هدية جاهزة باسم من تحب', 'A gift, ready with their name on it'), photo: 'bottlesRow' },
  },
  {
    id: 'samples',
    slug: 'samples',
    name: l('العيّنات', 'Samples'),
    description: l('جرّب قبل أن تشتري الزجاجة الكاملة.', 'Try before you buy the full bottle.'),
    photo: 'rollOns',
  },
];

export const products: Product[] = [
  {
    id: 'p1', slug: 'royal-oud', name: l('عود ملكي', 'Royal Oud'), family: l('شرقي خشبي', 'Woody oriental'),
    notes: l('عود · زعفران · ورد طائفي', 'Oud · saffron · Taif rose'), price: 420, rating: 4.8,
    badge: l('الأكثر مبيعاً', 'Bestseller'), photos: ['goldBottle', 'spraying', 'handsHolding'], categoryIds: ['men', 'men-oriental'],
  },
  {
    id: 'p2', slug: 'morning-musk', name: l('مسك الصباح', 'Morning Musk'), family: l('منعش', 'Fresh'),
    notes: l('برغموت · مسك أبيض', 'Bergamot · white musk'), price: 285, rating: 4.6,
    photos: ['clearOnFur', 'monoBottle'], categoryIds: ['men', 'men-fresh'],
  },
  {
    id: 'p3', slug: 'night-amber', name: l('عنبر الليل', 'Night Amber'), family: l('عنبري', 'Amber'),
    notes: l('عنبر · فانيلا · باتشولي', 'Amber · vanilla · patchouli'), price: 306, compareAt: 360, rating: 4.7,
    badge: l('خصم ١٥٪', '15% off'), photos: ['amberTrio', 'goldBottle'], categoryIds: ['women', 'women-amber', 'men', 'men-oriental'],
  },
  {
    id: 'p4', slug: 'taif-rose', name: l('ورد الطائف', 'Taif Rose'), family: l('زهري', 'Floral'),
    notes: l('ورد طائفي · صندل', 'Taif rose · sandalwood'), price: 340, rating: 4.9,
    badge: l('جديد', 'New'), photos: ['daisyShadows', 'pinkBottle'], categoryIds: ['women', 'women-floral'],
  },
  {
    id: 'p5', slug: 'indian-oud-oil', name: l('دهن عود هندي', 'Indian Oud Oil'), family: l('تعتيق ٥ سنوات', 'Aged 5 years'),
    notes: l('ربع تولة · نصف تولة · تولة', 'Quarter · half · full tola'), price: 850, rating: 4.9,
    badge: l('الأكثر مبيعاً', 'Bestseller'), photos: ['oudOil', 'rollOns'], categoryIds: ['oud', 'oud-indian', 'oud-indian-aged'],
  },
  {
    id: 'p6', slug: 'cambodian-oud', name: l('عود كمبودي', 'Cambodian Oud'), family: l('تعتيق ٣ سنوات', 'Aged 3 years'),
    notes: l('ربع تولة · نصف تولة', 'Quarter · half tola'), price: 580, rating: 4.7,
    photos: ['handsHolding', 'oudOil'], categoryIds: ['oud', 'oud-cambodian'],
  },
  {
    id: 'p7', slug: 'young-indian-oud', name: l('عود هندي حديث', 'Young Indian Oud'), family: l('تعتيق سنة', 'Aged 1 year'),
    notes: l('ربع تولة · نصف تولة', 'Quarter · half tola'), price: 390, rating: 4.5,
    photos: ['rollOns', 'oudOil'], categoryIds: ['oud', 'oud-indian', 'oud-indian-young'],
  },
  {
    id: 'p8', slug: 'royal-blend', name: l('مخلط ملكي', 'Royal Blend'), family: l('عود · ورد · مسك', 'Oud · rose · musk'),
    notes: l('نصف تولة · تولة', 'Half · full tola'), price: 440, rating: 4.6,
    photos: ['blueBottle', 'amberTrio'], categoryIds: ['oud', 'oud-blends'],
  },
  {
    id: 'p9', slug: 'royal-maamoul', name: l('معمول ملكي', 'Royal Maamoul'), family: l('بخور', 'Bakhoor'),
    notes: l('عود · مسك · عنبر', 'Oud · musk · amber'), price: 180, rating: 4.5,
    photos: ['burnerCarpet', 'burnerMajlis'], categoryIds: ['bakhoor'],
  },
  {
    id: 'p10', slug: 'heritage-set', name: l('طقم الإرث', 'Heritage Set'), family: l('هدية', 'Gift'),
    notes: l('ثلاثة عطور ٣٠ مل', 'Three 30 ml perfumes'), price: 690, rating: 4.8,
    badge: l('هدية', 'Gift'), photos: ['bottlesRow', 'amberTrio'], categoryIds: ['gifts'],
  },
  {
    id: 'p11', slug: 'discovery-set', name: l('طقم العيّنات', 'Discovery Set'), family: l('خمس عيّنات', 'Five samples'),
    notes: l('٥ × ٢ مل', '5 × 2 ml'), price: 75, rating: 4.7,
    photos: ['rollOns', 'bottlesRow'], categoryIds: ['samples', 'gifts'],
  },
];

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

export function productsInCategory(categoryId: string): Product[] {
  return products.filter((product) => product.categoryIds.includes(categoryId));
}
