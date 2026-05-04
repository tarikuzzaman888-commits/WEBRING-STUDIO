'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import { urlFor } from '@/sanity/lib/image';
import type { PortfolioItem } from '@/lib/types';

interface PortfolioPreviewProps {
  items: PortfolioItem[] | null;
}

export default function PortfolioPreview({ items }: PortfolioPreviewProps) {
  const portfolioItems = items && items.length > 0 ? items : [];

  return (
    <section className="py-24 md:py-32" id="portfolio-preview">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeading
          label="Selected Work"
          title="Crafted to convert."
          subtitle="A curated selection of our AI-powered product photography and branding work."
        />

        {portfolioItems.length > 0 ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {portfolioItems.map((item, i) => (
              <motion.div
                key={item._id}
                className="break-inside-avoid"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
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
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                      <span className="font-mono text-xs text-[#C8A96E] tracking-wider uppercase mb-1">
                        {item.category}
                      </span>
                      <h3 className="font-display text-xl text-white flex items-center gap-2">
                        {item.title}
                        <ArrowUpRight className="w-4 h-4" />
                      </h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                className="aspect-[3/4] bg-surface border border-border rounded-xl flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-center">
                  <span className="font-mono text-xs text-muted/40">Add portfolio items</span>
                  <br />
                  <span className="font-mono text-xs text-muted/40">in Sanity Studio</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Link
            href="/portfolio"
            id="view-all-work"
            className="inline-flex items-center gap-2 font-body text-sm text-foreground hover:text-accent transition-colors group"
          >
            View All Work
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
