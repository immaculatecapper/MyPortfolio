import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import Logo from './Logo.jsx';

// Navigation entries rendered in the header (path + visible label)
const navigationLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About Me' },
  { path: '/projects', label: 'Projects' },
  { path: '/education', label: 'Education' },
  { path: '/services', label: 'Services' },
  { path: '/contact', label: 'Contact Me' },
];

/**
 * Site header with the custom logo and links to every page.
 * On small screens the links collapse behind a menu toggle button.
 */
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="site-header">
      <nav className="navbar container" aria-label="Main navigation">
        <Link to="/" className="brand" onClick={closeMenu}>
          <Logo />
          <span className="brand-name">Mark Perez</span>
        </Link>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={isMenuOpen}
          aria-controls="primary-links"
          onClick={() => setIsMenuOpen((previous) => !previous)}
        >
          <span className="sr-only">Toggle menu</span>
          <span className="menu-bar" />
          <span className="menu-bar" />
          <span className="menu-bar" />
        </button>

        <ul id="primary-links" className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          {navigationLinks.map((link) => (
            <li key={link.path}>
              {/* NavLink adds the "active" class to the current page's link */}
              <NavLink to={link.path} end={link.path === '/'} onClick={closeMenu}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
