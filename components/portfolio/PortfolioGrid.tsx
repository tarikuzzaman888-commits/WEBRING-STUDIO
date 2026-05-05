'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { PortfolioItem } from '@/lib/types';
import PortfolioCard from './PortfolioCard';
import PortfolioModal from './PortfolioModal';

interface PortfolioGridProps {
  items: PortfolioItem[];
}

export default function PortfolioGrid({ items }: PortfolioGridProps) {
  const categories = ['All', 'AI Photography', 'Lifestyle', 'E-commerce', 'Branding', 'Video'];
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
  const [sortBy, setSortBy] = useState<'latest' | 'oldest'>('latest');

  const filtered = useMemo(() => {
    let result = activeCategory === 'All' ? items : items.filter(i => i.category === activeCategory);
    
    // Simple sort logic (assuming _id or order can be used if projectDate is missing)
    if (sortBy === 'latest') {
      result = [...result].sort((a, b) => b.order - a.order);
    } else {
      result = [...result].sort((a, b) => a.order - b.order);
    }
    
    return result;
  }, [items, activeCategory, sortBy]);

  const handleNext = () => {
    if (!selectedProject) return;
    const currentIndex = filtered.findIndex(p => p._id === selectedProject._id);
    const nextIndex = (currentIndex + 1) % filtered.length;
    setSelectedProject(filtered[nextIndex]);
  };

  const handlePrev = () => {
    if (!selectedProject) return;
    const currentIndex = filtered.findIndex(p => p._id === selectedProject._id);
    const prevIndex = (currentIndex - 1 + filtered.length) % filtered.length;
    setSelectedProject(filtered[prevIndex]);
  };

  return (
    <div className="space-y-12">
      {/* Top Filter & Sort Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-white/5">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 font-display font-black text-[10px] tracking-[2px] uppercase transition-all duration-300 rounded-full border ${
                activeCategory === cat
                  ? 'bg-[var(--accent)] text-black border-[var(--accent)] shadow-[0_0_20px_rgba(200,255,0,0.2)]'
                  : 'border-white/10 text-white/40 hover:border-white/30 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/30">
            Showing <span className="text-white">{filtered.length}</span> projects
          </p>
          <div className="relative">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#111] border border-white/10 rounded-full px-6 py-2.5 font-display font-bold text-[10px] uppercase tracking-widest text-white/80 focus:outline-none focus:border-[var(--accent)] transition-colors cursor-pointer appearance-none pr-10"
            >
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
              ▼
            </div>
          </div>
        </div>
      </div>

      {/* Upwork Style Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((item) => (
            <motion.div
              key={item._id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <PortfolioCard 
                project={item} 
                onClick={() => setSelectedProject(item)} 
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Modal Viewer */}
      <PortfolioModal 
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
}
