'use client';

import React from 'react';
import Image from 'next/image';

export default function TrustStrip() {
  return (
    <section className="py-14 px-6 md:px-12 border-y border-[rgba(91,63,212,0.12)]" style={{ background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(20px)' }}>
      <div className="max-w-[1280px] mx-auto flex flex-col items-center gap-8">
        <p className="text-[12px] text-[#6b6890] tracking-[0.2em] uppercase" style={{ fontFamily: 'Geist, sans-serif' }}>
          Secured and powered by
        </p>
        <div className="flex items-center gap-16 flex-wrap justify-center">
          <Image
            src="/assets/images/razorpay-icon-1774785591823.png"
            alt="Razorpay payment gateway"
            width={180}
            height={52}
            className="object-contain opacity-80 hover:opacity-100 transition-opacity"
          />
          <Image
            src="/assets/images/image-1778057049730.png"
            alt="UPI Reserve Pay"
            width={80}
            height={80}
            className="object-contain hover:opacity-100 transition-opacity"
          />
        </div>
        <p className="text-[12px] text-[#6b6890] text-center" style={{ fontFamily: 'Geist, sans-serif' }}>
          We never store your card details · PCI compliant
        </p>
      </div>
    </section>
  );
}
