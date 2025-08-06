import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * localStorage hook options
 */
interface UseLocalStorageOptions<T> {
  /** Default value if key doesn't exist */
  defaultValue: T;
  /** Custom serializer function */
  serializer?: {
    parse: (value: string) => T;
    stringify: (value: T) => string;
  };
  /** Whether to sync across tabs */
  syncAcrossTabs?: boolean;
}

/**
 * Return type for useLocalStorage hook
 */
interface UseLocalStorageReturn<T> {
  /** Current stored value */
  value: T;
  /** Function to update stored value */
  setValue: (value: T | ((prev: T) => T)) => void;
  /** Function to remove stored value */
  removeValue: () => void;
  /** Loading state */
  loading: boolean;
  /** Error state */
  error: Error | null;
}

/**
 * Custom hook for localStorage management with type safety and error handling
 * 
 * Features:
 * - Type-safe localStorage operations
 * - SSR-safe (doesn't access localStorage during SSR)
 * - Error handling for localStorage failures
 * - Optional cross-tab synchronization
 * - Custom serialization support
 * - Loading states
 * 
 * @param key - localStorage key
 * @param options - Configuration options
 * @returns localStorage state and controls
 * 
 * @example
 * ```tsx
 * const { value, setValue, loading, error } = useLocalStorage('user-prefs', {
 *   defaultValue: { theme: 'light', language: 'en' },
 *   syncAcrossTabs: true
 * });
 * ```
 */
export function useLocalStorage<T>(
  key: string,
  options: UseLocalStorageOptions<T>
): UseLocalStorageReturn<T> {
  const { defaultValue, serializer, syncAcrossTabs = false } = options;
  
  const [value, setValue] = useState<T>(defaultValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  // Use refs to avoid stale closures
  const isLoadedRef = useRef(false);
  const valueRef = useRef(value);
  valueRef.current = value;

  /**
   * Default serializer using JSON
   */
  const defaultSerializer = {
    parse: JSON.parse,
    stringify: JSON.stringify,
  };

  const serialize = serializer || defaultSerializer;

  /**
   * Safely read value from localStorage
   */
  const readValue = useCallback((): T => {
    if (typeof window === 'undefined') {
      return defaultValue;
    }

    try {
      const item = localStorage.getItem(key);
      if (item === null) {
        return defaultValue;
      }
      return serialize.parse(item);
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      setError(error instanceof Error ? error : new Error('Failed to read from localStorage'));
      return defaultValue;
    }
  }, [key, defaultValue, serialize]);

  /**
   * Safely write value to localStorage
   */
  const writeValue = useCallback((newValue: T): void => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      localStorage.setItem(key, serialize.stringify(newValue));
      setError(null);
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
      setError(error instanceof Error ? error : new Error('Failed to write to localStorage'));
    }
  }, [key, serialize]);

  /**
   * Update value with function or direct value
   */
  const updateValue = useCallback((newValue: T | ((prev: T) => T)): void => {
    try {
      const updatedValue = typeof newValue === 'function' 
        ? (newValue as (prev: T) => T)(valueRef.current)
        : newValue;
      
      setValue(updatedValue);
      writeValue(updatedValue);
    } catch (error) {
      console.error(`Error updating localStorage key "${key}":`, error);
      setError(error instanceof Error ? error : new Error('Failed to update localStorage'));
    }
  }, [key, writeValue]);

  /**
   * Remove value from localStorage
   */
  const removeValue = useCallback((): void => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      localStorage.removeItem(key);
      setValue(defaultValue);
      setError(null);
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
      setError(error instanceof Error ? error : new Error('Failed to remove from localStorage'));
    }
  }, [key, defaultValue]);

  /**
   * Handle storage events for cross-tab sync
   */
  const handleStorageChange = useCallback((e: StorageEvent): void => {
    if (e.key !== key || e.storageArea !== localStorage) {
      return;
    }

    if (e.newValue === null) {
      setValue(defaultValue);
    } else {
      try {
        setValue(serialize.parse(e.newValue));
        setError(null);
      } catch (error) {
        console.warn(`Error parsing localStorage change for key "${key}":`, error);
        setError(error instanceof Error ? error : new Error('Failed to parse localStorage change'));
      }
    }
  }, [key, defaultValue, serialize]);

  // Initialize value on mount
  useEffect(() => {
    if (isLoadedRef.current) return;
    
    const initialValue = readValue();
    setValue(initialValue);
    setLoading(false);
    isLoadedRef.current = true;
  }, [readValue]);

  // Set up cross-tab synchronization
  useEffect(() => {
    if (!syncAcrossTabs || typeof window === 'undefined') {
      return;
    }

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [handleStorageChange, syncAcrossTabs]);

  return {
    value,
    setValue: updateValue,
    removeValue,
    loading,
    error,
  };
}
