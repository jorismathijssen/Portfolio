'use client';

import Script from 'next/script';
import { useEffect } from 'react';

/**
 * Umami Analytics component - HARDCODED FOR TESTING
 */
export default function UmamiAnalytics() {
  // Client-side debug logging
  useEffect(() => {
    console.log('🔍 UmamiAnalytics Component Rendered (CLIENT-SIDE)!');
    console.log('🔍 Hardcoded Umami loading...');
  }, []);

  // HARDCODED VALUES - NO ENV CHECKS
  const WEBSITE_ID = '5f39fbfe-ea25-4a31-a34f-5ca167af4af1';
  const SCRIPT_SRC = 'https://analytics.jorismathijssen.nl/script.js';

  console.log('✅ Loading Umami script with hardcoded config:', {
    websiteId: WEBSITE_ID,
    src: SCRIPT_SRC,
  });

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
