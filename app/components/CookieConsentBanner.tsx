// app/components/CookieConsentBanner.tsx
'use client';

import React from 'react';
import CookieConsent from 'react-cookie-consent';

interface CookieConsentBannerProps {
  onAccept: () => void;
}

const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({ onAccept }) => {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept"
      declineButtonText="Decline"
      enableDeclineButton
      onAccept={onAccept}
      onDecline={() => {
        localStorage.setItem('cookieConsent', 'false');
      }}
      cookieName="siteCookieConsent"
      containerClasses="bg-black dark:bg-white p-4 fixed bottom-0 left-0 right-0 z-50 flex flex-col sm:flex-row items-center justify-between font-[family-name:var(--font-geist-sans)]"
      contentClasses="text-white dark:text-white mb-4 sm:mb-0 text-center sm:text-left"
      buttonClasses="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      expires={150}
    >
      <p className="text-sm sm:text-base">
        We use cookies to enhance your experience. By continuing, you agree to our use of cookies. (It&apos;s mostly for learning purposes. How does Application Insights work?)
      </p>
    </CookieConsent>
  );
};

export default CookieConsentBanner;
