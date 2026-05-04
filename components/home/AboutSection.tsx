'use client';

import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section className="py-24 md:py-32 bg-[var(--bg)] border-t border-[var(--border)]" id="about-section">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left Side */}
          <div className="lg:col-span-5">
            <motion.div 
              className="flex items-center gap-3 mb-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="font-mono text-[11px] tracking-[4px] uppercase text-[var(--accent)]">{'// WHO WE ARE'}</span>
            </motion.div>
            <motion.h2 
              className="font-display font-black uppercase text-6xl md:text-7xl lg:text-8xl leading-[0.9] text-[var(--text)]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              We Are<br />Webring
            </motion.h2>
          </div>

          {/* Right Side */}
          <div className="lg:col-span-7 flex flex-col justify-end">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <motion.p 
                className="font-body text-[var(--muted)] text-base md:text-lg leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                A premium design studio based in Bangladesh, combining AI technology with human creative expertise to deliver world-class product visuals for e-commerce brands globally.
              </motion.p>
            </div>

            {/* Bold Black Box Statement */}
            <motion.div 
              className="bg-[var(--surface)] dark:bg-[#0D0D0D] border border-[var(--border)] p-8 md:p-12 rounded-[2rem] neon-shadow"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <p className="font-display font-black uppercase text-2xl md:text-3xl lg:text-4xl leading-tight text-[var(--text)]">
                We take a raw product image and engineer it into a visual that sells — combining AI precision with human artistry.
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
