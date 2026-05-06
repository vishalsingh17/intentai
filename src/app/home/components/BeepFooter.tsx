import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function BeepFooter() {
  return (
    <footer className="border-t border-[rgba(95,64,222,0.15)] py-10 px-6 md:px-12" style={{ background: 'rgba(210,206,235,0.95)' }}>
      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Logo + wordmark */}
        <div className="flex items-center gap-2.5">
          <div className="rounded-xl overflow-hidden bg-[#0d0c17] p-1 flex-shrink-0">
            <Image
              src="/assets/images/beepAI___LOGO-1778057442337.jpg"
              alt="beep logo"
              width={36}
              height={36}
              className="object-contain rounded-lg"
            />
          </div>
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

        {/* Right: copyright */}
        <span className="text-[12px] text-[#6b6b80] text-center" style={{ fontFamily: 'Geist, sans-serif' }}>
          © 2026 Beep and Pay Technologies Pvt Ltd.
        </span>
      </div>
    </footer>
  );
}
