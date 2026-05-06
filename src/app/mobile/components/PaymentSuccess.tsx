'use client';

import React, { useEffect, useRef, useState } from 'react';
import { CheckoutData } from './MobileApp';
import Image from 'next/image';

interface Props {
  data: CheckoutData;
  onHome: () => void;
}

const categoryEmoji: Record<string, string> = {
  travel: '✈️',
  'quick-commerce': '⚡',
  mobility: '🚗',
  ecommerce: '🛍️',
};

const categoryColor: Record<string, string> = {
  travel: '#7C3AED',
  'quick-commerce': '#4F46E5',
  mobility: '#059669',
  ecommerce: '#2563EB',
};

function useOrderId() {
  const ref = useRef<string | null>(null);
  if (!ref.current) {
    ref.current = `BEP${Math.floor(Math.random() * 90000 + 10000)}`;
  }
  return ref.current;
}

export default function PaymentSuccess({ data, onHome }: Props) {
  const [visible, setVisible] = useState(false);
  const orderId = useOrderId();
  const color = categoryColor[data.category] || '#7C3AED';

  const confettiItems = useRef(
    Array.from({ length: 24 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 1.8,
      color: ['#7C3AED', '#A78BFA', '#60A5FA', '#34d399', '#F4F4FF', '#C4B5FD'][Math.floor(Math.random() * 6)],
      size: 4 + Math.random() * 7,
      shape: Math.random() > 0.5,
    }))
  ).current;

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        background: 'linear-gradient(160deg, #0c0820 0%, #080810 50%, #0a0c1e 100%)',
      }}
    >
      {/* Confetti */}
      {visible && confettiItems.map((item) => (
        <div
          key={item.id}
          style={{
            position: 'absolute',
            left: `${item.x}%`,
            top: -12,
            width: item.size,
            height: item.size,
            borderRadius: item.shape ? '50%' : 2,
            background: item.color,
            animation: `confettiFall 3.5s ${item.delay}s ease-in forwards`,
            pointerEvents: 'none',
            zIndex: 10,
          }}
        />
      ))}

      {/* Glow */}
      <div style={{ position: 'absolute', width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.18) 0%, transparent 70%)', filter: 'blur(60px)', top: '15%', left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none' }} aria-hidden="true" />

      <div style={{ height: 54 }} />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          padding: '16px 24px 32px',
          alignItems: 'center',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* Success icon */}
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: '50%',
            background: 'rgba(16,185,129,0.15)',
            border: '2px solid rgba(16,185,129,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 48,
            marginBottom: 20,
            boxShadow: '0 0 60px rgba(16,185,129,0.35)',
            animation: 'successPop 0.6s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          ✅
        </div>

        <h2 style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 28, fontWeight: 300, color: '#F4F4FF', letterSpacing: '-0.025em', marginBottom: 8, textAlign: 'center' as const }}>
          Amount Reserved!
        </h2>
        <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 14, color: '#8B8BAA', textAlign: 'center' as const, marginBottom: 28, lineHeight: 1.6, maxWidth: 280 }}>
          Your amount is blocked via UPI Reserve Pay. It will only be debited when you confirm delivery.
        </p>

        {/* Order card */}
        <div style={{ width: '100%', padding: '20px', borderRadius: 20, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', marginBottom: 16 }}>
          {/* Category + title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: `${color}18`, border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
              {categoryEmoji[data.category] || '✦'}
            </div>
            <div>
              <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 16, fontWeight: 600, color: '#F4F4FF', marginBottom: 2 }}>{data.title}</p>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#8B8BAA', letterSpacing: '0.1em' }}>Order #{orderId}</p>
            </div>
          </div>

          {/* Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: 14 }}>
            {data.items.map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < data.items.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                <span style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 13, color: '#8B8BAA', flex: 1, marginRight: 8, lineHeight: 1.3 }}>{item.name}</span>
                <span style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 13, color: '#B0B0CC', fontWeight: 500, flexShrink: 0 }}>{item.price}</span>
              </div>
            ))}
          </div>

          {/* Total */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <span style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 15, fontWeight: 600, color: '#F4F4FF' }}>Total Reserved</span>
            <span style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 24, fontWeight: 700, color: '#34d399', letterSpacing: '-0.03em' }}>{data.total}</span>
          </div>
        </div>

        {/* Reserve Pay status tracker */}
        <div style={{ width: '100%', padding: '16px', borderRadius: 18, background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.25)', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg, #7C3AED, #60A5FA)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>🔒</div>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#A78BFA', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>UPI Reserve Pay Status</p>
          </div>
          {[
            { label: 'Amount Blocked', value: data.total, status: 'done', icon: '🔒' },
            { label: 'Order Confirmed', value: 'Processing', status: 'done', icon: '✦' },
            { label: 'Delivery', value: 'In progress', status: 'pending', icon: '📦' },
            { label: 'Debit on delivery', value: 'Pending', status: 'pending', icon: '💳' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: item.status === 'done' ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.04)', border: `1px solid ${item.status === 'done' ? 'rgba(16,185,129,0.3)' : 'rgba(255,255,255,0.06)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, flexShrink: 0 }}>{item.icon}</div>
              <span style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 13, color: '#B0B0CC', flex: 1 }}>{item.label}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 12, color: item.status === 'done' ? '#34d399' : '#8B8BAA', fontWeight: item.status === 'done' ? 600 : 400 }}>{item.value}</span>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: item.status === 'done' ? '#34d399' : 'rgba(255,255,255,0.15)', boxShadow: item.status === 'done' ? '0 0 6px rgba(52,211,153,0.6)' : 'none' }} />
              </div>
            </div>
          ))}
        </div>

        {/* Why Beep is different */}
        <div style={{ width: '100%', padding: '14px 16px', borderRadius: 16, background: 'rgba(167,139,250,0.06)', border: '1px solid rgba(167,139,250,0.15)', marginBottom: 20 }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#A78BFA', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 6 }}>Why Beep is different</p>
          <p style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 13, color: '#B0B0CC', lineHeight: 1.5 }}>
            👉 Beep is not a marketplace. It's an AI agent that executes commerce for you — and the moat is <span style={{ color: '#A78BFA', fontWeight: 600 }}>UPI Reserve Pay</span>.
          </p>
        </div>

        {/* Beep branding */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
          <Image src="/assets/images/beep_logo-1774785208526.png" alt="Beep" width={18} height={18} className="object-contain" />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#8B8BAA', letterSpacing: '0.1em' }}>Powered by Beep · Agentic AI Commerce</span>
        </div>

        {/* CTAs */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button onClick={onHome} style={{ width: '100%', padding: '16px', borderRadius: 18, background: 'linear-gradient(135deg, #7C3AED, #4F46E5)', border: 'none', color: '#fff', fontSize: 15, fontWeight: 600, fontFamily: "'Avenir Next', 'Avenir', sans-serif", cursor: 'pointer', boxShadow: '0 0 30px rgba(124,58,237,0.4)' }}>
            Back to Home
          </button>
          <button onClick={onHome} style={{ width: '100%', padding: '14px', borderRadius: 16, background: 'transparent', border: '1px solid rgba(255,255,255,0.08)', color: '#8B8BAA', fontSize: 14, fontFamily: "'Avenir Next', 'Avenir', sans-serif", cursor: 'pointer' }}>
            View Order Details
          </button>
        </div>
      </div>

      <style>{`
        @keyframes confettiFall {
          0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(900px) rotate(720deg); opacity: 0; }
        }
        @keyframes successPop {
          0% { transform: scale(0.5); opacity: 0; }
          70% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
