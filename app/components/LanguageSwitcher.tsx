'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'next-themes';
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
  const { theme, systemTheme } = useTheme();
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
  const currentTheme = useMemo(() => theme === 'system' ? systemTheme : theme, [theme, systemTheme]);
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
      data-umami-event="taal_wijziging_switcher"
      data-umami-event-pagina={typeof window !== 'undefined' ? window.location.pathname : 'onbekend'}
      data-umami-event-taal={isDutch ? 'en' : 'nl'}
      data-umami-event-trigger-methode="switcher"
      onClick={handleLanguageChange}
      aria-label={ariaLabel}
      className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-lg tracking-wide transition-all duration-200 font-[family-name:var(--font-geist-sans)] hover:bg-gray-200 dark:hover:bg-gray-700 shadow-md"
      style={{ color: currentTheme === 'dark' ? '#111827' : '#374151' }}
      type="button"
    >
      <span className="sr-only">{ariaLabel}</span>
      {displayText}
    </button>
  );
}
