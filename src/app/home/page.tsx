import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from './components/HeroSection';
import DemoSection from './components/DemoSection';
import HowItWorksSection from './components/HowItWorksSection';
import WhyDifferentSection from './components/WhyDifferentSection';
import UseCasesSection from './components/UseCasesSection';
import FinalCTASection from './components/FinalCTASection';
import ParallaxBackground from './components/ParallaxBackground';

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-[#080810] overflow-x-hidden">
      {/* Fixed dot grid parallax */}
      <ParallaxBackground />

      {/* Global grid lines overlay */}
      <div
        className="fixed inset-0 max-w-[1440px] mx-auto pointer-events-none z-0"
        style={{
          borderLeft: '1px solid rgba(124,58,237,0.05)',
          borderRight: '1px solid rgba(124,58,237,0.05)',
        }}
        aria-hidden="true"
      />

      <Header />

      <div className="relative z-10">
        <HeroSection />
        <DemoSection />
        <HowItWorksSection />
        <WhyDifferentSection />
        <UseCasesSection />
        <FinalCTASection />
      </div>

      <Footer />
    </main>
  );
}