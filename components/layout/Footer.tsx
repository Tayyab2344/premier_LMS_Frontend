'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { QrCode, Smartphone } from 'lucide-react';

import Image from 'next/image';

export default function Footer() {
  const pathname = usePathname();
  const hideFooter =
    pathname.startsWith('/auth') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/dashboard/classes') ||
    pathname.startsWith('/dashboard/recordings/player');

  if (hideFooter) return null;

  return (
    <footer className="bg-slate-900 text-slate-200 border-t border-slate-800 mt-auto">
      {/* Main Section */}
      <div className="container-main py-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-slate-800">

        {/* Brand & Info */}
        <div className="md:col-span-5 space-y-3">
          <div className="flex items-center gap-3">
            <Image
              src="/logo-icon.svg"
              alt="Premier Academy Crest"
              width={36}
              height={36}
              className="w-9 h-9 rounded-lg shadow-sm object-contain bg-white/10 p-1 border border-white/15"
            />
            <span className="text-xl font-bold text-white tracking-tight">
              Premier <span className="text-emerald-400">Academy</span>
            </span>
          </div>
          <p className="text-sm text-slate-300 max-w-sm leading-relaxed">
            Empowering students with top-tier professional qualifications, interactive classes, and seamless digital learning.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="md:col-span-3 flex flex-col space-y-2">
          <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-1">Quick Links</h4>
          <div className="flex flex-col space-y-2 text-sm text-slate-300">
            <Link href="/about" className="text-slate-300 hover:text-emerald-400 transition-colors no-underline">About Us</Link>
            <Link href="/courses" className="text-slate-300 hover:text-emerald-400 transition-colors no-underline">Courses</Link>
            <Link href="/contact" className="text-slate-300 hover:text-emerald-400 transition-colors no-underline">Contact Us</Link>
          </div>
        </div>

        {/* Mobile App Download */}
        <div className="md:col-span-4 space-y-3">
          <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Smartphone className="w-4 h-4 text-emerald-400" /> Get The Mobile App
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Access your courses, live classes, and recordings on the go.
          </p>

          <div className="flex items-center gap-4 pt-1">
            {/* QR Code Container */}
            <div className="flex flex-col items-center gap-1 shrink-0">
              <div className="bg-white p-1.5 rounded-xl border border-slate-700 shadow-sm flex items-center justify-center">
                <svg className="w-12 h-12 text-slate-900" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm8-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm13-2h3v3h-3v-3zm0 5h3v3h-3v-3zm-5-5h3v3h-3v-3zm0 5h3v3h-3v-3zm2.5-2.5h3v3h-3v-3zM5 5h2v2H5V5zm10 0h2v2h-2V5zM5 17h2v2H5v-2z" />
                </svg>
              </div>
              <span className="text-[9px] uppercase font-semibold text-emerald-400 tracking-wider flex items-center gap-1">
                <QrCode className="w-3 h-3 text-emerald-400" /> Scan QR
              </span>
            </div>

            {/* Play Store Button */}
            <a
              href="#"
              onClick={(e) => {
                if (e.currentTarget.getAttribute('href') === '#') {
                  e.preventDefault();
                  alert('Play Store app link placeholder. Update route when live!');
                }
              }}
              className="inline-flex items-center gap-2 bg-black hover:bg-slate-950 text-white px-3 py-2 rounded-xl border border-emerald-500/40 hover:border-emerald-400 transition-all shadow-sm group no-underline"
              title="Download on Google Play (Fake Route)"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a1.99 1.99 0 0 1-.61-1.416V3.23c0-.547.224-1.042.609-1.416z" fill="#00E676" />
                <path d="M15.206 13.414l2.766-2.766-13.682-7.9 10.916 10.666z" fill="#FFC107" />
                <path d="M15.206 10.586l2.766-1.342L4.29 1.344l10.916 10.666z" fill="#FF3D00" />
                <path d="M17.972 9.244l-2.766 1.342 2.342 2.342 2.342-2.342-1.918-1.342z" fill="#2196F3" />
              </svg>
              <div className="flex flex-col text-left leading-none">
                <span className="text-[8px] uppercase tracking-wider text-slate-300 font-semibold">GET IT ON</span>
                <span className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">Google Play</span>
              </div>
            </a>
          </div>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="container-main py-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-300 gap-2">
        <span>
          &copy; {new Date().getFullYear()} Premier Academy — All rights reserved.
        </span>
        <div className="flex items-center gap-4">
          <Link href="/about" className="text-slate-300 hover:text-emerald-400 transition-colors no-underline">About</Link>
          <span className="text-slate-700">•</span>
          <Link href="#" className="text-slate-300 hover:text-emerald-400 transition-colors no-underline">Privacy Policy</Link>
          <span className="text-slate-700">•</span>
          <Link href="#" className="text-slate-300 hover:text-emerald-400 transition-colors no-underline">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}

