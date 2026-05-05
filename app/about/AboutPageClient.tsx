'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Instagram, Linkedin, User } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import { urlFor } from '@/sanity/lib/image';
import type { TeamMember } from '@/lib/types';
import { fallbackTeam } from '@/lib/fallbackData';


interface AboutPageClientProps {
  team: TeamMember[];
}

export default function AboutPageClient({ team }: AboutPageClientProps) {


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
            {'// About Us'}
          </motion.span>
          <motion.h1
            className="font-display font-black uppercase tracking-tight text-display-xl mb-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            We Are WEBRING
          </motion.h1>
          <motion.p
            className="font-body text-[var(--muted)] text-lg md:text-xl max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
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
      <section className="py-16 md:py-24 bg-[var(--surface)]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              className="font-display font-black uppercase tracking-tight text-display-md mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Our Mission
            </motion.h2>
            <motion.p
              className="font-body text-[var(--muted)] text-lg leading-relaxed"
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


      {/* Team */}
      <section className="py-24 md:py-32" id="team-section">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <SectionHeading
            label="// Our Team"
            title="The minds behind the magic."
            subtitle="Three creatives, one mission — engineer reality for brands worldwide."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(team && team.length > 0 ? team : fallbackTeam).map((member, i) => (
              <motion.div
                key={member._id}
                className="group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                {/* Photo */}
                <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden bg-[var(--surface)] border border-[var(--border)] mb-6">
                  {member.photo?.asset ? (
                    <Image
                      src={urlFor(member.photo).width(500).height(667).url()}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 dark:grayscale-[20%] dark:group-hover:grayscale-0"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : member.fallbackUrl ? (
                    <Image
                      src={member.fallbackUrl}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 dark:grayscale-[20%] dark:group-hover:grayscale-0"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <User className="w-16 h-16 text-[var(--muted)]/20" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div>
                  <h3 className="font-display font-black uppercase text-2xl text-[var(--text)] mb-1">
                    {member.name}
                  </h3>
                  <span className="inline-block font-mono text-[11px] tracking-[3px] uppercase text-[var(--accent-text)] bg-[var(--accent)] px-3 py-1 rounded-full mb-3">
                    {member.role}
                  </span>

                  {member.responsibilities && member.responsibilities.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {member.responsibilities.map((r) => (
                        <span key={r} className="font-body text-xs text-[var(--muted)] border border-[var(--border)] px-2 py-0.5 rounded-sm">
                          {r}
                        </span>
                      ))}
                    </div>
                  )}

                  {member.bio && (
                    <p className="font-body text-sm text-[var(--muted)] leading-relaxed mb-4">
                      {member.bio}
                    </p>
                  )}

                  <div className="flex gap-3">
                    {member.instagramUrl && (
                      <a href={member.instagramUrl} target="_blank" rel="noopener noreferrer"
                        className="w-8 h-8 border border-[var(--border)] flex items-center justify-center hover:border-[var(--accent)] rounded-full transition-colors"
                        aria-label={`${member.name} Instagram`}>
                        <Instagram className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {member.linkedinUrl && (
                      <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer"
                        className="w-8 h-8 border border-[var(--border)] flex items-center justify-center hover:border-[var(--accent)] rounded-full transition-colors"
                        aria-label={`${member.name} LinkedIn`}>
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
