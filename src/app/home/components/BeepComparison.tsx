'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

const TABLE_ROWS = [
  { feature: 'Natural language input', beep: 'check', traditional: 'dash', voice: 'tilde' },
  { feature: 'Multi-provider search', beep: 'check', traditional: 'tilde', voice: 'dash' },
  { feature: 'Autonomous checkout', beep: 'check', traditional: 'dash', voice: 'dash' },
  { feature: 'Zero app switching', beep: 'check', traditional: 'dash', voice: 'dash' },
  { feature: 'Learns preferences', beep: 'check', traditional: 'dash', voice: 'tilde' },
  { feature: 'Every language on earth', beep: 'check', traditional: 'dash', voice: 'tilde' },
  { feature: 'Agentic payment layer', beep: 'check', traditional: 'dash', voice: 'dash' },
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
    <section ref={sectionRef} className="py-24 px-6 md:px-12 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #f0eef8 0%, #ebe8f5 100%)' }}>
      <div className="max-w-[1280px] mx-auto relative z-10">
        <h2 className="font-display text-[56px] md:text-[72px] text-[#0a0a0a] tracking-wide mb-12 reveal-from-bottom">
          Why beep wins on what matters.
        </h2>
        <div className="overflow-x-auto reveal-from-bottom reveal-delay-1">
          <div className="glass-card rounded-2xl overflow-hidden border border-[rgba(95,64,222,0.12)]">
            <table className="w-full border-collapse">
              <thead>
                <tr style={{ background: 'rgba(95,64,222,0.06)' }}>
                  <th className="text-left py-5 px-6 text-[13px] text-[#6b6b80] font-medium w-2/5" style={{ fontFamily: 'Geist, sans-serif' }}>Feature</th>
                  <th className="text-center py-5 px-6 w-1/5">
                    <div className="flex flex-col items-center gap-1.5">
                      <Image src="/assets/images/beepAI___LOGO-1778057442337.jpg" alt="beep" width={28} height={28} className="object-contain rounded-md" />
                      <span className="text-[12px] font-bold text-[#5f40de]" style={{ fontFamily: 'Geist, sans-serif' }}>beep</span>
                    </div>
                  </th>
                  <th className="text-center py-5 px-6 text-[12px] text-[#6b6b80] font-medium w-1/5" style={{ fontFamily: 'Geist, sans-serif' }}>Traditional booking</th>
                  <th className="text-center py-5 px-6 text-[12px] text-[#6b6b80] font-medium w-1/5" style={{ fontFamily: 'Geist, sans-serif' }}>Voice assistants</th>
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS.map((row, i) => (
                  <tr
                    key={i}
                    className="border-t border-[rgba(95,64,222,0.07)] transition-colors duration-200 hover:bg-[rgba(95,64,222,0.04)]"
                    style={{ background: i % 2 === 0 ? 'rgba(248,246,255,0.5)' : 'rgba(255,255,255,0.3)' }}
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
