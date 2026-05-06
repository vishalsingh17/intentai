'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface Props {
  phone: string;
  onVerified: () => void;
  onBack: () => void;
}

export default function OTPScreen({ phone, onVerified, onBack }: Props) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [verifying, setVerifying] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (resendTimer <= 0) return;
    const t = setTimeout(() => setResendTimer((v) => v - 1), 1000);
    return () => clearTimeout(t);
  }, [resendTimer]);

  const handleChange = (val: string, idx: number) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...otp];
    next[idx] = val.slice(-1);
    setOtp(next);
    setError('');
    if (val && idx < 5) inputRefs.current[idx + 1]?.focus();
    if (next.every((d) => d !== '') && next.join('').length === 6) {
      handleVerify(next.join(''));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
  };

  const handleVerify = (code?: string) => {
    const finalCode = code || otp.join('');
    if (finalCode.length < 6) { setError('Enter all 6 digits'); return; }
    setVerifying(true);
    setTimeout(() => {
      setSuccess(true);
      setTimeout(() => {
        setVerifying(false);
        onVerified();
      }, 600);
    }, 1200);
  };

  const maskedPhone = phone ? `+91 ${phone.slice(0, 2)}****${phone.slice(-2)}` : '+91 98****10';
  const filled = otp.filter(d => d !== '').length;

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
      <div style={{ position: 'absolute', width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.22) 0%, transparent 70%)', filter: 'blur(60px)', top: -40, left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none' }} aria-hidden="true" />

      <div style={{ height: 54 }} />

      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '16px 24px 32px' }}>
        {/* Back + Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 36 }}>
          <button
            onClick={onBack}
            style={{
              width: 38,
              height: 38,
              borderRadius: 12,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: 18,
              color: '#B0B0CC',
              transition: 'all 0.2s ease',
            }}
          >
            ←
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Image src="/assets/images/beep_logo-1774785208526.png" alt="Beep" width={24} height={24} className="object-contain" />
            <span style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 18, fontWeight: 700, color: '#F4F4FF', letterSpacing: '-0.02em' }}>beep</span>
          </div>
        </div>

        {/* Heading */}
        <div style={{ marginBottom: 32 }}>
          {/* Shield icon */}
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: 'rgba(124,58,237,0.15)',
              border: '1px solid rgba(124,58,237,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 26,
              marginBottom: 16,
              boxShadow: '0 0 20px rgba(124,58,237,0.2)',
            }}
          >
            🔐
          </div>
          <h2
            style={{
              fontFamily: "'Avenir Next', 'Avenir', sans-serif",
              fontSize: 30,
              fontWeight: 300,
              color: '#F4F4FF',
              letterSpacing: '-0.025em',
              lineHeight: 1.2,
              marginBottom: 8,
            }}
          >
            Verify your number
          </h2>
          <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 14, color: '#8B8BAA', fontWeight: 300, lineHeight: 1.5 }}>
            We sent a 6-digit code to{' '}
            <span style={{ color: '#A78BFA', fontWeight: 500 }}>{maskedPhone}</span>
          </p>
        </div>

        {/* OTP inputs */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 8, justifyContent: 'center' }}>
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { inputRefs.current[i] = el; }}
              type="tel"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              style={{
                width: 48,
                height: 58,
                borderRadius: 14,
                background: success
                  ? 'rgba(16,185,129,0.15)'
                  : digit
                  ? 'rgba(124,58,237,0.15)'
                  : 'rgba(255,255,255,0.04)',
                border: `1.5px solid ${
                  success
                    ? 'rgba(16,185,129,0.6)'
                    : digit
                    ? 'rgba(124,58,237,0.55)'
                    : 'rgba(255,255,255,0.1)'
                }`,
                textAlign: 'center',
                fontSize: 24,
                fontWeight: 600,
                color: success ? '#34d399' : '#F4F4FF',
                fontFamily: "'Avenir Next', 'Avenir', sans-serif",
                outline: 'none',
                transition: 'all 0.2s ease',
                caretColor: '#7C3AED',
                boxShadow: digit ? '0 0 12px rgba(124,58,237,0.2)' : 'none',
              }}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div style={{ height: 2, borderRadius: 2, background: 'rgba(255,255,255,0.06)', marginBottom: 8, overflow: 'hidden' }}>
          <div style={{ height: '100%', borderRadius: 2, background: 'linear-gradient(to right, #7C3AED, #60A5FA)', width: `${(filled / 6) * 100}%`, transition: 'width 0.2s ease' }} />
        </div>

        {error && (
          <p style={{ textAlign: 'center', color: '#f87171', fontSize: 12, fontFamily: "'Avenir Next', 'Avenir', sans-serif", marginBottom: 8 }}>
            ⚠ {error}
          </p>
        )}

        {/* Demo hint */}
        <div
          style={{
            textAlign: 'center',
            padding: '8px 16px',
            borderRadius: 10,
            background: 'rgba(167,139,250,0.08)',
            border: '1px solid rgba(167,139,250,0.15)',
            marginBottom: 20,
          }}
        >
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#A78BFA', letterSpacing: '0.08em' }}>
            💡 Demo mode — enter any 6 digits
          </p>
        </div>

        {/* Resend */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
          {resendTimer > 0 ? (
            <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 13, color: '#8B8BAA' }}>
              Resend code in <span style={{ color: '#A78BFA', fontWeight: 500 }}>{resendTimer}s</span>
            </p>
          ) : (
            <button
              onClick={() => setResendTimer(30)}
              style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 13, color: '#A78BFA', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}
            >
              Resend OTP →
            </button>
          )}
        </div>

        {/* Verify button */}
        <div style={{ marginTop: 'auto' }}>
          <button
            onClick={() => handleVerify()}
            disabled={verifying || otp.join('').length < 6}
            style={{
              width: '100%',
              padding: '17px',
              borderRadius: 18,
              background: success
                ? 'linear-gradient(135deg, #059669, #34d399)'
                : 'linear-gradient(135deg, #7C3AED, #4F46E5)',
              border: 'none',
              color: '#fff',
              fontSize: 16,
              fontWeight: 600,
              fontFamily: "'Avenir Next', 'Avenir', sans-serif",
              cursor: verifying ? 'default' : 'pointer',
              boxShadow: success
                ? '0 0 40px rgba(5,150,105,0.4)'
                : '0 0 40px rgba(124,58,237,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              transition: 'all 0.3s ease',
            }}
          >
            {success ? (
              <>✓ Verified!</>
            ) : verifying ? (
              <>
                <div style={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', animation: 'spin 0.8s linear infinite' }} />
                Verifying…
              </>
            ) : (
              'Verify & Continue →'
            )}
          </button>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
