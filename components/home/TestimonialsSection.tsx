'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import type { Testimonial } from '@/lib/types';

const fallbackTestimonials: Testimonial[] = [
  { _id: '1', clientName: 'Sarah Mitchell', company: 'Luxe Jewelry Co', rating: 5, quote: 'WEBRING completely transformed our product photos. Sales went up 40% after we switched to their AI-generated lifestyle shots. Absolutely game-changing.', service: 'AI Product Photography', featured: true },
  { _id: '2', clientName: 'David Chen', company: 'NatureFit Supplements', rating: 5, quote: 'The turnaround time was incredible. We sent product samples on Monday and had studio-quality images by Wednesday. The quality rivals any $5K photoshoot.', service: 'E-commerce Visual Package', featured: true },
  { _id: '3', clientName: 'Amara Okafor', company: 'Aura Home Decor', rating: 5, quote: "Working with WEBRING's team was seamless. They understood our brand aesthetic from day one and delivered visuals that perfectly capture our premium positioning.", service: 'Brand Identity', featured: true },
];

interface TestimonialsSectionProps {
  testimonials: Testimonial[] | null;
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const items = testimonials && testimonials.length > 0 ? testimonials : fallbackTestimonials;
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    const timer = setInterval(() => emblaApi.scrollNext(), 5000);
    return () => { clearInterval(timer); emblaApi.off('select', onSelect); };
  }, [emblaApi, onSelect]);

  return (
    <section className="py-24 md:py-32" id="testimonials">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-16">
          <SectionHeading
            label="// Testimonials"
            title="What clients say."
            subtitle="Real feedback from real brands we've worked with."
          />
          <div className="flex gap-2 mt-4 sm:mt-0 sm:pb-8">
            <button
              onClick={() => emblaApi?.scrollPrev()}
              disabled={!canScrollPrev}
              className="w-10 h-10 border border-[var(--border)] hover:border-[var(--accent)] flex items-center justify-center rounded-md dark:rounded-none transition-colors disabled:opacity-30"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => emblaApi?.scrollNext()}
              disabled={!canScrollNext}
              className="w-10 h-10 border border-[var(--border)] hover:border-[var(--accent)] flex items-center justify-center rounded-md dark:rounded-none transition-colors disabled:opacity-30"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {items.map((t) => (
              <div key={t._id} className="flex-none w-full sm:w-[48%] lg:w-[32%]">
                <div className="p-8 bg-[var(--surface-2)] border border-[var(--border)] hover:border-[var(--accent)] rounded-lg dark:rounded-none transition-colors h-full flex flex-col">
                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: t.rating || 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[var(--accent)] text-[var(--accent)]" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="font-body text-sm text-[var(--text)] leading-relaxed flex-1 mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  {/* Client */}
                  <div className="border-t border-[var(--border)] pt-4">
                    <p className="font-body font-semibold text-sm text-[var(--text)]">{t.clientName}</p>
                    <p className="font-body text-xs text-[var(--muted)]">{t.company}</p>
                    {t.service && (
                      <span className="inline-block font-mono text-[9px] tracking-[2px] uppercase text-[var(--accent)] bg-[var(--accent)]/10 px-2 py-0.5 mt-2">
                        {t.service}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
