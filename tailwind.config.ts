import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // Enhanced responsive breakpoints
      screens: {
        'xs': '375px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
        '4xl': '2560px',
        // Mobile-first approach
        'mobile': { 'max': '767px' },
        'tablet': { 'min': '768px', 'max': '1023px' },
        'desktop': { 'min': '1024px' },
        'touch': { 'raw': '(pointer: coarse)' },
        'no-touch': { 'raw': '(pointer: fine)' },
        'high-dpi': { 'raw': '(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)' },
        'reduced-motion': { 'raw': '(prefers-reduced-motion: reduce)' },
        'dark': { 'raw': '(prefers-color-scheme: dark)' },
        'light': { 'raw': '(prefers-color-scheme: light)' },
      },
      
      // Professional color palette
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        danger: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        },
        info: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        // Financial theme colors
        finance: {
          gold: '#ffd700',
          silver: '#c0c0c0',
          bronze: '#cd7f32',
          profit: '#10b981',
          loss: '#ef4444',
          neutral: '#6b7280',
        },
      },
      
      // Enhanced spacing system
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
        '192': '48rem',
        '256': '64rem',
        '320': '80rem',
        '384': '96rem',
        '448': '112rem',
        '512': '128rem',
        // Mobile-specific spacing
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      
      // Enhanced border radius
      borderRadius: {
        'sm': '0.375rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        'full': '9999px',
        'none': '0',
        't-sm': '0.375rem 0.375rem 0 0',
        't-md': '0.5rem 0.5rem 0 0',
        't-lg': '0.75rem 0.75rem 0 0',
        't-xl': '1rem 1rem 0 0',
        't-2xl': '1.5rem 1.5rem 0 0',
        't-3xl': '2rem 2rem 0 0',
        'b-sm': '0 0 0.375rem 0.375rem',
        'b-md': '0 0 0.5rem 0.5rem',
        'b-lg': '0 0 0.75rem 0.75rem',
        'b-xl': '0 0 1rem 1rem',
        'b-2xl': '0 0 1.5rem 1.5rem',
        'b-3xl': '0 0 2rem 2rem',
      },
      
      // Professional shadows
      boxShadow: {
        'premium': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'premium-lg': '0 35px 60px -12px rgba(0, 0, 0, 0.3)',
        'premium-xl': '0 50px 100px -12px rgba(0, 0, 0, 0.35)',
        'inner-premium': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'glow': '0 0 20px rgba(59, 130, 246, 0.5)',
        'glow-success': '0 0 20px rgba(16, 185, 129, 0.5)',
        'glow-warning': '0 0 20px rgba(245, 158, 11, 0.5)',
        'glow-danger': '0 0 20px rgba(239, 68, 68, 0.5)',
        'mobile': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'mobile-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      
      // Enhanced backdrop blur
      backdropBlur: {
        'premium': '20px',
        'ultra': '40px',
        'mobile': '10px',
      },
      
      // Professional animations
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'slide-in-up': 'slideInUp 0.6s ease-out',
        'slide-in-down': 'slideInDown 0.6s ease-out',
        'shimmer': 'shimmer 2s infinite',
        'spin-slow': 'spin 3s linear infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
        'ripple': 'ripple 0.6s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'scale-out': 'scaleOut 0.3s ease-out',
        'rotate-in': 'rotateIn 0.6s ease-out',
        'flip-in': 'flipIn 0.6s ease-out',
        'zoom-in': 'zoomIn 0.3s ease-out',
        'zoom-out': 'zoomOut 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
        'fade-out': 'fadeOut 0.3s ease-out',
        'blur-in': 'blurIn 0.3s ease-out',
        'blur-out': 'blurOut 0.3s ease-out',
      },
      
      // Enhanced keyframes
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeInUp: {
          'from': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        slideInRight: {
          'from': {
            opacity: '0',
            transform: 'translateX(30px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        slideInLeft: {
          'from': {
            opacity: '0',
            transform: 'translateX(-30px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        slideInUp: {
          'from': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        slideInDown: {
          'from': {
            opacity: '0',
            transform: 'translateY(-30px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200px 0' },
          '100%': { backgroundPosition: 'calc(200px + 100%) 0' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        },
        scaleIn: {
          'from': { transform: 'scale(0.9)', opacity: '0' },
          'to': { transform: 'scale(1)', opacity: '1' },
        },
        scaleOut: {
          'from': { transform: 'scale(1)', opacity: '1' },
          'to': { transform: 'scale(0.9)', opacity: '0' },
        },
        rotateIn: {
          'from': { transform: 'rotate(-200deg)', opacity: '0' },
          'to': { transform: 'rotate(0deg)', opacity: '1' },
        },
        flipIn: {
          'from': { transform: 'perspective(400px) rotateY(90deg)', opacity: '0' },
          'to': { transform: 'perspective(400px) rotateY(0deg)', opacity: '1' },
        },
        zoomIn: {
          'from': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { opacity: '1' },
          'to': { transform: 'scale(1)', opacity: '1' },
        },
        zoomOut: {
          'from': { transform: 'scale(1)', opacity: '1' },
          '50%': { opacity: '1' },
          'to': { transform: 'scale(0.3)', opacity: '0' },
        },
        slideUp: {
          'from': { transform: 'translateY(100%)' },
          'to': { transform: 'translateY(0)' },
        },
        slideDown: {
          'from': { transform: 'translateY(-100%)' },
          'to': { transform: 'translateY(0)' },
        },
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        fadeOut: {
          'from': { opacity: '1' },
          'to': { opacity: '0' },
        },
        blurIn: {
          'from': { filter: 'blur(10px)', opacity: '0' },
          'to': { filter: 'blur(0px)', opacity: '1' },
        },
        blurOut: {
          'from': { filter: 'blur(0px)', opacity: '1' },
          'to': { filter: 'blur(10px)', opacity: '0' },
        },
      },
      
      // Enhanced typography
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
        // Mobile-optimized font sizes
        'mobile-xs': ['0.625rem', { lineHeight: '0.875rem' }],
        'mobile-sm': ['0.75rem', { lineHeight: '1rem' }],
        'mobile-base': ['0.875rem', { lineHeight: '1.25rem' }],
        'mobile-lg': ['1rem', { lineHeight: '1.5rem' }],
        'mobile-xl': ['1.125rem', { lineHeight: '1.75rem' }],
        'mobile-2xl': ['1.25rem', { lineHeight: '1.75rem' }],
        'mobile-3xl': ['1.5rem', { lineHeight: '2rem' }],
      },
      
      // Enhanced font weights
      fontWeight: {
        'thin': '100',
        'extralight': '200',
        'light': '300',
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
        'extrabold': '800',
        'black': '900',
      },
      
      // Enhanced line heights
      lineHeight: {
        'none': '1',
        'tight': '1.25',
        'snug': '1.375',
        'normal': '1.5',
        'relaxed': '1.625',
        'loose': '2',
        '3': '.75rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '7': '1.75rem',
        '8': '2rem',
        '9': '2.25rem',
        '10': '2.5rem',
      },
      
      // Enhanced z-index
      zIndex: {
        'auto': 'auto',
        '0': '0',
        '10': '10',
        '20': '20',
        '30': '30',
        '40': '40',
        '50': '50',
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
        'max': '999999',
        'modal': '1000',
        'tooltip': '1100',
        'popover': '1200',
        'notification': '1300',
        'overlay': '1400',
        'drawer': '1500',
        'dropdown': '1600',
        'sticky': '1700',
        'fixed': '1800',
      },
      
      // Enhanced grid
      gridTemplateColumns: {
        'mobile': 'repeat(auto-fit, minmax(280px, 1fr))',
        'tablet': 'repeat(auto-fit, minmax(320px, 1fr))',
        'desktop': 'repeat(auto-fit, minmax(400px, 1fr))',
        'dashboard': 'repeat(auto-fit, minmax(300px, 1fr))',
        'cards': 'repeat(auto-fill, minmax(250px, 1fr))',
        'sidebar': '250px 1fr',
        'sidebar-collapsed': '64px 1fr',
      },
      
      // Enhanced flex
      flex: {
        'mobile': '1 1 100%',
        'tablet': '1 1 50%',
        'desktop': '1 1 33.333333%',
        'auto': '1 1 auto',
        'initial': '0 1 auto',
        'none': 'none',
        '1': '1 1 0%',
        '2': '2 2 0%',
        '3': '3 3 0%',
        '4': '4 4 0%',
        '5': '5 5 0%',
        '6': '6 6 0%',
      },
    },
  },
  plugins: [
    // Custom utilities for mobile responsiveness
    function({ addUtilities, theme }) {
      const newUtilities = {
        '.touch-manipulation': {
          'touch-action': 'manipulation',
        },
        '.touch-none': {
          'touch-action': 'none',
        },
        '.touch-pan-x': {
          'touch-action': 'pan-x',
        },
        '.touch-pan-left': {
          'touch-action': 'pan-left',
        },
        '.touch-pan-right': {
          'touch-action': 'pan-right',
        },
        '.touch-pan-y': {
          'touch-action': 'pan-y',
        },
        '.touch-pan-up': {
          'touch-action': 'pan-up',
        },
        '.touch-pan-down': {
          'touch-action': 'pan-down',
        },
        '.touch-pinch-zoom': {
          'touch-action': 'pinch-zoom',
        },
        '.touch-auto': {
          'touch-action': 'auto',
        },
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        '.scrollbar-thin': {
          'scrollbar-width': 'thin',
          '&::-webkit-scrollbar': {
            width: '6px',
            height: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: theme('colors.gray.300'),
            borderRadius: '3px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: theme('colors.gray.400'),
          },
        },
        '.text-balance': {
          'text-wrap': 'balance',
        },
        '.text-pretty': {
          'text-wrap': 'pretty',
        },
        '.text-unset': {
          'text-wrap': 'unset',
        },
        '.hyphens-auto': {
          'hyphens': 'auto',
        },
        '.hyphens-manual': {
          'hyphens': 'manual',
        },
        '.hyphens-none': {
          'hyphens': 'none',
        },
        '.writing-mode-vertical': {
          'writing-mode': 'vertical-rl',
        },
        '.writing-mode-horizontal': {
          'writing-mode': 'horizontal-tb',
        },
        '.text-orientation-mixed': {
          'text-orientation': 'mixed',
        },
        '.text-orientation-upright': {
          'text-orientation': 'upright',
        },
        '.text-orientation-sideways': {
          'text-orientation': 'sideways',
        },
        '.text-orientation-sideways-right': {
          'text-orientation': 'sideways-right',
        },
        '.text-orientation-use-glyph-orientation': {
          'text-orientation': 'use-glyph-orientation',
        },
        '.text-orientation-from-font': {
          'text-orientation': 'from-font',
        },
        '.text-orientation-auto': {
          'text-orientation': 'auto',
        },
        '.text-orientation-initial': {
          'text-orientation': 'initial',
        },
        '.text-orientation-inherit': {
          'text-orientation': 'inherit',
        },
        '.text-orientation-unset': {
          'text-orientation': 'unset',
        },
      }
      addUtilities(newUtilities)
    },
  ],
}

export default config
