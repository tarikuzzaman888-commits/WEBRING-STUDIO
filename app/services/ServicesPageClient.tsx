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
  Palette: <Sparkles className="w-6 h-6" />,
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
            className="font-mono text-xs tracking-[0.25em] uppercase text-accent mb-6 block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Our Services
          </motion.span>
          <motion.h1
            className="font-display text-display-xl mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Every pixel.
            <br />
            <span className="text-gradient">Engineered.</span>
          </motion.h1>
          <motion.p
            className="font-body text-muted text-lg max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Five specialized services designed to transform your brand from invisible to irresistible.
          </motion.p>
        </div>
      </section>

      {/* Service Sections */}
      {services.map((service, i) => (
        <section
          key={service._id}
          className={`py-20 md:py-28 ${i % 2 === 0 ? '' : 'bg-surface'}`}
          id={`service-${service.slug?.current || i}`}
        >
          <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
              i % 2 === 1 ? 'lg:[direction:rtl] lg:[&>*]:![direction:ltr]' : ''
            }`}>
              {/* Image */}
              <motion.div
                className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-surface border border-border"
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
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
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-accent">
                      {iconMap[service.icon] || <Camera className="w-16 h-16 opacity-20" />}
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: i % 2 === 0 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                <div className="text-accent mb-4">
                  {iconMap[service.icon] || <Camera className="w-6 h-6" />}
                </div>
                <h2 className="font-display text-display-md mb-3">{service.title}</h2>
                <p className="font-body text-accent text-sm mb-4">{service.subtitle}</p>
                <p className="font-body text-muted leading-relaxed mb-8">
                  {service.description}
                </p>

                {/* Features */}
                {service.features && service.features.length > 0 && (
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                        <span className="font-body text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Price + CTA */}
                <div className="flex items-center gap-6">
                  {service.startingPrice && (
                    <div>
                      <p className="font-mono text-xs text-muted uppercase tracking-wider">Starting at</p>
                      <p className="font-display text-2xl text-accent">{service.startingPrice}</p>
                    </div>
                  )}
                  <Link
                    href="/book"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-[#0A0A0A] font-body text-sm font-medium rounded-full hover:shadow-lg hover:shadow-accent/20 transition-all group"
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
