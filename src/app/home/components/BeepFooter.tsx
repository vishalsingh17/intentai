import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function BeepFooter() {
  return (
    <footer className="border-t border-[rgba(95,64,222,0.15)] py-10 px-6 md:px-12" style={{ background: 'rgba(210,206,235,0.95)' }}>
      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Logo + wordmark */}
        <div className="flex items-center gap-2.5">
          <Image
            src="/assets/images/beepAI___LOGO-1778057442337.jpg"
            alt="beep logo"
            width={36}
            height={36}
            className="object-contain rounded-full flex-shrink-0"
          />
          <span className="font-bold text-[18px] text-[#0a0a0a] tracking-tight" style={{ fontFamily: 'Geist, sans-serif' }}>
            beep
          </span>
        </div>

        {/* Center: links */}
        <nav className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-[13px] text-[#4a4a60]" style={{ fontFamily: 'Geist, sans-serif' }}>
          <a href="https://beepnpay.com" className="hover:text-[#5f40de] transition-colors">beepnpay.com</a>
          <Link href="/privacy" className="hover:text-[#5f40de] transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-[#5f40de] transition-colors">Terms</Link>
          <a href="mailto:we@beepnpay.com" className="hover:text-[#5f40de] transition-colors">we@beepnpay.com</a>
          <a href="tel:+917048939374" className="hover:text-[#5f40de] transition-colors">+91 7048939374</a>
        </nav>

        {/* Right: copyright + D&B seal */}
        <div className="flex flex-col items-center md:items-end gap-3">
          <span className="text-[12px] text-[#6b6b80] text-center" style={{ fontFamily: 'Geist, sans-serif' }}>
            © 2026 Beep and Pay Technologies Pvt Ltd.
          </span>
          <iframe
            id="Iframe1"
            src="https://dunsregistered.dnb.com/SealAuthentication.aspx?Cid=1"
            width="114px"
            height="97px"
            frameBorder={0}
            scrolling="no"
            style={{ border: 'none' }}
          />
        </div>
      </div>
    </footer>
  );
}
