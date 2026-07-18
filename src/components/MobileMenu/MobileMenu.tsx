import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/contexts/ThemeContext";
import { NavItem } from "@/types";
import "./MobileMenu.css";

interface Props {
  items: NavItem[];
  isOpen: boolean;
  onClose: () => void;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.25, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

const sheetVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.04,
      delayChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    y: 16,
    scale: 0.99,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: { opacity: 0, x: 8 },
};

export default function MobileMenu({ items, isOpen, onClose }: Props) {
  const { t, i18n } = useTranslation(["navigation", "common"]);
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [location.pathname]);

  // Handle locking the background body scroll while open
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";
    backdropRef.current?.focus();

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="mobile-menu-backdrop"
          ref={backdropRef}
          className="mobile-menu-backdrop"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose} 
          onKeyDown={handleKeyDown}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
        >
          <motion.div
            className="mobile-menu-sheet"
            variants={sheetVariants}
            onClick={(e) => e.stopPropagation()} 
          >
            {/* Header */}
            <div className="mobile-menu-header">
              <div className="mobile-menu-brand">
                <span className="brand-text">EMG</span>
              </div>
              <button
                className="mobile-menu-close"
                onClick={onClose}
                aria-label={t("common:close")}
              >
                <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M1 1L13 13M1 13L13 1"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* Navigation Items */}
            <nav className="mobile-menu-nav">
              {items.map((item, index) => (
                <motion.div key={item.path} variants={itemVariants}>
                  <Link to={item.path} className="mobile-menu-item">
                    <span className="item-number">{`0${index + 1}`}</span>
                    <span className="item-label">
                      {t(item.labelKey.replace("navigation:", ""))}
                    </span>
                    <svg
                      className="item-arrow"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M6 3L11 8L6 13"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Controls Section */}
            <div className="mobile-menu-controls">
              {/* Language Switcher */}
              <div className="control-section">
                <span className="control-label">
                  {t("common:language", "Language")}
                </span>
                <div className="segmented-control">
                  {["en", "ar"].map((language) => (
                    <button
                      key={language}
                      type="button"
                      onClick={() => i18n.changeLanguage(language)}
                      className={`segment-btn ${i18n.language === language ? "active" : ""}`}
                    >
                      <span className="segment-label">
                        {language === "en" ? "English" : "العربية"}
                      </span>
                      {i18n.language === language && (
                        <motion.div
                          layoutId="mobile-lang-pill"
                          className="segment-active-bg"
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                          }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme Switcher */}
              <div className="control-section">
                <span className="control-label">
                  {t("common:theme", "Theme")}
                </span>
                <div className="segmented-control">
                  {(["light", "dark"] as const).map((themeMode) => (
                    <button
                      key={themeMode}
                      type="button"
                      onClick={() => setTheme(themeMode)}
                      className={`segment-btn ${theme === themeMode ? "active" : ""}`}
                    >
                      <span className="segment-label capitalize">
                        {themeMode}
                      </span>
                      {theme === themeMode && (
                        <motion.div
                          layoutId="mobile-theme-pill"
                          className="segment-active-bg"
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                          }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <motion.a
              href="https://wa.me/201210048828"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-menu-cta"
              variants={itemVariants}
            >
              <span className="cta-text">{t("common:letsBuild")} →</span>
            </motion.a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
