'use client';

import React from 'react';

// Single global Lenis instance is provided at root level by LenisProvider in app/layout.tsx
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
