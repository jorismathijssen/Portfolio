// app/components/ThemeSwitcher.tsx

'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import appInsights from '../../lib/AppInsights'; // Adjust the path based on your project structure

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)

    // Track the theme change event
    if (appInsights) {
      appInsights.trackEvent({
        name: 'ThemeToggled',
        properties: {
          newTheme: newTheme,
          timestamp: new Date().toISOString(),
        },
      })
      console.log(`Theme toggled to ${newTheme}`)
    } else {
      console.warn("Application Insights is not initialized")
    }
  }

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <span className="sr-only">{`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}</span>
      {theme === 'dark' ? (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-gray-800 dark:text-gray-200" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-gray-800 dark:text-gray-200" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  )
}