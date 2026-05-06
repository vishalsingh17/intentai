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
    <section id="waitlist" ref={sectionRef} className="py-28 px-6 md:px-12 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #2a2842 0%, #2e2b4a 50%, #332550 100%)' }}>
      {/* Background orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-12 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(124,95,240,0.4) 0%, transparent 70%)' }} />

      <div className="max-w-[900px] mx-auto text-center relative z-10">
        <div className="mb-4 reveal-from-bottom">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-[rgba(124,95,240,0.25)] text-[#9b7ff8] text-[12px] font-semibold tracking-[0.15em]" style={{ fontFamily: 'Geist, sans-serif' }}>
            FULL COMMERCE OS · ON ROADMAP
          </span>
        </div>

        <div className="reveal-from-bottom reveal-delay-1">
          <h2 className="font-display text-[80px] md:text-[112px] leading-[0.88] tracking-wide text-[#e8e4f8]">
            Let beep
          </h2>
          <div>
            <span
              className="text-[80px] md:text-[112px] leading-[0.88] text-[#9b7ff8]"
              style={{ fontFamily: 'Instrument Serif', fontStyle: 'italic' }}
            >
              handle it.
            </span>
          </div>
        </div>

        <p className="text-[17px] text-[#9090aa] mt-6 mb-10 reveal-from-bottom reveal-delay-2" style={{ fontFamily: 'Geist, sans-serif' }}>
          One sentence. That is all it takes.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-[440px] mx-auto reveal-from-bottom reveal-delay-3">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              suppressHydrationWarning
              className="flex-1 px-4 py-3 rounded-full border border-[rgba(124,95,240,0.25)] bg-[rgba(255,255,255,0.06)] text-[#e8e4f8] placeholder-[#606078] text-[14px] focus:outline-none focus:border-[#7c5ff0] focus:ring-2 focus:ring-[rgba(124,95,240,0.2)] transition-all"
              style={{ fontFamily: 'Geist, sans-serif' }}
            />
            <button
              type="submit"
              disabled={loading}
              suppressHydrationWarning
              className="btn-violet px-6 py-3 text-[14px] whitespace-nowrap cursor-none"
            >
              {loading ? 'Joining...' : 'Join now'}
            </button>
          </form>
        ) : (
          <div className="flex items-center justify-center gap-2 text-green-400 font-medium text-[16px] reveal-from-bottom">
            <span className="w-6 h-6 rounded-full bg-green-900/30 flex items-center justify-center text-green-400 text-xs">✓</span>
            You are on the list. We will be in touch.
          </div>
        )}

        <p className="text-[12px] text-[#606078] mt-3 reveal-from-bottom reveal-delay-4" style={{ fontFamily: 'Geist, sans-serif' }}>No spam, ever.</p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-[13px] text-[#9090aa] reveal-from-bottom reveal-delay-4" style={{ fontFamily: 'Geist, sans-serif' }}>
          <span>Built in India</span>
          <span className="w-1 h-1 rounded-full bg-[#404060]" />
          <a href="https://beepnpay.com" className="text-[#9b7ff8] hover:underline">beepnpay.com</a>
        </div>
      </div>
    </section>
  );
}
