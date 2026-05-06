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
        if (e.isIntersecting) e.target.querySelectorAll('.reveal-from-bottom').forEach(el => el.classList.add('active'));
      }),
      { threshold: 0.1 }
    );
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section id="how-it-works" ref={sectionRef} className="bg-white py-24 px-6 md:px-12">
      <div className="max-w-[1280px] mx-auto">
        <div className="mb-3 reveal-from-bottom">
          <span className="section-label">How it works</span>
        </div>
        <h2 className="font-display text-[56px] md:text-[72px] text-[#0a0a0a] tracking-wide mb-14 reveal-from-bottom">
          Three steps. That is it.
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {STEPS?.map((step, i) => (
            <div key={i} className={`reveal-from-bottom reveal-delay-${i + 1}`}>
              <div className="font-display text-[64px] text-[#5f40de] leading-none mb-4 opacity-30">{step?.num}</div>
              <h3 className="font-display text-[36px] text-[#0a0a0a] tracking-wide mb-3">{step?.title}</h3>
              <p className="text-[15px] text-[#6b6b80] leading-relaxed mb-5" style={{ fontFamily: 'Geist, sans-serif' }}>{step?.desc}</p>
              <div className="flex flex-wrap gap-2">
                {step?.chips?.map((chip, j) => (
                  <span
                    key={j}
                    className="text-[12px] px-3 py-1.5 rounded-full border border-[rgba(95,64,222,0.2)] text-[#5f40de] bg-[rgba(95,64,222,0.04)]"
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
