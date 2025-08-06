'use client';

import Script from 'next/script';
import { UMAMI_WEBSITE_ID, UMAMI_SRC } from '../lib/analytics';

/**
 * Umami Analytics component with optimized loading
 * Only loads in production environment
 */
export default function UmamiAnalytics() {
  // Hard-coded fallback values for debugging
  const WEBSITE_ID = UMAMI_WEBSITE_ID || '5f39fbfe-ea25-4a31-a34f-5ca167af4af1';
  const SCRIPT_SRC = UMAMI_SRC || 'https://analytics.jorismathijssen.nl/script.js';
  
  // Check NODE_ENV explicitly
  const NODE_ENV = process.env.NODE_ENV;
  const IS_PRODUCTION = NODE_ENV === 'production';
  const IS_DEVELOPMENT = NODE_ENV === 'development';
  
  // Force debug logging to always show
  console.log('🔍 UmamiAnalytics Component Rendered!');
  console.log('🔍 NODE_ENV Debug:', {
    NODE_ENV,
    IS_PRODUCTION,
    IS_DEVELOPMENT,
    typeofNodeEnv: typeof NODE_ENV,
    processEnvKeys: Object.keys(process.env).filter(k => k.includes('NODE')),
  });
  console.log('🔍 UmamiAnalytics Debug:', {
    websiteIdFromEnv: UMAMI_WEBSITE_ID,
    websiteIdFallback: WEBSITE_ID,
    srcFromEnv: UMAMI_SRC,
    srcFallback: SCRIPT_SRC,
    willLoad: !!WEBSITE_ID,
  });

  // Always load for now (remove production check temporarily)
  if (!WEBSITE_ID) {
    console.log('⚠️ Umami not loading: no website ID available');
    return null;
  }

  console.log('✅ Loading Umami script with ID:', WEBSITE_ID);
  
  return (
    <Script
      async
      defer
      data-website-id={WEBSITE_ID}
      src={SCRIPT_SRC}
      strategy="afterInteractive"
      onLoad={() => {
        console.log('✅ Umami script loaded successfully!');
        console.log('✅ window.umami available:', typeof window.umami !== 'undefined');
      }}
      onError={(e) => {
        console.error('❌ Umami script failed to load:', e);
        console.error('❌ Script src was:', SCRIPT_SRC);
      }}
    />
  );
}
