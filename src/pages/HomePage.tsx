import { Link } from 'react-router-dom';
import { PostCard } from '../components/blog/PostCard';
import { Bestsellers } from '../components/home/Bestsellers';
import { CategoryShowcase } from '../components/home/CategoryShowcase';
import { FaqHelp } from '../components/home/FaqHelp';
import { HeroSlider } from '../components/home/HeroSlider';
import { OfferCountdown } from '../components/home/OfferCountdown';
import { Reels } from '../components/home/Reels';
import { Testimonials } from '../components/home/Testimonials';
import { VideoShowcase } from '../components/home/VideoShowcase';
import { Picture } from '../components/ui/Picture';
import { categories } from '../data/catalog';
import { posts } from '../data/content';
import { useI18n } from '../i18n/I18nProvider';

const BANNER_CATEGORIES = ['oud', 'bakhoor', 'gifts'].map((id) => categories.find((category) => category.id === id)!);

/** Home page: an ordered stack of sections, each a self-contained component. */
export function HomePage() {
  const { t, pick } = useI18n();

  return (
    <>
      <HeroSlider />
      <CategoryShowcase />
      <Bestsellers />
      <div className="home-gap" />
      <VideoShowcase />
      <OfferCountdown />
      <div className="home-gap" />
      <Reels />

      <section className="section section--flush-top">
        <div className="container banner-trio">
          {BANNER_CATEGORIES.map((category, index) => (
            <Link key={category.id} className="banner media-zoom" data-size={index === 0 ? 'tall' : undefined} to={`/category/${category.slug}`}>
              <Picture photo={category.banner?.photo ?? category.photo} alt="" sizes="(min-width: 900px) 50vw, 100vw" />
              <span className="banner__text">
                <span className="eyebrow">{pick(category.name)}</span>
                <span className="banner__title">{pick(category.banner?.title ?? category.name)}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <Testimonials />
      <FaqHelp />

      <section className="section section--flush-top">
        <div className="container">
          <div className="section__head">
            <h2 className="section__title">{t('blog.home')}</h2>
            <Link className="link" to="/blog">{t('nav.viewAll')}</Link>
          </div>
          <div className="post-grid">
            {posts.slice(0, 3).map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
