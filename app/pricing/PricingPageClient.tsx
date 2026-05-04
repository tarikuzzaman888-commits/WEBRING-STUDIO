'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Check, ChevronDown, Sparkles } from 'lucide-react';
import type { PricingTier } from '@/lib/types';

const faqs = [
  { question: 'What file formats do you deliver?', answer: 'We deliver in all major formats including PNG, JPEG, WebP, TIFF, and PSD. All images are optimized for web (Shopify, Amazon, WooCommerce) and print. Video content is delivered in MP4 and MOV formats.' },
  { question: 'How does the AI photography process work?', answer: 'We combine advanced AI models (Midjourney, Firefly, ComfyUI) with professional editing in Photoshop and Lightroom. Your product photos or references are enhanced, placed in custom scenes, and refined by our team to ensure photorealistic results that are indistinguishable from traditional photography.' },
  { question: 'Do you offer refunds or guarantees?', answer: 'Yes! We offer unlimited revisions on Growth and Enterprise plans, and 2 rounds on Starter. We work until you are 100% satisfied. If we cannot meet your requirements, we offer a full refund — no questions asked.' },
  { question: 'What is the typical turnaround time?', answer: 'Starter projects are delivered within 48 hours. Growth projects within 24 hours. Enterprise clients get same-day turnaround for urgent requests. Rush delivery is available on all plans for an additional fee.' },
  { question: 'Can you work with any product category?', answer: 'Absolutely! We specialize in jewelry, furniture, supplements, clothing, and dropshipping products, but we have experience with virtually every product category. From food to electronics, cosmetics to industrial equipment — we can create stunning visuals for any product.' },
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
            className="font-mono text-[11px] tracking-[4px] uppercase text-[var(--accent)] mb-6 block"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          >
            // Pricing
          </motion.span>
          <motion.h1
            className="font-display font-black uppercase tracking-tight text-display-xl mb-6"
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          >
            Simple, transparent pricing.
          </motion.h1>
          <motion.p
            className="font-body text-[var(--muted)] text-lg max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
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
                className={`relative rounded-lg dark:rounded-none p-8 flex flex-col ${
                  tier.highlighted
                    ? 'bg-[var(--surface-2)] border-2 border-[var(--accent)] shadow-xl shadow-[var(--accent)]/10'
                    : 'bg-[var(--surface)] border border-[var(--border)]'
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-[var(--accent)] text-[var(--accent-text)] font-mono text-[11px] tracking-[3px] uppercase rounded-sm flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" />
                    Popular
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="font-display font-black uppercase text-2xl mb-2">{tier.tierName}</h3>
                  <div className="flex items-baseline gap-1">
                    {tier.price === 0 ? (
                      <span className="font-display font-black text-4xl text-[var(--accent)]">Custom</span>
                    ) : (
                      <>
                        <span className="font-display font-black text-4xl text-[var(--text)]">${tier.price}</span>
                        <span className="font-body text-sm text-[var(--muted)]">/{tier.period}</span>
                      </>
                    )}
                  </div>
                </div>

                <ul className="space-y-3 flex-1 mb-8">
                  {tier.features?.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-[var(--accent)] mt-0.5 flex-shrink-0" />
                      <span className="font-body text-sm text-[var(--text)]">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/book"
                  className={`w-full py-3 text-center font-body text-sm font-extrabold uppercase transition-all duration-300 rounded-md dark:rounded-none block ${
                    tier.highlighted
                      ? 'bg-[var(--accent)] text-[var(--accent-text)] hover:shadow-lg hover:shadow-[var(--accent)]/20'
                      : 'border-2 border-[var(--border)] text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
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
      <section className="py-24 md:py-32 bg-[var(--surface)]" id="pricing-faq">
        <div className="max-w-3xl mx-auto px-6 md:px-10 lg:px-16">
          <h2 className="font-display font-black uppercase tracking-tight text-display-md text-center mb-16">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                className="border border-[var(--border)] rounded-lg dark:rounded-none overflow-hidden"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-[var(--surface-2)] transition-colors"
                >
                  <span className="font-display font-black uppercase text-lg text-[var(--text)] pr-4">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-[var(--muted)] flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <p className="font-body text-sm text-[var(--muted)] leading-relaxed">{faq.answer}</p>
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
