'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

const TABLE_ROWS = [
  { feature: 'Natural language input', beep: 'check', traditional: 'partial', voice: 'cross' },
  { feature: 'Multi-provider search', beep: 'check', traditional: 'cross', voice: 'cross' },
  { feature: 'Autonomous checkout', beep: 'check', traditional: 'cross', voice: 'cross' },
  { feature: 'Zero app switching', beep: 'check', traditional: 'cross', voice: 'cross' },
  { feature: 'Learns preferences', beep: 'check', traditional: 'partial', voice: 'partial' },
  { feature: 'Agentic payment layer', beep: 'check', traditional: 'cross', voice: 'cross' },
  { feature: 'Every language on earth', beep: 'check', traditional: 'cross', voice: 'partial' },
];

const CheckIcon = ({ type }: { type: string }) => {
  if (type === 'check') {
    // Purple filled circle with white checkmark — matches reference screenshot
    return (
      <span
        className="inline-flex items-center justify-center w-7 h-7 rounded-full"
        style={{ background: 'rgba(124,95,240,0.9)', border: '1.5px solid rgba(124,95,240,1)' }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>
    );
  }
  if (type === 'partial') {
    // Muted grey circle with faint checkmark — matches reference screenshot
    return (
      <span
        className="inline-flex items-center justify-center w-7 h-7 rounded-full"
        style={{ background: 'rgba(255,255,255,0.07)', border: '1.5px solid rgba(255,255,255,0.18)' }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>
    );
  }
  // cross — very faint X circle
  return (
    <span
      className="inline-flex items-center justify-center w-7 h-7 rounded-full"
      style={{ background: 'rgba(255,255,255,0.04)', border: '1.5px solid rgba(255,255,255,0.1)' }}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </span>
  );
};

export default function ComparisonTable() {
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

  return (
    <section ref={sectionRef} className="py-24 px-6 md:px-12 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #28253f 0%, #2c2948 100%)' }}>
      <div className="max-w-[1280px] mx-auto relative z-10">
        <div className="mb-3 reveal-from-bottom">
          <span className="section-label" style={{ color: 'rgba(180,170,230,0.7)' }}>Why beep</span>
        </div>
        <h2 className="font-display text-[56px] md:text-[72px] text-[#e8e4f8] tracking-wide mb-4 reveal-from-bottom">
          Why beep wins on what matters.
        </h2>
        <p className="text-[16px] text-[#a0a0c0] mb-12 reveal-from-bottom reveal-delay-1 max-w-[560px]" style={{ fontFamily: 'Geist, sans-serif' }}>
          Beep is not a booking platform. It is an agentic AI commerce execution layer. The difference is everything.
        </p>
        <div className="overflow-x-auto reveal-from-bottom reveal-delay-1">
          {/* Table container — matches reference screenshot dark card */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(18, 16, 32, 0.92)',
              border: '1px solid rgba(124,95,240,0.2)',
              boxShadow: '0 8px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(124,95,240,0.08)',
            }}
          >
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <th
                    className="text-left px-8 py-5 font-normal"
                    style={{ fontFamily: 'Geist, sans-serif', color: 'rgba(255,255,255,0.45)', fontSize: 13 }}
                  >
                    Feature
                  </th>
                  <th className="px-8 py-5 text-center w-[160px]">
                    {/* Beep logo pill — matches reference screenshot */}
                    <div className="flex justify-center">
                      <span
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full"
                        style={{ background: 'rgba(124,95,240,0.25)', border: '1.5px solid rgba(124,95,240,0.5)' }}
                      >
                        <Image
                          src="/assets/images/beep_logo-1774785208526.png"
                          alt="beep"
                          width={22}
                          height={22}
                          className="object-contain"
                        />
                      </span>
                    </div>
                  </th>
                  <th
                    className="px-8 py-5 text-center w-[200px]"
                    style={{
                      fontFamily: 'Geist, sans-serif',
                      color: 'rgba(255,255,255,0.38)',
                      fontSize: 11,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      fontWeight: 500,
                    }}
                  >
                    Traditional Search
                  </th>
                  <th
                    className="px-8 py-5 text-center w-[200px]"
                    style={{
                      fontFamily: 'Geist, sans-serif',
                      color: 'rgba(255,255,255,0.38)',
                      fontSize: 11,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      fontWeight: 500,
                    }}
                  >
                    Voice Assistants
                  </th>
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS.map((row, i) => (
                  <tr
                    key={i}
                    className="transition-colors duration-200 hover:bg-[rgba(124,95,240,0.04)]"
                    style={{
                      borderBottom: i < TABLE_ROWS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                    }}
                  >
                    <td
                      className="px-8 py-5"
                      style={{ fontFamily: 'Geist, sans-serif', color: 'rgba(255,255,255,0.58)', fontSize: 14 }}
                    >
                      {row.feature}
                    </td>
                    <td className="px-8 py-5 text-center">
                      <div className="flex justify-center">
                        <CheckIcon type={row.beep} />
                      </div>
                    </td>
                    <td className="px-8 py-5 text-center">
                      <div className="flex justify-center">
                        <CheckIcon type={row.traditional} />
                      </div>
                    </td>
                    <td className="px-8 py-5 text-center">
                      <div className="flex justify-center">
                        <CheckIcon type={row.voice} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
