'use client';

import React from 'react';

const MARQUEE_TEXT = [
  'INTENT TO TRANSACTION',
  'INSTANTLY',
  'NOT A SEARCH',
  'AN EXECUTION',
  'PRICE SHOWN IS THE PRICE PAID',
  'EVERY LANGUAGE ON EARTH',
  'FULL COMMERCE OS ON ROADMAP',
];

export default function MarqueeStrip() {
  const items = [...MARQUEE_TEXT, ...MARQUEE_TEXT];
  return (
    <div className="py-4 overflow-hidden border-y border-[rgba(91,63,212,0.12)]" style={{ background: 'rgba(245, 244, 250, 0.9)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
      <div className="marquee-track">
        {items?.map((text, i) => (
          <span key={i} className="flex items-center gap-4 mx-4">
            <span
              className="text-[13px] font-semibold tracking-[0.18em] text-[#3d3a5c] whitespace-nowrap"
              style={{ fontFamily: 'Geist, sans-serif' }}
            >
              {text}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#5b3fd4] flex-shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}
