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

  // Detect if current page has a dark hero header
  const isDarkPage = pathname === '/courses';

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          isDarkPage
            ? scrolled
              ? 'bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 shadow-2xl text-white'
              : 'bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 text-white'
            : scrolled
            ? 'bg-white/95 backdrop-blur-lg shadow-soft border-b border-border text-slate-900'
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
                  className={`font-heading font-extrabold text-lg tracking-tight transition-colors ${
                    isDarkPage
                      ? 'text-white group-hover:text-emerald-400'
                      : 'text-slate-900 group-hover:text-premier-green'
                  }`}
                >
                  Premier <span className={isDarkPage ? 'text-emerald-400' : 'text-emerald-700'}>Academy</span>
                </span>
                <span
                  className={`text-[10px] font-body uppercase tracking-widest font-semibold mt-1 ${
                    isDarkPage ? 'text-amber-400/90' : 'text-slate-500'
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
                    className={`relative px-4 py-2 text-base font-body font-semibold rounded-xl transition-all duration-200 ${
                      isActive
                        ? isDarkPage
                          ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                          : 'bg-premier-green text-white font-bold shadow-soft'
                        : isDarkPage
                        ? 'text-slate-300 hover:text-white hover:bg-white/10'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/80'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/auth/login"
                className={`px-4 py-2.5 text-base font-body font-semibold transition-colors ${
                  isDarkPage ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                Login
              </Link>
              <Link
                href="/admission"
                className={
                  isDarkPage
                    ? 'inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-heading font-extrabold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all'
                    : 'btn-primary !py-2.5 !px-6 !text-[13px]'
                }
              >
                <span>Enroll Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              className={`lg:hidden p-2 rounded-xl transition-colors ${
                isDarkPage ? 'text-white hover:bg-slate-800' : 'text-slate-900 hover:bg-slate-100'
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
            className={`fixed inset-x-0 top-[72px] z-40 border-b shadow-elevated lg:hidden ${
              isDarkPage
                ? 'bg-slate-950/95 border-slate-800 text-white backdrop-blur-xl'
                : 'bg-white border-border text-slate-900'
            }`}
          >
            <div className="section-container py-6 space-y-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block py-3 px-4 rounded-xl text-base font-body font-semibold transition-all ${
                      isActive
                        ? isDarkPage
                          ? 'bg-emerald-500 text-slate-950 font-bold'
                          : 'bg-premier-green text-white font-bold'
                        : isDarkPage
                        ? 'text-slate-300 hover:bg-slate-800 hover:text-white'
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
                  className={`w-full text-center py-2.5 rounded-xl font-body font-semibold text-base border ${
                    isDarkPage ? 'border-slate-700 text-white' : 'border-border text-slate-900'
                  }`}
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
