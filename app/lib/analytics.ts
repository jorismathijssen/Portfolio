/**
 * Umami Analytics implementation for portfolio tracking
 */

// Umami configuration
export const UMAMI_WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || '';
export const UMAMI_SRC = process.env.NEXT_PUBLIC_UMAMI_SRC || 'https://analytics.jorismathijssen.nl/script.js';

/**
 * Track custom events with Umami
 */
export const trackEvent = (eventName: string, eventData?: Record<string, string | number>) => {
  if (typeof window !== 'undefined' && window.umami) {
    window.umami.track(eventName, eventData);
  }
};

/**
 * Terminal command tracking
 */
export const trackTerminalCommand = (command: string) => {
  trackEvent('terminal_command', { command });
};

/**
 * Project card click tracking
 */
export const trackProjectClick = (projectTitle: string) => {
  trackEvent('project_click', { project: projectTitle });
};

/**
 * Language switch tracking
 */
export const trackLanguageSwitch = (language: string) => {
  trackEvent('language_switch', { language });
};

/**
 * Theme switch tracking
 */
export const trackThemeSwitch = (theme: string) => {
  trackEvent('theme_switch', { theme });
};

/**
 * Contact form submission tracking
 */
export const trackContactForm = (action: 'submit' | 'success' | 'error') => {
  trackEvent('contact_form', { action });
};

/**
 * Social link click tracking
 */
export const trackSocialClick = (platform: string) => {
  trackEvent('social_click', { platform });
};

/**
 * Page view tracking (automatic with Umami script)
 */
export const trackPageView = (url: string) => {
  // Umami automatically tracks page views
  // This function is kept for compatibility
  if (typeof window !== 'undefined' && window.umami) {
    window.umami.track('pageview', { url });
  }
};

// Declare umami global function
declare global {
  interface Window {
    umami: {
      track: (eventName: string, eventData?: Record<string, string | number>) => void;
    };
  }
}
