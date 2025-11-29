/**
 * Application Providers Component
 * 
 * Centralized provider composition for the entire application.
 * Manages global state, theme context, internationalization,
 * and other cross-cutting concerns.
 * 
 * @since 1.0.0
 * @public
 */

'use client';

import React, { Suspense, type ErrorInfo } from 'react';
import { clsx } from 'clsx';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import ErrorBoundary from '@/components/ErrorBoundary';

/**
 * Provider configuration interface
 * @interface ProviderConfig
 * @since 1.0.0
 * @internal
 */
interface ProviderConfig {
  /** Whether to enable theme switching functionality */
  enableTheme?: boolean;
  /** Whether to enable analytics tracking */
  enableAnalytics?: boolean;
  /** Whether to enable error reporting */
  enableErrorReporting?: boolean;
  /** Custom error boundary fallback */
  errorFallback?: React.ReactNode;
}

/**
 * Providers component props interface
 * @interface ProvidersProps
 * @since 1.0.0
 * @public
 */
interface ProvidersProps {
  /** Child components to wrap with providers */
  children: React.ReactNode;
  /** Provider configuration options */
  config?: ProviderConfig;
  /** Additional CSS classes for provider container */
  className?: string;
}

/**
 * Default provider configuration
 * @constant
 * @internal
 */
const DEFAULT_CONFIG: Required<ProviderConfig> = {
  enableTheme: true,
  enableAnalytics: process.env.NODE_ENV === 'production',
  enableErrorReporting: process.env.NODE_ENV === 'production',
  errorFallback: null,
} as const;

/**
 * Provider Content Component
 * 
 * Contains all client-side provider components that need to be
 * rendered within the provider tree. Separated for better
 * code organization and lazy loading.
 * 
 * @param config - Provider configuration
 * @returns Provider content components
 * 
 * @internal
 */
function ProviderContent({ 
  config = DEFAULT_CONFIG 
}: { 
  config: Required<ProviderConfig> 
}): React.JSX.Element {
  return (
    <>
      {/* Theme Management */}
      {config.enableTheme && <ThemeSwitcher />}
      
      {/* Analytics Integration */}
      {config.enableAnalytics && (
        <div 
          id="analytics-providers"
          className="sr-only"
          aria-hidden="true"
        >
          {/* Add analytics providers here (Google Analytics, Plausible, etc.) */}
        </div>
      )}
      
      {/* Additional client components can be added here */}
    </>
  );
}

/**
 * Main Providers Component
 * 
 * A comprehensive provider wrapper that manages all application-wide
 * context providers, error boundaries, and global state management.
 * 
 * @remarks
 * This component provides:
 * - Error boundary protection for the entire application
 * - Theme context and switching functionality
 * - Internationalization support (when i18n provider is added)
 * - Analytics tracking setup
 * - Suspense boundaries for lazy-loaded components
 * - Configurable provider enabling/disabling
 * 
 * The component follows the provider composition pattern recommended
 * by React for managing multiple context providers efficiently.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Providers>
 *   <App />
 * </Providers>
 * 
 * // With custom configuration
 * <Providers
 *   config={{
 *     enableTheme: true,
 *     enableAnalytics: false,
 *     enableErrorReporting: true,
 *   }}
 *   className="custom-provider-wrapper"
 * >
 *   <App />
 * </Providers>
 * ```
 * 
 * @param props - Providers component props
 * @returns Wrapped application with all providers
 * 
 * @since 1.0.0
 * @public
 */
export function Providers({ 
  children, 
  config: userConfig = {},
  className 
}: ProvidersProps): React.JSX.Element {
  // Merge user config with defaults
  const config = { ...DEFAULT_CONFIG, ...userConfig };
  
  // Generate container classes
  const containerClasses = clsx(
    'providers-container',
    'relative',
    className
  );

  return (
    <div className={containerClasses}>
      {/* Global Error Boundary */}
      <ErrorBoundary
        level="page"
        showDetails={process.env.NODE_ENV === 'development'}
        onError={(error: Error, errorInfo: ErrorInfo, errorId: string) => {
          if (config.enableErrorReporting) {
            // Log to external error reporting service
            console.error('Global error boundary triggered:', {
              error,
              errorInfo,
              errorId,
              timestamp: new Date().toISOString(),
            });
          }
        }}
        fallback={config.errorFallback}
      >
        {/* Suspense Boundary for Lazy Loading */}
        <Suspense 
          fallback={
            <div 
              className="providers-loading flex items-center justify-center p-4"
              role="status"
              aria-label="Loading application providers"
            >
              <div className="animate-spin h-6 w-6 border-2 border-blue-500 border-t-transparent rounded-full" />
              <span className="sr-only">Loading providers...</span>
            </div>
          }
        >
          <ProviderContent config={config} />
        </Suspense>
        
        {/* Main Application Content */}
        {children}
      </ErrorBoundary>
    </div>
  );
}

/**
 * Provider HOC for easier integration
 * 
 * @example
 * ```tsx
 * const AppWithProviders = withProviders(App, {
 *   enableTheme: true,
 *   enableAnalytics: true,
 * });
 * ```
 * 
 * @param Component - Component to wrap with providers
 * @param config - Provider configuration
 * @returns Component wrapped with providers
 * 
 * @since 1.0.0
 * @public
 */
export function withProviders<P extends object>(
  Component: React.ComponentType<P>,
  config?: ProviderConfig
) {
  const WrappedComponent = (props: P) => {
    // Handle exactOptionalPropertyTypes compatibility
    const providersProps: ProvidersProps = {
      children: <Component {...props} />,
      ...(config !== undefined && { config }),
    };
    
    return <Providers {...providersProps} />;
  };
  
  WrappedComponent.displayName = `withProviders(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
}

/**
 * Type exports for external usage
 */
export type { ProvidersProps, ProviderConfig };
