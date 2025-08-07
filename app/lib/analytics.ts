/**
 * Umami Analytics - Improved Event Tracking System
 * Following official Umami documentation and event naming best practices
 */

// Configuration with ad blocker bypass
export const UMAMI_WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || 'f89e04ae-4fef-4bcc-b8c6-e2bd3f4be6c1';

// Use proxied script URL to bypass ad blockers
// Falls back to direct URL if proxy fails
export const UMAMI_SRC = process.env.NEXT_PUBLIC_UMAMI_SRC || '/script.js';
export const UMAMI_FALLBACK_SRC = 'https://analytics.jorismathijssen.nl/script.js';

// Event data interface - only primitives as per Umami best practices
export interface UmamiEventData {
  [key: string]: string | number | boolean;
}

// Event categories for better organization - Nederlandse categorieën
export const EVENT_CATEGORIES = {
  USER_INTERACTION: 'gebruiker_interactie',
  NAVIGATION: 'navigatie', 
  FEATURE_USAGE: 'functie_gebruik',
  PERFORMANCE: 'prestatie',
  ERROR: 'fout',
  ENGAGEMENT: 'betrokkenheid'
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
  return track('thema_wijziging_knop', { 
    category: EVENT_CATEGORIES.USER_INTERACTION,
    pagina: typeof window !== 'undefined' ? window.location.pathname : 'onbekend',
    thema_type: theme,
    trigger_methode: trigger
  });
};

// Language switching events  
export const trackLanguageSwitch = async (language: string, trigger: 'switcher' | 'browser' = 'switcher') => {
  return track('taal_wijziging_switcher', { 
    category: EVENT_CATEGORIES.USER_INTERACTION,
    pagina: typeof window !== 'undefined' ? window.location.pathname : 'onbekend',
    taal: language,
    trigger_methode: trigger
  });
};

// Contact form interactions with campaign attribution
export const trackContactForm = async (action: 'start' | 'submit' | 'success' | 'error', step?: string) => {
  const attribution = getTrafficAttribution();
  
  return track('formulier_contact_actie', { 
    category: EVENT_CATEGORIES.USER_INTERACTION,
    pagina: typeof window !== 'undefined' ? window.location.pathname : 'onbekend',
    actie_type: action,
    ...attribution,
    ...(step && { formulier_stap: step })
  });
};

// Social media clicks
export const trackSocialClick = async (platform: string, location: 'header' | 'footer' | 'about' = 'header') => {
  return track('cta_klik_social_platform', { 
    category: EVENT_CATEGORIES.USER_INTERACTION,
    pagina: typeof window !== 'undefined' ? window.location.pathname : 'onbekend',
    platform: platform,
    locatie_sectie: location
  });
};

// Download events
export const trackDownload = async (file: string, type: string) => {
  return track('cta_download_bestand', { 
    category: EVENT_CATEGORIES.USER_INTERACTION,
    pagina: typeof window !== 'undefined' ? window.location.pathname : 'onbekend',
    bestand_naam: file.substring(0, 100), 
    bestand_type: type 
  });
};

/**
 * FEATURE USAGE EVENTS
 */

// Terminal command events
export const trackTerminalCommand = async (command: string, category?: string) => {
  return track('terminal_commando_uitgevoerd', { 
    category: EVENT_CATEGORIES.FEATURE_USAGE,
    pagina: typeof window !== 'undefined' ? window.location.pathname : 'onbekend',
    commando_naam: command.substring(0, 30),
    ...(category && { commando_categorie: category })
  });
};

// Terminal effect events
export const trackTerminalEffect = async (effect: string, duration?: number) => {
  return track('terminal_effect_gestart', {
    category: EVENT_CATEGORIES.FEATURE_USAGE,
    pagina: typeof window !== 'undefined' ? window.location.pathname : 'onbekend',
    effect_type: effect,
    ...(duration && { duur_milliseconden: Math.round(duration) })
  });
};

// Project interactions with traffic attribution for campaign measurement
export const trackProjectInteraction = async (
  action: 'view' | 'click' | 'demo' | 'github',
  project: string, 
  location: 'card' | 'timeline' | 'search' = 'card'
) => {
  const attribution = getTrafficAttribution();
  
  return track('project_kaart_interactie', { 
    category: EVENT_CATEGORIES.ENGAGEMENT,
    pagina: typeof window !== 'undefined' ? window.location.pathname : 'onbekend',
    actie_type: action,
    project_naam: project.substring(0, 50),
    locatie_sectie: location,
    ...attribution
  });
};

/**
 * NAVIGATION EVENTS
 */

// Section navigation
export const trackSectionView = async (section: string, method: 'scroll' | 'click' | 'direct' = 'scroll') => {
  return track('navigatie_sectie_bekeken', { 
    category: EVENT_CATEGORIES.NAVIGATION,
    pagina: typeof window !== 'undefined' ? window.location.pathname : 'onbekend',
    sectie_naam: section,
    navigatie_methode: method
  });
};

// Search events
export const trackSearch = async (query: string, results: number, source: 'portfolio' | 'terminal' = 'portfolio') => {
  return track('zoekfunctie_query_uitgevoerd', { 
    category: EVENT_CATEGORIES.FEATURE_USAGE,
    pagina: typeof window !== 'undefined' ? window.location.pathname : 'onbekend',
    zoekterm: query.substring(0, 50),
    resultaten_aantal: results,
    bron_sectie: source
  });
};

/**
 * PERFORMANCE EVENTS
 */

// Web Vitals tracking following Umami best practices with campaign attribution
export const trackWebVital = async (
  metric: 'CLS' | 'FID' | 'FCP' | 'LCP' | 'TTFB' | 'INP', 
  value: number,
  rating: 'good' | 'needs-improvement' | 'poor'
) => {
  // Get device context for performance analysis
  const getDeviceContext = () => {
    if (typeof window === 'undefined') return { apparaat_type: 'unknown', verbinding_type: 'unknown' };
    
    const userAgent = navigator.userAgent;
    let deviceType = 'desktop';
    
    if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
      deviceType = 'mobile';
    } else if (/iPad/i.test(userAgent)) {
      deviceType = 'tablet';
    }

    const connection = (navigator as {
      connection?: { effectiveType?: string };
      mozConnection?: { effectiveType?: string };
      webkitConnection?: { effectiveType?: string };
    }).connection || (navigator as { mozConnection?: { effectiveType?: string } }).mozConnection || (navigator as { webkitConnection?: { effectiveType?: string } }).webkitConnection;
    const connectionType = connection?.effectiveType || 'unknown';

    return {
      apparaat_type: deviceType,
      verbinding_type: connectionType
    };
  };

  const deviceContext = getDeviceContext();
  const attribution = getTrafficAttribution();

  // Single event with rich context for Umami dashboard filtering and UTM reports
  return track('prestatie_web_vital_gemeten', { 
    category: EVENT_CATEGORIES.PERFORMANCE,
    pagina: typeof window !== 'undefined' ? window.location.pathname : 'onbekend',
    metric_type: metric,
    waarde: Number(value.toFixed(2)),
    beoordeling: rating,
    ...deviceContext,
    ...attribution
  });
};

// Page load performance
export const trackPageLoad = async (loadTime: number, pageType: string = 'home') => {
  return track('prestatie_pagina_geladen', {
    category: EVENT_CATEGORIES.PERFORMANCE,
    pagina: typeof window !== 'undefined' ? window.location.pathname : 'onbekend',
    laadtijd_milliseconden: Math.round(loadTime),
    pagina_type: pageType
  });
};

// Resource loading performance
export const trackResourceLoad = async (resource: string, loadTime: number) => {
  return track('prestatie_resource_geladen', {
    category: EVENT_CATEGORIES.PERFORMANCE,
    pagina: typeof window !== 'undefined' ? window.location.pathname : 'onbekend',
    resource_type: resource,
    laadtijd_milliseconden: Math.round(loadTime)
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
  return track('fout_javascript_opgetreden', { 
    category: EVENT_CATEGORIES.ERROR,
    pagina: typeof window !== 'undefined' ? window.location.pathname : 'onbekend',
    fout_type: type,
    fout_bericht: message.substring(0, 100),
    ...(component && { component_naam: component })
  });
};

// Feature usage tracking
export const trackFeatureUse = async (feature: string, context?: string) => {
  return track('functie_gebruikt', { 
    category: EVENT_CATEGORIES.FEATURE_USAGE,
    pagina: typeof window !== 'undefined' ? window.location.pathname : 'onbekend',
    functie_naam: feature,
    ...(context && { context_info: context })
  });
};

/**
 * ENGAGEMENT EVENTS
 */

// Time spent on sections
export const trackTimeSpent = async (section: string, timeSeconds: number) => {
  return track('tijd_doorgebracht_sectie', {
    category: EVENT_CATEGORIES.ENGAGEMENT,
    pagina: typeof window !== 'undefined' ? window.location.pathname : 'onbekend',
    sectie_naam: section,
    duur_seconden: Math.round(timeSeconds)
  });
};

// Scroll depth tracking
export const trackScrollDepth = async (depth: 25 | 50 | 75 | 100, page: string = 'home') => {
  return track('scroll_diepte_bereikt', {
    category: EVENT_CATEGORIES.ENGAGEMENT,
    pagina: typeof window !== 'undefined' ? window.location.pathname : page,
    diepte_percentage: depth
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
 * Get UTM parameters and traffic source context for campaign attribution
 * Umami automatically captures UTM parameters, this adds additional context
 */
export const getTrafficAttribution = () => {
  if (typeof window === 'undefined') return {
    verkeer_bron: 'server_side',
    heeft_utm: 'onbekend',
    sessie_type: 'server'
  };
  
  const urlParams = new URLSearchParams(window.location.search);
  const referrer = document.referrer;
  
  // Classify traffic source for better analytics
  let traffic_source = 'direct';
  let session_type = 'organic';
  
  if (referrer) {
    const domain = new URL(referrer).hostname;
    
    if (domain.includes('google.')) {
      traffic_source = 'google_search';
      session_type = 'organic';
    } else if (domain.includes('linkedin.')) {
      traffic_source = 'linkedin';
      session_type = 'social';
    } else if (domain.includes('github.')) {
      traffic_source = 'github';
      session_type = 'referral';
    } else if (domain.includes('twitter.') || domain.includes('x.com')) {
      traffic_source = 'twitter';
      session_type = 'social';
    } else {
      traffic_source = 'referral';
      session_type = 'referral';
    }
  }
  
  // Check for UTM parameters (Umami captures these automatically)
  const hasUTM = ['utm_source', 'utm_medium', 'utm_campaign'].some(param => 
    urlParams.has(param)
  );
  
  if (hasUTM) {
    session_type = 'campaign';
  }
  
  return {
    verkeer_bron: traffic_source,
    heeft_utm: hasUTM ? 'ja' : 'nee',
    sessie_type: session_type
  };
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
    await track('test_event_ontwikkeling', { 
      pagina: window.location.pathname,
      bron: 'debug_functie' 
    });
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
