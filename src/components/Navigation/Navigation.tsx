import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher';
import MobileMenu from '@/components/MobileMenu/MobileMenu';
import './Navigation.css';

const navItems = [
  { path: '/', labelKey: 'navigation:home' },
  { path: '/about', labelKey: 'navigation:about' },
  { path: '/work', labelKey: 'navigation:work' },
  { path: '/skills', labelKey: 'navigation:skills' },
  { path: '/resume', labelKey: 'navigation:resume' },
  { path: '/contact', labelKey: 'navigation:contact' },
];

export default function Navigation() {
  const { t } = useTranslation('navigation');
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      <nav className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
        <div className="nav-inner">
          <Link to="/" className="nav-logo">
            {t('logo')}
          </Link>

          <div className="nav-center">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'nav-link-active' : ''}`}
              >
                {t(item.labelKey.replace('navigation:', ''))}
              </Link>
            ))}
          </div>

          <div className="nav-right">
            <LanguageSwitcher />
            <ThemeToggle />
            <a
              href="https://wa.me/201210048828"
              target="_blank"
              rel="noopener"
              className="nav-cta"
            >
              {t('hireMe')}
            </a>
            <button
              className={`hamburger ${mobileOpen ? 'hamburger-open' : ''}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={t('menu', { ns: 'common' })}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <MobileMenu items={navItems} onClose={() => setMobileOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}