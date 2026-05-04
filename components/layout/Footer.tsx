'use client';

import Link from 'next/link';
import { Instagram, Facebook, Linkedin, Mail, MapPin } from 'lucide-react';
import BrandLogo from '@/components/shared/BrandLogo';
import type { SiteSettings } from '@/lib/types';

const footerLinks = {
  company: [
    { href: '/about', label: 'About Us' },
    { href: '/services', label: 'Services' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/pricing', label: 'Pricing' },
  ],
  support: [
    { href: '/contact', label: 'Contact' },
    { href: '/book', label: 'Book a Call' },
    { href: '/pricing#pricing-faq', label: 'FAQ' },
  ],
};

interface FooterProps {
  siteSettings: SiteSettings | null;
}

export default function Footer({ siteSettings }: FooterProps) {
  const email = siteSettings?.email || 'hello@webring.studio';
  const location = siteSettings?.location || 'Bangladesh — Available Worldwide';

  return (
    <footer className="bg-[var(--surface)] border-t border-[var(--border)]" id="site-footer">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6 hover:opacity-80 transition-opacity">
              <BrandLogo className="scale-90 origin-left" />
            </Link>
            <p className="font-display font-black text-lg mb-2 uppercase tracking-wide text-[var(--text)]">
              AI VISUALS. STUDIO PRECISION.
            </p>
            <p className="font-body text-sm text-[var(--muted)] leading-relaxed mb-6">
              AI-powered product photography and brand visuals that convert. Based in Bangladesh, serving brands worldwide.
            </p>
            <div className="flex gap-3">
              <a
                href={siteSettings?.instagramUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-[var(--border)] hover:border-[var(--accent)] hover:bg-[var(--accent)]/10 flex items-center justify-center rounded-md dark:rounded-none transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 text-[var(--muted)] hover:text-[var(--accent)]" />
              </a>
              <a
                href={siteSettings?.facebookUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-[var(--border)] hover:border-[var(--accent)] hover:bg-[var(--accent)]/10 flex items-center justify-center rounded-md dark:rounded-none transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 text-[var(--muted)] hover:text-[var(--accent)]" />
              </a>
              <a
                href={siteSettings?.linkedinUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-[var(--border)] hover:border-[var(--accent)] hover:bg-[var(--accent)]/10 flex items-center justify-center rounded-md dark:rounded-none transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 text-[var(--muted)] hover:text-[var(--accent)]" />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-mono text-[11px] tracking-[4px] uppercase text-[var(--accent)] mb-6">// Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-mono text-[11px] tracking-[4px] uppercase text-[var(--accent)] mb-6">// Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-mono text-[11px] tracking-[4px] uppercase text-[var(--accent)] mb-6">// Contact</h3>
            <div className="space-y-4">
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-3 font-body text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
              >
                <Mail className="w-4 h-4 flex-shrink-0" />
                {email}
              </a>
              <div className="flex items-center gap-3 font-body text-sm text-[var(--muted)]">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                {location}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-[var(--muted)]">
            © {new Date().getFullYear()} WEBRING. All rights reserved.
          </p>
          <p className="font-mono text-[10px] text-[var(--muted)]/50 tracking-wider">
            ENGINEERED WITH AI
          </p>
        </div>
      </div>
    </footer>
  );
}
