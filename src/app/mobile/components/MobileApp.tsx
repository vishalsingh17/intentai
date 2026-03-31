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
  | 'splash' |'landing' |'login' |'otp' |'home' |'travel' |'quick-commerce' |'mobility' |'ecommerce' |'checkout' |'payment-success';

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
    <div className="min-h-screen bg-[#080810] flex items-center justify-center p-4 md:p-8">
      {/* Desktop label */}
      <div className="hidden md:block absolute top-6 left-1/2 -translate-x-1/2 text-center z-10">
        <span className="font-mono-custom text-[10px] uppercase tracking-widest text-foreground-muted">
          Beep · Mobile App Demo
        </span>
      </div>

      {/* Phone frame */}
      <div
        className="relative w-full max-w-[390px] overflow-hidden"
        style={{
          height: '844px',
          borderRadius: '44px',
          background: '#080810',
          boxShadow: '0 0 0 1px rgba(124,58,237,0.3), 0 0 80px rgba(124,58,237,0.15), 0 40px 120px rgba(0,0,0,0.8)',
          border: '1px solid rgba(124,58,237,0.2)',
        }}
      >
        {/* Notch */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 z-50"
          style={{
            width: 126,
            height: 34,
            background: '#080810',
            borderRadius: '0 0 20px 20px',
          }}
        />

        {/* Screen content */}
        <div className="absolute inset-0 overflow-hidden" style={{ borderRadius: '44px' }}>
          {renderScreen()}
        </div>
      </div>

      {/* Background glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(124,58,237,0.08) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />
    </div>
  );
}
