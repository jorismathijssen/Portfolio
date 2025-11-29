'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { UMAMI_WEBSITE_ID, UMAMI_SRC, UMAMI_FALLBACK_SRC } from '@/lib/analytics';

/**
 * Umami Analytics component with ad blocker bypass and fallback handling
 * Implements proper initialization, error handling, and environment tagging
 */
export default function UmamiAnalytics() {
  const [scriptSrc, setScriptSrc] = useState(UMAMI_SRC);
  const [retryCount, setRetryCount] = useState(0);

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
    if (typeof window !== 'undefined' && window.umami) {
      // Development feedback - don't track unnecessary pageview events
      if (window.umamiEnv === 'development') {
        console.log('🚀 Umami Analytics v2.x initialized');
        console.log('📊 Environment:', window.umamiEnv);
        console.log('🆔 Website ID:', UMAMI_WEBSITE_ID);
        console.log('📍 Source:', scriptSrc);
        console.log('🛡️ Ad blocker bypass:', scriptSrc.startsWith('/') ? 'active' : 'fallback');
      }
    }
  };

  const handleScriptError = (error: Error) => {
    // Graceful error handling with fallback
    if (typeof window !== 'undefined' && window.umamiEnv === 'development') {
      console.error('❌ Umami Analytics failed to load:', error);
      console.log('🔄 Attempting fallback...');
    }
    
    // Try fallback if we haven't exceeded retry limit and we're not already using fallback
    if (retryCount < 2 && scriptSrc !== UMAMI_FALLBACK_SRC) {
      setRetryCount(prev => prev + 1);
      setScriptSrc(UMAMI_FALLBACK_SRC);
    }
  };

  return (
    <Script
      key={scriptSrc} // Force re-render on source change
      src={scriptSrc}
      data-website-id={UMAMI_WEBSITE_ID}
      data-domains="jorismathijssen.nl,portfolio.jorismathijssen.nl"
      data-auto-track="true"
      data-do-not-track="false"
      data-exclude-search="false"
      data-exclude-hash="false"
      data-host-url="https://analytics.jorismathijssen.nl"
      strategy="afterInteractive"
      onLoad={handleScriptLoad}
      onError={handleScriptError}
      defer
    />
  );
}
