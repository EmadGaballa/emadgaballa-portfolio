// src/pages/Work/Work.tsx
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useReducedMotion, useScroll } from 'framer-motion';
import PageTransition from '@/components/PageTransition/PageTransition';
import SectionIntro from '@/components/SectionIntro/SectionIntro';
import FilmRail from './components/FilmRail';
import ProjectReel from './components/ProjectReel';
import { projects } from '@/data/projects';
import { caseStudies } from './content/caseStudies';
import './Work.css';

/** Converts a 1-based index into a roman numeral chapter mark (I, II, III…). */
function toRoman(num: number): string {
  const table: [number, string][] = [
    [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
  ];
  let n = num;
  let out = '';
  for (const [value, symbol] of table) {
    while (n >= value) {
      out += symbol;
      n -= value;
    }
  }
  return out;
}

export default function Work() {
  const { t } = useTranslation('work');
  const prefersReducedMotion = useReducedMotion();

  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Array<HTMLElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Overall read-through progress, driving the film rail's progress line.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Scroll-spy: highlight whichever chapter currently owns the viewport's
  // center band, so the rail always reflects "where you are in the story."
  useEffect(() => {
    const sections = sectionRefs.current.filter(Boolean) as HTMLElement[];
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sections.indexOf(entry.target as HTMLElement);
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleNavigate = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  const railItems = useMemo(
    () => projects.map((project, i) => ({ label: project.title, marker: toRoman(i + 1) })),
    []
  );

  return (
    <PageTransition>
      <div className="work-page" ref={containerRef}>
        <div className="container work-page-header-wrap section-padding">
          <div className="work-page-header">
            <SectionIntro labelKey="label" ns="work" />
            <h1
              className="work-page-heading heading-2"
              dangerouslySetInnerHTML={{ __html: t('heading') }}
            />
            <p className="work-page-philosophy body-base">{t('philosophy')}</p>
          </div>
        </div>

        <FilmRail
          items={railItems}
          activeIndex={activeIndex}
          progress={scrollYProgress}
          onNavigate={handleNavigate}
        />

        <div className="work-reels">
          {projects.map((project, i) => (
            <ProjectReel
              key={project.slug}
              ref={(el: HTMLElement | null) => {
                sectionRefs.current[i] = el;
              }}
              project={project}
              content={caseStudies[project.slug]}
              index={i}
              chapterMark={toRoman(i + 1)}
              nextProject={projects[i + 1]}
              isFirst={i === 0}
              reducedMotion={!!prefersReducedMotion}
            />
          ))}
        </div>
      </div>
    </PageTransition>
  );
}