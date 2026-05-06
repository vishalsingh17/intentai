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
  { id: 1, type: 'user', text: 'Book me a flight from Delhi to Mumbai tomorrow, under ₹7,000' },
  { id: 2, type: 'typing' },
  { id: 3, type: 'ai', text: 'Found the best option for you.', card: true },
  { id: 4, type: 'user', text: 'Book it.' },
  { id: 5, type: 'system', text: 'Booking confirmed · IndiGo 6E-201 · ₹5,100 · Your ticket is on your email. Do not forget your ID.' },
  { id: 6, type: 'user', text: 'Also block my calendar and set a reminder.' },
  { id: 7, type: 'system', text: 'Done · Calendar blocked · Reminder set.' },
];

const LANGUAGES = ['Hindi', 'Tamil', 'French', 'German', 'Malayalam', 'Bengali', 'Urdu', 'Arabic', 'Japanese', 'Korean', 'Spanish', 'Portuguese', 'Swahili', 'Thai', 'Vietnamese', 'Turkish', 'Greek', 'Hebrew', 'Punjabi', 'Telugu'];

type VoiceStep = 'idle' | 'human1' | 'ai1' | 'human2' | 'ai2' | 'done';

const VOICE_SCRIPT = {
  human1: 'Book me a flight from Delhi to Mumbai under seven thousand rupees for tomorrow.',
  ai1: 'Got it, finding flights for you. I found the best option — IndiGo 6E-511, five thousand one hundred rupees, departing 9 AM. Shall I book?',
  human2: 'Go ahead.',
  ai2: 'Flight has been booked. Ticket is on your email. Don\'t forget to carry your ID.',
};

export default function BeepHero() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [chatCycle, setChatCycle] = useState(0);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const keyboardShownRef = useRef(false);

  // In-phone voice orb state
  const [showInPhoneOrb, setShowInPhoneOrb] = useState(false);
  const [voiceStep, setVoiceStep] = useState<VoiceStep>('idle');
  const [displayText, setDisplayText] = useState('');
  const [currentLang, setCurrentLang] = useState(0);
  const langIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const voiceTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const typeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const chatRef = useRef<HTMLDivElement>(null);

  // Auto-play and loop chat animation
  useEffect(() => {
    let timers: ReturnType<typeof setTimeout>[] = [];

    const runCycle = () => {
      setVisibleMessages([]);
      setShowKeyboard(false);

      const delays = [600, 1400, 2800, 4000, 4800, 5800, 6800];

      // Keyboard: only show once ever — during the first user message of the very first cycle
      if (!keyboardShownRef.current) {
        timers.push(setTimeout(() => {
          setShowKeyboard(true);
        }, 200));
        timers.push(setTimeout(() => {
          setShowKeyboard(false);
          keyboardShownRef.current = true;
        }, 1200));
      }

      timers = [
        ...timers,
        ...CHAT_SEQUENCE.map((msg, i) =>
          setTimeout(() => {
            setVisibleMessages(prev => {
              if (msg.type === 'typing') return [...prev, msg.id];
              const filtered = prev.filter(id => {
                const m = CHAT_SEQUENCE.find(m => m.id === id);
                return m?.type !== 'typing';
              });
              return [...filtered, msg.id];
            });
            if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
          }, delays[i])
        ),
      ];

      const loopTimer = setTimeout(() => {
        setChatCycle(c => c + 1);
      }, 10000);
      timers.push(loopTimer);
    };

    runCycle();
    return () => timers.forEach(clearTimeout);
  }, [chatCycle]);

  // Language cycling when orb is active
  useEffect(() => {
    if (showInPhoneOrb) {
      langIntervalRef.current = setInterval(() => {
        setCurrentLang(prev => (prev + 1) % LANGUAGES.length);
      }, 500);
    } else {
      if (langIntervalRef.current) clearInterval(langIntervalRef.current);
    }
    return () => { if (langIntervalRef.current) clearInterval(langIntervalRef.current); };
  }, [showInPhoneOrb]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      voiceTimersRef.current.forEach(clearTimeout);
      if (typeIntervalRef.current) clearInterval(typeIntervalRef.current);
      if (typeof window !== 'undefined') window.speechSynthesis?.cancel();
    };
  }, []);

  const speakText = (text: string, lang: string, rate: number, pitch: number, onEnd: () => void) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      const t = setTimeout(onEnd, text.length * 55);
      voiceTimersRef.current.push(t);
      return;
    }
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = lang;
    utter.rate = rate;
    utter.pitch = pitch;
    const voices = window.speechSynthesis.getVoices();
    if (lang === 'en-IN') {
      const v = voices.find(v => v.lang === 'en-IN') || voices.find(v => v.name.toLowerCase().includes('india'));
      if (v) utter.voice = v;
    } else {
      const v = voices.find(v => v.lang === 'en-US' && v.name.toLowerCase().includes('google')) || voices.find(v => v.lang === 'en-US');
      if (v) utter.voice = v;
    }
    utter.onend = onEnd;
    utter.onerror = onEnd;
    window.speechSynthesis.speak(utter);
  };

  const typeText = (text: string, speed: number, onDone: () => void) => {
    if (typeIntervalRef.current) clearInterval(typeIntervalRef.current);
    setDisplayText('');
    let i = 0;
    typeIntervalRef.current = setInterval(() => {
      i++;
      setDisplayText(text.slice(0, i));
      if (i >= text.length) {
        if (typeIntervalRef.current) clearInterval(typeIntervalRef.current);
        onDone();
      }
    }, speed);
  };

  const runVoiceConversation = () => {
    voiceTimersRef.current.forEach(clearTimeout);
    voiceTimersRef.current = [];

    setVoiceStep('human1');
    typeText(VOICE_SCRIPT.human1, 38, () => {
      speakText(VOICE_SCRIPT.human1, 'en-IN', 0.95, 1.1, () => {
        const t1 = setTimeout(() => {
          setVoiceStep('ai1');
          typeText(VOICE_SCRIPT.ai1, 30, () => {
            speakText(VOICE_SCRIPT.ai1, 'en-US', 0.88, 0.85, () => {
              const t2 = setTimeout(() => {
                setVoiceStep('human2');
                typeText(VOICE_SCRIPT.human2, 60, () => {
                  speakText(VOICE_SCRIPT.human2, 'en-IN', 0.95, 1.1, () => {
                    const t3 = setTimeout(() => {
                      setVoiceStep('ai2');
                      typeText(VOICE_SCRIPT.ai2, 32, () => {
                        speakText(VOICE_SCRIPT.ai2, 'en-US', 0.88, 0.85, () => {
                          const t4 = setTimeout(() => {
                            setVoiceStep('done');
                            const t5 = setTimeout(() => {
                              setShowInPhoneOrb(false);
                              setVoiceStep('idle');
                              setDisplayText('');
                            }, 1800);
                            voiceTimersRef.current.push(t5);
                          }, 400);
                          voiceTimersRef.current.push(t4);
                        });
                      });
                    }, 500);
                    voiceTimersRef.current.push(t3);
                  });
                });
              }, 600);
              voiceTimersRef.current.push(t2);
            });
          });
        }, 400);
        voiceTimersRef.current.push(t1);
      });
    });
  };

  const handleVoiceButtonClick = () => {
    if (showInPhoneOrb) return;
    setShowInPhoneOrb(true);
    setVoiceStep('idle');
    setDisplayText('');
    setCurrentLang(0);
    const t = setTimeout(() => {
      runVoiceConversation();
    }, 700);
    voiceTimersRef.current.push(t);
  };

  const handleCloseOrb = () => {
    voiceTimersRef.current.forEach(clearTimeout);
    voiceTimersRef.current = [];
    if (typeIntervalRef.current) clearInterval(typeIntervalRef.current);
    if (typeof window !== 'undefined') window.speechSynthesis?.cancel();
    setShowInPhoneOrb(false);
    setVoiceStep('idle');
    setDisplayText('');
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

  const isHumanStep = voiceStep === 'human1' || voiceStep === 'human2';
  const isAIStep = voiceStep === 'ai1' || voiceStep === 'ai2';

  const orbBg = isHumanStep
    ? 'radial-gradient(circle at 35% 35%, #f0a87c, #d4845a, #8b4513)'
    : 'radial-gradient(circle at 35% 35%, #7c5ff0, #5f40de, #1a0a6e)';
  const orbShadow = isHumanStep
    ? '0 0 40px rgba(212,132,90,0.6), 0 0 80px rgba(212,132,90,0.25)'
    : '0 0 40px rgba(95,64,222,0.7), 0 0 80px rgba(95,64,222,0.3)';

  return (
    <section id="hero" className="min-h-screen pt-24 pb-16 px-6 md:px-12 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #e8e5f5 0%, #e2dff0 50%, #ddd9ee 100%)' }}>
      <div className="absolute top-20 right-20 w-96 h-96 rounded-full opacity-25 pointer-events-none float-element" style={{ background: 'radial-gradient(circle, rgba(95,64,222,0.35) 0%, transparent 70%)', '--dur': '7s', '--delay': '0s' } as React.CSSProperties} />
      <div className="absolute bottom-32 left-10 w-64 h-64 rounded-full opacity-20 pointer-events-none float-element" style={{ background: 'radial-gradient(circle, rgba(95,64,222,0.3) 0%, transparent 70%)', '--dur': '9s', '--delay': '2s' } as React.CSSProperties} />
      <div className="absolute top-1/2 left-1/3 w-48 h-48 rounded-full opacity-15 pointer-events-none float-element" style={{ background: 'radial-gradient(circle, rgba(95,64,222,0.25) 0%, transparent 70%)', '--dur': '11s', '--delay': '1s' } as React.CSSProperties} />

      <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16 min-h-[calc(100vh-6rem)] relative z-10">
        {/* Left column */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-500 green-pulse flex-shrink-0" />
            <span className="text-[13px] text-[#5a5a70] font-medium" style={{ fontFamily: 'Geist, sans-serif' }}>
              Launching May 2026 · Starting with travel
            </span>
          </div>

          <h1 className="font-display text-[80px] md:text-[96px] leading-[0.92] tracking-wide text-[#0a0a0a] mb-2">
            AI Commerce
          </h1>
          <div className="mb-6">
            <span className="text-[72px] md:text-[88px] leading-[0.95] text-[#5f40de]" style={{ fontFamily: 'Instrument Serif', fontStyle: 'italic' }}>
              for real life.
            </span>
          </div>

          <p className="text-[17px] text-[#3a3a4a] leading-relaxed max-w-[480px] mb-8" style={{ fontFamily: 'Geist, sans-serif' }}>
            Tell beep what you need. Beep finds the best option, decides and completes checkout powered by real agentic payment infrastructure. Not a search. An execution.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-[440px]">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                suppressHydrationWarning
                className="flex-1 px-4 py-3 rounded-full border border-[rgba(95,64,222,0.2)] text-[#0a0a0a] placeholder-[#9999aa] text-[14px] focus:outline-none focus:border-[#5f40de] focus:ring-2 focus:ring-[rgba(95,64,222,0.15)] transition-all glass-card"
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
        <div className="flex-shrink-0 flex items-center justify-center float-element" style={{ '--dur': '6s', '--delay': '0.5s' } as React.CSSProperties}>
          <div className="relative" style={{ width: 300, height: 640 }}>
            <div
              className="relative w-full h-full rounded-[44px] overflow-hidden shadow-2xl"
              style={{ background: '#0d0c17', border: '2px solid rgba(255,255,255,0.12)', boxShadow: '0 32px 80px rgba(95,64,222,0.3), 0 0 0 1px rgba(95,64,222,0.15)' }}
            >
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#0d0c17] rounded-b-2xl z-20" />

              {/* App bar */}
              <div className="flex items-center justify-between px-4 pt-8 pb-3 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <Image src="/assets/images/beepAI___LOGO-1778057442337.jpg" alt="beep" width={22} height={22} className="object-contain rounded-full" />
                  <span className="text-white text-[14px] font-semibold" style={{ fontFamily: 'Geist, sans-serif' }}>beep</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-400 green-pulse" />
                </div>
              </div>

              {/* Chat area — hidden when orb is open */}
              {!showInPhoneOrb && (
                <div ref={chatRef} className="overflow-y-auto px-3 py-3 space-y-2" style={{ height: 360, scrollbarWidth: 'none' }}>
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
                            <div className="mt-2 text-[#5f40de] text-[15px] font-bold">₹5,100</div>
                            <div className="text-white/40 text-[10px]">All inclusive · No hidden charges</div>
                          </div>
                        </div>
                      );
                    }
                    if (msg.type === 'system') {
                      return (
                        <div key={msg.id} className="chat-bubble-enter">
                          <div className="bg-white/5 border border-white/8 rounded-xl px-3 py-2 max-w-[230px]">
                            <p className="text-white/70 text-[11px] leading-relaxed" style={{ fontFamily: 'Geist, sans-serif' }}>{msg.text}</p>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              )}

              {/* ── In-phone AI Orb ── fills chat area when active */}
              {showInPhoneOrb && (
                <div
                  className="absolute left-0 right-0 flex flex-col items-center justify-center overflow-hidden"
                  style={{ top: 72, bottom: 80, background: 'linear-gradient(180deg, #06050e 0%, #0d0c17 100%)' }}
                >
                  {/* Close button */}
                  <button
                    onClick={handleCloseOrb}
                    suppressHydrationWarning
                    className="absolute top-2 right-3 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white/50 z-10"
                    style={{ fontSize: 14, lineHeight: 1 }}
                  >
                    ×
                  </button>

                  {/* Floating language names around orb */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {LANGUAGES.slice(0, 12).map((lang, i) => {
                      const angle = (i / 12) * 360;
                      const radius = 90 + (i % 3) * 20;
                      const x = 50 + radius * Math.cos((angle * Math.PI) / 180) * 0.36;
                      const y = 50 + radius * Math.sin((angle * Math.PI) / 180) * 0.36;
                      const isActive = LANGUAGES[currentLang] === lang;
                      return (
                        <span
                          key={lang}
                          className="absolute transition-all duration-500"
                          style={{
                            left: `${x}%`,
                            top: `${y}%`,
                            transform: 'translate(-50%, -50%)',
                            color: isActive
                              ? (isHumanStep ? '#f0a87c' : '#a78bfa')
                              : 'rgba(255,255,255,0.15)',
                            fontFamily: 'Geist, sans-serif',
                            fontWeight: isActive ? 700 : 400,
                            fontSize: isActive ? '9px' : '7.5px',
                          }}
                        >
                          {lang}
                        </span>
                      );
                    })}
                  </div>

                  {/* Central orb */}
                  <div className="relative flex items-center justify-center mb-3">
                    {[1, 2, 3].map(i => (
                      <div
                        key={i}
                        className="absolute rounded-full ring-expand"
                        style={{
                          width: 52 + i * 24,
                          height: 52 + i * 24,
                          border: `1px solid ${isHumanStep ? 'rgba(212,132,90,0.3)' : 'rgba(95,64,222,0.3)'}`,
                          animationDelay: `${i * 0.55}s`,
                          transition: 'border-color 0.8s ease',
                        }}
                      />
                    ))}
                    <div
                      className="w-16 h-16 rounded-full orb-breathe relative flex items-center justify-center"
                      style={{
                        background: orbBg,
                        boxShadow: orbShadow,
                        transition: 'background 0.8s ease, box-shadow 0.8s ease',
                      }}
                    >
                      <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.35), transparent 60%)' }} />
                      <div className="flex items-center gap-0.5 relative z-10">
                        {[0,1,2,3,4].map(i => (
                          <div
                            key={i}
                            className="rounded-full wave-bar"
                            style={{
                              width: 2,
                              background: 'rgba(255,255,255,0.85)',
                              '--dur': `${0.4 + i * 0.09}s`,
                              '--delay': `${i * 0.09}s`,
                            } as React.CSSProperties}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Speaker label */}
                  <div className="mb-2 h-4 flex items-center justify-center">
                    {voiceStep === 'idle' && (
                      <span className="text-[9px] tracking-[0.15em] uppercase text-white/40" style={{ fontFamily: 'Geist, sans-serif' }}>Starting...</span>
                    )}
                    {isHumanStep && (
                      <span className="text-[9px] tracking-[0.15em] uppercase font-semibold" style={{ fontFamily: 'Geist, sans-serif', color: '#f0a87c' }}>You · Speaking</span>
                    )}
                    {isAIStep && (
                      <span className="text-[9px] tracking-[0.15em] uppercase font-semibold" style={{ fontFamily: 'Geist, sans-serif', color: '#a78bfa' }}>beep AI · Responding</span>
                    )}
                    {voiceStep === 'done' && (
                      <span className="text-[9px] tracking-[0.15em] uppercase font-semibold text-green-400" style={{ fontFamily: 'Geist, sans-serif' }}>Booked</span>
                    )}
                  </div>

                  {/* Transcript */}
                  <div className="px-4 text-center" style={{ minHeight: 56, maxWidth: 240 }}>
                    {displayText ? (
                      <p
                        className="text-[11px] leading-relaxed"
                        style={{
                          fontFamily: 'Instrument Serif',
                          fontStyle: 'italic',
                          color: isHumanStep ? 'rgba(240,168,124,0.9)' : 'rgba(167,139,250,0.9)',
                        }}
                      >
                        &ldquo;{displayText}<span className="animate-pulse">|</span>&rdquo;
                      </p>
                    ) : null}
                  </div>

                  {/* Vernacular badge */}
                  <div className="mt-2 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5f40de]" />
                    <span className="text-[8px] text-white/30 tracking-[0.12em] uppercase" style={{ fontFamily: 'Geist, sans-serif' }}>Any language on earth</span>
                  </div>
                </div>
              )}

              {/* ── Bottom input bar + keyboard ── */}
              <div className="absolute bottom-0 left-0 right-0 z-10">
                <div className="px-3 pb-2 pt-2 bg-gradient-to-t from-[#0d0c17] via-[#0d0c17] to-transparent">
                  <div className="flex items-center gap-2">
                    {/* Pill input */}
                    <div className="flex-1 flex items-center justify-between bg-white/8 border border-white/10 rounded-full px-3 py-2">
                      <span className="text-white/40 text-[11px]" style={{ fontFamily: 'Geist, sans-serif' }}>What&apos;s your intent</span>
                      <svg className="w-3.5 h-3.5 text-white/30 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                        <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                      </svg>
                    </div>

                    {/* AI Voice button — extreme right of input pill */}
                    <button
                      onClick={handleVoiceButtonClick}
                      suppressHydrationWarning
                      className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-transform active:scale-95"
                      style={{
                        background: isHumanStep
                          ? 'radial-gradient(circle at 35% 35%, #f0a87c, #d4845a, #8b4513)'
                          : 'radial-gradient(circle at 35% 35%, #7c5ff0, #5f40de, #1a0a6e)',
                        boxShadow: isHumanStep
                          ? '0 0 12px rgba(212,132,90,0.7), 0 0 24px rgba(212,132,90,0.3)'
                          : '0 0 12px rgba(95,64,222,0.6), 0 0 24px rgba(95,64,222,0.3)',
                        transition: 'background 0.5s ease, box-shadow 0.5s ease',
                      }}
                    >
                      <div className="flex gap-0.5 items-center">
                        {[0,1,2].map(i => (
                          <div
                            key={i}
                            className="rounded-full"
                            style={{
                              width: 2,
                              height: showInPhoneOrb ? [10, 14, 10][i] : [8, 12, 8][i],
                              background: 'rgba(255,255,255,0.9)',
                              transition: 'height 0.3s ease',
                            }}
                          />
                        ))}
                      </div>
                    </button>
                  </div>
                </div>

                {/* Keyboard — slides up only once (first user message), never again */}
                <div
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{ maxHeight: showKeyboard ? '160px' : '0px', opacity: showKeyboard ? 1 : 0 }}
                >
                  <div className="bg-[#1a1828] px-1.5 pb-2 pt-1.5">
                    <div className="flex gap-1 mb-1 justify-center">
                      {['q','w','e','r','t','y','u','i','o','p'].map((k) => (
                        <div key={k} className="flex-1 bg-[#2d2b3d] rounded text-white/50 text-[9px] text-center py-1.5 font-medium" style={{ fontFamily: 'Geist, sans-serif' }}>{k}</div>
                      ))}
                    </div>
                    <div className="flex gap-1 mb-1 justify-center px-2">
                      {['a','s','d','f','g','h','j','k','l'].map((k) => (
                        <div key={k} className="flex-1 bg-[#2d2b3d] rounded text-white/50 text-[9px] text-center py-1.5 font-medium" style={{ fontFamily: 'Geist, sans-serif' }}>{k}</div>
                      ))}
                    </div>
                    <div className="flex gap-1 mb-1 justify-center">
                      <div className="bg-[#3d3b50] rounded text-white/40 text-[8px] text-center py-1.5 px-2">⇧</div>
                      {['z','x','c','v','b','n','m'].map((k) => (
                        <div key={k} className="flex-1 bg-[#2d2b3d] rounded text-white/50 text-[9px] text-center py-1.5 font-medium" style={{ fontFamily: 'Geist, sans-serif' }}>{k}</div>
                      ))}
                      <div className="bg-[#3d3b50] rounded text-white/40 text-[8px] text-center py-1.5 px-2">⌫</div>
                    </div>
                    <div className="flex gap-1 justify-center">
                      <div className="bg-[#3d3b50] rounded text-white/40 text-[8px] text-center py-1.5 px-2">123</div>
                      <div className="flex-1 bg-[#2d2b3d] rounded text-white/30 text-[9px] text-center py-1.5">space</div>
                      <div className="bg-[#5f40de] rounded text-white text-[8px] text-center py-1.5 px-2">return</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
