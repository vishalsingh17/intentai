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
    <section id="waitlist" ref={sectionRef} className="bg-white py-28 px-6 md:px-12">
      <div className="max-w-[900px] mx-auto text-center">
        <div className="mb-4 reveal-from-bottom">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[rgba(95,64,222,0.08)] border border-[rgba(95,64,222,0.15)] text-[#5f40de] text-[12px] font-semibold tracking-[0.15em]" style={{ fontFamily: 'Geist, sans-serif' }}>
            FULL COMMERCE OS · ON ROADMAP
          </span>
        </div>

        <div className="reveal-from-bottom reveal-delay-1">
          <h2 className="font-display text-[80px] md:text-[112px] leading-[0.88] tracking-wide text-[#0a0a0a]">
            Let beep
          </h2>
          <div>
            <span
              className="text-[80px] md:text-[112px] leading-[0.88] text-[#5f40de]"
              style={{ fontFamily: 'Instrument Serif', fontStyle: 'italic' }}
            >
              handle it.
            </span>
          </div>
        </div>

        <p className="text-[17px] text-[#6b6b80] mt-6 mb-10 reveal-from-bottom reveal-delay-2" style={{ fontFamily: 'Geist, sans-serif' }}>
          One sentence. That is all it takes. The rest is beep's problem.
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
              className="flex-1 px-4 py-3 rounded-full border border-[rgba(95,64,222,0.2)] bg-white text-[#0a0a0a] placeholder-[#9999aa] text-[14px] focus:outline-none focus:border-[#5f40de] focus:ring-2 focus:ring-[rgba(95,64,222,0.15)] transition-all"
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
          <div className="flex items-center justify-center gap-2 text-green-600 font-medium text-[16px] reveal-from-bottom">
            <span className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs">✓</span>
            You are on the list. We will be in touch.
          </div>
        )}

        <p className="text-[12px] text-[#9999aa] mt-3 reveal-from-bottom reveal-delay-4" style={{ fontFamily: 'Geist, sans-serif' }}>No spam, ever.</p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-[13px] text-[#6b6b80] reveal-from-bottom reveal-delay-4" style={{ fontFamily: 'Geist, sans-serif' }}>
          <span>Built in India</span>
          <span className="w-1 h-1 rounded-full bg-[#cccccc]" />
          <span>IIFT Delhi founders</span>
          <span className="w-1 h-1 rounded-full bg-[#cccccc]" />
          <a href="https://beepnpay.com" className="text-[#5f40de] hover:underline">beepnpay.com</a>
        </div>
      </div>
    </section>
  );
}
