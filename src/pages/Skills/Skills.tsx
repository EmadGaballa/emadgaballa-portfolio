import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import PageTransition from '@/components/PageTransition/PageTransition';
import SectionIntro from '@/components/SectionIntro/SectionIntro';
import { skills, skillCategories } from '@/data/skills';
import './Skills.css';

export default function Skills() {
  const { t } = useTranslation('skills');

  return (
    <PageTransition>
      <section className="skills-page section-padding">
        <div className="container">
          <div className="skills-page-header">
            <SectionIntro labelKey="label" ns="skills" />
            <h2
              className="skills-page-heading heading-2"
              dangerouslySetInnerHTML={{ __html: t('heading') }}
            />
            <p className="skills-page-subtitle body-base">{t('subtitle')}</p>
          </div>

          {skillCategories.map((cat) => {
            const catSkills = skills.filter((s) => s.category === cat.id);
            return (
              <div key={cat.id} className="skills-category">
                <div className="skills-category-header">
                  <span className="skills-category-icon">{cat.icon}</span>
                  <h3 className="skills-category-title heading-4">
                    {t(`category.${cat.id}`)}
                  </h3>
                </div>
                <div className="skills-grid">
                  {catSkills.map((skill, i) => (
                    <motion.div
                      key={skill.name}
                      className="skill-card"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-30px' }}
                      transition={{ delay: i * 0.05, duration: 0.4 }}
                    >
                      <div className="skill-card-icon">{skill.icon}</div>
                      <div className="skill-card-name">{skill.name}</div>
                      {skill.level && (
                        <div className="skill-bar-wrap">
                          <div
                            className="skill-bar"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </PageTransition>
  );
}