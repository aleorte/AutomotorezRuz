import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      colors: {
        // Design A - Modern Dealer (clean blues)
        'da-bg': '#FFFFFF',
        'da-text': '#0F172A',
        'da-accent': '#2563EB',
        'da-muted': '#64748B',
        'da-border': '#E2E8F0',
        // Design B - High Conversion (dark + yellow)
        'db-bg': '#0A0A0A',
        'db-card': '#141414',
        'db-accent': '#FACC15',
        'db-accent2': '#F97316',
        'db-text': '#FAFAFA',
        'db-muted': '#A1A1AA',
        // Design C - Luxury Showcase (black + gold)
        'dc-bg': '#080808',
        'dc-card': '#111111',
        'dc-gold': '#C9A96E',
        'dc-gold-light': '#E8D5A3',
        'dc-text': '#F5F5F0',
        'dc-muted': '#888880',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'slide-in': 'slideIn 0.5s ease-out forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideIn: {
          from: { opacity: '0', transform: 'translateX(-20px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [animate],
};

export default config;
