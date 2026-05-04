'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface CTABannerProps {
  heading?: string;
  subtext?: string;
}

export default function CTABanner({ heading, subtext }: CTABannerProps) {
  return (
    <section className="relative overflow-hidden" id="cta-banner">
      <div className="bg-[var(--surface-2)] py-24 md:py-32 border-y border-[var(--border)]">
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 text-center">
          <motion.h2
            className="font-display font-black uppercase tracking-tight text-display-lg text-[var(--text)] mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {heading || 'FROM RAW TO PREMIUM.'}
          </motion.h2>
          <motion.p
            className="font-body text-[var(--muted)] text-lg mb-10 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            {subtext || "Faster. Smarter. Consistent. Scale your visual content instantly."}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Link
              href="/book"
              id="cta-book-call"
              className="inline-flex items-center gap-2 px-10 py-4 bg-[var(--accent)] text-[var(--accent-text)] font-body text-base font-extrabold uppercase rounded-md dark:rounded-none hover:shadow-xl hover:shadow-[var(--accent)]/20 transition-all duration-300 group"
            >
              Book Your Free Call
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
