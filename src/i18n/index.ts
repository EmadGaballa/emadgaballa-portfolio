import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enCommon from './locales/en/common.json';
import enNavigation from './locales/en/navigation.json';
import enHome from './locales/en/home.json';
import enAbout from './locales/en/about.json';
import enWork from './locales/en/work.json';
import enProject from './locales/en/project.json';
import enSkills from './locales/en/skills.json';
import enResume from './locales/en/resume.json';
import enContact from './locales/en/contact.json';
import arCommon from './locales/ar/common.json';
import arNavigation from './locales/ar/navigation.json';
import arHome from './locales/ar/home.json';
import arAbout from './locales/ar/about.json';
import arWork from './locales/ar/work.json';
import arProject from './locales/ar/project.json';
import arSkills from './locales/ar/skills.json';
import arResume from './locales/ar/resume.json';
import arContact from './locales/ar/contact.json';

const resources = {
  en: {
    common: enCommon,
    navigation: enNavigation,
    home: enHome,
    about: enAbout,
    work: enWork,
    project: enProject,
    skills: enSkills,
    resume: enResume,
    contact: enContact,
  },
  ar: {
    common: arCommon,
    navigation: arNavigation,
    home: arHome,
    about: arAbout,
    work: arWork,
    project: arProject,
    skills: arSkills,
    resume: arResume,
    contact: arContact,
  },
};

const savedLang = typeof window !== 'undefined' ? localStorage.getItem('lang') : null;

i18n.use(initReactI18next).init({
  resources,
  lng: savedLang || 'en',
  fallbackLng: 'en',
  ns: [
    'common',
    'navigation',
    'home',
    'about',
    'work',
    'project',
    'skills',
    'resume',
    'contact',
  ],
  defaultNS: 'common',
  interpolation: {
    escapeValue: false,
  },
  returnObjects: true,
});

export default i18n;