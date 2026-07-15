import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import './Cursor.css';

type CursorVariant = 'default' | 'hover' | 'text' | 'click';

export default function Cursor() {
  const [variant, setVariant] = useState<CursorVariant>('default');
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const dotSpringConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const dotX = useSpring(mouseX, dotSpringConfig);
  const dotY = useSpring(mouseY, dotSpringConfig);

  const ringSpringConfig = { damping: 20, stiffness: 150, mass: 0.8 };
  const ringX = useSpring(mouseX, ringSpringConfig);
  const ringY = useSpring(mouseY, ringSpringConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest('a, button, .cursor-target, [data-cursor-text]');

      if (interactiveEl) {
        const customText = interactiveEl.getAttribute('data-cursor-text');
        if (customText) {
          setVariant('text');
          setCursorText(customText);
        } else {
          setVariant('hover');
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest('a, button, .cursor-target, [data-cursor-text]');
      
      if (interactiveEl) {
        setVariant('default');
        setCursorText('');
      }
    };

    const handleMouseDown = () => setVariant('click');
    const handleMouseUp = () => setVariant('default');
    const handleMouseLeaveWindow = () => setIsVisible(false);
    const handleMouseEnterWindow = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
    };
  }, [mouseX, mouseY, isVisible]);

  const dotVariants = {
    default: { width: 8, height: 8, opacity: 1 },
    hover: { width: 48, height: 48, opacity: 0.15 },
    text: { width: 4, height: 4, opacity: 0.5 },
    click: { width: 32, height: 32, opacity: 0.2 }
  };

  const ringVariants = {
    default: { width: 36, height: 36, opacity: 1, scale: 1 },
    hover: { width: 12, height: 12, opacity: 0, scale: 1 },
    text: { width: 72, height: 72, opacity: 1, scale: 1 },
    click: { width: 42, height: 42, opacity: 0.5, scale: 0.9 }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            className="cursor-dot"
            style={{ 
              x: dotX, 
              y: dotY,
              translateX: "-50%", // Framer Motion compiles this cleanly with x/y
              translateY: "-50%" 
            }}
            animate={variant}
            variants={dotVariants}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          />
          <motion.div
            className="cursor-ring"
            style={{ 
              x: ringX, 
              y: ringY,
              translateX: "-50%", // Keeps the changing dynamic sizes perfectly anchored centered
              translateY: "-50%" 
            }}
            animate={variant}
            variants={ringVariants}
            transition={{ type: 'spring', damping: 20, stiffness: 150 }}
          >
            {variant === 'text' && (
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="cursor-text-label"
              >
                {cursorText}
              </motion.span>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}