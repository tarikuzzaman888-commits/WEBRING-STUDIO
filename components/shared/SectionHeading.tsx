'use client';

import { motion } from 'framer-motion';

interface SectionHeadingProps {
  label: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}

export default function SectionHeading({ label, title, subtitle, center = false }: SectionHeadingProps) {
  return (
    <div className={`mb-16 ${center ? 'text-center' : ''}`}>
      <motion.span
        className="font-mono text-[11px] tracking-[4px] uppercase text-[var(--accent)] block mb-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {label}
      </motion.span>
      <motion.h2
        className="font-display font-black uppercase tracking-tight text-display-md mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          className={`font-body text-[var(--muted)] text-lg ${center ? 'max-w-xl mx-auto' : 'max-w-xl'}`}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.4 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
