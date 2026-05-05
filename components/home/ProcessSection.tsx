'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import SectionHeading from '@/components/shared/SectionHeading';

const steps = [
  { 
    num: '01', 
    title: 'Consult', 
    description: 'We learn your brand, goals, and visual needs in a free strategy call.',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=600&auto=format&fit=crop' // Strategy/Meeting
  },
  { 
    num: '02', 
    title: 'Create', 
    description: 'Our team crafts AI-generated concepts and initial visual directions.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop' // AI Art/Creative
  },
  { 
    num: '03', 
    title: 'Refine', 
    description: 'We iterate based on your feedback until every pixel is perfect.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop' // Tech/Detail
  },
  { 
    num: '04', 
    title: 'Deliver', 
    description: 'Final assets delivered in all formats, optimized for every platform.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop' // Data/Delivery
  },
];

export default function ProcessSection() {
  return (
    <section className="py-24 md:py-32 bg-[var(--bg)] relative overflow-hidden" id="process">
      <div className="grain-overlay" />
      
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeading
          label="// Process"
          title="How we work."
          subtitle="From consultation to delivery — our battle-tested 4-step process."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              className="group relative flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-8 border border-[var(--border)] group-hover:border-[var(--accent)]/50 transition-colors duration-500">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                
                {/* Step Number Overlay */}
                <div className="absolute top-4 left-4 bg-[var(--accent)] text-[var(--accent-text)] font-mono text-[10px] font-bold px-2.5 py-1 rounded-md shadow-xl">
                  {step.num}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col">
                <h3 className="font-display font-black uppercase text-2xl tracking-tight text-[var(--text)] mb-3 group-hover:text-[var(--accent)] transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="font-body text-sm text-[var(--muted)] leading-relaxed max-w-[90%]">
                  {step.description}
                </p>
              </div>

              {/* Decorative Line (Desktop only) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-5 top-1/2 w-10 h-[1px] bg-gradient-to-r from-[var(--border)] to-transparent z-20" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
