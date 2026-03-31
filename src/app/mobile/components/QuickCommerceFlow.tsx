'use client';

import React, { useEffect, useState } from 'react';
import { CheckoutData } from './MobileApp';

interface Props {
  onBack: () => void;
  onCheckout: (data: CheckoutData) => void;
}

type FlowStep = 'input' | 'searching' | 'results' | 'cart';

const groceryItems = [
  { name: 'Vaseline Petroleum Jelly 250ml', price: '₹189', store: 'Blinkit', time: '10 min', category: 'Skincare', qty: 1 },
  { name: 'Himalaya Lip Balm (Pack of 2)', price: '₹98', store: 'Blinkit', time: '10 min', category: 'Skincare', qty: 1 },
  { name: 'Amul Butter 500g', price: '₹275', store: 'Zepto', time: '8 min', category: 'Dairy', qty: 1 },
  { name: 'Tata Salt 1kg', price: '₹24', store: 'Zepto', time: '8 min', category: 'Staples', qty: 2 },
];

export default function QuickCommerceFlow({ onBack, onCheckout }: Props) {
  const [step, setStep] = useState<FlowStep>('input');
  const [query, setQuery] = useState('');
  const [progress, setProgress] = useState(0);
  const [cart, setCart] = useState<typeof groceryItems>([]);

  const handleSearch = () => {
    setStep('searching');
    setProgress(0);
  };

  useEffect(() => {
    if (step !== 'searching') return;
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(interval); setStep('results'); setCart(groceryItems); return 100; }
        return p + 10;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [step]);

  const handleCheckout = () => {
    onCheckout({
      title: 'Quick Commerce Order',
      items: cart.map((i) => ({ name: i.name, price: i.price })),
      total: '₹586',
      category: 'quick-commerce',
    });
  };

  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: '#080810' }}>
      <div className="absolute pointer-events-none" style={{ width: 250, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,70,229,0.2) 0%, transparent 70%)', filter: 'blur(60px)', top: 0, left: '50%', transform: 'translateX(-50%)' }} aria-hidden="true" />

      <div style={{ height: 44 }} />

      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-4">
        <button onClick={onBack} style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 16, color: '#B0B0CC' }}>←</button>
        <div>
          <h3 style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 18, fontWeight: 600, color: '#F4F4FF', letterSpacing: '-0.01em' }}>Quick Commerce</h3>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#8B8BAA', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>Instant delivery · 10 min</p>
        </div>
        <div style={{ marginLeft: 'auto', padding: '4px 10px', borderRadius: 20, background: 'rgba(5,150,105,0.15)', border: '1px solid rgba(5,150,105,0.3)' }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#34d399' }}>⚡ 10 min</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-6">
        {step === 'input' && (
          <div>
            <div style={{ padding: '14px 16px', borderRadius: 16, background: 'rgba(79,70,229,0.08)', border: '1px solid rgba(79,70,229,0.2)', marginBottom: 16 }}>
              <div className="flex items-center gap-2 mb-2">
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg, #4F46E5, #60A5FA)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>✦</div>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#A78BFA', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>Beep AI</span>
              </div>
              <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 13, color: '#B0B0CC', lineHeight: 1.5 }}>
                Tell me what you need delivered. I'll find the fastest option from Blinkit, Zepto, or Swiggy Instamart.
              </p>
            </div>

            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Order me lip balm and Vaseline'
              rows={3}
              style={{ width: '100%', padding: '14px', borderRadius: 14, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(79,70,229,0.3)', color: '#F4F4FF', fontSize: 14, fontFamily: "'Avenir Next', 'Avenir', sans-serif", outline: 'none', resize: 'none' as const, lineHeight: 1.5, marginBottom: 12 }}
            />

            <div className="flex flex-col gap-2 mb-6">
              {[
                'Order me lip balm and Vaseline',
                'Get me 2 litres of milk and bread',
                'Order Amul butter and Tata salt',
              ].map((s, i) => (
                <button key={i} onClick={() => setQuery(s)} style={{ padding: '10px 14px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: '#8B8BAA', fontSize: 12, fontFamily: "'Avenir Next', 'Avenir', sans-serif", cursor: 'pointer', textAlign: 'left' as const }}>
                  🛒 {s}
                </button>
              ))}
            </div>

            <button onClick={handleSearch} style={{ width: '100%', padding: '15px', borderRadius: 16, background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', border: 'none', color: '#fff', fontSize: 15, fontWeight: 600, fontFamily: "'Avenir Next', 'Avenir', sans-serif", cursor: 'pointer', boxShadow: '0 0 30px rgba(79,70,229,0.4)' }}>
              ✦ Find & Order
            </button>
          </div>
        )}

        {step === 'searching' && (
          <div style={{ paddingTop: 40, textAlign: 'center' as const }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg, #4F46E5, #60A5FA)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, margin: '0 auto 20px', boxShadow: '0 0 40px rgba(79,70,229,0.4)' }}>🛒</div>
            <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 18, fontWeight: 300, color: '#F4F4FF', marginBottom: 8 }}>Finding best prices…</p>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#8B8BAA', letterSpacing: '0.1em', marginBottom: 24 }}>Checking Blinkit, Zepto & Instamart</p>
            <div style={{ height: 4, borderRadius: 4, background: 'rgba(255,255,255,0.06)', overflow: 'hidden', marginBottom: 24 }}>
              <div style={{ height: '100%', borderRadius: 4, background: 'linear-gradient(to right, #4F46E5, #60A5FA)', width: `${progress}%`, transition: 'width 0.1s linear' }} />
            </div>
          </div>
        )}

        {(step === 'results' || step === 'cart') && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg, #4F46E5, #60A5FA)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>✦</div>
              <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 13, color: '#A78BFA', fontWeight: 500 }}>Found {cart.length} items · Ready to order</p>
            </div>

            <div className="flex flex-col gap-3 mb-6">
              {cart.map((item, i) => (
                <div key={i} style={{ padding: '12px 14px', borderRadius: 14, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(79,70,229,0.15)', border: '1px solid rgba(79,70,229,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>
                    {item.category === 'Skincare' ? '🧴' : item.category === 'Dairy' ? '🥛' : '🧂'}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 13, color: '#F4F4FF', marginBottom: 2 }}>{item.name}</p>
                    <div className="flex items-center gap-2">
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#8B8BAA' }}>{item.store}</span>
                      <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#8B8BAA', display: 'inline-block' }} />
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#34d399' }}>⚡ {item.time}</span>
                    </div>
                  </div>
                  <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 15, fontWeight: 600, color: '#A78BFA' }}>{item.price}</p>
                </div>
              ))}
            </div>

            {/* Order summary */}
            <div style={{ padding: '14px', borderRadius: 14, background: 'rgba(79,70,229,0.08)', border: '1px solid rgba(79,70,229,0.2)', marginBottom: 16 }}>
              <div className="flex justify-between mb-2">
                <span style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 13, color: '#8B8BAA' }}>Subtotal</span>
                <span style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 13, color: '#F4F4FF' }}>₹586</span>
              </div>
              <div className="flex justify-between mb-2">
                <span style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 13, color: '#8B8BAA' }}>Delivery</span>
                <span style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 13, color: '#34d399' }}>Free</span>
              </div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 10, marginTop: 4, display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 15, fontWeight: 600, color: '#F4F4FF' }}>Total</span>
                <span style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 15, fontWeight: 600, color: '#A78BFA' }}>₹586</span>
              </div>
            </div>

            <button onClick={handleCheckout} style={{ width: '100%', padding: '15px', borderRadius: 16, background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', border: 'none', color: '#fff', fontSize: 15, fontWeight: 600, fontFamily: "'Avenir Next', 'Avenir', sans-serif", cursor: 'pointer', boxShadow: '0 0 30px rgba(79,70,229,0.4)' }}>
              Proceed to Checkout →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
