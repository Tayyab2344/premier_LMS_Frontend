'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/AuthContext';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [search, setSearch] = useState('');

  const hideHeader = 
    pathname.startsWith('/auth') || 
    pathname.startsWith('/admin') ||
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/admission');

  useEffect(() => {
    if (hideHeader) return;
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [hideHeader]);

  if (hideHeader) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/courses?q=${encodeURIComponent(search.trim())}`);
      setMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    router.push('/');
  };

  return (
    <header
      id="main-header"
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? 'shadow-header' : ''
      } border-b border-border-light`}
    >
      <div className="container-main flex items-center justify-between h-16 gap-3">
        {/* ── Logo ─────────────────────────────── */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 no-underline group focus:outline-none focus:ring-2 focus:ring-premier-green focus:ring-offset-2 focus:ring-offset-premier-cream">
          <Image
            src="/logo-icon.svg"
            alt="Premier Academy Crest Logo"
            width={38}
            height={38}
            className="h-9 w-9 object-contain rounded-lg shadow-sm"
            priority
          />
          <div className="flex flex-col leading-none">
            <span className="font-heading font-extrabold text-base text-slate-900 tracking-tight">
              Premier <span className="text-emerald-700">Academy</span>
            </span>
          </div>
        </Link>

        {/* ── Search Bar (desktop) ─────────────── */}
        <div className="hidden md:flex flex-1 max-w-md">
          <form onSubmit={handleSearch} className="relative w-full">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              id="search-input"
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-border-light rounded-full
                         bg-white text-text-premier-green placeholder:text-gray-400
                         focus:border-brand-green focus:ring-1 focus:ring-brand-green/20 transition-all"
            />
          </form>
        </div>

        {/* ── Right Actions (desktop) ──────────── */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/courses" className="text-sm font-medium text-text-secondary hover:text-brand-green transition-colors no-underline focus:outline-none focus:ring-2 focus:ring-premier-green focus:ring-offset-2 focus:ring-offset-premier-cream">
            Courses
          </Link>
          <Link href="/about" className="text-sm font-medium text-text-secondary hover:text-brand-green transition-colors no-underline focus:outline-none focus:ring-2 focus:ring-premier-green focus:ring-offset-2 focus:ring-offset-premier-cream">
            About Us
          </Link>
          <Link href="/news" className="text-sm font-medium text-text-secondary hover:text-brand-green transition-colors no-underline focus:outline-none focus:ring-2 focus:ring-premier-green focus:ring-offset-2 focus:ring-offset-premier-cream">
            News &amp; Updates
          </Link>


          <Link href="/admission" className="text-sm font-medium text-brand-green hover:underline transition-colors no-underline focus:outline-none focus:ring-2 focus:ring-premier-green focus:ring-offset-2 focus:ring-offset-premier-cream">
            Apply Admission
          </Link>

          {user ? (
            <div className="flex items-center gap-3 ml-2 border-l border-border-light pl-3">
              {/* Show ENROLL NOW for students with no active enrollments */}
              {user.role === 'student' && user.enrolledCourses.length === 0 && (
                <Link href="/admission" className="btn-signup whitespace-nowrap no-underline text-center text-xs px-4 py-1.5 animate-pulse focus:outline-none focus:ring-2 focus:ring-premier-green focus:ring-offset-2 focus:ring-offset-premier-cream">
                  ENROLL NOW
                </Link>
              )}
              <Link href={user.role === 'admin' ? '/admin' : '/dashboard'} className="flex items-center gap-2 group no-underline focus:outline-none focus:ring-2 focus:ring-premier-green focus:ring-offset-2 focus:ring-offset-premier-cream">
                <Image src={user.avatar} alt={user.name} width={32} height={32} className="w-8 h-8 rounded-full object-cover border border-border-light group-hover:border-brand-green transition-colors" />
                <span className="text-sm font-semibold text-text-premier-green group-hover:text-brand-green transition-colors">{user.name.split(' ')[0]}</span>
              </Link>
              <button onClick={handleLogout} className="text-sm text-text-secondary hover:text-red-500 transition-colors font-medium ml-2 focus:outline-none focus:ring-2 focus:ring-premier-green focus:ring-offset-2 focus:ring-offset-premier-cream">
                Logout
              </button>
            </div>
          ) : (
            <>
              {/* Sign In */}
              <Link id="btn-signin" href="/auth/login" className="btn-signin whitespace-nowrap no-underline text-center focus:outline-none focus:ring-2 focus:ring-premier-green focus:ring-offset-2 focus:ring-offset-premier-cream">
                SIGN IN
              </Link>

              {/* Admission Form */}
              <Link id="btn-signup" href="/admission" className="btn-signup whitespace-nowrap no-underline text-center focus:outline-none focus:ring-2 focus:ring-premier-green focus:ring-offset-2 focus:ring-offset-premier-cream">
                ADMISSION FORM
              </Link>
            </>
          )}
        </div>

        {/* ── Mobile Toggle ────────────────────── */}
        <button
          className="md:hidden text-text-premier-green p-2 hover:bg-gray-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-premier-green focus:ring-offset-2 focus:ring-offset-premier-cream"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
      </div>

      {/* ── Mobile Menu ──────────────────────── */}
      {menuOpen && (
        <nav className="md:hidden bg-white border-t border-border-light animate-fade-in">
          <div className="container-main py-4 flex flex-col gap-2">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative mb-2">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search courses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-border-light rounded-full
                           bg-white text-text-premier-green placeholder:text-gray-400 focus:border-brand-green"
              />
            </form>

            <Link href="/courses" className="text-sm font-medium text-text-secondary hover:text-text-premier-green transition-colors py-2 no-underline focus:outline-none focus:ring-2 focus:ring-premier-green focus:ring-offset-2 focus:ring-offset-premier-cream" onClick={() => setMenuOpen(false)}>
              Courses
            </Link>
            <Link href="/about" className="text-sm font-medium text-text-secondary hover:text-text-premier-green transition-colors py-2 no-underline focus:outline-none focus:ring-2 focus:ring-premier-green focus:ring-offset-2 focus:ring-offset-premier-cream" onClick={() => setMenuOpen(false)}>
              About Us
            </Link>

            {user ? (
              <div className="flex flex-col gap-2">
                {user.role === 'student' && user.enrolledCourses.length === 0 && (
                  <Link href="/admission" className="btn-signup w-full text-center no-underline focus:outline-none focus:ring-2 focus:ring-premier-green focus:ring-offset-2 focus:ring-offset-premier-cream" onClick={() => setMenuOpen(false)}>
                    ENROLL NOW
                  </Link>
                )}
                <Link href={user.role === 'admin' ? '/admin' : '/dashboard'} className="flex items-center gap-3 py-2 no-underline focus:outline-none focus:ring-2 focus:ring-premier-green focus:ring-offset-2 focus:ring-offset-premier-cream" onClick={() => setMenuOpen(false)}>
                  <Image src={user.avatar} alt={user.name} width={32} height={32} className="w-8 h-8 rounded-full object-cover border border-border-light" />
                  <span className="text-sm font-semibold text-text-premier-green">{user.name}</span>
                </Link>
                <button onClick={handleLogout} className="text-left text-sm font-medium text-red-500 py-2 focus:outline-none focus:ring-2 focus:ring-premier-green focus:ring-offset-2 focus:ring-offset-premier-cream">
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link href="/auth/login" className="btn-signin w-full text-center no-underline focus:outline-none focus:ring-2 focus:ring-premier-green focus:ring-offset-2 focus:ring-offset-premier-cream" onClick={() => setMenuOpen(false)}>
                  SIGN IN
                </Link>
                <Link href="/auth/signup" className="btn-signup w-full text-center no-underline focus:outline-none focus:ring-2 focus:ring-premier-green focus:ring-offset-2 focus:ring-offset-premier-cream" onClick={() => setMenuOpen(false)}>
                  SIGN UP
                </Link>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
