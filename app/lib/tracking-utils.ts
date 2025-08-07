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
    getTrackingProps('social_click', { platform, location }),

  // Project interactions
  project: (action: string, project: string, location: string = 'card') =>
    getTrackingProps('project_interaction', { action, project, location }),

  // Navigation items
  navigation: (section: string, method: string = 'click') =>
    getTrackingProps('section_view', { section, method }),

  // Download links
  download: (file: string, type: string) =>
    getTrackingProps('file_download', { file, type }),

  // Terminal commands (for help text, etc.)
  terminal: (command: string, category?: string) =>
    getTrackingProps('terminal_command', { 
      command: command.substring(0, 30),
      ...(category && { command_category: category })
    }),

  // Theme switcher
  theme: (theme: string, trigger: string = 'button') =>
    getTrackingProps('theme_change', { theme, trigger }),

  // Language switcher
  language: (language: string, trigger: string = 'switcher') =>
    getTrackingProps('language_change', { language, trigger }),

  // Contact form elements
  contact: (action: string, step?: string) =>
    getTrackingProps('contact_form', { 
      action,
      ...(step && { step })
    }),

  // Feature usage
  feature: (feature: string, context?: string) =>
    getTrackingProps('feature_usage', { 
      feature,
      ...(context && { context })
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
    
    return getTrackingProps('external_link', {
      domain,
      ...(linkText && { link_text: linkText.substring(0, 50) })
    });
  } catch {
    return getTrackingProps('external_link', {
      domain: 'unknown',
      ...(linkText && { link_text: linkText.substring(0, 50) })
    });
  }
};
