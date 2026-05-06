'use client';

import React, { useState } from 'react';
import { CheckoutData } from './MobileApp';

interface Props {
  data: CheckoutData;
  onBack: () => void;
  onSuccess: () => void;
}

type PayStep = 'summary' | 'payment' | 'biometric' | 'processing';

const paymentMethods = [
  { id: 'reserve', label: 'UPI Reserve Pay', sub: 'Block now · Pay only on delivery', icon: '🔒', highlight: true, badge: 'BEEP MOAT' },
  { id: 'upi', label: 'UPI / GPay / PhonePe', sub: 'Instant debit from bank', icon: '📱', highlight: false, badge: null },
  { id: 'card', label: 'Credit / Debit Card', sub: 'Visa · Mastercard · RuPay', icon: '💳', highlight: false, badge: null },
  { id: 'cod', label: 'Cash on Delivery', sub: 'Pay when you receive', icon: '💵', highlight: false, badge: null },
];

export default function CheckoutFlow({ data, onBack, onSuccess }: Props) {
  const [step, setStep] = useState<PayStep>('summary');
  const [selectedPayment, setSelectedPayment] = useState('reserve');
  const [showReserveInfo, setShowReserveInfo] = useState(false);
  const [biometricState, setBiometricState] = useState<'idle' | 'scanning' | 'success'>('idle');
  const [biometricType, setBiometricType] = useState<'face' | 'finger'>('face');

  const handlePay = () => {
    setStep('biometric');
    setBiometricState('idle');
  };

  const handleBiometric = () => {
    setBiometricState('scanning');
    setTimeout(() => {
      setBiometricState('success');
      setTimeout(() => {
        setStep('processing');
        setTimeout(() => onSuccess(), 2000);
      }, 700);
    }, 1600);
  };

  const stepIndex = ['summary', 'payment', 'biometric', 'processing'].indexOf(step);

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: '#080810' }}>
      <div style={{ position: 'absolute', width: 280, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)', filter: 'blur(60px)', top: 0, left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none' }} aria-hidden="true" />

      <div style={{ height: 54 }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 20px 12px' }}>
        {step === 'summary' || step === 'payment' ? (
          <button
            onClick={step === 'payment' ? () => setStep('summary') : onBack}
            style={{ width: 38, height: 38, borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 18, color: '#B0B0CC' }}
          >←</button>
        ) : <div style={{ width: 38 }} />}
        <div style={{ flex: 1 }}>
          <h3 style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 18, fontWeight: 600, color: '#F4F4FF', letterSpacing: '-0.01em' }}>
            {step === 'summary' ? 'Order Summary' : step === 'payment' ? 'Payment' : step === 'biometric' ? 'Confirm Payment' : 'Processing…'}
          </h3>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#8B8BAA', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>
            {step === 'summary' ? 'Review your order' : step === 'payment' ? 'Choose method' : step === 'biometric' ? 'Biometric auth' : 'Please wait'}
          </p>
        </div>
        {/* Step dots */}
        <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
          {['summary', 'payment', 'biometric'].map((s, i) => (
            <div key={i} style={{ width: stepIndex >= i ? 20 : 6, height: 6, borderRadius: 3, background: stepIndex >= i ? 'linear-gradient(to right, #7C3AED, #60A5FA)' : 'rgba(255,255,255,0.12)', transition: 'all 0.3s ease' }} />
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px 24px' }}>

        {/* ── STEP 1: Order Summary ── */}
        {step === 'summary' && (
          <div>
            {/* AI selected badge */}
            <div style={{ padding: '12px 14px', borderRadius: 14, background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg, #7C3AED, #60A5FA)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, flexShrink: 0 }}>✦</div>
              <div>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#A78BFA', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 2 }}>Beep AI Selected</p>
                <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 15, fontWeight: 600, color: '#F4F4FF' }}>{data.title}</p>
              </div>
            </div>

            {/* Items */}
            <div style={{ marginBottom: 14 }}>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#8B8BAA', letterSpacing: '0.15em', textTransform: 'uppercase' as const, marginBottom: 10 }}>Items</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {data.items.map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 14px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <span style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 13, color: '#B0B0CC', flex: 1, marginRight: 8, lineHeight: 1.3 }}>{item.name}</span>
                    <span style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 14, fontWeight: 600, color: '#F4F4FF', flexShrink: 0 }}>{item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div style={{ padding: '14px 16px', borderRadius: 14, background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.3)', marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 16, fontWeight: 600, color: '#F4F4FF' }}>Total</span>
                <span style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 26, fontWeight: 700, color: '#A78BFA', letterSpacing: '-0.03em' }}>{data.total}</span>
              </div>
            </div>

            {/* Delivery address */}
            <div style={{ padding: '12px 14px', borderRadius: 14, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', marginBottom: 20 }}>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#8B8BAA', letterSpacing: '0.15em', textTransform: 'uppercase' as const, marginBottom: 6 }}>Delivery Address</p>
              <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 13, color: '#B0B0CC', lineHeight: 1.4 }}>📍 42, Sector 18, Gurugram, Haryana 122015</p>
            </div>

            <button onClick={() => setStep('payment')} style={{ width: '100%', padding: '16px', borderRadius: 18, background: 'linear-gradient(135deg, #7C3AED, #4F46E5)', border: 'none', color: '#fff', fontSize: 15, fontWeight: 600, fontFamily: "'Avenir Next', 'Avenir', sans-serif", cursor: 'pointer', boxShadow: '0 0 30px rgba(124,58,237,0.4)' }}>
              Choose Payment →
            </button>
          </div>
        )}

        {/* ── STEP 2: Payment Selection ── */}
        {step === 'payment' && (
          <div>
            {/* Reserve Pay hero card */}
            <div
              style={{ padding: '16px', borderRadius: 18, background: 'linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(96,165,250,0.08) 100%)', border: '1px solid rgba(124,58,237,0.4)', marginBottom: 16, cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
              onClick={() => setShowReserveInfo(!showReserveInfo)}
            >
              {/* Glow */}
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 80% 20%, rgba(124,58,237,0.15) 0%, transparent 60%)', pointerEvents: 'none' }} />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4, position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(124,58,237,0.2)', border: '1px solid rgba(124,58,237,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🔒</div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                      <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 16, fontWeight: 700, color: '#F4F4FF' }}>UPI Reserve Pay</p>
                      <span style={{ fontSize: 9, padding: '2px 8px', borderRadius: 20, background: 'linear-gradient(135deg, #7C3AED, #4F46E5)', color: '#fff', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.05em' }}>BEEP MOAT</span>
                    </div>
                    <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 12, color: '#A78BFA' }}>Block now · Pay only when delivered</p>
                  </div>
                </div>
                <span style={{ color: '#A78BFA', fontSize: 18, position: 'relative' }}>{showReserveInfo ? '▲' : '▼'}</span>
              </div>

              {showReserveInfo && (
                <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid rgba(124,58,237,0.2)', position: 'relative' }}>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#A78BFA', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 12 }}>How Reserve Pay works</p>
                  {[
                    { step: '1', text: 'Amount is blocked (reserved) in your UPI account — not debited', icon: '🔒' },
                    { step: '2', text: 'Beep confirms your order and initiates fulfillment', icon: '✦' },
                    { step: '3', text: 'Money is only debited when you receive & confirm delivery', icon: '✅' },
                    { step: '4', text: 'If anything goes wrong, the block is released instantly', icon: '↩️' },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
                      <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(124,58,237,0.2)', border: '1px solid rgba(124,58,237,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, flexShrink: 0 }}>{item.icon}</div>
                      <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 12, color: '#B0B0CC', lineHeight: 1.45, paddingTop: 3 }}>{item.text}</p>
                    </div>
                  ))}
                  <div style={{ marginTop: 10, padding: '10px 14px', borderRadius: 12, background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)' }}>
                    <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#C4B5FD', textAlign: 'center' as const, letterSpacing: '0.05em' }}>
                      💡 This is Beep's core moat — zero-risk commerce
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Payment methods */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedPayment(method.id)}
                  style={{
                    padding: '14px 16px',
                    borderRadius: 16,
                    background: selectedPayment === method.id
                      ? (method.highlight ? 'rgba(124,58,237,0.15)' : 'rgba(255,255,255,0.06)')
                      : 'rgba(255,255,255,0.03)',
                    border: `1.5px solid ${selectedPayment === method.id
                      ? (method.highlight ? 'rgba(124,58,237,0.55)' : 'rgba(255,255,255,0.2)')
                      : 'rgba(255,255,255,0.06)'}`,
                    cursor: 'pointer',
                    textAlign: 'left' as const,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    transition: 'all 0.2s ease',
                    boxShadow: selectedPayment === method.id && method.highlight ? '0 0 20px rgba(124,58,237,0.15)' : 'none',
                  }}
                >
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: selectedPayment === method.id ? 'rgba(124,58,237,0.15)' : 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{method.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                      <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 14, fontWeight: 600, color: '#F4F4FF' }}>{method.label}</p>
                      {method.badge && <span style={{ fontSize: 9, padding: '2px 7px', borderRadius: 20, background: 'rgba(124,58,237,0.3)', color: '#C4B5FD', fontFamily: "'JetBrains Mono', monospace" }}>{method.badge}</span>}
                    </div>
                    <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 12, color: '#8B8BAA' }}>{method.sub}</p>
                  </div>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', border: `2px solid ${selectedPayment === method.id ? '#7C3AED' : 'rgba(255,255,255,0.2)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'border-color 0.2s ease' }}>
                    {selectedPayment === method.id && <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#7C3AED' }} />}
                  </div>
                </button>
              ))}
            </div>

            {/* Amount summary */}
            <div style={{ padding: '14px 16px', borderRadius: 14, background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)', marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 14, color: '#8B8BAA' }}>
                  Amount to {selectedPayment === 'reserve' ? 'block' : 'pay'}
                </span>
                <span style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 22, fontWeight: 700, color: '#A78BFA', letterSpacing: '-0.02em' }}>{data.total}</span>
              </div>
              {selectedPayment === 'reserve' && (
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#A78BFA', marginTop: 6, letterSpacing: '0.05em' }}>
                  🔒 Blocked, not debited · Released if undelivered
                </p>
              )}
            </div>

            <button onClick={handlePay} style={{ width: '100%', padding: '16px', borderRadius: 18, background: 'linear-gradient(135deg, #7C3AED, #4F46E5)', border: 'none', color: '#fff', fontSize: 15, fontWeight: 600, fontFamily: "'Avenir Next', 'Avenir', sans-serif", cursor: 'pointer', boxShadow: '0 0 30px rgba(124,58,237,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              {selectedPayment === 'reserve' ? '🔒 Reserve Pay · ' : 'Pay · '}{data.total}
            </button>
          </div>
        )}

        {/* ── STEP 3: Biometric ── */}
        {step === 'biometric' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 24 }}>
            <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 22, fontWeight: 300, color: '#F4F4FF', marginBottom: 6, textAlign: 'center' as const }}>
              {selectedPayment === 'reserve' ? 'Authorize Reserve Pay' : 'Confirm Payment'}
            </p>
            <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 14, color: '#8B8BAA', marginBottom: 8, textAlign: 'center' as const }}>
              {selectedPayment === 'reserve' ? `Block ${data.total} · Pay on delivery` : `Pay ${data.total} now`}
            </p>

            {/* Biometric type toggle */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
              {[{ type: 'face' as const, icon: '👁️', label: 'Face ID' }, { type: 'finger' as const, icon: '👆', label: 'Touch ID' }].map((b) => (
                <button
                  key={b.type}
                  onClick={() => setBiometricType(b.type)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 20,
                    background: biometricType === b.type ? 'rgba(124,58,237,0.2)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${biometricType === b.type ? 'rgba(124,58,237,0.5)' : 'rgba(255,255,255,0.08)'}`,
                    color: biometricType === b.type ? '#A78BFA' : '#8B8BAA',
                    fontSize: 12,
                    fontFamily: "'Avenir Next', 'Avenir', sans-serif",
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span>{b.icon}</span> {b.label}
                </button>
              ))}
            </div>

            {/* Biometric button */}
            <button
              onClick={handleBiometric}
              disabled={biometricState !== 'idle'}
              style={{
                width: 130,
                height: 130,
                borderRadius: '50%',
                background: biometricState === 'success' ?'rgba(16,185,129,0.2)'
                  : biometricState === 'scanning' ?'rgba(124,58,237,0.2)' :'rgba(255,255,255,0.05)',
                border: `2px solid ${biometricState === 'success' ? 'rgba(16,185,129,0.7)' : biometricState === 'scanning' ? 'rgba(124,58,237,0.7)' : 'rgba(255,255,255,0.15)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: biometricState === 'idle' ? 'pointer' : 'default',
                fontSize: 52,
                transition: 'all 0.4s ease',
                boxShadow: biometricState === 'scanning' ?'0 0 50px rgba(124,58,237,0.5)'
                  : biometricState === 'success' ?'0 0 50px rgba(16,185,129,0.5)' :'0 0 20px rgba(255,255,255,0.05)',
                animation: biometricState === 'scanning' ? 'bioPulse 1s ease-in-out infinite' : 'none',
                marginBottom: 24,
              }}
            >
              {biometricState === 'success' ? '✅' : biometricType === 'face' ? '👁️' : '👆'}
            </button>

            <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 15, color: biometricState === 'success' ? '#34d399' : biometricState === 'scanning' ? '#A78BFA' : '#8B8BAA', textAlign: 'center' as const, transition: 'color 0.3s ease', marginBottom: 8 }}>
              {biometricState === 'success' ? '✓ Authenticated!' : biometricState === 'scanning' ? 'Scanning…' : `Tap to use ${biometricType === 'face' ? 'Face ID' : 'Touch ID'}`}
            </p>

            {biometricState === 'idle' && (
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#8B8BAA', textAlign: 'center' as const, letterSpacing: '0.08em' }}>
                Apple-style biometric confirmation
              </p>
            )}

            {biometricState === 'scanning' && (
              <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                {[0, 1, 2].map((i) => (
                  <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: '#A78BFA', animation: `typingDot 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── STEP 4: Processing ── */}
        {step === 'processing' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 60 }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, #7C3AED, #60A5FA)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, marginBottom: 24, boxShadow: '0 0 60px rgba(124,58,237,0.6)', animation: 'aiPulse 1s ease-in-out infinite' }}>✦</div>
            <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 22, fontWeight: 300, color: '#F4F4FF', marginBottom: 8, textAlign: 'center' as const }}>Processing…</p>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#A78BFA', letterSpacing: '0.1em', textAlign: 'center' as const, marginBottom: 32 }}>
              {selectedPayment === 'reserve' ? 'Reserving amount via UPI…' : 'Processing payment…'}
            </p>
            <div style={{ width: '100%', height: 3, borderRadius: 3, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
              <div style={{ height: '100%', borderRadius: 3, background: 'linear-gradient(to right, #7C3AED, #60A5FA)', animation: 'loadBar 1.8s ease-in-out forwards' }} />
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes bioPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes aiPulse {
          0%, 100% { box-shadow: 0 0 60px rgba(124,58,237,0.6); }
          50% { box-shadow: 0 0 80px rgba(124,58,237,0.9); }
        }
        @keyframes typingDot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-5px); opacity: 1; }
        }
        @keyframes loadBar {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}
