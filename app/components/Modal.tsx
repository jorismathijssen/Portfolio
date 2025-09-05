import React, { useEffect, useRef, useCallback } from 'react';
import { clsx } from 'clsx';

/**
 * Modal component props interface
 */
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton?: boolean;
  closeOnBackdropClick?: boolean;
  zIndex?: number;
}

const MODAL_SIZES = {
  sm: 'max-w-md',
  md: 'max-w-2xl',
  lg: 'max-w-4xl',
  xl: 'max-w-6xl',
  full: 'max-w-full mx-4',
} as const;

/**
 * Accessible modal with focus management and keyboard navigation
 */
const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  children, 
  title = 'Modal',
  className,
  size = 'md',
  showCloseButton = true,
  closeOnBackdropClick = true,
  zIndex = 1000,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  /**
   * Focus trap management for accessibility
   */
  const setupFocusTrap = useCallback(() => {
    if (!modalRef.current) return;

    previousFocusRef.current = document.activeElement as HTMLElement;
    modalRef.current.focus();

    // Get all focusable elements within the modal
    const focusableElements = modalRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    /**
     * Handle tab key navigation within the focus trap
     * @param e - Keyboard event
     */
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        // Shift+Tab on first element -> focus last element
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        } 
        // Tab on last element -> focus first element
        else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);
    
    // Cleanup function
    return () => {
      document.removeEventListener('keydown', handleTabKey);
      previousFocusRef.current?.focus();
    };
  }, []);

  /**
   * Handle escape key press to close modal
   * 
   * @param event - Keyboard event
   * 
   * @internal
   */
  const handleEscape = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  /**
   * Handle backdrop click to close modal (if enabled)
   * 
   * @param event - Mouse event
   * 
   * @internal
   */
  const handleBackdropClick = useCallback((event: React.MouseEvent) => {
    if (closeOnBackdropClick && event.target === event.currentTarget) {
      onClose();
    }
  }, [onClose, closeOnBackdropClick]);

  // Focus management effect
  useEffect(() => {
    if (isOpen) {
      return setupFocusTrap();
    }
    return undefined;
  }, [isOpen, setupFocusTrap]);

  // Escape key effect
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
    return undefined;
  }, [isOpen, handleEscape]);

  // Early return if modal is closed
  if (!isOpen) {
    return null;
  }

  // Generate backdrop classes
  const backdropClasses = clsx(
    'modal__backdrop',
    'fixed inset-0 z-(--z-index) flex justify-center items-center p-4',
    'bg-black bg-opacity-50 backdrop-blur-xs',
    'transition-opacity duration-200 ease-in-out'
  );

  // Generate modal classes based on size and props
  const modalClasses = clsx(
    'modal__container',
    'bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-h-[90vh] overflow-y-auto',
    'relative shadow-xl transform transition-all duration-200 scale-100',
    'focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50',
    MODAL_SIZES[size],
    className
  );

  // Generate close button classes
  const closeButtonClasses = clsx(
    'modal__close-button',
    'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200',
    'transition-colors duration-150 ease-in-out p-1 rounded-md',
    'hover:bg-gray-100 dark:hover:bg-gray-700',
    'focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
  );

  return (
    <div
      className={backdropClasses}
      style={{ '--z-index': zIndex } as React.CSSProperties}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className={modalClasses}
        tabIndex={-1}
      >
        {/* Modal Header */}
        <div className="modal__header flex justify-between items-center mb-4">
          <h2 
            id="modal-title" 
            className="text-xl font-semibold text-gray-900 dark:text-gray-100"
          >
            {title}
          </h2>
          
          {showCloseButton && (
            <button
              type="button"
              onClick={onClose}
              className={closeButtonClasses}
              aria-label="Close modal"
            >
              <svg 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                aria-hidden="true"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            </button>
          )}
        </div>
        
        {/* Modal Content */}
        <div className="modal__content text-gray-700 dark:text-gray-300">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
