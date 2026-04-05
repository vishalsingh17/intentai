'use client';

import React, { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import { userInputService } from '@/lib/services/userInputService';

const stats = [
  {
    icon: 'BoltIcon',
    label: 'Avg. Completion Time',
    value: '8 sec',
    sub: 'From intent to checkout',
  },
  {
    icon: 'ShoppingCartIcon',
    label: 'Intents Processed',
    value: '2.4M+',
    sub: 'Across categories',
  },
  {
    icon: 'CpuChipIcon',
    label: 'AI Accuracy',
    value: '99.1%',
    sub: 'Correct purchase match',
  },
];

export default function HeroSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ success: boolean; message: string } | null>(null);

  // Text reveal on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      if (titleRef.current) {
        titleRef.current.classList.add('reveal-active');
      }
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  // Spotlight mouse tracking on stats
  useEffect(() => {
    const group = spotlightRef.current;
    if (!group) return;

    const handleMouseMove = (e: MouseEvent) => {
      const cards = group.querySelectorAll<HTMLElement>('.spotlight-card');
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      });
    };

    group.addEventListener('mousemove', handleMouseMove);
    return () => group.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleEarlyAccessSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setFeedback(null);
    const result = await userInputService.submitEarlyAccess(email.trim(), 'hero');
    setFeedback(result);
    if (result.success) setEmail('');
    setLoading(false);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-24 pb-8 overflow-hidden"
      aria-label="Beep Hero"
    >
      {/* Atmospheric glow orbs */}
      <div
        className="glow-orb glow-orb-primary pulse-glow"
        style={{ width: 600, height: 600, top: '-15%', left: '-10%', opacity: 0.5 }}
        aria-hidden="true"
      />
      <div
        className="glow-orb glow-orb-accent"
        style={{ width: 400, height: 400, bottom: '5%', right: '-5%', opacity: 0.4 }}
        aria-hidden="true"
      />

      <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">

        {/* ── Left: headline + CTA ── */}
        <div className="md:col-span-7 flex flex-col gap-8">
          {/* Status badge */}
          <div>
            <span className="status-badge text-accent-warm font-mono-custom">
              <span className="status-dot" aria-hidden="true" />
              ● Early access now open
            </span>
          </div>

          {/* Main headline with text reveal */}
          <h1
            ref={titleRef}
            className="font-display font-light leading-[0.92] tracking-tight"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
          >
            <span className="text-reveal-wrapper">
              <span className="text-reveal-content gradient-text-subtle">From intent</span>
            </span>
            <span className="text-reveal-wrapper">
              <span className="text-reveal-content delay-1 gradient-text">to checkout.</span>
            </span>
            <span className="text-reveal-wrapper">
              <span className="text-reveal-content delay-2 text-foreground-strong italic">Instantly.</span>
            </span>
          </h1>

          {/* Sub-headline */}
          <p className="text-foreground-muted text-lg md:text-xl leading-relaxed max-w-xl font-light" style={{ marginTop: '-0.5rem' }}>
            Tell us what you need. Beep handles the rest.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <button
              className="btn-primary px-8 py-4 text-[14px] font-semibold tracking-wide text-white"
              aria-label="Get Early Access to Beep"
              suppressHydrationWarning
              onClick={() => setShowModal(true)}
            >
              <span>Get Early Access</span>
            </button>
            <button
              className="btn-ghost px-8 py-4 text-[14px] font-medium text-foreground-muted hover:text-foreground flex items-center gap-2 transition-colors"
              onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
              aria-label="See how Beep works"
              suppressHydrationWarning
            >
              See how it works
              <Icon name="ArrowRightIcon" size={16} className="text-current" />
            </button>
          </div>

          {/* Platform availability */}
          <p className="text-[11px] text-foreground-muted font-mono-custom tracking-wider" style={{ opacity: 0.55 }}>
            Available on web &nbsp;·&nbsp; iOS &amp; Android coming soon
          </p>

          {/* Trust micro-copy */}
          <p className="text-[12px] text-foreground-muted font-mono-custom tracking-widest uppercase">
            Built by founders from IIFT Delhi · Zero-friction commerce
          </p>
        </div>

        {/* ── Right: Bento stats + chat preview ── */}
        <div
          ref={spotlightRef}
          className="md:col-span-5 flex flex-col gap-4 spotlight-group"
        >
          {/* Chat preview card */}
          <div className="spotlight-card gradient-border p-5 float-anim">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-red-500 opacity-60" />
              <div className="w-2 h-2 rounded-full bg-yellow-500 opacity-60" />
              <div className="w-2 h-2 rounded-full bg-green-500 opacity-60" />
              <span className="ml-2 font-mono-custom text-[10px] text-foreground-muted tracking-widest uppercase">Beep · Live</span>
            </div>

            {/* User message */}
            <div className="flex justify-end mb-3">
              <div
                className="max-w-[85%] px-4 py-3 rounded-2xl rounded-br-sm text-sm text-white font-medium"
                style={{ background: 'linear-gradient(135deg, #7C3AED, #4F46E5)' }}
              >
                Book a flight from Delhi to Bangalore tomorrow under ₹5000
              </div>
            </div>

            {/* AI response */}
            <div className="flex gap-3 mb-3">
              <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #7C3AED, #60A5FA)' }}>
                <Icon name="CpuChipIcon" size={14} className="text-white" />
              </div>
              <div className="spotlight-card px-4 py-3 rounded-2xl rounded-bl-sm text-sm text-foreground-strong max-w-[85%]"
                style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)' }}>
                <p className="mb-2 text-accent-warm font-medium text-xs font-mono-custom uppercase tracking-wider">✦ Found 3 options</p>
                <div className="space-y-1.5">
                  {[
                    { airline: 'IndiGo 6E-204', time: '06:00 → 08:30', price: '₹3,899' },
                    { airline: 'Air India AI-506', time: '09:15 → 11:45', price: '₹4,299' },
                  ].map((flight, i) => (
                    <div key={i} className="flex justify-between items-center text-xs">
                      <span className="text-foreground-muted">{flight.airline}</span>
                      <span className="text-foreground">{flight.time}</span>
                      <span className="text-accent font-semibold">{flight.price}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-2.5 border-t border-[rgba(124,58,237,0.2)]">
                  <span className="text-xs text-foreground-muted">Selecting best option</span>
                  <div className="mt-1.5 h-1.5 rounded-full bg-[rgba(255,255,255,0.08)] overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: '78%',
                        background: 'linear-gradient(to right, #7C3AED, #60A5FA)',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Confirmed */}
            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #7C3AED, #60A5FA)' }}>
                <Icon name="CpuChipIcon" size={14} className="text-white" />
              </div>
              <div className="px-4 py-3 rounded-2xl rounded-bl-sm text-sm text-foreground-strong"
                style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)' }}>
                <span className="text-green-400 font-semibold text-xs">✓ Booking confirmed</span>
                <p className="text-foreground-muted text-xs mt-1">IndiGo 6E-204 · ₹3,899 · Seat 14A · PNR: AI2026XK</p>
              </div>
            </div>
          </div>

          {/* Stats row */}
          {stats.map((stat, i) => (
            <div
              key={i}
              className="spotlight-card flex items-center gap-4 px-5 py-4"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.25)' }}
              >
                <Icon name={stat.icon as Parameters<typeof Icon>[0]['name']} size={18} className="text-accent-warm" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-mono-custom text-[10px] uppercase tracking-widest text-foreground-muted mb-0.5">{stat.label}</p>
                <p className="font-display text-2xl font-light text-foreground tracking-tight">{stat.value}</p>
              </div>
              <p className="text-[11px] text-foreground-muted text-right max-w-[80px] leading-tight hidden sm:block">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 w-full h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #080810)' }}
        aria-hidden="true"
      />

      {/* Early Access Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
          onClick={() => { setShowModal(false); setFeedback(null); setEmail(''); }}
        >
          <div
            className="relative w-full max-w-md rounded-2xl p-8"
            style={{ background: 'rgba(18,10,40,0.95)', border: '1px solid rgba(124,58,237,0.3)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-foreground-muted hover:text-foreground transition-colors"
              onClick={() => { setShowModal(false); setFeedback(null); setEmail(''); }}
              aria-label="Close modal"
            >
              <Icon name="XMarkIcon" size={20} className="text-current" />
            </button>

            <h3 className="font-display text-2xl font-light text-foreground mb-2">Get Early Access</h3>
            <p className="text-foreground-muted text-sm mb-6">Be among the first to experience Beep.</p>

            {feedback?.success ? (
              <div className="text-center py-4">
                <p className="text-green-400 text-base font-medium">{feedback.message}</p>
              </div>
            ) : (
              <form onSubmit={handleEarlyAccessSubmit} className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full px-5 py-3.5 rounded-xl text-foreground-strong placeholder-foreground-muted text-sm outline-none focus:ring-2 transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.12)',
                  }}
                  aria-label="Your email address"
                  onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = 'rgba(124,58,237,0.5)'; }}
                  onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.12)'; }}
                />
                {feedback && !feedback.success && (
                  <p className="text-red-400 text-xs" role="alert">{feedback.message}</p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full py-3.5 text-[14px] font-semibold tracking-wide text-white disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <span>{loading ? 'Saving...' : 'Join the List'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}