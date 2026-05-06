'use client';

import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (spotlightRef.current) {
        spotlightRef.current.style.left = `${e.clientX}px`;
        spotlightRef.current.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return <div ref={spotlightRef} className="cursor-spotlight" />;
}
