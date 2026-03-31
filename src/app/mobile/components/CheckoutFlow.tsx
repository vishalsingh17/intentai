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
  { id: 'reserve', label: 'UPI Reserve Pay', sub: 'Block now · Pay later', icon: '🔒', highlight: true, badge: 'Beep Moat' },
  { id: 'upi', label: 'UPI / GPay / PhonePe', sub: 'Instant debit', icon: '📱', highlight: false, badge: null },
  { id: 'card', label: 'Credit / Debit Card', sub: 'Visa · Mastercard · Rupay', icon: '💳', highlight: false, badge: null },
  { id: 'cod', label: 'Cash on Delivery', sub: 'Pay when you receive', icon: '💵', highlight: false, badge: null },
];

export default function CheckoutFlow({ data, onBack, onSuccess }: Props) {
  const [step, setStep] = useState<PayStep>('summary');
  const [selectedPayment, setSelectedPayment] = useState('reserve');
  const [showReserveInfo, setShowReserveInfo] = useState(false);
  const [biometricState, setBiometricState] = useState<'idle' | 'scanning' | 'success'>('idle');

  const handlePay = () => {
    if (selectedPayment === 'reserve') {
      setStep('biometric');
      setBiometricState('idle');
    } else {
      setStep('biometric');
      setBiometricState('idle');
    }
  };

  const handleBiometric = () => {
    setBiometricState('scanning');
    setTimeout(() => {
      setBiometricState('success');
      setTimeout(() => {
        setStep('processing');
        setTimeout(() => onSuccess(), 1800);
      }, 600);
    }, 1400);
  };

  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: '#080810' }}>
      <div className="absolute pointer-events-none" style={{ width: 250, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)', filter: 'blur(60px)', top: 0, left: '50%', transform: 'translateX(-50%)' }} aria-hidden="true" />

      <div style={{ height: 44 }} />

      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-4">
        {step === 'summary' || step === 'payment' ? (
          <button onClick={step === 'payment' ? () => setStep('summary') : onBack} style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 16, color: '#B0B0CC' }}>←</button>
        ) : <div style={{ width: 36 }} />}
        <div>
          <h3 style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 18, fontWeight: 600, color: '#F4F4FF', letterSpacing: '-0.01em' }}>
            {step === 'summary' ? 'Order Summary' : step === 'payment' ? 'Payment' : step === 'biometric' ? 'Confirm Payment' : 'Processing…'}
          </h3>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#8B8BAA', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>
            {step === 'summary' ? 'Review your order' : step === 'payment' ? 'Choose method' : step === 'biometric' ? 'Biometric auth' : 'Please wait'}
          </p>
        </div>
        {/* Step indicator */}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
          {['summary', 'payment', 'biometric'].map((s, i) => (
            <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: ['summary', 'payment', 'biometric', 'processing'].indexOf(step) >= i ? '#7C3AED' : 'rgba(255,255,255,0.15)', transition: 'background 0.3s ease' }} />
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-6">
        {/* ── STEP 1: Order Summary ── */}
        {step === 'summary' && (
          <div>
            {/* Order title */}
            <div style={{ padding: '14px 16px', borderRadius: 16, background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)', marginBottom: 16 }}>
              <div className="flex items-center gap-2 mb-1">
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg, #7C3AED, #60A5FA)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>✦</div>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#A78BFA', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>Beep AI Selected</span>
              </div>
              <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 16, fontWeight: 600, color: '#F4F4FF' }}>{data.title}</p>
            </div>

            {/* Items */}
            <div style={{ marginBottom: 16 }}>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#8B8BAA', letterSpacing: '0.15em', textTransform: 'uppercase' as const, marginBottom: 10 }}>Items</p>
              <div className="flex flex-col gap-2">
                {data.items.map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <span style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 13, color: '#B0B0CC', flex: 1, marginRight: 8 }}>{item.name}</span>
                    <span style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 14, fontWeight: 600, color: '#F4F4FF', flexShrink: 0 }}>{item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div style={{ padding: '14px 16px', borderRadius: 14, background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.25)', marginBottom: 20 }}>
              <div className="flex justify-between items-center">
                <span style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 16, fontWeight: 600, color: '#F4F4FF' }}>Total</span>
                <span style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 22, fontWeight: 700, color: '#A78BFA', letterSpacing: '-0.02em' }}>{data.total}</span>
              </div>
            </div>

            {/* Delivery address */}
            <div style={{ padding: '12px 14px', borderRadius: 14, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', marginBottom: 20 }}>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#8B8BAA', letterSpacing: '0.15em', textTransform: 'uppercase' as const, marginBottom: 6 }}>Delivery Address</p>
              <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 13, color: '#B0B0CC' }}>📍 42, Sector 18, Gurugram, Haryana 122015</p>
            </div>

            <button onClick={() => setStep('payment')} style={{ width: '100%', padding: '15px', borderRadius: 16, background: 'linear-gradient(135deg, #7C3AED, #4F46E5)', border: 'none', color: '#fff', fontSize: 15, fontWeight: 600, fontFamily: "'Avenir Next', 'Avenir', sans-serif", cursor: 'pointer', boxShadow: '0 0 30px rgba(124,58,237,0.4)' }}>
              Choose Payment →
            </button>
          </div>
        )}

        {/* ── STEP 2: Payment Selection ── */}
        {step === 'payment' && (
          <div>
            {/* UPI Reserve Pay explanation */}
            <div
              style={{ padding: '16px', borderRadius: 16, background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.35)', marginBottom: 16, cursor: 'pointer' }}
              onClick={() => setShowReserveInfo(!showReserveInfo)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span style={{ fontSize: 20 }}>🔒</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 15, fontWeight: 700, color: '#F4F4FF' }}>UPI Reserve Pay</p>
                      <span style={{ fontSize: 9, padding: '2px 8px', borderRadius: 20, background: 'linear-gradient(135deg, #7C3AED, #4F46E5)', color: '#fff', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.05em' }}>BEEP MOAT</span>
                    </div>
                    <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 12, color: '#A78BFA' }}>Block now · Pay only when delivered</p>
                  </div>
                </div>
                <span style={{ color: '#A78BFA', fontSize: 16 }}>{showReserveInfo ? '▲' : '▼'}</span>
              </div>

              {showReserveInfo && (
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid rgba(124,58,237,0.2)' }}>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#A78BFA', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 8 }}>How Reserve Pay works</p>
                  {[
                    { step: '1', text: 'Amount is blocked (reserved) in your UPI account — not debited', icon: '🔒' },
                    { step: '2', text: 'Beep confirms your order and initiates fulfillment', icon: '✦' },
                    { step: '3', text: 'Money is only debited when you receive & confirm delivery', icon: '✅' },
                    { step: '4', text: 'If anything goes wrong, the block is released instantly', icon: '↩️' },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                      <span style={{ fontSize: 14, flexShrink: 0 }}>{item.icon}</span>
                      <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 12, color: '#B0B0CC', lineHeight: 1.4 }}>{item.text}</p>
                    </div>
                  ))}
                  <div style={{ marginTop: 10, padding: '8px 12px', borderRadius: 10, background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)' }}>
                    <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#C4B5FD', textAlign: 'center' as const }}>
                      💡 This is Beep's core moat — zero-risk commerce
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Payment methods */}
            <div className="flex flex-col gap-3 mb-6">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedPayment(method.id)}
                  style={{
                    padding: '14px 16px',
                    borderRadius: 16,
                    background: selectedPayment === method.id ? (method.highlight ? 'rgba(124,58,237,0.15)' : 'rgba(255,255,255,0.06)') : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${selectedPayment === method.id ? (method.highlight ? 'rgba(124,58,237,0.5)' : 'rgba(255,255,255,0.2)') : 'rgba(255,255,255,0.06)'}`,
                    cursor: 'pointer',
                    textAlign: 'left' as const,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span style={{ fontSize: 22, flexShrink: 0 }}>{method.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div className="flex items-center gap-2">
                      <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 14, fontWeight: 600, color: '#F4F4FF' }}>{method.label}</p>
                      {method.badge && <span style={{ fontSize: 9, padding: '2px 7px', borderRadius: 20, background: 'rgba(124,58,237,0.3)', color: '#C4B5FD', fontFamily: "'JetBrains Mono', monospace" }}>{method.badge}</span>}
                    </div>
                    <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 12, color: '#8B8BAA' }}>{method.sub}</p>
                  </div>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', border: `2px solid ${selectedPayment === method.id ? '#7C3AED' : 'rgba(255,255,255,0.2)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {selectedPayment === method.id && <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#7C3AED' }} />}
                  </div>
                </button>
              ))}
            </div>

            {/* Pay button */}
            <div style={{ padding: '14px 16px', borderRadius: 14, background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)', marginBottom: 16 }}>
              <div className="flex justify-between items-center">
                <span style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 14, color: '#8B8BAA' }}>Amount to {selectedPayment === 'reserve' ? 'block' : 'pay'}</span>
                <span style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 20, fontWeight: 700, color: '#A78BFA', letterSpacing: '-0.02em' }}>{data.total}</span>
              </div>
            </div>

            <button onClick={handlePay} style={{ width: '100%', padding: '15px', borderRadius: 16, background: 'linear-gradient(135deg, #7C3AED, #4F46E5)', border: 'none', color: '#fff', fontSize: 15, fontWeight: 600, fontFamily: "'Avenir Next', 'Avenir', sans-serif", cursor: 'pointer', boxShadow: '0 0 30px rgba(124,58,237,0.4)' }}>
              {selectedPayment === 'reserve' ? '🔒 Reserve Pay · ' : 'Pay · '}{data.total}
            </button>
          </div>
        )}

        {/* ── STEP 3: Biometric ── */}
        {step === 'biometric' && (
          <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', paddingTop: 40 }}>
            <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 22, fontWeight: 300, color: '#F4F4FF', marginBottom: 8, textAlign: 'center' as const }}>
              {selectedPayment === 'reserve' ? 'Authorize Reserve Pay' : 'Confirm Payment'}
            </p>
            <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 14, color: '#8B8BAA', marginBottom: 40, textAlign: 'center' as const }}>
              {selectedPayment === 'reserve' ? `Block ${data.total} · Pay on delivery` : `Pay ${data.total} now`}
            </p>

            {/* Biometric button */}
            <button
              onClick={handleBiometric}
              disabled={biometricState !== 'idle'}
              style={{
                width: 120,
                height: 120,
                borderRadius: '50%',
                background: biometricState === 'success' ?'rgba(16,185,129,0.2)'
                  : biometricState === 'scanning' ?'rgba(124,58,237,0.2)' :'rgba(255,255,255,0.06)',
                border: `2px solid ${biometricState === 'success' ? 'rgba(16,185,129,0.6)' : biometricState === 'scanning' ? 'rgba(124,58,237,0.6)' : 'rgba(255,255,255,0.15)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: biometricState === 'idle' ? 'pointer' : 'default',
                fontSize: 48,
                transition: 'all 0.4s ease',
                boxShadow: biometricState === 'scanning' ? '0 0 40px rgba(124,58,237,0.4)' : biometricState === 'success' ? '0 0 40px rgba(16,185,129,0.4)' : 'none',
                animation: biometricState === 'scanning' ? 'bioPulse 1s ease-in-out infinite' : 'none',
                marginBottom: 24,
              }}
            >
              {biometricState === 'success' ? '✅' : biometricState === 'scanning' ? '👁️' : '👆'}
            </button>

            <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 14, color: biometricState === 'success' ? '#34d399' : biometricState === 'scanning' ? '#A78BFA' : '#8B8BAA', textAlign: 'center' as const, transition: 'color 0.3s ease' }}>
              {biometricState === 'success' ? 'Identity verified ✓' : biometricState === 'scanning' ? 'Scanning…' : 'Touch to authenticate'}
            </p>

            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#8B8BAA', letterSpacing: '0.1em', marginTop: 8, textAlign: 'center' as const }}>
              Face ID · Touch ID · Fingerprint
            </p>

            {/* Security note */}
            <div style={{ marginTop: 32, padding: '12px 16px', borderRadius: 14, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', width: '100%' }}>
              <div className="flex items-center gap-2 mb-2">
                <span style={{ fontSize: 14 }}>🔐</span>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#8B8BAA', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>Secured by Beep</p>
              </div>
              <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 12, color: '#8B8BAA', lineHeight: 1.4 }}>
                {selectedPayment === 'reserve' ? 'Your UPI amount will be blocked (not debited) until delivery is confirmed.' : 'End-to-end encrypted. Your payment data never leaves your device.'}
              </p>
            </div>
          </div>
        )}

        {/* ── STEP 4: Processing ── */}
        {step === 'processing' && (
          <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', paddingTop: 60 }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, #7C3AED, #60A5FA)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, marginBottom: 24, boxShadow: '0 0 50px rgba(124,58,237,0.5)', animation: 'spin 1s linear infinite' }}>✦</div>
            <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 20, fontWeight: 300, color: '#F4F4FF', marginBottom: 8 }}>Processing…</p>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#8B8BAA', letterSpacing: '0.1em' }}>
              {selectedPayment === 'reserve' ? 'Reserving amount via UPI' : 'Completing payment'}
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes bioPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(124,58,237,0.3); }
          50% { box-shadow: 0 0 50px rgba(124,58,237,0.6); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
