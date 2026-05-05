'use client';

import { motion } from 'framer-motion';
import PortfolioGrid from '@/components/portfolio/PortfolioGrid';
import type { PortfolioItem } from '@/lib/types';

import { fallbackPortfolio } from '@/lib/fallbackData';

interface PortfolioPageClientProps {
  items: PortfolioItem[];
}

export default function PortfolioPageClient({ items }: PortfolioPageClientProps) {
  const displayItems = items.length > 0 ? items : fallbackPortfolio;

  return (
    <div className="pt-20">
      <section className="relative pt-24 pb-12 overflow-hidden">
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <motion.span className="font-mono text-[10px] tracking-[4px] uppercase text-[var(--accent)] mb-4 block" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{'// Portfolio'}</motion.span>
          <h1 className="font-display font-black uppercase tracking-tight text-display-lg mb-6">Our Work</h1>
          <p className="font-body text-[var(--muted)] text-base max-w-xl">A curated collection of AI-generated product photography, lifestyle scenes, and brand identity projects.</p>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <PortfolioGrid items={displayItems} />
        </div>
      </section>
    </div>
  );
}
