'use client';

import { useReportWebVitals } from 'next/web-vitals';
import { trackEvent } from '../lib/analytics';

/**
 * Web Vitals tracking component for Core Web Vitals metrics
 */
export default function WebVitals() {
  useReportWebVitals((metric) => {
    // Track Core Web Vitals with Umami
    trackEvent('web_vitals', {
      metric: metric.name,
      value: Math.round(metric.value),
      rating: metric.rating,
    });
  });

  return null;
}
