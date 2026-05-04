'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#000000] py-12 border-t border-[#1A1A1A]" id="site-footer">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Brand */}
          <Link href="/" className="font-display font-black uppercase text-2xl tracking-tighter text-[var(--text)] hover:opacity-80 transition-opacity">
            WEBRING
          </Link>

          {/* Contact Info */}
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 text-center md:text-right">
            <a 
              href="mailto:hello@webring.studio" 
              className="font-body text-xs md:text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
            >
              hello@webring.studio
            </a>
            <span className="font-body text-xs md:text-sm text-[var(--muted)]">
              +880-XXXXXXXXXX
            </span>
          </div>

        </div>
        
        {/* Bottom copyright (optional, but keep it minimal) */}
        <div className="mt-8 pt-8 border-t border-[#1A1A1A] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[10px] text-[var(--muted)]/30 tracking-widest uppercase">
            © {new Date().getFullYear()} WEBRING STUDIO. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}
