'use client';

import { useReportWebVitals } from 'next/web-vitals';
import { trackWebVitals } from '../lib/analytics';

/**
 * Enhanced Web Vitals tracking component for Core Web Vitals metrics
 */
export default function WebVitals() {
  useReportWebVitals((metric) => {
    // Track Core Web Vitals with enhanced data
    trackWebVitals(metric.name, metric.value, metric.rating);
  });

  return null;
}
