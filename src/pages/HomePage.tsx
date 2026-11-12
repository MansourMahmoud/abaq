import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LuPlus } from 'react-icons/lu';
import { Reels } from '../components/home/Reels';
import { VideoShowcase } from '../components/home/VideoShowcase';
import { ProductRail } from '../components/product/ProductRail';
import { Picture } from '../components/ui/Picture';
import { categories, products } from '../data/catalog';
import { useI18n } from '../i18n/I18nProvider';
import type { MessageKey } from '../i18n/messages';
import { useCart } from '../lib/cart';

const TABS: { key: MessageKey; pick: () => typeof products }[] = [
  { key: 'home.tab.bestsellers', pick: () => products.filter((product) => product.rating >= 4.7) },
  { key: 'home.tab.new', pick: () => [...products].reverse() },
  { key: 'home.tab.offers', pick: () => products.filter((product) => product.compareAt) },
];

export function HomePage() {
  const { t, pick, money, locale } = useI18n();
  const { add } = useCart();
  const [tab, setTab] = useState(0);
  const heroProduct = products[0];
  const [oud, bakhoor, gifts] = ['oud', 'bakhoor', 'gifts'].map((id) => categories.find((category) => category.id === id)!);

  return (
    <>
      <section className="hero">
        <Picture className="hero__image" photo="bottlesRow" alt="" sizes="100vw" priority />
        <div className="hero__content container">
          <div className="hero__copy">
            <p className="eyebrow">{locale === 'ar' ? 'مجموعة الشتاء · إصدار محدود' : 'Winter collection · limited edition'}</p>
            <h1 className="hero__title">
              {locale === 'ar' ? 'أثرٌ يبقى بعد أن تغادر' : 'A trace that stays after you leave'}
            </h1>
            <p className="hero__lead text-soft">
              {locale === 'ar'
                ? 'عطور ودهن عود وبخور مختارة، بنوتات واضحة تساعدك على الاختيار قبل أن تشمّ.'
                : 'Chosen perfumes, oud oils and bakhoor, with clear notes to help you choose before you smell.'}
            </p>
            <Link className="button" to="/category/men">
              {t('action.shopNow')}
            </Link>
          </div>

          <div className="hero__product">
            <Link className="hero__product-thumb" to={`/product/${heroProduct.slug}`}>
              <Picture photo={heroProduct.photos[1]} alt={pick(heroProduct.name)} sizes="84px" />
            </Link>
            <p className="hero__product-text">
              <span className="eyebrow">{t('home.heroProduct')}</span>
              <Link to={`/product/${heroProduct.slug}`}>{pick(heroProduct.name)}</Link>
              <span>{money(heroProduct.price)}</span>
            </p>
            <button className="icon-button" type="button" aria-label={`${t('action.addToCart')}: ${pick(heroProduct.name)}`} onClick={() => add(heroProduct.id)}>
              <LuPlus aria-hidden />
            </button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__head">
            <h2 className="section__title">{t('home.shopByCategory')}</h2>
          </div>
          <ul className="category-arches">
            {categories.map((category) => (
              <li key={category.id}>
                <Link className="category-arch" to={`/category/${category.slug}`}>
                  <span className="category-arch__frame media-zoom">
                    <Picture photo={category.photo} alt="" sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw" />
                  </span>
                  {pick(category.name)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--paper">
        <div className="container">
          <div className="section__head">
            <h2 className="section__title">{t('home.bestsellers')}</h2>
            <div className="tabs" role="tablist">
              {TABS.map((entry, index) => (
                <button key={entry.key} role="tab" type="button" aria-selected={index === tab} onClick={() => setTab(index)}>
                  {t(entry.key)}
                </button>
              ))}
            </div>
          </div>
          <ProductRail products={TABS[tab].pick()} layout="grid" limit={4} label={t(TABS[tab].key)} />
        </div>
      </section>

      <div className="home-gap" />
      <VideoShowcase />
      <Reels />

      <section className="section section--flush-top">
        <div className="container banner-trio">
          {[oud, bakhoor, gifts].map((category, index) => (
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
    </>
  );
}
