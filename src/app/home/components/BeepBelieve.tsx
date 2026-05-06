'use client';

import React, { useEffect, useRef } from 'react';

const WORDS = [
  'book flights', 'find hotels', 'plan trips', 'track prices', 'order food',
  'order groceries', 'book cabs', 'pay bills', 'schedule reminders', 'manage tasks',
  'plan your day', 'automate routines', 'handle errands', 'make decisions',
  'execute tasks', 'do less manually', 'live more',
];

interface FloatingWord {
  text: string;
  x: number;
  y: number;
  opacity: number;
  duration: number;
  delay: number;
  size: number;
}

export default function WhatWeBelieve() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.querySelectorAll('.reveal-from-bottom').forEach(el => el.classList.add('active'));
      }),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Generate floating word positions deterministically
  const floatingWords: FloatingWord[] = [];
  const wordPool = [...WORDS, ...WORDS, ...WORDS];
  wordPool.forEach((text, i) => {
    floatingWords.push({
      text,
      x: (i * 17 + 5) % 90,
      y: (i * 13 + 8) % 85,
      opacity: 0.06 + (i % 5) * 0.02,
      duration: 7 + (i % 6) * 2,
      delay: (i % 8) * 1.2,
      size: 14 + (i % 4) * 4,
    });
  });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-32 px-6 md:px-12"
      style={{ background: 'linear-gradient(135deg, #edeaf7 0%, #e8e5f5 100%)' }}
    >
      {/* Floating words background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingWords.map((word, i) => (
          <span
            key={i}
            className="absolute float-word font-medium select-none"
            style={{
              left: `${word.x}%`,
              top: `${word.y}%`,
              opacity: word.opacity * 0.6,
              fontSize: `${word.size}px`,
              fontFamily: 'Geist, sans-serif',
              color: '#5b3fd4',
              '--base-opacity': word.opacity * 0.6,
              '--duration': `${word.duration}s`,
              '--delay': `${word.delay}s`,
            } as React.CSSProperties}
          >
            {word.text}
          </span>
        ))}
      </div>

      {/* Centered content */}
      <div className="relative z-10 max-w-[900px] mx-auto text-center">
        <div className="mb-6 reveal-from-bottom">
          <span className="text-[#5b3fd4] text-[12px] tracking-[0.25em] uppercase font-medium" style={{ fontFamily: 'Geist, sans-serif' }}>
            What we believe
          </span>
        </div>

        <div className="mb-4 reveal-from-bottom">
          <h2 className="font-display text-[96px] md:text-[128px] leading-[0.88] tracking-wide text-[#1a1630]">
            Think less
          </h2>
        </div>
        <div className="mb-8 reveal-from-bottom reveal-delay-1">
          <span
            className="text-[96px] md:text-[128px] leading-[0.88] text-[#5b3fd4]"
            style={{ fontFamily: 'Instrument Serif', fontStyle: 'italic' }}
          >
            do more.
          </span>
        </div>

        <p className="text-[18px] text-[#6b6890] mb-10 reveal-from-bottom reveal-delay-2" style={{ fontFamily: 'Geist, sans-serif' }}>
          We sweat the details, you just command.
        </p>

        <div className="reveal-from-bottom reveal-delay-3">
          <button
            onClick={() => {
              const el = document.getElementById('waitlist');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-violet px-8 py-4 text-[15px]"
            suppressHydrationWarning
          >
            Start with beep →
          </button>
        </div>
      </div>
    </section>
  );
}
