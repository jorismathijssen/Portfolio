/**
 * Umami Analytics - Best Practices Implementation
 * Following official Umami documentation and patterns
 */

// Configuration
export const UMAMI_WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || '5f39fbfe-ea25-4a31-a34f-5ca167af4af1';
export const UMAMI_SRC = process.env.NEXT_PUBLIC_UMAMI_SRC || 'https://analytics.jorismathijssen.nl/script.js';

// Simple event data interface - only primitives as per Umami best practices
export interface UmamiEventData {
  [key: string]: string | number | boolean;
}

// Global Umami interface
declare global {
  interface Window {
    umami: {
      track: {
        (): Promise<string>;
        (eventName: string): Promise<string>;
        (eventName: string, eventData: UmamiEventData): Promise<string>;
      };
      identify?: (userId: string, userData?: UmamiEventData) => Promise<string>;
    };
    umamiEnv?: 'development' | 'production';
  }
}

/**
 * Core tracking function - simple and clean
 */
export const track = async (eventName: string, eventData?: UmamiEventData) => {
  if (typeof window !== 'undefined' && window.umami?.track) {
    try {
      const cleanName = eventName.substring(0, 50);
      const prefixedName = window.umamiEnv === 'development' ? `dev-${cleanName}` : cleanName;
      
      if (eventData) {
        return await window.umami.track(prefixedName, eventData);
      } else {
        return await window.umami.track(prefixedName);
      }
    } catch (error) {
      if (window.umamiEnv === 'development') {
        console.warn('Umami tracking failed:', error);
      }
    }
  }
  return Promise.resolve('');
};

// =============================================================================
// SPECIFIC EVENT FUNCTIONS - Following Umami naming conventions
// =============================================================================

/**
 * Theme switching events
 */
export const trackThemeSwitch = async (theme: string) => {
  return track('theme-switch', { theme });
};

/**
 * Language switching events  
 */
export const trackLanguageSwitch = async (language: string) => {
  return track('language-switch', { language });
};

/**
 * Terminal command events
 */
export const trackTerminalCommand = async (command: string) => {
  return track('terminal-command', { 
    command: command.substring(0, 50) // Keep command name short
  });
};

/**
 * Project interactions
 */
export const trackProjectClick = async (project: string, source: string = 'card') => {
  return track('project-click', { 
    project: project.substring(0, 100),
    source 
  });
};

/**
 * Contact form interactions
 */
export const trackContactForm = async (action: string, step?: string) => {
  return track('contact-form', { 
    action,
    ...(step && { step })
  });
};

/**
 * Social media clicks
 */
export const trackSocialClick = async (platform: string) => {
  return track('social-click', { platform });
};

/**
 * Navigation events
 */
export const trackNavigation = async (section: string) => {
  return track('navigation', { section });
};

/**
 * Download events
 */
export const trackDownload = async (file: string, type: string) => {
  return track('download', { file, type });
};

/**
 * Search events
 */
export const trackSearch = async (query: string, results: number) => {
  return track('search', { 
    query: query.substring(0, 100),
    results 
  });
};

/**
 * Error tracking
 */
export const trackError = async (type: string, message: string) => {
  return track('error', { 
    type,
    message: message.substring(0, 200)
  });
};

/**
 * Performance tracking
 */
export const trackPerformance = async (metric: string, value: number) => {
  return track('performance', { 
    metric,
    value: Number(value.toFixed(2))
  });
};

/**
 * Feature usage tracking
 */
export const trackFeatureUse = async (feature: string, context?: string) => {
  return track('feature-use', { 
    feature,
    ...(context && { context })
  });
};

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Session identification
 */
export const identifyUser = async (userId: string, userData?: UmamiEventData) => {
  if (typeof window !== 'undefined' && window.umami?.identify) {
    try {
      return await window.umami.identify(userId, userData);
    } catch (error) {
      if (window.umamiEnv === 'development') {
        console.warn('Umami identification failed:', error);
      }
    }
  }
  return Promise.resolve('');
};

/**
 * Debug function
 */
export const debugUmami = () => {
  if (typeof window === 'undefined') return 'Server-side';
  
  return {
    loaded: typeof window.umami !== 'undefined',
    environment: window.umamiEnv || 'unknown',
    websiteId: UMAMI_WEBSITE_ID,
    scriptSrc: UMAMI_SRC,
  };
};

/**
 * Test function for development
 */
export const testUmami = async () => {
  if (typeof window === 'undefined') return false;
  
  try {
    await track('test-event', { source: 'debug' });
    if (window.umamiEnv === 'development') {
      console.log('✅ Umami test successful');
    }
    return true;
  } catch (error) {
    if (window.umamiEnv === 'development') {
      console.error('❌ Umami test failed:', error);
    }
    return false;
  }
};
