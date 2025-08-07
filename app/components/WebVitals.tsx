'use client';

import { useReportWebVitals } from 'next/web-vitals';
import { trackWebVital } from '../lib/analytics';

/**
 * Web Vitals tracking component for Core Web Vitals metrics
 * Tracks performance metrics with proper categorization and ratings
 */
export default function WebVitals() {
  useReportWebVitals((metric) => {
    // Determine rating based on thresholds
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

    // Track Core Web Vitals with proper categorization
    const metricName = metric.name as 'CLS' | 'FID' | 'FCP' | 'LCP' | 'TTFB' | 'INP';
    const rating = getRating(metric.name, metric.value);
    
    trackWebVital(metricName, metric.value, rating);
  });

  return null;
}
