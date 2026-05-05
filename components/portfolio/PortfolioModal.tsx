'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Calendar, Briefcase, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';
import type { PortfolioItem } from '@/lib/types';
import BeforeAfterSlider from './BeforeAfterSlider';

interface PortfolioModalProps {
  project: PortfolioItem | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export default function PortfolioModal({ project, onClose, onNext, onPrev }: PortfolioModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Reset index when project changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [project]);

  // Handle Keyboard Nav
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNext) onNext();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  // Body Scroll Lock
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [project]);

  if (!project) return null;

  const images = project.projectImages || [];
  const currentImage = images[currentImageIndex];
  
  // Find before/after pairs for the current index or adjacent
  const beforeImage = images.find(img => img.isBeforeImage);
  const afterImage = images.find(img => img.isAfterImage);
  const showSlider = currentImageIndex === 0 && beforeImage && afterImage;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-xl"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 md:top-10 md:right-10 z-[110] p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all text-white"
        >
          <X className="w-6 h-6" />
        </button>

        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="bg-[#0D0D0D] w-full max-w-7xl h-full max-h-[90vh] rounded-[2rem] border border-white/10 overflow-hidden flex flex-col lg:flex-row relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* LEFT: IMAGE VIEWER (60%) */}
          <div className="lg:w-[65%] h-1/2 lg:h-full bg-black relative flex flex-col">
            <div className="flex-grow relative flex items-center justify-center p-4">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentImageIndex + project._id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="relative w-full h-full flex items-center justify-center"
                >
                  {showSlider ? (
                    <BeforeAfterSlider 
                      beforeImage={urlFor(beforeImage.image).width(1200).url()}
                      afterImage={urlFor(afterImage.image).width(1200).url()}
                    />
                  ) : (
                    <div className="relative w-full h-full">
                      <Image 
                        src={currentImage?.image?.asset ? urlFor(currentImage.image).width(1200).url() : (project.fallbackUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop')}
                        alt={currentImage?.caption || project.title}
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Image Navigation */}
              {images.length > 1 && (
                <>
                  <button 
                    onClick={() => setCurrentImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1))}
                    className="absolute left-4 p-3 bg-black/40 hover:bg-black/60 rounded-full text-white backdrop-blur-md border border-white/10 transition-all"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button 
                    onClick={() => setCurrentImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1))}
                    className="absolute right-4 p-3 bg-black/40 hover:bg-black/60 rounded-full text-white backdrop-blur-md border border-white/10 transition-all"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Counter */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-black text-white border border-white/10 uppercase tracking-widest">
                {currentImageIndex + 1} / {Math.max(images.length, 1)}
              </div>
            </div>

            {/* Thumbnail Strip */}
            {images.length > 1 && (
              <div className="h-24 bg-[#0A0A0A] border-t border-white/5 p-4 flex gap-3 overflow-x-auto no-scrollbar">
                {images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`relative flex-shrink-0 w-20 h-full rounded-lg overflow-hidden border-2 transition-all ${
                      currentImageIndex === idx ? 'border-[var(--accent)] scale-105' : 'border-transparent opacity-40 grayscale hover:grayscale-0 hover:opacity-100'
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

          {/* RIGHT: INFO PANEL (35%) */}
          <div className="lg:w-[35%] h-1/2 lg:h-full bg-[#0D0D0D] p-8 md:p-10 overflow-y-auto custom-scrollbar border-l border-white/10">
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 bg-[var(--accent)] text-black rounded-full font-display font-black text-[10px] uppercase tracking-wider">
                {project.category}
              </span>
              {project.clientIndustry && (
                <span className="px-3 py-1 bg-white/5 border border-white/10 text-white/60 rounded-full font-mono text-[9px] uppercase tracking-widest">
                  {project.clientIndustry}
                </span>
              )}
            </div>

            <h2 className="font-display font-black uppercase text-3xl md:text-4xl text-white mb-6 leading-tight">
              {project.title}
            </h2>

            <div className="flex items-center gap-6 mb-8 py-4 border-y border-white/5">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[var(--accent)]" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                  {project.projectDate || 'Recent'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[var(--accent)]" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">Verified Project</span>
              </div>
            </div>

            <div className="prose prose-invert max-w-none mb-10">
              <p className="font-body text-white/70 leading-relaxed text-sm md:text-base">
                {project.fullDescription || project.shortDescription}
              </p>
            </div>

            {/* Tools */}
            {project.tools && project.tools.length > 0 && (
              <div className="mb-10">
                <p className="font-mono text-[10px] uppercase tracking-[3px] text-white/30 mb-4">Tools Used</p>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map(tool => (
                    <span key={tool} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg font-display font-bold text-[10px] text-white/80">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Results */}
            {project.results && project.results.length > 0 && (
              <div className="mb-10">
                <p className="font-mono text-[10px] uppercase tracking-[3px] text-white/30 mb-4">Project Impact</p>
                <div className="grid grid-cols-2 gap-4">
                  {project.results.map((res, i) => (
                    <div key={i} className="p-4 bg-[var(--accent)]/5 border border-[var(--accent)]/10 rounded-2xl">
                      <p className="font-display font-black text-2xl text-[var(--accent)] mb-1">{res.value}</p>
                      <p className="font-display font-bold text-[9px] uppercase tracking-widest text-white/80">{res.metric}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Link 
              href="/book" 
              className="w-full py-5 bg-[var(--accent)] text-black rounded-full font-display font-black uppercase text-xs tracking-[3px] flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_10px_40px_rgba(200,255,0,0.1)] mb-12"
            >
              Book Similar Project
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Modal Navigation */}
            <div className="flex items-center justify-between pt-8 border-t border-white/5">
              <button 
                onClick={onPrev}
                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-[var(--accent)] transition-colors group"
              >
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Prev Project
              </button>
              <button 
                onClick={onNext}
                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-[var(--accent)] transition-colors group"
              >
                Next Project
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
