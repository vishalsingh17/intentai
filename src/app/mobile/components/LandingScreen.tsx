'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface Props {
  onGetStarted: () => void;
}

const features = [
  { icon: '✈️', text: 'Travel & Flights', color: '#7C3AED' },
  { icon: '🛒', text: 'Quick Commerce', color: '#4F46E5' },
  { icon: '🚗', text: 'Mobility & Cabs', color: '#059669' },
  { icon: '🛍️', text: 'E-commerce', color: '#2563EB' },
];

const chatMessages = [
  { type: 'user', text: 'Book a flight to Bangalore tomorrow under ₹5000' },
  { type: 'ai', text: '✓ Booking confirmed', sub: 'IndiGo 6E-204 · ₹3,899 · Seat 14A · PNR: AI2026XK', success: true },
];

export default function LandingScreen({ onGetStarted }: Props) {
  const [visible, setVisible] = useState(false);
  const [chatStep, setChatStep] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setChatStep(1), 800);
    const t2 = setTimeout(() => setChatStep(2), 1800);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, [visible]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        background: 'linear-gradient(160deg, #0c0820 0%, #080810 60%, #0a0c1e 100%)',
      }}
    >
      {/* Glow orbs */}
      <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.28) 0%, transparent 70%)', filter: 'blur(60px)', top: -80, right: -60, pointerEvents: 'none' }} aria-hidden="true" />
      <div style={{ position: 'absolute', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(96,165,250,0.18) 0%, transparent 70%)', filter: 'blur(50px)', bottom: 200, left: -40, pointerEvents: 'none' }} aria-hidden="true" />

      <div style={{ height: 54 }} />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          padding: '16px 24px 32px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* Logo row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
          <Image src="/assets/images/beep_logo-1774785208526.png" alt="Beep logo" width={28} height={28} className="object-contain" />
          <span style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 22, fontWeight: 700, color: '#F4F4FF', letterSpacing: '-0.02em' }}>beep</span>
          <div
            style={{
              marginLeft: 4,
              padding: '3px 10px',
              borderRadius: 20,
              background: 'rgba(124,58,237,0.18)',
              border: '1px solid rgba(124,58,237,0.35)',
            }}
          >
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#A78BFA', letterSpacing: '0.12em', textTransform: 'uppercase' as const }}>Beta</span>
          </div>
        </div>

        {/* Hero headline */}
        <div style={{ marginBottom: 20 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '4px 12px',
              borderRadius: 20,
              background: 'rgba(124,58,237,0.12)',
              border: '1px solid rgba(124,58,237,0.25)',
              marginBottom: 14,
            }}
          >
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#7C3AED', animation: 'pulse 2s ease-in-out infinite' }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#A78BFA', letterSpacing: '0.15em', textTransform: 'uppercase' as const }}>Early access now open</span>
          </div>

          <h1
            style={{
              fontFamily: "'Avenir Next', 'Avenir', sans-serif",
              fontSize: 36,
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              color: '#F4F4FF',
              marginBottom: 12,
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
                fontWeight: 400,
              }}
            >
              to checkout.
            </span>
            <br />
            <em style={{ fontStyle: 'italic', color: '#F4F4FF' }}>Instantly.</em>
          </h1>
          <p
            style={{
              fontFamily: "'Avenir Next', 'Avenir', sans-serif",
              fontSize: 14,
              color: '#8B8BAA',
              lineHeight: 1.65,
              fontWeight: 300,
            }}
          >
            Tell Beep what you need. Our AI agent executes the entire commerce journey — search, compare, and checkout in seconds.
          </p>
        </div>

        {/* Live chat preview */}
        <div
          style={{
            marginBottom: 20,
            padding: 16,
            borderRadius: 20,
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(124,58,237,0.2)',
            backdropFilter: 'blur(10px)',
          }}
        >
          {/* Window chrome */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14 }}>
            {['#ef4444', '#eab308', '#22c55e'].map((c, i) => (
              <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: c, opacity: 0.7 }} />
            ))}
            <span style={{ marginLeft: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#8B8BAA', letterSpacing: '0.15em', textTransform: 'uppercase' as const }}>Beep · Live</span>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#34d399', animation: 'pulse 1.5s ease-in-out infinite' }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#34d399' }}>Live</span>
            </div>
          </div>

          {/* User message */}
          {chatStep >= 1 && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginBottom: 10,
                animation: 'chatIn 0.4s cubic-bezier(0.16,1,0.3,1)',
              }}
            >
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
                  lineHeight: 1.4,
                  boxShadow: '0 4px 20px rgba(124,58,237,0.3)',
                }}
              >
                {chatMessages[0].text}
              </div>
            </div>
          )}

          {/* AI response */}
          {chatStep >= 2 && (
            <div
              style={{
                display: 'flex',
                gap: 8,
                animation: 'chatIn 0.4s cubic-bezier(0.16,1,0.3,1)',
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #7C3AED, #60A5FA)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontSize: 13,
                  boxShadow: '0 0 12px rgba(124,58,237,0.4)',
                }}
              >
                ✦
              </div>
              <div
                style={{
                  padding: '10px 14px',
                  borderRadius: '4px 16px 16px 16px',
                  background: 'rgba(16,185,129,0.1)',
                  border: '1px solid rgba(16,185,129,0.3)',
                  fontSize: 12,
                  fontFamily: "'Avenir Next', 'Avenir', sans-serif",
                }}
              >
                <span style={{ color: '#34d399', fontWeight: 600, fontSize: 13 }}>✓ Booking confirmed</span>
                <p style={{ color: '#8B8BAA', marginTop: 4, fontSize: 11, lineHeight: 1.4 }}>IndiGo 6E-204 · ₹3,899 · Seat 14A · PNR: AI2026XK</p>
              </div>
            </div>
          )}

          {/* Typing indicator */}
          {chatStep === 1 && (
            <div style={{ display: 'flex', gap: 8, animation: 'chatIn 0.4s ease' }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg, #7C3AED, #60A5FA)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 13 }}>✦</div>
              <div style={{ padding: '10px 14px', borderRadius: '4px 16px 16px 16px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: 4 }}>
                {[0, 1, 2].map((i) => (
                  <div key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: '#A78BFA', animation: `typingDot 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Feature pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
          {features.map((f, i) => (
            <div
              key={i}
              style={{
                padding: '6px 12px',
                borderRadius: 20,
                background: `${f.color}12`,
                border: `1px solid ${f.color}30`,
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

        {/* Stats row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '14px 16px',
            borderRadius: 16,
            background: 'rgba(124,58,237,0.07)',
            border: '1px solid rgba(124,58,237,0.15)',
            marginBottom: 24,
          }}
        >
          {[
            { value: '8 sec', label: 'Avg. time' },
            { value: '2.4M+', label: 'Intents' },
            { value: '99.1%', label: 'Accuracy' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' as const }}>
              <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 18, fontWeight: 300, color: '#F4F4FF', letterSpacing: '-0.02em' }}>{s.value}</p>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#8B8BAA', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button
            onClick={onGetStarted}
            style={{
              width: '100%',
              padding: '17px',
              borderRadius: 18,
              background: 'linear-gradient(135deg, #7C3AED, #4F46E5)',
              border: 'none',
              color: '#fff',
              fontSize: 16,
              fontWeight: 600,
              fontFamily: "'Avenir Next', 'Avenir', sans-serif",
              cursor: 'pointer',
              boxShadow: '0 0 40px rgba(124,58,237,0.45), 0 4px 20px rgba(0,0,0,0.4)',
              letterSpacing: '-0.01em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            <span>Get Started</span>
            <span style={{ fontSize: 18 }}>→</span>
          </button>
          <p style={{ textAlign: 'center', fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#8B8BAA', letterSpacing: '0.08em' }}>
            Built by founders from IIFT Delhi · Zero-friction commerce
          </p>
        </div>
      </div>

      <style>{`
        @keyframes chatIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes typingDot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
