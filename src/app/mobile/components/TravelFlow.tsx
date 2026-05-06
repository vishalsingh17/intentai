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
  { airline: 'IndiGo 6E-204', time: '06:00 → 08:30', duration: '2h 30m', price: '₹3,899', tag: 'Best Value', seats: '14A', stops: 'Non-stop' },
  { airline: 'Air India AI-506', time: '09:15 → 11:45', duration: '2h 30m', price: '₹4,299', tag: null, seats: '22C', stops: 'Non-stop' },
  { airline: 'SpiceJet SG-152', time: '14:20 → 16:50', duration: '2h 30m', price: '₹4,749', tag: null, seats: '8F', stops: 'Non-stop' },
];

const hotelResults = [
  { name: 'Taj MG Road', stars: '5★', price: '₹6,200/night', tag: 'Top Pick', location: 'MG Road, Bangalore', rating: '4.8' },
  { name: 'Lemon Tree Premier', stars: '4★', price: '₹3,800/night', tag: null, location: 'Ulsoor, Bangalore', rating: '4.4' },
  { name: 'Ibis Bangalore', stars: '3★', price: '₹2,100/night', tag: 'Budget', location: 'Hosur Road, Bangalore', rating: '4.1' },
];

const trainResults = [
  { name: 'Rajdhani Express', number: '12431', time: '20:00 → 06:30', price: '₹1,850', class: '2A', tag: 'Fastest', duration: '10h 30m' },
  { name: 'Karnataka Express', number: '12627', time: '22:30 → 12:45', price: '₹1,200', class: '3A', tag: null, duration: '14h 15m' },
  { name: 'Sampark Kranti', number: '12649', time: '07:15 → 21:00', price: '₹980', class: 'SL', tag: 'Budget', duration: '13h 45m' },
];

const defaultQueries: Record<TravelTab, string> = {
  flights: 'Book a flight from Delhi to Bangalore tomorrow under ₹5000',
  hotels: 'Find a hotel in Bangalore for 2 nights under ₹5000',
  trains: 'Book a train from Delhi to Bangalore this Friday',
};

export default function TravelFlow({ onBack, onCheckout }: Props) {
  const [tab, setTab] = useState<TravelTab>('flights');
  const [step, setStep] = useState<FlowStep>('input');
  const [query, setQuery] = useState('');
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [searchMsg, setSearchMsg] = useState('');

  const searchMessages: Record<TravelTab, string[]> = {
    flights: ['Scanning 14 airlines…', 'Comparing 47 routes…', 'Applying budget filter…'],
    hotels: ['Checking 200+ properties…', 'Comparing amenities…', 'Verifying availability…'],
    trains: ['Checking IRCTC availability…', 'Comparing classes…', 'Finding best seats…'],
  };

  const handleSearch = () => {
    if (!query.trim()) setQuery(defaultQueries[tab]);
    setStep('searching');
    setProgress(0);
    setSearchMsg(searchMessages[tab][0]);
  };

  useEffect(() => {
    if (step !== 'searching') return;
    let msgIdx = 0;
    const msgInterval = setInterval(() => {
      msgIdx = (msgIdx + 1) % searchMessages[tab].length;
      setSearchMsg(searchMessages[tab][msgIdx]);
    }, 700);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(interval); clearInterval(msgInterval); setStep('results'); return 100; }
        return p + 6;
      });
    }, 80);
    return () => { clearInterval(interval); clearInterval(msgInterval); };
  }, [step, tab]);

  const handleSelect = (idx: number) => {
    setSelectedIdx(idx);
    setStep('selected');
  };

  const handleCheckout = () => {
    if (tab === 'flights') {
      const f = flightResults[selectedIdx];
      onCheckout({ title: 'Flight Booking', items: [{ name: `${f.airline} · ${f.time}`, price: f.price }, { name: 'Seat Selection (14A)', price: '₹0' }, { name: 'Convenience Fee', price: '₹99' }], total: '₹3,998', category: 'travel' });
    } else if (tab === 'hotels') {
      const h = hotelResults[selectedIdx];
      onCheckout({ title: 'Hotel Booking', items: [{ name: `${h.name} · 2 nights`, price: h.price }, { name: 'Taxes & Fees', price: '₹620' }], total: '₹7,420', category: 'travel' });
    } else {
      const t = trainResults[selectedIdx];
      onCheckout({ title: 'Train Booking', items: [{ name: `${t.name} · ${t.class}`, price: t.price }, { name: 'Convenience Fee', price: '₹40' }], total: '₹1,890', category: 'travel' });
    }
  };

  const results = tab === 'flights' ? flightResults : tab === 'hotels' ? hotelResults : trainResults;

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: '#080810' }}>
      <div style={{ position: 'absolute', width: 280, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)', filter: 'blur(60px)', top: 0, left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none' }} aria-hidden="true" />

      <div style={{ height: 54 }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 20px 12px' }}>
        <button onClick={onBack} style={{ width: 38, height: 38, borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 18, color: '#B0B0CC' }}>←</button>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 18, fontWeight: 600, color: '#F4F4FF', letterSpacing: '-0.01em' }}>Travel</h3>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#8B8BAA', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>AI-powered booking</p>
        </div>
        <div style={{ padding: '4px 10px', borderRadius: 20, background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.25)' }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#A78BFA' }}>✦ AI</span>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, padding: '0 20px 14px' }}>
        {(['flights', 'hotels', 'trains'] as TravelTab[]).map((t) => (
          <button
            key={t}
            onClick={() => { setTab(t); setStep('input'); setQuery(''); }}
            style={{
              padding: '8px 14px',
              borderRadius: 20,
              background: tab === t ? 'linear-gradient(135deg, #7C3AED, #4F46E5)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${tab === t ? 'transparent' : 'rgba(255,255,255,0.08)'}`,
              color: tab === t ? '#fff' : '#8B8BAA',
              fontSize: 12,
              fontFamily: "'Avenir Next', 'Avenir', sans-serif",
              fontWeight: 500,
              cursor: 'pointer',
              boxShadow: tab === t ? '0 0 16px rgba(124,58,237,0.3)' : 'none',
              transition: 'all 0.2s ease',
            }}
          >
            {t === 'flights' ? '✈️' : t === 'hotels' ? '🏨' : '🚂'} {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px 24px' }}>

        {/* INPUT STEP */}
        {step === 'input' && (
          <div>
            <div style={{ padding: '14px 16px', borderRadius: 16, background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'linear-gradient(135deg, #7C3AED, #60A5FA)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, boxShadow: '0 0 10px rgba(124,58,237,0.4)' }}>✦</div>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#A78BFA', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>Beep AI</span>
              </div>
              <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 13, color: '#B0B0CC', lineHeight: 1.55 }}>
                {tab === 'flights' ? "Tell me your travel details — origin, destination, date, and budget. I'll find the best options instantly." : tab === 'hotels' ? "Where are you staying? Tell me the city, dates, and budget." : "Where do you want to travel? I'll find the best train options."}
              </p>
            </div>

            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={defaultQueries[tab]}
              rows={3}
              style={{ width: '100%', padding: '14px', borderRadius: 14, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(124,58,237,0.3)', color: '#F4F4FF', fontSize: 14, fontFamily: "'Avenir Next', 'Avenir', sans-serif", outline: 'none', resize: 'none' as const, lineHeight: 1.5, marginBottom: 12, boxSizing: 'border-box' as const }}
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
              {[
                defaultQueries[tab],
                tab === 'flights' ? 'Book round trip to Mumbai this weekend under ₹8,000' : tab === 'hotels' ? 'Find 5-star hotel in Goa for honeymoon' : 'Book sleeper class to Chennai tomorrow',
              ].map((s, i) => (
                <button key={i} onClick={() => setQuery(s)} style={{ padding: '10px 14px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: '#8B8BAA', fontSize: 12, fontFamily: "'Avenir Next', 'Avenir', sans-serif", cursor: 'pointer', textAlign: 'left' as const, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: '#A78BFA' }}>💬</span> {s}
                </button>
              ))}
            </div>

            <button onClick={handleSearch} style={{ width: '100%', padding: '16px', borderRadius: 18, background: 'linear-gradient(135deg, #7C3AED, #4F46E5)', border: 'none', color: '#fff', fontSize: 15, fontWeight: 600, fontFamily: "'Avenir Next', 'Avenir', sans-serif", cursor: 'pointer', boxShadow: '0 0 30px rgba(124,58,237,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <span>✦</span> Let Beep Search
            </button>
          </div>
        )}

        {/* SEARCHING STEP */}
        {step === 'searching' && (
          <div style={{ paddingTop: 32, textAlign: 'center' as const }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg, #7C3AED, #60A5FA)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, margin: '0 auto 20px', boxShadow: '0 0 50px rgba(124,58,237,0.5)', animation: 'aiPulse 1.5s ease-in-out infinite' }}>✦</div>
            <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 20, fontWeight: 300, color: '#F4F4FF', marginBottom: 6 }}>Beep is searching…</p>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#A78BFA', letterSpacing: '0.08em', marginBottom: 24, minHeight: 20 }}>{searchMsg}</p>
            <div style={{ height: 4, borderRadius: 4, background: 'rgba(255,255,255,0.06)', overflow: 'hidden', marginBottom: 28 }}>
              <div style={{ height: '100%', borderRadius: 4, background: 'linear-gradient(to right, #7C3AED, #60A5FA)', width: `${progress}%`, transition: 'width 0.1s linear' }} />
            </div>
            {['Comparing prices…', 'Checking availability…', 'Applying filters…'].map((msg, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: progress > (i + 1) * 28 ? '#34d399' : 'rgba(255,255,255,0.15)', transition: 'background 0.3s ease' }} />
                <span style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 13, color: progress > (i + 1) * 28 ? '#B0B0CC' : '#8B8BAA', transition: 'color 0.3s ease' }}>{msg}</span>
                {progress > (i + 1) * 28 && <span style={{ marginLeft: 'auto', color: '#34d399', fontSize: 12 }}>✓</span>}
              </div>
            ))}
          </div>
        )}

        {/* RESULTS STEP */}
        {step === 'results' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, padding: '10px 14px', borderRadius: 12, background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)' }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg, #7C3AED, #60A5FA)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>✦</div>
              <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 13, color: '#A78BFA', fontWeight: 500 }}>Found {results.length} {tab} matching your intent</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {results.map((item: any, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  style={{
                    padding: '14px',
                    borderRadius: 16,
                    background: i === 0 ? 'rgba(124,58,237,0.1)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${i === 0 ? 'rgba(124,58,237,0.4)' : 'rgba(255,255,255,0.08)'}`,
                    cursor: 'pointer',
                    textAlign: 'left' as const,
                    width: '100%',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 14, fontWeight: 600, color: '#F4F4FF', marginBottom: 3 }}>
                        {tab === 'flights' ? item.airline : tab === 'hotels' ? item.name : item.name}
                      </p>
                      <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 12, color: '#8B8BAA' }}>
                        {tab === 'flights' ? `${item.time} · ${item.duration} · ${item.stops}` : tab === 'hotels' ? item.location : `${item.number} · ${item.time} · ${item.duration}`}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' as const, flexShrink: 0, marginLeft: 12 }}>
                      <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 17, fontWeight: 700, color: '#A78BFA', letterSpacing: '-0.01em' }}>
                        {tab === 'flights' ? item.price : tab === 'hotels' ? item.price : item.price}
                      </p>
                      {item.tag && (
                        <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 20, background: i === 0 ? 'rgba(124,58,237,0.3)' : 'rgba(255,255,255,0.08)', color: i === 0 ? '#C4B5FD' : '#8B8BAA', fontFamily: "'JetBrains Mono', monospace" }}>
                          {item.tag}
                        </span>
                      )}
                    </div>
                  </div>
                  {i === 0 && (
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 10px', borderRadius: 8, background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.25)' }}>
                      <span style={{ fontSize: 10, color: '#A78BFA', fontFamily: "'JetBrains Mono', monospace" }}>✦ AI Recommended</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* SELECTED STEP */}
        {step === 'selected' && (
          <div>
            <div style={{ padding: '16px', borderRadius: 16, background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'rgba(16,185,129,0.2)', border: '1px solid rgba(16,185,129,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>✓</div>
                <span style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 14, fontWeight: 600, color: '#34d399' }}>Beep selected the best option</span>
              </div>
              <div style={{ padding: '12px', borderRadius: 12, background: 'rgba(255,255,255,0.04)' }}>
                {tab === 'flights' && (
                  <div>
                    <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 16, fontWeight: 600, color: '#F4F4FF', marginBottom: 4 }}>{flightResults[selectedIdx].airline}</p>
                    <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 13, color: '#8B8BAA', marginBottom: 8 }}>{flightResults[selectedIdx].time} · {flightResults[selectedIdx].duration}</p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                      {[['Seat', flightResults[selectedIdx].seats], ['Price', flightResults[selectedIdx].price], ['Type', flightResults[selectedIdx].stops], ['PNR', 'AI2026XK']].map(([k, v], i) => (
                        <div key={i} style={{ padding: '8px 10px', borderRadius: 10, background: 'rgba(255,255,255,0.04)' }}>
                          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#8B8BAA', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 2 }}>{k}</p>
                          <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 13, color: '#F4F4FF', fontWeight: 500 }}>{v}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {tab === 'hotels' && (
                  <div>
                    <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 16, fontWeight: 600, color: '#F4F4FF', marginBottom: 4 }}>{hotelResults[selectedIdx].name} {hotelResults[selectedIdx].stars}</p>
                    <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 13, color: '#8B8BAA', marginBottom: 8 }}>{hotelResults[selectedIdx].location}</p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                      {[['Price', hotelResults[selectedIdx].price], ['Rating', `${hotelResults[selectedIdx].rating}★`], ['Check-in', 'Apr 1, 2026'], ['Check-out', 'Apr 3, 2026']].map(([k, v], i) => (
                        <div key={i} style={{ padding: '8px 10px', borderRadius: 10, background: 'rgba(255,255,255,0.04)' }}>
                          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#8B8BAA', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 2 }}>{k}</p>
                          <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 13, color: '#F4F4FF', fontWeight: 500 }}>{v}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {tab === 'trains' && (
                  <div>
                    <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 16, fontWeight: 600, color: '#F4F4FF', marginBottom: 4 }}>{trainResults[selectedIdx].name}</p>
                    <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 13, color: '#8B8BAA', marginBottom: 8 }}>{trainResults[selectedIdx].number} · {trainResults[selectedIdx].time}</p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                      {[['Class', trainResults[selectedIdx].class], ['Price', trainResults[selectedIdx].price], ['Duration', trainResults[selectedIdx].duration], ['PNR', 'TBK2026']].map(([k, v], i) => (
                        <div key={i} style={{ padding: '8px 10px', borderRadius: 10, background: 'rgba(255,255,255,0.04)' }}>
                          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#8B8BAA', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 2 }}>{k}</p>
                          <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 13, color: '#F4F4FF', fontWeight: 500 }}>{v}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <button onClick={handleCheckout} style={{ width: '100%', padding: '16px', borderRadius: 18, background: 'linear-gradient(135deg, #7C3AED, #4F46E5)', border: 'none', color: '#fff', fontSize: 15, fontWeight: 600, fontFamily: "'Avenir Next', 'Avenir', sans-serif", cursor: 'pointer', boxShadow: '0 0 30px rgba(124,58,237,0.4)', marginBottom: 10 }}>
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
          0%, 100% { box-shadow: 0 0 50px rgba(124,58,237,0.5); }
          50% { box-shadow: 0 0 70px rgba(124,58,237,0.8); }
        }
      `}</style>
    </div>
  );
}
