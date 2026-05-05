'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import type { PortfolioItem } from '@/lib/types';
import { ImageIcon } from 'lucide-react';

interface PortfolioCardProps {
  project: PortfolioItem;
  onClick: () => void;
}

export default function PortfolioCard({ project, onClick }: PortfolioCardProps) {
  const imageCount = project.projectImages?.length || 1;

  return (
    <motion.div 
      layout
      className="relative aspect-square group cursor-pointer overflow-hidden bg-[#111] rounded-2xl"
      onClick={onClick}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background Image */}
      <Image 
        src={project.coverImage?.asset ? urlFor(project.coverImage).width(800).height(800).url() : (project.fallbackUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop')}
        alt={project.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />

      {/* Hover Overlay */}
      <motion.div 
        className="absolute inset-0 bg-black/80 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-full group-hover:translate-y-0"
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 bg-[var(--accent)] text-black rounded-full font-display font-black text-[9px] uppercase tracking-wider">
              {project.category}
            </span>
            <div className="flex items-center gap-1.5 text-white/60 text-[10px] font-bold">
              <ImageIcon className="w-3.5 h-3.5" />
              {imageCount}
            </div>
          </div>
          
          <h3 className="font-display font-black text-xl text-white uppercase leading-tight">
            {project.title}
          </h3>
          
          <p className="font-body text-white/60 text-[11px] line-clamp-1 italic mb-2">
            {project.shortDescription || 'View project details'}
          </p>

          <div className="flex items-center gap-2 text-[var(--accent)] font-display font-black text-[10px] uppercase tracking-widest pt-2 border-t border-white/10">
            View Project
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              →
            </motion.span>
          </div>
        </div>
      </motion.div>

      {/* Static Label (Mobile/Always visible fallback if needed) */}
      <div className="absolute top-4 left-4 z-10 lg:opacity-0 lg:group-hover:opacity-0 transition-opacity">
         <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-white rounded-full font-display font-black text-[9px] uppercase tracking-wider border border-white/10">
           {project.category}
         </span>
      </div>
    </motion.div>
  );
}
