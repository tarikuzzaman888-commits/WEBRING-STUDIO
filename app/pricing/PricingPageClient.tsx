'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Check, ChevronDown, Sparkles } from 'lucide-react';
import type { PricingTier } from '@/lib/types';

const faqs = [
  {
    question: 'What file formats do you deliver?',
    answer: 'We deliver in all major formats including PNG, JPEG, WebP, TIFF, and PSD. All images are optimized for web (Shopify, Amazon, WooCommerce) and print. Video content is delivered in MP4 and MOV formats.',
  },
  {
    question: 'How does the AI photography process work?',
    answer: 'We combine advanced AI models (Midjourney, Firefly, ComfyUI) with professional editing in Photoshop and Lightroom. Your product photos or references are enhanced, placed in custom scenes, and refined by our team to ensure photorealistic results that are indistinguishable from traditional photography.',
  },
  {
    question: 'Do you offer refunds or guarantees?',
    answer: 'Yes! We offer unlimited revisions on Growth and Enterprise plans, and 2 rounds on Starter. We work until you are 100% satisfied. If we cannot meet your requirements, we offer a full refund — no questions asked.',
  },
  {
    question: 'What is the typical turnaround time?',
    answer: 'Starter projects are delivered within 48 hours. Growth projects within 24 hours. Enterprise clients get same-day turnaround for urgent requests. Rush delivery is available on all plans for an additional fee.',
  },
  {
    question: 'Can you work with any product category?',
    answer: 'Absolutely! We specialize in jewelry, furniture, supplements, clothing, and dropshipping products, but we have experience with virtually every product category. From food to electronics, cosmetics to industrial equipment — we can create stunning visuals for any product.',
  },
];

interface PricingPageClientProps {
  tiers: PricingTier[];
}

export default function PricingPageClient({ tiers }: PricingPageClientProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="grain-overlay" />
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 text-center">
          <motion.span
            className="font-mono text-xs tracking-[0.25em] uppercase text-accent mb-6 block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Pricing
          </motion.span>
          <motion.h1
            className="font-display text-display-xl mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Simple, transparent pricing.
          </motion.h1>
          <motion.p
            className="font-body text-muted text-lg max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Choose the plan that fits your brand. All plans include AI-powered quality and our satisfaction guarantee.
          </motion.p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {tiers.map((tier, i) => (
              <motion.div
                key={tier._id}
                className={`relative rounded-2xl p-8 flex flex-col ${
                  tier.highlighted
                    ? 'bg-accent/5 border-2 border-accent shadow-xl shadow-accent/10'
                    : 'bg-surface border border-border'
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                {/* Popular Badge */}
                {tier.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-[#0A0A0A] font-mono text-xs tracking-wider uppercase rounded-full flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" />
                    Popular
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="font-display text-2xl mb-2">{tier.tierName}</h3>
                  <div className="flex items-baseline gap-1">
                    {tier.price === 0 ? (
                      <span className="font-display text-4xl text-accent">Custom</span>
                    ) : (
                      <>
                        <span className="font-display text-4xl text-foreground">${tier.price}</span>
                        <span className="font-body text-sm text-muted">/{tier.period}</span>
                      </>
                    )}
                  </div>
                </div>

                <ul className="space-y-3 flex-1 mb-8">
                  {tier.features?.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      <span className="font-body text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/book"
                  className={`w-full py-3 rounded-full text-center font-body text-sm font-medium transition-all duration-300 ${
                    tier.highlighted
                      ? 'bg-accent text-[#0A0A0A] hover:shadow-lg hover:shadow-accent/20'
                      : 'border border-border text-foreground hover:border-accent hover:text-accent'
                  }`}
                >
                  {tier.ctaText}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32 bg-surface" id="pricing-faq">
        <div className="max-w-3xl mx-auto px-6 md:px-10 lg:px-16">
          <h2 className="font-display text-display-md text-center mb-16">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                className="border border-border rounded-xl overflow-hidden"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-surface/50 transition-colors"
                >
                  <span className="font-display text-lg text-foreground pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-muted flex-shrink-0 transition-transform duration-300 ${
                      openFaq === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <p className="font-body text-sm text-muted leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
