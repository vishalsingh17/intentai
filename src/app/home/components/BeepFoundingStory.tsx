'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

const TIMELINE = [
  { date: 'Jan 2026', event: 'The question' },
  { date: 'Feb 2026', event: 'First execution' },
  { date: 'May 2026', event: 'Public launch' },
  { date: 'Q3 2026', event: 'Enterprise rollout' },
  { date: 'Q4 2026', event: 'Agentic payment infra built to license globally' },
];

export default function FoundingStory() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.querySelectorAll('.reveal-from-bottom').forEach(el => el.classList.add('active'));
      }),
      { threshold: 0.1 }
    );
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section id="our-story" ref={sectionRef} className="py-24 px-6 md:px-12 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #f0eef8 0%, #edeaf7 100%)' }}>
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(91,63,212,0.18) 0%, transparent 70%)' }} />

      <div className="max-w-[1280px] mx-auto grid md:grid-cols-2 gap-16 items-start relative z-10">
        {/* Left */}
        <div>
          <div className="font-display text-[160px] md:text-[200px] leading-none text-[#5b3fd4] opacity-08 select-none mb-0 -mt-8">
            2026
          </div>
          <div className="-mt-16 relative z-10">
            <h2 className="font-display text-[56px] md:text-[64px] text-[#1a1630] tracking-wide mb-6 reveal-from-bottom">
              Why we built this.
            </h2>
            <div className="space-y-4 mb-10 reveal-from-bottom reveal-delay-1">
              <p className="text-[16px] text-[#3d3a5c] leading-relaxed" style={{ fontFamily: 'Geist, sans-serif' }}>
                We started with a simple question: what if commerce worked the way you think?
              </p>
              <p className="text-[16px] text-[#3d3a5c] leading-relaxed" style={{ fontFamily: 'Geist, sans-serif' }}>
                You do not think &ldquo;let me open four apps, filter by airline, compare prices, enter card details, and wonder if I got a good deal.&rdquo; You think &ldquo;I need a flight to Mumbai tomorrow.&rdquo; That thought should be enough. So we built the layer that makes it enough.
              </p>
              <p className="text-[16px] text-[#3d3a5c] leading-relaxed" style={{ fontFamily: 'Geist, sans-serif' }}>
                Beep is the agentic execution layer that sits between human intent and commercial transaction. Not a chatbot. Not a search wrapper. An agent that acts.
              </p>
            </div>

            {/* Timeline */}
            <div className="space-y-4 reveal-from-bottom reveal-delay-2">
              {TIMELINE?.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-[#5b3fd4] mt-1.5 flex-shrink-0" />
                    {i < TIMELINE?.length - 1 && <div className="w-px h-8 bg-[rgba(91,63,212,0.2)] mt-1" />}
                  </div>
                  <div>
                    <span className="text-[12px] font-semibold text-[#5b3fd4] block" style={{ fontFamily: 'Geist, sans-serif' }}>{item?.date}</span>
                    <span className="text-[14px] text-[#3d3a5c]" style={{ fontFamily: 'Geist, sans-serif' }}>{item?.event}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — team photo */}
        <div className="reveal-from-bottom reveal-delay-1">
          <div className="glass-card rounded-2xl overflow-hidden p-2">
            <div className="rounded-xl overflow-hidden aspect-[4/3] relative">
              <Image
                src="/assets/images/WhatsApp_Image_2026-05-06_at_1.25.57_AM-1778057419763.jpeg"
                alt="Three founders working at a desk with laptop, papers and a Coke can in a warm startup environment"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
          <p className="text-[13px] text-[#6b6890] text-center italic mt-4" style={{ fontFamily: 'Instrument Serif' }}>
            Just three people trying to make the crazy idea work.
          </p>
        </div>
      </div>
    </section>
  );
}
