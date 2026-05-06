'use client';

import React from 'react';
import Image from 'next/image';

export default function TrustStrip() {
  return (
    <section className="py-14 px-6 md:px-12 border-y border-[rgba(124,95,240,0.15)]" style={{ background: 'linear-gradient(135deg, #2a2748 0%, #2e2b4a 100%)' }}>
      <div className="max-w-[1280px] mx-auto flex flex-col items-center gap-6">
        <p className="text-[12px] text-[#9090aa] tracking-[0.2em] uppercase" style={{ fontFamily: 'Geist, sans-serif' }}>
          Secured and powered by
        </p>
        <div className="flex items-center gap-10 flex-wrap justify-center">
          <Image
            src="/assets/images/razorpay-icon-1774785591823.png"
            alt="Razorpay payment gateway logo"
            width={140}
            height={40}
            className="object-contain opacity-70 hover:opacity-100 transition-opacity"
          />
          <div className="flex items-center gap-3">
            <Image
              src="/assets/images/image-1778057049730.png"
              alt="UPI Reserve Pay logo"
              width={52}
              height={52}
              className="object-contain"
            />
            <span className="text-[15px] text-[#9b7ff8] font-semibold" style={{ fontFamily: 'Geist, sans-serif' }}>UPI Reserve Pay</span>
          </div>
        </div>
        <p className="text-[12px] text-[#9090aa] text-center" style={{ fontFamily: 'Geist, sans-serif' }}>
          We never store your card details · PCI compliant
        </p>
      </div>
    </section>
  );
}
