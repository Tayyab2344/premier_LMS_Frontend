'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, ArrowUp, MessageCircle, ShieldCheck } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function CTABanner() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="section-container">
        <div className="relative rounded-3xl bg-gradient-to-br from-primary-700 via-primary to-blue-600 p-8 sm:p-14 md:p-16 text-white shadow-card-hover overflow-hidden">
          {/* Subtle background circles */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/4" />

          <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-block px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-body font-semibold uppercase tracking-wider">
                Start Your Journey Today
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-heading font-extrabold leading-tight" style={{ letterSpacing: '-0.03em' }}>
                Transform Your Professional Skills With Raja Gulfam
              </h2>
              <p className="text-white/80 text-base sm:text-lg font-body max-w-2xl leading-relaxed">
                Join over 25,000 professionals mastering financial modeling, corporate taxation, and forensic audit standards. Enroll today for instant access.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 justify-end">
              <Link href="/courses" className="btn-primary !bg-white !text-primary hover:!bg-surface-hover shadow-lg text-center justify-center">
                Browse Courses
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/about#meet-founder" className="btn-secondary !bg-white/10 !text-white !border-white/40 hover:!bg-white/20 text-center justify-center">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const pathname = usePathname();
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isTopBtnShown = window.scrollY > 400;
      setShowTopBtn((prev) => (prev !== isTopBtnShown ? isTopBtnShown : prev));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (
    pathname?.startsWith('/auth') ||
    pathname?.startsWith('/admin') ||
    pathname?.startsWith('/dashboard') ||
    pathname?.startsWith('/admission')
  ) {
    return null;
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <footer className="bg-surface-secondary border-t border-border pt-16 pb-12 text-body relative">
      <div className="section-container space-y-12">
        {/* 4 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: About */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3" aria-label="Premier LMS Home">
              <Image
                src="/logo.png"
                alt="Premier Tax Corporate & Accounting School Logo"
                width={180}
                height={50}
                className="h-11 w-auto object-contain"
              />
            </Link>
            <p className="text-sm leading-relaxed max-w-sm text-slate-600">
              Premier Learning Management System owned and instructed by Raja Gulfam. Empowering certified professionals globally with accredited tax, accounting, and finance education.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="text-xs font-semibold text-heading flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" aria-hidden="true" /> Verified Educational Academy
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-heading font-extrabold uppercase tracking-wider text-heading">Quick Links</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              {[
                { label: 'Home', href: '/' },
                { label: 'About Raja Gulfam', href: '/about' },
                { label: 'All Courses', href: '/courses' },
                { label: 'Latest News & Updates', href: '/news' },
                { label: 'Student Admission', href: '/admission' },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="hover:text-primary transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Popular Courses */}
          <div className="space-y-3">
            <h4 className="text-xs font-heading font-extrabold uppercase tracking-wider text-heading">Popular Tracks</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              {['Corporate Tax Reform', 'Financial Modeling', 'Forensic Accounting', 'Estate & Wealth Tax', 'IFRS Standards'].map((item) => (
                <li key={item}>
                  <Link href="/courses" className="hover:text-primary transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-heading font-extrabold uppercase tracking-wider text-heading">Newsletter</h4>
            <p className="text-xs text-slate-600">Subscribe for regulatory updates & exclusive discounts.</p>
            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  aria-label="Your email address for newsletter updates"
                  placeholder="Your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-border text-xs outline-none focus:border-primary transition-colors bg-white text-heading"
                />
                <button type="submit" className="w-full btn-primary !py-2 !text-xs" aria-label="Subscribe to newsletter">
                  Subscribe
                </button>
              </form>
            ) : (
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-200">
                Thank you for subscribing!
              </div>
            )}
          </div>
        </div>

        {/* Bottom copyright & legal */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            &copy; {new Date().getFullYear()} Premier LMS — Founded by Raja Gulfam. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-primary transition-colors">Contact Support</Link>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/#"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact WhatsApp"
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
      >
        <MessageCircle className="w-6 h-6 fill-white text-emerald-500" />
      </a>

      {/* Back To Top Button */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-6 right-20 z-40 w-11 h-11 rounded-full bg-white border border-border text-heading flex items-center justify-center shadow-card hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </footer>
  );
}
