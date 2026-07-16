import { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/contexts/ThemeContext";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useMotionValue,
  useSpring,
} from "framer-motion";
import MobileMenu from "@/components/MobileMenu/MobileMenu";
import "./Navigation.css";

const navItems = [
  { path: "/about", labelKey: "navigation:about" },
  { path: "/work", labelKey: "navigation:work" },
  { path: "/skills", labelKey: "navigation:skills" },
  { path: "/resume", labelKey: "navigation:resume" },
  { path: "/contact", labelKey: "navigation:contact" },
];

export default function Navigation() {
  const { t, i18n } = useTranslation(["navigation", "common"]);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const { scrollY, scrollYProgress } = useScroll();

  // Guard track: Keeps wrapper rigid and pinned when mobile layer overlay triggers
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 50);
  });

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
    mouseX.set(currentX * 0.15);
    mouseY.set(currentY * 0.15);
  };

  const resetMagneticMove = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <>
      <motion.div className="nav-global-progress" style={{ scaleX: scrollY }} />

      <motion.nav
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: "-100%", opacity: 0 },
        }}
        /* Fixed: Keeps the bar securely visible if the mobile sheet is open */
        animate={hidden && !mobileOpen ? "hidden" : "visible"}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={`nav-container ${scrolled ? "scrolled" : ""}`}
      >
        <div className="nav-ambient-glow" />

        <div className="nav-wrapper">
          {/* Brand Presentation Block */}
          <Link to="/" className="nav-brand-group">
            <div className="brand-typography">
              <span className="brand-main">EMG</span>
              <span className="brand-sub">{t("common:brandSub")}</span>
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
                  className={`nav-dock-link ${isActive ? "active" : ""}`}
                >
                  <motion.div
                    whileHover={{ y: -2, letterSpacing: "0.14em" }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="link-text-wrapper"
                  >
                    <span className="link-index">{`0${index + 1}`}</span>
                    <span className="link-title">
                      {t(item.labelKey.replace("navigation:", ""))}
                    </span>
                  </motion.div>

                  {isActive && (
                    <motion.div
                      layoutId="active-dock-pill"
                      className="active-glass-pill"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Utilities Control Group */}
          <div className="nav-utilities-group">
            {/* Language Switcher */}
            <div className="segmented-control lang-control">
              {["en", "ar"].map((lang) => (
                <button
                  key={lang}
                  onClick={() => i18n.changeLanguage(lang)}
                  className={`segment-btn ${i18n.language === lang ? "active" : ""}`}
                >
                  <span className="segment-label">
                    {lang === "en" ? "English" : "العربية"}
                  </span>
                  {i18n.language === lang && (
                    <motion.div
                      layoutId="lang-pill"
                      className="segment-active-bg"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Theme Mode Toggle */}
            <div className="segmented-control theme-control">
              {(["light", "dark"] as const).map((tMode) => (
                <button
                  key={tMode}
                  onClick={() => setTheme(tMode)}
                  className={`segment-btn ${theme === tMode ? "active" : ""}`}
                >
                  <span className="segment-label capitalize">{tMode}</span>
                  {theme === tMode && (
                    <motion.div
                      layoutId="theme-pill"
                      className="segment-active-bg"
                    />
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
              <span className="cta-inner-text">{t("common:letsBuild")} →</span>
            </motion.a>

            {/* Cinematic Full Screen Mobile Toggle */}
            <button
              className={`cinematic-menu-trigger ${mobileOpen ? "open" : ""}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? t("common:close") : t("common:menu")}
              aria-expanded={mobileOpen}
            >
              <div className="burger-box">
                <span className="burger-line line-top" />
                <span className="burger-line line-mid" />
                <span className="burger-line line-bot" />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Premium Mobile Menu Sheet */}
      <MobileMenu
        items={navItems}
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </>
  );
}
