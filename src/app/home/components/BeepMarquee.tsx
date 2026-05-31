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
    <div className="py-4 overflow-hidden border-y" style={{ background: '#1c3561', borderColor: 'rgba(197,214,234,0.2)' }}>
      <div className="marquee-track">
        {items?.map((text, i) => (
          <span key={i} className="flex items-center gap-4 mx-4">
            <span
              className="text-[13px] font-semibold tracking-[0.18em] whitespace-nowrap"
              style={{ fontFamily: "'Google Sans', sans-serif", color: '#c5d6ea' }}
            >
              {text}
            </span>
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#c5d6ea', opacity: 0.5 }} />
          </span>
        ))}
      </div>
    </div>
  );
}
