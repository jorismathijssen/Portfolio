'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { UMAMI_WEBSITE_ID, UMAMI_SRC } from '../lib/analytics';

/**
 * Umami Analytics component with optimized loading
 * Only loads in production environment
 */
export default function UmamiAnalytics() {
  // Client-side debug logging
  useEffect(() => {
    console.log('🔍 UmamiAnalytics Component Rendered (CLIENT-SIDE)!');
    console.log('🔍 UmamiAnalytics Debug:', {
      nodeEnv: process.env.NODE_ENV,
      isProduction: process.env.NODE_ENV === 'production',
      websiteId: UMAMI_WEBSITE_ID,
      scriptSrc: UMAMI_SRC,
      hasWebsiteId: !!UMAMI_WEBSITE_ID,
      hasSrc: !!UMAMI_SRC,
      typeofNodeEnv: typeof process.env.NODE_ENV,
      processEnvKeys: Object.keys(process.env).filter(k => k.includes('NODE')),
    });
  }, []);

  // Only load in production
  if (process.env.NODE_ENV !== 'production') {
    console.log('❌ Umami not loading: not in production mode');
    return null;
  }

  // Don't load if no website ID is configured
  if (!UMAMI_WEBSITE_ID || !UMAMI_SRC) {
    console.log('❌ Umami not loading: missing config', { 
      websiteId: !!UMAMI_WEBSITE_ID, 
      src: !!UMAMI_SRC 
    });
    return null;
  }

  console.log('✅ Loading Umami script with config:', {
    websiteId: UMAMI_WEBSITE_ID,
    src: UMAMI_SRC,
  });

  return (
    <Script
      async
      defer
      data-website-id={UMAMI_WEBSITE_ID}
      src={UMAMI_SRC}
      strategy="afterInteractive"
      onLoad={() => {
        console.log('✅ Umami script loaded successfully!');
        console.log('✅ window.umami available:', typeof window.umami !== 'undefined');
      }}
      onError={(e) => {
        console.error('❌ Umami script failed to load:', e);
        console.error('❌ Script src was:', UMAMI_SRC);
      }}
    />
  );
}
