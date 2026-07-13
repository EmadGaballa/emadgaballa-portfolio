import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import PageTransition from '@/components/PageTransition/PageTransition';
import SectionIntro from '@/components/SectionIntro/SectionIntro';
import { projects } from '@/data/projects';
import './Work.css';

export default function Work() {
  const { t } = useTranslation('work');

  return (
    <PageTransition>
      <section className="work-page section-padding">
        <div className="container">
          <div className="work-page-header">
            <SectionIntro labelKey="label" ns="work" />
            <h2
              className="work-page-heading heading-2"
              dangerouslySetInnerHTML={{ __html: t('heading') }}
            />
            <p className="work-page-philosophy body-base">
              {t('philosophy')}
            </p>
          </div>

          {projects.map((project, i) => (
            <div key={project.slug} className="work-project">
              <div className="work-project-intro">
                <div className="work-project-text">
                  <h3 className="work-project-title heading-3">
                    {project.subtitle}<br />
                    <em className="accent-italic">– {project.title}</em>
                  </h3>
                </div>
                <div className="work-project-meta label-mono-sm">
                  <div>{project.year}</div>
                  <div>{project.tagline}</div>
                  <div>{project.type}</div>
                </div>
              </div>

              <Link to={`/work/${project.slug}`} className="work-project-hero">
                <img src={project.heroImage} alt={project.title} loading="lazy" />
                <div className="work-project-overlay">
                  <div className="work-project-overlay-links">
                    <span className="overlay-btn accent">{t('viewProject')} →</span>
                  </div>
                </div>
              </Link>

              <div className="work-case-grid">
                {[
                  { label: 'concept', text: project.overview },
                  { label: 'features', text: project.features?.[0]?.description || '' },
                  { label: 'design', text: project.features?.[1]?.description || '' },
                  { label: 'development', text: project.features?.[2]?.description || '' },
                ].map((item, idx) => (
                  <motion.div
                    key={item.label}
                    className="work-case-card"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ delay: idx * 0.1, duration: 0.6 }}
                  >
                    <div className="work-case-number">
                      {String(idx + 1).padStart(2, '0')}
                    </div>
                    <div className="work-case-title">{t(item.label)}</div>
                    <p className="work-case-text">{item.text}</p>
                  </motion.div>
                ))}
              </div>

              <div className="work-tech-row">
                {project.techStack.slice(0, 12).map((tech) => (
                  <span key={tech} className="work-tech-tag">
                    <span className="work-tech-dot" />{tech}
                  </span>
                ))}
              </div>

              <div className="work-screenshots">
                {project.screenshots.slice(0, 2).map((ss, idx) => (
                  <div key={idx} className="work-screenshot-card">
                    <img src={ss.src} alt={ss.alt} loading="lazy" />
                    <div className="work-screenshot-label">{ss.label}</div>
                  </div>
                ))}
              </div>

              <div className="work-project-links">
                <a href={project.liveUrl} target="_blank" rel="noopener" className="btn-primary">
                  {t('liveDemo')} ↗
                </a>
                <a href={project.githubUrl} target="_blank" rel="noopener" className="btn-secondary">
                  {t('viewGitHub')} →
                </a>
                <Link to={`/work/${project.slug}`} className="btn-secondary">
                  {t('viewProject')} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}