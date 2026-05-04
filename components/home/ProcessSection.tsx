'use client';

import { motion } from 'framer-motion';
import SectionHeading from '@/components/shared/SectionHeading';

const steps = [
  { num: '01', title: 'Consult', description: 'We learn your brand, goals, and visual needs in a free strategy call.' },
  { num: '02', title: 'Create', description: 'Our team crafts AI-generated concepts and initial visual directions.' },
  { num: '03', title: 'Refine', description: 'We iterate based on your feedback until every pixel is perfect.' },
  { num: '04', title: 'Deliver', description: 'Final assets delivered in all formats, optimized for every platform.' },
];

export default function ProcessSection() {
  return (
    <section className="py-24 md:py-32 bg-[var(--surface)]" id="process">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeading
          label="// Process"
          title="How we work."
          subtitle="From consultation to delivery — our battle-tested 4-step process."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              {/* Connector Line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-[var(--border)]" />
              )}

              <span className="font-mono text-[11px] tracking-[4px] text-[var(--accent)] block mb-4">
                {step.num}
              </span>
              <h3 className="font-display font-black uppercase text-2xl text-[var(--text)] mb-3">
                {step.title}
              </h3>
              <p className="font-body text-sm text-[var(--muted)] leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
