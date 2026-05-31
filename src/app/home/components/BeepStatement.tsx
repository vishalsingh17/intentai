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
    <section ref={sectionRef} className="pt-24 pb-12 px-6 md:px-12 relative overflow-hidden" style={{ background: '#ffffff' }}>
      {/* Subtle accent line */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(28,53,97,0.15), transparent)' }} />

      <div className="max-w-[1280px] mx-auto relative z-10">
        {/* Section label */}
        <div className="mb-8 reveal-from-bottom">
          <span className="section-label">What we are</span>
        </div>

        {/* Giant headline */}
        <div className="mb-10 reveal-from-bottom">
          <h2
            className="text-[64px] md:text-[88px] leading-[0.92] mb-2"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', color: '#1c3561', fontWeight: 600 }}
          >
            We are an agentic
          </h2>
          <div className="mb-2">
            <span
              className="text-[64px] md:text-[88px] leading-[0.92]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', color: '#c5d6ea', fontWeight: 600 }}
            >
              decision + execution
            </span>
          </div>
          <h2
            className="text-[64px] md:text-[88px] leading-[0.92] mb-2"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', color: '#1c3561', fontWeight: 600 }}
          >
            layer that sits between
          </h2>
          <h2
            className="text-[64px] md:text-[88px] leading-[0.92]"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', color: '#1c3561', fontWeight: 600 }}
          >
            intent and transaction.
          </h2>
        </div>

        {/* Gradient rule */}
        <hr className="hr-gradient mb-10" />

        {/* Two columns */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="reveal-from-bottom reveal-delay-1">
            <p className="text-[17px] leading-relaxed" style={{ fontFamily: "'Google Sans', sans-serif", color: '#4a5f80' }}>
              Every other platform gives you a list and walks away. Beep closes the gap. We built the agentic payments layer so our agent does not just recommend — it executes. You describe what you want. The transaction completes.
            </p>
          </div>
          <div className="reveal-from-bottom reveal-delay-2">
            <div className="rounded-2xl p-8 border" style={{ background: '#f4f7fb', borderColor: 'rgba(28,53,97,0.1)' }}>
              <p
                className="text-[18px] leading-relaxed mb-6"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', color: '#1c3561' }}
              >
                &ldquo;What if commerce worked the way you think? You think it. Beep does it. The rest is noise.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[12px] font-bold" style={{ background: '#1c3561' }}>S</div>
                <div>
                  <p className="text-[13px] font-semibold" style={{ fontFamily: "'Google Sans', sans-serif", color: '#1c3561' }}>Sahil Raj Singh</p>
                  <p className="text-[12px]" style={{ fontFamily: "'Google Sans', sans-serif", color: '#6b7fa0' }}>Founder and CEO, BeepAi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
