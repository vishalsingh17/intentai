'use client';

import React, { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import { userInputService } from '@/lib/services/userInputService';

export default function FinalCTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ success: boolean; message: string } | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && contentRef.current) {
          contentRef.current.classList.add('reveal-active');
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleEarlyAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setFeedback(null);
    const result = await userInputService.submitEarlyAccess(email.trim(), 'final-cta');
    setFeedback(result);
    if (result.success) setEmail('');
    setLoading(false);
  };

  return (
    <section
      ref={sectionRef}
      id="final-cta"
      className="relative py-32 md:py-40 overflow-hidden"
      aria-label="Get early access to Beep"
    >
      {/* Glow orbs */}
      <div
        className="glow-orb glow-orb-primary pulse-glow"
        style={{ width: 700, height: 700, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.35 }}
        aria-hidden="true"
      />
      <div
        className="glow-orb glow-orb-accent"
        style={{ width: 400, height: 400, top: '20%', left: '10%', opacity: 0.2 }}
        aria-hidden="true"
      />

      {/* Noise overlay */}
      <div className="absolute inset-0 noise-overlay" aria-hidden="true" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        <div
          ref={contentRef}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="section-label block mb-8">06 / Early Access</span>

          {/* Headline */}
          <div className="text-reveal-wrapper mb-2">
            <h2
              className="text-reveal-content font-display font-light tracking-tight"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)', lineHeight: 1.0 }}
            >
              Let Beep handle your
            </h2>
          </div>
          <div className="text-reveal-wrapper mb-8">
            <h2
              className="text-reveal-content delay-1 font-display font-light tracking-tight italic gradient-text"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)', lineHeight: 1.0 }}
            >
              next purchase.
            </h2>
          </div>

          <div className="text-reveal-wrapper mb-12">
            <p className="text-reveal-content delay-2 text-foreground-muted text-lg md:text-xl leading-relaxed max-w-xl mx-auto">
              Join thousands of early users who&apos;ve already stopped switching apps,
              comparing prices, and second-guessing decisions.
            </p>
          </div>

          {/* Email signup */}
          <form onSubmit={handleEarlyAccess} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="flex-1 px-5 py-3.5 rounded-xl text-foreground-strong placeholder-foreground-muted text-sm outline-none focus:ring-2 transition-all"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
              aria-label="Your email address for early access"
              onFocus={(e) => {
                (e.target as HTMLInputElement).style.borderColor = 'rgba(124,58,237,0.5)';
              }}
              onBlur={(e) => {
                (e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.12)';
              }}
            />
            <button
              type="submit"
              disabled={loading}
              className="btn-primary px-7 py-3.5 text-[13px] font-semibold tracking-wide text-white whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
              aria-label="Request early access to Beep"
            >
              <span>{loading ? 'Saving...' : 'Get Early Access'}</span>
            </button>
          </form>

          {/* Feedback message */}
          {feedback && (
            <p
              className={`text-sm mb-6 ${feedback.success ? 'text-green-400' : 'text-red-400'}`}
              role="status"
            >
              {feedback.message}
            </p>
          )}

          {/* Secondary CTA */}
          <div className="mb-8">
            <button
              className="btn-ghost px-6 py-2.5 text-[13px] font-medium text-foreground-muted hover:text-foreground transition-colors"
              onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
              aria-label="Try Beep demo"
            >
              Try demo
            </button>
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-foreground-muted text-xs">
            {[
              { icon: 'LockClosedIcon', label: 'No spam, ever' },
              { icon: 'BoltIcon', label: 'Instant access on launch' },
              { icon: 'GiftIcon', label: 'Free for first 3 months' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <Icon name={item.icon as Parameters<typeof Icon>[0]['name']} size={13} className="text-accent-warm" />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom decorative stats */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: '2.4M+', label: 'Intents processed' },
            { value: '8 sec', label: 'Avg completion time' },
            { value: '50+', label: 'Commerce providers' },
            { value: '99.1%', label: 'AI accuracy rate' },
          ].map((stat, i) => (
            <div
              key={i}
              className="text-center py-6 px-4 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <span className="block font-display text-3xl md:text-4xl font-light gradient-text tracking-tight mb-1">
                {stat.value}
              </span>
              <span className="font-mono-custom text-[10px] uppercase tracking-widest text-foreground-muted">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}