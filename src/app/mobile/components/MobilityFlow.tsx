'use client';

import React, { useEffect, useState } from 'react';
import { CheckoutData } from './MobileApp';

interface Props {
  onBack: () => void;
  onCheckout: (data: CheckoutData) => void;
}

type FlowStep = 'input' | 'searching' | 'results' | 'selected';

const rideOptions = [
  { type: 'UberGo', icon: '🚗', time: '3 min', price: '₹285', eta: '22 min', tag: 'Best Value' },
  { type: 'Ola Mini', icon: '🚙', time: '5 min', price: '₹310', eta: '25 min', tag: null },
  { type: 'Rapido Bike', icon: '🏍️', time: '2 min', price: '₹95', eta: '18 min', tag: 'Fastest' },
  { type: 'Auto', icon: '🛺', time: '4 min', price: '₹180', eta: '20 min', tag: null },
];

export default function MobilityFlow({ onBack, onCheckout }: Props) {
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
        return p + 12;
      });
    }, 70);
    return () => clearInterval(interval);
  }, [step]);

  const handleSelect = (idx: number) => {
    setSelectedIdx(idx);
    setStep('selected');
  };

  const handleCheckout = () => {
    const ride = rideOptions[selectedIdx];
    onCheckout({
      title: 'Ride Booking',
      items: [
        { name: `${ride.type} · CP → Gurgaon`, price: ride.price },
        { name: 'Platform Fee', price: '₹5' },
      ],
      total: `₹${parseInt(ride.price.replace('₹', '')) + 5}`,
      category: 'mobility',
    });
  };

  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: '#080810' }}>
      <div className="absolute pointer-events-none" style={{ width: 250, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(5,150,105,0.2) 0%, transparent 70%)', filter: 'blur(60px)', top: 0, left: '50%', transform: 'translateX(-50%)' }} aria-hidden="true" />

      <div style={{ height: 44 }} />

      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-4">
        <button onClick={onBack} style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 16, color: '#B0B0CC' }}>←</button>
        <div>
          <h3 style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 18, fontWeight: 600, color: '#F4F4FF', letterSpacing: '-0.01em' }}>Mobility</h3>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#8B8BAA', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>Cabs · Auto · Bikes</p>
        </div>
      </div>

      {/* Map placeholder */}
      <div style={{ margin: '0 20px 16px', borderRadius: 16, overflow: 'hidden', height: 140, background: 'rgba(5,150,105,0.06)', border: '1px solid rgba(5,150,105,0.2)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(0deg, rgba(5,150,105,0.04) 0px, rgba(5,150,105,0.04) 1px, transparent 1px, transparent 32px), repeating-linear-gradient(90deg, rgba(5,150,105,0.04) 0px, rgba(5,150,105,0.04) 1px, transparent 1px, transparent 32px)' }} />
        <div style={{ textAlign: 'center' as const, position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 32, marginBottom: 4 }}>📍</div>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#34d399', letterSpacing: '0.1em' }}>Connaught Place, Delhi</p>
          <div style={{ width: 1, height: 20, background: 'rgba(5,150,105,0.4)', margin: '4px auto' }} />
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#8B8BAA', letterSpacing: '0.1em' }}>→ Gurgaon</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-6">
        {step === 'input' && (
          <div>
            <div style={{ padding: '14px 16px', borderRadius: 16, background: 'rgba(5,150,105,0.08)', border: '1px solid rgba(5,150,105,0.2)', marginBottom: 16 }}>
              <div className="flex items-center gap-2 mb-2">
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg, #059669, #34d399)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>✦</div>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#34d399', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>Beep AI</span>
              </div>
              <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 13, color: '#B0B0CC', lineHeight: 1.5 }}>
                Tell me where you want to go. I'll compare Uber, Ola, Rapido, and Auto options instantly.
              </p>
            </div>

            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Book me a ride from Connaught Place to Gurgaon'
              rows={2}
              style={{ width: '100%', padding: '14px', borderRadius: 14, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(5,150,105,0.3)', color: '#F4F4FF', fontSize: 14, fontFamily: "'Avenir Next', 'Avenir', sans-serif", outline: 'none', resize: 'none' as const, lineHeight: 1.5, marginBottom: 12 }}
            />

            <div className="flex flex-col gap-2 mb-6">
              {['Book me a ride from Connaught Place to Gurgaon', 'Cab from airport to Hauz Khas', 'Bike to Lajpat Nagar from Saket'].map((s, i) => (
                <button key={i} onClick={() => setQuery(s)} style={{ padding: '10px 14px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: '#8B8BAA', fontSize: 12, fontFamily: "'Avenir Next', 'Avenir', sans-serif", cursor: 'pointer', textAlign: 'left' as const }}>
                  🚗 {s}
                </button>
              ))}
            </div>

            <button onClick={handleSearch} style={{ width: '100%', padding: '15px', borderRadius: 16, background: 'linear-gradient(135deg, #059669, #34d399)', border: 'none', color: '#fff', fontSize: 15, fontWeight: 600, fontFamily: "'Avenir Next', 'Avenir', sans-serif", cursor: 'pointer', boxShadow: '0 0 30px rgba(5,150,105,0.4)' }}>
              ✦ Find Best Ride
            </button>
          </div>
        )}

        {step === 'searching' && (
          <div style={{ paddingTop: 20, textAlign: 'center' as const }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg, #059669, #34d399)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, margin: '0 auto 20px', boxShadow: '0 0 40px rgba(5,150,105,0.4)' }}>🚗</div>
            <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 18, fontWeight: 300, color: '#F4F4FF', marginBottom: 8 }}>Finding nearby rides…</p>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#8B8BAA', letterSpacing: '0.1em', marginBottom: 24 }}>Comparing Uber, Ola, Rapido & Auto</p>
            <div style={{ height: 4, borderRadius: 4, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
              <div style={{ height: '100%', borderRadius: 4, background: 'linear-gradient(to right, #059669, #34d399)', width: `${progress}%`, transition: 'width 0.1s linear' }} />
            </div>
          </div>
        )}

        {step === 'results' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg, #059669, #34d399)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>✦</div>
              <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 13, color: '#34d399', fontWeight: 500 }}>4 options found · Sorted by value</p>
            </div>

            <div className="flex flex-col gap-3">
              {rideOptions.map((ride, i) => (
                <button key={i} onClick={() => handleSelect(i)} style={{ padding: '14px', borderRadius: 16, background: i === 0 ? 'rgba(5,150,105,0.1)' : 'rgba(255,255,255,0.04)', border: `1px solid ${i === 0 ? 'rgba(5,150,105,0.35)' : 'rgba(255,255,255,0.08)'}`, cursor: 'pointer', textAlign: 'left' as const, width: '100%' }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span style={{ fontSize: 28 }}>{ride.icon}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 15, fontWeight: 600, color: '#F4F4FF' }}>{ride.type}</p>
                          {ride.tag && <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 20, background: 'rgba(5,150,105,0.3)', color: '#34d399', fontFamily: "'JetBrains Mono', monospace" }}>{ride.tag}</span>}
                        </div>
                        <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 12, color: '#8B8BAA' }}>{ride.time} away · {ride.eta} ETA</p>
                      </div>
                    </div>
                    <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 18, fontWeight: 600, color: '#34d399' }}>{ride.price}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'selected' && (
          <div>
            <div style={{ padding: '16px', borderRadius: 16, background: 'rgba(5,150,105,0.08)', border: '1px solid rgba(5,150,105,0.25)', marginBottom: 16 }}>
              <div className="flex items-center gap-2 mb-3">
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(5,150,105,0.2)', border: '1px solid rgba(5,150,105,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>✓</div>
                <span style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 14, fontWeight: 600, color: '#34d399' }}>Ride selected</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[['Type', rideOptions[selectedIdx].type], ['Pickup', 'Connaught Place'], ['Drop', 'Gurgaon'], ['ETA', rideOptions[selectedIdx].eta], ['Fare', rideOptions[selectedIdx].price], ['Driver', 'Rajesh K. ★4.8']].map(([k, v], i) => (
                  <div key={i} style={{ padding: '8px 10px', borderRadius: 10, background: 'rgba(255,255,255,0.04)' }}>
                    <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#8B8BAA', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 2 }}>{k}</p>
                    <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 13, color: '#F4F4FF', fontWeight: 500 }}>{v}</p>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={handleCheckout} style={{ width: '100%', padding: '15px', borderRadius: 16, background: 'linear-gradient(135deg, #059669, #34d399)', border: 'none', color: '#fff', fontSize: 15, fontWeight: 600, fontFamily: "'Avenir Next', 'Avenir', sans-serif", cursor: 'pointer', boxShadow: '0 0 30px rgba(5,150,105,0.4)', marginBottom: 10 }}>
              Confirm & Pay →
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
