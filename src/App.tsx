import { useEffect } from 'react';
import { BrowserRouter, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { I18nProvider } from './i18n/I18nProvider';
import { CartProvider, useCart } from './lib/cart';
import { CategoryPage } from './pages/CategoryPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
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
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </ThemeSettingsProvider>
    </I18nProvider>
  );
}
