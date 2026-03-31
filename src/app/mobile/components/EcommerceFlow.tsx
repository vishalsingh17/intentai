'use client';

import React, { useEffect, useState } from 'react';
import { CheckoutData } from './MobileApp';

interface Props {
  onBack: () => void;
  onCheckout: (data: CheckoutData) => void;
}

type FlowStep = 'input' | 'searching' | 'results' | 'selected';

const products = [
  { name: 'Lakme 9to5 Primer + Matte Lipstick', brand: 'Lakme', price: '₹349', mrp: '₹450', store: 'Nykaa', rating: '4.5', reviews: '2.1k', tag: 'Best Deal', img: '💄', discount: '22% off' },
  { name: 'Maybelline Fit Me Foundation', brand: 'Maybelline', price: '₹499', mrp: '₹650', store: 'Amazon', rating: '4.3', reviews: '5.4k', tag: null, img: '🧴', discount: '23% off' },
  { name: 'Biotique Bio Coconut Whitening Cream', brand: 'Biotique', price: '₹189', mrp: '₹220', store: 'Flipkart', rating: '4.1', reviews: '890', tag: 'Budget', img: '🧴', discount: '14% off' },
];

const retailers = ['Amazon', 'Flipkart', 'Nykaa', 'Myntra', 'Meesho', '50+ more'];

export default function EcommerceFlow({ onBack, onCheckout }: Props) {
  const [step, setStep] = useState<FlowStep>('input');
  const [query, setQuery] = useState('');
  const [progress, setProgress] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [retailerIdx, setRetailerIdx] = useState(0);

  const handleSearch = () => {
    setStep('searching');
    setProgress(0);
    setRetailerIdx(0);
  };

  useEffect(() => {
    if (step !== 'searching') return;
    const rInterval = setInterval(() => {
      setRetailerIdx((p) => (p + 1) % retailers.length);
    }, 400);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(interval); clearInterval(rInterval); setStep('results'); return 100; }
        return p + 9;
      });
    }, 80);
    return () => { clearInterval(interval); clearInterval(rInterval); };
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
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: '#080810' }}>
      <div style={{ position: 'absolute', width: 280, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.2) 0%, transparent 70%)', filter: 'blur(60px)', top: 0, left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none' }} aria-hidden="true" />

      <div style={{ height: 54 }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 20px 12px' }}>
        <button onClick={onBack} style={{ width: 38, height: 38, borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 18, color: '#B0B0CC' }}>←</button>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 18, fontWeight: 600, color: '#F4F4FF', letterSpacing: '-0.01em' }}>E-commerce</h3>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#8B8BAA', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>50+ retailers · Best price</p>
        </div>
        <div style={{ padding: '4px 10px', borderRadius: 20, background: 'rgba(37,99,235,0.12)', border: '1px solid rgba(37,99,235,0.25)' }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#60A5FA' }}>✦ AI</span>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px 24px' }}>

        {/* INPUT */}
        {step === 'input' && (
          <div>
            <div style={{ padding: '14px 16px', borderRadius: 16, background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.2)', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'linear-gradient(135deg, #2563EB, #60A5FA)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>✦</div>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#60A5FA', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>Beep AI</span>
              </div>
              <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 13, color: '#B0B0CC', lineHeight: 1.55 }}>
                Describe what you want to buy. I'll compare prices across Amazon, Flipkart, Nykaa, and 50+ stores.
              </p>
            </div>

            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Find me a good lipstick under ₹500"
              rows={2}
              style={{ width: '100%', padding: '14px', borderRadius: 14, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(37,99,235,0.3)', color: '#F4F4FF', fontSize: 14, fontFamily: "'Avenir Next', 'Avenir', sans-serif", outline: 'none', resize: 'none' as const, lineHeight: 1.5, marginBottom: 12, boxSizing: 'border-box' as const }}
            />

            {/* Retailer pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
              {retailers.map((r, i) => (
                <div key={i} style={{ padding: '4px 10px', borderRadius: 20, background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.2)', fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#60A5FA' }}>{r}</div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
              {['Find me a good lipstick under ₹500', 'Order me a moisturizer for dry skin', 'Best running shoes under ₹3000'].map((s, i) => (
                <button key={i} onClick={() => setQuery(s)} style={{ padding: '10px 14px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: '#8B8BAA', fontSize: 12, fontFamily: "'Avenir Next', 'Avenir', sans-serif", cursor: 'pointer', textAlign: 'left' as const, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span>🛍️</span> {s}
                </button>
              ))}
            </div>

            <button onClick={handleSearch} style={{ width: '100%', padding: '16px', borderRadius: 18, background: 'linear-gradient(135deg, #2563EB, #4F46E5)', border: 'none', color: '#fff', fontSize: 15, fontWeight: 600, fontFamily: "'Avenir Next', 'Avenir', sans-serif", cursor: 'pointer', boxShadow: '0 0 30px rgba(37,99,235,0.4)' }}>
              ✦ Find Best Deals
            </button>
          </div>
        )}

        {/* SEARCHING */}
        {step === 'searching' && (
          <div style={{ paddingTop: 32, textAlign: 'center' as const }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg, #2563EB, #60A5FA)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, margin: '0 auto 20px', boxShadow: '0 0 50px rgba(37,99,235,0.5)', animation: 'aiPulse 1.5s ease-in-out infinite' }}>🛍️</div>
            <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 20, fontWeight: 300, color: '#F4F4FF', marginBottom: 6 }}>Comparing prices…</p>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#60A5FA', letterSpacing: '0.08em', marginBottom: 24 }}>
              Checking {retailers[retailerIdx]}…
            </p>
            <div style={{ height: 4, borderRadius: 4, background: 'rgba(255,255,255,0.06)', overflow: 'hidden', marginBottom: 24 }}>
              <div style={{ height: '100%', borderRadius: 4, background: 'linear-gradient(to right, #2563EB, #60A5FA)', width: `${progress}%`, transition: 'width 0.1s linear' }} />
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 6 }}>
              {retailers.slice(0, 5).map((r, i) => (
                <div key={i} style={{ padding: '4px 10px', borderRadius: 20, background: retailerIdx === i ? 'rgba(37,99,235,0.2)' : 'rgba(255,255,255,0.04)', border: `1px solid ${retailerIdx === i ? 'rgba(37,99,235,0.5)' : 'rgba(255,255,255,0.06)'}`, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: retailerIdx === i ? '#60A5FA' : '#8B8BAA', transition: 'all 0.3s ease' }}>{r}</div>
              ))}
            </div>
          </div>
        )}

        {/* RESULTS */}
        {step === 'results' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, padding: '10px 14px', borderRadius: 12, background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.2)' }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg, #2563EB, #60A5FA)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>✦</div>
              <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 13, color: '#60A5FA', fontWeight: 500 }}>3 best matches found across 50+ stores</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {products.map((product, i) => (
                <button key={i} onClick={() => handleSelect(i)} style={{ padding: '14px', borderRadius: 16, background: i === 0 ? 'rgba(37,99,235,0.1)' : 'rgba(255,255,255,0.04)', border: `1px solid ${i === 0 ? 'rgba(37,99,235,0.4)' : 'rgba(255,255,255,0.08)'}`, cursor: 'pointer', textAlign: 'left' as const, width: '100%', transition: 'all 0.2s ease' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <div style={{ width: 56, height: 56, borderRadius: 14, background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(37,99,235,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0 }}>{product.img}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 4 }}>
                        <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 13, fontWeight: 600, color: '#F4F4FF', lineHeight: 1.3, flex: 1, marginRight: 8 }}>{product.name}</p>
                        {product.tag && <span style={{ fontSize: 9, padding: '2px 7px', borderRadius: 20, background: 'rgba(37,99,235,0.25)', color: '#60A5FA', fontFamily: "'JetBrains Mono', monospace", flexShrink: 0 }}>{product.tag}</span>}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <span style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 17, fontWeight: 700, color: '#A78BFA' }}>{product.price}</span>
                        <span style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 12, color: '#8B8BAA', textDecoration: 'line-through' }}>{product.mrp}</span>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#34d399', padding: '1px 6px', borderRadius: 10, background: 'rgba(34,197,94,0.1)' }}>{product.discount}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#8B8BAA' }}>{product.store}</span>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#f59e0b' }}>★{product.rating}</span>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#8B8BAA' }}>({product.reviews})</span>
                      </div>
                    </div>
                  </div>
                  {i === 0 && (
                    <div style={{ marginTop: 10, display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 10px', borderRadius: 8, background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(37,99,235,0.25)' }}>
                      <span style={{ fontSize: 10, color: '#60A5FA', fontFamily: "'JetBrains Mono', monospace" }}>✦ AI Recommended</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* SELECTED */}
        {step === 'selected' && (
          <div>
            <div style={{ padding: '16px', borderRadius: 16, background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.25)', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'rgba(37,99,235,0.2)', border: '1px solid rgba(37,99,235,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>✓</div>
                <span style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 14, fontWeight: 600, color: '#60A5FA' }}>Product selected</span>
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 14 }}>
                <div style={{ width: 60, height: 60, borderRadius: 16, background: 'rgba(37,99,235,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30 }}>{products[selectedIdx].img}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 14, fontWeight: 600, color: '#F4F4FF', marginBottom: 3, lineHeight: 1.3 }}>{products[selectedIdx].name}</p>
                  <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 12, color: '#8B8BAA' }}>{products[selectedIdx].brand} · {products[selectedIdx].store}</p>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {[['Price', products[selectedIdx].price], ['MRP', products[selectedIdx].mrp], ['Discount', products[selectedIdx].discount], ['Rating', `★${products[selectedIdx].rating} (${products[selectedIdx].reviews})`]].map(([k, v], i) => (
                  <div key={i} style={{ padding: '8px 10px', borderRadius: 10, background: 'rgba(255,255,255,0.04)' }}>
                    <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#8B8BAA', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 2 }}>{k}</p>
                    <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 13, color: k === 'Discount' ? '#34d399' : '#F4F4FF', fontWeight: 500 }}>{v}</p>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={handleCheckout} style={{ width: '100%', padding: '16px', borderRadius: 18, background: 'linear-gradient(135deg, #2563EB, #4F46E5)', border: 'none', color: '#fff', fontSize: 15, fontWeight: 600, fontFamily: "'Avenir Next', 'Avenir', sans-serif", cursor: 'pointer', boxShadow: '0 0 30px rgba(37,99,235,0.4)', marginBottom: 10 }}>
              Proceed to Checkout →
            </button>
            <button onClick={() => setStep('results')} style={{ width: '100%', padding: '13px', borderRadius: 16, background: 'transparent', border: '1px solid rgba(255,255,255,0.08)', color: '#8B8BAA', fontSize: 14, fontFamily: "'Avenir Next', 'Avenir', sans-serif", cursor: 'pointer' }}>
              View Other Options
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes aiPulse {
          0%, 100% { box-shadow: 0 0 50px rgba(37,99,235,0.5); }
          50% { box-shadow: 0 0 70px rgba(37,99,235,0.8); }
        }
      `}</style>
    </div>
  );
}
