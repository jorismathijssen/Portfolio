import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { cn } from '../../lib/utils';
import { DEFAULTS, Z_INDEX, STORAGE_KEYS } from '../../constants';
import type { BaseComponentProps, AccessibleProps } from '../../types';

/**
 * Props for the Toaster popup component
 */
interface ToasterProps extends BaseComponentProps, AccessibleProps {
  /** Called when the toaster is clicked */
  onClick: () => void;
  /** Optional custom message */
  message?: string;
}

/**
 * Toaster popup that invites users to try the terminal
 * 
 * Features:
 * - Automatic visibility management based on visit count
 * - Auto-hide after timeout
 * - Accessible with proper ARIA attributes
 * - Click-to-dismiss functionality
 * - Local storage persistence
 * - Keyboard navigation support
 * 
 * @param props - Toaster component props
 * @returns Toaster component or null if hidden
 */
export default function Toaster({ 
  onClick, 
  message = 'Try the terminal!',
  className,
  'aria-label': ariaLabel,
  'data-testid': testId = 'terminal-toaster',
}: ToasterProps): React.JSX.Element | null {
  const [visible, setVisible] = useState(false);

  /**
   * Handle toaster click with proper cleanup
   */
  const handleClick = useCallback(() => {
    setVisible(false);
    onClick();
  }, [onClick]);

  /**
   * Get visit count from localStorage safely
   */
  const getVisitCount = useCallback((): number => {
    try {
      return parseInt(localStorage.getItem(STORAGE_KEYS.TOASTER_VISITS) || '0', 10);
    } catch {
      return 0;
    }
  }, []);

  /**
   * Increment visit count in localStorage safely
   */
  const incrementVisitCount = useCallback((currentCount: number): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.TOASTER_VISITS, String(currentCount + 1));
    } catch {
      // Fail silently if localStorage is not available
    }
  }, []);

  // Memoized styles for performance
  const toasterClasses = useMemo(() => cn(
    'fixed bottom-6 right-24 z-50 bg-gray-900/90 text-green-400',
    'rounded-md border border-gray-700 shadow-lg p-2 pr-3',
    'flex items-center gap-2 cursor-pointer transition-all duration-200',
    'hover:bg-gray-800/90 hover:scale-105 focus:outline-hidden focus:ring-2 focus:ring-green-400',
    'w-48 text-sm font-mono',
    className
  ), [className]);

  // Setup visibility and auto-hide timer
  useEffect(() => {
    const visits = getVisitCount();
    
    if (visits < DEFAULTS.TOASTER_MAX_VISITS) {
      setVisible(true);
      incrementVisitCount(visits);
      
      const timer = setTimeout(() => {
        setVisible(false);
      }, DEFAULTS.TOASTER_TIMEOUT);
      
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [getVisitCount, incrementVisitCount]);

  if (!visible) {
    return null;
  }
  return (
    <div
      className={toasterClasses}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      style={{ zIndex: Z_INDEX.TOAST }}
      role="button"
      tabIndex={0}
      aria-label={ariaLabel || `${message} Click to open terminal`}
      data-testid={testId}
    >
      <span 
        role="img" 
        aria-label="terminal" 
        className="text-lg"
      >
        💻
      </span>
      
      <span className="flex-1 truncate">
        {message}
      </span>
      
      <span 
        className="font-bold text-sm ml-1"
        aria-hidden="true"
      >
        →
      </span>
    </div>
  );
}
