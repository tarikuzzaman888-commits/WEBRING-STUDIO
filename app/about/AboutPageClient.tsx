'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Instagram, Linkedin, User } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import { urlFor } from '@/sanity/lib/image';
import type { TeamMember } from '@/lib/types';

const tools = [
  'Photoshop', 'Midjourney', 'Gemini AI', 'Firefly',
  'After Effects', 'Figma', 'ComfyUI', 'Lightroom',
];

interface AboutPageClientProps {
  team: TeamMember[];
}

export default function AboutPageClient({ team }: AboutPageClientProps) {
  const marqueeText = tools.map(t => `${t} ✦`).join(' ');
  const repeated = `${marqueeText} ${marqueeText} ${marqueeText} `;

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
            About Us
          </motion.span>
          <motion.h1
            className="font-display text-display-xl mb-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            We Are WEBRING
          </motion.h1>
          <motion.p
            className="font-body text-muted text-lg md:text-xl max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            We are a team of AI-native creatives who believe that every product deserves
            visuals that transcend reality. Founded in 2024 in Bangladesh, we combine cutting-edge
            AI technology with human artistry to deliver product photography and branding that
            converts. We serve e-commerce brands across the globe — from jewelry to supplements,
            furniture to fashion.
          </motion.p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 md:py-24 bg-surface">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              className="font-display text-display-md mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Our Mission
            </motion.h2>
            <motion.p
              className="font-body text-muted text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              To democratize premium product photography by harnessing AI — making world-class
              visual content accessible to brands of every size. We believe that stunning visuals
              should not be a luxury, but a standard. Every pixel we create is engineered to tell
              your brand&#39;s story and drive conversions.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Tools Marquee */}
      <section className="bg-[#0D0D0D] py-6 overflow-hidden">
        <div className="marquee-container">
          <div className="marquee-track">
            <span className="font-mono text-lg md:text-xl text-[#C8A96E]/70 whitespace-nowrap tracking-widest">
              {repeated}
            </span>
            <span className="font-mono text-lg md:text-xl text-[#C8A96E]/70 whitespace-nowrap tracking-widest">
              {repeated}
            </span>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 md:py-32" id="team-section">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <SectionHeading
            label="Our Team"
            title="The minds behind the magic."
            subtitle="Three creatives, one mission — engineer reality for brands worldwide."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={member._id}
                className="group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
              >
                {/* Photo */}
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-surface border border-border mb-6">
                  {member.photo?.asset ? (
                    <Image
                      src={urlFor(member.photo).width(500).height(667).url()}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <User className="w-16 h-16 text-muted/20" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div>
                  <h3 className="font-display text-2xl text-foreground mb-1">
                    {member.name}
                  </h3>
                  <span className="inline-block font-mono text-xs tracking-wider uppercase text-accent bg-accent/10 px-3 py-1 rounded-full mb-3">
                    {member.role}
                  </span>

                  {member.responsibilities && member.responsibilities.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {member.responsibilities.map((r) => (
                        <span key={r} className="font-body text-xs text-muted border border-border px-2 py-0.5 rounded">
                          {r}
                        </span>
                      ))}
                    </div>
                  )}

                  {member.bio && (
                    <p className="font-body text-sm text-muted leading-relaxed mb-4">
                      {member.bio}
                    </p>
                  )}

                  {/* Social */}
                  <div className="flex gap-3">
                    {member.instagramUrl && (
                      <a
                        href={member.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:border-accent transition-colors"
                        aria-label={`${member.name} Instagram`}
                      >
                        <Instagram className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {member.linkedinUrl && (
                      <a
                        href={member.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:border-accent transition-colors"
                        aria-label={`${member.name} LinkedIn`}
                      >
                        <Linkedin className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
