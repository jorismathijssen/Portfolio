/**
 * Custom hook for managing terminal visual effects
 * 
 * Features:
 * - Effect management and cleanup
 * - Canvas-based animations (Matrix, Confetti)
 * - Body class effects (invert, shake, rainbow)
 * - Proper cleanup on unmount
 * 
 * @example
 * ```tsx
 * const { executeEffect, cleanupEffects } = useTerminalEffects({ setTheme });
 * 
 * // Execute an effect
 * executeEffect('matrix');
 * 
 * // Cleanup all effects
 * cleanupEffects();
 * ```
 */

import { useCallback, useEffect, useRef } from 'react';
import { startMatrix, startConfetti } from '@/components/Terminal/effects';

/**
 * Theme setter function type
 */
type ThemeSetter = (theme: 'light' | 'dark') => void;

/**
 * Terminal effect types
 */
export type TerminalEffect = 
  | 'matrix' 
  | 'party' 
  | 'invert' 
  | 'shake' 
  | 'rainbow' 
  | 'dark' 
  | 'light' 
  | 'clear';

/**
 * Hook configuration interface
 */
interface UseTerminalEffectsConfig {
  /** Theme setter function from theme context */
  setTheme: ThemeSetter;
}

/**
 * Hook return interface
 */
interface UseTerminalEffectsReturn {
  /** Execute a terminal effect */
  executeEffect: (effect: TerminalEffect) => void;
  /** Cleanup all active effects */
  cleanupEffects: () => void;
  /** Check if an effect is currently active */
  isEffectActive: (effect: TerminalEffect) => boolean;
}

/**
 * Effect element IDs for tracking
 */
const EFFECT_IDS = {
  MATRIX: 'matrix-effect',
  CONFETTI: 'confetti-canvas',
} as const;

/**
 * Body CSS classes for effects
 */
const BODY_EFFECTS = {
  INVERT: 'invert',
  SHAKE: 'shake',
  RAINBOW: 'rainbow',
} as const;

/**
 * Canvas style configuration for effects
 */
const CANVAS_STYLES = {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100vw',
  height: '100vh',
  pointerEvents: 'none',
  zIndex: '10',
} as const;

/**
 * Custom hook for terminal effects management
 */
export function useTerminalEffects({ setTheme }: UseTerminalEffectsConfig): UseTerminalEffectsReturn {
  // Track active effects for cleanup
  const activeEffectsRef = useRef<Set<string>>(new Set());

  /**
   * Create and configure a canvas element for effects
   */
  const createEffectCanvas = useCallback((id: string): HTMLCanvasElement => {
    const canvas = document.createElement('canvas');
    canvas.id = id;
    Object.assign(canvas.style, CANVAS_STYLES);
    document.body.appendChild(canvas);
    activeEffectsRef.current.add(id);
    return canvas;
  }, []);

  /**
   * Remove an effect canvas from DOM
   */
  const removeEffectCanvas = useCallback((id: string): void => {
    const canvas = document.getElementById(id);
    if (canvas) {
      canvas.remove();
      activeEffectsRef.current.delete(id);
    }
  }, []);

  /**
   * Toggle body CSS class effects
   */
  const toggleBodyEffect = useCallback((className: string): void => {
    document.body.classList.toggle(className);
    
    if (document.body.classList.contains(className)) {
      activeEffectsRef.current.add(className);
    } else {
      activeEffectsRef.current.delete(className);
    }
  }, []);

  /**
   * Cleanup all active effects
   */
  const cleanupEffects = useCallback((): void => {
    // Remove canvas effects
    removeEffectCanvas(EFFECT_IDS.MATRIX);
    removeEffectCanvas(EFFECT_IDS.CONFETTI);

    // Remove body class effects
    document.body.classList.remove(
      BODY_EFFECTS.INVERT,
      BODY_EFFECTS.SHAKE,
      BODY_EFFECTS.RAINBOW
    );

    // Clear active effects tracking
    activeEffectsRef.current.clear();
  }, [removeEffectCanvas]);

  /**
   * Execute a terminal effect
   */
  const executeEffect = useCallback((effect: TerminalEffect): void => {
    switch (effect) {
      case 'matrix':
        if (!document.getElementById(EFFECT_IDS.MATRIX)) {
          const canvas = createEffectCanvas(EFFECT_IDS.MATRIX);
          startMatrix(canvas);
        }
        break;

      case 'party':
        if (!document.getElementById(EFFECT_IDS.CONFETTI)) {
          const canvas = createEffectCanvas(EFFECT_IDS.CONFETTI);
          // Confetti canvas needs different z-index
          canvas.style.zIndex = '9999';
          startConfetti(canvas);
        }
        break;

      case 'invert':
        toggleBodyEffect(BODY_EFFECTS.INVERT);
        break;

      case 'shake':
        toggleBodyEffect(BODY_EFFECTS.SHAKE);
        break;

      case 'rainbow':
        toggleBodyEffect(BODY_EFFECTS.RAINBOW);
        break;

      case 'dark':
        setTheme('dark');
        break;

      case 'light':
        setTheme('light');
        break;

      case 'clear':
        cleanupEffects();
        break;

      default:
        console.warn(`Unknown terminal effect: ${effect}`);
    }
  }, [createEffectCanvas, toggleBodyEffect, setTheme, cleanupEffects]);

  /**
   * Check if an effect is currently active
   */
  const isEffectActive = useCallback((effect: TerminalEffect): boolean => {
    switch (effect) {
      case 'matrix':
        return activeEffectsRef.current.has(EFFECT_IDS.MATRIX);
      case 'party':
        return activeEffectsRef.current.has(EFFECT_IDS.CONFETTI);
      case 'invert':
        return activeEffectsRef.current.has(BODY_EFFECTS.INVERT);
      case 'shake':
        return activeEffectsRef.current.has(BODY_EFFECTS.SHAKE);
      case 'rainbow':
        return activeEffectsRef.current.has(BODY_EFFECTS.RAINBOW);
      default:
        return false;
    }
  }, []);

  /**
   * Cleanup effects on unmount
   */
  useEffect(() => {
    return cleanupEffects;
  }, [cleanupEffects]);

  return {
    executeEffect,
    cleanupEffects,
    isEffectActive,
  };
}

/**
 * Type exports for external use
 */
export type { ThemeSetter, UseTerminalEffectsConfig, UseTerminalEffectsReturn };
