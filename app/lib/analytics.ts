/**
 * Umami Analytics - Improved Event Tracking System
 * Following official Umami documentation and event naming best practices
 */

// Configuration with ad blocker bypass
export const UMAMI_WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || '5f39fbfe-ea25-4a31-a34f-5ca167af4af1';

// Use proxied script URL to bypass ad blockers
// Falls back to direct URL if proxy fails
export const UMAMI_SRC = process.env.NEXT_PUBLIC_UMAMI_SRC || '/stats.js';
export const UMAMI_FALLBACK_SRC = 'https://analytics.jorismathijssen.nl/script.js';

// Event data interface - only primitives as per Umami best practices
export interface UmamiEventData {
  [key: string]: string | number | boolean;
}

// Event categories for better organization
export const EVENT_CATEGORIES = {
  USER_INTERACTION: 'interaction',
  NAVIGATION: 'navigation', 
  FEATURE_USAGE: 'feature',
  PERFORMANCE: 'performance',
  ERROR: 'error',
  ENGAGEMENT: 'engagement'
} as const;

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
 * Core tracking function with improved error handling and naming
 */
export const track = async (eventName: string, eventData?: UmamiEventData) => {
  if (typeof window !== 'undefined' && window.umami?.track) {
    try {
      const cleanName = eventName.substring(0, 50);
      const prefixedName = window.umamiEnv === 'development' ? `dev_${cleanName}` : cleanName;
      
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
// ORGANIZED EVENT FUNCTIONS - Following Umami best practices
// =============================================================================

/**
 * USER INTERACTION EVENTS
 */

// Theme switching events
export const trackThemeSwitch = async (theme: string, trigger: 'button' | 'command' | 'system' = 'button') => {
  return track('theme_change', { 
    category: EVENT_CATEGORIES.USER_INTERACTION,
    theme,
    trigger
  });
};

// Language switching events  
export const trackLanguageSwitch = async (language: string, trigger: 'switcher' | 'browser' = 'switcher') => {
  return track('language_change', { 
    category: EVENT_CATEGORIES.USER_INTERACTION,
    language,
    trigger
  });
};

// Contact form interactions
export const trackContactForm = async (action: 'start' | 'submit' | 'success' | 'error', step?: string) => {
  return track('contact_form', { 
    category: EVENT_CATEGORIES.USER_INTERACTION,
    action,
    ...(step && { step })
  });
};

// Social media clicks
export const trackSocialClick = async (platform: string, location: 'header' | 'footer' | 'about' = 'header') => {
  return track('social_click', { 
    category: EVENT_CATEGORIES.USER_INTERACTION,
    platform,
    location
  });
};

// Download events
export const trackDownload = async (file: string, type: string) => {
  return track('file_download', { 
    category: EVENT_CATEGORIES.USER_INTERACTION,
    file: file.substring(0, 100), 
    type 
  });
};

/**
 * FEATURE USAGE EVENTS
 */

// Terminal command events
export const trackTerminalCommand = async (command: string, category?: string) => {
  return track('terminal_command', { 
    category: EVENT_CATEGORIES.FEATURE_USAGE,
    command: command.substring(0, 30),
    ...(category && { command_category: category })
  });
};

// Terminal effect events
export const trackTerminalEffect = async (effect: string, duration?: number) => {
  return track('terminal_effect', {
    category: EVENT_CATEGORIES.FEATURE_USAGE,
    effect,
    ...(duration && { duration_ms: Math.round(duration) })
  });
};

// Project interactions
export const trackProjectInteraction = async (
  action: 'view' | 'click' | 'demo' | 'github',
  project: string, 
  location: 'card' | 'timeline' | 'search' = 'card'
) => {
  return track('project_interaction', { 
    category: EVENT_CATEGORIES.ENGAGEMENT,
    action,
    project: project.substring(0, 50),
    location
  });
};

/**
 * NAVIGATION EVENTS
 */

// Section navigation
export const trackSectionView = async (section: string, method: 'scroll' | 'click' | 'direct' = 'scroll') => {
  return track('section_view', { 
    category: EVENT_CATEGORIES.NAVIGATION,
    section,
    method
  });
};

// Search events
export const trackSearch = async (query: string, results: number, source: 'portfolio' | 'terminal' = 'portfolio') => {
  return track('search_query', { 
    category: EVENT_CATEGORIES.FEATURE_USAGE,
    query: query.substring(0, 50),
    results,
    source
  });
};

/**
 * PERFORMANCE EVENTS
 */

// Web Vitals tracking with better categorization
export const trackWebVital = async (
  metric: 'CLS' | 'FID' | 'FCP' | 'LCP' | 'TTFB' | 'INP', 
  value: number,
  rating: 'good' | 'needs-improvement' | 'poor'
) => {
  return track('web_vital', { 
    category: EVENT_CATEGORIES.PERFORMANCE,
    metric,
    value: Number(value.toFixed(2)),
    rating
  });
};

// Page load performance
export const trackPageLoad = async (loadTime: number, pageType: string = 'home') => {
  return track('page_load', {
    category: EVENT_CATEGORIES.PERFORMANCE,
    load_time_ms: Math.round(loadTime),
    page_type: pageType
  });
};

// Resource loading performance
export const trackResourceLoad = async (resource: string, loadTime: number) => {
  return track('resource_load', {
    category: EVENT_CATEGORIES.PERFORMANCE,
    resource,
    load_time_ms: Math.round(loadTime)
  });
};

/**
 * ERROR TRACKING
 */

// JavaScript errors
export const trackError = async (
  type: 'javascript' | 'network' | 'render' | 'user', 
  message: string,
  component?: string
) => {
  return track('error_occurred', { 
    category: EVENT_CATEGORIES.ERROR,
    error_type: type,
    message: message.substring(0, 100),
    ...(component && { component })
  });
};

// Feature usage tracking
export const trackFeatureUse = async (feature: string, context?: string) => {
  return track('feature_usage', { 
    category: EVENT_CATEGORIES.FEATURE_USAGE,
    feature,
    ...(context && { context })
  });
};

/**
 * ENGAGEMENT EVENTS
 */

// Time spent on sections
export const trackTimeSpent = async (section: string, timeSeconds: number) => {
  return track('time_spent', {
    category: EVENT_CATEGORIES.ENGAGEMENT,
    section,
    duration_seconds: Math.round(timeSeconds)
  });
};

// Scroll depth tracking
export const trackScrollDepth = async (depth: 25 | 50 | 75 | 100, page: string = 'home') => {
  return track('scroll_depth', {
    category: EVENT_CATEGORIES.ENGAGEMENT,
    depth_percent: depth,
    page
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
