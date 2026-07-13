import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageTransition from '@/components/PageTransition/PageTransition';
import './Home.css';

export default function Home() {
  const { t } = useTranslation('home');

  return (
    <PageTransition>
      <section className="home-hero">
        <div className="home-hero-bg" />
        <div className="home-hero-grid" />
        <div className="container home-hero-content">
          <motion.p
            className="home-hero-tag"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.0, 0.0, 0.2, 1] }}
          >
            {t('tag')}
          </motion.p>
          <motion.h1
            className="home-hero-name"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.0, 0.0, 0.2, 1] }}
            dangerouslySetInnerHTML={{ __html: t('name') }}
          />
          <motion.p
            className="home-hero-role"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.75, ease: [0.0, 0.0, 0.2, 1] }}
          >
            {t('role')}
          </motion.p>
          <motion.div
            className="home-hero-ctas"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.0, ease: [0.0, 0.0, 0.2, 1] }}
          >
            <Link to="/work" className="btn-primary">
              <span>{t('viewWork')}</span>
              <span>↓</span>
            </Link>
            <Link to="/contact" className="btn-secondary">
              <span>{t('contactMe')}</span>
              <span>→</span>
            </Link>
          </motion.div>
        </div>
        <div className="home-hero-scroll">{t('scroll')}</div>
      </section>
    </PageTransition>
  );
}