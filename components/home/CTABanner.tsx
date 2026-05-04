'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MoveUpRight } from 'lucide-react';

export default function CTABanner() {
  return (
    <section className="bg-[var(--accent)] py-24 md:py-32" id="cta-banner">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
          
          <div className="max-w-4xl">
            <motion.div 
              className="flex items-center gap-3 mb-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="font-mono text-[11px] tracking-[4px] uppercase text-[var(--accent-text)] font-bold">{'// LET\'S WORK TOGETHER'}</span>
            </motion.div>
            
            <motion.h2 
              className="font-display font-black uppercase text-5xl md:text-7xl lg:text-8xl leading-[0.9] text-[var(--accent-text)] mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Ready to make your product irresistible?
            </motion.h2>

            <motion.p 
              className="font-body text-[var(--accent-text)]/70 text-lg md:text-xl max-w-2xl"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Book a free 30-minute strategy call. We&apos;ll discuss your brand, your goals, and how we can help.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link
              href="/book"
              className="group flex items-center justify-center gap-3 px-8 py-4 border-2 border-[var(--accent-text)] text-[var(--accent-text)] rounded-full font-display font-black uppercase text-lg hover:bg-[var(--accent-text)] hover:text-[var(--accent)] transition-all duration-300"
            >
              Book a Call
              <MoveUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
