'use client';

import { motion } from 'framer-motion';
import PortfolioGrid from '@/components/portfolio/PortfolioGrid';
import type { PortfolioItem } from '@/lib/types';

interface PortfolioPageClientProps {
  items: PortfolioItem[];
}

export default function PortfolioPageClient({ items }: PortfolioPageClientProps) {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="grain-overlay" />
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <motion.span
            className="font-mono text-xs tracking-[0.25em] uppercase text-accent mb-6 block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Portfolio
          </motion.span>
          <motion.h1
            className="font-display text-display-xl mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Work
          </motion.h1>
          <motion.p
            className="font-body text-muted text-lg max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            A curated collection of AI-generated product photography, lifestyle scenes, and brand identity projects.
          </motion.p>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          {items.length > 0 ? (
            <PortfolioGrid items={items} />
          ) : (
            <div className="text-center py-20 bg-surface rounded-2xl border border-border">
              <p className="font-display text-2xl text-foreground mb-4">Portfolio Coming Soon</p>
              <p className="font-body text-muted">
                Add portfolio items through Sanity Studio at{' '}
                <code className="font-mono text-accent text-sm">/studio</code>
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
