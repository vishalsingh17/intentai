'use client';

import React from 'react';
import Link from 'next/link';

const sections = [
  {
    title: '1. Information We Collect',
    content: [
      {
        subtitle: '1.1 Information You Provide',
        text: 'When you register for BeepnPay (BeepAI), we collect information you directly provide, including your name, email address, phone number, billing information, and any preferences or settings you configure within the platform.',
      },
      {
        subtitle: '1.2 Automatically Collected Information',
        text: 'We automatically collect certain information when you use our services, including your IP address, browser type, operating system, device identifiers, usage data, clickstream data, and cookies or similar tracking technologies.',
      },
      {
        subtitle: '1.3 Transaction Data',
        text: 'As a payment and shopping AI platform, we collect transaction data including purchase history, payment methods (stored securely via our payment processors), merchant interactions, and order details necessary to fulfill your requests.',
      },
    ],
  },
  {
    title: '2. How We Use Your Information',
    content: [
      {
        subtitle: '2.1 Service Delivery',
        text: 'We use your information to operate BeepAI, process transactions, execute shopping commands, compare prices, and complete purchases on your behalf as instructed through our natural language interface.',
      },
      {
        subtitle: '2.2 Personalization',
        text: 'We use your data to personalize your experience, improve AI recommendations, remember your preferences, and tailor our services to your shopping habits and needs.',
      },
      {
        subtitle: '2.3 Communications',
        text: 'We may send you transactional emails, order confirmations, security alerts, and (with your consent) promotional communications about new features and offers from BeepnPay (BeepAI).',
      },
      {
        subtitle: '2.4 Security & Fraud Prevention',
        text: 'We analyze usage patterns and transaction data to detect, prevent, and respond to fraud, abuse, security incidents, and other potentially harmful activities.',
      },
    ],
  },
  {
    title: '3. Data Sharing & Disclosure',
    content: [
      {
        subtitle: '3.1 Merchants & Partners',
        text: 'To complete purchases on your behalf, we share necessary information with merchants, payment processors (such as Razorpay), and logistics partners. We only share what is required to fulfill your transaction.',
      },
      {
        subtitle: '3.2 Service Providers',
        text: 'We engage trusted third-party service providers who assist in operating our platform, including cloud hosting, analytics, customer support, and AI infrastructure. These providers are bound by confidentiality obligations.',
      },
      {
        subtitle: '3.3 Legal Requirements',
        text: 'We may disclose your information if required by law, court order, or governmental authority, or when we believe disclosure is necessary to protect our rights, your safety, or the safety of others.',
      },
      {
        subtitle: '3.4 No Sale of Personal Data',
        text: 'We do not sell, rent, or trade your personal information to third parties for their marketing purposes.',
      },
    ],
  },
  {
    title: '4. Data Security',
    content: [
      {
        subtitle: '4.1 Security Measures',
        text: 'We implement industry-standard security measures including encryption in transit (TLS/SSL), encryption at rest, access controls, regular security audits, and secure coding practices to protect your personal information.',
      },
      {
        subtitle: '4.2 Payment Security',
        text: 'Payment card data is handled exclusively by PCI-DSS compliant payment processors. BeepnPay (BeepAI) does not store raw card numbers on our servers.',
      },
    ],
  },
  {
    title: '5. Your Rights & Choices',
    content: [
      {
        subtitle: '5.1 Access & Correction',
        text: 'You have the right to access, update, or correct your personal information at any time through your account settings or by contacting us.',
      },
      {
        subtitle: '5.2 Data Deletion',
        text: 'You may request deletion of your account and associated personal data. We will fulfill such requests subject to legal retention obligations.',
      },
      {
        subtitle: '5.3 Opt-Out',
        text: 'You may opt out of marketing communications at any time by clicking "unsubscribe" in any email or updating your notification preferences in your account.',
      },
    ],
  },
  {
    title: '6. Cookies & Tracking',
    content: [
      {
        subtitle: '6.1 Cookie Usage',
        text: 'We use cookies and similar technologies to maintain your session, remember preferences, analyze platform usage, and improve our services. You can control cookie settings through your browser preferences.',
      },
    ],
  },
  {
    title: '7. Data Retention',
    content: [
      {
        subtitle: '7.1 Retention Period',
        text: 'We retain your personal information for as long as your account is active or as needed to provide services, comply with legal obligations, resolve disputes, and enforce our agreements. Transaction records may be retained for up to 7 years for financial compliance.',
      },
    ],
  },
  {
    title: '8. Contact Us',
    content: [
      {
        subtitle: '8.1 Privacy Inquiries',
        text: 'For any questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact our Privacy Team at: privacy@beepnpay.com. We will respond within 30 days of receiving your request.',
      },
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden" style={{ background: 'linear-gradient(135deg, #f5f4fa 0%, #edeaf7 50%, #f0eef8 100%)' }}>
      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
        <div
          className="absolute top-[-10%] left-[5%] w-[500px] h-[500px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(91,63,212,0.3) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-[10%] right-[5%] w-[350px] h-[350px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, rgba(91,63,212,0.2) 0%, transparent 70%)' }}
        />
      </div>

      {/* Nav */}
      <header className="fixed top-0 left-0 w-full z-50 border-b border-[rgba(91,63,212,0.12)]" style={{ background: 'rgba(245,244,250,0.92)', backdropFilter: 'blur(20px)' }}>
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <Link href="/home" className="font-bold text-lg text-[#1a1630] tracking-tight" style={{ fontFamily: 'Geist, Inter, sans-serif' }}>
            beep
          </Link>
          <Link href="/home" className="text-[13px] text-[#5b3fd4] hover:text-[#4a30b8] font-medium transition-colors">
            ← Back to Home
          </Link>
        </div>
      </header>

      <div className="relative z-10 pt-32 pb-24 px-6 md:px-12 max-w-[900px] mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(91,63,212,0.25)] bg-[rgba(91,63,212,0.07)] mb-6">
            <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#5b3fd4]">Legal</span>
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold text-[#1a1630] mb-4"
            style={{ fontFamily: 'Geist, sans-serif', letterSpacing: '-0.02em' }}
          >
            Privacy Policy
          </h1>
          <p className="text-[#3d3a5c] text-base leading-relaxed max-w-[600px]">
            At <span className="text-[#1a1630] font-semibold">BeepnPay (BeepAI)</span>, we are committed to protecting your privacy and handling your data with transparency and care.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <span className="text-[13px] text-[#6b6890]">Last updated:</span>
            <span className="text-[13px] text-[#5b3fd4] font-medium">March 29, 2026</span>
          </div>
        </div>

        {/* Intro card */}
        <div
          className="rounded-2xl border border-[rgba(91,63,212,0.15)] p-6 mb-10"
          style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(16px)' }}
        >
          <p className="text-[#3d3a5c] text-[15px] leading-relaxed">
            This Privacy Policy describes how <span className="text-[#1a1630] font-semibold">BeepnPay (BeepAI)</span> collects, uses, and shares information about you when you use our AI-powered shopping and payment platform. By using our services, you agree to the collection and use of information in accordance with this policy.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {sections?.map((section, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-[rgba(91,63,212,0.12)] p-6 md:p-8"
              style={{ background: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(12px)' }}
            >
              <h2
                className="text-xl font-bold text-[#1a1630] mb-5"
                style={{ fontFamily: 'Geist, sans-serif' }}
              >
                {section?.title}
              </h2>
              <div className="space-y-5">
                {section?.content?.map((item, i) => (
                  <div key={i}>
                    <h3 className="text-[14px] font-semibold text-[#5b3fd4] mb-1.5">{item?.subtitle}</h3>
                    <p className="text-[#3d3a5c] text-[15px] leading-relaxed">{item?.text}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-12 text-center">
          <p className="text-[#6b6890] text-[14px]">
            Have questions?{' '}
            <a href="mailto:privacy@beepnpay.com" className="text-[#5b3fd4] hover:text-[#4a30b8] transition-colors duration-200 font-medium">
              Contact our Privacy Team
            </a>
          </p>
          <p className="text-[#6b6890] text-[13px] mt-2">
            Also read our{' '}
            <Link href="/terms" className="text-[#5b3fd4] hover:text-[#4a30b8] transition-colors duration-200 font-medium">
              Terms & Conditions
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
