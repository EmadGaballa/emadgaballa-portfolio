import { motion } from 'framer-motion';
import './AnimatedHeading.css';

interface Props {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  className?: string;
}

const letterVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.03,
      duration: 0.6,
      ease: [0.0, 0.0, 0.2, 1],
    },
  }),
};

export default function AnimatedHeading({ text, as: Tag = 'h2', className = '' }: Props) {
  const words = text.split(' ');

  return (
    <Tag className={`animated-heading ${className}`}>
      {words.map((word, wi) => (
        <span key={wi} className="animated-heading-word">
          {Array.from(word).map((char, ci) => (
            <motion.span
              key={ci}
              className="animated-heading-char"
              custom={wi * 4 + ci}
              variants={letterVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            >
              {char}
            </motion.span>
          ))}
          {wi < words.length - 1 && (
            <motion.span
              className="animated-heading-space"
              custom={wi * 4 + word.length}
              variants={letterVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            >
              {' '}
            </motion.span>
          )}
        </span>
      ))}
    </Tag>
  );
}