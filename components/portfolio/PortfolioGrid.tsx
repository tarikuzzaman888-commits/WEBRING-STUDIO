'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { urlFor } from '@/sanity/lib/image';
import type { PortfolioItem } from '@/lib/types';

interface PortfolioGridProps {
  items: PortfolioItem[];
}

export default function PortfolioGrid({ items }: PortfolioGridProps) {
  const categories = ['All', ...Array.from(new Set(items.map(i => i.category).filter(Boolean)))];
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All' ? items : items.filter(i => i.category === activeCategory);

  return (
    <div>
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 font-mono text-xs tracking-[2px] uppercase transition-all duration-300 rounded-full rounded-[2rem] ${
              activeCategory === cat
                ? 'bg-[var(--accent)] text-[var(--accent-text)]'
                : 'border border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((item) => (
            <motion.div
              key={item._id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="break-inside-avoid"
            >
              <Link
                href={`/portfolio/${item.slug.current}`}
                className="group relative block overflow-hidden rounded-[2rem]"
              >
                <div className="relative aspect-[3/4]">
                  {item.mainImage?.asset ? (
                    <Image
                      src={urlFor(item.mainImage).width(600).height(800).url()}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[var(--surface)] flex items-center justify-center">
                      <span className="font-mono text-xs text-[var(--muted)]">No Image</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                    <span className="inline-block font-mono text-[10px] tracking-[3px] uppercase bg-[var(--accent)] text-[var(--accent-text)] px-2 py-0.5 mb-2 w-fit">
                      {item.category}
                    </span>
                    <h3 className="font-condensed font-black uppercase text-xl text-white flex items-center gap-2">
                      {item.title}
                      <ArrowUpRight className="w-4 h-4" />
                    </h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
