'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { clsx } from 'clsx';
import { ERROR_MESSAGES } from '@/constants';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorId: string | null;
  timestamp: Date | null;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo, errorId: string) => void;
  className?: string;
  showDetails?: boolean;
  showRetry?: boolean;
  showReload?: boolean;
  errorMessage?: string;
  level?: 'page' | 'section' | 'component';
}

interface ErrorContext {
  error: Error;
  errorInfo: ErrorInfo;
  errorId: string;
  level: string;
  timestamp: Date;
  userAgent?: string | undefined;
  url?: string | undefined;
  componentStack?: string | undefined;
}

const ERROR_LEVELS = {
  page: {
    containerClass: 'min-h-screen',
    iconSize: 'h-12 w-12',
    titleSize: 'text-2xl',
  },
  section: {
    containerClass: 'min-h-[400px]',
    iconSize: 'h-10 w-10',
    titleSize: 'text-xl',
  },
  component: {
    containerClass: 'min-h-[200px]',
    iconSize: 'h-8 w-8',
    titleSize: 'text-lg',
  },
} as const;

/**
 * Comprehensive Error Boundary Component
 * 
 * A robust error boundary implementation that catches JavaScript errors
 * anywhere in the child component tree, logs those errors, and displays
 * a fallback UI instead of crashing the entire application.
 * 
 * @remarks
 * This error boundary provides:
 * - Comprehensive error catching and handling
 * - Detailed error logging for development and production
 * - User-friendly fallback UI with recovery options
 * - Accessibility compliance with proper ARIA attributes
 * - Dark mode support and responsive design
 * - Error tracking and reporting capabilities
 * - Customizable error display based on boundary level
 * - Graceful degradation and recovery mechanisms
 * 
 * The component follows React's error boundary best practices and provides
 * multiple recovery options for users.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <ErrorBoundary>
 *   <MyComponent />
 * </ErrorBoundary>
 * 
 * // Advanced usage with custom error handling
 * <ErrorBoundary
 *   level="section"
 *   onError={(error, errorInfo, errorId) => {
 *     logToAnalytics(error, errorId);
 *   }}
 *   fallback={<CustomErrorDisplay />}
 *   showDetails={true}
 * >
 *   <ComplexComponent />
 * </ErrorBoundary>
 * ```
 * 
 * @since 1.0.0
 * @public
 */
export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  /**
   * Error boundary constructor
   * @param props - Component props
   */
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null,
      timestamp: null,
    };
  }

  /**
   * Static method to update state when error is caught
   * 
   * @param error - The error that was thrown
   * @returns Partial state update
   * 
   * @static
   * @since 1.0.0
   */
  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    const errorId = `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    return {
      hasError: true,
      error,
      errorId,
      timestamp: new Date(),
    };
  }

  /**
   * Lifecycle method called after error is caught
   * 
   * Handles error logging, reporting, and state updates with comprehensive
   * error information for debugging and monitoring purposes.
   * 
   * @param error - The error that was thrown
   * @param errorInfo - React error boundary information
   * 
   * @since 1.0.0
   */
  override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    const errorId = this.state.errorId || `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Enhanced error logging
    const errorContext: ErrorContext = {
      error,
      errorInfo,
      errorId,
      timestamp: new Date(),
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : 'Unknown',
      url: typeof window !== 'undefined' ? window.location.href : 'Unknown',
      level: this.props.level || 'component',
      componentStack: errorInfo.componentStack || undefined,
    };

    // Console logging with structured data
    console.group(`🚨 ErrorBoundary: ${error.name}`);
    console.error('Error:', error);
    console.error('Error Info:', errorInfo);
    console.error('Context:', errorContext);
    console.groupEnd();

    // Update state with error info
    this.setState({
      errorInfo,
      errorId,
    });

    // Call optional error callback with enhanced context
    this.props.onError?.(error, errorInfo, errorId);

    // Production error reporting
    if (process.env.NODE_ENV === 'production') {
      this.reportErrorToService(errorContext);
    }
  }

  /**
   * Report error to external monitoring service
   * 
   * @param errorContext - Comprehensive error context
   * @private
   */
  private reportErrorToService = (errorContext: ErrorContext): void => {
    // Example error reporting integration
    try {
      // Replace with your error reporting service
      // Examples: Sentry, LogRocket, Bugsnag, etc.
      // Sentry.captureException(errorContext.error, {
      //   tags: { errorBoundary: true, level: errorContext.level },
      //   extra: errorContext,
      // });
      
      console.warn('Error reported to monitoring service:', errorContext.errorId);
    } catch (reportingError) {
      console.error('Failed to report error:', reportingError);
    }
  };

  /**
   * Reset error boundary state to recover from error
   * 
   * @public
   */
  resetError = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null,
      timestamp: null,
    });
  };

  /**
   * Reload the current page as a recovery mechanism
   * 
   * @public
   */
  reloadPage = (): void => {
    try {
      window.location.reload();
    } catch (error) {
      // Fallback if reload fails
      console.error('Failed to reload page:', error);
    }
  };

  /**
   * Render method with enhanced error UI
   * 
   * @returns React node - either children or error UI
   * 
   * @public
   */
  override render(): ReactNode {
    const {
      children,
      fallback,
      className,
      showDetails = process.env.NODE_ENV === 'development',
      showRetry = true,
      showReload = true,
      errorMessage,
      level = 'component',
    } = this.props;

    const { hasError, error, errorInfo, errorId, timestamp } = this.state;

    // Render children if no error
    if (!hasError) {
      return children;
    }

    // Render custom fallback if provided
    if (fallback) {
      return fallback;
    }

    // Get level-specific styling
    const levelConfig = ERROR_LEVELS[level];

    // Generate error container classes
    const containerClasses = clsx(
      'error-boundary',
      levelConfig.containerClass,
      'flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4',
      className
    );

    const cardClasses = clsx(
      'error-boundary__card',
      'max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6',
      'border border-red-200 dark:border-red-800',
      'transform transition-all duration-200'
    );

    const iconClasses = clsx(
      'error-boundary__icon',
      levelConfig.iconSize,
      'text-red-500'
    );

    const titleClasses = clsx(
      'error-boundary__title',
      levelConfig.titleSize,
      'font-semibold text-gray-900 dark:text-gray-100'
    );

    // Default error UI with comprehensive information
    return (
      <div
        className={containerClasses}
        role="alert"
        aria-live="assertive"
        aria-labelledby="error-title"
        aria-describedby="error-description"
      >
        <div className={cardClasses}>
          {/* Error Header */}
          <div className="error-boundary__header flex items-center mb-4">
            <div className="flex-shrink-0">
              <svg 
                className={iconClasses}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                aria-hidden="true"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" 
                />
              </svg>
            </div>
            <div className="ml-3">
              <h2 id="error-title" className={titleClasses}>
                Something went wrong
              </h2>
              {errorId && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Error ID: {errorId}
                </p>
              )}
            </div>
          </div>

          {/* Error Description */}
          <div className="error-boundary__content mb-4">
            <p id="error-description" className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {errorMessage || ERROR_MESSAGES.GENERIC}
            </p>

            {timestamp && (
              <p className="text-xs text-gray-500 dark:text-gray-500 mb-3">
                Occurred at: {timestamp.toLocaleString()}
              </p>
            )}

            {/* Development Error Details */}
            {showDetails && error && (
              <details className="error-boundary__details mb-4">
                <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                  🔍 Error Details ({process.env.NODE_ENV})
                </summary>
                <div className="mt-2 p-3 bg-gray-100 dark:bg-gray-700 rounded text-xs font-mono overflow-auto max-h-40">
                  <div className="text-red-600 dark:text-red-400 mb-2">
                    <strong>Error Type:</strong> {error.name}
                  </div>
                  <div className="text-red-600 dark:text-red-400 mb-2">
                    <strong>Message:</strong> {error.message}
                  </div>
                  {error.stack && (
                    <div className="text-gray-600 dark:text-gray-400">
                      <strong>Stack Trace:</strong>
                      <pre className="whitespace-pre-wrap mt-1 text-xs">
                        {error.stack}
                      </pre>
                    </div>
                  )}
                  {errorInfo?.componentStack && (
                    <div className="text-gray-600 dark:text-gray-400 mt-2">
                      <strong>Component Stack:</strong>
                      <pre className="whitespace-pre-wrap mt-1 text-xs">
                        {errorInfo.componentStack}
                      </pre>
                    </div>
                  )}
                </div>
              </details>
            )}
          </div>

          {/* Action Buttons */}
          <div className="error-boundary__actions flex flex-col sm:flex-row gap-2">
            {showRetry && (
              <button
                type="button"
                onClick={this.resetError}
                className={clsx(
                  'error-boundary__retry-button',
                  'flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600',
                  'text-white font-medium py-2 px-4 rounded-md transition-colors duration-200',
                  'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                  'dark:focus:ring-offset-gray-800',
                  'disabled:opacity-50 disabled:cursor-not-allowed'
                )}
                aria-describedby="retry-description"
              >
                🔄 Try Again
              </button>
            )}
            
            {showReload && (
              <button
                type="button"
                onClick={this.reloadPage}
                className={clsx(
                  'error-boundary__reload-button',
                  'flex-1 bg-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600',
                  'text-white font-medium py-2 px-4 rounded-md transition-colors duration-200',
                  'focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2',
                  'dark:focus:ring-offset-gray-800',
                  'disabled:opacity-50 disabled:cursor-not-allowed'
                )}
                aria-describedby="reload-description"
              >
                🔄 Reload Page
              </button>
            )}
          </div>

          {/* Accessible descriptions for screen readers */}
          <div className="sr-only">
            <p id="retry-description">
              Attempt to recover from the error and continue using the application
            </p>
            <p id="reload-description">
              Reload the entire page to reset the application state
            </p>
          </div>
        </div>
      </div>
    );
  }
}
