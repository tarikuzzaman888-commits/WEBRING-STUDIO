'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import ThemeToggle from '@/components/shared/ThemeToggle';
import BrandLogo from '@/components/shared/BrandLogo';
import { cn, getGMT6Time } from '@/lib/utils';
import MarqueeStrip from '@/components/home/MarqueeStrip';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [clock, setClock] = useState('');
  const [utcClock, setUtcClock] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateClocks = () => {
      setClock(getGMT6Time());
      const now = new Date();
      const utcStr = now.toLocaleTimeString('en-US', { 
        timeZone: 'UTC', 
        hour12: true, 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      });
      setUtcClock(utcStr);
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);


  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex flex-col">
        {pathname === '/' && <MarqueeStrip text="" />}
        <nav
          id="main-navbar"
          className={cn(
            'relative w-full transition-all duration-300',
            scrolled
              ? 'border-b border-[var(--border)] shadow-sm glass bg-[var(--bg)]/95'
              : 'bg-transparent'
          )}
          style={scrolled ? { backgroundColor: mounted && resolvedTheme === 'dark' ? 'rgba(10,10,10,0.95)' : 'rgba(250,250,248,0.95)' } : undefined}
        >
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group" id="nav-logo">
              <BrandLogo className="group-hover:opacity-80 transition-opacity" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  id={`nav-${link.label.toLowerCase()}`}
                  className={cn(
                    'relative font-body text-sm tracking-wide transition-colors duration-300 hover:text-[var(--accent)]',
                    pathname === link.href ? 'text-[var(--accent)]' : 'text-[var(--text)]'
                  )}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-px bg-[var(--accent)]"
                      layoutId="nav-underline"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-4">
              {/* Live Clocks */}
              <div className="flex items-center gap-3 font-mono text-[10px] text-[var(--muted)] tracking-wider">
                <div className="flex items-center gap-1.5" id="nav-utc">
                  <span className="text-[var(--accent)] font-bold">UTC</span> {utcClock}
                </div>
                <div className="w-px h-3 bg-[var(--border)]" />
                <div className="flex items-center gap-1.5" id="nav-clock">
                  <span className="text-[var(--accent)] font-bold">GMT+6</span> {clock}
                </div>
              </div>

              <ThemeToggle />

              <Link
                href="/book"
                id="nav-book-call"
                className="px-5 py-2.5 bg-[var(--accent)] text-[var(--accent-text)] font-body text-sm font-extrabold uppercase rounded-full rounded-[2rem] transition-all duration-300 hover:shadow-lg hover:shadow-[var(--accent)]/20"
              >
                Book a Call
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="flex lg:hidden items-center gap-2">
              <ThemeToggle />
              <button
                className="w-10 h-10 flex items-center justify-center"
                onClick={() => setMobileOpen(!mobileOpen)}
                id="mobile-menu-toggle"
                aria-label="Toggle mobile menu"
              >
                {mobileOpen ? (
                  <X className="w-6 h-6 text-[var(--text)]" />
                ) : (
                  <Menu className="w-6 h-6 text-[var(--text)]" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[var(--bg)] flex flex-col justify-center items-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    href={link.href}
                    id={`mobile-nav-${link.label.toLowerCase()}`}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'font-display text-4xl dark:uppercase tracking-tight transition-colors',
                      pathname === link.href ? 'text-[var(--accent)]' : 'text-[var(--text)] hover:text-[var(--accent)]'
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col items-center gap-4 mt-8"
              >
                <div className="flex flex-col items-center gap-1 font-mono text-[10px] text-[var(--muted)] mt-4">
                  <span>UTC {utcClock}</span>
                  <span className="text-[var(--accent)] font-bold">GMT+6 {clock}</span>
                </div>
                <Link
                  href="/book"
                  id="mobile-nav-book"
                  onClick={() => setMobileOpen(false)}
                  className="px-8 py-3 bg-[var(--accent)] text-[var(--accent-text)] font-body text-base font-extrabold uppercase rounded-full rounded-[2rem]"
                >
                  Book a Call
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
