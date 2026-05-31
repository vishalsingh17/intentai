'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export default function BeepNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 border-b border-[rgba(28,53,97,0.1)] shadow-sm'
          : 'bg-transparent border-b border-transparent'
      }`}
      style={{ backdropFilter: scrolled ? 'blur(20px)' : 'none' }}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => scrollTo('hero')} className="flex items-center gap-3 cursor-none" suppressHydrationWarning>
          <Image
            src="/assets/images/beepAI___LOGO-1778062410708.jpg"
            alt="BeepAi logo"
            width={36}
            height={36}
            className="flex-shrink-0 object-contain rounded-full"
            priority
          />
          <span
            className="font-bold text-[18px] tracking-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', color: '#1c3561' }}
          >
            BeepAi
          </span>
        </button>

        {/* Center nav links */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: 'How it works', id: 'how-it-works' },
            { label: 'Experience', id: 'experience' },
            { label: 'Our story', id: 'our-story' },
            { label: 'Enterprise', id: 'enterprise' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-[14px] font-medium transition-colors duration-200 cursor-none"
              style={{ fontFamily: "'Google Sans', sans-serif", color: '#1c3561' }}
              suppressHydrationWarning
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <button
          onClick={() => scrollTo('waitlist')}
          className="btn-primary px-5 py-2.5 text-[13px] cursor-none"
          suppressHydrationWarning
        >
          Join the waitlist
        </button>
      </div>
    </header>
  );
}
