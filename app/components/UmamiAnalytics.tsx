'use client';

import Script from 'next/script';
import { UMAMI_WEBSITE_ID, UMAMI_SRC } from '../lib/analytics';

/**
 * Umami Analytics component with optimized loading
 * Only loads in production environment
 */
export default function UmamiAnalytics() {
  // Add debug logging
  console.log('🔍 UmamiAnalytics Debug:', {
    nodeEnv: process.env.NODE_ENV,
    websiteId: UMAMI_WEBSITE_ID,
    src: UMAMI_SRC,
    shouldLoad: process.env.NODE_ENV === 'production' && UMAMI_WEBSITE_ID,
  });

  // Only load Umami in production and if website ID is available
  if (process.env.NODE_ENV !== 'production' || !UMAMI_WEBSITE_ID) {
    console.log('⚠️ Umami not loading:', {
      reason: process.env.NODE_ENV !== 'production' ? 'not production' : 'no website ID'
    });
    return null;
  }

  console.log('✅ Loading Umami script...');
  
  return (
    <Script
      async
      defer
      data-website-id={UMAMI_WEBSITE_ID}
      src={UMAMI_SRC}
      strategy="afterInteractive"
      onLoad={() => console.log('✅ Umami script loaded!')}
      onError={(e) => console.error('❌ Umami script failed to load:', e)}
    />
  );
}
