'use client';

import React, { useState } from 'react';
import SplashScreen from './SplashScreen';
import LandingScreen from './LandingScreen';
import LoginScreen from './LoginScreen';
import OTPScreen from './OTPScreen';
import HomeScreen from './HomeScreen';
import TravelFlow from './TravelFlow';
import QuickCommerceFlow from './QuickCommerceFlow';
import MobilityFlow from './MobilityFlow';
import EcommerceFlow from './EcommerceFlow';
import CheckoutFlow from './CheckoutFlow';
import PaymentSuccess from './PaymentSuccess';

export type Screen =
  | 'splash' | 'landing' | 'login' | 'otp' | 'home' |'travel'| 'quick-commerce' | 'mobility' | 'ecommerce' |'checkout' | 'payment-success';

export interface CheckoutData {
  title: string;
  items: { name: string; price: string }[];
  total: string;
  category: string;
}

export default function MobileApp() {
  const [screen, setScreen] = useState<Screen>('splash');
  const [phone, setPhone] = useState('');
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);

  const navigate = (s: Screen) => setScreen(s);

  const goToCheckout = (data: CheckoutData) => {
    setCheckoutData(data);
    setScreen('checkout');
  };

  const renderScreen = () => {
    switch (screen) {
      case 'splash':
        return <SplashScreen onDone={() => navigate('landing')} />;
      case 'landing':
        return <LandingScreen onGetStarted={() => navigate('login')} />;
      case 'login':
        return <LoginScreen onOTP={(p) => { setPhone(p); navigate('otp'); }} />;
      case 'otp':
        return <OTPScreen phone={phone} onVerified={() => navigate('home')} onBack={() => navigate('login')} />;
      case 'home':
        return <HomeScreen onNavigate={navigate} />;
      case 'travel':
        return <TravelFlow onBack={() => navigate('home')} onCheckout={goToCheckout} />;
      case 'quick-commerce':
        return <QuickCommerceFlow onBack={() => navigate('home')} onCheckout={goToCheckout} />;
      case 'mobility':
        return <MobilityFlow onBack={() => navigate('home')} onCheckout={goToCheckout} />;
      case 'ecommerce':
        return <EcommerceFlow onBack={() => navigate('home')} onCheckout={goToCheckout} />;
      case 'checkout':
        return <CheckoutFlow data={checkoutData!} onBack={() => navigate('home')} onSuccess={() => navigate('payment-success')} />;
      case 'payment-success':
        return <PaymentSuccess data={checkoutData!} onHome={() => navigate('home')} />;
      default:
        return <SplashScreen onDone={() => navigate('landing')} />;
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(124,58,237,0.12) 0%, rgba(8,8,16,1) 60%)',
        padding: '24px 16px',
      }}
    >
      {/* Top label */}
      <div className="mb-6 text-center">
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 16px',
            borderRadius: 20,
            background: 'rgba(124,58,237,0.1)',
            border: '1px solid rgba(124,58,237,0.2)',
          }}
        >
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#7C3AED', boxShadow: '0 0 6px rgba(124,58,237,0.8)', animation: 'pulse 2s ease-in-out infinite' }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#A78BFA', letterSpacing: '0.15em', textTransform: 'uppercase' as const }}>
            Beep · Interactive Demo
          </span>
        </div>
      </div>

      {/* Phone frame */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 390,
          height: 844,
          borderRadius: 50,
          background: 'linear-gradient(145deg, #1a1a2e 0%, #0d0d1a 100%)',
          boxShadow: `
            0 0 0 1px rgba(124,58,237,0.25),
            0 0 0 2px rgba(255,255,255,0.04),
            0 0 80px rgba(124,58,237,0.2),
            0 60px 120px rgba(0,0,0,0.9),
            inset 0 1px 0 rgba(255,255,255,0.08)
          `,
          overflow: 'hidden',
        }}
      >
        {/* Side buttons (decorative) */}
        <div style={{ position: 'absolute', left: -3, top: 120, width: 3, height: 36, borderRadius: '3px 0 0 3px', background: 'rgba(255,255,255,0.08)' }} />
        <div style={{ position: 'absolute', left: -3, top: 168, width: 3, height: 64, borderRadius: '3px 0 0 3px', background: 'rgba(255,255,255,0.08)' }} />
        <div style={{ position: 'absolute', left: -3, top: 244, width: 3, height: 64, borderRadius: '3px 0 0 3px', background: 'rgba(255,255,255,0.08)' }} />
        <div style={{ position: 'absolute', right: -3, top: 180, width: 3, height: 80, borderRadius: '0 3px 3px 0', background: 'rgba(255,255,255,0.08)' }} />

        {/* Dynamic Island / Notch */}
        <div
          style={{
            position: 'absolute',
            top: 12,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 120,
            height: 34,
            background: '#000',
            borderRadius: 20,
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.05)' }} />
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#1a1a1a' }} />
        </div>

        {/* Status bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 54,
            zIndex: 50,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            padding: '0 24px 8px',
            pointerEvents: 'none',
          }}
        >
          <span style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif", fontSize: 13, fontWeight: 600, color: '#F4F4FF' }}>9:41</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {/* Signal */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2 }}>
              {[3, 5, 7, 9].map((h, i) => (
                <div key={i} style={{ width: 3, height: h, borderRadius: 1, background: i < 3 ? '#F4F4FF' : 'rgba(255,255,255,0.3)' }} />
              ))}
            </div>
            {/* WiFi */}
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
              <path d="M8 9.5C8.83 9.5 9.5 10.17 9.5 11S8.83 12.5 8 12.5 6.5 11.83 6.5 11 7.17 9.5 8 9.5Z" fill="#F4F4FF"/>
              <path d="M4.5 7C5.8 5.7 7.3 5 8 5s2.2.7 3.5 2" stroke="#F4F4FF" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
              <path d="M1.5 4C3.5 2 5.7 1 8 1s4.5 1 6.5 3" stroke="#F4F4FF" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5"/>
            </svg>
            {/* Battery */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <div style={{ width: 22, height: 11, borderRadius: 3, border: '1px solid rgba(255,255,255,0.4)', padding: 1, display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '80%', height: '100%', borderRadius: 1.5, background: '#F4F4FF' }} />
              </div>
              <div style={{ width: 2, height: 5, borderRadius: '0 1px 1px 0', background: 'rgba(255,255,255,0.4)' }} />
            </div>
          </div>
        </div>

        {/* Screen content */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 50,
            overflow: 'hidden',
            background: '#080810',
          }}
        >
          {renderScreen()}
        </div>

        {/* Home indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: 8,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 134,
            height: 5,
            borderRadius: 3,
            background: 'rgba(255,255,255,0.3)',
            zIndex: 100,
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Bottom hint */}
      <div className="mt-6 text-center">
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'rgba(139,139,170,0.5)', letterSpacing: '0.1em' }}>
          Tap to interact · All flows are demo-ready
        </p>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
