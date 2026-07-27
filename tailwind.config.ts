import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
          950: '#0F172A',
        },
        success: '#22C55E',
        heading: '#111827',
        body: '#475569',
        border: '#E5E7EB',
        surface: {
          DEFAULT: '#FFFFFF',
          secondary: '#F8FAFC',
          hover: '#EFF6FF',
        },
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'Manrope', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'Inter', 'system-ui', 'sans-serif'],
        number: ['var(--font-number)', 'Space Grotesk', 'monospace'],
        mono: ['var(--font-number)', 'Space Grotesk', 'monospace'],
      },
      boxShadow: {
        'soft': '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.03)',
        'card': '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.03)',
        'card-hover': '0 20px 40px -12px rgba(37, 99, 235, 0.15)',
        'elevated': '0 10px 40px -10px rgba(0,0,0,0.1)',
        'blue-glow': '0 8px 30px -6px rgba(37, 99, 235, 0.25)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-right': {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-8px) rotate(2deg)' },
        },
        'scroll-x': {
          '0%': { transform: 'translate3d(0, 0, 0)' },
          '100%': { transform: 'translate3d(-50%, 0, 0)' },
        },
        'blob': {
          '0%': { transform: 'translate3d(0px, 0px, 0) scale(1)' },
          '33%': { transform: 'translate3d(20px, -20px, 0) scale(1.05)' },
          '66%': { transform: 'translate3d(-15px, 15px, 0) scale(0.95)' },
          '100%': { transform: 'translate3d(0px, 0px, 0) scale(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out',
        'fade-in': 'fade-in 0.4s ease-out',
        'float': 'float 5s ease-in-out infinite',
        'float-slow': 'float-slow 7s ease-in-out infinite',
        'scroll-x': 'scroll-x 30s linear infinite',
        'blob': 'blob 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
export default config
