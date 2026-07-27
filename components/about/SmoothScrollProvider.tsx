'use client';

import React, { useEffect } from 'react';

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let lenis: any = null;
    let rafId: number | null = null;

    const initLenis = async () => {
      try {
        const Lenis = (await import('@studio-freight/lenis')).default;
        lenis = new Lenis({
          duration: 0.8,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          touchMultiplier: 1.5,
        });

        function raf(time: number) {
          if (lenis) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
          }
        }

        rafId = requestAnimationFrame(raf);
      } catch (err) {
        console.warn('Lenis failed to initialize, falling back to native scroll:', err);
      }
    };

    initLenis();

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      if (lenis) {
        lenis.destroy();
        lenis = null;
      }
    };
  }, []);

  return <>{children}</>;
}
