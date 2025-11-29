/**
 * Custom hook for managing auto-scroll behavior in scrollable containers
 */

import { useEffect, useRef, useCallback } from 'react';

interface UseAutoScrollConfig {
  dependency?: unknown;
  smooth?: boolean;
  delay?: number;
  respectReducedMotion?: boolean;
}

interface UseAutoScrollReturn {
  scrollRef: React.RefObject<HTMLDivElement | null>;
  scrollToBottom: () => void;
  isAtBottom: () => boolean;
}

/**
 * Default configuration values
 */
const DEFAULT_CONFIG: Required<UseAutoScrollConfig> = {
  dependency: undefined,
  smooth: true,
  delay: 0,
  respectReducedMotion: true,
} as const;

/**
 * Custom hook for auto-scroll functionality
 */
export function useAutoScroll(config: UseAutoScrollConfig = {}): UseAutoScrollReturn {
  const {
    dependency,
    smooth,
    delay,
    respectReducedMotion,
  } = { ...DEFAULT_CONFIG, ...config };

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  /**
   * Check if user prefers reduced motion
   */
  const prefersReducedMotion = useCallback((): boolean => {
    if (!respectReducedMotion) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, [respectReducedMotion]);

  /**
   * Check if element is scrolled to bottom within threshold
   */
  const isAtBottom = useCallback((): boolean => {
    const element = scrollRef.current;
    if (!element) return false;

    const threshold = 5; // 5px threshold for "bottom"
    const { scrollTop, scrollHeight, clientHeight } = element;
    return scrollTop + clientHeight >= scrollHeight - threshold;
  }, []);

  /**
   * Scroll to bottom with optional smooth behavior
   */
  const scrollToBottom = useCallback((): void => {
    const element = scrollRef.current;
    if (!element) return;

    // Clear any pending scroll
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const performScroll = (): void => {
      const shouldUseSmooth = smooth && !prefersReducedMotion();
      
      element.scrollTo({
        top: element.scrollHeight,
        behavior: shouldUseSmooth ? 'smooth' : 'instant',
      });
    };

    if (delay > 0) {
      timeoutRef.current = setTimeout(performScroll, delay);
    } else {
      // Use RAF for better performance
      requestAnimationFrame(performScroll);
    }
  }, [smooth, delay, prefersReducedMotion]);

  /**
   * Auto-scroll when dependency changes
   */
  useEffect(() => {
    if (dependency !== undefined) {
      scrollToBottom();
    }
  }, [dependency, scrollToBottom]);

  /**
   * Cleanup timeout on unmount
   */
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    scrollRef,
    scrollToBottom,
    isAtBottom,
  };
}

/**
 * Type exports for external use
 */
export type { UseAutoScrollConfig, UseAutoScrollReturn };
