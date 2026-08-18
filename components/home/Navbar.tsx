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

const TICKER_TEXTS =
  'FBR Circular No. 4 of 2026: Extension for Income Tax Return Filing & Wealth Reconciliation | SECP Notification: Mandatory Filing of Ultimate Beneficial Ownership (UBO) Disclosures | Punjab Revenue Authority (PRA) & Sindh Revenue Board (SRB) GST Rule Revisions | Federal Tax Ombudsman (FTO) Directives for Taxpayers';

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

  // Detect if page has a dark hero background unscrolled
  const isDarkHeroPage = pathname === '/' || pathname === '/about' || pathname === '/courses';
  const isDarkHeader = isDarkHeroPage && !scrolled;

  return (
    <>
      {/* ── Fixed Top Live Ticker Bar (Above Navbar) ────────────────────── */}
      <div className="fixed top-0 inset-x-0 z-[60] h-9 bg-[#1B3B2C] border-b border-[#2A523E] flex items-center overflow-hidden">
        <div className="flex items-center w-full pl-2 sm:pl-3 pr-4">
          {/* LIVE Pill (Very Left) */}
          <div className="shrink-0 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-600 select-none mr-3 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-white">LIVE</span>
          </div>

          {/* Marquee Track */}
          <div className="overflow-hidden flex-1 relative">
            <div className="marquee-track flex items-center whitespace-nowrap">
              <span className="text-xs font-body font-medium px-4 text-[#F3EBD8]">
                {TICKER_TEXTS}
              </span>
              <span className="text-xs font-body font-medium px-4 text-[#F3EBD8]" aria-hidden>
                {TICKER_TEXTS}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Fixed Main Navbar Header (Positioned directly under 36px top ticker bar) ── */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-9 inset-x-0 z-50 transition-all duration-500 ${scrolled
            ? 'bg-white/95 backdrop-blur-lg shadow-soft border-b border-border text-slate-900'
            : isDarkHeroPage
              ? 'bg-slate-950/40 backdrop-blur-md border-b border-white/10 text-white'
              : 'bg-transparent text-slate-900'
        }`}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-[72px]">

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-premier-green focus:ring-offset-2"
              aria-label="Premier LMS Homepage"
            >
              <Image
                src="/logo-icon.svg"
                alt="Premier Academy Crest Logo"
                width={44}
                height={44}
                className="h-11 w-11 object-contain rounded-xl shadow-sm transition-transform group-hover:scale-105"
                priority
              />
              <div className="flex flex-col leading-none">
                <span
                  className={`font-heading font-extrabold text-lg tracking-tight transition-colors ${isDarkHeader
                      ? 'text-white group-hover:text-premier-gold'
                      : 'text-premier-green group-hover:text-premier-gold'
                    }`}
                >
                  Premier <span className="text-premier-gold font-extrabold">Academy</span>
                </span>
                <span
                  className={`text-[10px] font-body uppercase tracking-widest font-semibold mt-1 transition-colors ${isDarkHeader ? 'text-slate-300' : 'text-slate-500'
                    }`}
                >
                  Tax &amp; Accounting School
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
                    className={`relative px-4 py-2 text-base font-body font-semibold transition-colors group focus:outline-none ${isActive
                        ? isDarkHeader
                          ? 'text-white font-bold'
                          : 'text-slate-900 font-bold'
                        : isDarkHeader
                          ? 'text-slate-200 hover:text-white'
                          : 'text-slate-700 hover:text-slate-900'
                      }`}
                  >
                    {link.label}
                    {/* Animated Pill Underline Indicator */}
                    <span
                      className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-5 h-[3px] rounded-full origin-center transition-transform duration-300 ease-out ${isDarkHeader ? 'bg-emerald-400' : 'bg-[#5D3A1A]'
                        } ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
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
                className={`px-5 py-2.5 text-base font-body font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-premier-green focus:ring-offset-2 ${isDarkHeader ? 'text-white hover:text-emerald-300' : 'text-slate-700 hover:text-heading'
                  }`}
              >
                Login
              </Link>
              <Link
                href="/admission"
                className="btn-primary !py-2.5 !px-6 !text-[13px] focus:outline-none focus:ring-2 focus:ring-premier-green focus:ring-offset-2"
              >
                <span>Enroll Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              className={`lg:hidden p-2 rounded-xl transition-colors ${isDarkHeader ? 'text-white hover:bg-white/10' : 'text-heading hover:bg-surface-secondary'
                }`}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[108px] z-40 bg-white border-b border-border shadow-elevated lg:hidden text-slate-900"
          >
            <div className="section-container py-6 space-y-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block py-3 px-4 rounded-xl text-base font-body font-semibold transition-all ${isActive
                        ? 'bg-premier-green text-white font-bold'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <div className="pt-4 border-t border-border flex flex-col gap-3">
                <Link
                  href="/auth/login"
                  onClick={() => setMobileOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl font-body font-semibold text-base border border-border text-slate-900"
                >
                  Login
                </Link>
                <Link
                  href="/admission"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary w-full text-center justify-center !py-3"
                >
                  Enroll Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
