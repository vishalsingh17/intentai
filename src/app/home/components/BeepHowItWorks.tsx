'use client';

import React, { useEffect, useRef } from 'react';

const STEPS = [
  {
    num: '01',
    title: 'Tell beep',
    desc: 'Say or type what you need in any language. One sentence is enough.',
    chips: ['Any language on earth', 'Voice or text', 'One sentence'],
  },
  {
    num: '02',
    title: 'Beep finds',
    desc: 'Our agent searches live inventory across providers and ranks the best options.',
    chips: ['Live inventory', 'Smart ranking', 'Multi-provider'],
  },
  {
    num: '03',
    title: 'Checkout completed',
    desc: 'Beep executes the transaction, sends your invoice and updates your calendar.',
    chips: ['UPI Reserve Pay native', 'Invoice on your email', 'Calendar and reminders'],
  },
];

export default function BeepHowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.reveal-from-bottom').forEach(el => el.classList.add('active'));
          e.target.querySelectorAll('.card-reveal').forEach(el => el.classList.add('active'));
        }
      }),
      { threshold: 0.1 }
    );
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section id="how-it-works" ref={sectionRef} className="py-24 px-6 md:px-12 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #252240 0%, #2a2748 100%)' }}>
      <div className="absolute top-10 right-10 w-72 h-72 rounded-full opacity-10 pointer-events-none float-element" style={{ background: 'radial-gradient(circle, rgba(124,95,240,0.3) 0%, transparent 70%)', '--dur': '10s', '--delay': '0s' } as React.CSSProperties} />

      <div className="max-w-[1280px] mx-auto relative z-10">
        <div className="mb-3 reveal-from-bottom">
          <span className="section-label">How it works</span>
        </div>
        <h2 className="font-display text-[56px] md:text-[72px] text-[#e8e4f8] tracking-wide mb-14 reveal-from-bottom">
          Three steps. That is it.
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {STEPS?.map((step, i) => (
            <div key={i} className={`glass-card rounded-2xl p-8 border border-[rgba(124,95,240,0.15)] hover:border-[rgba(124,95,240,0.3)] hover:shadow-xl transition-all duration-400 card-reveal stagger-${i + 1}`}>
              <div className="font-display text-[64px] text-[#7c5ff0] leading-none mb-4 opacity-40">{step?.num}</div>
              <h3 className="font-display text-[36px] text-[#e8e4f8] tracking-wide mb-3">{step?.title}</h3>
              <p className="text-[15px] text-[#9090aa] leading-relaxed mb-5" style={{ fontFamily: 'Geist, sans-serif' }}>{step?.desc}</p>
              <div className="flex flex-wrap gap-2">
                {step?.chips?.map((chip, j) => (
                  <span
                    key={j}
                    className="text-[12px] px-3 py-1.5 rounded-full border border-[rgba(124,95,240,0.25)] text-[#9b7ff8] bg-[rgba(124,95,240,0.08)]"
                    style={{ fontFamily: 'Geist, sans-serif' }}
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
