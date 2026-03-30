'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Icon from '@/components/ui/AppIcon';

const differentiators = [
  {
    icon: 'ArrowsRightLeftIcon',
    title: 'No app switching',
    description:
      'Stop juggling MakeMyTrip, Amazon, Swiggy, and 12 browser tabs. One interface handles every category of purchase, all in one place.',
    span: 'md:col-span-4',
    accent: '#7C3AED',
    bg: 'rgba(124,58,237,0.06)',
  },
  {
    icon: 'BrainIcon',
    title: 'No decision fatigue',
    description:
      'You set the constraint (budget, timeline, preference). Beep makes the call. You approve, or it just does it automatically based on your saved rules.',
    span: 'md:col-span-5',
    accent: '#4F46E5',
    bg: 'rgba(79,70,229,0.06)',
  },
  {
    icon: 'BoltIcon',
    title: 'AI executes, not just suggests',
    description:
      'Unlike traditional search or voice assistants, Beep doesn\'t hand you a list of links. It actually completes the transaction. The difference between a map and a driver.',
    span: 'md:col-span-3',
    accent: '#2563EB',
    bg: 'rgba(37,99,235,0.06)',
  },
];

// Comparison table data
const comparisonRows = [
  { feature: 'Natural language input', intentai: true, search: true, voice: false },
  { feature: 'Multi-provider search', intentai: true, search: false, voice: false },
  { feature: 'Autonomous checkout', intentai: true, search: false, voice: false },
  { feature: 'Zero app switching', intentai: true, search: false, voice: false },
  { feature: 'Learns preferences', intentai: true, search: true, voice: true },
];

export default function WhyDifferentSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('active');
        });
      },
      { threshold: 0.1 }
    );
    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const group = spotlightRef.current;
    if (!group) return;
    const handleMove = (e: MouseEvent) => {
      group.querySelectorAll<HTMLElement>('.spotlight-card').forEach((card) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      });
    };
    group.addEventListener('mousemove', handleMove);
    return () => group.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-different"
      className="relative py-20 md:py-28 overflow-hidden"
      aria-label="Why Beep is different"
    >
      <div
        className="glow-orb glow-orb-primary"
        style={{ width: 500, height: 500, bottom: '0%', right: '-12%', opacity: 0.25 }}
        aria-hidden="true"
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="mb-14">
          <span className="section-label block mb-4">04 / Differentiation</span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="font-display text-[2.75rem] md:text-[3.5rem] font-light leading-tight tracking-tight">
              Why this is<br />
              <span className="gradient-text italic">fundamentally different.</span>
            </h2>
            <p className="text-foreground-muted max-w-sm leading-relaxed md:text-right" style={{ opacity: 0.9 }}>
              Every other tool gives you options. <span className="text-white font-bold">Beep</span> turns your decisions into <strong className="text-white font-bold">smarter outcomes</strong>.
            </p>
          </div>
        </div>

        {/* Differentiator bento */}
        <div ref={spotlightRef} className="spotlight-group grid grid-cols-1 md:grid-cols-12 gap-4 mb-12">
          {differentiators.map((item, i) => (
            <div
              key={i}
              ref={(el) => { cardRefs.current[i] = el; }}
              className={`spotlight-card reveal-from-bottom p-8 md:p-9 flex flex-col gap-4 ${item.span}`}
              style={{
                background: item.bg,
                transitionDelay: `${i * 0.1}s`,
                minHeight: 240,
                ...(item.title === "AI executes, not just suggests" ? {
                  boxShadow: '0 0 24px rgba(37,99,235,0.18), inset 0 0 0 1px rgba(37,99,235,0.25)',
                } : {}),
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ background: `${item.accent}22`, border: `1px solid ${item.accent}44` }}
              >
                <Icon
                  name={item.icon as Parameters<typeof Icon>[0]['name']}
                  size={20}
                  className="text-accent-warm"
                />
              </div>
              <h3 className="font-display text-2xl font-light text-foreground tracking-tight">
                {item.title}
              </h3>
              <p className="text-foreground-muted text-sm leading-relaxed flex-1">
                {item.description}
              </p>
              <div
                className="absolute bottom-0 left-0 w-full h-px"
                style={{ background: `linear-gradient(to right, ${item.accent}88, transparent)` }}
                aria-hidden="true"
              />
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <div
          ref={(el) => { cardRefs.current[3] = el; }}
          className="spotlight-card reveal-from-bottom overflow-hidden"
          style={{ transitionDelay: '0.3s' }}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm" aria-label="Beep vs competitors comparison">
              <thead>
                <tr className="border-b border-[rgba(255,255,255,0.1)]">
                  <th className="text-left px-6 py-4 text-foreground-muted font-medium font-sans">Feature</th>
                  <th className="px-6 py-4 text-center">
                    <span
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full"
                      style={{ background: 'rgba(124,58,237,0.2)', border: '1px solid rgba(124,58,237,0.3)' }}
                    >
                      <Image
                        src="/assets/images/beep_logo-1774785208526.png"
                        alt="beep"
                        width={20}
                        height={20}
                        className="object-contain"
                      />
                    </span>
                  </th>
                  <th className="px-6 py-4 text-center text-foreground-muted font-medium text-xs uppercase tracking-wider">Traditional Search</th>
                  <th className="px-6 py-4 text-center text-foreground-muted font-medium text-xs uppercase tracking-wider">Voice Assistants</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-[rgba(255,255,255,0.07)] hover:bg-[rgba(124,58,237,0.05)] transition-colors cursor-default"
                  >
                    <td className="px-6 py-4 text-foreground-muted">{row.feature}</td>
                    <td className="px-6 py-4 text-center">
                      {row.intentai
                        ? <Icon name="CheckCircleIcon" size={18} className="text-accent-warm mx-auto" variant="solid" />
                        : <Icon name="XCircleIcon" size={18} className="text-foreground-muted opacity-30 mx-auto" variant="solid" />
                      }
                    </td>
                    <td className="px-6 py-4 text-center">
                      {row.search
                        ? <Icon name="CheckCircleIcon" size={18} className="text-foreground-muted opacity-50 mx-auto" variant="solid" />
                        : <Icon name="XCircleIcon" size={18} className="text-foreground-muted opacity-20 mx-auto" variant="solid" />
                      }
                    </td>
                    <td className="px-6 py-4 text-center">
                      {row.voice
                        ? <Icon name="CheckCircleIcon" size={18} className="text-foreground-muted opacity-50 mx-auto" variant="solid" />
                        : <Icon name="XCircleIcon" size={18} className="text-foreground-muted opacity-20 mx-auto" variant="solid" />
                      }
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