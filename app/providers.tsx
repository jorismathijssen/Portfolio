'use client'

import { useEffect, useState, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import appInsights from '../lib/appInsights'; 

function ProviderContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchParamsString, setSearchParamsString] = useState('');

  useEffect(() => {
    // Update searchParamsString when searchParams change
    setSearchParamsString(searchParams.toString());

    // Track initial page load
    appInsights.trackPageView();

    // Track page views on route change
    const url = pathname + searchParamsString;
    appInsights.trackPageView({ name: url });
  }, [pathname, searchParams, searchParamsString]);

  return null;
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
