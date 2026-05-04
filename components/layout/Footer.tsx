'use client';

import Link from 'next/link';
import { Instagram, Facebook, Linkedin, ArrowUpRight, Mail, MapPin } from 'lucide-react';
import type { SiteSettings } from '@/lib/types';

interface FooterProps {
  siteSettings: SiteSettings | null;
}

const pageLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/contact', label: 'Contact' },
  { href: '/book', label: 'Book a Call' },
];

const serviceLinks = [
  'AI Product Photography',
  'Lifestyle Photography',
  'E-commerce Visuals',
  'AI Image & Video',
  'Brand Identity',
];

export default function Footer({ siteSettings }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0D0D0D] text-[#F5F5F5]" id="site-footer">
      {/* Large Display Text */}
      <div className="border-b border-[#2A2A2A]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-16 md:py-24">
          <h2 className="font-display text-[clamp(3rem,8vw,8rem)] leading-[0.9] tracking-tight text-[#F5F5F5]">
            WEBRING
          </h2>
          <p className="font-body text-[#888888] text-lg mt-4 max-w-md">
            AI-Powered Product Photography & Brand Visual Studio
          </p>
        </div>
      </div>

      {/* 4-Column Grid */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* About */}
          <div>
            <h3 className="font-display text-xl mb-6 text-[#F5F5F5]">About</h3>
            <p className="font-body text-sm text-[#888888] leading-relaxed mb-6">
              We engineer reality through AI-powered visuals. From product photography to complete brand identities, we help e-commerce brands stand out and convert.
            </p>
            <div className="flex items-center gap-2 text-sm text-[#888888]">
              <MapPin className="w-4 h-4 text-[#C8A96E]" />
              <span>{siteSettings?.location || 'Bangladesh — Available Worldwide'}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#888888] mt-2">
              <Mail className="w-4 h-4 text-[#C8A96E]" />
              <a href={`mailto:${siteSettings?.email || 'hello@webring.studio'}`} className="hover:text-[#C8A96E] transition-colors">
                {siteSettings?.email || 'hello@webring.studio'}
              </a>
            </div>
          </div>

          {/* Pages */}
          <div>
            <h3 className="font-display text-xl mb-6 text-[#F5F5F5]">Pages</h3>
            <ul className="space-y-3">
              {pageLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-[#888888] hover:text-[#C8A96E] transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display text-xl mb-6 text-[#F5F5F5]">Services</h3>
            <ul className="space-y-3">
              {serviceLinks.map((service) => (
                <li key={service}>
                  <Link
                    href="/services"
                    className="font-body text-sm text-[#888888] hover:text-[#C8A96E] transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-display text-xl mb-6 text-[#F5F5F5]">Connect</h3>
            <div className="flex gap-3 mb-8">
              {siteSettings?.instagramUrl && (
                <a
                  href={siteSettings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-[#2A2A2A] flex items-center justify-center hover:border-[#C8A96E] hover:bg-[#C8A96E]/10 transition-all"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {siteSettings?.facebookUrl && (
                <a
                  href={siteSettings.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-[#2A2A2A] flex items-center justify-center hover:border-[#C8A96E] hover:bg-[#C8A96E]/10 transition-all"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {siteSettings?.linkedinUrl && (
                <a
                  href={siteSettings.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-[#2A2A2A] flex items-center justify-center hover:border-[#C8A96E] hover:bg-[#C8A96E]/10 transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {!siteSettings?.instagramUrl && !siteSettings?.facebookUrl && !siteSettings?.linkedinUrl && (
                <>
                  <a href="#" className="w-10 h-10 rounded-full border border-[#2A2A2A] flex items-center justify-center hover:border-[#C8A96E] hover:bg-[#C8A96E]/10 transition-all" aria-label="Instagram">
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full border border-[#2A2A2A] flex items-center justify-center hover:border-[#C8A96E] hover:bg-[#C8A96E]/10 transition-all" aria-label="Facebook">
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full border border-[#2A2A2A] flex items-center justify-center hover:border-[#C8A96E] hover:bg-[#C8A96E]/10 transition-all" aria-label="LinkedIn">
                    <Linkedin className="w-4 h-4" />
                  </a>
                </>
              )}
            </div>

            {/* Newsletter */}
            <div>
              <p className="font-body text-sm text-[#888888] mb-3">Stay updated</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 bg-[#111111] border border-[#2A2A2A] rounded-l-lg px-4 py-2.5 text-sm text-[#F5F5F5] placeholder:text-[#555] focus:outline-none focus:border-[#C8A96E] font-body"
                />
                <button className="px-4 py-2.5 bg-[#C8A96E] text-[#0A0A0A] font-body text-sm font-medium rounded-r-lg hover:bg-[#B8953A] transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#2A2A2A]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-[#888888]">
            © {currentYear} WEBRING. All rights reserved.
          </p>
          <p className="font-body text-xs text-[#888888]">
            Crafted in Bangladesh 🇧🇩
          </p>
        </div>
      </div>
    </footer>
  );
}
