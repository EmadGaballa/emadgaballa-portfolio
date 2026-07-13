import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import './LanguageSwitcher.css';

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  const toggleLang = () => {
    setLang(lang === 'en' ? 'ar' : 'en');
  };

  return (
    <button
      onClick={toggleLang}
      className="lang-switcher"
      aria-label={`Switch language to ${lang === 'en' ? 'Arabic' : 'English'}`}
    >
      <motion.div
        className="lang-switcher-track"
        animate={{ justifyContent: lang === 'en' ? 'flex-start' : 'flex-end' }}
        transition={{ duration: 0.3 }}
      >
        <motion.span
          className="lang-switcher-label"
          key={lang}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
        >
          {lang === 'en' ? 'EN' : 'AR'}
        </motion.span>
      </motion.div>
      <span className="lang-switcher-separator">|</span>
      <span className={`lang-switcher-other ${lang === 'en' ? '' : 'active'}`}>
        {lang === 'en' ? 'AR' : 'EN'}
      </span>
    </button>
  );
}