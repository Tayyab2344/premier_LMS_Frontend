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
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-lg shadow-soft border-b border-border'
            : 'bg-transparent'
        }`}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group" aria-label="Premier LMS Homepage">
              <Image
                src="/logo.png"
                alt="Premier Tax Corporate & Accounting School Logo"
                width={180}
                height={50}
                className="h-11 w-auto object-contain transition-transform group-hover:scale-105"
                priority
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-2 text-base font-body font-semibold text-slate-700 hover:text-heading transition-colors group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover:w-5" />
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/auth/login"
                className="px-5 py-2.5 text-base font-body font-semibold text-slate-700 hover:text-heading transition-colors"
              >
                Login
              </Link>
              <Link
                href="/admission"
                className="btn-primary !py-2.5 !px-6 !text-[13px]"
              >
                Enroll Now
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className="lg:hidden p-2 rounded-xl hover:bg-surface-secondary text-heading transition-colors"
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
