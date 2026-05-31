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
    <section ref={sectionRef} className="pt-8 pb-24 px-6 md:px-12 relative overflow-hidden" style={{ background: '#ffffff' }}>
      <div className="max-w-[1280px] mx-auto relative z-10">
        <h2
          className="text-[48px] md:text-[64px] mb-12 reveal-from-bottom"
          style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', color: '#1c3561', fontWeight: 600 }}
        >
          What you actually get.
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {BENEFITS?.map((b, i) => (
            <div
              key={i}
              className={`rounded-2xl p-8 border hover:shadow-lg transition-all duration-300 card-reveal stagger-${i + 1}`}
              style={{ background: i === 0 ? '#1c3561' : '#f4f7fb', borderColor: i === 0 ? 'transparent' : 'rgba(28,53,97,0.08)' }}
            >
              <div
                className="text-[80px] leading-none mb-4"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', color: i === 0 ? '#c5d6ea' : '#1c3561', fontWeight: 600 }}
              >
                {b?.stat}
              </div>
              <h3
                className="text-[18px] font-semibold mb-2"
                style={{ fontFamily: "'Google Sans', sans-serif", color: i === 0 ? '#ffffff' : '#1c3561' }}
              >
                {b?.label}
              </h3>
              <p
                className="text-[14px]"
                style={{ fontFamily: "'Google Sans', sans-serif", color: i === 0 ? 'rgba(197,214,234,0.8)' : '#6b7fa0' }}
              >
                {b?.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
