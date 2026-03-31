'use client';

import React, { useEffect, useState } from 'react';
import { CheckoutData } from './MobileApp';
import Image from 'next/image';

interface Props {
  data: CheckoutData;
  onHome: () => void;
}

const categoryEmoji: Record<string, string> = {
  travel: '✈️',
  'quick-commerce': '🛒',
  mobility: '🚗',
  ecommerce: '🛍️',
};

export default function PaymentSuccess({ data, onHome }: Props) {
  const [visible, setVisible] = useState(false);
  const [confettiItems] = useState(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 1.5,
      color: ['#7C3AED', '#A78BFA', '#60A5FA', '#34d399', '#F4F4FF'][Math.floor(Math.random() * 5)],
      size: 4 + Math.random() * 6,
    }))
  );

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const isReservePay = true; // Always show reserve pay success for demo

  return (
    <div
      className="absolute inset-0 flex flex-col overflow-y-auto"
      style={{ background: 'linear-gradient(160deg, #0a0818 0%, #080810 50%, #0c0820 100%)' }}
    >
      {/* Confetti */}
      {confettiItems.map((item) => (
        <div
          key={item.id}
          style={{
            position: 'absolute',
            left: `${item.x}%`,
            top: -10,
            width: item.size,
            height: item.size,
            borderRadius: Math.random() > 0.5 ? '50%' : 2,
            background: item.color,
            animation: `confettiFall 3s ${item.delay}s ease-in forwards`,
            opacity: visible ? 1 : 0,
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Glow */}
      <div className="absolute pointer-events-none" style={{ width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.2) 0%, transparent 70%)', filter: 'blur(60px)', top: '20%', left: '50%', transform: 'translateX(-50%)' }} aria-hidden="true" />

      <div style={{ height: 44 }} />

      <div
        className="flex flex-col flex-1 px-6 pt-6 pb-8 items-center"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* Success icon */}
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: '50%',
            background: 'rgba(16,185,129,0.15)',
            border: '2px solid rgba(16,185,129,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 44,
            marginBottom: 20,
            boxShadow: '0 0 50px rgba(16,185,129,0.3)',
          }}
        >
          ✅
        </div>

        <h2 style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 28, fontWeight: 300, color: '#F4F4FF', letterSpacing: '-0.02em', marginBottom: 8, textAlign: 'center' as const }}>
          {isReservePay ? 'Amount Reserved!' : 'Payment Done!'}
        </h2>
        <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 14, color: '#8B8BAA', textAlign: 'center' as const, marginBottom: 32, lineHeight: 1.5 }}>
          {isReservePay
            ? 'Your amount is blocked via UPI Reserve Pay. It will only be debited on delivery.' :'Your order has been confirmed and is being processed.'}
        </p>

        {/* Order card */}
        <div style={{ width: '100%', padding: '20px', borderRadius: 20, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', marginBottom: 20 }}>
          {/* Category + title */}
          <div className="flex items-center gap-3 mb-4">
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
              {categoryEmoji[data.category] || '✦'}
            </div>
            <div>
              <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 16, fontWeight: 600, color: '#F4F4FF' }}>{data.title}</p>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#8B8BAA', letterSpacing: '0.1em' }}>Order #BEP{Math.floor(Math.random() * 90000 + 10000)}</p>
            </div>
          </div>

          {/* Items */}
          <div className="flex flex-col gap-2 mb-4">
            {data.items.map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < data.items.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                <span style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 13, color: '#8B8BAA' }}>{item.name}</span>
                <span style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 13, color: '#B0B0CC', fontWeight: 500 }}>{item.price}</span>
              </div>
            ))}
          </div>

          {/* Total */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <span style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 15, fontWeight: 600, color: '#F4F4FF' }}>Total {isReservePay ? 'Reserved' : 'Paid'}</span>
            <span style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 22, fontWeight: 700, color: '#34d399', letterSpacing: '-0.02em' }}>{data.total}</span>
          </div>
        </div>

        {/* Reserve Pay status */}
        {isReservePay && (
          <div style={{ width: '100%', padding: '14px 16px', borderRadius: 16, background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.3)', marginBottom: 20 }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#A78BFA', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 10 }}>UPI Reserve Pay Status</p>
            {[
              { label: 'Amount Blocked', value: data.total, status: 'done', icon: '🔒' },
              { label: 'Order Confirmed', value: 'Processing', status: 'done', icon: '✦' },
              { label: 'Delivery', value: 'In progress', status: 'pending', icon: '📦' },
              { label: 'Debit on delivery', value: 'Pending', status: 'pending', icon: '💳' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                <span style={{ fontSize: 14 }}>{item.icon}</span>
                <span style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 13, color: '#B0B0CC', flex: 1 }}>{item.label}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 12, color: item.status === 'done' ? '#34d399' : '#8B8BAA' }}>{item.value}</span>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: item.status === 'done' ? '#34d399' : 'rgba(255,255,255,0.2)' }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Beep logo + tagline */}
        <div className="flex items-center gap-2 mb-8">
          <Image src="/assets/images/beep_logo-1774785208526.png" alt="Beep" width={18} height={18} className="object-contain" />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#8B8BAA', letterSpacing: '0.1em' }}>Powered by Beep · AI Commerce</span>
        </div>

        {/* CTA */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
          <button onClick={onHome} style={{ width: '100%', padding: '15px', borderRadius: 16, background: 'linear-gradient(135deg, #7C3AED, #4F46E5)', border: 'none', color: '#fff', fontSize: 15, fontWeight: 600, fontFamily: "'Avenir Next', 'Avenir', sans-serif", cursor: 'pointer', boxShadow: '0 0 30px rgba(124,58,237,0.4)' }}>
            Back to Home
          </button>
          <button onClick={onHome} style={{ width: '100%', padding: '13px', borderRadius: 16, background: 'transparent', border: '1px solid rgba(255,255,255,0.08)', color: '#8B8BAA', fontSize: 14, fontFamily: "'Avenir Next', 'Avenir', sans-serif", cursor: 'pointer' }}>
            View Order Details
          </button>
        </div>
      </div>

      <style>{`
        @keyframes confettiFall {
          0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(900px) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
