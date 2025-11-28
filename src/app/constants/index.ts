/**
 * Application-wide constants
 */

/**
 * Theme constants
 */
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const;

/**
 * Language constants
 */
export const LANGUAGES = {
  ENGLISH: 'en',
  DUTCH: 'nl',
} as const;

/**
 * Component size constants
 */
export const SIZES = {
  SMALL: 'sm',
  MEDIUM: 'md',
  LARGE: 'lg',
} as const;

/**
 * Z-index constants for consistent layering
 */
export const Z_INDEX = {
  DROPDOWN: 1000,
  STICKY: 1010,
  MODAL_BACKDROP: 1020,
  MODAL: 1030,
  POPOVER: 1040,
  TOOLTIP: 1050,
  TOAST: 1060,
} as const;

/**
 * Breakpoint constants (matching Tailwind defaults)
 */
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

/**
 * Animation duration constants
 */
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 200,
  SLOW: 300,
  EXTRA_SLOW: 500,
} as const;

/**
 * API endpoints (if needed)
 */
export const API_ENDPOINTS = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || '',
  CONTACT: '/api/contact',
  PROJECTS: '/api/projects',
} as const;

/**
 * Local storage keys
 */
export const STORAGE_KEYS = {
  THEME: 'theme',
  LANGUAGE: 'language',
  TERMINAL_HISTORY: 'terminal-history',
  TOASTER_VISITS: 'terminalToasterVisits',
  MODAL_PREFERENCES: 'modal-preferences',
} as const;

/**
 * Default configuration values
 */
export const DEFAULTS = {
  THEME: THEMES.LIGHT,
  LANGUAGE: LANGUAGES.DUTCH,
  MODAL_SIZE: SIZES.MEDIUM,
  ANIMATION_DURATION: ANIMATION_DURATION.NORMAL,
  MAX_TERMINAL_LINES: 100,
  MAX_COMMAND_HISTORY: 50,
  TOASTER_MAX_VISITS: 10,
  TOASTER_TIMEOUT: 120000, // 2 minutes
} as const;

/**
 * Accessibility constants
 */
export const A11Y = {
  SKIP_LINK_ID: 'main-content',
  MODAL_TITLE_ID: 'modal-title',
  MODAL_DESCRIPTION_ID: 'modal-description',
  TERMINAL_OUTPUT_ID: 'terminal-output',
  TIMELINE_HEADING_ID: 'timeline-heading',
} as const;

/**
 * Error messages
 */
export const ERROR_MESSAGES = {
  GENERIC: 'An unexpected error occurred. Please try again.',
  NETWORK: 'Network error. Please check your connection and try again.',
  NOT_FOUND: 'The requested resource was not found.',
  PERMISSION_DENIED: 'You do not have permission to perform this action.',
  VALIDATION: 'Please check your input and try again.',
  TERMINAL_COMMAND_FAILED: 'Command execution failed. Please try again.',
  LOCALSTORAGE_FAILED: 'Failed to access local storage. Some features may not work properly.',
  THEME_SWITCH_FAILED: 'Failed to switch theme. Please refresh the page.',
  LANGUAGE_SWITCH_FAILED: 'Failed to change language. Please refresh the page.',
  CANVAS_CREATION_FAILED: 'Failed to create visual effect. Your browser may not support this feature.',
} as const;

/**
 * Success messages
 */
export const SUCCESS_MESSAGES = {
  SAVED: 'Your changes have been saved successfully.',
  SUBMITTED: 'Your form has been submitted successfully.',
  UPDATED: 'The information has been updated successfully.',
  COMMAND_EXECUTED: 'Command executed successfully.',
  THEME_CHANGED: 'Theme changed successfully.',
  LANGUAGE_CHANGED: 'Language changed successfully.',
} as const;
