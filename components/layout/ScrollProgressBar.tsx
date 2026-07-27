'use client';

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function ScrollProgressBar() {
  const progressRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      if (!progressRef.current) return;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(1, Math.max(0, window.scrollY / totalHeight));
        progressRef.current.style.transform = `scaleX(${progress})`;
      } else {
        progressRef.current.style.transform = 'scaleX(0)';
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    // Immediate initial check on mount & route change
    updateProgress();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [pathname]);

  return <div ref={progressRef} className="scroll-progress" />;
}
