import { createContext, useContext, useEffect, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Lang } from '@/types';

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  direction: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation();

  const lang = (i18n.language as Lang) || 'en';
  const direction = lang === 'ar' ? 'rtl' : 'ltr';

  const setLang = (l: Lang) => {
    i18n.changeLanguage(l);
    localStorage.setItem('lang', l);
  };

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('lang', lang);
    root.setAttribute('dir', direction);
  }, [lang, direction]);

  useEffect(() => {
    const saved = localStorage.getItem('lang') as Lang | null;
    if (saved && saved !== i18n.language) {
      i18n.changeLanguage(saved);
    }
  }, [i18n]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, direction }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}