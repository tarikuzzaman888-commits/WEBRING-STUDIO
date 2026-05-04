'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

export default function CursorFollower() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
    if (!isVisible) setIsVisible(true);
  }, [isVisible]);

  const handleMouseEnter = useCallback(() => setIsVisible(true), []);
  const handleMouseLeave = useCallback(() => setIsVisible(false), []);

  useEffect(() => {
    // Only show on desktop with fine pointer
    const hasFinePinter = window.matchMedia('(pointer: fine)').matches;
    if (!hasFinePinter) return;

    document.documentElement.classList.add('cursor-custom');

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Track hoverable elements
    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, input, textarea, select, [role="button"], label');
      setIsHovering(!!isInteractive);
    };
    window.addEventListener('mouseover', checkHover);

    return () => {
      document.documentElement.classList.remove('cursor-custom');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseover', checkHover);
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave]);

  if (!isVisible) return null;

  return (
    <>
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-accent pointer-events-none z-[9998]"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          scale: isHovering ? 0 : 1,
        }}
        transition={{ type: 'tween', duration: 0 }}
      />
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 w-11 h-11 rounded-full border border-accent pointer-events-none z-[9998]"
        animate={{
          x: position.x - 22,
          y: position.y - 22,
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.5 : 0.4,
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.2 }}
      />
    </>
  );
}
