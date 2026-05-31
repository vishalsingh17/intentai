'use client';

import React, { useEffect, useRef } from 'react';

const STEPS = [
  {
    num: '01',
    title: 'Tell BeepAi',
    desc: 'Say or type what you need in any language. One sentence is enough.',
    chips: ['Any language on earth', 'Voice or text', 'One sentence'],
  },
  {
    num: '02',
    title: 'BeepAi finds',
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
    <section id="how-it-works" ref={sectionRef} className="py-24 px-6 md:px-12 relative overflow-hidden" style={{ background: '#f4f7fb' }}>
      <div className="max-w-[1280px] mx-auto relative z-10">
        <div className="mb-3 reveal-from-bottom">
          <span className="section-label">How it works</span>
        </div>
        <h2
          className="text-[48px] md:text-[64px] mb-14 reveal-from-bottom"
          style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', color: '#1c3561', fontWeight: 600 }}
        >
          Three steps. That is it.
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {STEPS?.map((step, i) => (
            <div
              key={i}
              className={`rounded-2xl p-8 border hover:shadow-md transition-all duration-300 card-reveal stagger-${i + 1}`}
              style={{ background: '#ffffff', borderColor: 'rgba(28,53,97,0.1)' }}
            >
              <div
                className="text-[64px] leading-none mb-4 opacity-20"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', color: '#1c3561', fontWeight: 700 }}
              >
                {step?.num}
              </div>
              <h3
                className="text-[28px] mb-3"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', color: '#1c3561', fontWeight: 600 }}
              >
                {step?.title}
              </h3>
              <p className="text-[15px] leading-relaxed mb-5" style={{ fontFamily: "'Google Sans', sans-serif", color: '#6b7fa0' }}>
                {step?.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {step?.chips?.map((chip, j) => (
                  <span
                    key={j}
                    className="text-[12px] px-3 py-1.5 rounded-full border"
                    style={{ fontFamily: "'Google Sans', sans-serif", color: '#1c3561', borderColor: 'rgba(28,53,97,0.2)', background: 'rgba(28,53,97,0.04)' }}
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
