'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

const TABLE_ROWS = [
  { feature: 'Natural language input', beep: 'check', traditional: 'tilde', voice: 'x' },
  { feature: 'Multi-provider search', beep: 'check', traditional: 'x', voice: 'x' },
  { feature: 'Autonomous checkout', beep: 'check', traditional: 'x', voice: 'x' },
  { feature: 'Zero app switching', beep: 'check', traditional: 'x', voice: 'x' },
  { feature: 'Learns preferences', beep: 'check', traditional: 'tilde', voice: 'tilde' },
  { feature: 'Every language on earth', beep: 'check', traditional: 'x', voice: 'tilde' },
  { feature: 'Agentic payment layer', beep: 'check', traditional: 'x', voice: 'x' },
];

const CheckIcon = () => (
  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full" style={{ background: 'rgba(95,64,222,0.25)', border: '1.5px solid rgba(95,64,222,0.5)' }}>
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2.5 7L5.5 10L11.5 4" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </span>
);

const XIcon = () => (
  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full" style={{ background: 'rgba(255,255,255,0.04)', border: '1.5px solid rgba(255,255,255,0.1)' }}>
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M3 3L9 9M9 3L3 9" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  </span>
);

const TildeIcon = () => (
  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full" style={{ background: 'rgba(255,255,255,0.04)', border: '1.5px solid rgba(255,255,255,0.12)' }}>
    <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 16, fontWeight: 300, lineHeight: 1 }}>~</span>
  </span>
);

const Icon = ({ type }: { type: string }) => {
  if (type === 'check') return <CheckIcon />;
  if (type === 'x') return <XIcon />;
  return <TildeIcon />;
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
    <section ref={sectionRef} className="py-24 px-6 md:px-12 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0d0b1a 0%, #100e20 100%)' }}>
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(95,64,222,0.12) 0%, transparent 70%)' }} />

      <div className="max-w-[1280px] mx-auto relative z-10">
        <div className="mb-3 reveal-from-bottom">
          <span className="text-[11px] tracking-[0.25em] uppercase font-semibold" style={{ color: 'rgba(167,139,250,0.8)', fontFamily: 'Geist, sans-serif' }}>Why beep</span>
        </div>
        <h2 className="font-display text-[56px] md:text-[72px] tracking-wide mb-4 reveal-from-bottom" style={{ color: '#ffffff' }}>
          Why beep wins on what matters.
        </h2>
        <p className="text-[16px] mb-12 reveal-from-bottom reveal-delay-1 max-w-[560px]" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'Geist, sans-serif' }}>
          Beep is not a booking platform. It is an agentic AI commerce execution layer. The difference is everything.
        </p>

        <div className="overflow-x-auto reveal-from-bottom reveal-delay-1">
          <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)' }}>
            <table className="w-full border-collapse">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <th className="text-left py-6 px-8 w-2/5">
                    <span className="text-[13px] font-medium" style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'Geist, sans-serif' }}>Feature</span>
                  </th>
                  <th className="text-center py-6 px-6 w-1/5">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center" style={{ background: 'rgba(95,64,222,0.3)', border: '2px solid rgba(95,64,222,0.5)' }}>
                        <Image
                          src="/assets/images/beepAI___LOGO-1778062410708.jpg"
                          alt="beep"
                          width={40}
                          height={40}
                          className="object-cover w-full h-full rounded-full"
                        />
                      </div>
                    </div>
                  </th>
                  <th className="text-center py-6 px-6 w-1/5">
                    <span className="text-[12px] font-semibold tracking-[0.12em] uppercase" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Geist, sans-serif' }}>Traditional Search</span>
                  </th>
                  <th className="text-center py-6 px-6 w-1/5">
                    <span className="text-[12px] font-semibold tracking-[0.12em] uppercase" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Geist, sans-serif' }}>Voice Assistants</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS.map((row, i) => (
                  <tr
                    key={i}
                    style={{ borderTop: '1px solid rgba(255,255,255,0.05)', background: i % 2 === 0 ? 'rgba(255,255,255,0.015)' : 'transparent' }}
                  >
                    <td className="py-5 px-8 text-[15px] font-medium" style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'Geist, sans-serif' }}>{row.feature}</td>
                    <td className="text-center py-5 px-6"><Icon type={row.beep} /></td>
                    <td className="text-center py-5 px-6"><Icon type={row.traditional} /></td>
                    <td className="text-center py-5 px-6"><Icon type={row.voice} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-8 mt-6 justify-end reveal-from-bottom reveal-delay-2">
          <div className="flex items-center gap-2 text-[12px]" style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'Geist, sans-serif' }}>
            <CheckIcon />
            Full support
          </div>
          <div className="flex items-center gap-2 text-[12px]" style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'Geist, sans-serif' }}>
            <TildeIcon />
            Partial
          </div>
          <div className="flex items-center gap-2 text-[12px]" style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'Geist, sans-serif' }}>
            <XIcon />
            Not available
          </div>
        </div>
      </div>
    </section>
  );
}
