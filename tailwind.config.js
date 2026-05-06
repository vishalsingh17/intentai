/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Bebas Neue', 'sans-serif'],
        serif: ['Instrument Serif', 'Georgia', 'serif'],
        sans: ['Geist', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        bg: {
          DEFAULT: '#ffffff',
          alt: '#f8f8ff',
          dark: '#06050e',
          enterprise: '#07060f',
        },
        primary: {
          DEFAULT: '#5f40de',
          light: '#7c5ff0',
          dark: '#4f35c0',
        },
        orange: {
          DEFAULT: '#ff6b00',
          light: '#ff8533',
          dark: '#e05e00',
        },
        foreground: {
          DEFAULT: '#0a0a0a',
          muted: '#6b6b80',
          strong: '#3a3a4a',
        },
        border: {
          DEFAULT: 'rgba(95,64,222,0.12)',
          strong: 'rgba(95,64,222,0.25)',
        },
      },
      animation: {
        'marquee': 'marquee 28s linear infinite',
        'float': 'floatY 5s ease-in-out infinite',
        'pulse-green': 'greenPulse 2s ease-in-out infinite',
        'orb-breathe': 'orbBreathe 3s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        floatY: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        greenPulse: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(34,197,94,0.5)' },
          '50%': { boxShadow: '0 0 0 5px rgba(34,197,94,0)' },
        },
        orbBreathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.9' },
          '50%': { transform: 'scale(1.08)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};