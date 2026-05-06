'use client';

import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.left = `${mouseX}px`;
        dotRef.current.style.top = `${mouseY}px`;
      }
      if (spotlightRef.current) {
        spotlightRef.current.style.left = `${mouseX}px`;
        spotlightRef.current.style.top = `${mouseY}px`;
      }

      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, [role="button"], input, select, textarea, label');
      if (dotRef.current) {
        if (isInteractive) {
          dotRef.current.style.width = '18px';
          dotRef.current.style.height = '18px';
          dotRef.current.style.background = 'rgba(124, 95, 240, 0.7)';
        } else {
          dotRef.current.style.width = '10px';
          dotRef.current.style.height = '10px';
          dotRef.current.style.background = '#7c5ff0';
        }
      }
      if (ringRef.current) {
        if (isInteractive) {
          ringRef.current.style.width = '48px';
          ringRef.current.style.height = '48px';
          ringRef.current.style.borderColor = 'rgba(124, 95, 240, 0.7)';
        } else {
          ringRef.current.style.width = '34px';
          ringRef.current.style.height = '34px';
          ringRef.current.style.borderColor = 'rgba(124, 95, 240, 0.55)';
        }
      }
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.1;
      ringY += (mouseY - ringY) * 0.1;
      if (ringRef.current) {
        ringRef.current.style.left = `${ringX}px`;
        ringRef.current.style.top = `${ringY}px`;
      }
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={spotlightRef} className="cursor-spotlight" />
      <div ref={dotRef} className="custom-cursor" />
      <div ref={ringRef} className="custom-cursor-ring" />
    </>
  );
}
