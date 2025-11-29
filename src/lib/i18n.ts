/**
 * Internationalization configuration for the portfolio application
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { z } from 'zod';

import nlTranslation from '../../public/locales/nl/translation.json';
import enTranslation from '../../public/locales/en/translation.json';

export const SUPPORTED_LANGUAGES = ['en', 'nl'] as const;
export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];
export const DEFAULT_LANGUAGE: SupportedLanguage = 'nl';

/**
 * Language metadata interface
 * @interface LanguageMetadata
 * @since 1.0.0
 * @public
 */
interface LanguageMetadata {
  /** Language code (ISO 639-1) */
  code: SupportedLanguage;
  /** Native language name */
  name: string;
  /** English language name */
  englishName: string;
  /** RTL text direction support */
  rtl: boolean;
  /** Language region/locale */
  region?: string;
  /** Flag emoji or icon */
  flag: string;
}

export const LANGUAGES: readonly LanguageMetadata[] = [
  {
    code: 'en',
    name: 'English',
    englishName: 'English',
    rtl: false,
    region: 'US',
    flag: '🇺🇸',
  },
  {
    code: 'nl',
    name: 'Nederlands',
    englishName: 'Dutch',
    rtl: false,
    region: 'NL', 
    flag: '🇳🇱',
  },
] as const;

const NAMESPACES = [
  'translation',
  'common',
  'errors',
  'validation',
] as const;

/**
 * i18next configuration schema for validation
 * @internal
 */
const I18nConfigSchema = z.object({
  lng: z.enum(SUPPORTED_LANGUAGES).optional(),
  fallbackLng: z.enum(SUPPORTED_LANGUAGES),
  debug: z.boolean(),
  ns: z.array(z.string()),
  defaultNS: z.string(),
  resources: z.record(z.string(), z.record(z.string(), z.record(z.string(), z.unknown()))),
  interpolation: z.object({
    escapeValue: z.boolean(),
  }),
  react: z.object({
    useSuspense: z.boolean(),
    bindI18n: z.string(),
    bindI18nStore: z.string(),
    transEmptyNodeValue: z.string(),
    transSupportBasicHtmlNodes: z.boolean(),
    transKeepBasicHtmlNodesFor: z.array(z.string()),
  }),
});

/**
 * Static translation resources for bundling
 * @constant
 * @internal
 */
const STATIC_RESOURCES = {
  en: {
    translation: enTranslation,
  },
  nl: {
    translation: nlTranslation,
  },
} as const;

/**
 * Development-specific configuration
 * @constant
 * @internal
 */
const DEV_CONFIG = {
  debug: process.env.NODE_ENV === 'development',
  saveMissing: false, // Disable to prevent spam POST requests
  updateMissing: false, // Disable to prevent spam POST requests
  saveMissingTo: 'current', // Disable fallback saving
  saveMissingPlurals: false, // Disable plural saving
  
  // Modern interpolation configuration
  interpolation: {
    escapeValue: false,
    // Modern formatter approach - using formatters object instead of format function
    formatters: {
      uppercase: (value: string) => value.toUpperCase(),
      lowercase: (value: string) => value.toLowerCase(),
      capitalize: (value: string) => value.charAt(0).toUpperCase() + value.slice(1),
    },
  },
} as const;

/**
 * Production-specific configuration
 * @constant
 * @internal
 */
const PROD_CONFIG = {
  debug: false,
  saveMissing: false,
  updateMissing: false,
  saveMissingTo: 'current',
  saveMissingPlurals: false,
  
  // Production interpolation (security-focused)
  interpolation: {
    escapeValue: false, // React already escapes
    skipOnVariables: false,
  },
} as const;

/**
 * Base i18next configuration
 * @constant
 * @internal
 */
const BASE_CONFIG = {
  lng: DEFAULT_LANGUAGE,
  fallbackLng: DEFAULT_LANGUAGE,
  supportedLngs: SUPPORTED_LANGUAGES,
  nonExplicitSupportedLngs: true,
  
  // Namespace configuration
  ns: NAMESPACES,
  defaultNS: 'translation',
  
  // Static resources (fallback)
  resources: STATIC_RESOURCES,
  
  // Modern interpolation configuration
  interpolation: {
    escapeValue: false, // React already escapes
    skipOnVariables: false,
    // Use modern formatters approach instead of legacy format function
    formatters: {
      uppercase: (value: string) => value.toUpperCase(),
      lowercase: (value: string) => value.toLowerCase(),
      capitalize: (value: string) => value.charAt(0).toUpperCase() + value.slice(1),
    },
  },
  
  // React integration
  react: {
    useSuspense: false, // Prevents SSR issues
    bindI18n: 'languageChanged loaded',
    bindI18nStore: 'added removed',
    transEmptyNodeValue: '',
    transSupportBasicHtmlNodes: true,
    transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'em', 'span'],
  },
  
  // Performance optimization
  load: 'languageOnly' as const, // Don't load country-specific variants
  cleanCode: true, // Clean language codes
} as const;

/**
 * Initialize i18next with comprehensive configuration
 * 
 * @returns Promise resolving to i18next instance
 * @internal
 */
async function initializeI18n(): Promise<typeof i18n> {
  try {
    // Merge environment-specific configuration
    const envConfig = process.env.NODE_ENV === 'development' ? DEV_CONFIG : PROD_CONFIG;
    const finalConfig = { ...BASE_CONFIG, ...envConfig };
    
    // Validate configuration in development
    if (process.env.NODE_ENV === 'development') {
      try {
        I18nConfigSchema.parse(finalConfig);
      } catch (error) {
        console.warn('i18n configuration validation failed:', error);
      }
    }
    
    // Initialize i18next with minimal plugins
    await i18n
      .use(initReactI18next) // React integration only
      .init(finalConfig);
    
    // Development helpers
    if (process.env.NODE_ENV === 'development') {
      // Log current configuration
      console.info('i18n initialized:', {
        language: i18n.language,
        languages: i18n.languages,
        namespace: i18n.options.defaultNS,
        resources: Object.keys(i18n.options.resources || {}),
      });
      
      // Add global i18n access for debugging
      if (typeof window !== 'undefined') {
        (window as unknown as { __i18n: typeof i18n }).__i18n = i18n;
      }
    }
    
    return i18n;
    
  } catch (error) {
    console.error('Failed to initialize i18n:', error);
    
    // Fallback initialization with minimal config
    await i18n
      .use(initReactI18next)
      .init({
        lng: DEFAULT_LANGUAGE,
        fallbackLng: DEFAULT_LANGUAGE,
        resources: STATIC_RESOURCES,
        interpolation: { escapeValue: false },
        react: { useSuspense: false },
      });
    
    return i18n;
  }
}

/**
 * Utility functions for i18n management
 * @namespace I18nUtils
 * @public
 */
export const I18nUtils = {
  /**
   * Check if a language is supported
   * @param lang - Language code to check
   * @returns Whether the language is supported
   */
  isLanguageSupported: (lang: string): lang is SupportedLanguage => {
    return SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage);
  },
  
  /**
   * Get language metadata by code
   * @param code - Language code
   * @returns Language metadata or undefined
   */
  getLanguageMetadata: (code: string): LanguageMetadata | undefined => {
    return LANGUAGES.find(lang => lang.code === code);
  },
  
  /**
   * Get browser's preferred language from supported languages
   * @returns Preferred supported language or default
   */
  getBrowserLanguage: (): SupportedLanguage => {
    if (typeof navigator === 'undefined') return DEFAULT_LANGUAGE;
    
    const browserLangs = navigator.languages || [navigator.language];
    
    for (const browserLang of browserLangs) {
      const code = browserLang.split('-')[0];
      if (code && I18nUtils.isLanguageSupported(code)) {
        return code;
      }
    }
    
    return DEFAULT_LANGUAGE;
  },
  
  /**
   * Change language with validation and persistence
   * @param language - Language code to switch to
   * @returns Promise resolving when language is changed
   */
  changeLanguage: async (language: string): Promise<void> => {
    if (!I18nUtils.isLanguageSupported(language)) {
      console.warn(`Language "${language}" is not supported. Falling back to ${DEFAULT_LANGUAGE}`);
      language = DEFAULT_LANGUAGE;
    }
    
    try {
      await i18n.changeLanguage(language);
      
      // Update document language attribute
      if (typeof document !== 'undefined') {
        document.documentElement.lang = language;
        
        // Update text direction if needed
        const metadata = I18nUtils.getLanguageMetadata(language);
        if (metadata) {
          document.documentElement.dir = metadata.rtl ? 'rtl' : 'ltr';
        }
      }
      
    } catch (error) {
      console.error('Failed to change language:', error);
      throw error;
    }
  },
  
  /**
   * Get all available languages with metadata
   * @returns Array of language metadata
   */
  getAvailableLanguages: (): readonly LanguageMetadata[] => {
    return LANGUAGES;
  },
  
  /**
   * Format message with fallback handling
   * @param key - Translation key
   * @param options - Translation options
   * @returns Formatted message or key as fallback
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: (key: string, options?: any): string => {
    try {
      const translated = i18n.t(key, options);
      
      // Ensure we return a string
      const result = typeof translated === 'string' ? translated : String(translated);
      
      // Return key if translation is missing in development
      if (process.env.NODE_ENV === 'development' && result === key) {
        console.warn(`Missing translation for key: ${key}`);
      }
      
      return result;
    } catch (error) {
      console.error('Translation error:', error);
      return key; // Fallback to key
    }
  },
} as const;

/**
 * Custom hook for i18n with enhanced type safety
 * @returns i18n utilities and state
 * @public
 */
export function useI18n() {
  return {
    i18n,
    language: i18n.language as SupportedLanguage,
    languages: LANGUAGES,
    changeLanguage: I18nUtils.changeLanguage,
    t: I18nUtils.t,
    isLanguageSupported: I18nUtils.isLanguageSupported,
    getLanguageMetadata: I18nUtils.getLanguageMetadata,
  };
}

// Initialize i18n
initializeI18n().catch(error => {
  console.error('Critical i18n initialization error:', error);
});

/**
 * Configured i18next instance
 * @public
 */
export default i18n;

/**
 * Type exports for external usage
 */
export type { LanguageMetadata };
