import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-[rgba(124,58,237,0.2)] py-10">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo + brand */}
        <div className="flex items-center gap-2">
          <Image
            src="/assets/images/beep_logo-1774785208526.png"
            alt="beep logo"
            width={28}
            height={28}
            className="flex-shrink-0 object-contain"
          />
          <span className="font-bold text-base text-white tracking-tight">
            Beep
          </span>
        </div>

        {/* Links */}
        <nav className="flex items-center gap-6 md:gap-8">
          <Link
            href="/privacy"
            className="text-[14px] font-medium text-foreground-muted hover:text-white transition-colors duration-200"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="text-[14px] font-medium text-foreground-muted hover:text-white transition-colors duration-200"
          >
            Terms
          </Link>
          <Link
            href="/contact"
            className="text-[14px] font-medium text-foreground-muted hover:text-white transition-colors duration-200"
          >
            Contact
          </Link>
          {['About']?.map((link) => (
            <a
              key={link}
              href="#"
              className="text-[14px] font-medium text-foreground-muted hover:text-white transition-colors duration-200"
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Copyright */}
        <span className="text-[13px] text-foreground-muted font-medium" style={{ opacity: 0.8 }}>
          © 2026 BeepnPay (BeepAI)
        </span>
      </div>
    </footer>
  );
}