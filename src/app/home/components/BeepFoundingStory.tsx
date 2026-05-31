'use client';

import React, { useEffect, useRef } from 'react';

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
    <section id="our-story" ref={sectionRef} className="py-24 px-6 md:px-12 relative overflow-hidden" style={{ background: '#f4f7fb' }}>
      {/* Accent top border */}
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, transparent, #c5d6ea, transparent)' }} />

      <div className="max-w-[900px] mx-auto relative z-10">
        {/* Section label */}
        <div className="mb-6 reveal-from-bottom">
          <span className="section-label">Our story</span>
        </div>

        {/* Headline */}
        <h2
          className="text-[56px] md:text-[72px] leading-[0.92] mb-10 reveal-from-bottom"
          style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', color: '#1c3561', fontWeight: 600 }}
        >
          Why we built this.
        </h2>

        {/* Story paragraphs — no photo, no timeline */}
        <div className="space-y-6 reveal-from-bottom reveal-delay-1">
          <p className="text-[17px] leading-relaxed" style={{ fontFamily: "'Google Sans', sans-serif", color: '#4a5f80' }}>
            We started with a simple question: what if commerce worked the way you think?
          </p>
          <p className="text-[17px] leading-relaxed" style={{ fontFamily: "'Google Sans', sans-serif", color: '#4a5f80' }}>
            You do not think <strong style={{ color: '#1c3561' }}>&ldquo;let me open four apps&rdquo;</strong>, filter by airline, compare prices, enter card details, and wonder if I got a good deal. You think <strong style={{ color: '#1c3561' }}>&ldquo;I need a flight to Mumbai tomorrow&rdquo;</strong>. That thought should be enough. So we built the layer that makes it enough.
          </p>
          <p className="text-[17px] leading-relaxed" style={{ fontFamily: "'Google Sans', sans-serif", color: '#4a5f80' }}>
            BeepAi is the agentic execution layer that sits between human intent and commercial transaction. Not a chatbot. Not a search wrapper. An agent that acts.
          </p>
          <p className="text-[17px] leading-relaxed" style={{ fontFamily: "'Google Sans', sans-serif", color: '#4a5f80' }}>
            We built Beep because we kept watching great products lose customers at the last step. The checkout. It was not a product problem. It was not a pricing problem. It was a friction problem — and nobody was solving it intelligently for the Indian market. We are a small team obsessed with one thing: making the moment of payment feel effortless. Not just fast. Effortless. Because when a customer does not have to think, they do not leave.
          </p>
        </div>

        {/* Decorative quote */}
        <div className="mt-12 reveal-from-bottom reveal-delay-2">
          <div className="rounded-2xl p-8 border-l-4" style={{ background: '#ffffff', borderLeftColor: '#1c3561' }}>
            <p
              className="text-[20px] leading-relaxed"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', color: '#1c3561' }}
            >
              &ldquo;A small team obsessed with one thing: making the moment of payment feel effortless.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
