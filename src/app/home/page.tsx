'use client';

import React from 'react';
import BeepNav from './components/BeepNav';
import BeepHero from './components/BeepHero';
import BeepMarquee from './components/BeepMarquee';
import StatementSection from './components/BeepStatement';
import BenefitsSection from './components/BeepBenefits';
import BeepHowItWorks from './components/BeepHowItWorks';
import ExperienceSection from './components/BeepExperience';
import WhatWeBelieve from './components/BeepBelieve';
import ComparisonTable from './components/BeepComparison';
import FoundingStory from './components/BeepFoundingStory';
import TrustStrip from './components/BeepTrustStrip';
import EnterpriseSection from './components/BeepEnterprise';
import BeepWaitlist from './components/BeepWaitlist';
import BeepFooter from './components/BeepFooter';
import CustomCursor from './components/CustomCursor';

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden" style={{ background: 'linear-gradient(135deg, #f5f4fa 0%, #edeaf7 50%, #f0eef8 100%)' }}>
      <CustomCursor />
      <BeepNav />
      <BeepHero />
      <BeepMarquee />
      <StatementSection />
      <BenefitsSection />
      <BeepHowItWorks />
      <ExperienceSection />
      <WhatWeBelieve />
      <ComparisonTable />
      <FoundingStory />
      <TrustStrip />
      <EnterpriseSection />
      <BeepWaitlist />
      <BeepFooter />
    </main>
  );
}