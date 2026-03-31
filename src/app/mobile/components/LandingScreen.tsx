'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface Props {
  onGetStarted: () => void;
}

const features = [
  { icon: '✈️', text: 'Travel & Flights' },
  { icon: '🛒', text: 'Quick Commerce' },
  { icon: '🚗', text: 'Mobility & Cabs' },
  { icon: '🛍️', text: 'E-commerce' },
];

export default function LandingScreen({ onGetStarted }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="absolute inset-0 flex flex-col overflow-y-auto"
      style={{ background: 'linear-gradient(160deg, #0a0818 0%, #080810 60%, #0c0820 100%)' }}
    >
      {/* Glow orbs */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 280,
          height: 280,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.3) 0%, transparent 70%)',
          filter: 'blur(60px)',
          top: '-60px',
          right: '-60px',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(96,165,250,0.2) 0%, transparent 70%)',
          filter: 'blur(50px)',
          bottom: '120px',
          left: '-40px',
        }}
        aria-hidden="true"
      />

      {/* Status bar spacer */}
      <div style={{ height: 44 }} />

      {/* Content */}
      <div
        className="flex flex-col flex-1 px-6 pt-6 pb-8"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-10">
          <Image
            src="/assets/images/beep_logo-1774785208526.png"
            alt="Beep logo"
            width={28}
            height={28}
            className="object-contain"
          />
          <span
            style={{
              fontFamily: "'Avenir Next', 'Avenir', sans-serif",
              fontSize: 20,
              fontWeight: 700,
              color: '#F4F4FF',
              letterSpacing: '-0.01em',
            }}
          >
            beep
          </span>
          <span
            style={{
              marginLeft: 4,
              padding: '2px 8px',
              borderRadius: 20,
              background: 'rgba(124,58,237,0.2)',
              border: '1px solid rgba(124,58,237,0.3)',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              color: '#A78BFA',
              letterSpacing: '0.1em',
              textTransform: 'uppercase' as const,
            }}
          >
            Beta
          </span>
        </div>

        {/* Hero text */}
        <div className="mb-8">
          <h1
            style={{
              fontFamily: "'Avenir Next', 'Avenir', sans-serif",
              fontSize: 38,
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: '#F4F4FF',
              marginBottom: 16,
            }}
          >
            From intent
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #A78BFA 0%, #7C3AED 40%, #60A5FA 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              to checkout.
            </span>
            <br />
            <em>Instantly.</em>
          </h1>
          <p
            style={{
              fontFamily: "'Avenir Next', 'Avenir', sans-serif",
              fontSize: 15,
              color: '#8B8BAA',
              lineHeight: 1.6,
              fontWeight: 300,
            }}
          >
            Tell Beep what you need. Our AI agent executes the entire commerce journey — search, compare, and checkout.
          </p>
        </div>

        {/* Chat preview card */}
        <div
          className="mb-8"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(124,58,237,0.25)',
            borderRadius: 20,
            padding: 16,
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444', opacity: 0.6 }} />
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#eab308', opacity: 0.6 }} />
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', opacity: 0.6 }} />
            <span style={{ marginLeft: 6, fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#8B8BAA', letterSpacing: '0.15em', textTransform: 'uppercase' as const }}>Beep · Live</span>
          </div>

          {/* User message */}
          <div className="flex justify-end mb-2">
            <div
              style={{
                maxWidth: '85%',
                padding: '10px 14px',
                borderRadius: '16px 16px 4px 16px',
                background: 'linear-gradient(135deg, #7C3AED, #4F46E5)',
                fontSize: 13,
                color: '#fff',
                fontFamily: "'Avenir Next', 'Avenir', sans-serif",
                fontWeight: 500,
              }}
            >
              Book a flight to Bangalore tomorrow under ₹5000
            </div>
          </div>

          {/* AI response */}
          <div className="flex gap-2">
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #7C3AED, #60A5FA)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                fontSize: 12,
              }}
            >
              ✦
            </div>
            <div
              style={{
                padding: '10px 14px',
                borderRadius: '4px 16px 16px 16px',
                background: 'rgba(16,185,129,0.1)',
                border: '1px solid rgba(16,185,129,0.25)',
                fontSize: 12,
                color: '#F4F4FF',
                fontFamily: "'Avenir Next', 'Avenir', sans-serif",
              }}
            >
              <span style={{ color: '#34d399', fontWeight: 600 }}>✓ Booking confirmed</span>
              <p style={{ color: '#8B8BAA', marginTop: 4, fontSize: 11 }}>IndiGo 6E-204 · ₹3,899 · Seat 14A · PNR: AI2026XK</p>
            </div>
          </div>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {features.map((f, i) => (
            <div
              key={i}
              style={{
                padding: '6px 12px',
                borderRadius: 20,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                fontSize: 12,
                color: '#B0B0CC',
                fontFamily: "'Avenir Next', 'Avenir', sans-serif",
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span>{f.icon}</span>
              <span>{f.text}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-auto flex flex-col gap-3">
          <button
            onClick={onGetStarted}
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: 16,
              background: 'linear-gradient(135deg, #7C3AED, #4F46E5)',
              border: 'none',
              color: '#fff',
              fontSize: 15,
              fontWeight: 600,
              fontFamily: "'Avenir Next', 'Avenir', sans-serif",
              letterSpacing: '-0.01em',
              cursor: 'pointer',
              boxShadow: '0 0 30px rgba(124,58,237,0.4)',
            }}
          >
            Get Started
          </button>
          <p
            style={{
              textAlign: 'center',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: '#8B8BAA',
              letterSpacing: '0.1em',
              textTransform: 'uppercase' as const,
            }}
          >
            Built by founders from IIFT Delhi
          </p>
        </div>
      </div>
    </div>
  );
}
