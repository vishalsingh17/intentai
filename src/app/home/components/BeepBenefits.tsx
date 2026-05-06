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
        if (e.isIntersecting) e.target.querySelectorAll('.reveal-from-bottom').forEach(el => el.classList.add('active'));
      }),
      { threshold: 0.15 }
    );
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#f8f8ff] py-24 px-6 md:px-12">
      <div className="max-w-[1280px] mx-auto">
        <h2 className="font-display text-[56px] md:text-[72px] text-[#0a0a0a] tracking-wide mb-12 reveal-from-bottom">
          What you actually get.
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {BENEFITS?.map((b, i) => (
            <div
              key={i}
              className={`bg-white rounded-2xl p-8 border border-[rgba(95,64,222,0.1)] hover:border-[rgba(95,64,222,0.25)] transition-all duration-300 reveal-from-bottom reveal-delay-${i + 1}`}
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
