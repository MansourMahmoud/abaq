import { useEffect } from 'react';
import { BrowserRouter, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { FloatingActions } from './components/layout/FloatingActions';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { Preloader } from './components/ui/Preloader';
import { I18nProvider } from './i18n/I18nProvider';
import { CartProvider, useCart } from './lib/cart';
import { ArticlePage } from './pages/ArticlePage';
import { BlogPage } from './pages/BlogPage';
import { BranchesPage } from './pages/BranchesPage';
import { CartPage } from './pages/CartPage';
import { CategoryPage } from './pages/CategoryPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProductPage } from './pages/ProductPage';
import { StaticPage } from './pages/StaticPage';
import { ThemeSettingsProvider } from './settings/ThemeSettings';

/** Shared frame for every page: announcement, header, content, footer. */
function Layout() {
  const { pathname } = useLocation();
  const { count } = useCart();

  // A new page starts at the top; the browser only does this on full loads.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <AnnouncementBar />
      <div className="page-frame">
        <Header overHero={pathname === '/'} cartCount={count} />
        <main>
          <Outlet />
        </main>
      </div>
      <Footer />
      <FloatingActions />
      <Preloader />
    </>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <ThemeSettingsProvider>
        <CartProvider>
          <BrowserRouter>
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
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </ThemeSettingsProvider>
    </I18nProvider>
  );
}
