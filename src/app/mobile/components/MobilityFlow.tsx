'use client';

import React, { useEffect, useState } from 'react';
import { CheckoutData } from './MobileApp';

interface Props {
  onBack: () => void;
  onCheckout: (data: CheckoutData) => void;
}

type FlowStep = 'input' | 'searching' | 'results' | 'selected';

const rideOptions = [
  { type: 'UberGo', provider: 'Uber', icon: '🚗', time: '3 min', price: '₹285', eta: '22 min', tag: 'Best Value', color: '#000', rating: '4.9' },
  { type: 'Ola Mini', provider: 'Ola', icon: '🚙', time: '5 min', price: '₹310', eta: '25 min', tag: null, color: '#22c55e', rating: '4.7' },
  { type: 'Rapido Bike', provider: 'Rapido', icon: '🏍️', time: '2 min', price: '₹95', eta: '18 min', tag: 'Fastest', color: '#f59e0b', rating: '4.6' },
  { type: 'Auto', provider: 'Namma', icon: '🛺', time: '4 min', price: '₹180', eta: '20 min', tag: null, color: '#f97316', rating: '4.5' },
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
    const fare = parseInt(ride.price.replace('₹', ''));
    onCheckout({
      title: 'Ride Booking',
      items: [
        { name: `${ride.type} · CP → Gurgaon`, price: ride.price },
        { name: 'Platform Fee', price: '₹5' },
      ],
      total: `₹${fare + 5}`,
      category: 'mobility',
    });
  };

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: '#080810' }}>
      <div style={{ position: 'absolute', width: 280, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(5,150,105,0.2) 0%, transparent 70%)', filter: 'blur(60px)', top: 0, left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none' }} aria-hidden="true" />

      <div style={{ height: 54 }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 20px 12px' }}>
        <button onClick={onBack} style={{ width: 38, height: 38, borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 18, color: '#B0B0CC' }}>←</button>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 18, fontWeight: 600, color: '#F4F4FF', letterSpacing: '-0.01em' }}>Mobility</h3>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#8B8BAA', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>Cabs · Auto · Bikes</p>
        </div>
      </div>

      {/* Map placeholder */}
      <div style={{ margin: '0 20px 14px', borderRadius: 18, overflow: 'hidden', height: 130, background: 'rgba(5,150,105,0.05)', border: '1px solid rgba(5,150,105,0.2)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Grid lines */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg, rgba(5,150,105,0.05) 0px, rgba(5,150,105,0.05) 1px, transparent 1px, transparent 28px), repeating-linear-gradient(90deg, rgba(5,150,105,0.05) 0px, rgba(5,150,105,0.05) 1px, transparent 1px, transparent 28px)' }} />
        {/* Route line */}
        <div style={{ position: 'absolute', width: '60%', height: 2, background: 'linear-gradient(to right, #059669, #34d399)', borderRadius: 2, opacity: 0.6 }} />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' as const }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'center' }}>
            <div style={{ textAlign: 'center' as const }}>
              <div style={{ fontSize: 24, marginBottom: 2 }}>📍</div>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#34d399', letterSpacing: '0.08em' }}>CP, Delhi</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <div style={{ width: 40, height: 1, background: 'rgba(5,150,105,0.5)' }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#8B8BAA' }}>32 km</span>
            </div>
            <div style={{ textAlign: 'center' as const }}>
              <div style={{ fontSize: 24, marginBottom: 2 }}>🏁</div>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#8B8BAA', letterSpacing: '0.08em' }}>Gurgaon</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px 24px' }}>

        {/* INPUT */}
        {step === 'input' && (
          <div>
            <div style={{ padding: '14px 16px', borderRadius: 16, background: 'rgba(5,150,105,0.08)', border: '1px solid rgba(5,150,105,0.2)', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'linear-gradient(135deg, #059669, #34d399)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>✦</div>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#34d399', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>Beep AI</span>
              </div>
              <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 13, color: '#B0B0CC', lineHeight: 1.55 }}>
                Tell me where you want to go. I'll compare Uber, Ola, Rapido, and Auto options instantly.
              </p>
            </div>

            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Book me a ride from Connaught Place to Gurgaon"
              rows={2}
              style={{ width: '100%', padding: '14px', borderRadius: 14, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(5,150,105,0.3)', color: '#F4F4FF', fontSize: 14, fontFamily: "'Avenir Next', 'Avenir', sans-serif", outline: 'none', resize: 'none' as const, lineHeight: 1.5, marginBottom: 12, boxSizing: 'border-box' as const }}
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
              {['Book me a ride from Connaught Place to Gurgaon', 'Cab from airport to Hauz Khas', 'Bike to Lajpat Nagar from Saket'].map((s, i) => (
                <button key={i} onClick={() => setQuery(s)} style={{ padding: '10px 14px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: '#8B8BAA', fontSize: 12, fontFamily: "'Avenir Next', 'Avenir', sans-serif", cursor: 'pointer', textAlign: 'left' as const, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span>🚗</span> {s}
                </button>
              ))}
            </div>

            <button onClick={handleSearch} style={{ width: '100%', padding: '16px', borderRadius: 18, background: 'linear-gradient(135deg, #059669, #34d399)', border: 'none', color: '#fff', fontSize: 15, fontWeight: 600, fontFamily: "'Avenir Next', 'Avenir', sans-serif", cursor: 'pointer', boxShadow: '0 0 30px rgba(5,150,105,0.4)' }}>
              ✦ Find Best Ride
            </button>
          </div>
        )}

        {/* SEARCHING */}
        {step === 'searching' && (
          <div style={{ paddingTop: 32, textAlign: 'center' as const }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg, #059669, #34d399)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, margin: '0 auto 20px', boxShadow: '0 0 50px rgba(5,150,105,0.5)', animation: 'aiPulse 1.5s ease-in-out infinite' }}>🚗</div>
            <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 20, fontWeight: 300, color: '#F4F4FF', marginBottom: 6 }}>Finding nearby rides…</p>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#34d399', letterSpacing: '0.08em', marginBottom: 24 }}>Comparing Uber, Ola, Rapido & Auto</p>
            <div style={{ height: 4, borderRadius: 4, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
              <div style={{ height: '100%', borderRadius: 4, background: 'linear-gradient(to right, #059669, #34d399)', width: `${progress}%`, transition: 'width 0.1s linear' }} />
            </div>
          </div>
        )}

        {/* RESULTS */}
        {step === 'results' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, padding: '10px 14px', borderRadius: 12, background: 'rgba(5,150,105,0.08)', border: '1px solid rgba(5,150,105,0.2)' }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg, #059669, #34d399)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>✦</div>
              <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 13, color: '#34d399', fontWeight: 500 }}>4 options found · Sorted by value</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {rideOptions.map((ride, i) => (
                <button key={i} onClick={() => handleSelect(i)} style={{ padding: '14px', borderRadius: 16, background: i === 0 ? 'rgba(5,150,105,0.1)' : 'rgba(255,255,255,0.04)', border: `1px solid ${i === 0 ? 'rgba(5,150,105,0.4)' : 'rgba(255,255,255,0.08)'}`, cursor: 'pointer', textAlign: 'left' as const, width: '100%', transition: 'all 0.2s ease' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(5,150,105,0.1)', border: '1px solid rgba(5,150,105,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>{ride.icon}</div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                          <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 15, fontWeight: 600, color: '#F4F4FF' }}>{ride.type}</p>
                          {ride.tag && <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 20, background: 'rgba(5,150,105,0.25)', color: '#34d399', fontFamily: "'JetBrains Mono', monospace" }}>{ride.tag}</span>}
                        </div>
                        <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 12, color: '#8B8BAA' }}>{ride.time} away · {ride.eta} ETA · ★{ride.rating}</p>
                      </div>
                    </div>
                    <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 20, fontWeight: 700, color: '#34d399', letterSpacing: '-0.02em' }}>{ride.price}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* SELECTED */}
        {step === 'selected' && (
          <div>
            <div style={{ padding: '16px', borderRadius: 16, background: 'rgba(5,150,105,0.08)', border: '1px solid rgba(5,150,105,0.25)', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'rgba(5,150,105,0.2)', border: '1px solid rgba(5,150,105,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>✓</div>
                <span style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 14, fontWeight: 600, color: '#34d399' }}>Ride selected</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <div style={{ width: 56, height: 56, borderRadius: 16, background: 'rgba(5,150,105,0.1)', border: '1px solid rgba(5,150,105,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>{rideOptions[selectedIdx].icon}</div>
                <div>
                  <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 18, fontWeight: 600, color: '#F4F4FF', marginBottom: 2 }}>{rideOptions[selectedIdx].type}</p>
                  <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 13, color: '#8B8BAA' }}>{rideOptions[selectedIdx].provider} · ★{rideOptions[selectedIdx].rating}</p>
                </div>
                <p style={{ marginLeft: 'auto', fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 22, fontWeight: 700, color: '#34d399' }}>{rideOptions[selectedIdx].price}</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {[['Pickup', 'Connaught Place'], ['Drop', 'Gurgaon'], ['ETA', rideOptions[selectedIdx].eta], ['Driver', 'Rajesh K. ★4.8']].map(([k, v], i) => (
                  <div key={i} style={{ padding: '8px 10px', borderRadius: 10, background: 'rgba(255,255,255,0.04)' }}>
                    <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#8B8BAA', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 2 }}>{k}</p>
                    <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 13, color: '#F4F4FF', fontWeight: 500 }}>{v}</p>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={handleCheckout} style={{ width: '100%', padding: '16px', borderRadius: 18, background: 'linear-gradient(135deg, #059669, #34d399)', border: 'none', color: '#fff', fontSize: 15, fontWeight: 600, fontFamily: "'Avenir Next', 'Avenir', sans-serif", cursor: 'pointer', boxShadow: '0 0 30px rgba(5,150,105,0.4)', marginBottom: 10 }}>
              Confirm & Pay →
            </button>
            <button onClick={() => setStep('results')} style={{ width: '100%', padding: '13px', borderRadius: 16, background: 'transparent', border: '1px solid rgba(255,255,255,0.08)', color: '#8B8BAA', fontSize: 14, fontFamily: "'Avenir Next', 'Avenir', sans-serif", cursor: 'pointer' }}>
              View Other Options
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes aiPulse {
          0%, 100% { box-shadow: 0 0 50px rgba(5,150,105,0.5); }
          50% { box-shadow: 0 0 70px rgba(5,150,105,0.8); }
        }
      `}</style>
    </div>
  );
}
