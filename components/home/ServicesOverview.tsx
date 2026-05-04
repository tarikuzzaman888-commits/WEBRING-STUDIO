'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import type { Service } from '@/lib/types';

interface ServicesOverviewProps {
  services: Service[] | null;
}

const fallbackServices = [
  {
    id: '01',
    title: 'AI Product Photography',
    description: 'Send us your raw product image. We transform it into a professional studio shot with perfect lighting, clean backgrounds, and commercial-grade quality.',
    features: [
      'White/gradient studio backgrounds',
      'Shadow & reflection work',
      'Color correction & retouching',
      'Multi-angle variations',
      'Amazon & Shopify optimized'
    ],
    image: '/images/hero/watch.png'
  },
  {
    id: '02',
    title: 'Lifestyle Photography',
    description: 'Place your product in stunning lifestyle scenes without an expensive photoshoot. AI-generated environments create believable, aspirational imagery.',
    features: [
      'Home, outdoor, luxury scenes',
      'Model integration (AI)',
      'Platform-specific sizing',
      'Seasonal/thematic variations'
    ],
    image: '/images/hero/perfume.png',
    highlight: true
  },
  {
    id: '03',
    title: 'E-commerce Visual Package',
    description: 'A complete image set for your e-commerce platform — hero images, detail shots, infographics, and lifestyle images in one cohesive package.',
    features: [
      'Main listing image',
      'Feature highlight images',
      'Comparison & infographic images',
      'A+ Content / EBC images',
      'Mobile-optimized crops'
    ],
    image: '/images/hero/camera.png'
  },
  {
    id: '04',
    title: 'Brand Identity',
    description: 'Complete brand identity design — logo, color system, typography, brand guidelines, and social media presence so your brand is instantly recognizable.',
    features: [
      'Logo design',
      'Color & typography system',
      'Brand guideline document',
      'Social media templates',
      'Business card & stationery'
    ],
    image: '/images/hero/sneaker.png'
  }
];

export default function ServicesOverview({ services }: ServicesOverviewProps) {
  // Use data from backend if available, otherwise use fallback
  const items = services && services.length > 0 
    ? services.map((s, i) => ({
        id: (i + 1).toString().padStart(2, '0'),
        title: s.title,
        description: s.description,
        features: s.features || [],
        image: s.image ? urlFor(s.image).width(600).height(450).url() : fallbackServices[i % 4].image,
        highlight: i === 1 // Just for demo, first card highlighted
      }))
    : fallbackServices; 

  return (
    <section className="py-24 md:py-32 bg-[var(--bg)]" id="services">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <motion.div 
              className="flex items-center gap-3 mb-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="font-mono text-[11px] tracking-[4px] uppercase text-[var(--accent)]">// WHAT WE DO</span>
            </motion.div>
            <motion.h2 
              className="font-display font-black uppercase text-5xl md:text-6xl lg:text-7xl leading-none text-[var(--text)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Our Services
            </motion.h2>
          </div>
          
          <motion.p 
            className="font-body text-[var(--muted)] text-base md:text-lg max-w-md lg:text-right"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            We combine cutting-edge AI tools with expert human editing to deliver visuals that convert.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((service, i) => (
            <motion.div
              key={service.id}
              className={`group flex flex-col bg-[#0D0D0D] border ${service.highlight ? 'border-[var(--accent)]' : 'border-[#1A1A1A]'} rounded-[2rem] overflow-hidden transition-all duration-300 hover:border-[var(--accent)]/50`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image 
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Content Container */}
              <div className="p-8 flex flex-col flex-grow">
                <span className="font-display font-black text-xs text-[var(--accent)] mb-4 tracking-tighter">
                  {service.id}
                </span>
                
                <h3 className="font-display font-black uppercase text-2xl text-white mb-4 leading-tight">
                  {service.title}
                </h3>
                
                <p className="font-body text-xs text-white/60 leading-relaxed mb-8">
                  {service.description}
                </p>

                {/* Features List */}
                <ul className="mt-auto space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-3.5 h-3.5 text-[var(--accent)] mt-0.5 shrink-0" />
                      <span className="font-body text-[11px] text-white/80 leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
