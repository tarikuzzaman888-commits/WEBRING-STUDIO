'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { Check, Minus, Shield, Sparkles, CheckCircle, Star, Lock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// --- Components ---

function AnimatedNumber({ value }: { value: number }) {
  const spring = useSpring(value, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) => Math.round(current).toLocaleString());

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return <motion.span>{display}</motion.span>;
}

// --- Data ---


const featuresTable = [
  { feature: 'Images per month', starter: '5', growth: '15', enterprise: 'Unlimited' },
  { feature: 'Service types', starter: '1', growth: '3', enterprise: 'All 5' },
  { feature: 'Revisions', starter: '2', growth: '∞', enterprise: '∞' },
  { feature: 'Turnaround time', starter: '5 days', growth: '3 days', enterprise: 'Custom' },
  { feature: 'Lifestyle scenes', starter: false, growth: true, enterprise: true },
  { feature: 'Before/After comparison', starter: false, growth: true, enterprise: true },
  { feature: 'Dedicated account manager', starter: false, growth: false, enterprise: true },
  { feature: 'Rush delivery available', starter: false, growth: true, enterprise: true },
  { feature: 'White-label option', starter: false, growth: false, enterprise: true },
  { feature: 'Monthly strategy call', starter: false, growth: false, enterprise: true },
  { feature: 'Priority Slack support', starter: false, growth: true, enterprise: true },
  { feature: 'Custom brand guidelines', starter: false, growth: false, enterprise: true },
];

export default function PricingPageClient() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | '6month' | 'yearly'>('yearly');
  
  // ROI Calculator State
  const [products, setProducts] = useState(10);
  const [revenue, setRevenue] = useState(5000);
  const [convRate, setConvRate] = useState(1.5);

  const roiData = useMemo(() => {
    const revenueIncrease = revenue * 0.35 * (convRate / 1.5);
    const roi = ((revenueIncrease - 499) / 499) * 100;
    return {
      revenueIncrease: Math.round(revenueIncrease),
      roi: Math.min(2000, Math.round(roi))
    };
  }, [revenue, convRate]);

  const prices = {
    starter: billingPeriod === 'monthly' ? 199 : billingPeriod === '6month' ? 169 : 139,
    growth: billingPeriod === 'monthly' ? 499 : billingPeriod === '6month' ? 424 : 349,
    enterprise: billingPeriod === 'monthly' ? 999 : billingPeriod === '6month' ? 849 : 699,
  };

  return (
    <div className="bg-[#0A0A0A] min-h-screen text-[#F5F5F5] selection:bg-[var(--accent)] selection:text-black">
      
      {/* BLOCK 1 — TRUST BAR */}
      <div className="pt-24 border-b border-[var(--border)]/10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-4 flex flex-col md:flex-row items-center justify-between gap-6 opacity-80">
          {/* Left */}
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0A0A0A] overflow-hidden relative">
                  <Image src={`https://i.pravatar.cc/100?u=${i}`} alt="User" fill className="object-cover" />
                </div>
              ))}
            </div>
            <p className="font-body text-[11px] uppercase tracking-wider text-[var(--muted)]">
              200+ brands already growing with WEBRING
            </p>
          </div>
          {/* Center */}
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 fill-[var(--accent)] text-[var(--accent)]" />)}
            </div>
            <p className="font-body text-[11px] uppercase tracking-wider text-[var(--muted)]">
              4.9/5 average rating
            </p>
          </div>
          {/* Right */}
          <div className="flex items-center gap-2">
            <Lock className="w-3 h-3 text-[var(--accent)]" />
            <p className="font-body text-[11px] uppercase tracking-wider text-[var(--muted)]">
              No contracts. Cancel anytime.
            </p>
          </div>
        </div>
      </div>

      {/* BLOCK 2 — HEADLINE */}
      <section className="py-16 md:py-20 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 text-center">
          <motion.span 
            className="font-mono text-[11px] tracking-[5px] uppercase text-[var(--accent)] mb-6 block"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          >
            PRICING
          </motion.span>
          
          <motion.h1 
            className="font-display font-black uppercase text-6xl md:text-8xl lg:text-9xl leading-[0.85] text-white mb-10"
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Invest once.<br />
            <span className="text-gradient">Sell forever.</span>
          </motion.h1>

          <motion.p 
            className="font-body text-[var(--muted)] text-lg md:text-xl max-w-3xl mx-auto mb-16 leading-relaxed"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          >
            Every image we deliver is an asset that keeps working for your 
            brand — on your store, your ads, your socials. 
            This isn&apos;t a cost. It&apos;s your highest-ROI marketing spend.
          </motion.p>

          {/* BLOCK 3 — BILLING TOGGLE */}
          <div className="flex flex-col items-center gap-6">
            <div className="bg-[#111] p-1.5 rounded-full border border-[var(--border)]/20 flex gap-2 relative">
              {(['monthly', '6month', 'yearly'] as const).map((period) => (
                <button
                  key={period}
                  onClick={() => setBillingPeriod(period)}
                  className={`relative z-10 px-6 py-2.5 font-display font-black uppercase text-[10px] tracking-widest transition-colors duration-300 flex items-center gap-2 ${
                    billingPeriod === period ? 'text-black' : 'text-[var(--muted)]'
                  }`}
                >
                  {period === '6month' ? '6 Months' : period === 'yearly' ? 'Yearly' : 'Monthly'}
                  {period === '6month' && (
                    <span className="bg-[#C8FF00] text-black text-[8px] px-2 py-0.5 rounded-full">SAVE 15%</span>
                  )}
                  {period === 'yearly' && (
                    <span className="bg-[#C8FF00] text-black text-[8px] px-2 py-0.5 rounded-full">SAVE 30% 🔥</span>
                  )}
                  {billingPeriod === period && (
                    <motion.div 
                      layoutId="active-period"
                      className="absolute inset-0 bg-[#F5F5F5] rounded-full -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              ))}
            </div>
            <p className="font-mono text-[10px] tracking-[2px] uppercase text-[var(--muted)] opacity-60">
              Most serious brands choose Yearly
            </p>
          </div>
        </div>
      </section>

      {/* BLOCK 4 — PRICING CARDS */}
      <section className="pb-24">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center">
            
            {/* Starter Card */}
            <motion.div 
              className="bg-[#111] border border-[var(--border)]/20 p-8 flex flex-col rounded-[2.5rem] relative scale-[0.97] opacity-90 transition-all hover:opacity-100"
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            >
              <div className="mb-6">
                <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--accent)] font-bold mb-2 block">STARTER</span>
                <p className="font-body text-[11px] text-[var(--muted)] mb-4 italic">Best for: New brands, single products, testing AI</p>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-display font-black text-5xl text-white">
                    $<AnimatedNumber value={prices.starter} />
                  </span>
                  <span className="font-body text-[10px] text-[var(--muted)] uppercase tracking-widest">/ project</span>
                </div>
              </div>

              <div className="mb-8 p-3 bg-white/5 rounded-2xl border border-white/5">
                <p className="font-display font-bold text-[9px] uppercase tracking-widest text-[var(--accent)] flex items-center gap-2">
                  <Sparkles className="w-3 h-3" /> ⚡ Most chosen by first-time clients
                </p>
              </div>
              
              <ul className="space-y-4 mb-8 flex-grow">
                {['5 product images', '1 service type', '2 revisions', '5-day delivery', 'Email support'].map((f) => (
                  <li key={f} className="flex items-center gap-4">
                    <div className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-white" />
                    </div>
                    <span className="font-body text-[13px] text-[var(--muted)]">{f}</span>
                  </li>
                ))}
              </ul>

              <button className="w-full py-4 border border-white/20 rounded-full font-display font-black uppercase text-[10px] tracking-[2px] hover:bg-white hover:text-black transition-all duration-300">
                Start with Starter →
              </button>
            </motion.div>

            {/* Growth Card (Center/Elevated) */}
            <motion.div 
              className="bg-[#111] border-2 border-[var(--accent)] p-10 flex flex-col rounded-[3rem] relative z-20 shadow-[0_0_80px_rgba(200,255,0,0.15)] scale-105"
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            >
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[var(--accent)] text-black px-6 py-1.5 rounded-full font-display font-black text-[10px] tracking-widest uppercase shadow-xl">
                MOST POPULAR
              </div>
              
              <div className="mb-8">
                <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--accent)] font-bold mb-2 block">GROWTH</span>
                <p className="font-body text-[11px] text-white/80 mb-4 font-medium">Best for: Scaling brands, 3-10 products/mo</p>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-display font-black text-6xl text-white">
                    $<AnimatedNumber value={prices.growth} />
                  </span>
                  <span className="font-body text-[10px] text-white/50 uppercase tracking-widest">/ project</span>
                </div>
              </div>

              <div className="mb-12 p-4 bg-[var(--accent)]/10 rounded-2xl border border-[var(--accent)]/20">
                <p className="font-display font-black text-[10px] uppercase tracking-[2px] text-[var(--accent)] flex items-center gap-2">
                  <Star className="w-3.5 h-3.5 fill-[var(--accent)]" /> 🏆 Used by our fastest-growing clients
                </p>
              </div>
              
              <ul className="space-y-5 mb-10 flex-grow">
                {['15 product images', '3 service types', 'Unlimited revisions', 'Lifestyle scenes included', '3-day delivery', 'Priority Slack support'].map((f) => (
                  <li key={f} className="flex items-center gap-4">
                    <div className="w-5 h-5 rounded-full bg-[var(--accent)] flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-black" />
                    </div>
                    <span className="font-body text-[14px] text-white font-medium">{f}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-4">
                <button className="w-full py-6 bg-[var(--accent)] text-black rounded-full font-display font-black uppercase text-xs tracking-[3px] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_10px_40px_rgba(200,255,0,0.3)]">
                  Claim Your Spot →
                </button>
                <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-red-500 uppercase tracking-widest animate-pulse">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  Only 3 spots available this month
                </div>
              </div>
            </motion.div>

            {/* Enterprise Card */}
            <motion.div 
              className="bg-[#111] border border-[var(--border)]/20 p-10 flex flex-col rounded-[2.5rem] relative scale-[0.97] opacity-90 transition-all hover:opacity-100"
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            >
              <div className="mb-6">
                <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--accent)] font-bold mb-2 block">ENTERPRISE</span>
                <p className="font-body text-[11px] text-[var(--muted)] mb-4 italic">Best for: Agencies, large catalogs, white-label</p>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-display font-black text-5xl text-white">
                    $<AnimatedNumber value={prices.enterprise} />
                  </span>
                  <span className="font-body text-[10px] text-[var(--muted)] uppercase tracking-widest">/ project</span>
                </div>
              </div>

              <div className="mb-8 p-3 bg-white/5 rounded-2xl border border-white/5">
                <p className="font-display font-bold text-[9px] uppercase tracking-widest text-[var(--accent)] flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5" /> 🤝 Custom onboarding included
                </p>
              </div>
              
              <ul className="space-y-4 mb-8 flex-grow">
                {['Unlimited images', 'All 5 services', 'Dedicated account manager', 'Strategy calls', 'White-labeling', 'Custom brand guidelines'].map((f) => (
                  <li key={f} className="flex items-center gap-4">
                    <div className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-white" />
                    </div>
                    <span className="font-body text-[13px] text-[var(--muted)]">{f}</span>
                  </li>
                ))}
              </ul>

              <button className="w-full py-4 border border-white/20 rounded-full font-display font-black uppercase text-[10px] tracking-[2px] hover:bg-white hover:text-black transition-all duration-300">
                Let&apos;s Talk Scale →
              </button>
            </motion.div>

          </div>
        </div>
      </section>

      {/* BLOCK 5 — COMPARISON TABLE */}
      <section className="py-20 border-t border-white/5 overflow-hidden">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="font-display font-black uppercase text-4xl md:text-6xl text-white">Everything, compared.</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 sticky top-0 bg-[#0A0A0A] z-30">
                  <th className="py-8 font-display font-black text-[10px] tracking-widest uppercase text-[var(--muted)]">Feature</th>
                  <th className="py-8 font-display font-black text-[10px] tracking-widest uppercase text-center text-[var(--muted)]">Starter</th>
                  <th className="py-8 font-display font-black text-[10px] tracking-widest uppercase text-center text-[var(--accent)] border-x border-[var(--accent)]/20 bg-[var(--accent)]/5">Growth</th>
                  <th className="py-8 font-display font-black text-[10px] tracking-widest uppercase text-center text-[var(--muted)]">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {featuresTable.map((row, i) => (
                  <motion.tr 
                    key={i} 
                    className="hover:bg-white/[0.02] transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <td className="py-6 font-body text-sm text-white/80">{row.feature}</td>
                    <td className="py-6 text-center font-body text-sm text-[var(--muted)]">
                      {typeof row.starter === 'boolean' ? (row.starter ? <Check className="w-4 h-4 text-[var(--accent)] mx-auto" /> : <Minus className="w-4 h-4 text-white/10 mx-auto" />) : row.starter}
                    </td>
                    <td className="py-6 text-center font-body text-sm text-white border-x border-[var(--accent)]/20 bg-[var(--accent)]/5">
                      {typeof row.growth === 'boolean' ? (row.growth ? <Check className="w-5 h-5 text-[var(--accent)] mx-auto" /> : <Minus className="w-4 h-4 text-white/10 mx-auto" />) : row.growth}
                    </td>
                    <td className="py-6 text-center font-body text-sm text-[var(--muted)]">
                      {typeof row.enterprise === 'boolean' ? (row.enterprise ? <Check className="w-4 h-4 text-[var(--accent)] mx-auto" /> : <Minus className="w-4 h-4 text-white/10 mx-auto" />) : row.enterprise}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* BLOCK 6 — ROI CALCULATOR */}
      <section className="py-20 bg-[#0D0D0D] border-y border-white/5 relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="font-mono text-[10px] tracking-[4px] uppercase text-[var(--accent)] mb-6 block">{/* THE MATH */}</span>
              <h2 className="font-display font-black uppercase text-4xl md:text-6xl lg:text-7xl leading-none text-white mb-8">
                See your return<br />before you invest.
              </h2>
              <p className="font-body text-[var(--muted)] text-lg mb-12">Move the sliders. See the math. We don&apos;t sell images; we sell conversion lift.</p>

              <div className="space-y-10">
                <div className="space-y-4">
                  <div className="flex justify-between font-display font-black text-[10px] uppercase tracking-widest">
                    <span className="text-white/60">Products in your store</span>
                    <span className="text-[var(--accent)]">{products}</span>
                  </div>
                  <input 
                    type="range" min="1" max="50" value={products} 
                    onChange={(e) => setProducts(parseInt(e.target.value))}
                    className="w-full accent-[#C8A96E] bg-white/10 h-1 rounded-full cursor-pointer"
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between font-display font-black text-[10px] uppercase tracking-widest">
                    <span className="text-white/60">Current monthly revenue</span>
                    <span className="text-[var(--accent)]">${revenue.toLocaleString()}</span>
                  </div>
                  <input 
                    type="range" min="500" max="50000" step="500" value={revenue} 
                    onChange={(e) => setRevenue(parseInt(e.target.value))}
                    className="w-full accent-[#C8A96E] bg-white/10 h-1 rounded-full cursor-pointer"
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between font-display font-black text-[10px] uppercase tracking-widest">
                    <span className="text-white/60">Average conversion rate</span>
                    <span className="text-[var(--accent)]">{convRate}%</span>
                  </div>
                  <input 
                    type="range" min="0.5" max="5" step="0.1" value={convRate} 
                    onChange={(e) => setConvRate(parseFloat(e.target.value))}
                    className="w-full accent-[#C8A96E] bg-white/10 h-1 rounded-full cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="bg-[#111] p-12 rounded-[3rem] border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Sparkles className="w-32 h-32 text-[#C8A96E]" />
              </div>
              <div className="relative z-10 flex flex-col h-full">
                <p className="font-body text-sm text-[var(--muted)] leading-relaxed mb-10 italic">
                  Professional images can increase conversion by 30-40% on average.
                </p>
                <div className="space-y-8 mb-12">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[3px] text-white/40 mb-2">Your potential revenue increase:</p>
                    <div className="font-display font-black text-6xl md:text-7xl text-[var(--accent)]">
                      +$<AnimatedNumber value={roiData.revenueIncrease} />
                      <span className="text-2xl ml-2 text-[var(--muted)]">/ mo</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[3px] text-white/40 mb-2">Your estimated ROI:</p>
                    <div className="font-display font-black text-6xl md:text-7xl text-[#C8A96E]">
                      <AnimatedNumber value={roiData.roi} />
                      {roiData.roi >= 2000 ? '+' : ''}%
                    </div>
                  </div>
                </div>
                <p className="font-mono text-[10px] uppercase tracking-[2px] text-white/40 mb-8">WEBRING Growth plan costs: $499/mo</p>
                <button className="w-full py-6 bg-[var(--accent)] text-black rounded-full font-display font-black uppercase text-sm tracking-[4px] hover:scale-[1.02] transition-all active:scale-95 shadow-[0_10px_40px_rgba(200,255,0,0.2)]">
                  Claim Your ROI →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLOCK 7 — OBJECTION CRUSHERS */}
      <section className="py-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-[#111] p-10 rounded-[2.5rem] border border-white/5"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            >
              <Shield className="w-10 h-10 text-[#C8A96E] mb-8" />
              <h3 className="font-display font-black uppercase text-xl text-white mb-4 leading-tight">What if I don&apos;t like the results?</h3>
              <p className="font-body text-sm text-[var(--muted)] leading-relaxed">
                We offer a free sample edit on your actual product before you commit to any plan. Zero risk.
              </p>
            </motion.div>
            <motion.div 
              className="bg-[#111] p-10 rounded-[2.5rem] border border-white/5"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            >
              <Sparkles className="w-10 h-10 text-[#C8A96E] mb-8" />
              <h3 className="font-display font-black uppercase text-xl text-white mb-4 leading-tight">Is AI photography as good as real studio?</h3>
              <p className="font-body text-sm text-[var(--muted)] leading-relaxed">
                Our clients see no difference — and their customers definitely don&apos;t. We combine AI precision 
                with human artistry for results studios can&apos;t match at this price.
              </p>
            </motion.div>
            <motion.div 
              className="bg-[#111] p-10 rounded-[2.5rem] border border-white/5"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            >
              <CheckCircle className="w-10 h-10 text-[#C8A96E] mb-8" />
              <h3 className="font-display font-black uppercase text-xl text-white mb-4 leading-tight">What if my product is complicated?</h3>
              <p className="font-body text-sm text-[var(--muted)] leading-relaxed">
                Jewelry, supplements, furniture, transparent bottles — we&apos;ve done them all. Send us your product and we&apos;ll prove it.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* BLOCK 8 — BOTTOM CTA */}
      <section className="py-24 bg-[#0D0D0D] border-t border-white/5 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--accent)] blur-[200px] rounded-full" />
        </div>
        <div className="max-w-[1440px] mx-auto px-6 relative z-10">
          <h2 className="font-display font-black uppercase text-5xl md:text-7xl lg:text-8xl text-white mb-8 leading-[0.9]">
            Still thinking?<br />Let us show you first.
          </h2>
          <p className="font-body text-[var(--muted)] text-lg md:text-xl max-w-2xl mx-auto mb-16">
            Get a free sample edit of your actual product — no payment, no commitment. Just results.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
            <Link 
              href="/book" 
              className="px-12 py-5 bg-[var(--accent)] text-black rounded-full font-display font-black uppercase text-sm tracking-[3px] hover:scale-[1.05] transition-all shadow-[0_10px_50px_rgba(200,255,0,0.2)]"
            >
              Get My Free Sample →
            </Link>
            <Link 
              href="/contact" 
              className="px-12 py-5 border border-white/20 rounded-full font-display font-black uppercase text-sm tracking-[3px] hover:bg-white hover:text-black transition-all"
            >
              Book a 15-min Call
            </Link>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 text-[10px] font-black uppercase tracking-[3px] text-white/40">
            <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[var(--accent)]" /> Free in 48 hours</div>
            <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[var(--accent)]" /> No credit card</div>
            <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[var(--accent)]" /> Keep the image</div>
          </div>
        </div>
      </section>

    </div>
  );
}
