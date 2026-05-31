'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function BeepFooter() {
  return (
    <footer className="border-t py-10 px-6 md:px-12" style={{ background: '#ffffff', borderColor: 'rgba(28,53,97,0.1)' }}>
      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Logo + wordmark */}
        <div className="flex items-center gap-2.5">
          <Image
            src="/assets/images/beepAI___LOGO-1778057442337.jpg"
            alt="BeepAi logo"
            width={36}
            height={36}
            className="object-contain rounded-full flex-shrink-0"
          />
          <span
            className="text-[18px] font-bold tracking-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', color: '#1c3561' }}
          >
            BeepAi
          </span>
        </div>

        {/* Center: links */}
        <nav className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-[13px]" style={{ fontFamily: "'Google Sans', sans-serif", color: '#6b7fa0' }}>
          <a href="https://beepnpay.com" className="hover:text-[#1c3561] transition-colors">beepnpay.com</a>
          <Link href="/privacy" className="hover:text-[#1c3561] transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-[#1c3561] transition-colors">Terms</Link>
          <a href="mailto:we@beepnpay.com" className="hover:text-[#1c3561] transition-colors">we@beepnpay.com</a>
          <a href="tel:+917048939374" className="hover:text-[#1c3561] transition-colors">+91 7048939374</a>
        </nav>

        {/* Right: copyright + D&B seal */}
        <div className="flex flex-col items-center md:items-end gap-3">
          <span className="text-[12px]" style={{ fontFamily: "'Google Sans', sans-serif", color: '#9aafcc' }}>
            © 2026 Beep and Pay Technologies Pvt Ltd.
          </span>
          <div style={{ width: '114px', height: '97px', overflow: 'hidden' }}>
            <iframe
              id="Iframe1"
              src="https://dunsregistered.dnb.com/SealAuthentication.aspx?Cid=1"
              width="114"
              height="97"
              frameBorder={0}
              scrolling="no"
              style={{ border: 'none', display: 'block', width: '114px', height: '97px' }}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
