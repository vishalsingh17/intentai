'use client';

import React, { useEffect, useRef } from 'react';


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
    return (
      <span
        className="inline-flex items-center justify-center w-7 h-7 rounded-full"
        style={{ background: 'rgba(91,63,212,0.9)', border: '1.5px solid rgba(91,63,212,1)' }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>
    );
  }
  if (type === 'partial') {
    return (
      <span
        className="inline-flex items-center justify-center w-7 h-7 rounded-full"
        style={{ background: 'rgba(91,63,212,0.08)', border: '1.5px solid rgba(91,63,212,0.2)' }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="rgba(91,63,212,0.45)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>
    );
  }
  // cross
  return (
    <span
      className="inline-flex items-center justify-center w-7 h-7 rounded-full"
      style={{ background: 'rgba(0,0,0,0.03)', border: '1.5px solid rgba(0,0,0,0.08)' }}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
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
    <section ref={sectionRef} className="py-24 px-6 md:px-12 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #f5f4fa 0%, #edeaf7 100%)' }}>
      <div className="max-w-[1280px] mx-auto relative z-10">
        <div className="mb-3 reveal-from-bottom">
          <span className="section-label" style={{ color: 'rgba(91,63,212,0.7)' }}>Why beep</span>
        </div>
        <h2 className="font-display text-[56px] md:text-[72px] text-[#1a1630] tracking-wide mb-4 reveal-from-bottom">
          Why beep wins on what matters.
        </h2>
        <p className="text-[16px] text-[#6b6890] mb-12 reveal-from-bottom reveal-delay-1 max-w-[560px]" style={{ fontFamily: 'Geist, sans-serif' }}>
          Beep is not a booking platform. It is an agentic AI commerce execution layer. The difference is everything.
        </p>
        <div className="overflow-x-auto reveal-from-bottom reveal-delay-1">
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.80)',
              border: '1px solid rgba(91,63,212,0.15)',
              boxShadow: '0 8px 48px rgba(91,63,212,0.08), 0 0 0 1px rgba(91,63,212,0.06)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(91,63,212,0.1)' }}>
                  <th
                    className="text-left px-8 py-5 font-normal"
                    style={{ fontFamily: 'Geist, sans-serif', color: '#9090aa', fontSize: 13 }}
                  >
                    Feature
                  </th>
                  <th className="px-8 py-5 text-center w-[160px]">
                    <div className="flex justify-center">
                      <span
                        className="inline-flex items-center justify-center px-4 py-1.5 rounded-full text-[12px] font-bold text-white"
                        style={{ background: '#5b3fd4' }}
                      >
                        beep
                      </span>
                    </div>
                  </th>
                  <th
                    className="px-8 py-5 text-center w-[200px]"
                    style={{
                      fontFamily: 'Geist, sans-serif',
                      color: '#9090aa',
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
                      color: '#9090aa',
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
                    className="transition-colors duration-200 hover:bg-[rgba(91,63,212,0.03)]"
                    style={{
                      borderBottom: i < TABLE_ROWS.length - 1 ? '1px solid rgba(91,63,212,0.08)' : 'none',
                    }}
                  >
                    <td
                      className="px-8 py-5"
                      style={{ fontFamily: 'Geist, sans-serif', color: '#3d3a5c', fontSize: 14 }}
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
