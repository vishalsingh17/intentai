'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const TABS = [
{
  id: 'flights',
  label: 'Flights',
  badge: 'Live',
  badgeColor: 'bg-green-100 text-green-700',
  moat: 'Price shown is the price paid. No surprise checkout.',
  body: 'Beep searches live inventory across all major carriers, picks the best value flight for your budget, and completes the booking — including seat selection, invoice and calendar block.',
  checklist: ['Live fare comparison', 'Instant booking', 'Invoice on email', 'Calendar sync'],
  image: "https://images.unsplash.com/photo-1688708150112-fccf8ce616dd",
  imageAlt: 'Aerial view from airplane window showing wing above dramatic clouds at golden hour',
  intent: 'Book me a flight from Delhi to Mumbai tomorrow under ₹7,000',
  steps: ['Searched 6 carriers', 'Found IndiGo 6E-201 at ₹5,100', 'Confirmed booking', 'Sent invoice to email']
},
{
  id: 'hotels',
  label: 'Hotels',
  badge: 'Live',
  badgeColor: 'bg-green-100 text-green-700',
  moat: 'You set the vibe. Beep finds the room.',
  body: 'Describe the kind of stay you want — rooftop pool, quiet neighbourhood, near the airport. Beep understands context and books the right room without you scrolling through 200 options.',
  checklist: ['Natural language search', 'Multi-platform inventory', 'Instant confirmation', 'Cancellation handled'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_17afdfe26-1772463487998.png",
  imageAlt: 'Luxury hotel room with king bed, warm ambient lighting, floor-to-ceiling windows and city skyline view',
  intent: 'Find me a quiet hotel near Bandra with a pool, under ₹4,000 a night',
  steps: ['Parsed your vibe', 'Matched 3 properties', 'Confirmed best rate', 'Booking confirmed']
},
{
  id: 'qcommerce',
  label: 'Q-Commerce',
  badge: 'Coming',
  badgeColor: 'bg-amber-100 text-amber-700',
  moat: 'Your grocery list, handled in one sentence.',
  body: 'Tell beep what you need from the store. Beep places the order across the fastest available provider and tracks delivery — no app switching, no cart building.',
  checklist: ['Multi-store search', 'Fastest delivery routing', 'Order tracking', 'Reorder memory'],
  image: "https://images.unsplash.com/photo-1597352258938-b7897228e7db",
  imageAlt: 'Dark moody overhead shot of fresh produce, vegetables and grocery items arranged on dark surface',
  intent: 'Order milk, eggs, bread and bananas for delivery in 30 minutes',
  steps: ['Parsed your list', 'Found fastest provider', 'Placed order', 'Tracking delivery']
},
{
  id: 'mobility',
  label: 'Mobility',
  badge: 'Coming',
  badgeColor: 'bg-amber-100 text-amber-700',
  moat: 'Say where you are going. Beep handles the rest.',
  body: 'From airport pickups to daily commutes, beep books the right cab at the right time — and adds it to your calendar so you never miss a ride.',
  checklist: ['Multi-provider booking', 'Scheduled rides', 'Calendar integration', 'Fare comparison'],
  image: "https://images.unsplash.com/photo-1698066068746-6da2ce42cba0",
  imageAlt: 'City skyline at night with illuminated skyscrapers and busy street traffic below',
  intent: 'Book a cab to the airport tomorrow at 5 AM, I have a 7 AM flight',
  steps: ['Checked flight time', 'Scheduled cab for 5 AM', 'Confirmed booking', 'Reminder set']
}];


export default function ExperienceSection() {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.querySelectorAll('.reveal-from-bottom').forEach((el) => el.classList.add('active'));
      }),
      { threshold: 0.1 }
    );
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  const tab = TABS?.[activeTab];

  return (
    <section id="experience" ref={sectionRef} className="py-24 px-6 md:px-12" style={{ background: 'linear-gradient(135deg, #ddd9ee 0%, #d8d4eb 100%)' }}>
      <div className="max-w-[1280px] mx-auto">
        <div className="mb-3 reveal-from-bottom">
          <span className="section-label">Experience</span>
        </div>
        <h2 className="font-display text-[56px] md:text-[72px] text-[#0a0a0a] tracking-wide mb-10 reveal-from-bottom">
          Beep in action.
        </h2>

        {/* Tabs */}
        <div className="flex gap-2 mb-10 flex-wrap reveal-from-bottom">
          {TABS?.map((t, i) =>
          <button
            key={t?.id}
            onClick={() => setActiveTab(i)}
            suppressHydrationWarning
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-medium transition-all duration-200 cursor-none ${
            activeTab === i ?
            'bg-[#5f40de] text-white shadow-md' :
            'glass-card text-[#3a3a4a] border border-[rgba(95,64,222,0.15)] hover:border-[rgba(95,64,222,0.3)]'}`
            }
            style={{ fontFamily: 'Geist, sans-serif' }}>
            
              {t?.label}
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
            activeTab === i ? 'bg-white/20 text-white' : t?.badgeColor}`
            }>
                {t?.badge}
              </span>
            </button>
          )}
        </div>

        {/* Tab content */}
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Left */}
          <div>
            <h3 className="font-display text-[40px] md:text-[48px] text-[#0a0a0a] tracking-wide leading-tight mb-4">
              {tab?.moat}
            </h3>
            <p className="text-[16px] text-[#3a3a4a] leading-relaxed mb-6" style={{ fontFamily: 'Geist, sans-serif' }}>
              {tab?.body}
            </p>
            <ul className="space-y-2">
              {tab?.checklist?.map((item, i) =>
              <li key={i} className="flex items-center gap-3 text-[14px] text-[#3a3a4a]" style={{ fontFamily: 'Geist, sans-serif' }}>
                  <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-[11px] flex-shrink-0">✓</span>
                  {item}
                </li>
              )}
            </ul>
          </div>

          {/* Right */}
          <div className="space-y-4">
            <div className="rounded-2xl overflow-hidden aspect-video relative shadow-xl">
              <Image
                src={tab?.image}
                alt={tab?.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            {/* Intent card */}
            <div className="glass-card rounded-2xl p-5 border border-[rgba(95,64,222,0.12)]">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-7 h-7 rounded-full bg-[#5f40de] flex items-center justify-center text-white text-[11px] flex-shrink-0 mt-0.5">U</div>
                <div className="bg-[#e8e4f8] rounded-xl rounded-tl-sm px-3 py-2 text-[13px] text-[#0a0a0a]" style={{ fontFamily: 'Geist, sans-serif' }}>
                  {tab?.intent}
                </div>
              </div>
              <div className="space-y-1.5 pl-10">
                {tab?.steps?.map((step, i) =>
                <div key={i} className="flex items-center gap-2 text-[12px] text-[#6b6b80]" style={{ fontFamily: 'Geist, sans-serif' }}>
                    <span className="w-4 h-4 rounded-full bg-green-50 border border-green-200 flex items-center justify-center text-green-600 text-[9px] flex-shrink-0">✓</span>
                    {step}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}