'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { trackLanguageSwitch } from '../lib/analytics';

/**
 * Language option type
 */
type Language = 'en' | 'nl';

/**
 * Language switcher component for toggling between English and Dutch
 * 
 * Features:
 * - Hydration-safe mounting
 * - Accessible with proper ARIA labels
 * - Keyboard navigation support
 * - Smooth transitions
 * 
 * @returns JSX element for language switcher button
 */
export default function LanguageSwitcher(): React.JSX.Element | null {
  const { i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  /**
   * Handle language change with proper typing and analytics
   */
  const handleLanguageChange = useCallback(() => {
    const currentLang = i18n.language as Language;
    const newLang: Language = currentLang === 'nl' ? 'en' : 'nl';
    
    // Track language switch
    trackLanguageSwitch(newLang);
    
    i18n.changeLanguage(newLang);
  }, [i18n]);

  // Memoized values for performance
  const isDutch = useMemo(() => i18n.language === 'nl', [i18n.language]);
  const ariaLabel = useMemo(
    () => isDutch ? 'Switch to English' : 'Wissel naar Nederlands',
    [isDutch]
  );
  const displayText = useMemo(() => isDutch ? 'EN' : 'NL', [isDutch]);

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return null;
  }
  return (
    <button
      data-id="languageSwitcher"
      data-umami-event="language-switch"
      data-umami-event-language={isDutch ? 'en' : 'nl'}
      onClick={handleLanguageChange}
      aria-label={ariaLabel}
      className="fixed top-4 right-20 w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-lg tracking-wide transition-all duration-200 text-gray-800 dark:text-gray-200 font-[family-name:var(--font-geist-sans)] hover:bg-gray-300 dark:hover:bg-gray-700"
      type="button"
    >
      <span className="sr-only">{ariaLabel}</span>
      {displayText}
    </button>
  );
}
