'use client';

import React, { useEffect, useState } from 'react';
import { CheckoutData } from './MobileApp';

interface Props {
  onBack: () => void;
  onCheckout: (data: CheckoutData) => void;
}

type TravelTab = 'flights' | 'hotels' | 'trains';
type FlowStep = 'input' | 'searching' | 'results' | 'selected';

const flightResults = [
  { airline: 'IndiGo 6E-204', time: '06:00 → 08:30', price: '₹3,899', tag: 'Best Value', seats: '14A' },
  { airline: 'Air India AI-506', time: '09:15 → 11:45', price: '₹4,299', tag: null, seats: '22C' },
  { airline: 'SpiceJet SG-152', time: '14:20 → 16:50', price: '₹4,749', tag: null, seats: '8F' },
];

const hotelResults = [
  { name: 'Taj MG Road', stars: '5★', price: '₹6,200/night', tag: 'Top Pick', location: 'MG Road, Bangalore' },
  { name: 'Lemon Tree Premier', stars: '4★', price: '₹3,800/night', tag: null, location: 'Ulsoor, Bangalore' },
  { name: 'Ibis Bangalore', stars: '3★', price: '₹2,100/night', tag: 'Budget', location: 'Hosur Road, Bangalore' },
];

const trainResults = [
  { name: 'Rajdhani Express', number: '12431', time: '20:00 → 06:30', price: '₹1,850', class: '2A', tag: 'Fastest' },
  { name: 'Karnataka Express', number: '12627', time: '22:30 → 12:45', price: '₹1,200', class: '3A', tag: null },
  { name: 'Sampark Kranti', number: '12649', time: '07:15 → 21:00', price: '₹980', class: 'SL', tag: 'Budget' },
];

export default function TravelFlow({ onBack, onCheckout }: Props) {
  const [tab, setTab] = useState<TravelTab>('flights');
  const [step, setStep] = useState<FlowStep>('input');
  const [query, setQuery] = useState('');
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  const defaultQueries: Record<TravelTab, string> = {
    flights: 'Book a flight from Delhi to Bangalore tomorrow under ₹5000',
    hotels: 'Find a hotel in Bangalore for 2 nights under ₹5000',
    trains: 'Book a train from Delhi to Bangalore this Friday',
  };

  const handleSearch = () => {
    if (!query.trim()) setQuery(defaultQueries[tab]);
    setStep('searching');
    setProgress(0);
  };

  useEffect(() => {
    if (step !== 'searching') return;
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(interval); setStep('results'); return 100; }
        return p + 8;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [step]);

  const handleSelect = (idx: number) => {
    setSelectedIdx(idx);
    setStep('selected');
  };

  const handleCheckout = () => {
    if (tab === 'flights') {
      const f = flightResults[selectedIdx];
      onCheckout({ title: 'Flight Booking', items: [{ name: `${f.airline} · ${f.time}`, price: f.price }, { name: 'Seat Selection', price: '₹0' }, { name: 'Convenience Fee', price: '₹99' }], total: '₹3,998', category: 'travel' });
    } else if (tab === 'hotels') {
      const h = hotelResults[selectedIdx];
      onCheckout({ title: 'Hotel Booking', items: [{ name: `${h.name} · 2 nights`, price: h.price }, { name: 'Taxes & Fees', price: '₹620' }], total: '₹7,420', category: 'travel' });
    } else {
      const t = trainResults[selectedIdx];
      onCheckout({ title: 'Train Booking', items: [{ name: `${t.name} · ${t.class}`, price: t.price }, { name: 'Convenience Fee', price: '₹40' }], total: '₹1,890', category: 'travel' });
    }
  };

  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: '#080810' }}>
      {/* Glow */}
      <div className="absolute pointer-events-none" style={{ width: 250, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)', filter: 'blur(60px)', top: 0, left: '50%', transform: 'translateX(-50%)' }} aria-hidden="true" />

      <div style={{ height: 44 }} />

      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-4">
        <button onClick={onBack} style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 16, color: '#B0B0CC' }}>←</button>
        <div>
          <h3 style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 18, fontWeight: 600, color: '#F4F4FF', letterSpacing: '-0.01em' }}>Travel</h3>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#8B8BAA', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>AI-powered booking</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 px-5 mb-4">
        {(['flights', 'hotels', 'trains'] as TravelTab[]).map((t) => (
          <button
            key={t}
            onClick={() => { setTab(t); setStep('input'); setQuery(''); }}
            style={{
              padding: '7px 14px',
              borderRadius: 20,
              background: tab === t ? 'linear-gradient(135deg, #7C3AED, #4F46E5)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${tab === t ? 'transparent' : 'rgba(255,255,255,0.08)'}`,
              color: tab === t ? '#fff' : '#8B8BAA',
              fontSize: 12,
              fontFamily: "'Avenir Next', 'Avenir', sans-serif",
              fontWeight: 500,
              cursor: 'pointer',
              textTransform: 'capitalize' as const,
            }}
          >
            {t === 'flights' ? '✈️' : t === 'hotels' ? '🏨' : '🚂'} {t}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 pb-6">
        {step === 'input' && (
          <div>
            {/* AI chat bubble */}
            <div style={{ padding: '14px 16px', borderRadius: 16, background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)', marginBottom: 16 }}>
              <div className="flex items-center gap-2 mb-2">
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg, #7C3AED, #60A5FA)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>✦</div>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#A78BFA', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>Beep AI</span>
              </div>
              <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 13, color: '#B0B0CC', lineHeight: 1.5 }}>
                {tab === 'flights' ? 'Tell me your travel details — origin, destination, date, and budget. I\'ll find the best options.' : tab === 'hotels' ? 'Where are you staying? Tell me the city, dates, and budget.' : 'Where do you want to travel? I\'ll find the best train options.'}
              </p>
            </div>

            {/* Input */}
            <div style={{ marginBottom: 12 }}>
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={defaultQueries[tab]}
                rows={3}
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: 14,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(124,58,237,0.3)',
                  color: '#F4F4FF',
                  fontSize: 14,
                  fontFamily: "'Avenir Next', 'Avenir', sans-serif",
                  outline: 'none',
                  resize: 'none' as const,
                  lineHeight: 1.5,
                }}
              />
            </div>

            {/* Quick suggestions */}
            <div className="flex flex-col gap-2 mb-6">
              {[defaultQueries[tab], tab === 'flights' ? 'Book round trip to Mumbai this weekend under ₹8,000' : tab === 'hotels' ? 'Find 5-star hotel in Goa for honeymoon' : 'Book sleeper class to Chennai tomorrow'].map((s, i) => (
                <button key={i} onClick={() => setQuery(s)} style={{ padding: '10px 14px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: '#8B8BAA', fontSize: 12, fontFamily: "'Avenir Next', 'Avenir', sans-serif", cursor: 'pointer', textAlign: 'left' as const }}>
                  💬 {s}
                </button>
              ))}
            </div>

            <button onClick={handleSearch} style={{ width: '100%', padding: '15px', borderRadius: 16, background: 'linear-gradient(135deg, #7C3AED, #4F46E5)', border: 'none', color: '#fff', fontSize: 15, fontWeight: 600, fontFamily: "'Avenir Next', 'Avenir', sans-serif", cursor: 'pointer', boxShadow: '0 0 30px rgba(124,58,237,0.4)' }}>
              ✦ Let Beep Search
            </button>
          </div>
        )}

        {step === 'searching' && (
          <div style={{ paddingTop: 40, textAlign: 'center' as const }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg, #7C3AED, #60A5FA)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, margin: '0 auto 20px', boxShadow: '0 0 40px rgba(124,58,237,0.4)' }}>✦</div>
            <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 18, fontWeight: 300, color: '#F4F4FF', marginBottom: 8 }}>Beep is searching…</p>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#8B8BAA', letterSpacing: '0.1em', marginBottom: 24 }}>
              {tab === 'flights' ? 'Scanning 14 airlines & 47 routes' : tab === 'hotels' ? 'Checking 200+ properties' : 'Checking availability across routes'}
            </p>
            <div style={{ height: 4, borderRadius: 4, background: 'rgba(255,255,255,0.06)', overflow: 'hidden', marginBottom: 24 }}>
              <div style={{ height: '100%', borderRadius: 4, background: 'linear-gradient(to right, #7C3AED, #60A5FA)', width: `${progress}%`, transition: 'width 0.1s linear' }} />
            </div>
            {['Comparing prices…', 'Checking availability…', 'Applying filters…'].map((msg, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: progress > (i + 1) * 30 ? '#34d399' : 'rgba(255,255,255,0.2)' }} />
                <span style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 13, color: progress > (i + 1) * 30 ? '#B0B0CC' : '#8B8BAA' }}>{msg}</span>
              </div>
            ))}
          </div>
        )}

        {step === 'results' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg, #7C3AED, #60A5FA)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>✦</div>
              <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 13, color: '#A78BFA', fontWeight: 500 }}>Found {tab === 'flights' ? '3 flights' : tab === 'hotels' ? '3 hotels' : '3 trains'} matching your intent</p>
            </div>

            <div className="flex flex-col gap-3">
              {(tab === 'flights' ? flightResults : tab === 'hotels' ? hotelResults : trainResults).map((item: any, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  style={{
                    padding: '14px',
                    borderRadius: 16,
                    background: i === 0 ? 'rgba(124,58,237,0.1)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${i === 0 ? 'rgba(124,58,237,0.35)' : 'rgba(255,255,255,0.08)'}`,
                    cursor: 'pointer',
                    textAlign: 'left' as const,
                    width: '100%',
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 14, fontWeight: 600, color: '#F4F4FF', marginBottom: 2 }}>
                        {tab === 'flights' ? (item as typeof flightResults[0]).airline : tab === 'hotels' ? (item as typeof hotelResults[0]).name : (item as typeof trainResults[0]).name}
                      </p>
                      <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 12, color: '#8B8BAA' }}>
                        {tab === 'flights' ? (item as typeof flightResults[0]).time : tab === 'hotels' ? (item as typeof hotelResults[0]).location : `${(item as typeof trainResults[0]).number} · ${(item as typeof trainResults[0]).time}`}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' as const }}>
                      <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 16, fontWeight: 600, color: '#A78BFA' }}>
                        {tab === 'flights' ? (item as typeof flightResults[0]).price : tab === 'hotels' ? (item as typeof hotelResults[0]).price : (item as typeof trainResults[0]).price}
                      </p>
                      {item.tag && (
                        <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 20, background: 'rgba(124,58,237,0.3)', color: '#C4B5FD', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.05em' }}>
                          {item.tag}
                        </span>
                      )}
                    </div>
                  </div>
                  {i === 0 && (
                    <div style={{ padding: '6px 10px', borderRadius: 8, background: 'rgba(124,58,237,0.15)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 10, color: '#A78BFA', fontFamily: "'JetBrains Mono', monospace" }}>✦ AI Recommended</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'selected' && (
          <div>
            <div style={{ padding: '16px', borderRadius: 16, background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)', marginBottom: 16 }}>
              <div className="flex items-center gap-2 mb-3">
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(16,185,129,0.2)', border: '1px solid rgba(16,185,129,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>✓</div>
                <span style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 14, fontWeight: 600, color: '#34d399' }}>Beep selected the best option</span>
              </div>
              {tab === 'flights' && (
                <div className="grid grid-cols-2 gap-2">
                  {[['Flight', flightResults[selectedIdx].airline], ['Route', 'DEL → BLR'], ['Time', flightResults[selectedIdx].time], ['Seat', flightResults[selectedIdx].seats], ['Amount', flightResults[selectedIdx].price], ['PNR', 'AI2026XK']].map(([k, v], i) => (
                    <div key={i} style={{ padding: '8px 10px', borderRadius: 10, background: 'rgba(255,255,255,0.04)' }}>
                      <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#8B8BAA', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 2 }}>{k}</p>
                      <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 13, color: '#F4F4FF', fontWeight: 500 }}>{v}</p>
                    </div>
                  ))}
                </div>
              )}
              {tab === 'hotels' && (
                <div className="grid grid-cols-2 gap-2">
                  {[['Hotel', hotelResults[selectedIdx].name], ['Rating', hotelResults[selectedIdx].stars], ['Location', hotelResults[selectedIdx].location], ['Duration', '2 nights'], ['Per Night', hotelResults[selectedIdx].price], ['Check-in', '28 Mar']].map(([k, v], i) => (
                    <div key={i} style={{ padding: '8px 10px', borderRadius: 10, background: 'rgba(255,255,255,0.04)' }}>
                      <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#8B8BAA', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 2 }}>{k}</p>
                      <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 13, color: '#F4F4FF', fontWeight: 500 }}>{v}</p>
                    </div>
                  ))}
                </div>
              )}
              {tab === 'trains' && (
                <div className="grid grid-cols-2 gap-2">
                  {[['Train', trainResults[selectedIdx].name], ['Number', trainResults[selectedIdx].number], ['Time', trainResults[selectedIdx].time], ['Class', trainResults[selectedIdx].class], ['Amount', trainResults[selectedIdx].price], ['PNR', 'TR2026YZ']].map(([k, v], i) => (
                    <div key={i} style={{ padding: '8px 10px', borderRadius: 10, background: 'rgba(255,255,255,0.04)' }}>
                      <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#8B8BAA', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 2 }}>{k}</p>
                      <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 13, color: '#F4F4FF', fontWeight: 500 }}>{v}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button onClick={handleCheckout} style={{ width: '100%', padding: '15px', borderRadius: 16, background: 'linear-gradient(135deg, #7C3AED, #4F46E5)', border: 'none', color: '#fff', fontSize: 15, fontWeight: 600, fontFamily: "'Avenir Next', 'Avenir', sans-serif", cursor: 'pointer', boxShadow: '0 0 30px rgba(124,58,237,0.4)', marginBottom: 10 }}>
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
