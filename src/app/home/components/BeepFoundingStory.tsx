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
    <section id="our-story" ref={sectionRef} className="bg-[#f8f8ff] py-24 px-6 md:px-12">
      <div className="max-w-[1280px] mx-auto grid md:grid-cols-2 gap-16 items-start">
        {/* Left */}
        <div>
          <div className="font-display text-[160px] md:text-[200px] leading-none text-[#5f40de] opacity-10 select-none mb-0 -mt-8">
            2026
          </div>
          <div className="-mt-16 relative z-10">
            <h2 className="font-display text-[56px] md:text-[64px] text-[#0a0a0a] tracking-wide mb-6 reveal-from-bottom">
              Why we built this.
            </h2>
            <div className="space-y-4 mb-10 reveal-from-bottom reveal-delay-1">
              <p className="text-[16px] text-[#3a3a4a] leading-relaxed" style={{ fontFamily: 'Geist, sans-serif' }}>
                We kept asking ourselves: why does buying something still require so much effort? You know what you want. You have the money. But you still have to open five apps, compare prices, fill forms, and hope nothing goes wrong at checkout.
              </p>
              <p className="text-[16px] text-[#3a3a4a] leading-relaxed" style={{ fontFamily: 'Geist, sans-serif' }}>
                A thought should be enough to complete a purchase. That is the insight we built beep on. Not a better search. Not a smarter recommendation engine. An actual execution layer that takes your intent and turns it into a completed transaction.
              </p>
              <p className="text-[16px] text-[#3a3a4a] leading-relaxed" style={{ fontFamily: 'Geist, sans-serif' }}>
                We are three people from IIFT Delhi who decided to build the infrastructure that makes this possible. The agentic payments layer. The multi-provider execution engine. The thing that sits between what you want and what actually happens.
              </p>
            </div>

            {/* Timeline */}
            <div className="space-y-4 reveal-from-bottom reveal-delay-2">
              {TIMELINE?.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-[#5f40de] mt-1.5 flex-shrink-0" />
                    {i < TIMELINE?.length - 1 && <div className="w-px h-8 bg-[rgba(95,64,222,0.2)] mt-1" />}
                  </div>
                  <div>
                    <span className="text-[12px] font-semibold text-[#5f40de] block" style={{ fontFamily: 'Geist, sans-serif' }}>{item?.date}</span>
                    <span className="text-[14px] text-[#3a3a4a]" style={{ fontFamily: 'Geist, sans-serif' }}>{item?.event}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="reveal-from-bottom reveal-delay-1">
          <div className="rounded-2xl overflow-hidden aspect-[4/3] relative mb-4">
            <Image
              src="/assets/images/PHOTO-2026-03-15-12-16-20-1774547691667.jpg"
              alt="Three founders at a desk with laptop, papers and a Coke can in a warm startup environment"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <p className="text-[13px] text-[#6b6b80] text-center italic" style={{ fontFamily: 'Instrument Serif' }}>
            Just three people trying to make the crazy idea work.
          </p>
        </div>
      </div>
    </section>
  );
}
