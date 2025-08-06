'use client';

import Script from 'next/script';
import { UMAMI_WEBSITE_ID, UMAMI_SRC } from '../lib/analytics';

/**
 * Umami Analytics component with optimized loading
 * Only loads in production environment
 */
export default function UmamiAnalytics() {
  // Only load Umami in production
  if (process.env.NODE_ENV !== 'production' || !UMAMI_WEBSITE_ID) {
    return null;
  }

  return (
    <Script
      async
      defer
      data-website-id={UMAMI_WEBSITE_ID}
      src={UMAMI_SRC}
      strategy="afterInteractive"
    />
  );
}
