'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface Props {
  onOTP: (phone: string) => void;
}

export default function LoginScreen({ onOTP }: Props) {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);

  const isValid = phone.length >= 10;

  const handleSubmit = () => {
    if (!isValid) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onOTP(phone);
    }, 900);
  };

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(160deg, #0c0820 0%, #080810 60%, #0a0c1e 100%)',
      }}
    >
      {/* Glow */}
      <div style={{ position: 'absolute', width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.22) 0%, transparent 70%)', filter: 'blur(60px)', top: -40, left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none' }} aria-hidden="true" />

      <div style={{ height: 54 }} />

      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '16px 24px 32px' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 36 }}>
          <Image src="/assets/images/beep_logo-1774785208526.png" alt="Beep" width={26} height={26} className="object-contain" />
          <span style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 20, fontWeight: 700, color: '#F4F4FF', letterSpacing: '-0.02em' }}>beep</span>
        </div>

        {/* Heading */}
        <div style={{ marginBottom: 32 }}>
          <h2
            style={{
              fontFamily: "'Avenir Next', 'Avenir', sans-serif",
              fontSize: 32,
              fontWeight: 300,
              color: '#F4F4FF',
              letterSpacing: '-0.025em',
              lineHeight: 1.15,
              marginBottom: 10,
            }}
          >
            Welcome back
          </h2>
          <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 14, color: '#8B8BAA', fontWeight: 300, lineHeight: 1.5 }}>
            Enter your phone number to continue to Beep
          </p>
        </div>

        {/* Phone input */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#8B8BAA', letterSpacing: '0.15em', textTransform: 'uppercase' as const, display: 'block', marginBottom: 8 }}>
            Mobile Number
          </label>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(255,255,255,0.04)',
              border: `1px solid ${focused ? 'rgba(124,58,237,0.6)' : 'rgba(124,58,237,0.25)'}`,
              borderRadius: 16,
              overflow: 'hidden',
              transition: 'border-color 0.2s ease',
              boxShadow: focused ? '0 0 20px rgba(124,58,237,0.15)' : 'none',
            }}
          >
            <div
              style={{
                padding: '16px 14px',
                borderRight: '1px solid rgba(255,255,255,0.07)',
                fontFamily: "'Avenir Next', 'Avenir', sans-serif",
                fontSize: 15,
                color: '#B0B0CC',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              🇮🇳 <span>+91</span>
            </div>
            <input
              type="tel"
              maxLength={10}
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="98765 43210"
              style={{
                flex: 1,
                padding: '16px 14px',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                fontFamily: "'Avenir Next', 'Avenir', sans-serif",
                fontSize: 17,
                color: '#F4F4FF',
                letterSpacing: '0.06em',
              }}
            />
            {isValid && (
              <div style={{ paddingRight: 14, color: '#34d399', fontSize: 18 }}>✓</div>
            )}
          </div>
        </div>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '4px 0 20px' }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#8B8BAA', letterSpacing: '0.1em' }}>OR</span>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
        </div>

        {/* Social login */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {[
            { icon: '🔵', label: 'Continue with Google', color: 'rgba(66,133,244,0.1)', border: 'rgba(66,133,244,0.2)' },
            { icon: '⚫', label: 'Continue with Apple', color: 'rgba(255,255,255,0.04)', border: 'rgba(255,255,255,0.1)' },
          ].map((s, i) => (
            <button
              key={i}
              onClick={handleSubmit}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: 14,
                background: s.color,
                border: `1px solid ${s.border}`,
                color: '#B0B0CC',
                fontSize: 14,
                fontFamily: "'Avenir Next', 'Avenir', sans-serif",
                fontWeight: 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                transition: 'all 0.2s ease',
              }}
            >
              <span style={{ fontSize: 18 }}>{s.icon}</span>
              <span>{s.label}</span>
            </button>
          ))}
        </div>

        {/* Submit */}
        <div style={{ marginTop: 'auto' }}>
          <button
            onClick={handleSubmit}
            disabled={!isValid || loading}
            style={{
              width: '100%',
              padding: '17px',
              borderRadius: 18,
              background: isValid
                ? 'linear-gradient(135deg, #7C3AED, #4F46E5)'
                : 'rgba(124,58,237,0.15)',
              border: `1px solid ${isValid ? 'transparent' : 'rgba(124,58,237,0.2)'}`,
              color: isValid ? '#fff' : '#8B8BAA',
              fontSize: 16,
              fontWeight: 600,
              fontFamily: "'Avenir Next', 'Avenir', sans-serif",
              cursor: isValid ? 'pointer' : 'not-allowed',
              transition: 'all 0.3s ease',
              boxShadow: isValid ? '0 0 40px rgba(124,58,237,0.4)' : 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            {loading ? (
              <>
                <div style={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', animation: 'spin 0.8s linear infinite' }} />
                <span>Sending OTP…</span>
              </>
            ) : (
              <span>Send OTP →</span>
            )}
          </button>
          <p style={{ textAlign: 'center', marginTop: 14, fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 11, color: '#8B8BAA', lineHeight: 1.5 }}>
            By continuing, you agree to our{' '}
            <span style={{ color: '#A78BFA' }}>Terms</span> &amp;{' '}
            <span style={{ color: '#A78BFA' }}>Privacy Policy</span>
          </p>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
