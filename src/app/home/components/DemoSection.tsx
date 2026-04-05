'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Icon from '@/components/ui/AppIcon';

// ─── Types ───────────────────────────────────────────────────────────────────
interface ChatMessage {
  role: 'user' | 'ai';
  content: string | React.ReactNode;
  delay: number;
}

// ─── Decision Layer Component ─────────────────────────────────────────────────
interface OptionCard {
  label: string;
  badge: 'Fastest' | 'Cheapest' | 'Best Value';
  price: string;
  meta: string;
  selected?: boolean;
}

function DecisionOptions({ options, scanLabel, selectedIndex }: { options: OptionCard[]; scanLabel: string; selectedIndex?: number }) {
  return (
    <div className="space-y-2">
      <p className="text-accent-warm font-semibold text-xs font-mono-custom uppercase tracking-wider mb-3 flex items-center gap-2">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent-warm animate-pulse" />
        {scanLabel}
      </p>
      <div className="space-y-2">
        {options.map((opt, i) => {
          const isSelected = selectedIndex === i;
          const badgeColors: Record<string, string> = {
            'Fastest': 'rgba(16,185,129,0.3)',
            'Cheapest': 'rgba(37,99,235,0.3)',
            'Best Value': 'rgba(124,58,237,0.3)',
          };
          const badgeTextColors: Record<string, string> = {
            'Fastest': '#6EE7B7',
            'Cheapest': '#93C5FD',
            'Best Value': '#C4B5FD',
          };
          return (
            <div
              key={i}
              className="flex items-center justify-between px-3 py-2.5 rounded-lg text-xs transition-all duration-500"
              style={{
                background: isSelected ? 'rgba(124,58,237,0.18)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${isSelected ? 'rgba(124,58,237,0.45)' : 'rgba(255,255,255,0.07)'}`,
                boxShadow: isSelected ? '0 0 12px rgba(124,58,237,0.2)' : 'none',
                transform: isSelected ? 'scale(1.01)' : 'scale(1)',
              }}
            >
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <span
                  className="text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full flex-shrink-0"
                  style={{ background: badgeColors[opt.badge], color: badgeTextColors[opt.badge] }}
                >
                  {opt.badge}
                </span>
                <span className="text-foreground-muted truncate">{opt.label}</span>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0 ml-2">
                <span className="text-foreground-muted text-[10px]">{opt.meta}</span>
                <span className="text-accent font-semibold">{opt.price}</span>
                {isSelected && <Icon name="CheckIcon" size={12} className="text-accent-warm" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ScanningStep({ label }: { label: string }) {
  return (
    <div className="space-y-2">
      <p className="text-accent-warm font-semibold text-xs font-mono-custom uppercase tracking-wider flex items-center gap-2">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent-warm animate-pulse" />
        {label}
      </p>
      <div className="h-1 rounded-full bg-[rgba(255,255,255,0.06)] overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: '100%',
            background: 'linear-gradient(to right, #7C3AED, #60A5FA)',
            animation: 'scanBar 1.2s ease-in-out infinite',
          }}
        />
      </div>
    </div>
  );
}

function SelectingStep({ label }: { label: string }) {
  return (
    <div>
      <p className="text-foreground-muted text-xs mb-2 flex items-center gap-2">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent-warm animate-pulse" />
        {label}
      </p>
      <div className="h-1.5 rounded-full bg-[rgba(255,255,255,0.08)] overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: '100%',
            background: 'linear-gradient(to right, #7C3AED, #60A5FA)',
            transition: 'width 1.5s ease',
          }}
        />
      </div>
    </div>
  );
}

// ─── Travel demo ─────────────────────────────────────────────────────────────
const TRAVEL_MESSAGES: ChatMessage[] = [
  {
    role: 'user',
    content: 'Book a flight from Delhi to Bangalore tomorrow under ₹5000',
    delay: 600,
  },
  {
    role: 'ai',
    content: <ScanningStep label="Searching across providers…" />,
    delay: 1400,
  },
  {
    role: 'ai',
    content: (
      <DecisionOptions
        scanLabel="Found 3 options"
        options={[
          { label: 'IndiGo 6E-204 · 06:00 → 08:30', badge: 'Best Value', price: '₹3,899', meta: '2h 30m' },
          { label: 'Air India AI-506 · 09:15 → 11:45', badge: 'Cheapest', price: '₹4,299', meta: '2h 30m' },
          { label: 'SpiceJet SG-152 · 14:20 → 16:50', badge: 'Fastest', price: '₹4,749', meta: '2h 30m' },
        ]}
      />
    ),
    delay: 2800,
  },
  {
    role: 'ai',
    content: <SelectingStep label="Selecting best option — IndiGo 6E-204 · Best Value under ₹5,000. Proceeding to checkout…" />,
    delay: 4400,
  },
  {
    role: 'ai',
    content: (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(16,185,129,0.2)', border: '1px solid rgba(16,185,129,0.4)' }}
          >
            <Icon name="CheckIcon" size={12} className="text-green-400" />
          </div>
          <span className="text-green-400 font-semibold text-sm">Flight Booked!</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {[
            ['Flight', 'IndiGo 6E-204'],
            ['Route', 'DEL → BLR'],
            ['Date', '27 Mar 2026'],
            ['Seat', '14A (Window)'],
            ['Amount', '₹3,899'],
            ['PNR', 'AI2026XK'],
          ].map(([k, v]) => (
            <div key={k} className="flex flex-col gap-0.5">
              <span className="text-foreground-muted font-mono-custom text-[9px] uppercase tracking-wider">{k}</span>
              <span className="text-foreground font-medium">{v}</span>
            </div>
          ))}
        </div>
        <p className="text-foreground-muted text-xs">
          Confirmation sent to your email. Total time: <span className="text-accent font-semibold">8.3 seconds</span>
        </p>
      </div>
    ),
    delay: 6000,
  },
];

// ─── Shopping demo ────────────────────────────────────────────────────────────
const SHOPPING_MESSAGES: ChatMessage[] = [
  {
    role: 'user',
    content: 'Order me lip balm and Vaseline',
    delay: 600,
  },
  {
    role: 'ai',
    content: <ScanningStep label="Searching across providers…" />,
    delay: 1400,
  },
  {
    role: 'ai',
    content: (
      <DecisionOptions
        scanLabel="Found 3 options"
        options={[
          { label: 'Blinkit · Vaseline 100g + Lip Balm', badge: 'Fastest', price: '₹248', meta: '10 min' },
          { label: 'Zepto · Vaseline 100g + Lip Balm', badge: 'Cheapest', price: '₹229', meta: '15 min' },
          { label: 'Amazon · Vaseline 100g + Lip Balm', badge: 'Best Value', price: '₹239', meta: '2 hrs' },
        ]}
      />
    ),
    delay: 2800,
  },
  {
    role: 'ai',
    content: <SelectingStep label="Selecting best option — Blinkit · Fastest delivery in 10 min. Placing order…" />,
    delay: 4400,
  },
  {
    role: 'ai',
    content: (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: 'rgba(16,185,129,0.2)', border: '1px solid rgba(16,185,129,0.4)' }}>
            <Icon name="CheckIcon" size={12} className="text-green-400" />
          </div>
          <span className="text-green-400 font-semibold text-sm">Order Placed!</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {[['Items', '2 products'], ['Platform', 'Blinkit'], ['Total', '₹248'], ['ETA', '10 minutes'], ['Address', 'Saved home'], ['Payment', 'UPI auto-pay']].map(([k, v]) => (
            <div key={k} className="flex flex-col gap-0.5">
              <span className="text-foreground-muted font-mono-custom text-[9px] uppercase tracking-wider">{k}</span>
              <span className="text-foreground font-medium">{v}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    delay: 5800,
  },
];

// ─── Quick Commerce demo ──────────────────────────────────────────────────────
const QCOMMERCE_MESSAGES: ChatMessage[] = [
  {
    role: 'user',
    content: 'Doodh, dahi aur bread order kar do',
    delay: 600,
  },
  {
    role: 'ai',
    content: <ScanningStep label="Searching across providers…" />,
    delay: 1400,
  },
  {
    role: 'ai',
    content: (
      <DecisionOptions
        scanLabel="Found 3 options"
        options={[
          { label: 'Blinkit · Amul Milk + Dahi + Bread', badge: 'Fastest', price: '₹165', meta: '10 min' },
          { label: 'Zepto · Amul Milk + Dahi + Bread', badge: 'Cheapest', price: '₹158', meta: '14 min' },
          { label: 'Swiggy Instamart · Combo pack', badge: 'Best Value', price: '₹162', meta: '12 min' },
        ]}
      />
    ),
    delay: 2800,
  },
  {
    role: 'ai',
    content: <SelectingStep label="Selecting best option — Blinkit · Fastest delivery. Order confirm ho raha hai…" />,
    delay: 4400,
  },
  {
    role: 'ai',
    content: (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: 'rgba(16,185,129,0.2)', border: '1px solid rgba(16,185,129,0.4)' }}>
            <Icon name="CheckIcon" size={12} className="text-green-400" />
          </div>
          <span className="text-green-400 font-semibold text-sm">Order confirmed! Delivery in 10 mins.</span>
        </div>
        <p className="text-foreground-muted text-xs">Beep ne Hindi samjha, best option choose kiya, aur order place kar diya — bina ek bhi extra tap ke.</p>
      </div>
    ),
    delay: 5800,
  },
];

// ─── Cab demo ─────────────────────────────────────────────────────────────────
const CAB_MESSAGES: ChatMessage[] = [
  {
    role: 'user',
    content: 'Book me an Uber from Connaught Place to Gurgaon',
    delay: 600,
  },
  {
    role: 'ai',
    content: <ScanningStep label="Searching across providers…" />,
    delay: 1400,
  },
  {
    role: 'ai',
    content: (
      <DecisionOptions
        scanLabel="Found 3 options"
        options={[
          { label: 'Uber Mini · CP → Gurgaon ~32 km', badge: 'Best Value', price: '₹320–380', meta: 'ETA 5 min' },
          { label: 'Ola Mini · CP → Gurgaon ~32 km', badge: 'Cheapest', price: '₹295–350', meta: 'ETA 8 min' },
          { label: 'Uber Sedan · CP → Gurgaon ~32 km', badge: 'Fastest', price: '₹420–490', meta: 'ETA 4 min' },
        ]}
      />
    ),
    delay: 2800,
  },
  {
    role: 'ai',
    content: <SelectingStep label="Selecting best option — Uber Mini · Best value at ₹320. Confirming ride…" />,
    delay: 4400,
  },
  {
    role: 'ai',
    content: (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: 'rgba(16,185,129,0.2)', border: '1px solid rgba(16,185,129,0.4)' }}>
            <Icon name="CheckIcon" size={12} className="text-green-400" />
          </div>
          <span className="text-green-400 font-semibold text-sm">Ride confirmed!</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {[['Type', 'Uber Mini'], ['Route', 'CP → Gurgaon'], ['Driver', 'Arriving in 5 mins'], ['Fare', '₹342'], ['Distance', '~32 km'], ['ETA', '45 min']].map(([k, v]) => (
            <div key={k} className="flex flex-col gap-0.5">
              <span className="text-foreground-muted font-mono-custom text-[9px] uppercase tracking-wider">{k}</span>
              <span className="text-foreground font-medium">{v}</span>
            </div>
          ))}
        </div>
        <p className="text-foreground-muted text-xs">Driver arriving in <span className="text-green-400 font-semibold">5 mins</span>. Track live in the app.</p>
      </div>
    ),
    delay: 5800,
  },
];

const DEMO_TABS = [
  { id: 'travel', label: 'Travel', icon: 'PaperAirplaneIcon', messages: TRAVEL_MESSAGES },
  { id: 'shopping', label: 'Shopping', icon: 'ShoppingBagIcon', messages: SHOPPING_MESSAGES },
  { id: 'qcommerce', label: 'Quick Commerce', icon: 'BoltIcon', messages: QCOMMERCE_MESSAGES },
  { id: 'cab', label: 'Cab', icon: 'TruckIcon', messages: CAB_MESSAGES },
];

// ─── Typing text effect ───────────────────────────────────────────────────────
function TypingText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    setDisplayed('');
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, 28);
    return () => clearInterval(interval);
  }, [text]);
  return <span>{displayed}<span className="inline-block w-0.5 h-3.5 bg-white/60 ml-0.5 align-middle animate-pulse" /></span>;
}

export default function DemoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [visibleMessages, setVisibleMessages] = useState<number>(0);
  const [showTyping, setShowTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [typingUserMsg, setTypingUserMsg] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const currentMessages = DEMO_TABS[activeTab].messages;

  const startDemo = useCallback((messages: ChatMessage[]) => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setVisibleMessages(0);
    setShowTyping(false);
    setTypingUserMsg(false);

    // Show typing effect for user message first
    timersRef.current.push(setTimeout(() => setTypingUserMsg(true), 100));

    messages.forEach((msg, i) => {
      if (msg.role === 'ai') {
        timersRef.current.push(setTimeout(() => setShowTyping(true), msg.delay - 700));
      }
      timersRef.current.push(setTimeout(() => {
        setShowTyping(false);
        if (i === 0) setTypingUserMsg(false);
        setVisibleMessages(i + 1);
      }, msg.delay));
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (hasStarted) startDemo(currentMessages);
    return () => timersRef.current.forEach(clearTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasStarted, activeTab]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [visibleMessages, showTyping]);

  const handleTabChange = (i: number) => {
    setActiveTab(i);
  };

  return (
    <section
      ref={sectionRef}
      id="demo"
      className="relative py-12 md:py-16"
      aria-label="Beep live demo"
    >
      {/* Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="glow-orb glow-orb-primary"
          style={{ width: 500, height: 500, top: '20%', right: '-10%', opacity: 0.3 }}
        />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">

          {/* Left: label + text */}
          <div className="md:col-span-4 reveal-from-bottom active">
            <span className="section-label block mb-4">02 / Live Demo</span>
            <h2 className="font-display text-4xl md:text-5xl font-light leading-tight tracking-tight mb-6" style={{ color: 'rgba(255,255,255,0.98)' }}>
              Watch Beep<br />
              <span className="gradient-text italic">execute</span><br />
              in real time.
            </h2>
            <p className="text-foreground-muted leading-relaxed mb-8" style={{ opacity: 0.85 }}>
              One sentence. That&apos;s all it takes. Beep parses your intent, scans live inventory across providers, compares options, and completes checkout,{' '}
              <span className="text-foreground font-semibold">without a single extra tap.</span>
            </p>

            {/* Flow visual */}
            <div className="space-y-2">
              {[
                { step: '01', label: 'Search', desc: 'Scans all providers' },
                { step: '02', label: 'Compare', desc: 'Fastest · Cheapest · Best Value' },
                { step: '03', label: 'Select', desc: 'AI picks the best match' },
                { step: '04', label: 'Confirm', desc: 'Done in seconds' },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-3 text-xs">
                  <span className="font-mono-custom text-[9px] text-foreground-muted w-5 flex-shrink-0">{s.step}</span>
                  <div className="w-px h-4 bg-[rgba(124,58,237,0.3)] flex-shrink-0" />
                  <span className="text-foreground font-medium w-16 flex-shrink-0">{s.label}</span>
                  <span className="text-foreground-muted">{s.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: chat UI */}
          <div className="md:col-span-8 md:sticky md:top-24">
            {/* Demo tabs */}
            <div className="flex gap-2 mb-4 flex-wrap">
              {DEMO_TABS.map((tab, i) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(i)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                    activeTab === i ? 'text-white' : 'text-foreground-muted hover:text-foreground btn-ghost'
                  }`}
                  style={activeTab === i ? { background: 'linear-gradient(135deg, #7C3AED, #4F46E5)', boxShadow: '0 0 16px rgba(124,58,237,0.4)' } : {}}
                  aria-pressed={activeTab === i}
                  suppressHydrationWarning
                >
                  <Icon name={tab.icon as Parameters<typeof Icon>[0]['name']} size={13} className="text-current" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Demo container — ~15% larger via scale + glow */}
            <div
              className="gradient-border rounded-2xl overflow-hidden"
              style={{
                boxShadow: '0 0 100px rgba(124,58,237,0.32), 0 0 40px rgba(124,58,237,0.16), 0 8px 60px rgba(0,0,0,0.6)',
                transform: 'scale(1.06)',
                transformOrigin: 'top right',
              }}
            >
              {/* Window chrome */}
              <div
                className="flex items-center justify-between px-5 py-3 border-b"
                style={{ background: 'rgba(12,12,24,0.9)', borderColor: 'rgba(124,58,237,0.15)' }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500 opacity-70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 opacity-70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500 opacity-70" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="status-dot" aria-hidden="true" />
                  <span className="font-mono-custom text-[10px] text-foreground-muted tracking-widest uppercase">
                    Beep Agent · Active
                  </span>
                </div>
                <div className="w-12" />
              </div>

              {/* Messages */}
              <div
                ref={chatContainerRef}
                className="p-6 space-y-4 overflow-y-auto"
                style={{ background: 'rgba(8,8,16,0.95)', minHeight: 400, maxHeight: 520 }}
              >
                {currentMessages.slice(0, visibleMessages).map((msg, i) => (
                  <div
                    key={`${activeTab}-${i}`}
                    className={`flex gap-3 chat-bubble-enter ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    style={{ animationDelay: `${i * 0.04}s` }}
                  >
                    {msg.role === 'ai' && (
                      <div
                        className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5"
                        style={{ background: 'linear-gradient(135deg, #7C3AED, #60A5FA)' }}
                        aria-hidden="true"
                      >
                        <Icon name="CpuChipIcon" size={14} className="text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                        msg.role === 'user' ? 'rounded-br-sm text-white font-medium' : 'rounded-bl-sm text-foreground-strong'
                      }`}
                      style={
                        msg.role === 'user'
                          ? { background: 'linear-gradient(135deg, #7C3AED, #4F46E5)' }
                          : { background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.18)' }
                      }
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}

                {/* Typing user message with effect */}
                {typingUserMsg && visibleMessages === 0 && (
                  <div className="flex gap-3 justify-end chat-bubble-enter">
                    <div
                      className="max-w-[80%] px-4 py-3 rounded-2xl rounded-br-sm text-sm text-white font-medium"
                      style={{ background: 'linear-gradient(135deg, #7C3AED, #4F46E5)' }}
                    >
                      <TypingText text={typeof currentMessages[0].content === 'string' ? currentMessages[0].content : ''} />
                    </div>
                  </div>
                )}

                {/* Typing indicator */}
                {showTyping && (
                  <div className="flex gap-3 justify-start chat-bubble-enter">
                    <div
                      className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, #7C3AED, #60A5FA)' }}
                      aria-hidden="true"
                    >
                      <Icon name="CpuChipIcon" size={14} className="text-white" />
                    </div>
                    <div
                      className="px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-1.5"
                      style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.18)' }}
                      aria-label="AI is typing"
                    >
                      <span className="typing-dot w-1.5 h-1.5 rounded-full bg-accent-warm inline-block" />
                      <span className="typing-dot w-1.5 h-1.5 rounded-full bg-accent-warm inline-block" />
                      <span className="typing-dot w-1.5 h-1.5 rounded-full bg-accent-warm inline-block" />
                    </div>
                  </div>
                )}
              </div>

              {/* Input bar */}
              <div
                className="px-5 py-4 border-t flex items-center gap-3"
                style={{ background: 'rgba(12,12,24,0.9)', borderColor: 'rgba(124,58,237,0.15)' }}
              >
                <div
                  className="flex-1 px-4 py-2.5 rounded-xl text-sm text-foreground-muted italic"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  Tell me what you need…
                </div>
                <button
                  className="btn-primary w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  aria-label="Send message"
                  suppressHydrationWarning
                >
                  <span>
                    <Icon name="ArrowUpIcon" size={16} className="text-white" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}