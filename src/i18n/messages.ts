/**
 * UI strings. Arabic is the source language; English mirrors its keys, and
 * the `Messages` type makes a missing translation a compile error.
 */
export const ar = {
  'nav.home': 'الرئيسية',
  'nav.categories': 'الأقسام',
  'nav.blog': 'المدونة',
  'nav.branches': 'فروعنا',
  'nav.offers': 'العروض',
  'nav.main': 'القائمة الرئيسية',
  'nav.open': 'فتح قائمة الأقسام',
  'nav.close': 'إغلاق القائمة',
  'nav.back': 'رجوع',
  'nav.viewAll': 'عرض الكل',

  'action.search': 'بحث',
  'action.account': 'حسابي',
  'action.wishlist': 'المفضلة',
  'action.cart': 'السلة',
  'action.addToCart': 'أضف للسلة',
  'action.added': 'أُضيف للسلة',
  'action.shopNow': 'تسوّق الآن',
  'action.close': 'إغلاق',
  'action.previous': 'السابق',
  'action.next': 'التالي',
  'action.addToWishlist': 'أضف إلى المفضلة',

  'search.placeholder': 'ابحث عن عطر، نوتة، أو ماركة',
  'header.track': 'تتبّع طلبك',
  'header.language': 'English',

  'currency.sar': 'ر.س',
  'product.rating': 'التقييم',
  'product.featured': 'مختار القسم',

  'home.shopByCategory': 'تسوّق حسب القسم',
  'home.bestsellers': 'عطور يعود إليها عملاؤنا',
  'home.tab.bestsellers': 'الأكثر مبيعاً',
  'home.tab.new': 'وصل حديثاً',
  'home.tab.offers': 'عروض',
  'home.heroProduct': 'المنتج في هذا البنر',

  'video.play': 'تشغيل الفيديو',
  'video.eyebrow': 'شاهد ثم تسوّق',
  'video.title': 'العطر كما يبدو في يدك',
  'video.lead': 'كل فيديو مرتبط بمنتجه، ويُضاف للسلة دون مغادرة الصفحة.',
  'reels.eyebrow': 'ريلز عبق',
  'reels.title': 'لحظات قصيرة مع عطورنا',

  'category.count': '{count} منتجاً',
  'category.all': 'الكل',
  'category.empty': 'لا توجد منتجات في هذا القسم حالياً.',
  'category.notFound': 'القسم غير موجود',

  'footer.shop': 'تسوّق',
  'footer.links': 'روابط مهمة',
  'footer.contact': 'تواصل معنا',
  'footer.whatsapp': 'واتساب',
  'footer.rights': 'جميع الحقوق محفوظة',
  'footer.businessCenter': 'موثّق في منصة الأعمال',
  'footer.commercialRecord': 'السجل التجاري',
  'footer.taxNumber': 'الرقم الضريبي',
  'footer.freelance': 'وثيقة العمل الحر',
  'footer.payments': 'وسائل الدفع',

  'notFound.title': 'الصفحة غير موجودة',
  'notFound.body': 'ربما تغيّر الرابط أو حُذفت الصفحة.',
  'notFound.cta': 'العودة للرئيسية',
} as const;

export type MessageKey = keyof typeof ar;
export type Messages = Record<MessageKey, string>;

export const en: Messages = {
  'nav.home': 'Home',
  'nav.categories': 'Categories',
  'nav.blog': 'Journal',
  'nav.branches': 'Stores',
  'nav.offers': 'Offers',
  'nav.main': 'Main menu',
  'nav.open': 'Open categories menu',
  'nav.close': 'Close menu',
  'nav.back': 'Back',
  'nav.viewAll': 'View all',

  'action.search': 'Search',
  'action.account': 'Account',
  'action.wishlist': 'Wishlist',
  'action.cart': 'Cart',
  'action.addToCart': 'Add to cart',
  'action.added': 'Added to cart',
  'action.shopNow': 'Shop now',
  'action.close': 'Close',
  'action.previous': 'Previous',
  'action.next': 'Next',
  'action.addToWishlist': 'Add to wishlist',

  'search.placeholder': 'Search a perfume, note or brand',
  'header.track': 'Track your order',
  'header.language': 'العربية',

  'currency.sar': 'SAR',
  'product.rating': 'Rating',
  'product.featured': 'Category pick',

  'home.shopByCategory': 'Shop by category',
  'home.bestsellers': 'The ones our customers return to',
  'home.tab.bestsellers': 'Bestsellers',
  'home.tab.new': 'New in',
  'home.tab.offers': 'Offers',
  'home.heroProduct': 'Featured in this banner',

  'video.play': 'Play video',
  'video.eyebrow': 'Watch, then shop',
  'video.title': 'The perfume as it looks in your hand',
  'video.lead': 'Each video is linked to its product, which you can add to the cart without leaving the page.',
  'reels.eyebrow': 'Abaq reels',
  'reels.title': 'Short moments with our perfumes',

  'category.count': '{count} products',
  'category.all': 'All',
  'category.empty': 'No products in this category yet.',
  'category.notFound': 'Category not found',

  'footer.shop': 'Shop',
  'footer.links': 'Useful links',
  'footer.contact': 'Contact us',
  'footer.whatsapp': 'WhatsApp',
  'footer.rights': 'All rights reserved',
  'footer.businessCenter': 'Verified by Saudi Business Center',
  'footer.commercialRecord': 'Commercial registration',
  'footer.taxNumber': 'VAT number',
  'footer.freelance': 'Freelance licence',
  'footer.payments': 'Payment methods',

  'notFound.title': 'Page not found',
  'notFound.body': 'The link may have changed or the page was removed.',
  'notFound.cta': 'Back to home',
};
