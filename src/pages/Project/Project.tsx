import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import PageTransition from '@/components/PageTransition/PageTransition';
import { projects } from '@/data/projects';
import './Project.css';

export default function Project() {
  const { slug: paramSlug } = useParams<{ slug: string }>();
  const { t } = useTranslation('project');
  const project = projects.find((p) => p.slug === paramSlug);

  if (!project) {
    return (
      <PageTransition>
        <section className="project-page section-padding">
          <div className="container">
            <h1 className="heading-2">{t('notFound')}</h1>
            <Link to="/work" className="btn-primary" style={{ marginTop: 32, display: 'inline-flex' }}>
              {t('backToWork')}
            </Link>
          </div>
        </section>
      </PageTransition>
    );
  }

  const slug = project.slug;
  const p = (key: string) => t(`projects.${slug}.${key}`, { defaultValue: "" });
  const pf = (i: number, key: string) => t(`projects.${slug}.features.${i}.${key}`, { defaultValue: "" });
  const ps = (i: number, key: string) => t(`projects.${slug}.screenshots.${i}.${key}`, { defaultValue: "" });

  return (
    <PageTransition>
      <section className="project-page">
        <div className="project-hero-section">
          <div className="container">
            <div className="project-hero-meta">
              <div className="label-mono-sm">{project.year} / {p("type")}</div>
              <h1 className="project-hero-title heading-1">
                {project.title}
                <em className="accent-italic">.</em>
              </h1>
              <p className="project-hero-tagline body-large">{p("tagline")}</p>
            </div>
          </div>
          <div className="project-hero-image">
            <img src={project.heroImage} alt={project.title} />
          </div>
        </div>

        <div className="container">
          <div className="project-section">
            <h2 className="heading-3">{t('overview')}</h2>
            <p className="body-base project-text">{p("overview")}</p>
          </div>

          <div className="project-section">
            <h2 className="heading-3" dangerouslySetInnerHTML={{ __html: t('features') }} />
            <div className="project-features">
              {project.features.map((f, i) => (
                <motion.div
                  key={f.number}
                  className="project-feature-item"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                >
                  <span className="project-feature-num">{f.number}</span>
                  <div>
                    <div className="project-feature-name">{pf(i, "name")}</div>
                    <div className="project-feature-desc">{pf(i, "description")}</div>
                  </div>
                  <span className="project-feature-arrow">→</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="project-section">
            <h2 className="heading-3">{t('techStack')}</h2>
            <div className="project-tech-row">
              {project.techStack.map((tech) => (
                <span key={tech} className="project-tech-tag">
                  <span className="project-tech-dot" />{tech}
                </span>
              ))}
            </div>
          </div>

          <div className="project-section">
            <h2 className="heading-3">{t('gallery')}</h2>
            <div className="project-gallery">
              {project.screenshots.map((ss, i) => (
                <motion.div
                  key={i}
                  className="project-gallery-item"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                >
                  <img src={ss.src} alt={ss.alt} loading="lazy" />
                  <div className="project-gallery-label">{ps(i, "label")}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="project-section project-links">
            <h2 className="heading-3">{t('links')}</h2>
            <div className="project-link-buttons">
              <a href={project.liveUrl} target="_blank" rel="noopener" className="btn-primary">
                {t('liveDemo')} ↗
              </a>
              <a href={project.githubUrl} target="_blank" rel="noopener" className="btn-secondary">
                {t('viewGitHub')} →
              </a>
              <Link to="/work" className="btn-secondary">
                {t('backToWork')} ←
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}