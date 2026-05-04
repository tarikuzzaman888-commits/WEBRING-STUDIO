'use client';

import Link from 'next/link';
import type { SiteSettings } from '@/lib/types';

interface FooterProps {
  siteSettings: SiteSettings | null;
}

export default function Footer({ siteSettings }: FooterProps) {
  const email = siteSettings?.email || 'hello@webring.studio';
  const location = siteSettings?.location || 'Khulna, Bangladesh';

  return (
    <footer className="bg-[var(--surface)] dark:bg-[#0D0D0D] py-12 border-t border-[var(--border)]" id="site-footer">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Brand */}
          <Link href="/" className="font-display font-black uppercase text-2xl tracking-tighter text-[var(--text)] hover:opacity-80 transition-opacity">
            WEBRING
          </Link>

          {/* Contact Info */}
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 text-center md:text-right">
            <a 
              href={`mailto:${email}`} 
              className="font-body text-xs md:text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
            >
              {email}
            </a>
            <span className="font-body text-xs md:text-sm text-[var(--muted)]">
              {location}
            </span>
          </div>

        </div>
        
        {/* Bottom copyright */}
        <div className="mt-8 pt-8 border-t border-[var(--border)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[10px] text-[var(--muted)]/30 tracking-widest uppercase">
            © {new Date().getFullYear()} WEBRING STUDIO. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}
