'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Screen } from './MobileApp';

interface Props {
  onNavigate: (s: Screen) => void;
}

const categories = [
  { id: 'travel' as Screen, icon: '✈️', label: 'Travel', sub: 'Flights · Hotels · Trains', color: '#7C3AED', glow: 'rgba(124,58,237,0.2)' },
  { id: 'quick-commerce' as Screen, icon: '⚡', label: 'Quick Commerce', sub: 'Groceries · 10 min delivery', color: '#4F46E5', glow: 'rgba(79,70,229,0.2)' },
  { id: 'mobility' as Screen, icon: '🚗', label: 'Mobility', sub: 'Cabs · Auto · Bikes', color: '#059669', glow: 'rgba(5,150,105,0.2)' },
  { id: 'ecommerce' as Screen, icon: '🛍️', label: 'E-commerce', sub: 'Shopping · Best deals', color: '#2563EB', glow: 'rgba(37,99,235,0.2)' },
];

const recentIntents = [
  { text: 'Book flight Delhi → Bangalore', time: '2h ago', icon: '✈️', screen: 'travel' as Screen },
  { text: 'Order Vaseline & lip balm', time: 'Yesterday', icon: '⚡', screen: 'quick-commerce' as Screen },
  { text: 'Cab from CP to Gurgaon', time: '2d ago', icon: '🚗', screen: 'mobility' as Screen },
];

const navTabs = [
  { icon: '⊞', label: 'Home', active: true },
  { icon: '✦', label: 'AI Agent', active: false },
  { icon: '📦', label: 'Orders', active: false },
  { icon: '👤', label: 'Profile', active: false },
];

export default function HomeScreen({ onNavigate }: Props) {
  const [activeNav, setActiveNav] = useState(0);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        background: '#080810',
        overflowY: 'auto',
      }}
    >
      {/* Ambient glow */}
      <div style={{ position: 'absolute', width: 350, height: 250, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)', filter: 'blur(60px)', top: -40, left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none' }} aria-hidden="true" />

      <div style={{ height: 54 }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px 8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Image src="/assets/images/beep_logo-1774785208526.png" alt="Beep" width={26} height={26} className="object-contain" />
          <span style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 20, fontWeight: 700, color: '#F4F4FF', letterSpacing: '-0.02em' }}>beep</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              padding: '4px 10px',
              borderRadius: 20,
              background: 'rgba(124,58,237,0.12)',
              border: '1px solid rgba(124,58,237,0.25)',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
            }}
          >
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#7C3AED', animation: 'pulse 2s ease-in-out infinite' }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#A78BFA', letterSpacing: '0.1em' }}>AI Active</span>
          </div>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #7C3AED, #4F46E5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 14,
              fontWeight: 700,
              color: '#fff',
              fontFamily: "'Avenir Next', 'Avenir', sans-serif",
              boxShadow: '0 0 12px rgba(124,58,237,0.4)',
            }}
          >
            A
          </div>
        </div>
      </div>

      {/* Greeting */}
      <div style={{ padding: '12px 20px 0' }}>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#8B8BAA', letterSpacing: '0.15em', textTransform: 'uppercase' as const, marginBottom: 4 }}>
          Good morning, Arjun
        </p>
        <h2 style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 26, fontWeight: 300, color: '#F4F4FF', letterSpacing: '-0.025em', lineHeight: 1.2 }}>
          What do you need<br />today?
        </h2>
      </div>

      {/* AI Intent input */}
      <div style={{ padding: '16px 20px 0' }}>
        <button
          onClick={() => onNavigate('travel')}
          style={{
            width: '100%',
            padding: '14px 16px',
            borderRadius: 18,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(124,58,237,0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            cursor: 'pointer',
            textAlign: 'left' as const,
            transition: 'all 0.2s ease',
            boxShadow: '0 0 20px rgba(124,58,237,0.08)',
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #7C3AED, #60A5FA)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 15,
              flexShrink: 0,
              boxShadow: '0 0 12px rgba(124,58,237,0.4)',
            }}
          >
            ✦
          </div>
          <span style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 14, color: '#8B8BAA', fontWeight: 300, flex: 1 }}>
            Tell Beep what you need…
          </span>
          <div
            style={{
              padding: '3px 8px',
              borderRadius: 8,
              background: 'rgba(124,58,237,0.15)',
              border: '1px solid rgba(124,58,237,0.25)',
            }}
          >
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#A78BFA' }}>AI</span>
          </div>
        </button>
      </div>

      {/* Categories */}
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#8B8BAA', letterSpacing: '0.15em', textTransform: 'uppercase' as const }}>
            Categories
          </p>
          <span style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 12, color: '#A78BFA' }}>4 active</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onNavigate(cat.id)}
              style={{
                padding: '16px',
                borderRadius: 18,
                background: 'rgba(255,255,255,0.04)',
                border: `1px solid ${cat.color}30`,
                cursor: 'pointer',
                textAlign: 'left' as const,
                transition: 'all 0.2s ease',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Subtle glow bg */}
              <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 30% 30%, ${cat.glow} 0%, transparent 60%)`, pointerEvents: 'none' }} />
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 14,
                  background: `${cat.color}20`,
                  border: `1px solid ${cat.color}40`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                  marginBottom: 10,
                  position: 'relative',
                }}
              >
                {cat.icon}
              </div>
              <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 14, fontWeight: 600, color: '#F4F4FF', marginBottom: 3, position: 'relative' }}>
                {cat.label}
              </p>
              <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 11, color: '#8B8BAA', lineHeight: 1.3, position: 'relative' }}>
                {cat.sub}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Recent intents */}
      <div style={{ padding: '20px 20px 0' }}>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#8B8BAA', letterSpacing: '0.15em', textTransform: 'uppercase' as const, marginBottom: 12 }}>
          Recent
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {recentIntents.map((item, i) => (
            <button
              key={i}
              onClick={() => onNavigate(item.screen)}
              style={{
                padding: '12px 14px',
                borderRadius: 14,
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                cursor: 'pointer',
                textAlign: 'left' as const,
                width: '100%',
                transition: 'all 0.2s ease',
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: 'rgba(124,58,237,0.1)',
                  border: '1px solid rgba(124,58,237,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 16,
                  flexShrink: 0,
                }}
              >
                {item.icon}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 13, color: '#B0B0CC', marginBottom: 2 }}>{item.text}</p>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#8B8BAA' }}>{item.time}</p>
              </div>
              <span style={{ color: '#8B8BAA', fontSize: 16 }}>›</span>
            </button>
          ))}
        </div>
      </div>

      {/* Stats strip */}
      <div
        style={{
          margin: '20px 20px 0',
          padding: '16px',
          borderRadius: 18,
          background: 'rgba(124,58,237,0.07)',
          border: '1px solid rgba(124,58,237,0.18)',
        }}
      >
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#8B8BAA', letterSpacing: '0.15em', textTransform: 'uppercase' as const, marginBottom: 12 }}>Platform Stats</p>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {[
            { value: '8 sec', label: 'Avg completion' },
            { value: '2.4M+', label: 'Intents done' },
            { value: '99.1%', label: 'AI accuracy' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' as const }}>
              <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 20, fontWeight: 300, color: '#F4F4FF', letterSpacing: '-0.02em' }}>{s.value}</p>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#8B8BAA', letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Spacer for bottom nav */}
      <div style={{ height: 80 }} />

      {/* Bottom nav */}
      <div
        style={{
          position: 'sticky',
          bottom: 0,
          background: 'rgba(8,8,16,0.96)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          padding: '10px 0 24px',
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        {navTabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActiveNav(i)}
            style={{
              display: 'flex',
              flexDirection: 'column' as const,
              alignItems: 'center',
              gap: 4,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px 12px',
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 12,
                background: activeNav === i ? 'rgba(124,58,237,0.2)' : 'transparent',
                border: activeNav === i ? '1px solid rgba(124,58,237,0.35)' : '1px solid transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
                transition: 'all 0.2s ease',
              }}
            >
              {tab.icon}
            </div>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9,
                color: activeNav === i ? '#A78BFA' : '#8B8BAA',
                letterSpacing: '0.05em',
                transition: 'color 0.2s ease',
              }}
            >
              {tab.label}
            </span>
          </button>
        ))}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
