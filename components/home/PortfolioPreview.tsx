'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import { urlFor } from '@/sanity/lib/image';
import type { PortfolioItem } from '@/lib/types';

interface PortfolioPreviewProps {
  items: PortfolioItem[] | null;
}

export default function PortfolioPreview({ items }: PortfolioPreviewProps) {
  const hasItems = items && items.length > 0;

  return (
    <section className="py-24 md:py-32" id="portfolio-preview">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-16">
          <SectionHeading
            label="// Portfolio"
            title="Selected work."
            subtitle="A curated selection of our recent projects."
          />
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 font-body text-sm text-[var(--accent)] hover:underline mt-4 sm:mt-0 sm:pb-8"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {hasItems ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {items.slice(0, 6).map((item, i) => (
              <motion.div
                key={item._id}
                className="break-inside-avoid"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
              >
                <Link
                  href={`/portfolio/${item.slug.current}`}
                  className="group relative block overflow-hidden rounded-[2rem]"
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
          </div>
        ) : (
          <div className="text-center py-20 bg-[var(--surface)] rounded-[2rem] border border-[var(--border)]">
            <p className="font-display uppercase text-2xl text-[var(--text)] mb-4">Portfolio Coming Soon</p>
            <p className="font-body text-[var(--muted)]">
              Add portfolio items through Sanity Studio at <code className="font-mono text-[var(--accent)] text-sm">/studio</code>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
