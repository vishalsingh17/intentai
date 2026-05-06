import React from 'react';
import type { Metadata, Viewport } from 'next';
import '../styles/tailwind.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'beep — AI Commerce for Real Life',
  description: 'Tell beep what you need. Beep finds the best option, decides and completes checkout — powered by real agentic payment infrastructure. Not a search. An execution.',
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      
      <script type="module" async src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fintentai8766back.builtwithrocket.new&_be=https%3A%2F%2Fappanalytics.rocket.new&_v=0.1.18" />
      <script type="module" defer src="https://static.rocket.new/rocket-shot.js?v=0.0.2" /></head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}