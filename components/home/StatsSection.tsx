'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import type { StatItem } from '@/lib/types';

const fallbackStats: StatItem[] = [
  { _key: '1', value: 200, label: 'Brands Served', suffix: '+' },
  { _key: '2', value: 5000, label: 'Images Delivered', suffix: '+' },
  { _key: '3', value: 3, label: 'Creatives', suffix: '' },
  { _key: '4', value: 100, label: 'Satisfaction', suffix: '%' },
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
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 md:py-32 bg-surface" id="stats-section" ref={ref}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {items.map((stat, i) => (
            <motion.div
              key={stat._key}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className="font-display text-5xl md:text-6xl lg:text-7xl text-foreground mb-2">
                {inView ? (
                  <CountUp
                    end={stat.value}
                    duration={2.5}
                    separator=","
                    suffix={stat.suffix}
                  />
                ) : (
                  <span>0{stat.suffix}</span>
                )}
              </div>
              <p className="font-mono text-xs tracking-[0.15em] uppercase text-muted">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
