'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, Briefcase, ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';
import type { PortfolioItem } from '@/lib/types';
import BeforeAfterSlider from '@/components/portfolio/BeforeAfterSlider';

interface PortfolioDetailClientProps {
  project: PortfolioItem;
}

export default function PortfolioDetailClient({ project }: PortfolioDetailClientProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = project.projectImages || [];
  const currentImage = images[currentImageIndex];
  
  const beforeImage = images.find(img => img.isBeforeImage);
  const afterImage = images.find(img => img.isAfterImage);
  const showSlider = currentImageIndex === 0 && beforeImage && afterImage;

  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-12">
      {/* Back Button */}
      <Link 
        href="/portfolio"
        className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[3px] text-white/40 hover:text-[var(--accent)] transition-colors mb-12"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Portfolio
      </Link>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
        {/* LEFT: IMAGE VIEWER */}
        <div className="lg:w-[60%] space-y-8">
          <div className="relative aspect-[4/3] bg-black rounded-[2.5rem] overflow-hidden border border-white/10 group">
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full flex items-center justify-center"
              >
                {showSlider ? (
                  <BeforeAfterSlider 
                    beforeImage={urlFor(beforeImage.image).width(1200).url()}
                    afterImage={urlFor(afterImage.image).width(1200).url()}
                  />
                ) : (
                  <Image 
                    src={currentImage?.image?.asset ? urlFor(currentImage.image).width(1200).url() : (project.coverImage?.asset ? urlFor(project.coverImage).width(1200).url() : (project.fallbackUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop'))}
                    alt={currentImage?.caption || project.title}
                    fill
                    className="object-contain"
                    priority
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Nav Arrows */}
            {images.length > 1 && (
              <>
                <button 
                  onClick={() => setCurrentImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1))}
                  className="absolute left-6 top-1/2 -translate-y-1/2 p-4 bg-black/40 hover:bg-black/60 rounded-full text-white backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                  onClick={() => setCurrentImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1))}
                  className="absolute right-6 top-1/2 -translate-y-1/2 p-4 bg-black/40 hover:bg-black/60 rounded-full text-white backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Counter */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-black text-white border border-white/10 uppercase tracking-widest">
              {currentImageIndex + 1} / {Math.max(images.length, 1)}
            </div>
          </div>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
              {images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`relative flex-shrink-0 w-28 aspect-square rounded-2xl overflow-hidden border-2 transition-all ${
                    currentImageIndex === idx ? 'border-[var(--accent)] scale-105' : 'border-transparent opacity-40 hover:opacity-100'
                  }`}
                >
                  <Image 
                    src={img.image?.asset ? urlFor(img.image).width(200).url() : (project.fallbackUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=200&auto=format&fit=crop')}
                    alt="Thumbnail"
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: INFO PANEL */}
        <div className="lg:w-[40%]">
          <div className="sticky top-32">
            <div className="flex flex-wrap gap-2 mb-8">
              <span className="px-4 py-1.5 bg-[var(--accent)] text-black rounded-full font-display font-black text-[11px] uppercase tracking-wider">
                {project.category}
              </span>
              {project.clientIndustry && (
                <span className="px-4 py-1.5 bg-white/5 border border-white/10 text-white/60 rounded-full font-mono text-[10px] uppercase tracking-widest">
                  {project.clientIndustry}
                </span>
              )}
            </div>

            <h1 className="font-display font-black uppercase text-4xl md:text-5xl text-white mb-8 leading-tight">
              {project.title}
            </h1>

            <div className="grid grid-cols-2 gap-6 mb-10 py-6 border-y border-white/5">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-[var(--accent)]" />
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-white/30 mb-1">Date</p>
                  <p className="font-display font-bold text-xs text-white">{project.projectDate || 'Recent'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Briefcase className="w-5 h-5 text-[var(--accent)]" />
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-white/30 mb-1">Status</p>
                  <p className="font-display font-bold text-xs text-white">Verified Project</p>
                </div>
              </div>
            </div>

            <div className="prose prose-invert max-w-none mb-12">
              <p className="font-body text-white/70 leading-relaxed text-base md:text-lg">
                {project.fullDescription || project.shortDescription}
              </p>
            </div>

            {/* Results */}
            {project.results && project.results.length > 0 && (
              <div className="mb-12">
                <p className="font-mono text-[10px] uppercase tracking-[4px] text-white/30 mb-6">Impact Metrics</p>
                <div className="grid grid-cols-2 gap-4">
                  {project.results.map((res, i) => (
                    <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-3xl group hover:border-[var(--accent)]/30 transition-colors">
                      <p className="font-display font-black text-3xl text-[var(--accent)] mb-1">{res.value}</p>
                      <p className="font-display font-bold text-[10px] uppercase tracking-widest text-white/80">{res.metric}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tools */}
            {project.tools && project.tools.length > 0 && (
              <div className="mb-12">
                <p className="font-mono text-[10px] uppercase tracking-[4px] text-white/30 mb-6">Tools & Technology</p>
                <div className="flex flex-wrap gap-3">
                  {project.tools.map(tool => (
                    <span key={tool} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl font-display font-bold text-[11px] text-white/80">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <Link 
              href="/book" 
              className="w-full py-6 bg-[var(--accent)] text-black rounded-full font-display font-black uppercase text-sm tracking-[4px] flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_50px_rgba(200,255,0,0.2)]"
            >
              Start Similar Project
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
