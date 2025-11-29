/**
 * Tracking utilities for adding Umami data attributes to components
 * This provides an easy way to add tracking to any HTML element
 */

import { UmamiEventData } from './analytics';

/**
 * Generate Umami data attributes for an element
 * 
 * @param eventName - The name of the event to track
 * @param eventData - Additional event data to track
 * @returns Object with data attributes ready to spread on an element
 * 
 * @example
 * ```tsx
 * <button {...getTrackingProps('button_click', { button_type: 'cta' })}>
 *   Click me
 * </button>
 * ```
 */
export const getTrackingProps = (eventName: string, eventData?: UmamiEventData) => {
  const baseProps = {
    'data-umami-event': eventName.substring(0, 50)
  };

  if (!eventData) {
    return baseProps;
  }

  // Convert event data to umami data attributes
  const dataAttributes = Object.entries(eventData).reduce((acc, [key, value]) => {
    // Ensure values are strings for data attributes
    const stringValue = typeof value === 'string' ? value : String(value);
    acc[`data-umami-event-${key.replace(/_/g, '-')}`] = stringValue;
    return acc;
  }, {} as Record<string, string>);

  return {
    ...baseProps,
    ...dataAttributes
  };
};

/**
 * Common tracking configurations for frequently used elements
 */
export const TRACKING_CONFIGS = {
  // Social media links
  social: (platform: string, location: string = 'header') => 
    getTrackingProps('cta_klik_social_platform', { 
      pagina: typeof window !== 'undefined' ? window.location.pathname : 'onbekend',
      platform, 
      locatie_sectie: location 
    }),

  // Project interactions
  project: (action: string, project: string, location: string = 'card') =>
    getTrackingProps('project_kaart_interactie', { 
      pagina: typeof window !== 'undefined' ? window.location.pathname : 'onbekend',
      actie_type: action, 
      project_naam: project, 
      locatie_sectie: location 
    }),

  // Navigation items
  navigation: (section: string, method: string = 'click') =>
    getTrackingProps('navigatie_sectie_bekeken', { 
      pagina: typeof window !== 'undefined' ? window.location.pathname : 'onbekend',
      sectie_naam: section, 
      navigatie_methode: method 
    }),

  // Download links
  download: (file: string, type: string) =>
    getTrackingProps('cta_download_bestand', { 
      pagina: typeof window !== 'undefined' ? window.location.pathname : 'onbekend',
      bestand_naam: file, 
      bestand_type: type 
    }),

  // Terminal commands (for help text, etc.)
  terminal: (command: string, category?: string) =>
    getTrackingProps('terminal_commando_uitgevoerd', { 
      pagina: typeof window !== 'undefined' ? window.location.pathname : 'onbekend',
      commando_naam: command.substring(0, 30),
      ...(category && { commando_categorie: category })
    }),

  // Theme switcher
  theme: (theme: string, trigger: string = 'button') =>
    getTrackingProps('thema_wijziging_knop', { 
      pagina: typeof window !== 'undefined' ? window.location.pathname : 'onbekend',
      thema_type: theme, 
      trigger_methode: trigger 
    }),

  // Language switcher
  language: (language: string, trigger: string = 'switcher') =>
    getTrackingProps('taal_wijziging_switcher', { 
      pagina: typeof window !== 'undefined' ? window.location.pathname : 'onbekend',
      taal: language, 
      trigger_methode: trigger 
    }),

  // Contact form elements
  contact: (action: string, step?: string) =>
    getTrackingProps('formulier_contact_actie', { 
      pagina: typeof window !== 'undefined' ? window.location.pathname : 'onbekend',
      actie_type: action,
      ...(step && { formulier_stap: step })
    }),

  // Feature usage
  feature: (feature: string, context?: string) =>
    getTrackingProps('functie_gebruikt', { 
      pagina: typeof window !== 'undefined' ? window.location.pathname : 'onbekend',
      functie_naam: feature,
      ...(context && { context_info: context })
    })
} as const;

/**
 * Helper function to create tracking props with category
 */
export const createCategorizedTracking = (
  category: string,
  eventName: string, 
  eventData?: UmamiEventData
) => {
  return getTrackingProps(eventName, {
    category,
    ...eventData
  });
};

/**
 * Helper to track external link clicks
 */
export const getExternalLinkTracking = (url: string, linkText?: string) => {
  try {
    const urlObj = new URL(url);
    const domain = urlObj.hostname;
    
    return getTrackingProps('cta_klik_externe_link', {
      pagina: typeof window !== 'undefined' ? window.location.pathname : 'onbekend',
      doel_domein: domain,
      ...(linkText && { link_tekst: linkText.substring(0, 50) })
    });
  } catch {
    return getTrackingProps('cta_klik_externe_link', {
      pagina: typeof window !== 'undefined' ? window.location.pathname : 'onbekend',
      doel_domein: 'onbekend',
      ...(linkText && { link_tekst: linkText.substring(0, 50) })
    });
  }
};
