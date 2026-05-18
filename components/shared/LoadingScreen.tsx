'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    const timer = setTimeout(() => setShow(false), 3800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] overflow-hidden"
        >
          <div className="relative flex flex-col items-center">
            {/* 1. Snappy Logo Entrance */}
            <motion.div
              initial={{ scale: 0.2, opacity: 0 }}
              animate={{ 
                scale: [0.2, 1.3, 1],
                opacity: 1 
              }}
              transition={{ 
                duration: 0.7, 
                times: [0, 0.7, 1],
                ease: "easeOut"
              }}
              className="relative mb-10"
            >
              <motion.svg 
                viewBox="0 0 100 100" 
                fill="currentColor" 
                className="w-24 h-24 md:w-28 md:h-28 text-[var(--accent)]"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              >
                <mask id="aperture-mask-v3">
                  <rect width="100" height="100" fill="white" />
                  <rect x="47.5" y="0" width="5" height="100" fill="black" />
                  <rect x="0" y="47.5" width="100" height="5" fill="black" />
                  <circle cx="50" cy="50" r="24" fill="black" />
                </mask>
                <circle cx="50" cy="50" r="48" mask="url(#aperture-mask-v3)" />
              </motion.svg>
              
              {/* Subtle Outer Glow */}
              <motion.div 
                className="absolute inset-0 bg-[var(--accent)]/20 blur-2xl rounded-full -z-10"
                animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            {/* 2. Text Content */}
            <div className="flex flex-col items-center">
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display font-black uppercase text-5xl md:text-7xl tracking-tighter text-white"
                >
                  WEBRING
                </motion.h1>
              </div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="mt-4"
              >
                <motion.span
                  animate={{ letterSpacing: ["0.2em", "1.2em"] }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="font-body text-[10px] md:text-xs font-light uppercase text-[var(--accent)] ml-[1.2em] block"
                >
                  STUDIO
                </motion.span>
              </motion.div>
            </div>
          </div>

          {/* Minimalist Bottom Progress */}
          <motion.div 
            className="absolute bottom-0 left-0 h-[2px] bg-[var(--accent)]"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 3.5, ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
