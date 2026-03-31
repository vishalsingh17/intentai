'use client';

import React, { useEffect, useState } from 'react';
import { CheckoutData } from './MobileApp';

interface Props {
  onBack: () => void;
  onCheckout: (data: CheckoutData) => void;
}

type FlowStep = 'input' | 'searching' | 'results' | 'selected';

const products = [
  { name: 'Lakme 9to5 Primer + Matte Lipstick', brand: 'Lakme', price: '₹349', mrp: '₹450', store: 'Nykaa', rating: '4.5★', tag: 'Best Deal', img: '💄' },
  { name: 'Maybelline Fit Me Foundation', brand: 'Maybelline', price: '₹499', mrp: '₹650', store: 'Amazon', rating: '4.3★', tag: null, img: '🧴' },
  { name: 'Biotique Bio Coconut Whitening Cream', brand: 'Biotique', price: '₹189', mrp: '₹220', store: 'Flipkart', rating: '4.1★', tag: 'Budget', img: '🧴' },
];

export default function EcommerceFlow({ onBack, onCheckout }: Props) {
  const [step, setStep] = useState<FlowStep>('input');
  const [query, setQuery] = useState('');
  const [progress, setProgress] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState(0);

  const handleSearch = () => {
    setStep('searching');
    setProgress(0);
  };

  useEffect(() => {
    if (step !== 'searching') return;
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(interval); setStep('results'); return 100; }
        return p + 9;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [step]);

  const handleSelect = (idx: number) => {
    setSelectedIdx(idx);
    setStep('selected');
  };

  const handleCheckout = () => {
    const p = products[selectedIdx];
    onCheckout({
      title: 'Shopping Order',
      items: [
        { name: p.name, price: p.price },
        { name: 'Delivery', price: '₹40' },
      ],
      total: `₹${parseInt(p.price.replace('₹', '')) + 40}`,
      category: 'ecommerce',
    });
  };

  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: '#080810' }}>
      <div className="absolute pointer-events-none" style={{ width: 250, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.2) 0%, transparent 70%)', filter: 'blur(60px)', top: 0, left: '50%', transform: 'translateX(-50%)' }} aria-hidden="true" />

      <div style={{ height: 44 }} />

      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-4">
        <button onClick={onBack} style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 16, color: '#B0B0CC' }}>←</button>
        <div>
          <h3 style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 18, fontWeight: 600, color: '#F4F4FF', letterSpacing: '-0.01em' }}>E-commerce</h3>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#8B8BAA', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>50+ retailers · Best price</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-6">
        {step === 'input' && (
          <div>
            <div style={{ padding: '14px 16px', borderRadius: 16, background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.2)', marginBottom: 16 }}>
              <div className="flex items-center gap-2 mb-2">
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg, #2563EB, #60A5FA)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>✦</div>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#60A5FA', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>Beep AI</span>
              </div>
              <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 13, color: '#B0B0CC', lineHeight: 1.5 }}>
                Describe what you want to buy. I'll compare prices across Amazon, Flipkart, Nykaa, and 50+ stores.
              </p>
            </div>

            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Find me a good lipstick under ₹500'
              rows={2}
              style={{ width: '100%', padding: '14px', borderRadius: 14, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(37,99,235,0.3)', color: '#F4F4FF', fontSize: 14, fontFamily: "'Avenir Next', 'Avenir', sans-serif", outline: 'none', resize: 'none' as const, lineHeight: 1.5, marginBottom: 12 }}
            />

            <div className="flex flex-col gap-2 mb-6">
              {['Find me a good lipstick under ₹500', 'Order me a moisturizer for dry skin', 'Best running shoes under ₹3000'].map((s, i) => (
                <button key={i} onClick={() => setQuery(s)} style={{ padding: '10px 14px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: '#8B8BAA', fontSize: 12, fontFamily: "'Avenir Next', 'Avenir', sans-serif", cursor: 'pointer', textAlign: 'left' as const }}>
                  🛍️ {s}
                </button>
              ))}
            </div>

            <button onClick={handleSearch} style={{ width: '100%', padding: '15px', borderRadius: 16, background: 'linear-gradient(135deg, #2563EB, #4F46E5)', border: 'none', color: '#fff', fontSize: 15, fontWeight: 600, fontFamily: "'Avenir Next', 'Avenir', sans-serif", cursor: 'pointer', boxShadow: '0 0 30px rgba(37,99,235,0.4)' }}>
              ✦ Find Best Deals
            </button>
          </div>
        )}

        {step === 'searching' && (
          <div style={{ paddingTop: 40, textAlign: 'center' as const }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg, #2563EB, #60A5FA)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, margin: '0 auto 20px', boxShadow: '0 0 40px rgba(37,99,235,0.4)' }}>🛍️</div>
            <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 18, fontWeight: 300, color: '#F4F4FF', marginBottom: 8 }}>Comparing prices…</p>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#8B8BAA', letterSpacing: '0.1em', marginBottom: 24 }}>Checking Amazon, Flipkart, Nykaa & 50+ stores</p>
            <div style={{ height: 4, borderRadius: 4, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
              <div style={{ height: '100%', borderRadius: 4, background: 'linear-gradient(to right, #2563EB, #60A5FA)', width: `${progress}%`, transition: 'width 0.1s linear' }} />
            </div>
          </div>
        )}

        {step === 'results' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg, #2563EB, #60A5FA)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>✦</div>
              <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 13, color: '#60A5FA', fontWeight: 500 }}>3 best matches found</p>
            </div>

            <div className="flex flex-col gap-3">
              {products.map((product, i) => (
                <button key={i} onClick={() => handleSelect(i)} style={{ padding: '14px', borderRadius: 16, background: i === 0 ? 'rgba(37,99,235,0.1)' : 'rgba(255,255,255,0.04)', border: `1px solid ${i === 0 ? 'rgba(37,99,235,0.35)' : 'rgba(255,255,255,0.08)'}`, cursor: 'pointer', textAlign: 'left' as const, width: '100%' }}>
                  <div className="flex items-start gap-3">
                    <div style={{ width: 52, height: 52, borderRadius: 12, background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(37,99,235,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>{product.img}</div>
                    <div style={{ flex: 1 }}>
                      <div className="flex items-start justify-between mb-1">
                        <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 13, fontWeight: 600, color: '#F4F4FF', lineHeight: 1.3, flex: 1, marginRight: 8 }}>{product.name}</p>
                        {product.tag && <span style={{ fontSize: 9, padding: '2px 7px', borderRadius: 20, background: 'rgba(37,99,235,0.3)', color: '#60A5FA', fontFamily: "'JetBrains Mono', monospace", flexShrink: 0 }}>{product.tag}</span>}
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                        <span style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 16, fontWeight: 600, color: '#A78BFA' }}>{product.price}</span>
                        <span style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 12, color: '#8B8BAA', textDecoration: 'line-through' }}>{product.mrp}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#8B8BAA' }}>{product.store}</span>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#34d399' }}>{product.rating}</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'selected' && (
          <div>
            <div style={{ padding: '16px', borderRadius: 16, background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.25)', marginBottom: 16 }}>
              <div className="flex items-center gap-2 mb-3">
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(37,99,235,0.2)', border: '1px solid rgba(37,99,235,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>✓</div>
                <span style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 14, fontWeight: 600, color: '#60A5FA' }}>Product selected</span>
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
                <div style={{ width: 56, height: 56, borderRadius: 12, background: 'rgba(37,99,235,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>{products[selectedIdx].img}</div>
                <div>
                  <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 14, fontWeight: 600, color: '#F4F4FF', marginBottom: 4 }}>{products[selectedIdx].name}</p>
                  <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 13, color: '#8B8BAA' }}>{products[selectedIdx].brand} · {products[selectedIdx].store}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[['Price', products[selectedIdx].price], ['MRP', products[selectedIdx].mrp], ['Store', products[selectedIdx].store], ['Rating', products[selectedIdx].rating]].map(([k, v], i) => (
                  <div key={i} style={{ padding: '8px 10px', borderRadius: 10, background: 'rgba(255,255,255,0.04)' }}>
                    <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#8B8BAA', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 2 }}>{k}</p>
                    <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 13, color: '#F4F4FF', fontWeight: 500 }}>{v}</p>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={handleCheckout} style={{ width: '100%', padding: '15px', borderRadius: 16, background: 'linear-gradient(135deg, #2563EB, #4F46E5)', border: 'none', color: '#fff', fontSize: 15, fontWeight: 600, fontFamily: "'Avenir Next', 'Avenir', sans-serif", cursor: 'pointer', boxShadow: '0 0 30px rgba(37,99,235,0.4)', marginBottom: 10 }}>
              Proceed to Checkout →
            </button>
            <button onClick={() => setStep('results')} style={{ width: '100%', padding: '13px', borderRadius: 16, background: 'transparent', border: '1px solid rgba(255,255,255,0.08)', color: '#8B8BAA', fontSize: 14, fontFamily: "'Avenir Next', 'Avenir', sans-serif", cursor: 'pointer' }}>
              View Other Options
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
