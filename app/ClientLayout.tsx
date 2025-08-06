"use client";

import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { ThemeProvider } from 'next-themes';
import { ErrorBoundary } from 'react-error-boundary';
import { z } from 'zod';

import i18n from '../lib/i18n';
import ThemeSwitcher from './components/ThemeSwitcher';
import LanguageSwitcher from './components/LanguageSwitcher';
import { Providers } from './providers';
import CustomErrorBoundary from './components/ErrorBoundary';

/**
 * Props for the ClientLayout component
 * 
 * @interface ClientLayoutProps
 * @since 1.0.0
 * @public
 */
interface ClientLayoutProps {
  /** Child components to render within the layout */
  children: React.ReactNode;
}

/**
 * Validation schema for ClientLayout props
 * 
 * @internal
 */
const ClientLayoutPropsSchema = z.object({
  children: z.any(), // React.ReactNode is complex to validate, using any for runtime safety
});

/**
 * Configuration for theme provider
 * 
 * @interface ThemeProviderConfig
 * @internal
 */
interface ThemeProviderConfig {
  /** HTML attribute to use for theme detection */
  attribute: 'class' | 'data-theme';
  /** Default theme to use */
  defaultTheme: 'light' | 'dark' | 'system';
  /** Whether to enable system theme detection */
  enableSystem: boolean;
  /** Storage key for theme persistence */
  storageKey?: string;
  /** Disable transitions on theme change */
  disableTransitionOnChange?: boolean;
}

/**
 * Default theme configuration
 * 
 * @constant
 * @internal
 */
const DEFAULT_THEME_CONFIG: ThemeProviderConfig = {
  attribute: 'class',
  defaultTheme: 'light',
  enableSystem: true,
  storageKey: 'portfolio-theme',
  disableTransitionOnChange: false,
};

/**
 * Error fallback component for layout errors
 * 
 * @param error - The error that occurred
 * @param resetErrorBoundary - Function to reset the error boundary
 * @returns Error fallback UI
 * @internal
 */
function LayoutErrorFallback({ 
  error, 
  resetErrorBoundary 
}: { 
  error: Error; 
  resetErrorBoundary: () => void; 
}): React.ReactElement {
  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-red-50 dark:bg-red-900/20"
      role="alert"
      aria-live="assertive"
    >
      <div className="text-center p-8 max-w-md">
        <h1 className="text-2xl font-bold text-red-800 dark:text-red-200 mb-4">
          Layout Error
        </h1>
        <p className="text-red-600 dark:text-red-300 mb-6">
          Something went wrong with the page layout. Please try refreshing the page.
        </p>
        <details className="text-left mb-6">
          <summary className="cursor-pointer text-red-700 dark:text-red-300 font-medium">
            Error Details
          </summary>
          <pre className="mt-2 text-xs text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/40 p-2 rounded overflow-auto">
            {error.message}
          </pre>
        </details>
        <button
          onClick={resetErrorBoundary}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          type="button"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

/**
 * Client-side layout wrapper component
 * 
 * Provides comprehensive client-side context providers including:
 * - Internationalization (i18next)
 * - Theme management (next-themes)
 * - Error boundary protection
 * - Application providers
 * 
 * This component wraps the entire application with necessary providers
 * and handles client-side initialization and error states.
 * 
 * @param props - Component props
 * @returns Wrapped application layout
 * 
 * @example
 * ```tsx
 * // Used in root layout
 * <ClientLayout>
 *   <HomePage />
 * </ClientLayout>
 * ```
 * 
 * @since 1.0.0
 * @public
 */
export default function ClientLayout({ children }: ClientLayoutProps): React.ReactElement {
  // Validate props at runtime for development safety
  if (process.env.NODE_ENV === 'development') {
    try {
      ClientLayoutPropsSchema.parse({ children });
    } catch (error) {
      console.warn('ClientLayout: Invalid props provided', error);
    }
  }

  return (
    <ErrorBoundary
      FallbackComponent={LayoutErrorFallback}
      onError={(error: Error, errorInfo: React.ErrorInfo) => {
        console.error('ClientLayout Error:', error, errorInfo);
        
        // In production, you might want to send this to an error reporting service
        if (process.env.NODE_ENV === 'production') {
          // Analytics or error reporting integration would go here
          console.error('Production layout error:', { error: error.message, stack: error.stack });
        }
      }}
      onReset={() => {
        // Optionally clear any cached state or refresh specific components
        console.info('ClientLayout: Error boundary reset');
      }}
    >
      <I18nextProvider i18n={i18n}>
        <CustomErrorBoundary>
          <Providers>
            <ThemeProvider {...DEFAULT_THEME_CONFIG}>
              <div className="relative">
                {/* Layout controls */}
                <div className="fixed top-4 right-4 z-50 flex gap-2">
                  <ThemeSwitcher />
                  <LanguageSwitcher />
                </div>
                
                {/* Main content */}
                <main role="main" className="min-h-screen">
                  {children}
                </main>
              </div>
            </ThemeProvider>
          </Providers>
        </CustomErrorBoundary>
      </I18nextProvider>
    </ErrorBoundary>
  );
}

/**
 * Type definitions for external usage
 */
export type { ClientLayoutProps, ThemeProviderConfig };
