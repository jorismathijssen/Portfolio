'use client';

import { useReportWebVitals } from 'next/web-vitals';
import { trackWebVital } from '../lib/analytics';

/**
 * Web Vitals tracking component for Core Web Vitals metrics
 * Tracks performance metrics with proper categorization and ratings
 * 
 * Core Web Vitals tracked:
 * - CLS: Cumulative Layout Shift (visual stability)
 * - FID: First Input Delay (interactivity) 
 * - FCP: First Contentful Paint (loading)
 * - LCP: Largest Contentful Paint (loading)
 * - TTFB: Time to First Byte (server response)
 * - INP: Interaction to Next Paint (responsiveness)
 */
export default function WebVitals() {
  useReportWebVitals((metric) => {
    // Determine rating based on Google's Core Web Vitals thresholds
    const getRating = (name: string, value: number): 'good' | 'needs-improvement' | 'poor' => {
      switch (name) {
        case 'CLS':
          return value <= 0.1 ? 'good' : value <= 0.25 ? 'needs-improvement' : 'poor';
        case 'FID':
          return value <= 100 ? 'good' : value <= 300 ? 'needs-improvement' : 'poor';
        case 'FCP':
          return value <= 1800 ? 'good' : value <= 3000 ? 'needs-improvement' : 'poor';
        case 'LCP':
          return value <= 2500 ? 'good' : value <= 4000 ? 'needs-improvement' : 'poor';
        case 'TTFB':
          return value <= 800 ? 'good' : value <= 1800 ? 'needs-improvement' : 'poor';
        case 'INP':
          return value <= 200 ? 'good' : value <= 500 ? 'needs-improvement' : 'poor';
        default:
          return value <= 2500 ? 'good' : value <= 4000 ? 'needs-improvement' : 'poor';
      }
    };

    // Get device type for better insights
    const getDeviceType = (): string => {
      if (typeof window === 'undefined') return 'unknown';
      
      const userAgent = navigator.userAgent;
      if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
        return 'mobile';
      }
      if (/iPad/i.test(userAgent)) {
        return 'tablet';
      }
      return 'desktop';
    };

    // Get connection type if available
    const getConnectionType = (): string => {
      if (typeof window === 'undefined') return 'unknown';
      
      const connection = (navigator as {
        connection?: { effectiveType?: string };
        mozConnection?: { effectiveType?: string };
        webkitConnection?: { effectiveType?: string };
      }).connection || (navigator as { mozConnection?: { effectiveType?: string } }).mozConnection || (navigator as { webkitConnection?: { effectiveType?: string } }).webkitConnection;
      return connection?.effectiveType || 'unknown';
    };

    // Track Core Web Vitals with enhanced context
    const metricName = metric.name as 'CLS' | 'FID' | 'FCP' | 'LCP' | 'TTFB' | 'INP';
    const rating = getRating(metric.name, metric.value);
    
    // Enhanced tracking with session context
    trackWebVital(metricName, metric.value, rating);
    
    // Set session data for broader analysis patterns
    if (typeof window !== 'undefined' && window.umami?.identify) {
      const deviceType = getDeviceType();
      const connectionType = getConnectionType();
      
      // This creates session-level context that applies to all events
      // Using identify with data object (no unique ID needed for device context)
      try {
        // TypeScript workaround for Umami's flexible identify API
        const identify = window.umami.identify as unknown as (data: { [key: string]: string }) => Promise<string>;
        identify({
          device_type: deviceType,
          connection_type: connectionType,
          performance_context: `${deviceType}_${connectionType}`
        });
      } catch {
        // Silently fail if identify doesn't support data-only mode
      }
    }
    
    // Log performance issues in development
    if (process.env.NODE_ENV === 'development' && rating === 'poor') {
      console.warn(`🐌 Poor ${metric.name} performance:`, {
        value: metric.value,
        rating,
        device: getDeviceType(),
        connection: getConnectionType(),
        page: window.location.pathname
      });
    }
  });

  return null;
}
