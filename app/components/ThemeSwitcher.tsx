'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useTheme } from 'next-themes';
import { trackThemeSwitch } from '../lib/analytics';

type ThemeOption = 'light' | 'dark' | 'system';

/**
 * Theme switcher component for toggling between light and dark modes
 */
export default function ThemeSwitcher(): React.JSX.Element | null {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeToggle = useCallback(() => {
    const currentTheme = (theme === 'system' ? systemTheme : theme) as ThemeOption;
    const newTheme: ThemeOption = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Track theme switch event with improved categorization
    trackThemeSwitch(newTheme, 'button');
    
    setTheme(newTheme);
  }, [theme, systemTheme, setTheme]);

  const currentTheme = useMemo(() => 
    (theme === 'system' ? systemTheme : theme) as ThemeOption,
    [theme, systemTheme]
  );

  const ariaLabel = useMemo(() => 
    `Switch to ${currentTheme === 'dark' ? 'light' : 'dark'} mode`,
    [currentTheme]
  );

  const isDarkMode = useMemo(() => 
    currentTheme === 'dark',
    [currentTheme]
  );

  if (!mounted) {
    return null;
  }

  return (
    <button
      data-id="themeSwitcher"
      data-umami-event="thema_wijziging_knop"
      data-umami-event-pagina={typeof window !== 'undefined' ? window.location.pathname : 'onbekend'}
      data-umami-event-thema-type={currentTheme === 'dark' ? 'light' : 'dark'}
      data-umami-event-trigger-methode="button"
      onClick={handleThemeToggle}
      className="fixed top-4 right-4 w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-all duration-200 hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-105 shadow-md"
      aria-label={ariaLabel}
      type="button"
    >
      <span className="sr-only">{ariaLabel}</span>
      {isDarkMode ? (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          className="w-6 h-6 transition-transform duration-200" 
          style={{ color: isDarkMode ? '#111827' : '#374151' }}
          aria-hidden="true"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" 
          />
        </svg>
      ) : (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          className="w-6 h-6 transition-transform duration-200" 
          style={{ color: isDarkMode ? '#111827' : '#374151' }}
          aria-hidden="true"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" 
          />
        </svg>
      )}
    </button>
  );
}