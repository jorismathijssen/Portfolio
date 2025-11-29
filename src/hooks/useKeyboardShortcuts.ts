import { useCallback, useEffect, useRef } from 'react';

/**
 * Keyboard shortcut configuration
 */
interface KeyboardShortcut {
  /** Key combination (e.g., 'ctrl+k', 'cmd+enter') */
  key: string;
  /** Callback function to execute */
  callback: () => void;
  /** Whether to prevent default behavior */
  preventDefault?: boolean;
  /** Whether shortcut is enabled */
  enabled?: boolean;
  /** Description for documentation */
  description?: string;
}

/**
 * Options for keyboard shortcuts hook
 */
interface UseKeyboardShortcutsOptions {
  /** Whether shortcuts are globally enabled */
  enabled?: boolean;
  /** Target element (defaults to document) */
  target?: HTMLElement | null;
}

/**
 * Parse key combination string into modifier and key
 */
function parseKeyCombo(combo: string): {
  ctrl: boolean;
  meta: boolean;
  alt: boolean;
  shift: boolean;
  key: string;
} {
  const parts = combo.toLowerCase().split('+');
  const key = parts[parts.length - 1];
  
  return {
    ctrl: parts.includes('ctrl'),
    meta: parts.includes('cmd') || parts.includes('meta'),
    alt: parts.includes('alt'),
    shift: parts.includes('shift'),
    key: key?.toLowerCase() || '',
  };
}

/**
 * Check if keyboard event matches shortcut configuration
 */
function matchesShortcut(event: KeyboardEvent, shortcut: KeyboardShortcut): boolean {
  const { ctrl, meta, alt, shift, key } = parseKeyCombo(shortcut.key);
  
  const eventKey = event.key.toLowerCase();
  const metaPressed = event.metaKey || event.ctrlKey; // Handle both Meta and Ctrl as modifier
  
  return (
    eventKey === key &&
    event.ctrlKey === ctrl &&
    (meta ? metaPressed : !event.metaKey) &&
    event.altKey === alt &&
    event.shiftKey === shift
  );
}

/**
 * Custom hook for managing keyboard shortcuts with accessibility support
 * 
 * Features:
 * - Global and element-scoped shortcuts
 * - Cross-platform key handling (Cmd/Ctrl)
 * - Enable/disable shortcuts dynamically
 * - Prevent default behavior
 * - TypeScript support
 * - Cleanup on unmount
 * 
 * @param shortcuts - Array of keyboard shortcut configurations
 * @param options - Configuration options
 * 
 * @example
 * ```tsx
 * useKeyboardShortcuts([
 *   {
 *     key: 'ctrl+k',
 *     callback: () => openSearch(),
 *     description: 'Open search'
 *   },
 *   {
 *     key: 'escape',
 *     callback: () => closeModal(),
 *     preventDefault: true
 *   }
 * ]);
 * ```
 */
export function useKeyboardShortcuts(
  shortcuts: KeyboardShortcut[],
  options: UseKeyboardShortcutsOptions = {}
): void {
  const { enabled = true, target } = options;
  
  // Use refs to avoid stale closures
  const shortcutsRef = useRef(shortcuts);
  shortcutsRef.current = shortcuts;

  /**
   * Handle keyboard events and match against shortcuts
   */
  const handleKeyDown = useCallback((event: Event): void => {
    if (!enabled || !(event instanceof KeyboardEvent)) return;

    // Don't trigger shortcuts when user is typing in input fields
    const activeElement = document.activeElement;
    if (
      activeElement &&
      (activeElement.tagName === 'INPUT' ||
       activeElement.tagName === 'TEXTAREA' ||
       activeElement.getAttribute('contenteditable') === 'true')
    ) {
      return;
    }

    // Find matching shortcut
    const matchingShortcut = shortcutsRef.current.find(shortcut => 
      shortcut.enabled !== false && matchesShortcut(event, shortcut)
    );

    if (matchingShortcut) {
      if (matchingShortcut.preventDefault) {
        event.preventDefault();
        event.stopPropagation();
      }

      try {
        matchingShortcut.callback();
      } catch (error) {
        console.error('Error executing keyboard shortcut:', error);
      }
    }
  }, [enabled]);

  // Set up event listeners
  useEffect(() => {
    const targetElement = target || document;
    
    if (!targetElement || !enabled) {
      return;
    }

    targetElement.addEventListener('keydown', handleKeyDown);

    return () => {
      targetElement.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown, target, enabled]);
}

/**
 * Hook for managing terminal-specific keyboard shortcuts
 * 
 * @param isTerminalOpen - Whether terminal is currently open
 * @param onToggleTerminal - Callback to toggle terminal
 * @param onFocusTerminal - Callback to focus terminal input
 * 
 * @example
 * ```tsx
 * useTerminalShortcuts(isOpen, toggleTerminal, focusInput);
 * ```
 */
export function useTerminalShortcuts(
  isTerminalOpen: boolean,
  onToggleTerminal: () => void,
  onFocusTerminal?: () => void
): void {
  useKeyboardShortcuts([
    {
      key: 'ctrl+`',
      callback: onToggleTerminal,
      preventDefault: true,
      description: 'Toggle terminal (Ctrl + `)',
    },
    {
      key: 'cmd+`',
      callback: onToggleTerminal,
      preventDefault: true,
      description: 'Toggle terminal (Cmd + `) - Mac',
    },
    {
      key: 'ctrl+shift+`',
      callback: onToggleTerminal,
      preventDefault: true,
      description: 'Toggle terminal (Ctrl + Shift + `)',
    },
    {
      key: 'escape',
      callback: () => {
        if (isTerminalOpen) {
          onToggleTerminal();
        }
      },
      enabled: isTerminalOpen,
      preventDefault: true,
      description: 'Close terminal with Escape',
    },
    {
      key: 'ctrl+l',
      callback: () => {
        if (isTerminalOpen && onFocusTerminal) {
          onFocusTerminal();
        }
      },
      enabled: isTerminalOpen,
      preventDefault: true,
      description: 'Focus terminal input (Ctrl + L)',
    },
  ]);
}
