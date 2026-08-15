'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  ArrowRight, 
  ArrowUp, 
  MessageCircle, 
  QrCode, 
  MapPin, 
  Mail, 
  Phone 
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function CTABanner() {
  return (
    <section className="section-padding bg-premier-cream relative overflow-hidden">
      <div className="section-container">
        <div className="relative rounded-3xl bg-gradient-to-br from-premier-green-dark via-premier-green to-premier-green-dark p-8 sm:p-14 md:p-16 text-white shadow-card-hover overflow-hidden">
          {/* Subtle background circles */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-premier-gold/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/4" />

          <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-block px-3.5 py-1 rounded-full bg-premier-cream/15 backdrop-blur-md text-white text-xs font-body font-semibold uppercase tracking-wider">
                Start Your Journey Today
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-heading font-extrabold leading-snug sm:leading-snug lg:leading-[1.25] text-white" style={{ letterSpacing: '-0.01em' }}>
                Transform Your Professional Skills With Raja Gulfam
              </h2>
              <p className="text-white/80 text-base sm:text-lg font-body max-w-2xl leading-relaxed">
                Join over 25,000 professionals mastering financial modeling, corporate taxation, and forensic audit standards. Enroll today for instant access.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 justify-end">
              <Link href="/courses" className="btn-primary !bg-premier-cream !text-premier-green hover:!bg-surface-hover shadow-lg text-center justify-center focus:outline-none focus:ring-2 focus:ring-premier-green focus:ring-offset-2 focus:ring-offset-premier-cream">
                Browse Courses
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/about#meet-founder" className="btn-secondary !bg-premier-cream/10 !text-white !border-white/40 hover:!bg-premier-cream/20 text-center justify-center focus:outline-none focus:ring-2 focus:ring-premier-green focus:ring-offset-2 focus:ring-offset-premier-cream">
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

  return (
    <div className="relative bg-premier-cream">
      {/* ── Curvy Arc Top SVG Divider ──────────────────────── */}
      <div className="relative w-full overflow-hidden leading-none z-10 -mb-1 pointer-events-none">
        <svg className="relative block w-full h-12 sm:h-16 md:h-20 text-[#091E16] fill-current" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M 0,100 C 360,15 1080,15 1440,100 L 1440,100 L 0,100 Z" />
        </svg>
      </div>

      {/* ── Dark Curvy Footer Container ───────────────────── */}
      <footer className="bg-[#091E16] text-slate-200 pt-8 pb-12 text-body relative">
        <div className="section-container space-y-12">
          
          {/* 4-Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start">
            
            {/* Col 1: Brand & Description & Social Icons */}
            <div className="lg:col-span-4 space-y-4">
              <Link href="/" className="flex items-center gap-3 focus:outline-none" aria-label="Premier LMS Home">
                <Image
                  src="/logo-icon.svg"
                  alt="Premier Academy Crest Logo"
                  width={44}
                  height={44}
                  className="h-11 w-11 object-contain rounded-xl shadow-md bg-white/10 p-1 border border-white/15"
                />
                <div className="flex flex-col leading-none">
                  <span className="font-heading font-extrabold text-xl text-white tracking-tight">
                    Premier <span className="text-emerald-400">Academy</span>
                  </span>
                  <span className="text-[10px] font-body text-emerald-300 uppercase tracking-widest font-semibold mt-1">
                    Tax & Accounting School
                  </span>
                </div>
              </Link>
              
              <p className="text-sm leading-relaxed text-slate-300 max-w-sm">
                Premier Learning Management System owned and instructed by Raja Gulfam. Empowering certified professionals globally with accredited education.
              </p>

              {/* Social Media Buttons */}
              <div className="flex items-center gap-3 pt-2">
                {/* Twitter / X */}
                <a href="#" aria-label="Twitter / X" className="w-9 h-9 rounded-full bg-white/10 hover:bg-emerald-400 hover:text-slate-950 text-white flex items-center justify-center transition-all duration-200 border border-white/20 shadow-sm">
                  <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                {/* Facebook */}
                <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full bg-white/10 hover:bg-emerald-400 hover:text-slate-950 text-white flex items-center justify-center transition-all duration-200 border border-white/20 shadow-sm">
                  <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                {/* YouTube */}
                <a href="#" aria-label="YouTube" className="w-9 h-9 rounded-full bg-white/10 hover:bg-emerald-400 hover:text-slate-950 text-white flex items-center justify-center transition-all duration-200 border border-white/20 shadow-sm">
                  <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                {/* LinkedIn */}
                <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-full bg-white/10 hover:bg-emerald-400 hover:text-slate-950 text-white flex items-center justify-center transition-all duration-200 border border-white/20 shadow-sm">
                  <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Col 2: Contact Info */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-sm font-heading font-bold text-white uppercase tracking-wider">
                Contact Info
              </h4>
              <ul className="space-y-3 text-sm text-slate-200">
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-slate-200">Premier Corporate Tower, Main Boulevard, Pakistan</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                  <a href="mailto:support@premierlms.com" className="text-slate-200 hover:text-emerald-400 transition-colors">
                    support@premierlms.com
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <a href="tel:+923000000000" className="text-slate-200 hover:text-emerald-400 transition-colors">
                    +92 (300) 000-0000
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Quick Links */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-sm font-heading font-bold text-white uppercase tracking-wider">
                Quick Links
              </h4>
              <ul className="space-y-2 text-sm text-slate-200">
                {[
                  { label: 'Home', href: '/' },
                  { label: 'About Raja Gulfam', href: '/about' },
                  { label: 'All Courses', href: '/courses' },
                  { label: 'Latest News', href: '/news' },
                  { label: 'Student Admission', href: '/admission' },
                ].map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-slate-200 hover:text-emerald-400 transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Support and Downloads */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-sm font-heading font-bold text-white uppercase tracking-wider">
                Support & Downloads
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Scan QR code or click below to download our Android mobile app.
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-1">
                {/* QR Code */}
                <div className="flex flex-col items-center gap-1 shrink-0">
                  <div className="bg-white p-1.5 rounded-xl border border-slate-700 shadow-sm">
                    <svg className="w-14 h-14 text-slate-900" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm8-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm13-2h3v3h-3v-3zm0 5h3v3h-3v-3zm-5-5h3v3h-3v-3zm0 5h3v3h-3v-3zm2.5-2.5h3v3h-3v-3zM5 5h2v2H5V5zm10 0h2v2h-2V5zM5 17h2v2H5v-2z"/>
                    </svg>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-300 uppercase tracking-wide flex items-center gap-1 mt-1">
                    <QrCode className="w-3.5 h-3.5 text-emerald-400" /> Scan QR
                  </span>
                </div>

                {/* Download App Buttons Stacked */}
                <div className="flex flex-col gap-2">
                  <a
                    href="#"
                    onClick={(e) => {
                      if (e.currentTarget.getAttribute('href') === '#') {
                        e.preventDefault();
                        alert('Play Store app link placeholder. Update route when live!');
                      }
                    }}
                    className="inline-flex items-center gap-2.5 bg-black hover:bg-slate-900 text-white px-3.5 py-2 rounded-xl border border-emerald-500/40 hover:border-emerald-400 transition-all shadow-sm group no-underline"
                    title="Download on Google Play (Fake Route)"
                  >
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                      <path d="M3.609 1.814L13.792 12 3.61 22.186a1.99 1.99 0 0 1-.61-1.416V3.23c0-.547.224-1.042.609-1.416z" fill="#00E676"/>
                      <path d="M15.206 13.414l2.766-2.766-13.682-7.9 10.916 10.666z" fill="#FFC107"/>
                      <path d="M15.206 10.586l2.766-1.342L4.29 1.344l10.916 10.666z" fill="#FF3D00"/>
                      <path d="M17.972 9.244l-2.766 1.342 2.342 2.342 2.342-2.342-1.918-1.342z" fill="#2196F3"/>
                    </svg>
                    <div className="flex flex-col text-left leading-none">
                      <span className="text-[8px] uppercase tracking-wider text-slate-300 font-semibold">GET IT ON</span>
                      <span className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">Google Play</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Copyright & Legal Line */}
          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
            <div>
              &copy; {new Date().getFullYear()} Premier LMS — Founded by Raja Gulfam. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <Link href="#" className="text-slate-300 hover:text-emerald-400 transition-colors">Privacy Policy</Link>
              <Link href="#" className="text-slate-300 hover:text-emerald-400 transition-colors">Terms of Service</Link>
              <Link href="#" className="text-slate-300 hover:text-emerald-400 transition-colors">Contact Support</Link>
            </div>
          </div>

        </div>

        {/* Floating WhatsApp Button */}
        <a
          href="https://wa.me/#"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact WhatsApp"
          className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
        >
          <MessageCircle className="w-6 h-6 fill-white text-emerald-600" />
        </a>

        {/* Back To Top Button */}
        {showTopBtn && (
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="fixed bottom-6 right-20 z-40 w-11 h-11 rounded-full bg-slate-800/90 backdrop-blur-md border border-slate-700 text-white flex items-center justify-center shadow-sm hover:bg-emerald-600 transition-all duration-300"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}
      </footer>
    </div>
  );
}

