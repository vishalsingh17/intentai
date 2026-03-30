'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function Header() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
        scrolled
          ? 'bg-[rgba(8,8,16,0.92)] backdrop-blur-2xl border-[rgba(124,58,237,0.2)]'
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => scrollToSection('hero')}>
          <Image
            src="/assets/images/beep_logo-1774785208526.png"
            alt="beep logo"
            width={32}
            height={32}
            className="flex-shrink-0 object-contain"
            priority
          />
          <span
            className="font-bold text-lg text-white tracking-tight"
            style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", letterSpacing: '-0.01em' }}
          >
            beep
          </span>
        </div>

        {/* Nav links — desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: 'How it works', id: 'how-it-works' },
            { label: 'Demo', id: 'demo' },
            { label: 'Use Cases', id: 'use-cases' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-[12px] font-medium tracking-[0.15em] uppercase text-foreground-muted hover:text-foreground transition-colors duration-200"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <button
          onClick={() => scrollToSection('final-cta')}
          className="btn-primary px-5 py-2.5 text-[12px] font-semibold tracking-wide text-white"
          aria-label="Get Early Access"
          suppressHydrationWarning
        >
          <span>Get Early Access</span>
        </button>
      </div>
    </header>
  );
}