'use client';

import React, { useEffect, useRef } from 'react';

export default function StatementSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal-from-bottom').forEach(el => el.classList.add('active'));
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="pt-20 pb-8 px-6 md:px-12 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #2a2842 0%, #2e2b4a 100%)' }}>
      <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full opacity-10 pointer-events-none -translate-y-1/2" style={{ background: 'radial-gradient(circle, rgba(124,95,240,0.3) 0%, transparent 70%)' }} />

      <div className="max-w-[1280px] mx-auto relative z-10">
        <div className="mb-10 reveal-from-bottom">
          <h2 className="font-display text-[72px] md:text-[96px] leading-[0.9] tracking-wide text-[#e8e4f8]">
            We are an agentic
          </h2>
          <div>
            <span
              className="text-[72px] md:text-[96px] leading-[0.9] text-[#9b7ff8]"
              style={{ fontFamily: 'Instrument Serif', fontStyle: 'italic' }}
            >
              decision + execution
            </span>
          </div>
          <h2 className="font-display text-[72px] md:text-[96px] leading-[0.9] tracking-wide text-[#e8e4f8]">
            layer that sits between
          </h2>
          <h2 className="font-display text-[72px] md:text-[96px] leading-[0.9] tracking-wide text-[#e8e4f8]">
            intent and transaction.
          </h2>
        </div>

        <hr className="hr-gradient mb-8" />

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="reveal-from-bottom reveal-delay-1">
            <p className="text-[17px] text-[#c0bcd8] leading-relaxed" style={{ fontFamily: 'Geist, sans-serif' }}>
              Every other platform gives you a list and walks away. Beep closes the gap. We built the agentic payments layer so our agent does not just recommend it executes. You describe what you want. The transaction completes.
            </p>
          </div>
          <div className="reveal-from-bottom reveal-delay-2">
            <div className="glass-strong rounded-2xl p-8 border border-[rgba(124,95,240,0.2)]">
              <p className="text-[18px] text-[#e8e4f8] leading-relaxed mb-6 italic" style={{ fontFamily: 'Instrument Serif' }}>
                &ldquo;What if commerce worked the way you think? You think it. Beep does it. The rest is noise.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#7c5ff0] flex items-center justify-center text-white text-[12px] font-bold">S</div>
                <div>
                  <p className="text-[13px] font-semibold text-[#e8e4f8]" style={{ fontFamily: 'Geist, sans-serif' }}>Sahil Raj Singh</p>
                  <p className="text-[12px] text-[#9090aa]" style={{ fontFamily: 'Geist, sans-serif' }}>Founder and CEO, Beep</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
