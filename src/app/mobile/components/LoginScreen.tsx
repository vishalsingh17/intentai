'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface Props {
  onOTP: (phone: string) => void;
}

export default function LoginScreen({ onOTP }: Props) {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (phone.length < 10) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onOTP(phone);
    }, 800);
  };

  return (
    <div
      className="absolute inset-0 flex flex-col"
      style={{ background: 'linear-gradient(160deg, #0a0818 0%, #080810 60%, #0c0820 100%)' }}
    >
      {/* Glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 250,
          height: 250,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)',
          filter: 'blur(60px)',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
        aria-hidden="true"
      />

      <div style={{ height: 44 }} />

      <div className="flex flex-col flex-1 px-6 pt-8 pb-8">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-12">
          <Image src="/assets/images/beep_logo-1774785208526.png" alt="Beep" width={24} height={24} className="object-contain" />
          <span style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 18, fontWeight: 700, color: '#F4F4FF', letterSpacing: '-0.01em' }}>beep</span>
        </div>

        {/* Heading */}
        <div className="mb-10">
          <h2 style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 30, fontWeight: 300, color: '#F4F4FF', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 8 }}>
            Welcome back
          </h2>
          <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 14, color: '#8B8BAA', fontWeight: 300 }}>
            Enter your phone number to continue
          </p>
        </div>

        {/* Phone input */}
        <div className="mb-4">
          <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#8B8BAA', letterSpacing: '0.15em', textTransform: 'uppercase' as const, display: 'block', marginBottom: 8 }}>
            Mobile Number
          </label>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(124,58,237,0.3)',
              borderRadius: 14,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                padding: '16px 14px',
                borderRight: '1px solid rgba(255,255,255,0.08)',
                fontFamily: "'Avenir Next', 'Avenir', sans-serif",
                fontSize: 15,
                color: '#B0B0CC',
                flexShrink: 0,
              }}
            >
              🇮🇳 +91
            </div>
            <input
              type="tel"
              maxLength={10}
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
              placeholder="98765 43210"
              style={{
                flex: 1,
                padding: '16px 14px',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                fontFamily: "'Avenir Next', 'Avenir', sans-serif",
                fontSize: 16,
                color: '#F4F4FF',
                letterSpacing: '0.05em',
              }}
            />
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#8B8BAA', letterSpacing: '0.1em' }}>OR</span>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
        </div>

        {/* Social login */}
        {[
          { icon: '🔵', label: 'Continue with Google' },
          { icon: '⚫', label: 'Continue with Apple' },
        ].map((s, i) => (
          <button
            key={i}
            onClick={handleSubmit}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: 14,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#B0B0CC',
              fontSize: 14,
              fontFamily: "'Avenir Next', 'Avenir', sans-serif",
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              marginBottom: 10,
            }}
          >
            <span>{s.icon}</span>
            <span>{s.label}</span>
          </button>
        ))}

        {/* Submit */}
        <div className="mt-auto">
          <button
            onClick={handleSubmit}
            disabled={phone.length < 10 || loading}
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: 16,
              background: phone.length >= 10 ? 'linear-gradient(135deg, #7C3AED, #4F46E5)' : 'rgba(124,58,237,0.2)',
              border: 'none',
              color: phone.length >= 10 ? '#fff' : '#8B8BAA',
              fontSize: 15,
              fontWeight: 600,
              fontFamily: "'Avenir Next', 'Avenir', sans-serif",
              cursor: phone.length >= 10 ? 'pointer' : 'not-allowed',
              transition: 'all 0.3s ease',
              boxShadow: phone.length >= 10 ? '0 0 30px rgba(124,58,237,0.4)' : 'none',
            }}
          >
            {loading ? 'Sending OTP…' : 'Send OTP'}
          </button>
          <p style={{ textAlign: 'center', marginTop: 12, fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 11, color: '#8B8BAA' }}>
            By continuing, you agree to our{' '}
            <span style={{ color: '#A78BFA' }}>Terms</span> &amp;{' '}
            <span style={{ color: '#A78BFA' }}>Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
}
