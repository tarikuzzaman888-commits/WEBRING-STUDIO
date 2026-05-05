'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Instagram, Linkedin, User, Sparkles } from 'lucide-react';
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
      <section className="relative py-24 md:py-32 overflow-hidden bg-[var(--bg)]">
        <div className="grain-overlay" />
        
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7">
              <motion.div
                className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--accent)]/30 mb-8 w-fit"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span className="font-display text-[10px] font-bold tracking-widest uppercase text-[var(--accent)]">
                  // WE ARE WEBRING
                </span>
              </motion.div>

              <motion.h1
                className="font-display font-black uppercase tracking-tight text-6xl md:text-7xl lg:text-8xl leading-[0.9] text-[var(--text)] mb-8"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                We Engineer<br />
                Reality.
              </motion.h1>

              <motion.p
                className="font-body text-[var(--muted)] text-lg md:text-xl max-w-2xl leading-relaxed mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.6 }}
              >
                We are a team of AI-native creatives who believe that every product deserves
                visuals that transcend reality. Founded in 2024 in Bangladesh, we combine cutting-edge
                AI technology with human artistry to deliver product photography and branding that
                converts.
              </motion.p>

              <div className="flex items-center gap-12">
                <div className="flex flex-col">
                  <span className="font-display font-black text-4xl text-[var(--accent)]">2024</span>
                  <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--muted)] mt-1">Founded</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-black text-4xl text-[var(--accent)]">15+</span>
                  <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--muted)] mt-1">Countries</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-black text-4xl text-[var(--accent)]">100%</span>
                  <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--muted)] mt-1">Success</span>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="lg:col-span-5 relative">
              <motion.div
                className="relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-[var(--border)] neon-shadow"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=800&auto=format&fit=crop" // Professional Workspace/Studio
                  alt="WEBRING Creative Studio"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/50 to-transparent" />
                
                {/* Small Pill Badge */}
                <div className="absolute bottom-8 left-8 bg-[var(--accent)] text-[var(--accent-text)] px-4 py-2 rounded-full font-display text-[10px] font-black tracking-widest uppercase shadow-xl">
                  Studio Alpha
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 md:py-32 bg-[var(--surface)] border-y border-[var(--border)] relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="font-mono text-[11px] tracking-[4px] uppercase text-[var(--accent)]">// OUR MISSION</span>
            </motion.div>
            
            <motion.h2
              className="font-display font-black uppercase tracking-tight text-5xl md:text-6xl lg:text-7xl leading-none text-[var(--text)] mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Democratizing Premium Visuals.
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.p
                className="font-body text-[var(--muted)] text-lg leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                We believe that stunning visuals should not be a luxury, but a standard. Our mission is to bridge the gap between high-end photography and e-commerce agility using AI.
              </motion.p>
              <motion.p
                className="font-body text-[var(--muted)] text-lg leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                Every pixel we create is engineered to tell your brand&#39;s story and drive conversions, ensuring your products stand out in a crowded digital landscape.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 md:py-32" id="team-section">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <SectionHeading
            label="// Our Team"
            title="The minds behind the magic."
            subtitle="A fusion of human artistry and AI precision."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
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
                <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden bg-[var(--surface)] border border-[var(--border)] mb-8">
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
                  <span className="inline-block font-mono text-[11px] tracking-[3px] uppercase text-[var(--accent-text)] bg-[var(--accent)] px-3 py-1 rounded-full mb-4">
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
                    <p className="font-body text-sm text-[var(--muted)] leading-relaxed mb-6">
                      {member.bio}
                    </p>
                  )}

                  <div className="flex gap-3">
                    {member.instagramUrl && (
                      <a href={member.instagramUrl} target="_blank" rel="noopener noreferrer"
                        className="w-9 h-9 border border-[var(--border)] flex items-center justify-center hover:border-[var(--accent)] hover:text-[var(--accent)] rounded-full transition-all duration-300"
                        aria-label={`${member.name} Instagram`}>
                        <Instagram className="w-4 h-4" />
                      </a>
                    )}
                    {member.linkedinUrl && (
                      <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer"
                        className="w-9 h-9 border border-[var(--border)] flex items-center justify-center hover:border-[var(--accent)] hover:text-[var(--accent)] rounded-full transition-all duration-300"
                        aria-label={`${member.name} LinkedIn`}>
                        <Linkedin className="w-4 h-4" />
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
