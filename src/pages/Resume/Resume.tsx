import { useTranslation } from 'react-i18next';
import PageTransition from '@/components/PageTransition/PageTransition';
import SectionIntro from '@/components/SectionIntro/SectionIntro';
import { portfolioData } from '@/data/portfolio';
import './Resume.css';

export default function Resume() {
  const { t } = useTranslation('resume');

  return (
    <PageTransition>
      <section className="resume-page section-padding">
        <div className="container">
          <div className="resume-header">
            <SectionIntro labelKey="label" ns="resume" />
            <h2
              className="resume-heading heading-2"
              dangerouslySetInnerHTML={{ __html: t('heading') }}
            />
          </div>

          <div className="resume-content">
            <div className="resume-section">
              <h3 className="resume-section-title heading-4">{t('profile')}</h3>
              <p className="body-base">{t('profileText')}</p>
            </div>

            <div className="resume-section">
              <h3 className="resume-section-title heading-4">{t('archBackground')}</h3>
              <p className="body-base">{t('archText')}</p>
            </div>

            <div className="resume-section">
              <h3 className="resume-section-title heading-4">{t('skills')}</h3>
              <div className="resume-skills-list">
                {[
                  'React.js', 'TypeScript', 'JavaScript (ES6+)', 'Node.js',
                  'Express.js', 'MongoDB', 'Mongoose', 'RESTful APIs',
                  'HTML5', 'CSS3', 'Git', 'GitHub', 'Vite', 'Framer Motion',
                ].map((skill) => (
                  <span key={skill} className="resume-skill-tag">{skill}</span>
                ))}
              </div>
            </div>

            <div className="resume-section">
              <h3 className="resume-section-title heading-4">{t('education')}</h3>
              <div className="resume-timeline">
                <div className="resume-timeline-item">
                  <div className="resume-timeline-year">University</div>
                  <div className="resume-timeline-title">Architecture Studies</div>
                  <div className="resume-timeline-desc">
                    Studied architecture at university, developing a foundation in structural thinking, design principles, and systematic problem-solving.
                  </div>
                </div>
              </div>
            </div>

            <div className="resume-download">
              <a
                href={portfolioData.resume}
                target="_blank"
                rel="noopener"
                className="btn-primary"
              >
                {t('download')} ↓
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}