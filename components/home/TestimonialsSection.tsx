'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import type { Testimonial } from '@/lib/types';

const fallbackTestimonials: Testimonial[] = [
  {
    _id: '1',
    clientName: 'Sarah Johnson',
    company: 'Luxe Jewelry Co.',
    quote: 'WEBRING completely transformed our product imagery. Our conversion rate jumped 40% after implementing their AI-generated lifestyle shots.',
    rating: 5,
    service: 'AI Product Photography',
    featured: true,
  },
  {
    _id: '2',
    clientName: 'Michael Chen',
    company: 'Modern Furnish',
    quote: 'The team understood our brand vision perfectly. The AI-enhanced room scenes they created look absolutely real — our customers love the new look.',
    rating: 5,
    service: 'Lifestyle Photography',
    featured: true,
  },
  {
    _id: '3',
    clientName: 'Emily Rodriguez',
    company: 'VitaBoost Supplements',
    quote: 'From product shots to full brand identity, WEBRING delivered everything on time and exceeded expectations. Truly a one-stop visual solution.',
    rating: 5,
    service: 'Brand Identity',
    featured: true,
  },
];

interface TestimonialsSectionProps {
  testimonials: Testimonial[] | null;
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const items = testimonials && testimonials.length > 0 ? testimonials : fallbackTestimonials;
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);

    // Auto-slide
    const interval = setInterval(() => emblaApi.scrollNext(), 5000);
    return () => {
      clearInterval(interval);
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="py-24 md:py-32" id="testimonials-section">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeading
          label="Testimonials"
          title="What our clients say."
          subtitle="Real feedback from brands who trusted us with their visual identity."
        />

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {items.map((testimonial) => (
                <motion.div
                  key={testimonial._id}
                  className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-surface border border-border rounded-xl p-8 h-full flex flex-col">
                    {/* Stars */}
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="font-body text-foreground text-sm leading-relaxed flex-1 mb-6">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>

                    {/* Client */}
                    <div>
                      <p className="font-display text-base text-foreground">
                        {testimonial.clientName}
                      </p>
                      <p className="font-body text-xs text-muted mt-0.5">
                        {testimonial.company}
                      </p>
                      <span className="inline-block mt-2 font-mono text-[10px] tracking-wider uppercase text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                        {testimonial.service}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={scrollPrev}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-accent transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-2">
              {items.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === selectedIndex ? 'bg-accent' : 'bg-border'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={scrollNext}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-accent transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
