'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface Props {
  onDone: () => void;
}

export default function SplashScreen({ onDone }: Props) {
  const [phase, setPhase] = useState<'enter' | 'hold' | 'exit'>('enter');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('hold'), 300);
    const t2 = setTimeout(() => setPhase('exit'), 2400);
    const t3 = setTimeout(() => onDone(), 2900);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  const isVisible = phase !== 'enter';
  const isExiting = phase === 'exit';

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(160deg, #0c0820 0%, #080810 50%, #0a0c1e 100%)',
        opacity: isExiting ? 0 : 1,
        transition: 'opacity 0.5s ease',
      }}
    >
      {/* Ambient glow layers */}
      <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 65%)', filter: 'blur(40px)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} aria-hidden="true" />
      <div style={{ position: 'absolute', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(96,165,250,0.15) 0%, transparent 70%)', filter: 'blur(30px)', top: '35%', left: '60%', transform: 'translate(-50%, -50%)' }} aria-hidden="true" />

      {/* Animated rings */}
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: 80 + i * 60,
            height: 80 + i * 60,
            borderRadius: '50%',
            border: `1px solid rgba(124,58,237,${0.15 - i * 0.04})`,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'scale(1)' : 'scale(0.5)',
            transition: `opacity 0.8s ease ${i * 0.15}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.15}s`,
            animation: isVisible ? `ringPulse ${2 + i * 0.5}s ease-in-out ${i * 0.3}s infinite` : 'none',
          }}
        />
      ))}

      {/* Logo container */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.9)',
          transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* Logo icon */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 24,
            background: 'linear-gradient(135deg, rgba(124,58,237,0.25) 0%, rgba(96,165,250,0.15) 100%)',
            border: '1px solid rgba(124,58,237,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 50px rgba(124,58,237,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
          }}
        >
          <Image
            src="/assets/images/beep_logo-1774785208526.png"
            alt="Beep logo"
            width={48}
            height={48}
            className="object-contain"
          />
        </div>

        {/* Wordmark */}
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontFamily: "'Avenir Next', 'Avenir', sans-serif",
              fontSize: 42,
              fontWeight: 700,
              color: '#F4F4FF',
              letterSpacing: '-0.03em',
              lineHeight: 1,
              marginBottom: 8,
            }}
          >
            beep
          </div>
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#8B8BAA',
            }}
          >
            Agentic AI Commerce
          </p>
        </div>

        {/* Tagline */}
        <div
          style={{
            marginTop: 4,
            padding: '6px 16px',
            borderRadius: 20,
            background: 'rgba(124,58,237,0.12)',
            border: '1px solid rgba(124,58,237,0.25)',
          }}
        >
          <span
            style={{
              fontFamily: "'Avenir Next', 'Avenir', sans-serif",
              fontSize: 12,
              color: '#A78BFA',
              fontWeight: 400,
            }}
          >
            From intent to checkout. Instantly.
          </span>
        </div>
      </div>

      {/* Loading indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: 60,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
          opacity: phase === 'hold' ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      >
        {/* Progress bar */}
        <div
          style={{
            width: 120,
            height: 2,
            borderRadius: 2,
            background: 'rgba(255,255,255,0.08)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              borderRadius: 2,
              background: 'linear-gradient(to right, #7C3AED, #60A5FA)',
              animation: 'loadBar 2s ease-in-out forwards',
            }}
          />
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 5,
                height: 5,
                borderRadius: '50%',
                background: 'rgba(124,58,237,0.7)',
                animation: `splashDot 1.2s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes splashDot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-6px); opacity: 1; }
        }
        @keyframes ringPulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.05); }
        }
        @keyframes loadBar {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}
