import React, { useState, useEffect, useCallback } from 'react';

type ConsentStatus = 'pending' | 'accepted' | 'declined';

const CONSENT_STORAGE_KEY = 'cookieConsent';

interface CookieConsentBannerProps {
  onConsentChange?: (status: ConsentStatus) => void;
  message?: string;
  className?: string;
}

/**
 * Cookie consent banner component for GDPR compliance
 */
const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({
  onConsentChange,
  message = 'This website uses cookies to enhance your experience. By continuing to use this site, you agree to our use of cookies.',
  className = ''
}) => {
  const [consentStatus, setConsentStatus] = useState<ConsentStatus>('pending');
  const [isVisible, setIsVisible] = useState(false);

  const getStoredConsent = useCallback((): ConsentStatus => {
    try {
      const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
      return (stored as ConsentStatus) || 'pending';
    } catch {
      return 'pending';
    }
  }, []);

  const storeConsent = useCallback((status: ConsentStatus): void => {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, status);
    } catch {
    }
  }, []);

  const handleConsent = useCallback((status: ConsentStatus) => {
    setConsentStatus(status);
    setIsVisible(false);
    storeConsent(status);
    onConsentChange?.(status);
  }, [storeConsent, onConsentChange]);

  useEffect(() => {
    const stored = getStoredConsent();
    setConsentStatus(stored);
    setIsVisible(stored === 'pending');
  }, [getStoredConsent]);

  if (!isVisible || consentStatus !== 'pending') {
    return null;
  }

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 bg-gray-900 dark:bg-gray-800 text-white p-4 z-50 shadow-lg border-t border-gray-700 ${className}`.trim()}
      role="banner"
      aria-label="Cookie consent banner"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-300 flex-1">
          {message}
        </p>
        
        <div className="flex gap-3">
          <button
            onClick={() => handleConsent('declined')}
            className="px-4 py-2 text-sm border border-gray-600 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
            type="button"
          >
            Decline
          </button>
          
          <button
            onClick={() => handleConsent('accepted')}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
            type="button"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentBanner;