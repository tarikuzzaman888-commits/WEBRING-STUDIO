'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import type { PortfolioItem } from '@/lib/types';
import { fallbackPortfolio } from '@/lib/fallbackData';
import PortfolioCard from '@/components/portfolio/PortfolioCard';
import PortfolioModal from '@/components/portfolio/PortfolioModal';

interface PortfolioPreviewProps {
  items: PortfolioItem[] | null;
}

export default function PortfolioPreview({ items }: PortfolioPreviewProps) {
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
  const displayItems = items && items.length > 0 ? items : fallbackPortfolio;
  const featuredItems = displayItems.slice(0, 6);

  const handleNext = () => {
    if (!selectedProject) return;
    const currentIndex = featuredItems.findIndex(p => p._id === selectedProject._id);
    const nextIndex = (currentIndex + 1) % featuredItems.length;
    setSelectedProject(featuredItems[nextIndex]);
  };

  const handlePrev = () => {
    if (!selectedProject) return;
    const currentIndex = featuredItems.findIndex(p => p._id === selectedProject._id);
    const prevIndex = (currentIndex - 1 + featuredItems.length) % featuredItems.length;
    setSelectedProject(featuredItems[prevIndex]);
  };

  return (
    <section className="py-24 md:py-32 bg-[#0A0A0A]" id="portfolio-preview">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-16">
          <SectionHeading
            label="// Portfolio"
            title="Selected work."
            subtitle="A curated selection of our highest-ROI projects."
          />
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-3 font-display font-black text-[10px] uppercase tracking-[3px] text-[var(--accent)] mt-4 sm:mt-0 sm:pb-8 transition-all hover:gap-4"
          >
            View All Work
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredItems.map((item, i) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              <PortfolioCard 
                project={item} 
                onClick={() => setSelectedProject(item)} 
              />
            </motion.div>
          ))}
        </div>

        {/* Modal Viewer (Reused) */}
        <PortfolioModal 
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onNext={handleNext}
          onPrev={handlePrev}
        />

        <div className="mt-20 flex justify-center lg:hidden">
          <Link
            href="/portfolio"
            className="px-10 py-4 border border-white/10 rounded-full font-display font-black uppercase text-xs tracking-[3px] text-white hover:bg-white hover:text-black transition-all"
          >
            View Full Portfolio
          </Link>
        </div>
      </div>
    </section>
  );
}
