'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Camera, Image as ImageIcon, ShoppingBag, Video, Sparkles, ArrowUpRight } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import type { Service } from '@/lib/types';

const iconMap: Record<string, React.ReactNode> = {
  Camera: <Camera className="w-7 h-7" />,
  Image: <ImageIcon className="w-7 h-7" />,
  ShoppingBag: <ShoppingBag className="w-7 h-7" />,
  Video: <Video className="w-7 h-7" />,
  Sparkles: <Sparkles className="w-7 h-7" />,
};

const fallbackServices = [
  { title: 'AI Product Photography', icon: 'Camera', subtitle: 'Studio-quality shots, powered by AI', slug: 'ai-product-photography' },
  { title: 'Lifestyle Photography', icon: 'Image', subtitle: 'Contextual scenes that tell your story', slug: 'lifestyle-photography' },
  { title: 'E-commerce Visuals', icon: 'ShoppingBag', subtitle: 'Complete visual solution for stores', slug: 'ecommerce-visuals' },
  { title: 'AI Image & Video', icon: 'Video', subtitle: 'Dynamic content for ads and social', slug: 'ai-image-video' },
  { title: 'Brand Identity', icon: 'Sparkles', subtitle: 'From logo to full visual language', slug: 'brand-identity' },
];

interface ServicesOverviewProps {
  services: Service[] | null;
}

export default function ServicesOverview({ services }: ServicesOverviewProps) {
  const items = services && services.length > 0
    ? services.map(s => ({ title: s.title, icon: s.icon, subtitle: s.subtitle || '', slug: s.slug?.current || '' }))
    : fallbackServices;

  return (
    <section className="py-24 md:py-32" id="services-overview">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeading
          label="// Services"
          title="What we do."
          subtitle="Five specialized services designed to make your brand irresistible."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((service, i) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <Link
                href={`/services#service-${service.slug}`}
                className="group block p-8 bg-[var(--surface-2)] border border-[var(--border)] hover:border-[var(--accent)] rounded-lg dark:rounded-none transition-all duration-300"
              >
                <div className="text-[var(--accent)] mb-6">
                  {iconMap[service.icon] || <Camera className="w-7 h-7" />}
                </div>
                <h3 className="font-display font-black uppercase text-xl text-[var(--text)] mb-2 flex items-center gap-2">
                  {service.title}
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--accent)]" />
                </h3>
                <p className="font-body text-sm text-[var(--muted)]">
                  {service.subtitle}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
