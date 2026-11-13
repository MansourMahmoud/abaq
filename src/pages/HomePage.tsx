import { Link } from 'react-router-dom';
import { PostCard } from '../components/blog/PostCard';
import { Bestsellers } from '../components/home/Bestsellers';
import { BrandStrip } from '../components/home/BrandStrip';
import { BudgetPicker } from '../components/home/BudgetPicker';
import { CategoryShowcase } from '../components/home/CategoryShowcase';
import { CollectionBanners } from '../components/home/CollectionBanners';
import { FaqHelp } from '../components/home/FaqHelp';
import { GiftCardBand } from '../components/home/GiftCardBand';
import { InstagramFeed } from '../components/home/InstagramFeed';
import { HeroSlider } from '../components/home/HeroSlider';
import { LayeringSet } from '../components/home/LayeringSet';
import { LoyaltyBand } from '../components/home/LoyaltyBand';
import { MomentPicker } from '../components/home/MomentPicker';
import { Occasions } from '../components/home/Occasions';
import { OfferCountdown } from '../components/home/OfferCountdown';
import { PerksStrip } from '../components/home/PerksStrip';
import { ProductShowcase } from '../components/home/ProductShowcase';
import { RecentlyViewed } from '../components/home/RecentlyViewed';
import { Reels } from '../components/home/Reels';
import { PerfumeGuide } from '../components/home/PerfumeGuide';
import { ScentFinder } from '../components/home/ScentFinder';
import { ScentQuiz } from '../components/home/ScentQuiz';
import { SignatureProduct } from '../components/home/SignatureProduct';
import { Story } from '../components/home/Story';
import { Testimonials } from '../components/home/Testimonials';
import { TikTokFeed } from '../components/home/TikTokFeed';
import { VideoShowcase } from '../components/home/VideoShowcase';
import { Reveal } from '../components/ui/Reveal';
import { findCategory, products, productsInCategory } from '../data/catalog';
import { posts } from '../data/content';
import { useI18n } from '../i18n/I18nProvider';
import { useThemeSettings } from '../settings/ThemeSettings';

/** Newest products first; the catalogue lists them in the order they were added. */
const NEW_ARRIVALS = [...products].reverse().filter((product) => !product.soldOut).slice(0, 8);

/** Home page: an ordered stack of sections, each a self-contained component. */
export function HomePage() {
  const { t, pick } = useI18n();
  const { home } = useThemeSettings().settings;
  // The category is looked up at any depth, so a sub-category can feed the row too.
  const railCategory = findCategory(home.categoryRail.categoryId);

  return (
    <>
      <HeroSlider />
      <PerksStrip />
      <CategoryShowcase />
      <BrandStrip />
      <Bestsellers />
      <SignatureProduct />
      <LayeringSet />
      <ScentFinder />
      <ScentQuiz />
      <VideoShowcase />
      <OfferCountdown />
      <div className="home-gap" />
      <ProductShowcase
        eyebrow={t('arrivals.eyebrow')}
        title={t('arrivals.title')}
        lead={t('arrivals.lead')}
        products={NEW_ARRIVALS}
        layout="grid"
        link={{ label: t('nav.viewAll'), to: '/category/all' }}
      />
      {railCategory && (
        <ProductShowcase
          eyebrow={t('rail.eyebrow')}
          title={pick(railCategory.name)}
          lead={railCategory.description && pick(railCategory.description)}
          products={productsInCategory(railCategory.id).slice(0, home.categoryRail.count)}
          layout="carousel"
          link={{ label: t('nav.viewAll'), to: `/category/${railCategory.slug}` }}
        />
      )}
      <BudgetPicker />
      <Occasions />
      <Reels />

      <CollectionBanners />
      <MomentPicker />

      <PerfumeGuide />
      <Story />
      <Testimonials />
      <InstagramFeed />
      <TikTokFeed />
      <RecentlyViewed />
      <GiftCardBand />
      <LoyaltyBand />
      <FaqHelp />

      <section className="section section--flush-top">
        <Reveal className="container">
          <div className="section__head">
            <h2 className="section__title">{t('blog.home')}</h2>
            <Link className="link" to="/blog">{t('nav.viewAll')}</Link>
          </div>
          <div className="post-grid">
            {posts.slice(0, 3).map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </Reveal>
      </section>
    </>
  );
}
