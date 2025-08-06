'use client';

import Script from 'next/script';

/**
 * Umami Analytics component - Production ready
 */
export default function UmamiAnalytics() {
  // HARDCODED VALUES - WORKING VERSION
  const WEBSITE_ID = '5f39fbfe-ea25-4a31-a34f-5ca167af4af1';
  const SCRIPT_SRC = 'https://analytics.jorismathijssen.nl/script.js';

  return (
    <Script
      async
      defer
      data-website-id={WEBSITE_ID}
      src={SCRIPT_SRC}
      strategy="afterInteractive"
    />
  );
}
