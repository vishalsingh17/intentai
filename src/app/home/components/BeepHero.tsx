'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';

interface ChatMessage {
  id: number;
  type: 'user' | 'ai' | 'system' | 'typing';
  text?: string;
  card?: boolean;
}

const CHAT_SEQUENCE: ChatMessage[] = [
  { id: 1, type: 'user', text: 'Book me a flight from Delhi to Mumbai tomorrow, under 7,000' },
  { id: 2, type: 'typing' },
  { id: 3, type: 'ai', text: 'Found the best option for you.', card: true },
  { id: 4, type: 'user', text: 'Book it.' },
  { id: 5, type: 'system', text: 'Booking confirmed · IndiGo 6E-201 · 5,100 · Your ticket is on your email. Do not forget your ID.' },
  { id: 6, type: 'user', text: 'Also block my calendar and set a reminder.' },
  { id: 7, type: 'system', text: 'Done · Calendar blocked · Reminder set.' },
];

const LANGUAGES = ['Hindi', 'Tamil', 'French', 'German', 'Malayalam', 'Bengali', 'Urdu', 'Arabic', 'Japanese', 'Korean', 'Spanish', 'Portuguese', 'Swahili', 'Thai', 'Vietnamese', 'Turkish', 'Greek', 'Hebrew', 'Punjabi', 'Telugu'];

export default function BeepHero() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [showVoice, setShowVoice] = useState(false);
  const [showOrb, setShowOrb] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [currentLang, setCurrentLang] = useState(0);
  const chatRef = useRef<HTMLDivElement>(null);
  const langIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Animate chat messages
  useEffect(() => {
    const delays = [800, 1600, 3200, 4400, 5200, 6200, 7200];
    const timers = CHAT_SEQUENCE.map((msg, i) =>
      setTimeout(() => {
        setVisibleMessages(prev => {
          if (msg.type === 'typing') {
            return [...prev, msg.id];
          }
          // Remove typing when AI responds
          const filtered = prev.filter(id => {
            const m = CHAT_SEQUENCE.find(m => m.id === id);
            return m?.type !== 'typing';
          });
          return [...filtered, msg.id];
        });
        if (chatRef.current) {
          chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
      }, delays[i])
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  // Language cycling when voice active
  useEffect(() => {
    if (showVoice) {
      langIntervalRef.current = setInterval(() => {
        setCurrentLang(prev => (prev + 1) % LANGUAGES.length);
      }, 600);
    } else {
      if (langIntervalRef.current) clearInterval(langIntervalRef.current);
    }
    return () => {
      if (langIntervalRef.current) clearInterval(langIntervalRef.current);
    };
  }, [showVoice]);

  // Keyboard typing animation
  const handlePillTap = () => {
    setShowKeyboard(true);
    const text = 'Book me a flight to Goa';
    let i = 0;
    setTypedText('');
    const interval = setInterval(() => {
      i++;
      setTypedText(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setTimeout(() => {
          setShowKeyboard(false);
          setTypedText('');
        }, 1800);
      }
    }, 80);
  };

  // Voice button
  const handleVoiceTap = () => {
    setShowVoice(true);
    setTimeout(() => {
      setShowVoice(false);
      setShowOrb(true);
      setTimeout(() => setShowOrb(false), 3500);
    }, 4000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const supabase = createClient();
      await supabase.from('early_access_signups').insert({ email, source: 'hero' });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="hero" className="min-h-screen bg-white pt-24 pb-16 px-6 md:px-12">
      <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16 min-h-[calc(100vh-6rem)]">
        {/* Left column */}
        <div className="flex-1 flex flex-col justify-center">
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-500 green-pulse flex-shrink-0" />
            <span className="text-[13px] text-[#6b6b80] font-medium" style={{ fontFamily: 'Geist, sans-serif' }}>
              Launching May 2026 · Starting with travel
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-[80px] md:text-[96px] leading-[0.92] tracking-wide text-[#0a0a0a] mb-2">
            AI Commerce
          </h1>
          <div className="mb-6">
            <span
              className="text-[72px] md:text-[88px] leading-[0.95] text-[#5f40de]"
              style={{ fontFamily: 'Instrument Serif', fontStyle: 'italic' }}
            >
              for real life.
            </span>
          </div>

          {/* Body */}
          <p className="text-[17px] text-[#3a3a4a] leading-relaxed max-w-[480px] mb-8" style={{ fontFamily: 'Geist, sans-serif' }}>
            Tell beep what you need. Beep finds the best option, decides and completes checkout — powered by real agentic payment infrastructure. Not a search. An execution.
          </p>

          {/* Email form */}
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-[440px]">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                suppressHydrationWarning
                className="flex-1 px-4 py-3 rounded-full border border-[rgba(95,64,222,0.2)] bg-white text-[#0a0a0a] placeholder-[#9999aa] text-[14px] focus:outline-none focus:border-[#5f40de] focus:ring-2 focus:ring-[rgba(95,64,222,0.15)] transition-all"
                style={{ fontFamily: 'Geist, sans-serif' }}
              />
              <button
                type="submit"
                disabled={loading}
                suppressHydrationWarning
                className="btn-violet px-6 py-3 text-[14px] whitespace-nowrap cursor-none"
              >
                {loading ? 'Joining...' : 'Get early access'}
              </button>
            </form>
          ) : (
            <div className="flex items-center gap-2 text-green-600 font-medium text-[15px]">
              <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs">✓</span>
              You are on the list. We will be in touch.
            </div>
          )}
          <p className="text-[12px] text-[#9999aa] mt-2" style={{ fontFamily: 'Geist, sans-serif' }}>No spam, ever.</p>
        </div>

        {/* Right column — iPhone mockup */}
        <div className="flex-shrink-0 flex items-center justify-center">
          <div className="relative" style={{ width: 300, height: 620 }}>
            {/* Phone frame */}
            <div
              className="relative w-full h-full rounded-[44px] overflow-hidden shadow-2xl"
              style={{ background: '#0d0c17', border: '2px solid rgba(255,255,255,0.12)' }}
            >
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#0d0c17] rounded-b-2xl z-20" />

              {/* App bar */}
              <div className="flex items-center justify-between px-4 pt-8 pb-3 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <Image src="/assets/images/beep_logo-1774785208526.png" alt="beep" width={22} height={22} className="object-contain" />
                  <span className="text-white text-[14px] font-semibold" style={{ fontFamily: 'Geist, sans-serif' }}>beep</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-400 green-pulse" />
                  <span className="text-green-400 text-[11px] font-medium">live</span>
                </div>
              </div>

              {/* Chat area */}
              <div ref={chatRef} className="flex-1 overflow-y-auto px-3 py-3 space-y-2" style={{ height: 440, scrollbarWidth: 'none' }}>
                {CHAT_SEQUENCE.map(msg => {
                  if (!visibleMessages.includes(msg.id)) return null;
                  if (msg.type === 'typing') {
                    return (
                      <div key={msg.id} className="flex items-end gap-1 chat-bubble-enter">
                        <div className="bg-white/10 rounded-2xl rounded-bl-sm px-3 py-2.5 flex gap-1 items-center">
                          {[0, 1, 2].map(i => (
                            <span key={i} className="typing-dot w-1.5 h-1.5 rounded-full bg-white/60 inline-block" />
                          ))}
                        </div>
                      </div>
                    );
                  }
                  if (msg.type === 'user') {
                    return (
                      <div key={msg.id} className="flex justify-end chat-bubble-enter">
                        <div className="bg-[#5f40de] text-white text-[12px] rounded-2xl rounded-br-sm px-3 py-2 max-w-[200px] leading-relaxed" style={{ fontFamily: 'Geist, sans-serif' }}>
                          {msg.text}
                        </div>
                      </div>
                    );
                  }
                  if (msg.type === 'ai' && msg.card) {
                    return (
                      <div key={msg.id} className="chat-bubble-enter">
                        <div className="bg-white/8 border border-white/10 rounded-2xl p-3 max-w-[230px]">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white text-[13px] font-semibold">IndiGo 6E-201</span>
                            <span className="bg-green-500/20 text-green-400 text-[10px] px-2 py-0.5 rounded-full font-medium">Best value</span>
                          </div>
                          <div className="flex items-center gap-3 text-white/70 text-[11px]">
                            <span>DEL 9:00 AM</span>
                            <span className="text-white/30">--</span>
                            <span>BOM 11:10 AM</span>
                          </div>
                          <div className="mt-2 text-[#5f40de] text-[15px] font-bold">5,100</div>
                          <div className="text-white/40 text-[10px]">All inclusive · No hidden charges</div>
                        </div>
                      </div>
                    );
                  }
                  if (msg.type === 'system') {
                    return (
                      <div key={msg.id} className="chat-bubble-enter">
                        <div className="bg-white/6 border border-white/8 rounded-2xl rounded-bl-sm px-3 py-2 max-w-[230px]">
                          <p className="text-white/80 text-[11px] leading-relaxed" style={{ fontFamily: 'Geist, sans-serif' }}>{msg.text}</p>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>

              {/* Input bar */}
              <div className="absolute bottom-0 left-0 right-0 px-3 pb-5 pt-2 bg-gradient-to-t from-[#0d0c17] to-transparent">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePillTap}
                    className="flex-1 flex items-center justify-between bg-white/8 border border-white/10 rounded-full px-4 py-2.5 cursor-none"
                  >
                    <span className="text-white/40 text-[12px]" style={{ fontFamily: 'Geist, sans-serif' }}>
                      {typedText || 'What\'s your intent'}
                    </span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-white/30 flex-shrink-0">
                      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
                  {/* Voice button */}
                  <button
                    onClick={handleVoiceTap}
                    className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 cursor-none relative"
                  >
                    <div className="flex items-end gap-0.5 h-4">
                      {[0, 1, 2, 3].map(i => (
                        <div
                          key={i}
                          className="w-0.5 bg-white rounded-full wave-bar"
                          style={{ '--dur': `${0.6 + i * 0.15}s`, '--delay': `${i * 0.1}s` } as React.CSSProperties}
                        />
                      ))}
                    </div>
                  </button>
                </div>
              </div>

              {/* Keyboard overlay */}
              {showKeyboard && (
                <div className="absolute bottom-0 left-0 right-0 keyboard-slide-up z-30">
                  <div className="bg-[#1a1a2e] rounded-t-2xl p-2">
                    <div className="grid grid-cols-10 gap-1 mb-1">
                      {'qwertyuiop'.split('').map(k => (
                        <div key={k} className="bg-white/15 rounded text-white text-[10px] text-center py-1.5 font-medium">{k}</div>
                      ))}
                    </div>
                    <div className="grid grid-cols-9 gap-1 mb-1 px-3">
                      {'asdfghjkl'.split('').map(k => (
                        <div key={k} className="bg-white/15 rounded text-white text-[10px] text-center py-1.5 font-medium">{k}</div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1 px-6">
                      {'zxcvbnm'.split('').map(k => (
                        <div key={k} className="bg-white/15 rounded text-white text-[10px] text-center py-1.5 font-medium">{k}</div>
                      ))}
                    </div>
                    <div className="mt-1 bg-white/10 rounded-lg text-white/40 text-[11px] text-center py-2">space</div>
                  </div>
                </div>
              )}

              {/* Voice recording overlay */}
              {showVoice && (
                <div className="absolute inset-0 bg-[#0d0c17]/95 z-30 flex flex-col items-center justify-center">
                  {/* Pulsing red orb */}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-full bg-red-500/20 absolute inset-0 animate-ping" />
                    <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center relative">
                      <div className="flex items-end gap-1 h-6">
                        {[0,1,2,3,4].map(i => (
                          <div key={i} className="w-1 bg-white rounded-full wave-bar" style={{ '--dur': `${0.5 + i * 0.1}s`, '--delay': `${i * 0.08}s` } as React.CSSProperties} />
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Language display */}
                  <div className="h-8 flex items-center justify-center mb-3">
                    <span key={currentLang} className="lang-float text-white/80 text-[16px] font-medium" style={{ fontFamily: 'Geist, sans-serif' }}>
                      {LANGUAGES[currentLang]}
                    </span>
                  </div>
                  <p className="text-white/60 text-[12px] text-center" style={{ fontFamily: 'Geist, sans-serif' }}>
                    Listening... speak in any language
                  </p>
                </div>
              )}

              {/* AI Orb overlay */}
              {showOrb && (
                <div className="absolute inset-0 bg-[#0d0c17]/95 z-30 flex flex-col items-center justify-center">
                  <div className="relative mb-6">
                    {[1, 2, 3].map(i => (
                      <div
                        key={i}
                        className="absolute inset-0 rounded-full border border-blue-400/40 ring-expand"
                        style={{ animationDelay: `${i * 0.7}s` }}
                      />
                    ))}
                    <div className="w-20 h-20 rounded-full orb-breathe relative" style={{
                      background: 'radial-gradient(circle at 35% 35%, #60a5fa, #3b82f6, #1d4ed8)',
                      boxShadow: '0 0 40px rgba(96,165,250,0.6), 0 0 80px rgba(59,130,246,0.3)',
                    }} />
                  </div>
                  <p className="text-white text-[13px] text-center px-6 leading-relaxed" style={{ fontFamily: 'Geist, sans-serif' }}>
                    Got it. IndiGo, 5100 rupees, departing 9 AM. Booked. Your ticket is on your email.
                  </p>
                </div>
              )}
            </div>

            {/* Glow under phone */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-48 h-12 rounded-full blur-2xl" style={{ background: 'rgba(95,64,222,0.2)' }} />
          </div>
        </div>
      </div>
    </section>
  );
}
