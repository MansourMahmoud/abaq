import { Suspense, lazy, useEffect, useState, type ReactNode } from 'react';
import { LazyMotion, MotionConfig, domAnimation } from 'motion/react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { CouponTab } from './components/layout/CouponTab';
import { FloatingActions } from './components/layout/FloatingActions';
import { Footer } from './components/layout/Footer';
import { FooterPromo } from './components/layout/FooterPromo';
import { Header } from './components/layout/Header';
import { TopBar } from './components/layout/TopBar';
import { WelcomePopup } from './components/layout/WelcomePopup';
import { QuickAddProvider } from './components/product/QuickAdd';
import { ErrorState } from './components/ui/ErrorState';
import { LocaleDialog } from './components/ui/LocaleDialog';
import { PageSkeleton } from './components/ui/PageSkeleton';
import { Preloader } from './components/ui/Preloader';
import { I18nProvider } from './i18n/I18nProvider';
import { CartProvider, useCart } from './lib/cart';
import { HomePage } from './pages/HomePage';
import { ThemeSettingsProvider } from './settings/ThemeSettings';

/*
 * The home page ships in the main bundle because it is the usual entry point.
 * Every other page is fetched the first time it is visited.
 */
const ArticlePage = lazy(() => import('./pages/ArticlePage').then((module) => ({ default: module.ArticlePage })));
const BlogPage = lazy(() => import('./pages/BlogPage').then((module) => ({ default: module.BlogPage })));
const BranchesPage = lazy(() => import('./pages/BranchesPage').then((module) => ({ default: module.BranchesPage })));
const CartPage = lazy(() => import('./pages/CartPage').then((module) => ({ default: module.CartPage })));
const CategoryPage = lazy(() => import('./pages/CategoryPage').then((module) => ({ default: module.CategoryPage })));
const LoyaltyPage = lazy(() => import('./pages/LoyaltyPage').then((module) => ({ default: module.LoyaltyPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((module) => ({ default: module.NotFoundPage })));
const ProductPage = lazy(() => import('./pages/ProductPage').then((module) => ({ default: module.ProductPage })));
const StaticPage = lazy(() => import('./pages/StaticPage').then((module) => ({ default: module.StaticPage })));

/** Shared frame for every page: announcement, top bar, header, content, footer. */
function Layout() {
  const { pathname } = useLocation();
  const { count } = useCart();
  const [localeOpen, setLocaleOpen] = useState(false);
  const openLocale = () => setLocaleOpen(true);

  // A new page starts at the top; the browser only does this on full loads.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <AnnouncementBar />
      <TopBar onLocale={openLocale} />
      <div className="page-frame">
        <Header overHero={pathname === '/'} cartCount={count} onLocale={openLocale} />
        {/* Keyed by path so each page fades in, and an error on one page clears on the next. */}
        <main key={pathname} className="page-enter">
          <ErrorBoundary FallbackComponent={ErrorState}>
            <Suspense fallback={<PageSkeleton />}>
              <Outlet />
            </Suspense>
          </ErrorBoundary>
        </main>
      </div>
      <FooterPromo />
      <Footer />
      <FloatingActions />
      <CouponTab />
      <WelcomePopup />
      <LocaleDialog open={localeOpen} onClose={() => setLocaleOpen(false)} />
      <Preloader />
    </>
  );
}

/** Application-wide context: language, theme settings, cart and animation config. */
function Providers({ children }: { children: ReactNode }) {
  return (
    <I18nProvider>
      <ThemeSettingsProvider>
        <CartProvider>
          {/* domAnimation keeps the animation runtime small; reducedMotion honours the OS setting. */}
          <LazyMotion features={domAnimation}>
            <MotionConfig reducedMotion="user">{children}</MotionConfig>
          </LazyMotion>
        </CartProvider>
      </ThemeSettingsProvider>
    </I18nProvider>
  );
}

export default function App() {
  return (
    <Providers>
      <BrowserRouter>
        {/* Inside the router: its dialog links to product pages. */}
        <QuickAddProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="category/:slug" element={<CategoryPage />} />
            <Route path="product/:slug" element={<ProductPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="blog/:slug" element={<ArticlePage />} />
            <Route path="page/:slug" element={<StaticPage />} />
            <Route path="branches" element={<BranchesPage />} />
            <Route path="loyalty" element={<LoyaltyPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
        </QuickAddProvider>
      </BrowserRouter>
    </Providers>
  );
}
