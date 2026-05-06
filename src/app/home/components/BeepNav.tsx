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
          ? 'border-b border-[rgba(124,95,240,0.18)] shadow-lg'
          : 'bg-transparent border-b border-transparent'
      }`}
      style={scrolled ? { background: 'rgba(32, 30, 52, 0.94)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' } : {}}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => scrollTo('hero')} className="flex items-center gap-2.5 cursor-none">
          <Image
            src="/assets/images/beepAI___LOGO-1778057442337.jpg"
            alt="beep logo"
            width={36}
            height={36}
            className="flex-shrink-0 object-contain rounded-lg"
            priority
          />
          <span className="font-bold text-lg text-[#e8e4f8] tracking-tight" style={{ fontFamily: 'Geist, Inter, sans-serif' }}>
            beep
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
              className="text-[14px] font-medium text-[#c0bcd8] hover:text-[#9b7ff8] transition-colors duration-200 cursor-none"
              suppressHydrationWarning
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <button
          onClick={() => scrollTo('waitlist')}
          className="btn-violet px-5 py-2.5 text-[13px] cursor-none"
          suppressHydrationWarning
        >
          Join waitlist
        </button>
      </div>
    </header>
  );
}
