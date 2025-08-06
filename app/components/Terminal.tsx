'use client';

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import clsx from 'clsx';
import { useDarkMode } from '../hooks/useDarkMode';
import { useTerminalEffects } from '../hooks/useTerminalEffects';
import type { TerminalEffect } from '../hooks/useTerminalEffects';
import { useAutoScroll } from '../hooks/useAutoScroll';
import { DEFAULTS, Z_INDEX, STORAGE_KEYS } from '../constants';
import type { BaseComponentProps, AccessibleProps } from '../types';
import { COMMANDS, TerminalCommand } from './Terminal/commands';
import Toaster from './Terminal/Toaster';

/**
 * Terminal component props interface
 */
interface TerminalProps extends BaseComponentProps, AccessibleProps {
  initialCommands?: string[];
  maxLines?: number;
  onCommand?: (command: string) => string | Promise<string>;
  defaultOpen?: boolean;
}

/**
 * Interactive terminal component with command history and effects
 */
export default function Terminal({
  initialCommands = [],
  maxLines = DEFAULTS.MAX_TERMINAL_LINES,
  onCommand,
  defaultOpen = false,
  className,
  'aria-label': ariaLabel = 'Interactive terminal emulator',
  'data-testid': testId = 'terminal',
}: TerminalProps): React.JSX.Element | null {
  // State management with proper typing
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string[]>(initialCommands);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);
  const [showToaster, setShowToaster] = useState<boolean>(true);

  // Refs for DOM manipulation and focus management
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Custom hooks
  const { isDarkMode, setTheme, isLoading } = useDarkMode();
  const { executeEffect } = useTerminalEffects({ setTheme });
  const { scrollRef } = useAutoScroll({ 
    dependency: output,
    smooth: true 
  });

  /**
   * Execute terminal command with error handling and history management
   */
  const executeCommand = useCallback(async (command: string) => {
    try {
      let result: string;
      if (onCommand) {
        const customResult = onCommand(command);
        result = typeof customResult === 'string' ? customResult : await customResult;
      } else {
        result = COMMANDS[command as TerminalCommand] ?? `Command not found: ${command}. Type 'help' for available commands.`;
      }
      
      setOutput(prev => [
        ...prev.slice(-(maxLines - 2)), // Maintain max lines
        `> ${command}`,
        result
      ]);

      // Update command history
      setCommandHistory(prev => {
        const newHistory = [command, ...prev.filter(cmd => cmd !== command)].slice(0, DEFAULTS.MAX_COMMAND_HISTORY);
        // Persist to localStorage with error handling
        try {
          localStorage.setItem(STORAGE_KEYS.TERMINAL_HISTORY, JSON.stringify(newHistory));
        } catch (error) {
          console.warn('Failed to save command history:', error);
          // Continue execution even if localStorage fails
        }
        return newHistory;
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setOutput(prev => [
        ...prev,
        `> ${command}`,
        `Error: ${errorMessage}`
      ]);
      console.error('Terminal command execution failed:', error);
    }
  }, [onCommand, maxLines]);

  /**
   * Handle form submission for terminal commands
   */
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();
    
    if (cmd) {
      executeCommand(cmd);
      executeEffect(cmd as TerminalEffect); // Execute visual effects
      setInput('');
      setHistoryIndex(-1);
    }
  }, [input, executeCommand, executeEffect]);

  /**
   * Handle keyboard events for terminal input with command history navigation
   */
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
        handleSubmit(e);
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        if (commandHistory.length > 0) {
          const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
          setHistoryIndex(newIndex);
          const command = commandHistory[newIndex];
          if (command) {
            setInput(command);
          }
        }
        break;
        
      case 'ArrowDown':
        e.preventDefault();
        if (historyIndex > 0) {
          const newIndex = historyIndex - 1;
          setHistoryIndex(newIndex);
          const command = commandHistory[newIndex];
          if (command) {
            setInput(command);
          }
        } else if (historyIndex === 0) {
          setHistoryIndex(-1);
          setInput('');
        }
        break;
        
      case 'Escape':
        setIsOpen(false);
        break;
        
      case 'Tab':
        e.preventDefault();
        break;
    }
  }, [handleSubmit, commandHistory, historyIndex]);

  // Load command history from localStorage on mount
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem(STORAGE_KEYS.TERMINAL_HISTORY);
      if (savedHistory) {
        const history = JSON.parse(savedHistory);
        if (Array.isArray(history)) {
          setCommandHistory(history);
        }
      }
    } catch (error) {
      console.warn('Failed to load command history:', error);
    }
  }, []);

  /**
   * Hide toaster when terminal is opened
   */
  useEffect(() => {
    if (isOpen) {
      setShowToaster(false);
    }
  }, [isOpen]);

  /**
   * Focus input when terminal opens
   */
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  /**
   * Handle terminal open/close toggle
   */
  const toggleTerminal = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  /**
   * Handle toaster click
   */
  const handleToasterClick = useCallback(() => {
    setIsOpen(true);
    setShowToaster(false);
  }, []);

  // Memoized class names for performance using clsx
  const terminalClasses = useMemo(() => clsx(
    isOpen ? 'terminal--expanded' : 'terminal--minimized',
    className
  ), [isOpen, className]);

  const titleClasses = useMemo(() => clsx(
    'font-bold transition-all duration-200',
    {
      'text-base text-green-400 m-0': isOpen,
      'text-lg': !isOpen,
      'text-yellow-300': !isOpen && isDarkMode,
      'text-green-400': !isOpen && !isDarkMode,
    }
  ), [isOpen, isDarkMode]);

  // Don't render until theme is loaded to prevent hydration mismatch
  if (isLoading) {
    return null;
  }

  return (
    <>
      {showToaster && <Toaster onClick={handleToasterClick} />}
      
      <div
        className={terminalClasses}
        style={{ zIndex: Z_INDEX.MODAL }}
        role="application"
        aria-label={ariaLabel}
        aria-expanded={isOpen}
        data-testid={testId}
      >
        {/* Terminal header */}
        <div 
          className={clsx(
            isOpen ? 'terminal__header' : 'w-full h-full flex items-center justify-center',
            {
              'cursor-pointer': !isOpen,
            }
          )}
          onClick={toggleTerminal}
          role="button"
          tabIndex={0}
          aria-label={isOpen ? 'Minimize terminal' : 'Open terminal'}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              toggleTerminal();
            }
          }}
        >
          <div className={titleClasses}>
            {isOpen ? 'Terminal' : '💻'}
          </div>
          
          {isOpen && (
            <div className="terminal__controls">
              <button
                className="terminal__control-btn terminal__control-btn--close"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                aria-label="Close terminal"
              />
              <button
                className="terminal__control-btn terminal__control-btn--minimize"
                onClick={(e) => e.stopPropagation()}
                aria-label="Minimize terminal"
              />
              <button
                className="terminal__control-btn terminal__control-btn--maximize"
                onClick={(e) => e.stopPropagation()}
                aria-label="Maximize terminal"
              />
            </div>
          )}
        </div>

        {/* Terminal body */}
        {isOpen && (
          <div className="terminal__body">
            {/* Output area */}
            <div 
              ref={scrollRef}
              className="terminal__output"
              role="log"
              aria-live="polite"
              aria-label="Terminal output"
            >
              {output.length === 0 ? (
                <div className="text-green-400/70">
                  Welcome to the terminal emulator! Type &ldquo;help&rdquo; for available commands.
                </div>
              ) : (
                output.map((line, index) => (
                  <div 
                    key={`line-${index}`} 
                    className={clsx(
                      'terminal__line',
                      {
                        'terminal__line--command': line.startsWith('>'),
                        'terminal__line--output': !line.startsWith('>'),
                      }
                    )}
                  >
                    {line}
                  </div>
                ))
              )}
            </div>

            {/* Input area */}
            <form 
              onSubmit={handleSubmit} 
              className="terminal__input-area"
            >
              <div className="terminal__input-wrapper">
                <span className="terminal__prompt">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="terminal__input"
                  placeholder="Type a command..."
                  aria-label="Terminal command input"
                  autoComplete="off"
                  spellCheck={false}
                />
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
