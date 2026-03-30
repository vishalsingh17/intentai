'use client';

import React from 'react';
import Link from 'next/link';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

const contactItems = [
  {
    icon: '✉️',
    label: 'Email Us',
    value: 'we@beepnpay.com',
    href: 'mailto:we@beepnpay.com',
    description: 'Reach out for any questions, partnerships, or support. We typically respond within 24 hours.',
  },
  {
    icon: '🏢',
    label: 'Company',
    value: 'BeepnPay (BeepAI)',
    href: null,
    description: 'AI-powered shopping and payment platform built by founders of IIFT Delhi.',
  },
  {
    icon: '🌐',
    label: 'Website',
    value: 'beepnpay.com',
    href: 'https://beepnpay.com',
    description: 'Visit our website to learn more about our AI-powered platform and services.',
  },
];

const faqs = [
  {
    question: 'How do I get started with BeepAI?',
    answer: 'Simply sign up on our platform and start giving natural language commands to shop, compare prices, and make payments — all in one place.',
  },
  {
    question: 'Is my payment information secure?',
    answer: 'Yes. We use industry-standard encryption and work with trusted payment processors to ensure your financial data is always protected.',
  },
  {
    question: 'How can I report a bug or issue?',
    answer: 'Email us at we@beepnpay.com with a description of the issue and we\'ll get back to you as soon as possible.',
  },
  {
    question: 'Do you offer partnerships or integrations?',
    answer: 'We\'re always open to partnerships. Reach out to us at we@beepnpay.com with your proposal and our team will review it.',
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div
          className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.5) 0%, transparent 70%)' }}
        />
      </div>
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-24 md:py-32">

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span
              className="text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full border border-[rgba(124,58,237,0.3)] text-purple-400"
              style={{ background: 'rgba(124,58,237,0.1)' }}
            >
              Contact
            </span>
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-3"
            style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif" }}
          >
            Get in Touch
          </h1>
          <div className="flex items-center gap-3 mt-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[rgba(124,58,237,0.4)] to-transparent" />
            <span className="text-[13px] text-purple-400 font-medium">We'd love to hear from you</span>
          </div>
        </div>

        {/* Intro card */}
        <div
          className="rounded-2xl border border-[rgba(124,58,237,0.2)] p-6 mb-10"
          style={{ background: 'rgba(124,58,237,0.06)', backdropFilter: 'blur(12px)' }}
        >
          <p className="text-foreground-muted text-[15px] leading-relaxed">
            Whether you have a question about our platform, need support, or want to explore a partnership with{' '}
            <span className="text-white font-semibold">BeepnPay (BeepAI)</span>, our team is here to help. Drop us a message and we'll get back to you promptly.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="space-y-4 mb-12">
          {contactItems?.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-[rgba(255,255,255,0.06)] p-6"
              style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(8px)' }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.2)' }}
                >
                  {item?.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-purple-300 uppercase tracking-wider mb-1">{item?.label}</p>
                  {item?.href ? (
                    <a
                      href={item?.href}
                      className="text-white font-semibold text-[17px] hover:text-purple-300 transition-colors duration-200 break-all"
                    >
                      {item?.value}
                    </a>
                  ) : (
                    <p className="text-white font-semibold text-[17px]">{item?.value}</p>
                  )}
                  <p className="text-foreground-muted text-[14px] leading-relaxed mt-1.5">{item?.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Primary CTA */}
        <div
          className="rounded-2xl border border-[rgba(124,58,237,0.3)] p-8 mb-12 text-center"
          style={{ background: 'rgba(124,58,237,0.08)', backdropFilter: 'blur(12px)' }}
        >
          <h2
            className="text-2xl font-bold text-white mb-2"
            style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif" }}
          >
            Ready to connect?
          </h2>
          <p className="text-foreground-muted text-[15px] mb-6">
            Send us an email and our team will respond within 24 hours.
          </p>
          <a
            href="mailto:we@beepnpay.com"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-white text-[15px] transition-all duration-200 hover:opacity-90 hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)' }}
          >
            <span>✉️</span>
            <span>we@beepnpay.com</span>
          </a>
        </div>

        {/* FAQ */}
        <div className="mb-12">
          <h2
            className="text-xl font-bold text-white mb-6"
            style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif" }}
          >
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs?.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-[rgba(255,255,255,0.06)] p-6"
                style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(8px)' }}
              >
                <h3 className="text-[15px] font-semibold text-white mb-2">{faq?.question}</h3>
                <p className="text-foreground-muted text-[14px] leading-relaxed">{faq?.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-12 text-center">
          <p className="text-foreground-muted text-[14px]">
            Also read our{' '}
            <Link href="/privacy" className="text-purple-400 hover:text-purple-300 transition-colors duration-200 font-medium">
              Privacy Policy
            </Link>
            {' '}and{' '}
            <Link href="/terms" className="text-purple-400 hover:text-purple-300 transition-colors duration-200 font-medium">
              Terms & Conditions
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
