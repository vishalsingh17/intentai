'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const steps = [
  {
    number: '01',
    icon: 'ChatBubbleLeftRightIcon',
    title: 'Tell us what you need',
    description:
      'Type your intent in plain language, "Book me a hotel in Goa for this weekend under ₹4,000". No forms, no filters.',
    detail: 'Natural language · Any device · 2 seconds',
    color: '#7C3AED',
  },
  {
    number: '02',
    icon: 'CpuChipIcon',
    title: 'AI finds the best option',
    description:
      'Our agent searches across 50+ providers in real time, ranks options by your implicit preferences, and selects the optimal match, comparing price, quality, and availability simultaneously.',
    detail: 'Live data · 50+ providers · Smart ranking',
    color: '#4F46E5',
  },
  {
    number: '03',
    icon: 'CheckCircleIcon',
    title: 'Checkout, completed',
    description:
      'Using your saved payment and delivery preferences, Beep completes the transaction, sends confirmation, and logs the purchase, all in under 10 seconds.',
    detail: 'Secure checkout · Instant confirmation · Zero clicks',
    color: '#2563EB',
  },
];

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.15 }
    );
    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Spotlight
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
      id="how-it-works"
      className="relative py-24 md:py-32 overflow-hidden"
      aria-label="How Beep works"
    >
      {/* Glow */}
      <div
        className="glow-orb glow-orb-accent"
        style={{ width: 450, height: 450, top: '10%', left: '-8%', opacity: 0.25 }}
        aria-hidden="true"
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        {/* Section header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
          <div className="md:col-span-5">
            <span className="section-label block mb-4">03 / How It Works</span>
            <h2 className="font-display text-4xl md:text-5xl font-light leading-tight tracking-tight">
              Three steps.<br />
              <span className="gradient-text italic">Zero friction.</span>
            </h2>
          </div>
          <div className="md:col-span-5 md:col-start-8 flex items-end">
            <p className="text-white leading-relaxed">
              Our core engine <span className="font-bold text-white">BeepAI</span> collapses the entire shopping journey, search, compare,
              decide, and checkout into a single natural language statement.
            </p>
          </div>
        </div>

        {/* Steps — asymmetric layout (not a numbered vertical timeline) */}
        <div ref={spotlightRef} className="spotlight-group grid grid-cols-1 md:grid-cols-12 gap-5">
          {steps.map((step, i) => (
            <div
              key={i}
              ref={(el) => { cardRefs.current[i] = el; }}
              className={`spotlight-card reveal-from-bottom p-7 md:p-8 flex flex-col gap-5 ${
                i === 0
                  ? 'md:col-span-5 md:row-span-1'
                  : i === 1
                  ? 'md:col-span-7' :'md:col-span-12'
              }`}
              style={{
                transitionDelay: `${i * 0.12}s`,
                minHeight: i === 2 ? undefined : 280,
              }}
            >
              {/* Top row */}
              <div className="flex items-start justify-between">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background: `${step.color}22`,
                    border: `1px solid ${step.color}44`,
                  }}
                >
                  <Icon name={step.icon as Parameters<typeof Icon>[0]['name']} size={22} className="text-accent-warm" />
                </div>
                <span
                  className="font-display text-5xl font-light opacity-15 tracking-tighter"
                  style={{ color: step.color }}
                  aria-hidden="true"
                >
                  {step.number}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="font-display text-2xl md:text-3xl font-light text-foreground mb-3 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-foreground-muted leading-relaxed text-sm md:text-base">
                  {step.description}
                </p>
              </div>

              {/* Detail tag */}
              <div className="pt-3 border-t border-[rgba(255,255,255,0.06)]">
                <span className="font-mono-custom text-[10px] uppercase tracking-widest text-foreground-muted">
                  {step.detail}
                </span>
              </div>

              {/* Gradient accent line */}
              <div
                className="absolute bottom-0 left-0 h-[2px] w-full rounded-b-2xl opacity-50"
                style={{ background: `linear-gradient(to right, ${step.color}, transparent)` }}
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}