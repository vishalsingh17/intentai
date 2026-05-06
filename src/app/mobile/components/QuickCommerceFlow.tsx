'use client';

import React, { useEffect, useState } from 'react';
import { CheckoutData } from './MobileApp';

interface Props {
  onBack: () => void;
  onCheckout: (data: CheckoutData) => void;
}

type FlowStep = 'input' | 'searching' | 'results';

const groceryItems = [
  { name: 'Vaseline Petroleum Jelly 250ml', price: '₹189', mrp: '₹220', store: 'Blinkit', time: '10 min', category: 'Skincare', icon: '🧴', discount: '14% off' },
  { name: 'Himalaya Lip Balm (Pack of 2)', price: '₹98', mrp: '₹120', store: 'Blinkit', time: '10 min', category: 'Skincare', icon: '💋', discount: '18% off' },
  { name: 'Amul Butter 500g', price: '₹275', mrp: '₹290', store: 'Zepto', time: '8 min', category: 'Dairy', icon: '🧈', discount: '5% off' },
  { name: 'Tata Salt 1kg', price: '₹24', mrp: '₹26', store: 'Zepto', time: '8 min', category: 'Staples', icon: '🧂', discount: '8% off' },
];

const platforms = [
  { name: 'Blinkit', color: '#22c55e', icon: '⚡' },
  { name: 'Zepto', color: '#a855f7', icon: '🟣' },
  { name: 'Instamart', color: '#f97316', icon: '🟠' },
];

export default function QuickCommerceFlow({ onBack, onCheckout }: Props) {
  const [step, setStep] = useState<FlowStep>('input');
  const [query, setQuery] = useState('');
  const [progress, setProgress] = useState(0);
  const [searchPlatform, setSearchPlatform] = useState(0);

  const handleSearch = () => {
    setStep('searching');
    setProgress(0);
    setSearchPlatform(0);
  };

  useEffect(() => {
    if (step !== 'searching') return;
    const platformInterval = setInterval(() => {
      setSearchPlatform((p) => (p + 1) % platforms.length);
    }, 600);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(interval); clearInterval(platformInterval); setStep('results'); return 100; }
        return p + 10;
      });
    }, 80);
    return () => { clearInterval(interval); clearInterval(platformInterval); };
  }, [step]);

  const handleCheckout = () => {
    onCheckout({
      title: 'Quick Commerce Order',
      items: groceryItems.map((i) => ({ name: i.name, price: i.price })),
      total: '₹586',
      category: 'quick-commerce',
    });
  };

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: '#080810' }}>
      <div style={{ position: 'absolute', width: 280, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,70,229,0.2) 0%, transparent 70%)', filter: 'blur(60px)', top: 0, left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none' }} aria-hidden="true" />

      <div style={{ height: 54 }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 20px 12px' }}>
        <button onClick={onBack} style={{ width: 38, height: 38, borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 18, color: '#B0B0CC' }}>←</button>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 18, fontWeight: 600, color: '#F4F4FF', letterSpacing: '-0.01em' }}>Quick Commerce</h3>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#8B8BAA', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>Instant delivery · 10 min</p>
        </div>
        <div style={{ padding: '4px 10px', borderRadius: 20, background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.25)', display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#22c55e', animation: 'pulse 1.5s ease-in-out infinite' }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#34d399' }}>10 min</span>
        </div>
      </div>

      {/* Platform badges */}
      <div style={{ display: 'flex', gap: 8, padding: '0 20px 14px' }}>
        {platforms.map((p, i) => (
          <div key={i} style={{ padding: '5px 10px', borderRadius: 20, background: `${p.color}15`, border: `1px solid ${p.color}30`, display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: 11 }}>{p.icon}</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: p.color }}>{p.name}</span>
          </div>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px 24px' }}>

        {/* INPUT */}
        {step === 'input' && (
          <div>
            <div style={{ padding: '14px 16px', borderRadius: 16, background: 'rgba(79,70,229,0.08)', border: '1px solid rgba(79,70,229,0.2)', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'linear-gradient(135deg, #4F46E5, #60A5FA)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>✦</div>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#A78BFA', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>Beep AI</span>
              </div>
              <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 13, color: '#B0B0CC', lineHeight: 1.55 }}>
                Tell me what you need delivered. I'll find the fastest option from Blinkit, Zepto, or Swiggy Instamart.
              </p>
            </div>

            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Order me lip balm and Vaseline"
              rows={3}
              style={{ width: '100%', padding: '14px', borderRadius: 14, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(79,70,229,0.3)', color: '#F4F4FF', fontSize: 14, fontFamily: "'Avenir Next', 'Avenir', sans-serif", outline: 'none', resize: 'none' as const, lineHeight: 1.5, marginBottom: 12, boxSizing: 'border-box' as const }}
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
              {['Order me lip balm and Vaseline', 'Get me 2 litres of milk and bread', 'Order Amul butter and Tata salt'].map((s, i) => (
                <button key={i} onClick={() => setQuery(s)} style={{ padding: '10px 14px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: '#8B8BAA', fontSize: 12, fontFamily: "'Avenir Next', 'Avenir', sans-serif", cursor: 'pointer', textAlign: 'left' as const, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span>🛒</span> {s}
                </button>
              ))}
            </div>

            <button onClick={handleSearch} style={{ width: '100%', padding: '16px', borderRadius: 18, background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', border: 'none', color: '#fff', fontSize: 15, fontWeight: 600, fontFamily: "'Avenir Next', 'Avenir', sans-serif", cursor: 'pointer', boxShadow: '0 0 30px rgba(79,70,229,0.4)' }}>
              ✦ Find & Order Instantly
            </button>
          </div>
        )}

        {/* SEARCHING */}
        {step === 'searching' && (
          <div style={{ paddingTop: 32, textAlign: 'center' as const }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg, #4F46E5, #60A5FA)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, margin: '0 auto 20px', boxShadow: '0 0 50px rgba(79,70,229,0.5)', animation: 'aiPulse 1.5s ease-in-out infinite' }}>⚡</div>
            <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 20, fontWeight: 300, color: '#F4F4FF', marginBottom: 6 }}>Finding best prices…</p>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#A78BFA', letterSpacing: '0.08em', marginBottom: 24 }}>
              Checking {platforms[searchPlatform].name}…
            </p>
            <div style={{ height: 4, borderRadius: 4, background: 'rgba(255,255,255,0.06)', overflow: 'hidden', marginBottom: 24 }}>
              <div style={{ height: '100%', borderRadius: 4, background: 'linear-gradient(to right, #4F46E5, #60A5FA)', width: `${progress}%`, transition: 'width 0.1s linear' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
              {platforms.map((p, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 12px', borderRadius: 20, background: searchPlatform === i ? `${p.color}20` : 'rgba(255,255,255,0.04)', border: `1px solid ${searchPlatform === i ? p.color + '50' : 'rgba(255,255,255,0.06)'}`, transition: 'all 0.3s ease' }}>
                  <span style={{ fontSize: 12 }}>{p.icon}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: searchPlatform === i ? p.color : '#8B8BAA' }}>{p.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RESULTS */}
        {step === 'results' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, padding: '10px 14px', borderRadius: 12, background: 'rgba(79,70,229,0.08)', border: '1px solid rgba(79,70,229,0.2)' }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg, #4F46E5, #60A5FA)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>✦</div>
              <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 13, color: '#A78BFA', fontWeight: 500 }}>Found {groceryItems.length} items · Best prices selected</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
              {groceryItems.map((item, i) => (
                <div key={i} style={{ padding: '12px 14px', borderRadius: 14, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(79,70,229,0.15)', border: '1px solid rgba(79,70,229,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 13, color: '#F4F4FF', marginBottom: 3, lineHeight: 1.3 }}>{item.name}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#8B8BAA' }}>{item.store}</span>
                      <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#8B8BAA', display: 'inline-block' }} />
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#34d399' }}>⚡ {item.time}</span>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#22c55e', padding: '1px 6px', borderRadius: 10, background: 'rgba(34,197,94,0.1)' }}>{item.discount}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' as const, flexShrink: 0 }}>
                    <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 15, fontWeight: 600, color: '#A78BFA' }}>{item.price}</p>
                    <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 11, color: '#8B8BAA', textDecoration: 'line-through' }}>{item.mrp}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order summary */}
            <div style={{ padding: '14px', borderRadius: 14, background: 'rgba(79,70,229,0.08)', border: '1px solid rgba(79,70,229,0.2)', marginBottom: 16 }}>
              {[['Subtotal', '₹586'], ['Delivery', 'Free ✓'], ['Savings', '₹70']].map(([k, v], i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: i < 2 ? 8 : 0 }}>
                  <span style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 13, color: '#8B8BAA' }}>{k}</span>
                  <span style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 13, color: k === 'Savings' ? '#34d399' : '#F4F4FF', fontWeight: k === 'Savings' ? 600 : 400 }}>{v}</span>
                </div>
              ))}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 10, marginTop: 10, display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 15, fontWeight: 600, color: '#F4F4FF' }}>Total</span>
                <span style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 17, fontWeight: 700, color: '#A78BFA' }}>₹586</span>
              </div>
            </div>

            <button onClick={handleCheckout} style={{ width: '100%', padding: '16px', borderRadius: 18, background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', border: 'none', color: '#fff', fontSize: 15, fontWeight: 600, fontFamily: "'Avenir Next', 'Avenir', sans-serif", cursor: 'pointer', boxShadow: '0 0 30px rgba(79,70,229,0.4)' }}>
              Proceed to Checkout →
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes aiPulse {
          0%, 100% { box-shadow: 0 0 50px rgba(79,70,229,0.5); }
          50% { box-shadow: 0 0 70px rgba(79,70,229,0.8); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
