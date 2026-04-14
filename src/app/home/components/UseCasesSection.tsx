'use client';

import React, { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

const useCases = [
{
  id: 'travel',
  icon: 'PaperAirplaneIcon',
  label: 'Travel',
  title: 'Book flights, hotels & cabs',
  description:
  'Tell Beep your destination, dates, and budget. It scans IndiGo, Air India, MakeMyTrip, and Booking.com simultaneously, and books the best option.',
  example: '"Book me a hotel in Goa for this weekend under ₹4,000"',
  metrics: [
  { value: '14 sec', label: 'Avg booking time' },
  { value: '23%', label: 'Avg savings vs manual' }],

  image: "https://images.unsplash.com/photo-1506789374587-131fdb9a6550",
  imageAlt: 'Aerial view of airplane wing over clouds during golden hour flight',
  color: '#7C3AED'
},
{
  id: 'subscriptions',
  icon: 'ArrowPathIcon',
  label: 'Subscriptions',
  title: 'Manage recurring purchases',
  description:
  'Set up auto-renewals, switch plans, or cancel subscriptions with a single sentence. Beep tracks your subscriptions and flags better deals proactively.',
  example: '"Switch my Spotify plan to family and cancel the Hotstar subscription"',
  metrics: [
  { value: '₹2,400', label: 'Avg annual savings' },
  { value: '100%', label: 'Auto-managed' }],

  image: "https://img.rocket.new/generatedImages/rocket_gen_img_10d8ec5f6-1770851762389.png",
  imageAlt: 'Dashboard analytics screen showing subscription management and spending overview',
  color: '#2563EB'
},
{
  id: 'mobility',
  icon: 'MapPinIcon',
  label: 'Mobility',
  title: 'Book rides instantly',
  description:
  'Tell Beep where you want to go. It finds nearby rides, compares options, and books the best one in seconds.',
  example: '"Book me a ride from Connaught Place to Gurgaon"',
  metrics: [
  { value: '< 10 sec', label: 'Avg booking time' },
  { value: '3+', label: 'Options compared' }],

  image: "https://images.unsplash.com/photo-1571371698382-4e9c8e734ffa",
  imageAlt: 'Yellow cab taxi on a busy city street at night with glowing lights',
  color: '#059669'
}];


export default function UseCasesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCase, setActiveCase] = useState(0);
  const [prevCase, setPrevCase] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const spotlightRef = useRef<HTMLDivElement>(null);

  const handleTabChange = (i: number) => {
    if (i === activeCase) return;
    setIsTransitioning(true);
    setPrevCase(activeCase);
    setTimeout(() => {
      setActiveCase(i);
      setIsTransitioning(false);
    }, 300);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('active');
        });
      },
      { threshold: 0.1 }
    );
    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const group = spotlightRef.current;
    if (!group) return;
    const handleMove = (e: MouseEvent) => {
      group.querySelectorAll<HTMLElement>('.spotlight-card').forEach((card) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      });
    };
    group.addEventListener('mousemove', handleMove);
    return () => group.removeEventListener('mousemove', handleMove);
  }, []);

  const active = useCases[activeCase];

  return (
    <section
      ref={sectionRef}
      id="use-cases"
      className="relative py-24 md:py-32 overflow-hidden"
      aria-label="Beep use cases">
      
      <div
        className="glow-orb glow-orb-accent"
        style={{ width: 400, height: 400, top: '30%', left: '-6%', opacity: 0.2 }}
        aria-hidden="true" />
      

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="mb-12">
          <span className="section-label block mb-4">05 / Use Cases</span>
          <h2 className="font-display text-4xl md:text-5xl font-light leading-tight tracking-tight">
            Everything you need,<br />
            <span className="gradient-text italic">handled.</span>
          </h2>
        </div>

        {/* Tab selector */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {useCases.map((uc, i) =>
          <button
            key={uc.id}
            onClick={() => handleTabChange(i)}
            suppressHydrationWarning
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
            activeCase === i ?
            'text-white' : 'text-foreground-muted hover:text-foreground btn-ghost'}`
            }
            style={
            activeCase === i ?
            {
              background: `linear-gradient(135deg, ${uc.color}, ${uc.color}99)`,
              boxShadow: `0 0 20px ${uc.color}44`
            } :
            {}
            }
            aria-pressed={activeCase === i}
            aria-label={`View ${uc.label} use case`}>
            
              <Icon name={uc.icon as Parameters<typeof Icon>[0]['name']} size={16} className="text-current" />
              {uc.label}
            </button>
          )}
        </div>

        {/* Active case detail */}
        <div
          ref={spotlightRef}
          className="spotlight-group grid grid-cols-1 md:grid-cols-12 gap-5">
          
          {/* Left: text */}
          <div
            ref={(el) => {cardRefs.current[0] = el;}}
            className="spotlight-card reveal-from-bottom md:col-span-7 p-8 md:p-10 flex flex-col gap-6"
            style={{
              opacity: isTransitioning ? 0 : 1,
              transform: isTransitioning ? 'translateY(8px)' : 'translateY(0)',
              transition: 'opacity 0.3s ease, transform 0.3s ease'
            }}>
            
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: `${active.color}22`, border: `1px solid ${active.color}44` }}>
              
              <Icon name={active.icon as Parameters<typeof Icon>[0]['name']} size={22} className="text-accent-warm" />
            </div>
            <div>
              <h3 className="font-display text-3xl md:text-4xl font-light text-foreground tracking-tight mb-3">
                {active.title}
              </h3>
              <p className="text-foreground-muted leading-relaxed">
                {active.description}
              </p>
            </div>

            {/* Example query */}
            <div
              className="px-5 py-4 rounded-xl"
              style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)' }}>
              
              <p className="font-mono-custom text-[11px] uppercase tracking-widest text-foreground-muted mb-2">
                Example intent
              </p>
              <p className="text-foreground-strong italic text-sm">{active.example}</p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-4">
              {active.metrics.map((m, i) =>
              <div
                key={i}
                className="px-5 py-4 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                
                  <span className="block font-display text-3xl font-light text-foreground tracking-tight">
                    {m.value}
                  </span>
                  <span className="font-mono-custom text-[10px] uppercase tracking-widest text-foreground-muted">
                    {m.label}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right: image with smooth transition */}
          <div
            ref={(el) => {cardRefs.current[1] = el;}}
            className="spotlight-card reveal-from-bottom md:col-span-5 overflow-hidden"
            style={{ transitionDelay: '0.12s', minHeight: 300 }}>
            
            <div className="relative w-full h-full min-h-[300px]">
              {useCases.map((uc, i) =>
              <div
                key={uc.id}
                className="absolute inset-0"
                style={{
                  opacity: activeCase === i ? 1 : 0,
                  transition: 'opacity 0.5s ease',
                  pointerEvents: activeCase === i ? 'auto' : 'none'
                }}>
                
                  <AppImage
                  src={uc.image}
                  alt={uc.imageAlt}
                  fill
                  className="object-cover opacity-60 transition-all duration-500 hover:opacity-85 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 40vw" />
                  <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(135deg, ${uc.color}44 0%, transparent 50%, rgba(8,8,16,0.7) 100%)`
                  }}
                  aria-hidden="true" />
                </div>
              )}
              
              <div className="absolute bottom-6 left-6 z-10">
                <span
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold text-white"
                  style={{ background: `${active.color}cc`, backdropFilter: 'blur(8px)', transition: 'background 0.3s ease' }}>
                  
                  <Icon name={active.icon as Parameters<typeof Icon>[0]['name']} size={12} className="text-white" />
                  {active.label}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Trust signal */}
        <div
          ref={(el) => {cardRefs.current[2] = el;}}
          className="reveal-from-bottom mt-12 glass rounded-2xl p-8 md:p-10"
          style={{ transitionDelay: '0.2s' }}>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-2 flex items-center justify-center">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)' }}>
                
                <Icon name="AcademicCapIcon" size={28} className="text-accent-warm" />
              </div>
            </div>
            <div className="md:col-span-5">
              <p className="font-display text-xl md:text-2xl font-light text-foreground mb-2 tracking-tight">
                Built by founders from <span className="gradient-text">IIFT Delhi</span>
              </p>
              <p className="text-foreground-muted text-sm leading-relaxed">
                Beep was founded by alumni of the Indian Institute of Foreign Trade, New Delhi,
                with deep expertise in commerce, supply chains, and AI-driven consumer behaviour.
                We&apos;re building the infrastructure for the next era of autonomous commerce.
              </p>
            </div>
            <div className="md:col-span-5 flex flex-col gap-4">
              {/* Trust logos row */}
              <p className="text-foreground-muted text-xs uppercase tracking-widest mb-2" style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif" }}>
                Secured &amp; Powered By
              </p>
              <div className="flex items-center gap-6 flex-wrap">
                {/* Razorpay */}
                <div className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
                  <img
                    src="/assets/images/razorpay-icon-1774785591823.png"
                    alt="Razorpay"
                    width={90}
                    height={28}
                    style={{ objectFit: 'contain' }} />
                  
                </div>
                {/* Divider */}
                <span className="text-foreground-muted opacity-30 text-lg select-none">|</span>
                {/* UPI Reserve Pay combined logo */}
                <div className="flex items-center opacity-80 hover:opacity-100 transition-opacity">
                  <img
                    src="/assets/images/image-1774785768855.png"
                    alt="UPI Reserve Pay"
                    width={90}
                    height={28}
                    style={{ objectFit: 'contain' }} />
                  
                </div>
              </div>
              {/* Card safety note */}
              <p className="text-foreground-muted text-xs mt-1" style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif" }}>
                We never store your card details
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>);

}