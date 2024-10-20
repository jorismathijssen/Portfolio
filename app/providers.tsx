// app/components/Providers.tsx
'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { initializeAppInsights } from '../lib/appInsights';
import CookieConsentBanner from './components/CookieConsentBanner';
import ThemeSwitcher from './components/ThemeSwitcher';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';

function ProviderContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchParamsString, setSearchParamsString] = useState('');
  const [consentGiven, setConsentGiven] = useState(false);
  const [appInsights, setAppInsights] = useState<ApplicationInsights | null>(null);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (consent === 'true') {
      setConsentGiven(true);
      const ai = initializeAppInsights();
      setAppInsights(ai);
    }
  }, []);

  useEffect(() => {
    const updatedSearchParams = searchParams.toString();
    setSearchParamsString(updatedSearchParams);

    if (consentGiven && appInsights) {
      const url = pathname + (updatedSearchParams ? `?${updatedSearchParams}` : '');
      appInsights.trackPageView({ name: url });
    }
  }, [pathname, searchParams, consentGiven, appInsights]);

  const handleConsent = () => {
    localStorage.setItem('cookieConsent', 'true');
    setConsentGiven(true);
    const ai = initializeAppInsights();
    setAppInsights(ai);
    const url = pathname + (searchParamsString ? `?${searchParamsString}` : '');
    ai.trackPageView({ name: url });
  };

  return (
    <>
      <ThemeSwitcher />
      {!consentGiven && <CookieConsentBanner onAccept={handleConsent} />}
      {consentGiven && null} {/* You can add additional Client Components here if needed */}
    </>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={null}>
        <ProviderContent />
      </Suspense>
      {children}
    </>
  );
}
