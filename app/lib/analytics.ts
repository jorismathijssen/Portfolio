/**
 * Enhanced Umami Analytics implementation with environment detection
 */

// Umami configuration
export const UMAMI_WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || '5f39fbfe-ea25-4a31-a34f-5ca167af4af1';
export const UMAMI_SRC = process.env.NEXT_PUBLIC_UMAMI_SRC || 'https://analytics.jorismathijssen.nl/script.js';

// Type definitions for Umami event data
export interface UmamiEventData {
  [key: string]: string | number | boolean | string[] | number[] | UmamiEventData | UmamiEventData[];
}

// Global interface for Umami tracker - Updated to match Umami v2.x TypeScript definitions
declare global {
  interface Window {
    umami: {
      track: {
        // Track page view
        (): Promise<string>;
        // Track event with name only (max 50 characters)
        (eventName: string): Promise<string>;
        // Track event with name and data - follows Umami data constraints:
        // - Strings max 500 chars, Numbers max precision 4, Objects max 50 properties
        (eventName: string, eventData: UmamiEventData): Promise<string>;
        // Track with full properties object
        (properties: { website: string; url?: string; title?: string; [key: string]: unknown }): Promise<string>;
        // Track with custom function
        (eventFunction: (props: UmamiEventData) => UmamiEventData): Promise<string>;
      };
      identify?: (userId: string, userData?: UmamiEventData) => Promise<string>;
    };
    umamiEnv?: 'development' | 'production';
  }
}

/**
 * Enhanced event tracking with environment tagging and Umami v2.x best practices
 * Ensures data constraints: strings ≤500 chars, numbers ≤4 precision, objects ≤50 properties
 */
export const trackEvent = async (eventName: string, eventData?: UmamiEventData) => {
  if (typeof window !== 'undefined' && window.umami?.track) {
    try {
      // Truncate event name to Umami's 50 character limit
      const truncatedName = eventName.substring(0, 50);
      
      // Add environment tag and sanitize data according to Umami constraints
      const enhancedData = sanitizeEventData({
        ...eventData,
        environment: window.umamiEnv || 'unknown',
      });
      
      // Prefix development events for easy filtering in dashboard
      const prefixedName = window.umamiEnv === 'development' ? `[DEV] ${truncatedName}` : truncatedName;
      
      return await window.umami.track(prefixedName, enhancedData);
    } catch (error) {
      // Fail silently in production, log in development
      if (window.umamiEnv === 'development') {
        console.warn('Umami tracking failed:', error);
      }
    }
  }
  return Promise.resolve('');
};

/**
 * Sanitize event data according to Umami v2.x constraints
 */
const sanitizeEventData = (data: UmamiEventData): UmamiEventData => {
  const sanitized: UmamiEventData = {};
  let propertyCount = 0;
  
  for (const [key, value] of Object.entries(data)) {
    // Limit to 50 properties maximum
    if (propertyCount >= 50) break;
    
    if (typeof value === 'string') {
      // Strings max 500 characters
      sanitized[key] = value.substring(0, 500);
    } else if (typeof value === 'number') {
      // Numbers max precision 4
      sanitized[key] = Number(value.toFixed(4));
    } else if (typeof value === 'boolean') {
      sanitized[key] = value;
    } else if (Array.isArray(value)) {
      // Arrays converted to string with 500 char limit
      sanitized[key] = JSON.stringify(value).substring(0, 500);
    } else if (typeof value === 'object' && value !== null) {
      // Objects are flattened and count as 1 property
      sanitized[key] = JSON.stringify(value).substring(0, 500);
    }
    
    propertyCount++;
  }
  
  return sanitized;
};

/**
 * Terminal command tracking with command details
 */
export const trackTerminalCommand = async (command: string, success: boolean = true) => {
  return trackEvent('terminal_command', { 
    command: command.substring(0, 50), // Umami event name character limit
    success,
    timestamp: Date.now()
  });
};

/**
 * Project interaction tracking
 */
export const trackProjectClick = async (projectTitle: string, source: string = 'card') => {
  return trackEvent('project_interaction', { 
    project: projectTitle.substring(0, 100),
    source,
    action: 'click'
  });
};

/**
 * Language switch tracking
 */
export const trackLanguageSwitch = async (fromLanguage: string, toLanguage: string) => {
  return trackEvent('language_switch', { 
    from: fromLanguage,
    to: toLanguage
  });
};

/**
 * Theme switch tracking with enhanced metadata
 */
export const trackThemeSwitch = async (fromTheme: string, toTheme: string) => {
  return trackEvent('theme_switch', { 
    from: fromTheme,
    to: toTheme,
    timestamp: Date.now()
  });
};

/**
 * Contact form tracking with detailed stages
 */
export const trackContactForm = async (action: 'view' | 'start' | 'submit' | 'success' | 'error', errorType?: string) => {
  return trackEvent('contact_form', { 
    action,
    ...(errorType && { errorType: errorType.substring(0, 100) }),
    timestamp: Date.now()
  });
};

/**
 * Social media click tracking
 */
export const trackSocialClick = async (platform: string, action: string = 'click') => {
  return trackEvent('social_interaction', { 
    platform: platform.substring(0, 50),
    action
  });
};

/**
 * Performance tracking for Core Web Vitals with Umami constraints
 */
export const trackWebVitals = async (metric: string, value: number, rating: string) => {
  return trackEvent('web_vitals', {
    metric: metric.substring(0, 50),
    value: Number(value.toFixed(4)), // Max precision 4
    rating,
    url: typeof window !== 'undefined' ? window.location.pathname.substring(0, 200) : 'unknown'
  });
};

/**
 * Custom event for user engagement tracking
 */
export const trackEngagement = async (type: string, duration?: number, details?: UmamiEventData) => {
  return trackEvent('user_engagement', {
    type: type.substring(0, 50),
    ...(duration && { duration: Number(duration.toFixed(4)) }),
    ...sanitizeEventData(details || {})
  });
};

/**
 * Error tracking for debugging with data constraints
 */
export const trackError = async (errorType: string, errorMessage: string, source?: string) => {
  return trackEvent('application_error', {
    type: errorType.substring(0, 50),
    message: errorMessage.substring(0, 200), // Reasonable limit for error messages
    source: source?.substring(0, 100) || 'unknown',
    timestamp: Date.now()
  });
};

/**
 * Session identification for user journey tracking (Umami v2.x feature)
 * Use this to link events to specific user sessions
 */
export const identifyUser = async (userId: string, userData?: UmamiEventData) => {
  if (typeof window !== 'undefined' && window.umami?.identify) {
    try {
      const sanitizedData = userData ? sanitizeEventData(userData) : undefined;
      return await window.umami.identify(userId.substring(0, 100), sanitizedData);
    } catch (error) {
      if (window.umamiEnv === 'development') {
        console.warn('Umami user identification failed:', error);
      }
    }
  }
  return Promise.resolve('');
};

/**
 * Debug function to check Umami status with comprehensive health check
 */
export const debugUmami = () => {
  if (typeof window === 'undefined') return 'Server-side - Umami not available';
  
  const status = {
    loaded: typeof window.umami !== 'undefined',
    trackFunction: typeof window.umami?.track === 'function',
    identifyFunction: typeof window.umami?.identify === 'function',
    environment: window.umamiEnv || 'unknown',
    websiteId: UMAMI_WEBSITE_ID,
    scriptSrc: UMAMI_SRC,
    currentUrl: window.location.href,
    userAgent: navigator.userAgent.substring(0, 100),
  };
  
  // Additional checks for development
  if (window.umamiEnv === 'development') {
    console.log('🔍 Umami Debug Status:', status);
  }
  
  return status;
};

/**
 * Test function to verify Umami is working correctly
 * Use this in development to ensure analytics are functioning
 */
export const testUmami = async () => {
  if (typeof window === 'undefined') return false;
  
  try {
    await trackEvent('test_event', { 
      test: true, 
      timestamp: Date.now(),
      source: 'debug_function'
    });
    
    if (window.umamiEnv === 'development') {
      console.log('✅ Umami test event sent successfully');
    }
    
    return true;
  } catch (error) {
    if (window.umamiEnv === 'development') {
      console.error('❌ Umami test failed:', error);
    }
    return false;
  }
};
