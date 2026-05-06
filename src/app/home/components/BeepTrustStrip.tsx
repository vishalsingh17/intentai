'use client';

import React from 'react';
import Image from 'next/image';

export default function TrustStrip() {
  return (
    <section className="py-14 px-6 md:px-12 border-y border-[rgba(95,64,222,0.1)]" style={{ background: 'linear-gradient(135deg, #f0eef8 0%, #ebe8f5 100%)' }}>
      <div className="max-w-[1280px] mx-auto flex flex-col items-center gap-5">
        <p className="text-[12px] text-[#6b6b80] tracking-[0.2em] uppercase" style={{ fontFamily: 'Geist, sans-serif' }}>
          Secured and powered by
        </p>
        <div className="flex items-center gap-6 flex-wrap justify-center">
          <div className="glass-card rounded-xl px-4 py-2">
            <Image
              src="/assets/images/razorpay-icon-1774785591823.png"
              alt="Razorpay payment gateway logo"
              width={120}
              height={32}
              className="object-contain opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>
          <div className="glass-card rounded-xl px-4 py-2 flex items-center gap-3">
            <Image
              src="/assets/images/image-1778057049730.png"
              alt="UPI Reserve Pay logo"
              width={36}
              height={36}
              className="object-contain"
            />
            <span className="text-[13px] text-[#5f40de] font-semibold" style={{ fontFamily: 'Geist, sans-serif' }}>UPI Reserve Pay</span>
          </div>
        </div>
        <p className="text-[12px] text-[#9999aa] text-center" style={{ fontFamily: 'Geist, sans-serif' }}>
          We never store your card details · PCI compliant
        </p>
      </div>
    </section>
  );
}
