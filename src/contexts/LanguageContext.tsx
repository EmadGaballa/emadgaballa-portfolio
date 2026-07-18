import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
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
  
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('lang') as Lang | null;
      if (saved === 'en' || saved === 'ar') return saved;
    }
    return 'en';
  });

  const direction = lang === 'ar' ? 'rtl' : 'ltr';

  const setLang = (l: Lang) => {
    i18n.changeLanguage(l);
  };


  useEffect(() => {
    const handleLangChange = (newLng: string) => {
      if (!newLng) return;
      
      const cleanLng = (newLng.split('-')[0] as Lang) || 'en';
      
      setLangState(cleanLng);
      localStorage.setItem('lang', cleanLng);
    };

    handleLangChange(i18n.language);

    i18n.on('languageChanged', handleLangChange);
    
    return () => {
      i18n.off('languageChanged', handleLangChange);
    };
  }, [i18n]);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('lang', lang);
    root.setAttribute('dir', direction);
  }, [lang, direction]);

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