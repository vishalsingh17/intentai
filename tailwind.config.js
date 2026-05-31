/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Google Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        bg: {
          DEFAULT: '#ffffff',
          alt: '#f4f7fb',
          dark: '#1c3561',
          enterprise: '#0f1f3d',
        },
        primary: {
          DEFAULT: '#1c3561',
          light: '#2a4d8f',
          dark: '#142848',
        },
        accent: {
          DEFAULT: '#c5d6ea',
          light: '#dce9f5',
          dark: '#a8c4e0',
        },
        orange: {
          DEFAULT: '#ff6b00',
          light: '#ff8533',
          dark: '#e05e00',
        },
        foreground: {
          DEFAULT: '#1c3561',
          muted: '#6b7fa0',
          strong: '#0f1f3d',
        },
        border: {
          DEFAULT: 'rgba(28,53,97,0.12)',
          strong: 'rgba(28,53,97,0.25)',
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