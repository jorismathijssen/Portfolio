import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

export type Theme = 'light' | 'dark' | 'system';

interface UseDarkModeReturn {
  isDarkMode: boolean;
  theme: string | undefined;
  toggleTheme: () => void;
  setTheme: (theme: string) => void;
  isLoading: boolean;
  resolvedTheme: string | undefined;
}

/**
 * Custom hook for dark mode management with next-themes integration
 */
export function useDarkMode(): UseDarkModeReturn {
  const { theme, setTheme: setNextTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  /**
   * Toggle between light and dark themes
   * If currently on system theme, switch to opposite of system preference
   */
  const toggleTheme = () => {
    const currentResolvedTheme = resolvedTheme || 'light';
    setNextTheme(currentResolvedTheme === 'dark' ? 'light' : 'dark');
  };

  // Calculate if we're in dark mode
  const isDarkMode = mounted ? resolvedTheme === 'dark' : false;

  return {
    isDarkMode,
    theme: mounted ? theme : undefined,
    toggleTheme,
    setTheme: setNextTheme,
    isLoading: !mounted,
    resolvedTheme: mounted ? resolvedTheme : undefined
  };
}
