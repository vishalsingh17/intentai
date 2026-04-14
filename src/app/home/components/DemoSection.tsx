'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Icon from '@/components/ui/AppIcon';

// ─── Types ───────────────────────────────────────────────────────────────────
interface ChatMessage {
  role: 'user' | 'ai';
  content: string | React.ReactNode;
  delay: number;
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
    content: (
      <div className="space-y-2">
        <p className="text-accent-warm font-semibold text-xs font-mono-custom uppercase tracking-wider mb-2">
          ✦ Scanning 14 airlines &amp; 47 routes…
        </p>
        <div className="space-y-2">
          {[
            { airline: 'IndiGo 6E-204', time: '06:00 → 08:30', price: '₹3,899', tag: 'Best Value' },
            { airline: 'Air India AI-506', time: '09:15 → 11:45', price: '₹4,299', tag: null },
            { airline: 'SpiceJet SG-152', time: '14:20 → 16:50', price: '₹4,749', tag: null },
          ].map((f, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-3 py-2 rounded-lg text-xs"
              style={{
                background: i === 0 ? 'rgba(124,58,237,0.15)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${i === 0 ? 'rgba(124,58,237,0.3)' : 'rgba(255,255,255,0.07)'}`,
              }}
            >
              <span className="text-foreground-muted w-28">{f.airline}</span>
              <span className="text-foreground">{f.time}</span>
              <span className="text-accent font-semibold">{f.price}</span>
              {f.tag && (
                <span
                  className="text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(124,58,237,0.3)', color: '#C4B5FD' }}
                >
                  {f.tag}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    ),
    delay: 2200,
  },
  {
    role: 'ai',
    content: (
      <div>
        <p className="text-foreground-muted text-xs mb-2">
          Selecting <span className="text-foreground font-medium">IndiGo 6E-204</span> — best value under ₹5,000. Proceeding to checkout…
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
    ),
    delay: 4000,
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
          <span className="text-green-400 font-semibold text-sm">Booking Confirmed!</span>
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

const DEMO_TABS = [
  { id: 'travel', label: 'Travel', icon: 'PaperAirplaneIcon', messages: TRAVEL_MESSAGES },
];

export default function DemoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [visibleMessages, setVisibleMessages] = useState<number>(0);
  const [showTyping, setShowTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const currentMessages = DEMO_TABS[activeTab].messages;

  const startDemo = useCallback((messages: ChatMessage[]) => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setVisibleMessages(0);
    setShowTyping(false);

    messages.forEach((msg, i) => {
      if (msg.role === 'ai') {
        timersRef.current.push(setTimeout(() => setShowTyping(true), msg.delay - 900));
      }
      timersRef.current.push(setTimeout(() => {
        setShowTyping(false);
        setVisibleMessages(i + 1);
      }, msg.delay));
    });
  }, []);

  // Intersection observer to trigger demo
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

  // Scroll only the chat container, not the page
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
      className="relative py-16 md:py-20"
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

            <div
              className="gradient-border rounded-2xl overflow-hidden"
              style={{ boxShadow: '0 0 80px rgba(124,58,237,0.28), 0 0 30px rgba(124,58,237,0.12), 0 8px 40px rgba(0,0,0,0.5)', transform: 'scale(1.04)', transformOrigin: 'top right' }}
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
                style={{ background: 'rgba(8,8,16,0.95)', minHeight: 380, maxHeight: 480 }}
              >
                {currentMessages.slice(0, visibleMessages).map((msg, i) => (
                  <div
                    key={`${activeTab}-${i}`}
                    className={`flex gap-3 chat-bubble-enter ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    style={{ animationDelay: `${i * 0.05}s` }}
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
                      className={`max-w-[78%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
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