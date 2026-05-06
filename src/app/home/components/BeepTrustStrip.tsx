'use client';

import React from 'react';
import Image from 'next/image';

export default function TrustStrip() {
  return (
    <section className="bg-white py-14 px-6 md:px-12 border-y border-[rgba(95,64,222,0.08)]">
      <div className="max-w-[1280px] mx-auto flex flex-col items-center gap-5">
        <p className="text-[12px] text-[#6b6b80] tracking-[0.2em] uppercase" style={{ fontFamily: 'Geist, sans-serif' }}>
          Secured and powered by
        </p>
        <div className="flex items-center gap-6 flex-wrap justify-center">
          <Image
            src="/assets/images/razorpay-icon-1774785591823.png"
            alt="Razorpay payment gateway logo"
            width={120}
            height={32}
            className="object-contain opacity-70 hover:opacity-100 transition-opacity"
          />
          <span className="px-4 py-1.5 rounded-full border border-[rgba(95,64,222,0.2)] text-[13px] text-[#5f40de] font-medium bg-[rgba(95,64,222,0.04)]" style={{ fontFamily: 'Geist, sans-serif' }}>
            UPI Reserve Pay
          </span>
        </div>
        <p className="text-[12px] text-[#9999aa] text-center" style={{ fontFamily: 'Geist, sans-serif' }}>
          We never store your card details · PCI compliant
        </p>
      </div>
    </section>
  );
}
