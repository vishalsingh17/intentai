'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const founders = [
  {
    name: 'Sahil Raj Singh',
    role: 'Founder & CEO',
    description:
      'Focused on building AI-driven commerce infrastructure, product strategy, and scaling intelligent systems for real-world use.',
    linkedin: 'https://linkedin.com/in/sahilrajsingh',
    initials: 'SR',
  },
  {
    name: 'Vishal Singh',
    role: 'Technical Lead',
    description:
      'Strong experience in backend systems, architecture, and scalable product development powering Beep\'s core infrastructure.',
    linkedin: 'https://linkedin.com/in/vishalsingh',
    initials: 'VS',
  },
];

export default function FoundersSection() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('active');
        });
      },
      { threshold: 0.15 }
    );
    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="founders"
      className="relative py-16 md:py-20 overflow-hidden"
      aria-label="Beep founders"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div
          ref={(el) => { cardRefs.current[0] = el; }}
          className="reveal-from-bottom mb-10"
        >
          <span className="section-label block mb-3">The Team</span>
          <h2 className="font-display text-3xl md:text-4xl font-light leading-tight tracking-tight">
            Built by <span className="gradient-text italic">founders</span> who ship.
          </h2>
        </div>

        {/* Founder cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
          {founders.map((founder, i) => (
            <div
              key={i}
              ref={(el) => { cardRefs.current[i + 1] = el; }}
              className="spotlight-card reveal-from-bottom p-6 flex flex-col gap-4"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 font-display font-medium text-sm text-white"
                  style={{
                    background: 'linear-gradient(135deg, rgba(124,58,237,0.4), rgba(79,70,229,0.3))',
                    border: '1px solid rgba(124,58,237,0.3)',
                  }}
                >
                  {founder.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-foreground font-medium text-sm leading-tight">{founder.name}</p>
                  <p className="text-accent-warm font-mono-custom text-[10px] uppercase tracking-wider mt-0.5">{founder.role}</p>
                </div>
                {/* LinkedIn */}
                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 text-foreground-muted hover:text-accent transition-colors"
                  aria-label={`${founder.name} on LinkedIn`}
                  style={{ opacity: 0.5 }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.5')}
                >
                  <Icon name="LinkIcon" size={14} className="text-current" />
                </a>
              </div>
              <p className="text-foreground-muted text-xs leading-relaxed" style={{ opacity: 0.85 }}>
                {founder.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
