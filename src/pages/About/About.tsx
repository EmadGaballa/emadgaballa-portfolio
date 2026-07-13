import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import PageTransition from '@/components/PageTransition/PageTransition';
import SectionIntro from '@/components/SectionIntro/SectionIntro';

import './About.css';

export default function About() {
  const { t } = useTranslation(['about', 'home']);

  return (
    <PageTransition>

      {/* ==========================
          HERO
      =========================== */}

      <section className="about-hero">

        <div className="about-hero-bg" />
        <div className="about-hero-grid" />

        <div className="container about-hero-content">

          <motion.p
            className="about-hero-tag"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: [0.0, 0.0, 0.2, 1],
            }}
          >
            {t('home:tag')}
          </motion.p>

          <motion.h1
            className="about-hero-name"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.5,
              ease: [0.0, 0.0, 0.2, 1],
            }}
            dangerouslySetInnerHTML={{
              __html: t('home:name'),
            }}
          />

          <motion.p
            className="about-hero-role"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.75,
              ease: [0.0, 0.0, 0.2, 1],
            }}
          >
            {t('home:role')}
          </motion.p>

          <motion.div
            className="about-hero-buttons"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: 1,
              ease: [0.0, 0.0, 0.2, 1],
            }}
          >
            <Link to="/work" className="btn-primary">
              {t('home:viewWork')}
            </Link>

            <Link to="/contact" className="btn-secondary">
              {t('home:contactMe')}
            </Link>
          </motion.div>

        </div>

        <div className="about-scroll-indicator">
          {t('home:scroll')}
        </div>

      </section>

      {/* ==========================
          ABOUT
      =========================== */}

      <section className="about-page section-padding">

        <div className="container">

          <div className="about-page-grid">

            <div>

              <SectionIntro
                labelKey="label"
                ns="about"
              />

              <h2
                className="about-page-heading heading-2"
                dangerouslySetInnerHTML={{
                  __html: t('about:heading'),
                }}
              />

              <div className="about-page-body body-base">

                <p>{t('about:paragraph1')}</p>

                <p>{t('about:paragraph2')}</p>

                <p>{t('about:paragraph3')}</p>

              </div>

              <div className="about-page-stats">

                <div className="stat-card">
                  <div className="stat-num">2+</div>
                  <div className="stat-label">
                    {t('about:stat1')}
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-num">98%</div>
                  <div className="stat-label">
                    {t('about:stat2')}
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-num">100%</div>
                  <div className="stat-label">
                    {t('about:stat3')}
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-num">∞</div>
                  <div className="stat-label">
                    {t('about:stat4')}
                  </div>
                </div>

              </div>

            </div>

            <div className="about-page-visual">

              <div className="about-page-image-wrap">

                <img
                  src="/photos/14.png"
                  alt="Emad Gaballa"
                  loading="lazy"
                />

              </div>

              <div className="about-page-corner tl" />
              <div className="about-page-corner br" />

            </div>

          </div>

        </div>

      </section>

    </PageTransition>
  );
}