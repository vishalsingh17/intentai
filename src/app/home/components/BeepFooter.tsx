import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function BeepFooter() {
  return (
    <footer className="bg-white border-t border-[rgba(95,64,222,0.1)] py-10 px-6 md:px-12">
      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Logo + wordmark */}
        <div className="flex items-center gap-2.5">
          <Image
            src="/assets/images/beep_logo-1774785208526.png"
            alt="beep logo"
            width={30}
            height={30}
            className="flex-shrink-0 object-contain"
          />
          <span className="font-bold text-[16px] text-[#0a0a0a] tracking-tight" style={{ fontFamily: 'Geist, sans-serif' }}>
            beep
          </span>
        </div>

        {/* Center: links */}
        <nav className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-[13px] text-[#6b6b80]" style={{ fontFamily: 'Geist, sans-serif' }}>
          <a href="https://beepnpay.com" className="hover:text-[#5f40de] transition-colors">beepnpay.com</a>
          <Link href="/privacy" className="hover:text-[#5f40de] transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-[#5f40de] transition-colors">Terms</Link>
          <a href="mailto:we@beepnpay.com" className="hover:text-[#5f40de] transition-colors">we@beepnpay.com</a>
          <a href="tel:+917048939374" className="hover:text-[#5f40de] transition-colors">+91 7048939374</a>
        </nav>

        {/* Right: copyright */}
        <span className="text-[12px] text-[#9999aa] text-center" style={{ fontFamily: 'Geist, sans-serif' }}>
          © 2026 Beep and Pay Technologies Pvt Ltd.
        </span>
      </div>
    </footer>
  );
}
