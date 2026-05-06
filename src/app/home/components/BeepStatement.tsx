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
    <section ref={sectionRef} className="py-24 px-6 md:px-12 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #f0eef8 0%, #ebe8f5 100%)' }}>
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full opacity-15 pointer-events-none -translate-y-1/2" style={{ background: 'radial-gradient(circle, rgba(95,64,222,0.3) 0%, transparent 70%)' }} />

      <div className="max-w-[1280px] mx-auto relative z-10">
        {/* Giant headline */}
        <div className="mb-12 reveal-from-bottom">
          <h2 className="font-display text-[72px] md:text-[96px] leading-[0.9] tracking-wide text-[#0a0a0a]">
            We are an agentic
          </h2>
          <div>
            <span
              className="text-[72px] md:text-[96px] leading-[0.9] text-[#5f40de]"
              style={{ fontFamily: 'Instrument Serif', fontStyle: 'italic' }}
            >
              decision + execution
            </span>
          </div>
          <h2 className="font-display text-[72px] md:text-[96px] leading-[0.9] tracking-wide text-[#0a0a0a]">
            layer that sits between
          </h2>
          <h2 className="font-display text-[72px] md:text-[96px] leading-[0.9] tracking-wide text-[#0a0a0a]">
            intent and transaction.
          </h2>
        </div>

        {/* Gradient rule */}
        <hr className="hr-gradient mb-12" />

        {/* Two columns */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="reveal-from-bottom reveal-delay-1">
            <p className="text-[17px] text-[#3a3a4a] leading-relaxed" style={{ fontFamily: 'Geist, sans-serif' }}>
              Every other platform gives you a list and walks away. Beep closes the gap. We built the agentic payments layer so our agent does not just recommend it executes. You describe what you want. The transaction completes.
            </p>
          </div>
          <div className="reveal-from-bottom reveal-delay-2">
            <div className="glass-strong rounded-2xl p-8 border border-[rgba(95,64,222,0.15)]">
              <p className="text-[18px] text-[#0a0a0a] leading-relaxed mb-6 italic" style={{ fontFamily: 'Instrument Serif' }}>
                "What if commerce worked the way you think? You think it. Beep does it. The rest is noise."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#5f40de] flex items-center justify-center text-white text-[12px] font-bold">S</div>
                <div>
                  <p className="text-[13px] font-semibold text-[#0a0a0a]" style={{ fontFamily: 'Geist, sans-serif' }}>Sahil Raj Singh</p>
                  <p className="text-[12px] text-[#6b6b80]" style={{ fontFamily: 'Geist, sans-serif' }}>Founder and CEO, Beep</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
