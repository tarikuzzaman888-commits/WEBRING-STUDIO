'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Play, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { urlFor } from '@/sanity/lib/image';
import { cn } from '@/lib/utils';
import type { HomePage, SanityImage } from '@/lib/types';

// Define a type for carousel images that includes our dummy property
type CarouselImage = SanityImage & { _dummyUrl?: string };

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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const subtitle = data?.heroSubtitle || 'From raw product shots to studio-perfect imagery — powered by AI, crafted by humans. Based in Bangladesh, serving brands worldwide.';
  
  // Combine main image, gallery images, and dummy images for preview
  const allImages = useMemo(() => {
    const images: CarouselImage[] = [];
    if (data?.heroMainImage) images.push(data.heroMainImage);
    if (data?.heroImages && data.heroImages.length > 0) {
      images.push(...data.heroImages);
    }
    
    // Add dummy images if less than 2 images are available
    if (images.length < 2) {
      const dummyUrls = [
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop", // Luxury Watch
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop", // Pro Headphones
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=800&auto=format&fit=crop", // Camera Gear
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop", // Luxury Shoes
        "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?q=80&w=800&auto=format&fit=crop"  // Skincare Product
      ];
      // Convert URL strings to a format the Image component can handle alongside Sanity images
      return [...images, ...dummyUrls.map(url => ({ _type: 'image', _dummyUrl: url } as CarouselImage))];
    }
    
    return images;
  }, [data]);

  const nextSlide = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  }, [allImages.length]);

  const prevSlide = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  }, [allImages.length]);

  // Auto-slide effect
  useEffect(() => {
    if (allImages.length <= 1) return;
    
    const interval = setInterval(nextSlide, 5000); 

    return () => clearInterval(interval);
  }, [allImages.length, nextSlide]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden pt-40 lg:pt-24 pb-16">
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-6 xl:col-span-7 flex flex-col items-start">
            
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
              className="font-display font-black uppercase tracking-tight text-[3.8rem] md:text-[5.5rem] lg:text-[5rem] xl:text-[7rem] leading-[0.9] text-[var(--text)] mb-8 whitespace-nowrap lg:whitespace-normal"
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

          {/* Right — Image Carousel */}
          <div className="lg:col-span-6 xl:col-span-5 relative w-full aspect-[4/5] md:aspect-square lg:aspect-[4/5] xl:aspect-[3/3.5] rounded-xl overflow-hidden mt-8 lg:mt-0 bg-[var(--surface)] group">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                className="w-full h-full relative cursor-grab active:cursor-grabbing"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(_, info) => {
                  if (info.offset.x > 100) prevSlide();
                  else if (info.offset.x < -100) nextSlide();
                }}
              >
                {allImages.length > 0 ? (
                  <Image
                    src={allImages[currentImageIndex]._dummyUrl || urlFor(allImages[currentImageIndex]).width(800).height(1000).url()}
                    alt={`WEBRING Visual Engineering ${currentImageIndex + 1}`}
                    fill
                    className="object-cover pointer-events-none"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                ) : (
                  <Image
                    src="https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=800&auto=format&fit=crop" 
                    alt="WEBRING Visual Engineering Fallback"
                    fill
                    className="object-cover pointer-events-none"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                )}

                {/* Floating Badge on Image */}
                <motion.div 
                  className="absolute top-6 left-[-1rem] md:left-[-2rem] bg-[var(--accent)] text-[var(--accent-text)] px-4 py-2 rounded-full font-display text-[10px] font-black tracking-widest uppercase z-20 shadow-xl"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  AI PRODUCTION PIPELINE
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Desktop Navigation Arrows */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[var(--accent)] hover:border-[var(--accent)] z-40 hidden md:flex"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[var(--accent)] hover:border-[var(--accent)] z-40 hidden md:flex"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Navigation Dots */}
            {allImages.length > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30">
                {allImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all duration-300",
                      idx === currentImageIndex 
                        ? "bg-[var(--accent)] w-6" 
                        : "bg-white/30 hover:bg-white/50"
                    )}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
