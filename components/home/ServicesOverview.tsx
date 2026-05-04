'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Camera, Image as ImageIcon, ShoppingBag, Video, Sparkles } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import type { Service } from '@/lib/types';

const iconMap: Record<string, React.ReactNode> = {
  Camera: <Camera className="w-5 h-5" />,
  Image: <ImageIcon className="w-5 h-5" />,
  ShoppingBag: <ShoppingBag className="w-5 h-5" />,
  Video: <Video className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
  Palette: <Sparkles className="w-5 h-5" />,
};

// Fallback data when Sanity has no content yet
const fallbackServices: Partial<Service>[] = [
  { title: 'AI Product Photography', subtitle: 'Studio-quality shots, powered by AI', icon: 'Camera', order: 0 },
  { title: 'Lifestyle Photography (AI)', subtitle: 'Contextual scenes that tell your brand story', icon: 'Image', order: 1 },
  { title: 'E-commerce Visual Package', subtitle: 'Complete visual solution for your store', icon: 'ShoppingBag', order: 2 },
  { title: 'AI Image & Video Content', subtitle: 'Dynamic content for ads and social', icon: 'Video', order: 3 },
  { title: 'Brand Identity & Branding', subtitle: 'From logo to full visual language', icon: 'Sparkles', order: 4 },
];

interface ServicesOverviewProps {
  services: Service[] | null;
}

export default function ServicesOverview({ services }: ServicesOverviewProps) {
  const items = services && services.length > 0 ? services : fallbackServices;

  return (
    <section className="py-24 md:py-32" id="services-overview">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeading
          label="What We Do"
          title="Every pixel. Engineered."
          subtitle="Five core services designed to transform your product from ordinary to irresistible."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((service, i) => (
            <motion.div
              key={service.title}
              className="group relative p-8 bg-surface border border-border rounded-xl hover:border-accent/40 transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
            >
              {/* Gold left border accent */}
              <div className="absolute left-0 top-8 bottom-8 w-[3px] bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="text-accent mb-6">
                {iconMap[service.icon || 'Camera'] || <Camera className="w-5 h-5" />}
              </div>

              <h3 className="font-display text-xl mb-2 text-foreground group-hover:text-accent transition-colors">
                {service.title}
              </h3>
              <p className="font-body text-sm text-muted leading-relaxed">
                {service.subtitle}
              </p>

              <Link
                href="/services"
                className="inline-flex items-center gap-1 mt-6 font-mono text-xs text-accent tracking-wider opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Learn More →
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
