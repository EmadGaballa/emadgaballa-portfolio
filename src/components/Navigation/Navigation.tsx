import { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useMotionValueEvent, 
  useMotionValue, 
  useSpring, 
  useTransform 
} from 'framer-motion';
import './Navigation.css';

const navItems = [
  { path: '/about', labelKey: 'navigation:about' },
  { path: '/work', labelKey: 'navigation:work' },
  { path: '/skills', labelKey: 'navigation:skills' },
  { path: '/resume', labelKey: 'navigation:resume' },
  { path: '/contact', labelKey: 'navigation:contact' },
];

export default function Navigation() {
  const { t, i18n } = useTranslation(['navigation', 'common']);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const { scrollY, scrollYProgress } = useScroll();

  // Handle hide-on-scroll logic flawlessly for full-width layouts
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 50);
  });

  // Reading progress line tracking
  const readingProgress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Magnetic Button Spring System
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const ctaX = useSpring(mouseX, springConfig);
  const ctaY = useSpring(mouseY, springConfig);

  const handleMagneticMove = (e: React.MouseEvent) => {
    if (!ctaRef.current) return;
    const { left, top, width, height } = ctaRef.current.getBoundingClientRect();
    const currentX = e.clientX - (left + width / 2);
    const currentY = e.clientY - (top + height / 2);
    mouseX.set(currentX * 0.15); // Fine-tuned 6px threshold
    mouseY.set(currentY * 0.15);
  };

  const resetMagneticMove = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const toggleLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <>
      {/* Precision Top-Border Page Reading Progress Indicator */}
      <motion.div 
        className="nav-global-progress" 
        style={{ scaleX: scrollYProgress }} 
      />

      <motion.nav 
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: '-100%', opacity: 0 } // Completely hides edge-to-edge container cleanly
        }}
        animate={hidden && !mobileOpen ? "hidden" : "visible"}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={`nav-container ${scrolled ? 'scrolled' : ''}`}
      >
        {/* Subtle, drifting interior ambient backlight */}
        <div className="nav-ambient-glow" />

        <div className="nav-wrapper">
          {/* Brand Presentation Block */}
          <Link to="/" className="nav-brand-group">
            <div className="brand-typography">
              <span className="brand-main">EMG</span>
              <span className="brand-sub">{t('common:brandSub')}</span>
            </div>
          </Link>

          {/* Center Navigation Dock Block */}
          <div className="nav-links-dock">
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-dock-link ${isActive ? 'active' : ''}`}
                >
                  <motion.div 
                    whileHover={{ y: -2, letterSpacing: '0.14em' }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="link-text-wrapper"
                  >
                    <span className="link-index">{`0${index + 1}`}</span>
                    <span className="link-title">{t(item.labelKey.replace('navigation:', ''))}</span>
                  </motion.div>
                  
                  {isActive && (
                    <motion.div 
                      layoutId="active-dock-pill"
                      className="active-glass-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Utilities Control Group */}
          <div className="nav-utilities-group">
            
            {/* Apple-inspired Segmented Language Switcher */}
            <div className="segmented-control lang-control">
              {['en', 'ar'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => toggleLanguage(lang)}
                  className={`segment-btn ${i18n.language === lang ? 'active' : ''}`}
                >
                  <span className="segment-label">{lang === 'en' ? 'English' : 'العربية'}</span>
                  {i18n.language === lang && (
                    <motion.div layoutId="lang-pill" className="segment-active-bg" />
                  )}
                </button>
              ))}
            </div>

            {/* Apple-inspired Theme Mode Toggle */}
            <div className="segmented-control theme-control">
              {(['light', 'dark'] as const).map((tMode) => (
                <button
                  key={tMode}
                  onClick={() => setTheme(tMode)}
                  className={`segment-btn ${theme === tMode ? 'active' : ''}`}
                >
                  <span className="segment-label capitalize">{tMode}</span>
                  {theme === tMode && (
                    <motion.div layoutId="theme-pill" className="segment-active-bg" />
                  )}
                </button>
              ))}
            </div>

            {/* Premium Magnetic Action Trigger */}
            <motion.a
              ref={ctaRef}
              style={{ x: ctaX, y: ctaY }}
              onMouseMove={handleMagneticMove}
              onMouseLeave={resetMagneticMove}
              href="https://wa.me/201210048828"
              target="_blank"
              rel="noopener noreferrer"
              className="premium-magnetic-cta"
            >
              <span className="cta-inner-text">{t('common:letsBuild')} →</span>
            </motion.a>

            {/* Cinematic Full Screen Mobile Toggle */}
            <button 
              className={`cinematic-menu-trigger ${mobileOpen ? 'open' : ''}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle Navigation Shell"
            >
              <span className="menu-trigger-text">{mobileOpen ? t('common:close') : t('common:menu')}</span>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Cinematic Mobile Screen Overlay Viewport Context */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="cinematic-overlay-viewport"
          >
            <div className="overlay-blur-backdrop" />
            <nav className="overlay-links-wrapper">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: 40, rotateX: -15 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="overlay-link-container"
                >
                  <Link 
                    to={item.path} 
                    onClick={() => setMobileOpen(false)}
                    className="overlay-huge-link"
                  >
                    <span className="overlay-link-num">{`0${index + 1}`}</span>
                    {t(item.labelKey.replace('navigation:', ''))}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}