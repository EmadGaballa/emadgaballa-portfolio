// src/pages/Work/components/ProjectReel.tsx
import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion as useReducedMotionHook,
} from "framer-motion";
import type { Project } from "@/types";
import "./ProjectReel.css";

interface Props {
  project: Project;
  index: number;
  chapterMark: string;
  nextProject?: Project;
  isFirst: boolean;
  reducedMotion: boolean;
}

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0 },
};

const ProjectReel = forwardRef<HTMLElement, Props>(function ProjectReel(
  { project, index, chapterMark, nextProject },
  ref,
) {
  const { t } = useTranslation("work");
  const prefersReducedMotion = useReducedMotionHook();
  const slug = project.slug;
  const p = (key: string) => t(`projects.${slug}.${key}`);
  const pf = (i: number, key: string) =>
    t(`projects.${slug}.features.${i}.${key}`, { defaultValue: "" });
  const ps = (i: number, key: string) =>
    t(`projects.${slug}.screenshots.${i}.${key}`, { defaultValue: "" });

  // Parallax + clip-reveal for the hero image, driven by this reel's own
  // scroll position rather than the page's, so each chapter reveals on its
  // own terms as it enters the viewport.
  const heroWrapRef = useScroll();
  const { scrollYProgress: heroProgress } = heroWrapRef;

  const heroY = useTransform(
    heroProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [-40, 40],
  );

  const isEven = index % 2 === 0;

  const projSubtitle = p("subtitle");
  const projTagline = p("tagline");
  const projType = p("type");
  const projChallenge = p("challenge");
  const projApproach = p("approach");
  const projEngineering = p("engineering");
  const projOutcome = p("outcome");
  const projLessons = p("lessons");

  return (
    <section
      ref={ref}
      className={`reel ${isEven ? "reel-a" : "reel-b"}`}
      id={project.slug}
      aria-labelledby={`${project.slug}-title`}
    >
      {/* ── Chapter header ─────────────────────────────────────────── */}
      <div className="container reel-header">
        <div className="reel-header-left">
          <span className="reel-chapter-mark">{chapterMark}</span>
          <h2 id={`${project.slug}-title`} className="reel-title heading-2">
            {projSubtitle}
            <br />
            <em className="accent-italic">– {project.title}</em>
          </h2>
        </div>
        <div className="reel-header-meta">
          <div>{project.year}</div>
          <div>{projTagline}</div>
          <div>{projType}</div>
        </div>
      </div>

      {/* ── Hero reveal ────────────────────────────────────────────── */}
      <motion.a
        href={project.liveUrl}
        target="_blank"
        rel="noopener"
        className="reel-hero"
        initial="hidden"
        whileInView="visible"
        whileHover="hover" // Fix: Let child nodes inherit parent hover state context safely
        viewport={{ once: true, margin: "-10% 0px" }}
        variants={{
          hidden: { clipPath: "inset(0 0 100% 0)" },
          visible: {
            clipPath: "inset(0 0 0% 0)",
            transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
          },
        }}
      >
        {/* Parallax Container: Solely dedicated to handle the vertical scroll vector */}
        <motion.div className="reel-hero-parallax-wrapper" style={{ y: heroY }}>
          {/* Image Asset: Solely dedicated to handle the pristine hover scale */}
          <motion.img
            src={project.heroImage}
            alt={project.title}
            loading="lazy"
            className="reel-hero-img"
            variants={{
              hover: { scale: 1.03 }, // Subtle, high-end dolly zoom value
            }}
            transition={{
              duration: 0.75, // Slow, elegant ease transition both in and out
              ease: [0.25, 1, 0.5, 1], // Clean cinematic cubic-bezier curves
            }}
          />
        </motion.div>

        <div className="reel-hero-gradient" />
        <div className="reel-hero-frame" />
        <span className="reel-hero-hint">{t("viewLiveSite")} ↗</span>
      </motion.a>

      {/* ── The Challenge ──────────────────────────────────────────── */}
      <div className="container reel-narrative">
        <motion.div
          className="reel-narrative-block"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="reel-eyebrow">{t("problem")}</span>
          <p className="reel-narrative-text reel-challenge-text">
            {projChallenge}
          </p>
        </motion.div>

        <motion.div
          className="reel-narrative-block"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="reel-eyebrow">{t("solution")}</span>
          <p className="reel-narrative-text reel-approach-text">
            {projApproach}
          </p>
        </motion.div>
      </div>

      {/* ── Feature sequence ───────────────────────────────────────── */}
      <div className="container reel-features">
        <SectionCaption text={t("keyFeatures")} />
        <div className="reel-feature-list">
          {project.features.map((feature, i) => (
            <motion.div
              key={feature.number}
              className="reel-feature-row"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <span className="reel-feature-number">{feature.number}</span>
              <div className="reel-feature-copy">
                <h3 className="reel-feature-name">{pf(i, "name")}</h3>
                <p className="reel-feature-desc">{pf(i, "description")}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Engineering / architecture ─────────────────────────────── */}
      <div className="container reel-engineering">
        <motion.div
          className="reel-narrative-block reel-engineering-block"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="reel-eyebrow">{t("development")}</span>
          <p className="reel-narrative-text reel-engineering-text">
            {projEngineering}
          </p>
        </motion.div>

        <motion.div
          className="reel-tech-row"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {project.techStack.map((tech, i) => (
            <motion.span
              key={tech}
              className="reel-tech-tag"
              variants={fadeUp}
              transition={{ duration: 0.4, delay: i * 0.02 }}
            >
              <span className="reel-tech-dot" />
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* ── Editorial screenshot composition ───────────────────────── */}
      <div className="reel-gallery">
        {project.screenshots.map((shot, i) => (
          <motion.figure
            key={shot.src}
            className="reel-gallery-item"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.8,
              delay: i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <img src={shot.src} alt={shot.alt} loading="lazy" />
            <figcaption className="reel-gallery-caption">
              {ps(i, "label")}
            </figcaption>
          </motion.figure>
        ))}
      </div>

      {/* ── Outcome / lessons ───────────────────────────────────────── */}
      <div className="container reel-outcome">
        <motion.div
          className="reel-outcome-block"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="reel-eyebrow">{t("caseStudy")}</span>
          <p className="reel-narrative-text reel-outcome-text">{projOutcome}</p>
          <p className="reel-lessons-text">{projLessons}</p>
        </motion.div>

        <div className="reel-actions">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener"
            className="btn-primary"
          >
            {t("liveDemo")} ↗
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener"
            className="btn-secondary"
          >
            {t("viewGitHub")} →
          </a>
          <Link to={`/work/${project.slug}`} className="btn-secondary">
            {t("viewProject")} →
          </Link>
        </div>
      </div>

      {/* ── Sequence transition into next chapter ──────────────────── */}
      {nextProject && (
        <Link to={`#${nextProject.slug}`} className="reel-next">
          <div className="reel-next-frame">
            <img
              src={nextProject.heroImage}
              alt={nextProject.title}
              loading="lazy"
            />
          </div>
          <div className="reel-next-copy">
            <span className="reel-next-label">{t("nextChapter")}</span>
            <h3 className="reel-next-title heading-3">{nextProject.title}</h3>
          </div>
        </Link>
      )}
    </section>
  );
});

function SectionCaption({ text }: { text: string }) {
  return (
    <motion.div
      className="reel-section-caption"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
}

export default ProjectReel;
