'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Plus, Minus } from 'lucide-react';
import type { PricingTier } from '@/lib/types';

interface PricingPageClientProps {
  tiers: PricingTier[];
}

const faqs = [
  { question: 'How does AI product photography work?', answer: 'You send us your raw product images (even smartphone photos). We use a combination of AI tools like Midjourney, Stable Diffusion, and Adobe Firefly along with expert Photoshop work to transform them into studio-quality visuals. The result is indistinguishable from a professional photoshoot.' },
  { question: "What's the typical turnaround time?", answer: 'Our standard delivery time is 2-4 business days depending on the complexity of the project. Rush delivery options are available if you need your visuals sooner.' },
  { question: 'Do you work with international clients?', answer: 'Yes! We work with brands globally. All our communication and delivery are handled digitally, making it seamless to work with us from anywhere in the world.' },
  { question: 'Can I request revisions?', answer: 'Absolutely. We offer revision rounds on all our packages to ensure the final result perfectly matches your brand vision.' },
  { question: 'What file formats do you deliver?', answer: 'We deliver high-resolution JPEG, PNG (with transparency if needed), and WebP formats optimized for e-commerce platforms like Amazon and Shopify.' },
  { question: 'Do you offer refunds?', answer: 'We strive for 100% satisfaction. If we cannot meet your requirements after the revision rounds, we offer a fair refund policy based on the project stage.' },
];

export default function PricingPageClient({ tiers }: PricingPageClientProps) {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | '6month' | 'yearly'>('monthly');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Billing period multiplier/logic
  const getDisplayPrice = (basePrice: number) => {
    if (billingPeriod === '6month') return Math.round(basePrice * 0.9); // 10% off
    if (billingPeriod === 'yearly') return Math.round(basePrice * 0.8); // 20% off
    return basePrice;
  };

  const periodLabel = billingPeriod === 'monthly' ? 'per month' : billingPeriod === '6month' ? 'per project' : 'per year';

  return (
    <div className="bg-[var(--bg)] min-h-screen pt-32 pb-20">
      
      {/* Header Section */}
      <section className="mb-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 text-center">
          <motion.div 
            className="flex justify-center items-center gap-3 mb-6"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          >
            <span className="font-mono text-[11px] tracking-[4px] uppercase text-[var(--accent)]">// INVESTMENT</span>
          </motion.div>
          
          <motion.h1 
            className="font-display font-black uppercase text-5xl md:text-7xl lg:text-8xl leading-[0.9] text-[var(--text)] mb-8"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          >
            Transparent Pricing.<br />Premium Results.
          </motion.h1>

          <motion.p 
            className="font-body text-[var(--muted)] text-lg md:text-xl max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          >
            No hidden fees. Just world-class visual engineering tailored to your brand's scale.
          </motion.p>

          {/* Billing Toggle */}
          <div className="flex justify-center">
            <div className="bg-[#0D0D0D] p-1 border border-[#1A1A1A] flex gap-1">
              {(['monthly', '6month', 'yearly'] as const).map((period) => (
                <button
                  key={period}
                  onClick={() => setBillingPeriod(period)}
                  className={`px-6 py-2 font-display font-black uppercase text-xs tracking-widest transition-all duration-300 ${
                    billingPeriod === period 
                      ? 'bg-[var(--accent)] text-[#000000]' 
                      : 'text-[var(--muted)] hover:text-[var(--text)]'
                  }`}
                >
                  {period === '6month' ? '6 Months' : period}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards Grid */}
      <section className="mb-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Starter Card */}
            <motion.div 
              className="bg-[#0D0D0D] border border-[#1A1A1A] neon-shadow p-8 flex flex-col rounded-[2rem]"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            >
              <span className="font-mono text-[10px] tracking-widest uppercase text-white/40 mb-6">STARTER</span>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="font-display font-black text-6xl text-white">$199</span>
                <span className="font-body text-xs text-white/40">/ {periodLabel}</span>
              </div>
              <p className="font-body text-xs text-white/60 mb-8">Perfect for small brands testing AI photography.</p>
              
              <ul className="space-y-4 mb-10 flex-grow">
                {['5 product images', '1 service type', '2 revisions', '3-day delivery'].map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <Check className="w-3.5 h-3.5 text-[var(--accent)]" />
                    <span className="font-body text-xs text-white/80">{f}</span>
                  </li>
                ))}
              </ul>

              <button className="w-full py-4 border border-[#333] font-display font-black uppercase text-xs tracking-widest hover:bg-white hover:text-[#000] transition-all">
                GET STARTED
              </button>
            </motion.div>

            {/* Growth Card (Highlighted) */}
            <motion.div 
              className="bg-[var(--accent)] p-8 flex flex-col relative scale-105 z-10 shadow-2xl rounded-[2rem]"
              initial={{ opacity: 0, scale: 1 }} whileInView={{ opacity: 1, scale: 1.05 }} viewport={{ once: true }}
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#000] text-[var(--accent)] px-4 py-1 font-display font-black text-[10px] tracking-widest uppercase">
                MOST POPULAR
              </div>
              <span className="font-mono text-[10px] tracking-widest uppercase text-[#000] font-bold mb-6">GROWTH</span>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="font-display font-black text-6xl text-[#000]">$499</span>
                <span className="font-body text-xs text-[#000]/70">/ {periodLabel}</span>
              </div>
              <p className="font-body text-xs text-[#000]/70 mb-8">For brands ready to scale their visual content.</p>
              
              <ul className="space-y-4 mb-10 flex-grow">
                {['15 images', '3 service types', 'Unlimited revisions', 'Lifestyle + studio', '2-day delivery', 'Priority support'].map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <Check className="w-3.5 h-3.5 text-[#000]" />
                    <span className="font-body text-xs text-[#000] font-medium">{f}</span>
                  </li>
                ))}
              </ul>

              <button className="w-full py-4 bg-[#000] text-[var(--accent)] font-display font-black uppercase text-xs tracking-widest hover:scale-[0.98] transition-all">
                BOOK A CALL
              </button>
            </motion.div>

            {/* Enterprise Card */}
            <motion.div 
              className="bg-[#0D0D0D] border border-[#1A1A1A] neon-shadow p-8 flex flex-col rounded-[2rem]"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <span className="font-mono text-[10px] tracking-widest uppercase text-white/40 mb-6">ENTERPRISE</span>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="font-display font-black text-6xl text-white">$999</span>
                <span className="font-body text-xs text-white/40">/ {periodLabel}</span>
              </div>
              <p className="font-body text-xs text-white/60 mb-8">Custom solution for high-volume brands.</p>
              
              <ul className="space-y-4 mb-10 flex-grow">
                {['Unlimited images', 'All services included', 'Dedicated manager', 'Custom timeline', 'Monthly retainer'].map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <Check className="w-3.5 h-3.5 text-[var(--accent)]" />
                    <span className="font-body text-xs text-white/80">{f}</span>
                  </li>
                ))}
              </ul>

              <button className="w-full py-4 border border-[#333] font-display font-black uppercase text-xs tracking-widest hover:bg-white hover:text-[#000] transition-all">
                CONTACT US
              </button>
            </motion.div>

          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 border-t border-[#1A1A1A]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="font-mono text-[10px] tracking-[4px] uppercase text-[var(--accent)] mb-4 block">FAQ</span>
            <h2 className="font-display font-black uppercase text-4xl md:text-5xl lg:text-6xl text-[var(--text)]">
              Frequently Asked Questions
            </h2>
            <p className="font-body text-[var(--muted)] mt-4">Everything you need to know about working with WEBRING.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-[#0A0A0A] border border-[#1A1A1A] neon-shadow rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-display font-black uppercase text-sm md:text-base text-white pr-4">
                    {faq.question}
                  </span>
                  {openFaq === i ? <Minus className="w-4 h-4 text-[var(--accent)]" /> : <Plus className="w-4 h-4 text-white/40" />}
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-0 border-t border-[#1A1A1A]/50 mt-4 pt-4">
                        <p className="font-body text-xs md:text-sm text-white/60 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="mt-20 bg-[var(--accent)] py-20 text-center">
        <div className="max-w-[1440px] mx-auto px-6">
          <h2 className="font-display font-black uppercase text-5xl md:text-7xl text-[#000] mb-8">
            Ready to get started?
          </h2>
          <button className="px-10 py-4 border-2 border-[#000] rounded-full font-display font-black uppercase text-sm hover:bg-[#000] hover:text-[var(--accent)] transition-all">
            Book a Free Call
          </button>
        </div>
      </section>

    </div>
  );
}
