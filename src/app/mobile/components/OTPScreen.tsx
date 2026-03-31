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
      setVerifying(false);
      onVerified();
    }, 1200);
  };

  const maskedPhone = phone ? `+91 ${phone.slice(0, 2)}****${phone.slice(-2)}` : '+91 98****10';

  return (
    <div
      className="absolute inset-0 flex flex-col"
      style={{ background: 'linear-gradient(160deg, #0a0818 0%, #080810 60%, #0c0820 100%)' }}
    >
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

      <div className="flex flex-col flex-1 px-6 pt-6 pb-8">
        {/* Back + Logo */}
        <div className="flex items-center gap-3 mb-12">
          <button
            onClick={onBack}
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: 16,
              color: '#B0B0CC',
            }}
          >
            ←
          </button>
          <div className="flex items-center gap-2">
            <Image src="/assets/images/beep_logo-1774785208526.png" alt="Beep" width={22} height={22} className="object-contain" />
            <span style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 17, fontWeight: 700, color: '#F4F4FF' }}>beep</span>
          </div>
        </div>

        {/* Heading */}
        <div className="mb-10">
          <h2 style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 28, fontWeight: 300, color: '#F4F4FF', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 8 }}>
            Verify your number
          </h2>
          <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 14, color: '#8B8BAA', fontWeight: 300 }}>
            We sent a 6-digit code to{' '}
            <span style={{ color: '#A78BFA', fontWeight: 500 }}>{maskedPhone}</span>
          </p>
        </div>

        {/* OTP inputs */}
        <div className="flex gap-3 mb-4 justify-center">
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
                width: 46,
                height: 56,
                borderRadius: 14,
                background: digit ? 'rgba(124,58,237,0.15)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${digit ? 'rgba(124,58,237,0.5)' : 'rgba(255,255,255,0.1)'}`,
                textAlign: 'center',
                fontSize: 22,
                fontWeight: 600,
                color: '#F4F4FF',
                fontFamily: "'Avenir Next', 'Avenir', sans-serif",
                outline: 'none',
                transition: 'all 0.2s ease',
                caretColor: '#7C3AED',
              }}
            />
          ))}
        </div>

        {error && (
          <p style={{ textAlign: 'center', color: '#f87171', fontSize: 12, fontFamily: "'Avenir Next', 'Avenir', sans-serif", marginBottom: 8 }}>
            {error}
          </p>
        )}

        {/* Hint */}
        <p style={{ textAlign: 'center', fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#8B8BAA', letterSpacing: '0.1em', marginBottom: 24 }}>
          Use any 6 digits to demo
        </p>

        {/* Resend */}
        <div className="flex justify-center mb-8">
          {resendTimer > 0 ? (
            <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 13, color: '#8B8BAA' }}>
              Resend in <span style={{ color: '#A78BFA' }}>{resendTimer}s</span>
            </p>
          ) : (
            <button
              onClick={() => setResendTimer(30)}
              style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 13, color: '#A78BFA', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Resend OTP
            </button>
          )}
        </div>

        {/* Verify button */}
        <div className="mt-auto">
          <button
            onClick={() => handleVerify()}
            disabled={verifying}
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: 16,
              background: 'linear-gradient(135deg, #7C3AED, #4F46E5)',
              border: 'none',
              color: '#fff',
              fontSize: 15,
              fontWeight: 600,
              fontFamily: "'Avenir Next', 'Avenir', sans-serif",
              cursor: 'pointer',
              boxShadow: '0 0 30px rgba(124,58,237,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            {verifying ? (
              <>
                <div style={{ width: 16, height: 16, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', animation: 'spin 0.8s linear infinite' }} />
                Verifying…
              </>
            ) : (
              'Verify & Continue'
            )}
          </button>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
