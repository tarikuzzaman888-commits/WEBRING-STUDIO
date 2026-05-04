'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { urlFor } from '@/sanity/lib/image';
import type { PortfolioItem } from '@/lib/types';

const categories = ['All', 'AI Photography', 'Lifestyle', 'E-commerce', 'Branding', 'Video'];

interface PortfolioGridProps {
  items: PortfolioItem[];
}

export default function PortfolioGrid({ items }: PortfolioGridProps) {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredItems = activeFilter === 'All'
    ? items
    : items.filter((item) => item.category === activeFilter);

  return (
    <div>
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-3 mb-12" id="portfolio-filters">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-5 py-2 rounded-full font-mono text-xs tracking-wider transition-all duration-300 ${
              activeFilter === cat
                ? 'bg-accent text-[#0A0A0A]'
                : 'border border-border text-muted hover:border-accent hover:text-accent'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.div
              key={item._id}
              layout
              className="break-inside-avoid"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                href={`/portfolio/${item.slug.current}`}
                className="group relative block overflow-hidden rounded-xl"
              >
                <div className="relative aspect-[3/4]">
                  <Image
                    src={urlFor(item.mainImage).width(600).height(800).url()}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                    <span className="font-mono text-[10px] text-[#C8A96E] tracking-wider uppercase mb-1">
                      {item.category}
                    </span>
                    <h3 className="font-display text-xl text-white flex items-center gap-2">
                      {item.title}
                      <ArrowUpRight className="w-4 h-4" />
                    </h3>
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex gap-2 mt-2">
                        {item.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="font-mono text-[9px] text-white/60 bg-white/10 px-2 py-0.5 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredItems.length === 0 && (
        <div className="text-center py-20">
          <p className="font-body text-muted">No items found in this category.</p>
        </div>
      )}
    </div>
  );
}
