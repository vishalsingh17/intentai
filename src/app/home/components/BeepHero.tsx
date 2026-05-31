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
  { id: 5, type: 'system', text: 'Booking confirmed · IndiGo 6E-201 · ₹5,100 · Your ticket is on your email.' },
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

  const [showInPhoneOrb, setShowInPhoneOrb] = useState(false);
  const [voiceStep, setVoiceStep] = useState<VoiceStep>('idle');
  const [displayText, setDisplayText] = useState('');
  const [currentLang, setCurrentLang] = useState(0);
  const langIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const voiceTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const typeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timers: ReturnType<typeof setTimeout>[] = [];
    const runCycle = () => {
      setVisibleMessages([]);
      setShowKeyboard(false);
      const delays = [600, 1400, 2800, 4000, 4800, 5800, 6800];
      if (!keyboardShownRef.current) {
        timers.push(setTimeout(() => setShowKeyboard(true), 200));
        timers.push(setTimeout(() => { setShowKeyboard(false); keyboardShownRef.current = true; }, 1200));
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
      timers.push(setTimeout(() => setChatCycle(c => c + 1), 10000));
    };
    runCycle();
    return () => timers.forEach(clearTimeout);
  }, [chatCycle]);

  useEffect(() => {
    if (showInPhoneOrb) {
      langIntervalRef.current = setInterval(() => setCurrentLang(prev => (prev + 1) % LANGUAGES.length), 500);
    } else {
      if (langIntervalRef.current) clearInterval(langIntervalRef.current);
    }
    return () => { if (langIntervalRef.current) clearInterval(langIntervalRef.current); };
  }, [showInPhoneOrb]);

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
    utter.lang = lang; utter.rate = rate; utter.pitch = pitch;
    const voices = window.speechSynthesis.getVoices();
    if (lang === 'en-IN') {
      const v = voices.find(v => v.lang === 'en-IN') || voices.find(v => v.name.toLowerCase().includes('india'));
      if (v) utter.voice = v;
    } else {
      const v = voices.find(v => v.lang === 'en-US' && v.name.toLowerCase().includes('google')) || voices.find(v => v.lang === 'en-US');
      if (v) utter.voice = v;
    }
    utter.onend = onEnd; utter.onerror = onEnd;
    window.speechSynthesis.speak(utter);
  };

  const typeText = (text: string, speed: number, onDone: () => void) => {
    if (typeIntervalRef.current) clearInterval(typeIntervalRef.current);
    setDisplayText('');
    let i = 0;
    typeIntervalRef.current = setInterval(() => {
      i++;
      setDisplayText(text.slice(0, i));
      if (i >= text.length) { if (typeIntervalRef.current) clearInterval(typeIntervalRef.current); onDone(); }
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
                            const t5 = setTimeout(() => { setShowInPhoneOrb(false); setVoiceStep('idle'); setDisplayText(''); }, 1800);
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
    setShowInPhoneOrb(true); setVoiceStep('idle'); setDisplayText(''); setCurrentLang(0);
    const t = setTimeout(() => runVoiceConversation(), 700);
    voiceTimersRef.current.push(t);
  };

  const handleCloseOrb = () => {
    voiceTimersRef.current.forEach(clearTimeout);
    voiceTimersRef.current = [];
    if (typeIntervalRef.current) clearInterval(typeIntervalRef.current);
    if (typeof window !== 'undefined') window.speechSynthesis?.cancel();
    setShowInPhoneOrb(false); setVoiceStep('idle'); setDisplayText('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const supabase = createClient();
      await supabase.from('early_access_signups').insert({ email, source: 'hero' });
      setSubmitted(true);
    } catch { setSubmitted(true); }
    finally { setLoading(false); }
  };

  const isHumanStep = voiceStep === 'human1' || voiceStep === 'human2';
  const isAIStep = voiceStep === 'ai1' || voiceStep === 'ai2';
  const orbBg = isHumanStep
    ? 'radial-gradient(circle at 35% 35%, #f0a87c, #d4845a, #8b4513)'
    : 'radial-gradient(circle at 35% 35%, #2a4d8f, #1c3561, #0f1f3d)';
  const orbShadow = isHumanStep
    ? '0 0 40px rgba(212,132,90,0.6), 0 0 80px rgba(212,132,90,0.25)'
    : '0 0 40px rgba(28,53,97,0.7), 0 0 80px rgba(28,53,97,0.3)';

  return (
    <section id="hero" className="min-h-screen pt-24 pb-16 px-6 md:px-12 relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #ffffff 0%, #f4f7fb 50%, #e8eef7 100%)' }}>
      {/* Subtle background shapes */}
      <div className="absolute top-20 right-20 w-96 h-96 rounded-full opacity-20 pointer-events-none float-element" style={{ background: 'radial-gradient(circle, rgba(197,214,234,0.6) 0%, transparent 70%)', '--dur': '7s', '--delay': '0s' } as React.CSSProperties} />
      <div className="absolute bottom-32 left-10 w-64 h-64 rounded-full opacity-15 pointer-events-none float-element" style={{ background: 'radial-gradient(circle, rgba(28,53,97,0.15) 0%, transparent 70%)', '--dur': '9s', '--delay': '2s' } as React.CSSProperties} />

      <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16 min-h-[calc(100vh-6rem)] relative z-10">
        {/* Left column */}
        <div className="flex-1 flex flex-col justify-center">
          {/* Badge */}
          <div className="flex items-center gap-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-green-500 green-pulse flex-shrink-0" />
            <span className="text-[13px] font-medium" style={{ fontFamily: "'Google Sans', sans-serif", color: '#6b7fa0' }}>
              Launching 2026 · Starting with travel
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-[72px] md:text-[88px] leading-[0.92] mb-3"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', color: '#1c3561', fontWeight: 600 }}
          >
            It&apos;s Not Just
          </h1>
          <h1
            className="text-[72px] md:text-[88px] leading-[0.92] mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', color: '#1c3561', fontWeight: 600 }}
          >
            A Checkout.
          </h1>
          <div className="mb-6">
            <span
              className="text-[40px] md:text-[48px] leading-[1.1]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', color: '#c5d6ea', fontWeight: 500 }}
            >
              It&apos;s Engineered Intelligence.
            </span>
          </div>

          <p className="text-[17px] leading-relaxed max-w-[480px] mb-10" style={{ fontFamily: "'Google Sans', sans-serif", color: '#4a5f80' }}>
            Beep makes every payment moment smarter — faster checkout, fewer drop-offs, zero friction. Tell beep what you need. Beep finds, decides, and completes the transaction.
          </p>

          {/* Trust strip inline */}
          <div className="flex items-center gap-3 mb-8">
            <span className="text-[11px] tracking-[0.15em] uppercase font-medium" style={{ fontFamily: "'Google Sans', sans-serif", color: '#6b7fa0' }}>Secured &amp; Powered by</span>
            <Image src="/assets/images/razorpay-icon-1774785591823.png" alt="Razorpay" width={90} height={26} className="object-contain opacity-70" />
            <Image src="/assets/images/image-1778062428389.png" alt="UPI Reserve Pay" width={100} height={30} className="object-contain opacity-70" />
          </div>

          {/* Waitlist form */}
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-[440px]">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                suppressHydrationWarning
                className="flex-1 px-5 py-3.5 rounded-lg border text-[14px] focus:outline-none transition-all"
                style={{
                  fontFamily: "'Google Sans', sans-serif",
                  borderColor: 'rgba(28,53,97,0.2)',
                  color: '#1c3561',
                  background: '#ffffff',
                }}
                onFocus={e => { e.target.style.borderColor = '#1c3561'; e.target.style.boxShadow = '0 0 0 3px rgba(28,53,97,0.1)'; }}
                onBlur={e => { e.target.style.borderColor = 'rgba(28,53,97,0.2)'; e.target.style.boxShadow = 'none'; }}
              />
              <button
                type="submit"
                disabled={loading}
                suppressHydrationWarning
                className="btn-primary px-6 py-3.5 text-[14px] whitespace-nowrap cursor-none"
              >
                {loading ? 'Joining...' : 'Join the Waitlist'}
              </button>
            </form>
          ) : (
            <div className="flex items-center gap-2 font-medium text-[15px]" style={{ color: '#1c3561' }}>
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs" style={{ background: '#1c3561' }}>✓</span>
              You are on the list. We will be in touch.
            </div>
          )}
          <p className="text-[12px] mt-2" style={{ fontFamily: "'Google Sans', sans-serif", color: '#9aafcc' }}>No spam. Just signal. Unsubscribe anytime.</p>
        </div>

        {/* Right column — iPhone mockup */}
        <div className="flex-shrink-0 flex items-center justify-center float-element" style={{ '--dur': '6s', '--delay': '0.5s' } as React.CSSProperties}>
          <div className="relative" style={{ width: 300, height: 640 }}>
            <div
              className="relative w-full h-full rounded-[44px] overflow-hidden shadow-2xl"
              style={{ background: '#0f1f3d', border: '2px solid rgba(197,214,234,0.2)', boxShadow: '0 32px 80px rgba(28,53,97,0.35), 0 0 0 1px rgba(197,214,234,0.1)' }}
            >
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#0f1f3d] rounded-b-2xl z-20" />

              {/* App bar */}
              <div className="flex items-center justify-between px-4 pt-8 pb-3 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <Image src="/assets/images/beepAI___LOGO-1778057442337.jpg" alt="BeepAi" width={22} height={22} className="object-contain rounded-full" />
                  <span className="text-white text-[14px] font-semibold" style={{ fontFamily: "'Google Sans', sans-serif" }}>BeepAi</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-400 green-pulse" />
                </div>
              </div>

              {/* Chat area */}
              {!showInPhoneOrb && (
                <div ref={chatRef} className="overflow-y-auto px-3 py-3 space-y-2" style={{ height: 360, scrollbarWidth: 'none' }}>
                  {CHAT_SEQUENCE.map(msg => {
                    if (!visibleMessages.includes(msg.id)) return null;
                    if (msg.type === 'typing') {
                      return (
                        <div key={msg.id} className="flex items-end gap-1 chat-bubble-enter">
                          <div className="bg-white/10 rounded-2xl rounded-bl-sm px-3 py-2.5 flex gap-1 items-center">
                            {[0, 1, 2].map(i => <span key={i} className="typing-dot w-1.5 h-1.5 rounded-full bg-white/60 inline-block" />)}
                          </div>
                        </div>
                      );
                    }
                    if (msg.type === 'user') {
                      return (
                        <div key={msg.id} className="flex justify-end chat-bubble-enter">
                          <div className="text-white text-[12px] rounded-2xl rounded-br-sm px-3 py-2 max-w-[200px] leading-relaxed" style={{ background: '#1c3561', fontFamily: "'Google Sans', sans-serif" }}>
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
                            <div className="mt-2 text-[#c5d6ea] text-[15px] font-bold">₹5,100</div>
                            <div className="text-white/40 text-[10px]">All inclusive · No hidden charges</div>
                          </div>
                        </div>
                      );
                    }
                    if (msg.type === 'system') {
                      return (
                        <div key={msg.id} className="chat-bubble-enter">
                          <div className="bg-white/5 border border-white/8 rounded-xl px-3 py-2 max-w-[230px]">
                            <p className="text-white/70 text-[11px] leading-relaxed" style={{ fontFamily: "'Google Sans', sans-serif" }}>{msg.text}</p>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              )}

              {/* In-phone AI Orb */}
              {showInPhoneOrb && (
                <div
                  className="absolute left-0 right-0 flex flex-col items-center justify-center overflow-hidden"
                  style={{ top: 72, bottom: 80, background: 'linear-gradient(180deg, #0f1f3d 0%, #1c3561 100%)' }}
                >
                  <button
                    onClick={handleCloseOrb}
                    suppressHydrationWarning
                    className="absolute top-2 right-3 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white/50 z-10"
                    style={{ fontSize: 14, lineHeight: 1 }}
                  >
                    ×
                  </button>
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {LANGUAGES.slice(0, 12).map((lang, i) => {
                      const angle = (i / 12) * 360;
                      const radius = 90 + (i % 3) * 20;
                      const x = 50 + radius * Math.cos((angle * Math.PI) / 180) * 0.36;
                      const y = 50 + radius * Math.sin((angle * Math.PI) / 180) * 0.36;
                      const isActive = LANGUAGES[currentLang] === lang;
                      return (
                        <span key={lang} className="absolute transition-all duration-500" style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)', color: isActive ? (isHumanStep ? '#f0a87c' : '#c5d6ea') : 'rgba(255,255,255,0.15)', fontFamily: "'Google Sans', sans-serif", fontWeight: isActive ? 700 : 400, fontSize: isActive ? '9px' : '7.5px' }}>
                          {lang}
                        </span>
                      );
                    })}
                  </div>
                  <div className="relative flex items-center justify-center mb-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="absolute rounded-full ring-expand" style={{ width: 52 + i * 24, height: 52 + i * 24, border: `1px solid ${isHumanStep ? 'rgba(212,132,90,0.3)' : 'rgba(197,214,234,0.3)'}`, animationDelay: `${i * 0.55}s`, transition: 'border-color 0.8s ease' }} />
                    ))}
                    <div className="w-16 h-16 rounded-full orb-breathe relative flex items-center justify-center" style={{ background: orbBg, boxShadow: orbShadow, transition: 'background 0.8s ease, box-shadow 0.8s ease' }}>
                      <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.35), transparent 60%)' }} />
                      <div className="flex items-center gap-0.5 relative z-10">
                        {[0,1,2,3,4].map(i => (
                          <div key={i} className="rounded-full wave-bar" style={{ width: 2, background: 'rgba(255,255,255,0.85)', '--dur': `${0.4 + i * 0.09}s`, '--delay': `${i * 0.09}s` } as React.CSSProperties} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mb-2 h-4 flex items-center justify-center">
                    {voiceStep === 'idle' && <span className="text-[9px] tracking-[0.15em] uppercase text-white/40" style={{ fontFamily: "'Google Sans', sans-serif" }}>Starting...</span>}
                    {isHumanStep && <span className="text-[9px] tracking-[0.15em] uppercase font-semibold" style={{ fontFamily: "'Google Sans', sans-serif", color: '#f0a87c' }}>You · Speaking</span>}
                    {isAIStep && <span className="text-[9px] tracking-[0.15em] uppercase font-semibold" style={{ fontFamily: "'Google Sans', sans-serif", color: '#c5d6ea' }}>BeepAi · Responding</span>}
                    {voiceStep === 'done' && <span className="text-[9px] tracking-[0.15em] uppercase font-semibold text-green-400" style={{ fontFamily: "'Google Sans', sans-serif" }}>Booked</span>}
                  </div>
                  <div className="px-4 text-center" style={{ minHeight: 56, maxWidth: 240 }}>
                    {displayText ? (
                      <p className="text-[11px] leading-relaxed" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', color: isHumanStep ? 'rgba(240,168,124,0.9)' : 'rgba(197,214,234,0.9)' }}>
                        &ldquo;{displayText}<span className="animate-pulse">|</span>&rdquo;
                      </p>
                    ) : null}
                  </div>
                  <div className="mt-2 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c5d6ea]" />
                    <span className="text-[8px] text-white/30 tracking-[0.12em] uppercase" style={{ fontFamily: "'Google Sans', sans-serif" }}>Any language on earth</span>
                  </div>
                </div>
              )}

              {/* Bottom input bar */}
              <div className="absolute bottom-0 left-0 right-0 z-10">
                <div className="px-3 pb-2 pt-2 bg-gradient-to-t from-[#0f1f3d] via-[#0f1f3d] to-transparent">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 flex items-center justify-between bg-white/8 border border-white/10 rounded-full px-3 py-2">
                      <span className="text-white/40 text-[11px]" style={{ fontFamily: "'Google Sans', sans-serif" }}>What&apos;s your intent</span>
                      <svg className="w-3.5 h-3.5 text-white/30 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                        <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                      </svg>
                    </div>
                    <button
                      onClick={handleVoiceButtonClick}
                      suppressHydrationWarning
                      className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-transform active:scale-95"
                      style={{ background: isHumanStep ? 'radial-gradient(circle at 35% 35%, #f0a87c, #d4845a, #8b4513)' : 'radial-gradient(circle at 35% 35%, #2a4d8f, #1c3561, #0f1f3d)', boxShadow: isHumanStep ? '0 0 12px rgba(212,132,90,0.7)' : '0 0 12px rgba(197,214,234,0.4)', transition: 'background 0.5s ease, box-shadow 0.5s ease' }}
                    >
                      <div className="flex gap-0.5 items-center">
                        {[0,1,2].map(i => (
                          <div key={i} className="rounded-full" style={{ width: 2, height: showInPhoneOrb ? [10, 14, 10][i] : [8, 12, 8][i], background: 'rgba(255,255,255,0.9)', transition: 'height 0.3s ease' }} />
                        ))}
                      </div>
                    </button>
                  </div>
                </div>
                <div className="overflow-hidden transition-all duration-300 ease-in-out" style={{ maxHeight: showKeyboard ? '160px' : '0px', opacity: showKeyboard ? 1 : 0 }}>
                  <div className="bg-[#0f1f3d] px-1.5 pb-2 pt-1.5">
                    <div className="flex gap-1 mb-1 justify-center">
                      {['q','w','e','r','t','y','u','i','o','p'].map(k => (
                        <div key={k} className="flex-1 rounded text-white/50 text-[9px] text-center py-1.5 font-medium" style={{ background: 'rgba(197,214,234,0.1)', fontFamily: "'Google Sans', sans-serif" }}>{k}</div>
                      ))}
                    </div>
                    <div className="flex gap-1 mb-1 justify-center px-2">
                      {['a','s','d','f','g','h','j','k','l'].map(k => (
                        <div key={k} className="flex-1 rounded text-white/50 text-[9px] text-center py-1.5 font-medium" style={{ background: 'rgba(197,214,234,0.1)', fontFamily: "'Google Sans', sans-serif" }}>{k}</div>
                      ))}
                    </div>
                    <div className="flex gap-1 mb-1 justify-center">
                      <div className="rounded text-white/40 text-[8px] text-center py-1.5 px-2" style={{ background: 'rgba(197,214,234,0.06)' }}>⇧</div>
                      {['z','x','c','v','b','n','m'].map(k => (
                        <div key={k} className="flex-1 rounded text-white/50 text-[9px] text-center py-1.5 font-medium" style={{ background: 'rgba(197,214,234,0.1)', fontFamily: "'Google Sans', sans-serif" }}>{k}</div>
                      ))}
                      <div className="rounded text-white/40 text-[8px] text-center py-1.5 px-2" style={{ background: 'rgba(197,214,234,0.06)' }}>⌫</div>
                    </div>
                    <div className="flex gap-1 justify-center">
                      <div className="rounded text-white/40 text-[8px] text-center py-1.5 px-2" style={{ background: 'rgba(197,214,234,0.06)' }}>123</div>
                      <div className="flex-1 rounded text-white/30 text-[9px] text-center py-1.5" style={{ background: 'rgba(197,214,234,0.1)' }}>space</div>
                      <div className="rounded text-white text-[8px] text-center py-1.5 px-2" style={{ background: '#1c3561' }}>return</div>
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
