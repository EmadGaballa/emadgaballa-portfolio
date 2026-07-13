import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher';
import { NavItem } from '@/types';
import './MobileMenu.css';

interface Props {
  items: NavItem[];
  onClose: () => void;
}

export default function MobileMenu({ items, onClose }: Props) {
  const { t } = useTranslation('navigation');

  return (
    <motion.div
      className="mobile-menu"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mobile-menu-inner">
        <div className="mobile-menu-controls">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
        <nav className="mobile-menu-nav">
          {items.map((item, i) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <Link to={item.path} className="mobile-menu-link" onClick={onClose}>
                {t(item.labelKey.replace('navigation:', ''))}
              </Link>
            </motion.div>
          ))}
        </nav>
        <motion.a
          href="https://wa.me/201210048828"
          target="_blank"
          rel="noopener"
          className="mobile-menu-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          {t('hireMe')}
        </motion.a>
      </div>
    </motion.div>
  );
}