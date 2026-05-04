'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import type { ClientBrand } from '@/lib/types';

interface TrustedBrandsProps {
  brands: ClientBrand[] | null;
}

export default function TrustedBrands({ brands }: TrustedBrandsProps) {
  const hasBrands = brands && brands.length > 0;

  return (
    <section className="py-16 md:py-24 border-y border-[var(--border)]" id="trusted-brands">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.p
          className="font-mono text-[11px] tracking-[4px] uppercase text-[var(--muted)] text-center mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          // Trusted By
        </motion.p>

        {hasBrands ? (
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
            {brands.map((brand, i) => (
              <motion.div
                key={brand._key}
                className="opacity-40 hover:opacity-100 transition-opacity duration-500 grayscale hover:grayscale-0"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 0.4, y: 0 }}
                whileHover={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Image
                  src={urlFor(brand.logo).width(160).height(60).url()}
                  alt={brand.name}
                  width={120}
                  height={45}
                  className="h-8 md:h-10 w-auto object-contain"
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-28 h-10 bg-[var(--surface)] rounded-full rounded-[2rem] border border-[var(--border)] flex items-center justify-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <span className="font-mono text-[9px] text-[var(--muted)]/30">BRAND</span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
