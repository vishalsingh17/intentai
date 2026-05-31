'use client';

import React, { useEffect, useRef, useState } from 'react';

// Live animated demo for each tab
const FlightDemo = () => {
  const [step, setStep] = useState(0);
  const steps = [
    { type: 'user', text: 'Book me a flight from Delhi to Mumbai tomorrow, under 7,000' },
    { type: 'typing' },
    { type: 'card', airline: 'IndiGo 6E-201', price: '5,100', time: '9:00 AM', badge: 'Best value' },
    { type: 'user', text: 'Book it.' },
    { type: 'system', text: 'Booking confirmed · IndiGo 6E-201 · 5,100 · Ticket sent to email.' },
  ];
  const cycleRef = useRef(0);

  useEffect(() => {
    let timers: ReturnType<typeof setTimeout>[] = [];
    const run = () => {
      setStep(0);
      const delays = [400, 1200, 2400, 3600, 4600];
      delays.forEach((d, i) => {
        timers.push(setTimeout(() => setStep(i + 1), d));
      });
      timers.push(setTimeout(() => { cycleRef.current++; run(); }, 7000));
    };
    run();
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: '#0d0c17', border: '1px solid rgba(255,255,255,0.1)', minHeight: 280 }}>
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
        <div className="w-2 h-2 rounded-full bg-green-400" style={{ boxShadow: '0 0 6px rgba(74,222,128,0.8)' }} />
        <span className="text-white/60 text-[12px]" style={{ fontFamily: 'Geist, sans-serif' }}>beep · flights</span>
      </div>
      <div className="p-4 space-y-3">
        {step >= 1 && (
          <div className="flex justify-end chat-bubble-enter">
            <div className="bg-[#5f40de] text-white text-[12px] rounded-2xl rounded-br-sm px-3 py-2 max-w-[220px]" style={{ fontFamily: 'Geist, sans-serif' }}>{steps[0].text}</div>
          </div>
        )}
        {step >= 2 && (
          <div className="flex items-end gap-1 chat-bubble-enter">
            <div className="bg-white/10 rounded-2xl rounded-bl-sm px-3 py-2.5 flex gap-1 items-center">
              {[0,1,2].map(i => <span key={i} className="typing-dot w-1.5 h-1.5 rounded-full bg-white/60 inline-block" />)}
            </div>
          </div>
        )}
        {step >= 3 && (
          <div className="chat-bubble-enter">
            <div className="bg-white/8 border border-white/10 rounded-2xl p-3 max-w-[240px]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white text-[13px] font-semibold">IndiGo 6E-201</span>
                <span className="bg-green-500/20 text-green-400 text-[10px] px-2 py-0.5 rounded-full">Best value</span>
              </div>
              <div className="flex items-center gap-2 text-white/60 text-[11px] mb-2">
                <span>DEL 9:00 AM</span><span className="text-white/20">--</span><span>BOM 11:10 AM</span>
              </div>
              <div className="text-[#a78bfa] text-[16px] font-bold">5,100</div>
              <div className="text-white/30 text-[10px]">All inclusive · No hidden charges</div>
            </div>
          </div>
        )}
        {step >= 4 && (
          <div className="flex justify-end chat-bubble-enter">
            <div className="bg-[#5f40de] text-white text-[12px] rounded-2xl rounded-br-sm px-3 py-2" style={{ fontFamily: 'Geist, sans-serif' }}>Book it.</div>
          </div>
        )}
        {step >= 5 && (
          <div className="chat-bubble-enter">
            <div className="bg-white/5 border border-green-500/20 rounded-xl px-3 py-2 max-w-[240px]">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-3 h-3 rounded-full bg-green-500 flex items-center justify-center text-[8px] text-white">✓</span>
                <span className="text-green-400 text-[11px] font-semibold">Confirmed</span>
              </div>
              <p className="text-white/60 text-[11px]">{steps[4].text}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const HotelDemo = () => {
  const [step, setStep] = useState(0);
  const cycleRef = useRef(0);

  useEffect(() => {
    let timers: ReturnType<typeof setTimeout>[] = [];
    const run = () => {
      setStep(0);
      [400, 1400, 2800, 4000, 5200].forEach((d, i) => {
        timers.push(setTimeout(() => setStep(i + 1), d));
      });
      timers.push(setTimeout(() => { cycleRef.current++; run(); }, 8000));
    };
    run();
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: '#0d0c17', border: '1px solid rgba(255,255,255,0.1)', minHeight: 280 }}>
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
        <div className="w-2 h-2 rounded-full bg-green-400" style={{ boxShadow: '0 0 6px rgba(74,222,128,0.8)' }} />
        <span className="text-white/60 text-[12px]" style={{ fontFamily: 'Geist, sans-serif' }}>beep · hotels</span>
      </div>
      <div className="p-4 space-y-3">
        {step >= 1 && (
          <div className="flex justify-end chat-bubble-enter">
            <div className="bg-[#5f40de] text-white text-[12px] rounded-2xl rounded-br-sm px-3 py-2 max-w-[220px]" style={{ fontFamily: 'Geist, sans-serif' }}>Find me a quiet hotel near Bandra with a pool, under 4,000 a night</div>
          </div>
        )}
        {step >= 2 && (
          <div className="flex items-end gap-1 chat-bubble-enter">
            <div className="bg-white/10 rounded-2xl rounded-bl-sm px-3 py-2.5 flex gap-1 items-center">
              {[0,1,2].map(i => <span key={i} className="typing-dot w-1.5 h-1.5 rounded-full bg-white/60 inline-block" />)}
            </div>
          </div>
        )}
        {step >= 3 && (
          <div className="chat-bubble-enter">
            <div className="bg-white/8 border border-white/10 rounded-2xl p-3 max-w-[240px]">
              <div className="flex items-center justify-between mb-1">
                <span className="text-white text-[13px] font-semibold">The Bandra Retreat</span>
                <span className="bg-[#5f40de]/30 text-[#a78bfa] text-[10px] px-2 py-0.5 rounded-full">Best match</span>
              </div>
              <div className="text-white/50 text-[11px] mb-1">Quiet · Pool · 0.8km from Bandra</div>
              <div className="text-[#a78bfa] text-[16px] font-bold">3,800 / night</div>
              <div className="text-white/30 text-[10px]">Free cancellation · Breakfast included</div>
            </div>
          </div>
        )}
        {step >= 4 && (
          <div className="flex justify-end chat-bubble-enter">
            <div className="bg-[#5f40de] text-white text-[12px] rounded-2xl rounded-br-sm px-3 py-2" style={{ fontFamily: 'Geist, sans-serif' }}>Book it for 2 nights.</div>
          </div>
        )}
        {step >= 5 && (
          <div className="chat-bubble-enter">
            <div className="bg-white/5 border border-green-500/20 rounded-xl px-3 py-2 max-w-[240px]">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-3 h-3 rounded-full bg-green-500 flex items-center justify-center text-[8px] text-white">✓</span>
                <span className="text-green-400 text-[11px] font-semibold">Confirmed</span>
              </div>
              <p className="text-white/60 text-[11px]">2 nights · 7,600 total · Confirmation on email.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const QCommerceDemo = () => {
  const [step, setStep] = useState(0);
  const cycleRef = useRef(0);

  useEffect(() => {
    let timers: ReturnType<typeof setTimeout>[] = [];
    const run = () => {
      setStep(0);
      [400, 1200, 2400, 3600].forEach((d, i) => {
        timers.push(setTimeout(() => setStep(i + 1), d));
      });
      timers.push(setTimeout(() => { cycleRef.current++; run(); }, 7000));
    };
    run();
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: '#0d0c17', border: '1px solid rgba(255,255,255,0.1)', minHeight: 280 }}>
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
        <div className="w-2 h-2 rounded-full bg-amber-400" style={{ boxShadow: '0 0 6px rgba(251,191,36,0.8)' }} />
        <span className="text-white/60 text-[12px]" style={{ fontFamily: 'Geist, sans-serif' }}>beep · q-commerce · coming soon</span>
      </div>
      <div className="p-4 space-y-3">
        {step >= 1 && (
          <div className="flex justify-end chat-bubble-enter">
            <div className="bg-[#5f40de] text-white text-[12px] rounded-2xl rounded-br-sm px-3 py-2 max-w-[220px]" style={{ fontFamily: 'Geist, sans-serif' }}>Order milk, eggs, bread and bananas for delivery in 30 minutes</div>
          </div>
        )}
        {step >= 2 && (
          <div className="flex items-end gap-1 chat-bubble-enter">
            <div className="bg-white/10 rounded-2xl rounded-bl-sm px-3 py-2.5 flex gap-1 items-center">
              {[0,1,2].map(i => <span key={i} className="typing-dot w-1.5 h-1.5 rounded-full bg-white/60 inline-block" />)}
            </div>
          </div>
        )}
        {step >= 3 && (
          <div className="chat-bubble-enter">
            <div className="bg-white/8 border border-white/10 rounded-2xl p-3 max-w-[240px]">
              <div className="text-white text-[12px] font-semibold mb-2">4 items · Blinkit</div>
              {['Milk 1L', 'Eggs x12', 'Bread', 'Bananas'].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-white/50 text-[11px] mb-1">
                  <span className="w-1 h-1 rounded-full bg-[#a78bfa]" />{item}
                </div>
              ))}
              <div className="text-[#a78bfa] text-[14px] font-bold mt-2">287 total</div>
              <div className="text-white/30 text-[10px]">Delivery in 22 min</div>
            </div>
          </div>
        )}
        {step >= 4 && (
          <div className="chat-bubble-enter">
            <div className="bg-white/5 border border-amber-500/20 rounded-xl px-3 py-2 max-w-[240px]">
              <div className="flex items-center gap-1.5">
                <span className="text-amber-400 text-[11px] font-semibold">Coming soon</span>
              </div>
              <p className="text-white/40 text-[11px] mt-1">Q-Commerce launches Q3 2026</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const MobilityDemo = () => {
  const [step, setStep] = useState(0);
  const cycleRef = useRef(0);

  useEffect(() => {
    let timers: ReturnType<typeof setTimeout>[] = [];
    const run = () => {
      setStep(0);
      [400, 1200, 2400, 3600].forEach((d, i) => {
        timers.push(setTimeout(() => setStep(i + 1), d));
      });
      timers.push(setTimeout(() => { cycleRef.current++; run(); }, 7000));
    };
    run();
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: '#0d0c17', border: '1px solid rgba(255,255,255,0.1)', minHeight: 280 }}>
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
        <div className="w-2 h-2 rounded-full bg-amber-400" style={{ boxShadow: '0 0 6px rgba(251,191,36,0.8)' }} />
        <span className="text-white/60 text-[12px]" style={{ fontFamily: 'Geist, sans-serif' }}>beep · mobility · coming soon</span>
      </div>
      <div className="p-4 space-y-3">
        {step >= 1 && (
          <div className="flex justify-end chat-bubble-enter">
            <div className="bg-[#5f40de] text-white text-[12px] rounded-2xl rounded-br-sm px-3 py-2 max-w-[220px]" style={{ fontFamily: 'Geist, sans-serif' }}>Book a cab to the airport tomorrow at 5 AM, I have a 7 AM flight</div>
          </div>
        )}
        {step >= 2 && (
          <div className="flex items-end gap-1 chat-bubble-enter">
            <div className="bg-white/10 rounded-2xl rounded-bl-sm px-3 py-2.5 flex gap-1 items-center">
              {[0,1,2].map(i => <span key={i} className="typing-dot w-1.5 h-1.5 rounded-full bg-white/60 inline-block" />)}
            </div>
          </div>
        )}
        {step >= 3 && (
          <div className="chat-bubble-enter">
            <div className="bg-white/8 border border-white/10 rounded-2xl p-3 max-w-[240px]">
              <div className="text-white text-[12px] font-semibold mb-1">Scheduled Cab · 5:00 AM</div>
              <div className="text-white/50 text-[11px] mb-2">Pickup: Your location · Drop: Airport T2</div>
              <div className="text-[#a78bfa] text-[14px] font-bold">Estimated 380</div>
              <div className="text-white/30 text-[10px]">Reminder set · Calendar blocked</div>
            </div>
          </div>
        )}
        {step >= 4 && (
          <div className="chat-bubble-enter">
            <div className="bg-white/5 border border-amber-500/20 rounded-xl px-3 py-2 max-w-[240px]">
              <div className="flex items-center gap-1.5">
                <span className="text-amber-400 text-[11px] font-semibold">Coming soon</span>
              </div>
              <p className="text-white/40 text-[11px] mt-1">Mobility launches Q3 2026</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const TABS = [
  {
    id: 'flights',
    label: 'Flights',
    badge: 'Live',
    badgeColor: 'bg-green-100 text-green-700',
    moat: 'Price shown is the price paid. No surprise checkout.',
    body: 'Beep searches live inventory across all major carriers, picks the best value flight for your budget, and completes the booking including seat selection, invoice and calendar block.',
    checklist: ['Live fare comparison', 'Instant booking', 'Invoice on email', 'Calendar sync'],
    intent: 'Book me a flight from Delhi to Mumbai tomorrow under 7,000',
    steps: ['Searched 6 carriers', 'Found IndiGo 6E-201 at 5,100', 'Confirmed booking', 'Sent invoice to email'],
    Demo: FlightDemo,
  },
  {
    id: 'hotels',
    label: 'Hotels',
    badge: 'Live',
    badgeColor: 'bg-green-100 text-green-700',
    moat: 'You set the vibe. Beep finds the room.',
    body: 'Describe the kind of stay you want. Rooftop pool, quiet neighbourhood, near the airport. Beep understands context and books the right room without you scrolling through 200 options.',
    checklist: ['Natural language search', 'Multi-platform inventory', 'Instant confirmation', 'Cancellation handled'],
    intent: 'Find me a quiet hotel near Bandra with a pool, under 4,000 a night',
    steps: ['Parsed your vibe', 'Matched 3 properties', 'Confirmed best rate', 'Booking confirmed'],
    Demo: HotelDemo,
  },
  {
    id: 'qcommerce',
    label: 'Q-Commerce',
    badge: 'Coming',
    badgeColor: 'bg-amber-100 text-amber-700',
    moat: 'Your grocery list, handled in one sentence.',
    body: 'Tell beep what you need from the store. Beep places the order across the fastest available provider and tracks delivery. No app switching, no cart building.',
    checklist: ['Multi-store search', 'Fastest delivery routing', 'Order tracking', 'Reorder memory'],
    intent: 'Order milk, eggs, bread and bananas for delivery in 30 minutes',
    steps: ['Parsed your list', 'Found fastest provider', 'Placed order', 'Tracking delivery'],
    Demo: QCommerceDemo,
  },
  {
    id: 'mobility',
    label: 'Mobility',
    badge: 'Coming',
    badgeColor: 'bg-amber-100 text-amber-700',
    moat: 'Say where you are going. Beep handles the rest.',
    body: 'From airport pickups to daily commutes, beep books the right cab at the right time and adds it to your calendar so you never miss a ride.',
    checklist: ['Multi-provider booking', 'Scheduled rides', 'Calendar integration', 'Fare comparison'],
    intent: 'Book a cab to the airport tomorrow at 5 AM, I have a 7 AM flight',
    steps: ['Checked flight time', 'Scheduled cab for 5 AM', 'Confirmed booking', 'Reminder set'],
    Demo: MobilityDemo,
  },
];

export default function ExperienceSection() {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.querySelectorAll('.reveal-from-bottom').forEach((el) => el.classList.add('active'));
      }),
      { threshold: 0.1 }
    );
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  const tab = TABS[activeTab];
  const { Demo } = tab;

  return (
    <section id="experience" ref={sectionRef} className="py-24 px-6 md:px-12" style={{ background: '#f4f7fb' }}>
      <div className="max-w-[1280px] mx-auto">
        <div className="mb-3 reveal-from-bottom">
          <span className="section-label">Experience</span>
        </div>
        <h2
          className="text-[48px] md:text-[64px] mb-10 reveal-from-bottom"
          style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', color: '#1c3561', fontWeight: 600 }}
        >
          BeepAi in action.
        </h2>

        {/* Tabs */}
        <div className="flex gap-2 mb-10 flex-wrap reveal-from-bottom">
          {TABS.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(i)}
              suppressHydrationWarning
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-medium transition-all duration-200`}
              style={{
                fontFamily: "'Google Sans', sans-serif",
                background: activeTab === i ? '#1c3561' : '#ffffff',
                color: activeTab === i ? '#ffffff' : '#4a5f80',
                border: activeTab === i ? '1.5px solid #1c3561' : '1.5px solid rgba(28,53,97,0.15)',
                boxShadow: activeTab === i ? '0 2px 12px rgba(28,53,97,0.2)' : 'none',
              }}
            >
              {t.label}
              <span
                className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                style={{
                  background: activeTab === i ? 'rgba(197,214,234,0.2)' : (t.badge === 'Live' ? 'rgba(34,197,94,0.1)' : 'rgba(251,191,36,0.1)'),
                  color: activeTab === i ? '#c5d6ea' : (t.badge === 'Live' ? '#16a34a' : '#b45309'),
                }}
              >
                {t.badge}
              </span>
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Left */}
          <div>
            <h3
              className="text-[36px] md:text-[44px] leading-tight mb-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', color: '#1c3561', fontWeight: 600 }}
            >
              {tab.moat}
            </h3>
            <p className="text-[16px] leading-relaxed mb-6" style={{ fontFamily: "'Google Sans', sans-serif", color: '#4a5f80' }}>
              {tab.body}
            </p>
            <ul className="space-y-2">
              {tab.checklist.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-[14px]" style={{ fontFamily: "'Google Sans', sans-serif", color: '#4a5f80' }}>
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-[11px] flex-shrink-0" style={{ background: 'rgba(28,53,97,0.1)', color: '#1c3561' }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right — live animated demo */}
          <div className="space-y-4">
            <Demo />
          </div>
        </div>
      </div>
    </section>
  );
}
