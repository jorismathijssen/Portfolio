// app/components/Providers.tsx
'use client';

import React, { Suspense } from 'react';
import ThemeSwitcher from './components/ThemeSwitcher';

function ProviderContent() {
  return (
    <>
      <ThemeSwitcher />
      {/* You can add additional Client Components here if needed */}
    </>
  );
}

/**
 * Providers component wraps the app with context providers (e.g., theme, analytics).
 * Add new providers here as needed.
 */
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
