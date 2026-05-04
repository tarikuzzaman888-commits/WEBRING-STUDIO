'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import type { StatItem } from '@/lib/types';

const fallbackStats: StatItem[] = [
  { _key: '1', value: 199, suffix: '+', label: 'Brands Served' },
  { _key: '2', value: 4999, suffix: '+', label: 'Images Delivered' },
  { _key: '3', value: 15, suffix: '', label: 'Countries' },
  { _key: '4', value: 98, suffix: '%', label: 'Satisfaction Rate' },
];

interface StatsSectionProps {
  stats: StatItem[] | null;
}

export default function StatsSection({ stats }: StatsSectionProps) {
  const items = stats && stats.length > 0 ? stats : fallbackStats;
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 md:py-32 bg-[var(--surface)]" id="stats" ref={ref}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {items.map((stat, i) => (
            <motion.div
              key={stat._key}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <div className="font-body font-black text-display-lg text-[var(--text)]">
                {inView ? (
                  <CountUp end={stat.value} duration={2.5} separator="," />
                ) : (
                  '0'
                )}
                <span className="text-[var(--accent)]">{stat.suffix}</span>
              </div>
              <p className="font-mono text-[11px] tracking-[3px] uppercase text-[var(--muted)] mt-2">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
