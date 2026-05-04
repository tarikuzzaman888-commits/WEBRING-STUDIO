'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  align = 'center',
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      className={cn(
        'mb-16',
        align === 'center' ? 'text-center' : 'text-left',
        className
      )}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {label && (
        <span className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-4 block">
          {label}
        </span>
      )}
      <h2 className="font-display text-display-md text-foreground">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-muted max-w-2xl mx-auto font-body text-base md:text-lg">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
