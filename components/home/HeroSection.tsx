'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Play, Sparkles } from 'lucide-react';
import { urlFor } from '@/sanity/lib/image';
import type { HomePage } from '@/lib/types';

interface HeroSectionProps {
  data: HomePage | null;
}

const textAnimation = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function HeroSection({ data }: HeroSectionProps) {
  const subtitle = data?.heroSubtitle || 'From raw product shots to studio-perfect imagery — powered by AI, crafted by humans. Based in Bangladesh, serving brands worldwide.';
  const heroImage = data?.heroImages?.[0]; // Get the first image from Sanity or fallback

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden pt-40 lg:pt-24 pb-16">
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-6 flex flex-col items-start">
            
            {/* Badge */}
            <motion.div
              className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--accent)]/30 mb-8"
              custom={0}
              initial="hidden"
              animate="visible"
              variants={textAnimation}
            >
              <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span className="font-display text-[10px] md:text-[11px] font-bold tracking-widest uppercase text-[var(--accent)]">
                AI × PHOTOGRAPHY × BRANDING
              </span>
            </motion.div>

            {/* Giant Heading */}
            <motion.h1 
              className="font-display font-black uppercase tracking-tight text-[4.5rem] md:text-[6rem] lg:text-[7rem] leading-[0.9] text-[var(--text)] mb-8"
              custom={1}
              initial="hidden"
              animate="visible"
              variants={textAnimation}
            >
              WE<br />
              ENGINEER<br />
              VISUAL<br />
              REALITY.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="font-body text-[var(--muted)] text-base md:text-lg max-w-xl mb-10 leading-relaxed"
              custom={2}
              initial="hidden"
              animate="visible"
              variants={textAnimation}
            >
              {subtitle}
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap items-center gap-4"
              custom={3}
              initial="hidden"
              animate="visible"
              variants={textAnimation}
            >
              <Link
                href="/book"
                id="hero-cta-book"
                className="group flex items-center gap-2 px-6 py-3.5 bg-[var(--accent)] text-[var(--accent-text)] font-display text-xs font-black tracking-wider uppercase rounded-full hover:scale-105 transition-all duration-300"
              >
                BOOK A CALL
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              <Link
                href="/portfolio"
                id="hero-cta-work"
                className="group flex items-center gap-2 px-6 py-3.5 border border-[var(--border)] text-[var(--text)] font-display text-xs font-black tracking-wider uppercase rounded-full hover:bg-[var(--surface)] transition-all duration-300"
              >
                SEE OUR WORK
                <Play className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* Right — Single Large Image */}
          <div className="lg:col-span-6 relative w-full aspect-[4/5] md:aspect-square lg:aspect-[4/5] xl:aspect-[3/3.5] rounded-xl overflow-hidden mt-8 lg:mt-0">
            <motion.div
              className="w-full h-full relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {heroImage ? (
                <Image
                  src={urlFor(heroImage).width(800).height(1000).url()}
                  alt="WEBRING Visual Engineering"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <Image
                  src="https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=800&auto=format&fit=crop" 
                  alt="WEBRING Visual Engineering"
                  fill
                  className="object-cover bg-[var(--surface)]"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              )}

              {/* Floating Badge on Image */}
              <motion.div 
                className="absolute top-6 left-[-1rem] md:left-[-2rem] bg-[var(--accent)] text-[var(--accent-text)] px-4 py-2 rounded-full font-display text-[10px] font-black tracking-widest uppercase z-20 shadow-xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                AI PRODUCTION PIPELINE
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
