'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Camera, Image as ImageIcon, ShoppingBag, Video, Sparkles, Check, ArrowRight } from 'lucide-react';
import { urlFor } from '@/sanity/lib/image';
import type { Service } from '@/lib/types';

const iconMap: Record<string, React.ReactNode> = {
  Camera: <Camera className="w-6 h-6" />,
  Image: <ImageIcon className="w-6 h-6" />,
  ShoppingBag: <ShoppingBag className="w-6 h-6" />,
  Video: <Video className="w-6 h-6" />,
  Sparkles: <Sparkles className="w-6 h-6" />,
};

interface ServicesPageClientProps {
  services: Service[];
}

export default function ServicesPageClient({ services }: ServicesPageClientProps) {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="grain-overlay" />
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <motion.span
            className="font-mono text-[11px] tracking-[4px] uppercase text-[var(--accent)] mb-6 block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {'// Our Services'}
          </motion.span>
          <motion.h1
            className="font-display font-black uppercase tracking-tight text-display-xl mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Every pixel. <span className="text-gradient">Engineered.</span>
          </motion.h1>
          <motion.p
            className="font-body text-[var(--muted)] text-lg max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            Five specialized services designed to transform your brand from invisible to irresistible.
          </motion.p>
        </div>
      </section>

      {/* Service Sections */}
      {services.map((service, i) => (
        <section
          key={service._id}
          className={`py-20 md:py-28 ${i % 2 === 0 ? '' : 'bg-[var(--surface)]'}`}
          id={`service-${service.slug?.current || i}`}
        >
          <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
              i % 2 === 1 ? 'lg:[direction:rtl] lg:[&>*]:![direction:ltr]' : ''
            }`}>
              {/* Image */}
              <motion.div
                className="relative aspect-[4/3] rounded-[2rem] overflow-hidden bg-[var(--surface)] border border-[var(--border)]"
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5 }}
              >
                {service.image?.asset ? (
                  <Image
                    src={urlFor(service.image).width(800).height(600).url()}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-[var(--accent)]">
                    {iconMap[service.icon] || <Camera className="w-16 h-16 opacity-20" />}
                  </div>
                )}
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: i % 2 === 0 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="text-[var(--accent)] mb-4">
                  {iconMap[service.icon] || <Camera className="w-6 h-6" />}
                </div>
                <h2 className="font-display font-black uppercase tracking-tight text-display-md mb-3">{service.title}</h2>
                <p className="font-body text-[var(--accent)] text-sm mb-4">{service.subtitle}</p>
                <p className="font-body text-[var(--muted)] leading-relaxed mb-8">{service.description}</p>

                {service.features && service.features.length > 0 && (
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-[var(--accent)] mt-0.5 flex-shrink-0" />
                        <span className="font-body text-sm text-[var(--text)]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="flex items-center gap-6">
                  {service.startingPrice && (
                    <div>
                      <p className="font-mono text-[11px] text-[var(--muted)] uppercase tracking-[3px]">Starting at</p>
                      <p className="font-display text-2xl font-bold dark:font-black text-[var(--accent)]">{service.startingPrice}</p>
                    </div>
                  )}
                  <Link
                    href="/book"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-[var(--accent-text)] font-body text-sm font-extrabold uppercase rounded-full rounded-[2rem] hover:shadow-lg hover:shadow-[var(--accent)]/20 transition-all group"
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
