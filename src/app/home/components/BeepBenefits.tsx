'use client';

import React, { useEffect, useRef } from 'react';

const BENEFITS = [
  { stat: '~8s', label: '30 minutes to 8 seconds', sub: 'Average time from intent to checkout' },
  { stat: '0', label: 'Price shown is the price paid', sub: 'Zero hidden charges, ever' },
  { stat: '1', label: 'Zero app switching', sub: 'One interface for everything' },
];

export default function BenefitsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.reveal-from-bottom').forEach(el => el.classList.add('active'));
          e.target.querySelectorAll('.card-reveal').forEach(el => el.classList.add('active'));
        }
      }),
      { threshold: 0.15 }
    );
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-6 md:px-12 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #ebe8f5 0%, #e8e4f5 100%)' }}>
      {/* Floating orb */}
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-15 pointer-events-none float-element" style={{ background: 'radial-gradient(circle, rgba(95,64,222,0.3) 0%, transparent 70%)', '--dur': '8s', '--delay': '1s' } as React.CSSProperties} />

      <div className="max-w-[1280px] mx-auto relative z-10">
        <h2 className="font-display text-[56px] md:text-[72px] text-[#0a0a0a] tracking-wide mb-12 reveal-from-bottom">
          What you actually get.
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {BENEFITS?.map((b, i) => (
            <div
              key={i}
              className={`glass-card rounded-2xl p-8 border border-[rgba(95,64,222,0.12)] hover:border-[rgba(95,64,222,0.3)] hover:shadow-xl transition-all duration-400 card-reveal stagger-${i + 1} border-glow`}
            >
              <div className="font-display text-[80px] leading-none text-[#5f40de] mb-4">{b?.stat}</div>
              <h3 className="text-[18px] font-semibold text-[#0a0a0a] mb-2" style={{ fontFamily: 'Geist, sans-serif' }}>{b?.label}</h3>
              <p className="text-[14px] text-[#6b6b80]" style={{ fontFamily: 'Geist, sans-serif' }}>{b?.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
