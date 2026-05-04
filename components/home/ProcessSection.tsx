'use client';

import { motion } from 'framer-motion';
import SectionHeading from '@/components/shared/SectionHeading';

const steps = [
  {
    number: '01',
    title: 'Send Your Product',
    description: 'Ship your product to us or provide high-res reference images. We handle the rest.',
  },
  {
    number: '02',
    title: 'We Consult',
    description: 'Our creative team studies your brand, audience, and competitors to craft the perfect visual strategy.',
  },
  {
    number: '03',
    title: 'AI + Human Magic',
    description: 'We combine cutting-edge AI tools with human artistry to create visuals that are indistinguishable from reality.',
  },
  {
    number: '04',
    title: 'Deliver & Iterate',
    description: 'Receive your final assets in all formats. We refine until you are 100% satisfied.',
  },
];

export default function ProcessSection() {
  return (
    <section className="py-24 md:py-32 bg-surface" id="process-section">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeading
          label="How It Works"
          title="From concept to conversion."
          subtitle="A streamlined 4-step process that turns your products into visual stories."
        />

        <div className="relative">
          {/* Connecting Line (desktop) */}
          <div className="hidden lg:block absolute top-[60px] left-0 right-0 h-px bg-border" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                className="relative text-center lg:text-left"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
              >
                {/* Large Gold Number */}
                <div className="relative z-10 inline-flex items-center justify-center w-[80px] h-[80px] lg:w-[100px] lg:h-[100px] mb-6">
                  <span className="font-display text-5xl lg:text-6xl text-accent/20">
                    {step.number}
                  </span>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-accent" />
                  </div>
                </div>

                <h3 className="font-display text-xl mb-3 text-foreground">
                  {step.title}
                </h3>
                <p className="font-body text-sm text-muted leading-relaxed max-w-xs mx-auto lg:mx-0">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
