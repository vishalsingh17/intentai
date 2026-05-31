'use client';

import React, { useEffect, useRef, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function BeepWaitlist() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const supabase = createClient();
      await supabase.from('early_access_signups').insert({ email, source: 'waitlist' });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="waitlist" ref={sectionRef} className="py-28 px-6 md:px-12 relative overflow-hidden" style={{ background: '#1c3561' }}>
      {/* Subtle background texture */}
      <div className="absolute inset-0 pointer-events-none opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(197,214,234,0.8) 1px, transparent 0)', backgroundSize: '32px 32px' }} />

      <div className="max-w-[800px] mx-auto text-center relative z-10">
        {/* Badge */}
        <div className="mb-6 reveal-from-bottom">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[12px] font-semibold tracking-[0.15em]"
            style={{ fontFamily: "'Google Sans', sans-serif", color: '#c5d6ea', borderColor: 'rgba(197,214,234,0.25)', background: 'rgba(197,214,234,0.08)' }}
          >
            FULL COMMERCE OS · ON ROADMAP
          </span>
        </div>

        {/* Headline */}
        <div className="reveal-from-bottom reveal-delay-1 mb-4">
          <h2
            className="text-[64px] md:text-[88px] leading-[0.92]"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', color: '#ffffff', fontWeight: 600 }}
          >
            Be First.
          </h2>
        </div>
        <div className="reveal-from-bottom reveal-delay-1 mb-6">
          <span
            className="text-[64px] md:text-[88px] leading-[0.92]"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', color: '#c5d6ea', fontWeight: 600 }}
          >
            Shape What&apos;s Next.
          </span>
        </div>

        <p
          className="text-[17px] mt-6 mb-10 reveal-from-bottom reveal-delay-2"
          style={{ fontFamily: "'Google Sans', sans-serif", color: 'rgba(197,214,234,0.75)' }}
        >
          We&apos;re building BeepAi in the open. Join the waitlist and get early access, product updates, and a direct line to the team.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-[480px] mx-auto reveal-from-bottom reveal-delay-3">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              suppressHydrationWarning
              className="flex-1 px-5 py-3.5 rounded-lg text-[14px] focus:outline-none transition-all"
              style={{
                fontFamily: "'Google Sans', sans-serif",
                background: 'rgba(255,255,255,0.1)',
                border: '1.5px solid rgba(197,214,234,0.3)',
                color: '#ffffff',
              }}
              onFocus={e => { e.target.style.borderColor = '#c5d6ea'; e.target.style.boxShadow = '0 0 0 3px rgba(197,214,234,0.15)'; }}
              onBlur={e => { e.target.style.borderColor = 'rgba(197,214,234,0.3)'; e.target.style.boxShadow = 'none'; }}
            />
            <button
              type="submit"
              disabled={loading}
              suppressHydrationWarning
              className="px-6 py-3.5 text-[14px] font-semibold whitespace-nowrap rounded-lg cursor-none transition-all duration-200"
              style={{ background: '#ffffff', color: '#1c3561', fontFamily: "'Google Sans', sans-serif" }}
              onMouseEnter={e => { (e.target as HTMLButtonElement).style.background = '#c5d6ea'; }}
              onMouseLeave={e => { (e.target as HTMLButtonElement).style.background = '#ffffff'; }}
            >
              {loading ? 'Joining...' : 'Join the Waitlist'}
            </button>
          </form>
        ) : (
          <div className="flex items-center justify-center gap-2 font-medium text-[16px] reveal-from-bottom" style={{ color: '#c5d6ea' }}>
            <span className="w-6 h-6 rounded-full flex items-center justify-center text-[#1c3561] text-xs" style={{ background: '#c5d6ea' }}>✓</span>
            You are on the list. We will be in touch.
          </div>
        )}

        <p
          className="text-[12px] mt-3 reveal-from-bottom reveal-delay-4"
          style={{ fontFamily: "'Google Sans', sans-serif", color: 'rgba(197,214,234,0.5)' }}
        >
          No spam. Just signal. Unsubscribe anytime.
        </p>

        <div
          className="mt-10 flex flex-wrap items-center justify-center gap-4 text-[13px] reveal-from-bottom reveal-delay-4"
          style={{ fontFamily: "'Google Sans', sans-serif", color: 'rgba(197,214,234,0.5)' }}
        >
          <span>Built in India</span>
          <span className="w-1 h-1 rounded-full" style={{ background: 'rgba(197,214,234,0.3)' }} />
          <a href="https://beepnpay.com" style={{ color: '#c5d6ea' }} className="hover:opacity-80 transition-opacity">beepnpay.com</a>
        </div>
      </div>
    </section>
  );
}
