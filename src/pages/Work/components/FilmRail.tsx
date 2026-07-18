import { motion, MotionValue, useSpring } from 'framer-motion';
import './FilmRail.css';

interface RailItem {
  label: string;
  marker: string;
}

interface Props {
  items: RailItem[];
  activeIndex: number;
  progress: MotionValue<number>;
  onNavigate: (index: number) => void;
}

export default function FilmRail({ items, activeIndex, progress, onNavigate }: Props) {
 
  const smoothProgress = useSpring(progress, {
    stiffness: 90,
    damping: 24,
    mass: 0.4,
  });

  return (
    <nav className="film-rail" aria-label="Project chapters">
      <div className="film-rail-track">
        <div className="film-rail-track-bg" />
        <motion.div
          className="film-rail-track-fill"
          style={{ scaleY: smoothProgress }}
        />
      </div>

      <ol className="film-rail-list">
        {items.map((item, i) => {
          const isActive = i === activeIndex;
          return (
            <li key={item.label} className="film-rail-item">
              <button
                type="button"
                className={`film-rail-btn ${isActive ? 'is-active' : ''}`}
                onClick={() => onNavigate(i)}
                aria-current={isActive ? 'true' : undefined}
              >
                <span className="film-rail-marker">{item.marker}</span>
                <span className="film-rail-label">{item.label}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}