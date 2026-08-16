'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Courses', href: '/courses' },
  { label: 'News', href: '/news' },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (
    pathname?.startsWith('/auth') ||
    pathname?.startsWith('/admin') ||
    pathname?.startsWith('/dashboard') ||
    pathname?.startsWith('/admission')
  ) {
    return null;
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled
            ? 'bg-white/95 backdrop-blur-lg shadow-soft border-b border-border'
            : 'bg-slate-950/40 backdrop-blur-md border-b border-white/10'
          }`}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-premier-green focus:ring-offset-2 focus:ring-offset-premier-cream" aria-label="Premier LMS Homepage">
              <Image
                src="/logo-icon.svg"
                alt="Premier Academy Crest Logo"
                width={44}
                height={44}
                className="h-11 w-11 object-contain rounded-xl shadow-sm transition-transform group-hover:scale-105"
                priority
              />
              <div className="flex flex-col leading-none">
                <span className={`font-heading font-extrabold text-lg tracking-tight transition-colors ${
                  scrolled ? 'text-slate-900 group-hover:text-premier-green' : 'text-white group-hover:text-emerald-300'
                }`}>
                  Premier <span className={scrolled ? 'text-emerald-700' : 'text-emerald-400'}>Academy</span>
                </span>
                <span className={`text-[10px] font-body uppercase tracking-widest font-semibold mt-1 transition-colors ${
                  scrolled ? 'text-slate-500' : 'text-slate-300'
                }`}>
                  Tax & Accounting School
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 text-base font-body font-semibold transition-colors group focus:outline-none ${
                      isActive
                        ? scrolled ? 'text-slate-900 font-bold' : 'text-white font-bold'
                        : scrolled ? 'text-slate-700 hover:text-slate-900' : 'text-slate-200 hover:text-white'
                    }`}
                  >
                    {link.label}
                    {/* Animated Pill Underline Indicator */}
                    <span
                      className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-5 h-[3px] rounded-full origin-center transition-transform duration-300 ease-out ${
                        scrolled ? 'bg-[#5D3A1A]' : 'bg-emerald-400'
                      } ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/auth/login"
                className={`px-5 py-2.5 text-base font-body font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-premier-green focus:ring-offset-2 focus:ring-offset-premier-cream ${
                  scrolled ? 'text-slate-700 hover:text-heading' : 'text-white hover:text-emerald-300'
                }`}
              >
                Login
              </Link>
              <Link
                href="/admission"
                className="btn-primary !py-2.5 !px-6 !text-[13px] focus:outline-none focus:ring-2 focus:ring-premier-green focus:ring-offset-2 focus:ring-offset-premier-cream"
              >
                Enroll Now
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className={`lg:hidden p-2 rounded-xl transition-colors ${
                scrolled ? 'text-heading hover:bg-surface-secondary' : 'text-white hover:bg-white/10'
              }`}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[72px] z-40 bg-white border-b border-border shadow-elevated lg:hidden"
          >
            <div className="section-container py-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 px-4 rounded-xl text-base font-body font-semibold text-heading hover:bg-surface-secondary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-border flex flex-col gap-3">
                <Link href="/auth/login" onClick={() => setMobileOpen(false)} className="btn-secondary w-full">
                  Login
                </Link>
                <Link href="/admission" onClick={() => setMobileOpen(false)} className="btn-primary w-full">
                  Enroll Now <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
