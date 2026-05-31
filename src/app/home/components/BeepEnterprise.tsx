'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  dur: number;
  delay: number;
  drift: number;
  size: number;
}

const PARTICLES: Particle[] = Array.from({ length: 24 }, (_, i) => ({
  x: (i * 17 + 5) % 95,
  y: (i * 23 + 10) % 90,
  dur: 3 + (i % 5),
  delay: (i % 8) * 0.6,
  drift: (i % 3 === 0 ? -1 : 1) * (8 + (i % 12)),
  size: 2 + (i % 3),
}));

const FLOW_NODES = ['Intent Engine', 'Execution Layer', 'Payment Infra', 'Complete'];

export default function EnterpriseSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [workEmail, setWorkEmail] = useState('');
  const [company, setCompany] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.querySelectorAll('.reveal-from-bottom').forEach(el => el.classList.add('active'));
      }),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!workEmail || !company) return;
    setLoading(true);
    try {
      const { createClient } = await import('@/lib/supabase/client');
      const supabase = createClient();
      await supabase.from('enterprise_leads').insert({ work_email: workEmail, company_name: company });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="enterprise"
      ref={sectionRef}
      className="relative overflow-hidden py-28 px-6 md:px-12"
      style={{ background: '#0f1f3d' }}
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(197,214,234,1) 1px, transparent 1px), linear-gradient(90deg, rgba(197,214,234,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full particle-rise"
            style={{
              left: `${p.x}%`,
              bottom: `${p.y}%`,
              width: p.size,
              height: p.size,
              background: '#c5d6ea',
              opacity: 0.3,
              '--dur': `${p.dur}s`,
              '--delay': `${p.delay}s`,
              '--drift': `${p.drift}px`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto">
        {/* Eyebrow */}
        <div className="flex items-center gap-2 mb-6 reveal-from-bottom">
          <span className="w-2 h-2 rounded-full blue-pulse flex-shrink-0" style={{ background: '#c5d6ea' }} />
          <span
            className="text-[12px] tracking-[0.2em] uppercase font-medium"
            style={{ fontFamily: "'Google Sans', sans-serif", color: '#c5d6ea' }}
          >
            For enterprises and partners
          </span>
        </div>

        {/* Headline */}
        <div className="mb-6 reveal-from-bottom">
          <h2
            className="text-[56px] md:text-[72px] leading-[0.92]"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', color: '#ffffff', fontWeight: 600 }}
          >
            The agentic layer
          </h2>
          <div>
            <span
              className="text-[56px] md:text-[72px] leading-[0.92]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', color: '#c5d6ea', fontWeight: 600 }}
            >
              your business
            </span>
          </div>
          <h2
            className="text-[56px] md:text-[72px] leading-[0.92]"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', color: '#ffffff', fontWeight: 600 }}
          >
            has been waiting for.
          </h2>
        </div>

        <p
          className="text-[16px] max-w-[600px] leading-relaxed mb-14 reveal-from-bottom reveal-delay-1"
          style={{ fontFamily: "'Google Sans', sans-serif", color: 'rgba(197,214,234,0.65)' }}
        >
          BeepAi is not just a consumer product. We are building agentic AI infrastructure — the execution layer that any enterprise, in any industry, can plug into their own systems.
        </p>

        {/* Three columns */}
        <div className="grid md:grid-cols-3 gap-6 mb-14 reveal-from-bottom reveal-delay-2">
          {[
            { title: 'Agentic Payment Infrastructure', desc: 'A programmable payment layer that executes transactions based on intent, not manual input.' },
            { title: 'Agentic Execution Layer', desc: 'The middleware that connects natural language commands to real-world commerce actions.' },
            { title: 'Your Business Travel Platform', desc: 'End-to-end travel management for teams — policy-aware, budget-smart, zero friction.' },
          ].map((col, i) => (
            <div key={i} className="rounded-2xl p-6" style={{ border: '1px solid rgba(197,214,234,0.15)', background: 'rgba(197,214,234,0.04)' }}>
              <h3 className="text-[16px] font-semibold text-white mb-3" style={{ fontFamily: "'Google Sans', sans-serif" }}>{col.title}</h3>
              <p className="text-[14px] leading-relaxed" style={{ fontFamily: "'Google Sans', sans-serif", color: 'rgba(197,214,234,0.5)' }}>{col.desc}</p>
            </div>
          ))}
        </div>

        {/* Node flow diagram */}
        <div className="flex items-center justify-center gap-0 mb-14 overflow-x-auto reveal-from-bottom reveal-delay-3">
          {FLOW_NODES.map((node, i) => (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center">
                <div
                  className="px-4 py-2.5 rounded-xl text-[13px] font-medium whitespace-nowrap"
                  style={{ fontFamily: "'Google Sans', sans-serif", border: '1px solid rgba(197,214,234,0.3)', background: 'rgba(197,214,234,0.08)', color: '#c5d6ea' }}
                >
                  {node}
                </div>
              </div>
              {i < FLOW_NODES.length - 1 && (
                <div className="relative flex items-center mx-1 flex-shrink-0" style={{ width: 48 }}>
                  <div className="w-full h-px" style={{ background: 'rgba(197,214,234,0.25)' }} />
                  <div
                    className="absolute w-2 h-2 rounded-full flow-dot"
                    style={{ background: '#c5d6ea', '--dur': '2s', '--delay': `${i * 0.5}s` } as React.CSSProperties}
                  />
                  <div className="absolute right-0 w-0 h-0" style={{ borderTop: '4px solid transparent', borderBottom: '4px solid transparent', borderLeft: '6px solid rgba(197,214,234,0.4)' }} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Form */}
        <div className="max-w-[480px] reveal-from-bottom reveal-delay-4">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[12px] mb-1.5 font-medium tracking-wide" style={{ fontFamily: "'Google Sans', sans-serif", color: 'rgba(197,214,234,0.6)' }}>
                  WORK EMAIL
                </label>
                <input
                  type="email"
                  value={workEmail}
                  onChange={e => setWorkEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  suppressHydrationWarning
                  className="w-full px-4 py-3.5 rounded-xl text-white text-[14px] focus:outline-none transition-all"
                  style={{ fontFamily: "'Google Sans', sans-serif", background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(197,214,234,0.2)', color: '#ffffff' }}
                  onFocus={e => { e.target.style.borderColor = '#c5d6ea'; e.target.style.boxShadow = '0 0 0 3px rgba(197,214,234,0.1)'; }}
                  onBlur={e => { e.target.style.borderColor = 'rgba(197,214,234,0.2)'; e.target.style.boxShadow = 'none'; }}
                />
              </div>
              <div>
                <label className="block text-[12px] mb-1.5 font-medium tracking-wide" style={{ fontFamily: "'Google Sans', sans-serif", color: 'rgba(197,214,234,0.6)' }}>
                  COMPANY NAME
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                  placeholder="Your company"
                  required
                  suppressHydrationWarning
                  className="w-full px-4 py-3.5 rounded-xl text-white text-[14px] focus:outline-none transition-all"
                  style={{ fontFamily: "'Google Sans', sans-serif", background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(197,214,234,0.2)', color: '#ffffff' }}
                  onFocus={e => { e.target.style.borderColor = '#c5d6ea'; e.target.style.boxShadow = '0 0 0 3px rgba(197,214,234,0.1)'; }}
                  onBlur={e => { e.target.style.borderColor = 'rgba(197,214,234,0.2)'; e.target.style.boxShadow = 'none'; }}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                suppressHydrationWarning
                className="w-full py-4 rounded-xl text-[15px] font-semibold cursor-none transition-all duration-200"
                style={{ fontFamily: "'Google Sans', sans-serif", background: '#c5d6ea', color: '#1c3561', boxShadow: '0 4px 20px rgba(197,214,234,0.25)' }}
                onMouseEnter={e => { (e.target as HTMLButtonElement).style.background = '#ffffff'; }}
                onMouseLeave={e => { (e.target as HTMLButtonElement).style.background = '#c5d6ea'; }}
              >
                {loading ? 'Sending...' : 'Request access'}
              </button>
            </form>
          ) : (
            <div className="flex items-center gap-3 font-medium text-[15px]" style={{ color: '#c5d6ea' }}>
              <span className="w-6 h-6 rounded-full flex items-center justify-center text-[#1c3561] text-xs" style={{ background: '#c5d6ea' }}>✓</span>
              Request received. We will be in touch shortly.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
