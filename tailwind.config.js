/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Avenir Next', 'Avenir', 'Nunito', 'sans-serif'],
        sans: ['Avenir Next', 'Avenir', 'Nunito', 'DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        bg: {
          DEFAULT: '#080810',
          alt: '#0c0c18',
          surface: 'rgba(255,255,255,0.04)',
        },
        primary: {
          DEFAULT: '#7C3AED',
          light: '#9D5FFF',
          dark: '#5B21B6',
        },
        accent: {
          DEFAULT: '#60A5FA',
          warm: '#A78BFA',
        },
        foreground: {
          DEFAULT: '#F4F4FF',
          muted: '#8B8BAA',
          strong: '#B0B0CC',
        },
        border: {
          DEFAULT: 'rgba(255,255,255,0.08)',
          strong: 'rgba(255,255,255,0.15)',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #7C3AED, #4F46E5, #2563EB)',
        'gradient-hero': 'linear-gradient(135deg, #A78BFA 0%, #7C3AED 35%, #60A5FA 70%, #93C5FD 100%)',
        'gradient-subtle': 'linear-gradient(120deg, #F4F4FF 0%, #C4B5FD 50%, #93C5FD 100%)',
      },
      boxShadow: {
        'glow-primary': '0 0 40px rgba(124, 58, 237, 0.4)',
        'glow-accent': '0 0 30px rgba(96, 165, 250, 0.3)',
        'glow-strong': '0 0 60px rgba(124, 58, 237, 0.5)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.4)',
      },
      animation: {
        'float': 'floatY 5s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'shimmer': 'shimmer 4s linear infinite',
      },
      keyframes: {
        floatY: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.08)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
    },
  },
  plugins: [],
};