'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { UMAMI_WEBSITE_ID, UMAMI_SRC } from '../lib/analytics';

/**
 * Umami Analytics component with environment detection and v2.x best practices
 * Implements proper initialization, error handling, and environment tagging
 */
export default function UmamiAnalytics() {
  useEffect(() => {
    // Enhanced environment detection
    const isDevelopment = 
      typeof window !== 'undefined' && 
      (window.location.hostname === 'localhost' || 
       window.location.hostname === '127.0.0.1' ||
       window.location.port === '3000' ||
       window.location.hostname.includes('dev') ||
       process.env.NODE_ENV === 'development');

    // Set global environment variable for tracking functions
    if (typeof window !== 'undefined') {
      window.umamiEnv = isDevelopment ? 'development' : 'production';
    }
  }, []);

  // Check if we have valid configuration
  if (!UMAMI_WEBSITE_ID || !UMAMI_SRC) {
    return null;
  }

  const handleScriptLoad = () => {
    // Verify Umami loaded correctly
    if (typeof window !== 'undefined' && window.umami?.track) {
      // Send a simple pageview - let Umami handle the default properties
      // Only add minimal environment context as event data
      window.umami.track('pageview', {
        environment: window.umamiEnv || 'production'
      });

      // Development feedback
      if (window.umamiEnv === 'development') {
        console.log('🚀 Umami Analytics v2.x initialized');
        console.log('📊 Environment:', window.umamiEnv);
        console.log('🆔 Website ID:', UMAMI_WEBSITE_ID);
        console.log('📍 Source:', UMAMI_SRC);
      }
    }
  };

  const handleScriptError = (error: Error) => {
    // Graceful error handling
    if (typeof window !== 'undefined' && window.umamiEnv === 'development') {
      console.error('❌ Umami Analytics failed to load:', error);
    }
  };

  return (
    <Script
      src={UMAMI_SRC}
      data-website-id={UMAMI_WEBSITE_ID}
      data-domains="jorismathijssen.nl,portfolio.jorismathijssen.nl"
      data-auto-track="true"
      data-do-not-track="false"
      data-exclude-search="false"
      data-exclude-hash="false"
      strategy="afterInteractive"
      onLoad={handleScriptLoad}
      onError={handleScriptError}
      defer
    />
  );
}
