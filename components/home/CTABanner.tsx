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
      <div className="bg-[#0D0D0D] py-24 md:py-32">
        <div className="grain-overlay" />
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 text-center">
          <motion.h2
            className="font-display text-display-lg text-[#F5F5F5] mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {heading || 'Ready to make your product irresistible?'}
          </motion.h2>
          <motion.p
            className="font-body text-[#888888] text-lg mb-10 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            {subtext || "Let's create visuals that don't just look good — they sell."}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Link
              href="/book"
              id="cta-book-call"
              className="inline-flex items-center gap-2 px-10 py-4 bg-[#C8A96E] text-[#0A0A0A] font-body text-base font-medium rounded-full hover:shadow-xl hover:shadow-[#C8A96E]/20 transition-all duration-300 group"
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
