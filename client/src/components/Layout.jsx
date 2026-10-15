import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import { siteConfig } from '../config/siteConfig.js';

/**
 * Shared page shell: header + current page (<Outlet />) + footer.
 * Also applies the configured colour theme and scrolls to the top on navigation.
 */
export default function Layout() {
  const { pathname } = useLocation();

  // Apply the theme once by setting data-theme on <html> (styles read it)
  useEffect(() => {
    document.documentElement.dataset.theme = siteConfig.activeTheme;
  }, []);

  // Start each new page at the top instead of the previous scroll position
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="app-shell">
      <Navbar />
      <main className="page container">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
