import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

const colors = {
  brand: {
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
  
  error: {
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
  
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0a0a0a',
  },
} as const;

const typography = {
  fontFamily: {
    sans: ['var(--font-geist-sans)', ...fontFamily.sans] as string[],
    mono: ['var(--font-geist-mono)', ...fontFamily.mono] as string[],
    heading: ['var(--font-geist-sans)', ...fontFamily.sans] as string[],
  },
  
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }] as [string, { lineHeight: string }],
    sm: ['0.875rem', { lineHeight: '1.25rem' }] as [string, { lineHeight: string }],
    base: ['1rem', { lineHeight: '1.5rem' }] as [string, { lineHeight: string }],
    lg: ['1.125rem', { lineHeight: '1.75rem' }] as [string, { lineHeight: string }],
    xl: ['1.25rem', { lineHeight: '1.75rem' }] as [string, { lineHeight: string }],
    '2xl': ['1.5rem', { lineHeight: '2rem' }] as [string, { lineHeight: string }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }] as [string, { lineHeight: string }],
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }] as [string, { lineHeight: string }],
    '5xl': ['3rem', { lineHeight: '1' }] as [string, { lineHeight: string }],
    '6xl': ['3.75rem', { lineHeight: '1' }] as [string, { lineHeight: string }],
    '7xl': ['4.5rem', { lineHeight: '1' }] as [string, { lineHeight: string }],
    '8xl': ['6rem', { lineHeight: '1' }] as [string, { lineHeight: string }],
    '9xl': ['8rem', { lineHeight: '1' }] as [string, { lineHeight: string }],
  },
} as const;

const animations = {
  animation: {
    'terminal-cursor': 'terminal-cursor 1s infinite',
    'terminal-typing': 'terminal-typing 2s ease-in-out',
    'matrix-rain': 'matrix-rain 2s linear infinite',
    
    // Page transitions
    'fade-in': 'fade-in 0.5s ease-out',
    'slide-up': 'slide-up 0.6s ease-out',
    'slide-down': 'slide-down 0.6s ease-out',
    'scale-in': 'scale-in 0.4s ease-out',
    
    // Interactive effects
    'shake': 'shake 0.5s ease-in-out',
    'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    'bounce-gentle': 'bounce-gentle 2s infinite',
    
    // Loading states
    'spinner': 'spinner 1s linear infinite',
    'skeleton': 'skeleton 1.5s ease-in-out infinite alternate',
    
    // Hover effects
    'glow': 'glow 2s ease-in-out infinite alternate',
    'float': 'float 3s ease-in-out infinite',
  },
  
  keyframes: {
    'terminal-cursor': {
      '0%, 50%': { opacity: '1' },
      '51%, 100%': { opacity: '0' },
    },
    'terminal-typing': {
      'from': { width: '0' },
      'to': { width: '100%' },
    },
    'matrix-rain': {
      '0%': { transform: 'translateY(-100%)' },
      '100%': { transform: 'translateY(100vh)' },
    },
    'fade-in': {
      '0%': { opacity: '0' },
      '100%': { opacity: '1' },
    },
    'slide-up': {
      '0%': { transform: 'translateY(20px)', opacity: '0' },
      '100%': { transform: 'translateY(0)', opacity: '1' },
    },
    'slide-down': {
      '0%': { transform: 'translateY(-20px)', opacity: '0' },
      '100%': { transform: 'translateY(0)', opacity: '1' },
    },
    'scale-in': {
      '0%': { transform: 'scale(0.95)', opacity: '0' },
      '100%': { transform: 'scale(1)', opacity: '1' },
    },
    'shake': {
      '0%, 100%': { transform: 'translateX(0)' },
      '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-2px)' },
      '20%, 40%, 60%, 80%': { transform: 'translateX(2px)' },
    },
    'bounce-gentle': {
      '0%, 100%': { transform: 'translateY(0)' },
      '50%': { transform: 'translateY(-5px)' },
    },
    'spinner': {
      '0%': { transform: 'rotate(0deg)' },
      '100%': { transform: 'rotate(360deg)' },
    },
    'skeleton': {
      '0%': { opacity: '0.4' },
      '100%': { opacity: '0.6' },
    },
    'glow': {
      '0%': { boxShadow: '0 0 5px rgba(59, 130, 246, 0.5)' },
      '100%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.8)' },
    },
    'float': {
      '0%, 100%': { transform: 'translateY(0px)' },
      '50%': { transform: 'translateY(-10px)' },
    },
  },
} as const;

/**
 * Responsive breakpoints
 * 
 * @constant
 * @internal
 */
const screens = {
  xs: '475px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  '3xl': '1920px',
} as const;

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  
  darkMode: ['class', '[data-theme="dark"]'],
  
  theme: {
    screens,
    
    extend: {
      colors: {
        ...colors,
        
        // CSS variables for theming
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        'card-foreground': "hsl(var(--card-foreground))",
        popover: "hsl(var(--popover))",
        'popover-foreground': "hsl(var(--popover-foreground))",
        primary: "hsl(var(--primary))",
        'primary-foreground': "hsl(var(--primary-foreground))",
        secondary: "hsl(var(--secondary))",
        'secondary-foreground': "hsl(var(--secondary-foreground))",
        muted: "hsl(var(--muted))",
        'muted-foreground': "hsl(var(--muted-foreground))",
        accent: "hsl(var(--accent))",
        'accent-foreground': "hsl(var(--accent-foreground))",
        destructive: "hsl(var(--destructive))",
        'destructive-foreground': "hsl(var(--destructive-foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        
        // Terminal-specific colors
        terminal: {
          bg: 'var(--terminal-bg)',
          text: 'var(--terminal-text)',
          prompt: 'var(--terminal-prompt)',
          success: 'var(--terminal-success)',
          error: 'var(--terminal-error)',
          warning: 'var(--terminal-warning)',
        },
      },
      
      // Typography
      ...typography,
      
      // Animations
      ...animations,
      
      // Spacing scale
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
      },
      
      // Border radius
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        '4xl': '2rem',
      },
      
      // Box shadows with better contrast
      boxShadow: {
        'glow': '0 0 20px rgba(59, 130, 246, 0.3)',
        'glow-strong': '0 0 40px rgba(59, 130, 246, 0.5)',
        'terminal': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'card-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      
      // Z-index scale
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      
      // Backdrop blur
      backdropBlur: {
        xs: '2px',
      },
      
      // Grid template columns
      gridTemplateColumns: {
        '16': 'repeat(16, minmax(0, 1fr))',
        'auto-fit': 'repeat(auto-fit, minmax(250px, 1fr))',
        'auto-fill': 'repeat(auto-fill, minmax(200px, 1fr))',
      },
      
      // Aspect ratios
      aspectRatio: {
        '4/3': '4 / 3',
        '3/2': '3 / 2',
        '2/3': '2 / 3',
        '9/16': '9 / 16',
      },
    },
  },
  
  // Plugins for additional functionality
  plugins: [
    // Custom utilities plugin
    plugin(function({ addUtilities, addComponents, theme }) {
      // Terminal utilities
      addUtilities({
        '.terminal-font': {
          fontFamily: theme('fontFamily.mono'),
          fontFeatureSettings: '"liga" 0, "calt" 0',
        },
        '.text-shadow': {
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
        },
        '.text-shadow-lg': {
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
        '.glass': {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        },
        '.glass-dark': {
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
      });
      
      // Component utilities
      addComponents({
        '.btn': {
          padding: theme('spacing.2') + ' ' + theme('spacing.4'),
          borderRadius: theme('borderRadius.md'),
          fontWeight: theme('fontWeight.medium'),
          fontSize: theme('fontSize.sm'),
          lineHeight: theme('lineHeight.5'),
          transition: 'all 0.2s ease-in-out',
          '&:focus': {
            outline: '2px solid',
            outlineColor: theme('colors.blue.500'),
            outlineOffset: '2px',
          },
        },
        '.btn-primary': {
          backgroundColor: theme('colors.blue.600'),
          color: theme('colors.white'),
          '&:hover': {
            backgroundColor: theme('colors.blue.700'),
          },
          '&:active': {
            backgroundColor: theme('colors.blue.800'),
          },
        },
        '.btn-secondary': {
          backgroundColor: theme('colors.gray.200'),
          color: theme('colors.gray.900'),
          '&:hover': {
            backgroundColor: theme('colors.gray.300'),
          },
          '&:active': {
            backgroundColor: theme('colors.gray.400'),
          },
        },
        '.card': {
          backgroundColor: theme('colors.white'),
          borderRadius: theme('borderRadius.lg'),
          boxShadow: theme('boxShadow.card'),
          padding: theme('spacing.6'),
          '&:hover': {
            boxShadow: theme('boxShadow.card-hover'),
          },
        },
      });
    }),
    
    require('@tailwindcss/typography')({
      modifiers: ['lg', 'xl'],
    }),
    
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
    
    require('@tailwindcss/container-queries'),
  ],
  
  future: {
    hoverOnlyWhenSupported: true,
  },
  
  experimental: {
    optimizeUniversalDefaults: true,
  },
};

export default config;
