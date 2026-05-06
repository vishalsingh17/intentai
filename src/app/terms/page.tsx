'use client';

import React from 'react';
import Link from 'next/link';

const sections = [
  {
    title: '1. Acceptance of Terms',
    content: [
      {
        subtitle: '1.1 Agreement',
        text: 'By accessing or using BeepnPay (BeepAI) — including our website, mobile application, or any related services — you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.',
      },
      {
        subtitle: '1.2 Eligibility',
        text: 'You must be at least 18 years of age and capable of forming a legally binding contract to use our services. By using BeepnPay (BeepAI), you represent and warrant that you meet these eligibility requirements.',
      },
    ],
  },
  {
    title: '2. Description of Services',
    content: [
      {
        subtitle: '2.1 BeepAI Platform',
        text: 'BeepnPay (BeepAI) provides an AI-powered shopping and payment platform that allows users to search, compare, and complete purchases through natural language commands. Our core engine, BeepAI, processes your instructions to execute transactions on your behalf.',
      },
      {
        subtitle: '2.2 Service Availability',
        text: 'We strive to maintain continuous availability of our services but do not guarantee uninterrupted access. We reserve the right to modify, suspend, or discontinue any part of our services at any time with reasonable notice.',
      },
      {
        subtitle: '2.3 Beta Features',
        text: 'Certain features may be offered in beta or early access. These features are provided "as-is" and may be subject to additional limitations, changes, or discontinuation without prior notice.',
      },
    ],
  },
  {
    title: '3. User Accounts',
    content: [
      {
        subtitle: '3.1 Account Registration',
        text: 'To access certain features, you must create an account. You agree to provide accurate, current, and complete information during registration and to keep your account information updated.',
      },
      {
        subtitle: '3.2 Account Security',
        text: 'You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. Notify us immediately at security@beepnpay.com if you suspect unauthorized access.',
      },
      {
        subtitle: '3.3 Account Termination',
        text: 'We reserve the right to suspend or terminate your account if you violate these Terms, engage in fraudulent activity, or for any other reason at our sole discretion, with or without prior notice.',
      },
    ],
  },
  {
    title: '4. Transactions & Payments',
    content: [
      {
        subtitle: '4.1 Authorized Transactions',
        text: 'By instructing BeepAI to complete a purchase, you authorize BeepnPay (BeepAI) to execute that transaction on your behalf using your stored payment method. You are responsible for ensuring sufficient funds or credit are available.',
      },
      {
        subtitle: '4.2 Payment Processing',
        text: 'Payments are processed through our integrated payment partners, including Razorpay. By using our payment features, you also agree to the terms of service of our payment processors.',
      },
      {
        subtitle: '4.3 Refunds & Disputes',
        text: "Refund eligibility is determined by the merchant's refund policy. BeepnPay (BeepAI) will assist in facilitating refund requests but is not liable for merchant refusal. For payment disputes, contact us at support@beepnpay.com within 30 days of the transaction.",
      },
      {
        subtitle: '4.4 Transaction Accuracy',
        text: 'While BeepAI strives for accuracy in executing your instructions, you are responsible for reviewing transaction details before confirmation. BeepnPay (BeepAI) is not liable for errors resulting from ambiguous or incomplete instructions.',
      },
    ],
  },
  {
    title: '5. Acceptable Use',
    content: [
      {
        subtitle: '5.1 Prohibited Activities',
        text: 'You agree not to use BeepnPay (BeepAI) for any unlawful purpose, to engage in fraud, to attempt to gain unauthorized access to our systems, to transmit malicious code, to harass other users, or to violate any applicable laws or regulations.',
      },
      {
        subtitle: '5.2 AI Usage Guidelines',
        text: 'You agree to use BeepAI responsibly and only for legitimate shopping and payment purposes. Attempting to manipulate, exploit, or misuse the AI system in ways that could harm BeepnPay (BeepAI), merchants, or other users is strictly prohibited.',
      },
    ],
  },
  {
    title: '6. Intellectual Property',
    content: [
      {
        subtitle: '6.1 Ownership',
        text: 'All content, features, and functionality of BeepnPay (BeepAI) — including but not limited to the BeepAI engine, software, design, text, graphics, and logos — are owned by BeepnPay and protected by applicable intellectual property laws.',
      },
      {
        subtitle: '6.2 Limited License',
        text: 'We grant you a limited, non-exclusive, non-transferable license to access and use our services for personal, non-commercial purposes in accordance with these Terms.',
      },
    ],
  },
  {
    title: '7. Disclaimers & Limitation of Liability',
    content: [
      {
        subtitle: '7.1 Disclaimer of Warranties',
        text: 'Our services are provided "as is" and "as available" without warranties of any kind, either express or implied. We do not warrant that our services will be error-free, uninterrupted, or free of viruses or other harmful components.',
      },
      {
        subtitle: '7.2 Limitation of Liability',
        text: 'To the maximum extent permitted by law, BeepnPay (BeepAI) shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services, even if we have been advised of the possibility of such damages.',
      },
      {
        subtitle: '7.3 Maximum Liability',
        text: 'Our total liability to you for any claims arising from these Terms or your use of our services shall not exceed the amount you paid to BeepnPay (BeepAI) in the 12 months preceding the claim.',
      },
    ],
  },
  {
    title: '8. Governing Law & Disputes',
    content: [
      {
        subtitle: '8.1 Governing Law',
        text: 'These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts located in New Delhi, India.',
      },
      {
        subtitle: '8.2 Dispute Resolution',
        text: 'Before initiating formal legal proceedings, you agree to attempt to resolve disputes informally by contacting us at legal@beepnpay.com. We will make good-faith efforts to resolve disputes within 30 days.',
      },
    ],
  },
  {
    title: '9. Changes to Terms',
    content: [
      {
        subtitle: '9.1 Modifications',
        text: 'We reserve the right to modify these Terms at any time. We will notify you of material changes via email or a prominent notice on our platform. Your continued use of our services after such notification constitutes acceptance of the updated Terms.',
      },
    ],
  },
  {
    title: '10. Contact Information',
    content: [
      {
        subtitle: '10.1 Legal Inquiries',
        text: 'For questions about these Terms and Conditions, please contact our Legal Team at: legal@beepnpay.com. For general support, reach us at support@beepnpay.com. BeepnPay (BeepAI), New Delhi, India.',
      },
    ],
  },
];

export default function TermsPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden" style={{ background: 'linear-gradient(135deg, #f5f4fa 0%, #edeaf7 50%, #f0eef8 100%)' }}>
      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
        <div
          className="absolute top-[-10%] right-[5%] w-[500px] h-[500px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(91,63,212,0.3) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-[10%] left-[5%] w-[350px] h-[350px] rounded-full opacity-15"
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
            Terms & Conditions
          </h1>
          <p className="text-[#3d3a5c] text-base leading-relaxed max-w-[600px]">
            Please read these Terms and Conditions carefully before using <span className="text-[#1a1630] font-semibold">BeepnPay (BeepAI)</span>. These terms govern your access to and use of our platform.
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
            These Terms and Conditions constitute a legally binding agreement between you and <span className="text-[#1a1630] font-semibold">BeepnPay (BeepAI)</span>. By creating an account or using our services, you acknowledge that you have read, understood, and agree to be bound by these terms.
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
            Have questions about these terms?{' '}
            <a href="mailto:legal@beepnpay.com" className="text-[#5b3fd4] hover:text-[#4a30b8] transition-colors duration-200 font-medium">
              Contact our Legal Team
            </a>
          </p>
          <p className="text-[#6b6890] text-[13px] mt-2">
            Also read our{' '}
            <Link href="/privacy" className="text-[#5b3fd4] hover:text-[#4a30b8] transition-colors duration-200 font-medium">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
