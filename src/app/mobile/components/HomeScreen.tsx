'use client';

import React from 'react';
import Image from 'next/image';
import { Screen } from './MobileApp';

interface Props {
  onNavigate: (s: Screen) => void;
}

const categories = [
  { id: 'travel' as Screen, icon: '✈️', label: 'Travel', sub: 'Flights · Hotels · Trains', color: '#7C3AED' },
  { id: 'quick-commerce' as Screen, icon: '🛒', label: 'Quick Commerce', sub: 'Groceries · Instant delivery', color: '#4F46E5' },
  { id: 'mobility' as Screen, icon: '🚗', label: 'Mobility', sub: 'Cabs · Auto · Bikes', color: '#059669' },
  { id: 'ecommerce' as Screen, icon: '🛍️', label: 'E-commerce', sub: 'Shopping · Deals', color: '#2563EB' },
];

const recentIntents = [
  { text: 'Book flight Delhi → Bangalore', time: '2h ago', icon: '✈️' },
  { text: 'Order Vaseline & lip balm', time: 'Yesterday', icon: '🛒' },
  { text: 'Cab from CP to Gurgaon', time: '2d ago', icon: '🚗' },
];

export default function HomeScreen({ onNavigate }: Props) {
  return (
    <div
      className="absolute inset-0 flex flex-col overflow-y-auto"
      style={{ background: '#080810' }}
    >
      {/* Glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 300,
          height: 200,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)',
          filter: 'blur(60px)',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
        aria-hidden="true"
      />

      <div style={{ height: 44 }} />

      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-4 pb-2">
        <div className="flex items-center gap-2">
          <Image src="/assets/images/beep_logo-1774785208526.png" alt="Beep" width={24} height={24} className="object-contain" />
          <span style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 18, fontWeight: 700, color: '#F4F4FF', letterSpacing: '-0.01em' }}>beep</span>
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
          }}
        >
          A
        </div>
      </div>

      {/* Greeting */}
      <div className="px-5 pt-4 pb-2">
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#8B8BAA', letterSpacing: '0.15em', textTransform: 'uppercase' as const, marginBottom: 4 }}>
          Good morning
        </p>
        <h2 style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 24, fontWeight: 300, color: '#F4F4FF', letterSpacing: '-0.02em' }}>
          What do you need today?
        </h2>
      </div>

      {/* AI Intent input */}
      <div className="px-5 mt-4 mb-6">
        <button
          onClick={() => onNavigate('travel')}
          style={{
            width: '100%',
            padding: '14px 16px',
            borderRadius: 16,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(124,58,237,0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            cursor: 'pointer',
            textAlign: 'left' as const,
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: 'linear-gradient(135deg, #7C3AED, #60A5FA)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 13,
              flexShrink: 0,
            }}
          >
            ✦
          </div>
          <span style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 14, color: '#8B8BAA', fontWeight: 300 }}>
            Tell Beep what you need…
          </span>
          <div style={{ marginLeft: 'auto', fontSize: 16, color: '#8B8BAA' }}>⌘</div>
        </button>
      </div>

      {/* Categories */}
      <div className="px-5 mb-6">
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#8B8BAA', letterSpacing: '0.15em', textTransform: 'uppercase' as const, marginBottom: 12 }}>
          Categories
        </p>
        <div className="grid grid-cols-2 gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onNavigate(cat.id)}
              style={{
                padding: '16px',
                borderRadius: 16,
                background: 'rgba(255,255,255,0.04)',
                border: `1px solid ${cat.color}33`,
                cursor: 'pointer',
                textAlign: 'left' as const,
                transition: 'all 0.2s ease',
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: `${cat.color}22`,
                  border: `1px solid ${cat.color}44`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                  marginBottom: 10,
                }}
              >
                {cat.icon}
              </div>
              <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 14, fontWeight: 600, color: '#F4F4FF', marginBottom: 2 }}>
                {cat.label}
              </p>
              <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 11, color: '#8B8BAA' }}>
                {cat.sub}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Recent intents */}
      <div className="px-5 mb-6">
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#8B8BAA', letterSpacing: '0.15em', textTransform: 'uppercase' as const, marginBottom: 12 }}>
          Recent
        </p>
        <div className="flex flex-col gap-2">
          {recentIntents.map((item, i) => (
            <div
              key={i}
              style={{
                padding: '12px 14px',
                borderRadius: 14,
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <span style={{ fontSize: 18 }}>{item.icon}</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 13, color: '#B0B0CC', marginBottom: 2 }}>{item.text}</p>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#8B8BAA' }}>{item.time}</p>
              </div>
              <span style={{ color: '#8B8BAA', fontSize: 14 }}>›</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats strip */}
      <div
        className="mx-5 mb-6 p-4"
        style={{
          borderRadius: 16,
          background: 'rgba(124,58,237,0.08)',
          border: '1px solid rgba(124,58,237,0.2)',
        }}
      >
        <div className="flex justify-between">
          {[
            { value: '8 sec', label: 'Avg completion' },
            { value: '2.4M+', label: 'Intents done' },
            { value: '99.1%', label: 'AI accuracy' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' as const }}>
              <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 18, fontWeight: 300, color: '#F4F4FF', letterSpacing: '-0.02em' }}>{s.value}</p>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#8B8BAA', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom nav */}
      <div
        style={{
          position: 'sticky',
          bottom: 0,
          background: 'rgba(8,8,16,0.95)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          padding: '12px 0 20px',
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        {[
          { icon: '⊞', label: 'Home', active: true },
          { icon: '✦', label: 'AI Agent', active: false },
          { icon: '📦', label: 'Orders', active: false },
          { icon: '👤', label: 'Profile', active: false },
        ].map((tab, i) => (
          <button
            key={i}
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
            <span style={{ fontSize: 18, opacity: tab.active ? 1 : 0.4 }}>{tab.icon}</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: tab.active ? '#A78BFA' : '#8B8BAA', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
