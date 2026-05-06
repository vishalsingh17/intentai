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
  if (type === 'check') return <span className="text-green-500 text-[18px] font-bold">✓</span>;
  if (type === 'dash') return <span className="text-[#cccccc] text-[18px]">—</span>;
  return <span className="text-amber-500 text-[18px]">~</span>;
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
    <section ref={sectionRef} className="bg-white py-24 px-6 md:px-12">
      <div className="max-w-[1280px] mx-auto">
        <h2 className="font-display text-[56px] md:text-[72px] text-[#0a0a0a] tracking-wide mb-12 reveal-from-bottom">
          Why beep wins on what matters.
        </h2>
        <div className="overflow-x-auto reveal-from-bottom reveal-delay-1">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[rgba(95,64,222,0.1)]">
                <th className="text-left py-4 pr-8 text-[13px] text-[#6b6b80] font-medium w-1/3" style={{ fontFamily: 'Geist, sans-serif' }}>Feature</th>
                <th className="text-center py-4 px-6 w-1/5">
                  <div className="flex flex-col items-center gap-1">
                    <Image src="/assets/images/beep_logo-1774785208526.png" alt="beep" width={28} height={28} className="object-contain" />
                    <span className="text-[12px] font-semibold text-[#5f40de]" style={{ fontFamily: 'Geist, sans-serif' }}>beep</span>
                  </div>
                </th>
                <th className="text-center py-4 px-6 text-[12px] text-[#6b6b80] font-medium w-1/5" style={{ fontFamily: 'Geist, sans-serif' }}>Traditional booking platforms</th>
                <th className="text-center py-4 px-6 text-[12px] text-[#6b6b80] font-medium w-1/5" style={{ fontFamily: 'Geist, sans-serif' }}>Voice assistants</th>
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map((row, i) => (
                <tr key={i} className={`border-b border-[rgba(95,64,222,0.06)] ${i % 2 === 0 ? 'bg-[#fafaff]' : 'bg-white'}`}>
                  <td className="py-4 pr-8 text-[14px] text-[#3a3a4a] font-medium" style={{ fontFamily: 'Geist, sans-serif' }}>{row.feature}</td>
                  <td className="text-center py-4 px-6"><Icon type={row.beep} /></td>
                  <td className="text-center py-4 px-6"><Icon type={row.traditional} /></td>
                  <td className="text-center py-4 px-6"><Icon type={row.voice} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
