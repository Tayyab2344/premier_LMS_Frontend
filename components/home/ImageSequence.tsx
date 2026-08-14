'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ImageSequenceProps {
  frameCount: number;
}

export function ImageSequence({ frameCount }: ImageSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const lastRenderedFrameRef = useRef<number>(-1);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    // Handle high-DPI displays
    const dpr = window.devicePixelRatio || 1;
    const renderWidth = 1760;
    const renderHeight = 1840;
    
    canvas.width = renderWidth * dpr;
    canvas.height = renderHeight * dpr;
    context.scale(dpr, dpr);
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    const frameCountStr = (num: number) => num.toString().padStart(3, '0');
    const currentFrame = (index: number) => `/hero-sequence/${frameCountStr(index + 1)}.png`;

    const render = (frameIndex: number) => {
      // Clamp the frame index
      const safeFrame = Math.max(0, Math.min(frameCount - 1, Math.round(frameIndex)));
      
      // Don't redraw if it's the exact same frame
      if (lastRenderedFrameRef.current === safeFrame) return;
      
      const img = imagesRef.current[safeFrame];
      if (img && img.complete) {
        context.clearRect(0, 0, renderWidth, renderHeight);
        context.drawImage(img, 0, 0, renderWidth, renderHeight);
        lastRenderedFrameRef.current = safeFrame;
      }
    };

    // If mobile or reduced motion, only load and draw the first frame
    if (isMobile || prefersReducedMotion) {
      const img = new Image();
      img.src = currentFrame(0);
      img.onload = () => {
        imagesRef.current[0] = img;
        render(0);
      };
      return;
    }

    const images: HTMLImageElement[] = [];
    
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        // Render first frame as soon as it's loaded
        if (i === 0) {
          render(0);
        }
      };
      images.push(img);
    }
    
    imagesRef.current = images;

    const animState = { frame: 0 };
    
    const ctx = gsap.context(() => {
      gsap.to(animState, {
        frame: frameCount - 1,
        snap: 'frame',
        ease: 'none',
        scrollTrigger: {
          trigger: '#home',
          start: 'top top',
          end: '+=1300',
          scrub: 0.1,
          pin: true,
        },
        onUpdate: () => {
          requestAnimationFrame(() => {
            render(animState.frame);
          });
        },
      });
    });

    return () => {
      ctx.revert();
      imagesRef.current = [];
      lastRenderedFrameRef.current = -1;
    };
  }, [frameCount]);

  return (
    <div className="w-full h-full flex items-center justify-center pointer-events-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain"
      />
    </div>
  );
}
