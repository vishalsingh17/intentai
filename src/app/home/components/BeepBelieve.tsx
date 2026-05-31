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
      opacity: 0.04 + (i % 5) * 0.02,
      duration: 7 + (i % 6) * 2,
      delay: (i % 8) * 1.2,
      size: 14 + (i % 4) * 4,
    });
  });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-32 px-6 md:px-12"
      style={{ background: '#1c3561' }}
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
              opacity: word.opacity,
              fontSize: `${word.size}px`,
              fontFamily: "'Google Sans', sans-serif",
              color: '#c5d6ea',
              '--base-opacity': word.opacity,
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
          <span
            className="text-[12px] tracking-[0.25em] uppercase font-medium"
            style={{ fontFamily: "'Google Sans', sans-serif", color: 'rgba(197,214,234,0.7)' }}
          >
            What we believe
          </span>
        </div>

        <div className="mb-4 reveal-from-bottom">
          <h2
            className="text-[88px] md:text-[120px] leading-[0.88]"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', color: '#ffffff', fontWeight: 600 }}
          >
            Think less
          </h2>
        </div>
        <div className="mb-8 reveal-from-bottom reveal-delay-1">
          <span
            className="text-[88px] md:text-[120px] leading-[0.88]"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', color: '#c5d6ea', fontWeight: 600 }}
          >
            do more.
          </span>
        </div>

        <p
          className="text-[18px] mb-10 reveal-from-bottom reveal-delay-2"
          style={{ fontFamily: "'Google Sans', sans-serif", color: 'rgba(197,214,234,0.7)' }}
        >
          We sweat the details, you just command.
        </p>

        <div className="reveal-from-bottom reveal-delay-3">
          <button
            onClick={() => {
              const el = document.getElementById('waitlist');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-4 text-[15px] font-semibold rounded-lg cursor-none transition-all duration-200"
            style={{ background: '#ffffff', color: '#1c3561', fontFamily: "'Google Sans', sans-serif" }}
            suppressHydrationWarning
            onMouseEnter={e => { (e.target as HTMLButtonElement).style.background = '#c5d6ea'; }}
            onMouseLeave={e => { (e.target as HTMLButtonElement).style.background = '#ffffff'; }}
          >
            Start with BeepAi →
          </button>
        </div>
      </div>
    </section>
  );
}
