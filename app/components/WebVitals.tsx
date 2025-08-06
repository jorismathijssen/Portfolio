'use client';

import { useReportWebVitals } from 'next/web-vitals';
import { trackPerformance } from '../lib/analytics';

/**
 * Web Vitals tracking component for Core Web Vitals metrics
 */
export default function WebVitals() {
  useReportWebVitals((metric) => {
    // Track Core Web Vitals performance metrics
    trackPerformance(metric.name, metric.value);
  });

  return null;
}
