'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowDown } from 'lucide-react';
import { urlFor } from '@/sanity/lib/image';
import type { HomePage } from '@/lib/types';

interface HeroSectionProps {
  data: HomePage | null;
}

const wordAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.04,
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function HeroSection({ data }: HeroSectionProps) {
  const line1 = data?.heroLine1 || 'We Engineer';
  const line2 = data?.heroLine2 || 'Reality.';
  const subtitle = data?.heroSubtitle || 'AI VISUALS. STUDIO PRECISION. Scale your product imagery from raw to premium — instantly. Built for brands that move fast.';
  const socialProof = data?.socialProof || 'Trusted by 200+ brands across 15 countries';
  const cta1 = data?.cta1Text || 'See Our Work';
  const cta2 = data?.cta2Text || 'Book a Free Call';
  const heroImages = data?.heroImages || [];

  const allWords = [...line1.split(' '), ...line2.split(' ')];
  const line1Words = line1.split(' ');

  return (
    <section id="hero" className="relative h-screen min-h-[600px] flex items-center overflow-hidden pt-12 md:pt-20">
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 w-full pt-12 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="lg:col-span-7">
            {/* Label */}
            <motion.div
              className="flex items-center gap-4 mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-8 h-px bg-[var(--accent)]" />
              <span className="font-mono text-[11px] tracking-[4px] uppercase text-[var(--accent)]">
                AI-POWERED PRODUCT PHOTOGRAPHY
              </span>
            </motion.div>

            {/* Giant Heading */}
            <h1 className="font-display font-black uppercase tracking-tight text-[3.2rem] md:text-[4.5rem] lg:text-[5.5rem] leading-[0.9] mb-5">
              {allWords.map((word, i) => (
                <motion.span
                  key={i}
                  className={`inline-block mr-[0.3em] ${i >= line1Words.length ? 'text-gradient' : ''}`}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={wordAnimation}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* Subtitle */}
            <motion.p
              className="font-body text-[var(--muted)] text-base md:text-lg max-w-xl mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.35 }}
            >
              {subtitle}
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.35 }}
            >
              <Link
                href="/portfolio"
                id="hero-cta-work"
                className="px-8 py-3.5 bg-[var(--accent)] text-[var(--accent-text)] font-body text-sm font-extrabold uppercase rounded-full rounded-[2rem] hover:shadow-lg hover:shadow-[var(--accent)]/30 transition-all duration-300"
              >
                {cta1}
              </Link>
              <Link
                href="/book"
                id="hero-cta-book"
                className="px-8 py-3.5 border-2 border-[var(--accent)] text-[var(--accent)] font-body text-sm font-extrabold uppercase rounded-full rounded-[2rem] bg-transparent hover:bg-[var(--accent)] hover:text-[var(--accent-text)] transition-all duration-300"
              >
                {cta2}
              </Link>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.35 }}
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-[var(--surface)] border-2 border-[var(--bg)] flex items-center justify-center"
                  >
                    <span className="text-[10px] text-[var(--muted)] font-mono">★</span>
                  </div>
                ))}
              </div>
              <span className="font-body text-sm text-[var(--muted)]">{socialProof}</span>
            </motion.div>
          </div>

          {/* Right — Masonry Image Grid */}
          <div className="lg:col-span-5 hidden lg:block">
            <div className="grid grid-cols-2 gap-3">
              {heroImages.length > 0 ? (
                heroImages.slice(0, 6).map((img, i) => (
                  <motion.div
                    key={i}
                    className={`relative overflow-hidden rounded-[2rem] ${
                      i % 3 === 0 ? 'aspect-[3/4]' : i % 3 === 1 ? 'aspect-square' : 'aspect-[4/5]'
                    }`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                  >
                    <Image
                      src={urlFor(img).width(400).height(500).url()}
                      alt={`WEBRING showcase ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="200px"
                    />
                  </motion.div>
                ))
              ) : (
                [
                  { src: '/images/hero/watch.png', aspect: 'aspect-[4/5]' },
                  { src: '/images/hero/perfume.png', aspect: 'aspect-[4/5]' },
                  { src: '/images/hero/camera.png', aspect: 'aspect-[4/5]' },
                  { src: '/images/hero/sneaker.png', aspect: 'aspect-[4/5]' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className={`relative overflow-hidden rounded-[2rem] bg-[var(--surface)] border border-[var(--border)] ${item.aspect}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                  >
                    <Image
                      src={item.src}
                      alt={`WEBRING showcase ${i + 1}`}
                      fill
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                      sizes="300px"
                    />
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ArrowDown className="w-5 h-5 text-[var(--accent)]" />
      </motion.div>
    </section>
  );
}
