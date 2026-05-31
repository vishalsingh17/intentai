'use client';

import React from 'react';
import Image from 'next/image';

export default function TrustStrip() {
  return (
    <section className="py-14 px-6 md:px-12 border-y" style={{ background: '#ffffff', borderColor: 'rgba(28,53,97,0.08)' }}>
      <div className="max-w-[1280px] mx-auto flex flex-col items-center gap-8">
        <p
          className="text-[11px] tracking-[0.22em] uppercase font-medium"
          style={{ fontFamily: "'Google Sans', sans-serif", color: '#6b7fa0' }}
        >
          Secured and powered by
        </p>
        <div className="flex items-center gap-16 flex-wrap justify-center">
          <Image
            src="/assets/images/razorpay-icon-1774785591823.png"
            alt="Razorpay payment gateway"
            width={180}
            height={52}
            className="object-contain opacity-70 hover:opacity-100 transition-opacity"
          />
          <Image
            src="/assets/images/image-1778062428389.png"
            alt="UPI Reserve Pay"
            width={200}
            height={64}
            className="object-contain opacity-70 hover:opacity-100 transition-opacity"
          />
        </div>
        <p
          className="text-[12px] text-center"
          style={{ fontFamily: "'Google Sans', sans-serif", color: '#9aafcc' }}
        >
          We never store your card details · PCI compliant
        </p>
      </div>
    </section>
  );
}
