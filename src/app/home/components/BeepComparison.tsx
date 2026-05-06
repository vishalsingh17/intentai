'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

const TABLE_ROWS = [
  { feature: 'Natural language commerce intent', beep: 'check', traditional: 'dash', voice: 'tilde' },
  { feature: 'Autonomous multi-step execution', beep: 'check', traditional: 'dash', voice: 'dash' },
  { feature: 'Agentic payment layer', beep: 'check', traditional: 'dash', voice: 'dash' },
  { feature: 'Zero app switching', beep: 'check', traditional: 'dash', voice: 'dash' },
  { feature: 'Multi-provider live inventory', beep: 'check', traditional: 'tilde', voice: 'dash' },
  { feature: 'Price shown is price paid', beep: 'check', traditional: 'dash', voice: 'dash' },
  { feature: 'Learns user preferences', beep: 'check', traditional: 'tilde', voice: 'tilde' },
  { feature: 'Every language on earth', beep: 'check', traditional: 'dash', voice: 'tilde' },
  { feature: 'Calendar and reminder integration', beep: 'check', traditional: 'dash', voice: 'tilde' },
  { feature: 'Enterprise API access', beep: 'check', traditional: 'dash', voice: 'dash' },
];

const Icon = ({ type }: { type: string }) => {
  if (type === 'check') return (
    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-green-100 text-green-600 text-[14px] font-bold">✓</span>
  );
  if (type === 'dash') return (
    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 text-gray-400 text-[16px] font-light">—</span>
  );
  return (
    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-50 text-amber-500 text-[16px] font-medium">~</span>
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
    <section ref={sectionRef} className="py-24 px-6 md:px-12 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #e2dff0 0%, #ddd9ee 100%)' }}>
      <div className="max-w-[1280px] mx-auto relative z-10">
        <div className="mb-3 reveal-from-bottom">
          <span className="section-label">Why beep</span>
        </div>
        <h2 className="font-display text-[56px] md:text-[72px] text-[#0a0a0a] tracking-wide mb-4 reveal-from-bottom">
          Why beep wins on what matters.
        </h2>
        <p className="text-[16px] text-[#6b6b80] mb-12 reveal-from-bottom reveal-delay-1 max-w-[560px]" style={{ fontFamily: 'Geist, sans-serif' }}>
          Beep is not a booking platform. It is an agentic AI commerce execution layer. The difference is everything.
        </p>
        <div className="overflow-x-auto reveal-from-bottom reveal-delay-1">
          <div className="glass-card rounded-2xl overflow-hidden border border-[rgba(95,64,222,0.15)]">
            <table className="w-full border-collapse">
              <thead>
                <tr style={{ background: 'rgba(95,64,222,0.08)' }}>
                  <th className="text-left py-5 px-6 text-[13px] text-[#6b6b80] font-medium w-2/5" style={{ fontFamily: 'Geist, sans-serif' }}>Capability</th>
                  <th className="text-center py-5 px-6 w-1/5">
                    <div className="flex flex-col items-center gap-1.5">
                      <Image src="/assets/images/beepAI___LOGO-1778057442337.jpg" alt="beep" width={28} height={28} className="object-contain rounded-md" />
                      <span className="text-[11px] font-bold text-[#5f40de]" style={{ fontFamily: 'Geist, sans-serif' }}>beep</span>
                      <span className="text-[9px] text-[#5f40de]/70 font-medium" style={{ fontFamily: 'Geist, sans-serif' }}>Agentic AI Commerce</span>
                    </div>
                  </th>
                  <th className="text-center py-5 px-6 w-1/5">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-[12px] font-semibold text-[#6b6b80]" style={{ fontFamily: 'Geist, sans-serif' }}>Traditional</span>
                      <span className="text-[10px] text-[#9999aa]" style={{ fontFamily: 'Geist, sans-serif' }}>Booking Platforms</span>
                    </div>
                  </th>
                  <th className="text-center py-5 px-6 w-1/5">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-[12px] font-semibold text-[#6b6b80]" style={{ fontFamily: 'Geist, sans-serif' }}>Voice</span>
                      <span className="text-[10px] text-[#9999aa]" style={{ fontFamily: 'Geist, sans-serif' }}>Assistants</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS.map((row, i) => (
                  <tr
                    key={i}
                    className="border-t border-[rgba(95,64,222,0.07)] transition-colors duration-200 hover:bg-[rgba(95,64,222,0.04)]"
                    style={{ background: i % 2 === 0 ? 'rgba(240,238,248,0.5)' : 'rgba(255,255,255,0.25)' }}
                  >
                    <td className="py-4 px-6 text-[14px] text-[#3a3a4a] font-medium" style={{ fontFamily: 'Geist, sans-serif' }}>{row.feature}</td>
                    <td className="text-center py-4 px-6"><Icon type={row.beep} /></td>
                    <td className="text-center py-4 px-6"><Icon type={row.traditional} /></td>
                    <td className="text-center py-4 px-6"><Icon type={row.voice} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 mt-6 justify-end reveal-from-bottom reveal-delay-2">
          <div className="flex items-center gap-2 text-[12px] text-[#6b6b80]" style={{ fontFamily: 'Geist, sans-serif' }}>
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-100 text-green-600 text-[10px]">✓</span>
            Full support
          </div>
          <div className="flex items-center gap-2 text-[12px] text-[#6b6b80]" style={{ fontFamily: 'Geist, sans-serif' }}>
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-50 text-amber-500 text-[11px]">~</span>
            Partial
          </div>
          <div className="flex items-center gap-2 text-[12px] text-[#6b6b80]" style={{ fontFamily: 'Geist, sans-serif' }}>
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-100 text-gray-400 text-[11px]">—</span>
            Not available
          </div>
        </div>
      </div>
    </section>
  );
}
