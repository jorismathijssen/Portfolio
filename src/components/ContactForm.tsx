'use client';

import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { clsx } from 'clsx';
import { FormSchemas, type ContactForm } from '@/lib/validations';
import { trackContactForm } from '@/lib/analytics';

interface ContactFormProps {
  className?: string;
  onSuccess?: (data: ContactForm) => void;
  onError?: (error: Error) => void;
  showTitle?: boolean;
  title?: string;
  enableRateLimit?: boolean;
}

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error';

/**
 * Contact form with validation, accessibility, and rate limiting
 */
export default function ContactForm({
  className,
  onSuccess,
  onError,
  showTitle = true,
  title = 'Get in Touch',
  enableRateLimit = true,
}: ContactFormProps): React.JSX.Element {
  // Form state management
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');
  const [submissionMessage, setSubmissionMessage] = useState<string>('');
  const [lastSubmissionTime, setLastSubmissionTime] = useState<number>(0);

  // React Hook Form setup with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, touchedFields },
    reset,
    watch,
  } = useForm<ContactForm>({
    resolver: zodResolver(FormSchemas.contact),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  // Watch form values for enhanced UX
  const watchedValues = watch();
  const isFormDirty = Object.values(watchedValues).some(value => value.length > 0);

  /**
   * Rate limiting check for spam protection
   * @internal
   */
  const checkRateLimit = useCallback((): boolean => {
    if (!enableRateLimit) return true;
    
    const now = Date.now();
    const timeSinceLastSubmission = now - lastSubmissionTime;
    const minInterval = 30000; // 30 seconds minimum between submissions
    
    return timeSinceLastSubmission >= minInterval;
  }, [enableRateLimit, lastSubmissionTime]);

  /**
   * Handle form submission with validation and error handling
   * @param data - Validated form data
   * @internal
   */
  const onSubmit = useCallback(async (data: ContactForm) => {
    try {
      // Rate limiting check
      if (!checkRateLimit()) {
        throw new Error('Please wait 30 seconds between submissions');
      }

      setSubmissionState('submitting');
      setSubmissionMessage('');
      
      // Track form submission
      trackContactForm('submit');
      
      // Simulate API call - replace with actual endpoint
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate random success/failure for demo
          if (Math.random() > 0.1) { // 90% success rate
            resolve(data);
          } else {
            reject(new Error('Network error: Please try again'));
          }
        }, 2000);
      });

      // Success handling
      setSubmissionState('success');
      setSubmissionMessage('Thank you! Your message has been sent successfully.');
      setLastSubmissionTime(Date.now());
      
      // Track successful submission
      trackContactForm('success');
      
      // Reset form after success
      setTimeout(() => {
        reset();
        setSubmissionState('idle');
        setSubmissionMessage('');
      }, 3000);

      onSuccess?.(data);
      
    } catch (error) {
      // Error handling
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      
      setSubmissionState('error');
      setSubmissionMessage(errorMessage);
      
      // Track form error
      trackContactForm('error');
      
      // Reset error state after 5 seconds
      setTimeout(() => {
        setSubmissionState('idle');
        setSubmissionMessage('');
      }, 5000);

      onError?.(error instanceof Error ? error : new Error(errorMessage));
    }
  }, [checkRateLimit, onSuccess, onError, reset]);

  /**
   * Generate field classes based on validation state
   * @param fieldName - Name of the form field
   * @returns CSS classes for the field
   * @internal
   */
  const getFieldClasses = useCallback((fieldName: keyof ContactForm) => {
    const hasError = !!errors[fieldName];
    const isTouched = !!touchedFields[fieldName];
    
    return clsx(
      'contact-form__field',
      'w-full px-3 py-2 border rounded-md transition-colors duration-200',
      'bg-white dark:bg-gray-800',
      'text-gray-900 dark:text-gray-100',
      'placeholder-gray-500 dark:placeholder-gray-400',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      {
        // Default state
        'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500': !hasError && !isTouched,
        // Success state (touched and valid)
        'border-green-500 dark:border-green-400 focus:border-green-500 focus:ring-green-500': isTouched && !hasError,
        // Error state
        'border-red-500 dark:border-red-400 focus:border-red-500 focus:ring-red-500': hasError,
      }
    );
  }, [errors, touchedFields]);

  /**
   * Generate label classes based on field state
   * @param fieldName - Name of the form field
   * @returns CSS classes for the label
   * @internal
   */
  const getLabelClasses = useCallback((fieldName: keyof ContactForm) => {
    const hasError = !!errors[fieldName];
    
    return clsx(
      'contact-form__label',
      'block text-sm font-medium mb-1 transition-colors duration-200',
      {
        'text-gray-700 dark:text-gray-300': !hasError,
        'text-red-600 dark:text-red-400': hasError,
      }
    );
  }, [errors]);

  // Form container classes
  const formClasses = clsx(
    'contact-form',
    'max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg',
    'border border-gray-200 dark:border-gray-700',
    className
  );

  // Submit button classes based on state
  const submitButtonClasses = clsx(
    'contact-form__submit',
    'w-full py-2 px-4 rounded-md font-medium transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    {
      'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500': 
        submissionState === 'idle' && isValid,
      'bg-gray-400 text-gray-700 cursor-not-allowed': 
        submissionState === 'idle' && !isValid,
      'bg-blue-500 text-white': 
        submissionState === 'submitting',
      'bg-green-600 text-white': 
        submissionState === 'success',
      'bg-red-600 text-white': 
        submissionState === 'error',
    }
  );

  return (
    <form 
      className={formClasses}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-labelledby={showTitle ? 'contact-form-title' : undefined}
    >
      {/* Form Title */}
      {showTitle && (
        <h2 
          id="contact-form-title"
          className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center"
        >
          {title}
        </h2>
      )}

      {/* Name Field */}
      <div className="contact-form__field-group mb-4">
        <label 
          htmlFor="contact-name"
          className={getLabelClasses('name')}
        >
          Full Name *
        </label>
        <input
          id="contact-name"
          type="text"
          className={getFieldClasses('name')}
          placeholder="Enter your full name"
          disabled={isSubmitting}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
          {...register('name')}
        />
        {errors.name && (
          <p 
            id="name-error"
            className="contact-form__error mt-1 text-sm text-red-600 dark:text-red-400"
            role="alert"
          >
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div className="contact-form__field-group mb-4">
        <label 
          htmlFor="contact-email"
          className={getLabelClasses('email')}
        >
          Email Address *
        </label>
        <input
          id="contact-email"
          type="email"
          className={getFieldClasses('email')}
          placeholder="Enter your email address"
          disabled={isSubmitting}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          {...register('email')}
        />
        {errors.email && (
          <p 
            id="email-error"
            className="contact-form__error mt-1 text-sm text-red-600 dark:text-red-400"
            role="alert"
          >
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Subject Field */}
      <div className="contact-form__field-group mb-4">
        <label 
          htmlFor="contact-subject"
          className={getLabelClasses('subject')}
        >
          Subject *
        </label>
        <input
          id="contact-subject"
          type="text"
          className={getFieldClasses('subject')}
          placeholder="What is this about?"
          disabled={isSubmitting}
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? 'subject-error' : undefined}
          {...register('subject')}
        />
        {errors.subject && (
          <p 
            id="subject-error"
            className="contact-form__error mt-1 text-sm text-red-600 dark:text-red-400"
            role="alert"
          >
            {errors.subject.message}
          </p>
        )}
      </div>

      {/* Message Field */}
      <div className="contact-form__field-group mb-6">
        <label 
          htmlFor="contact-message"
          className={getLabelClasses('message')}
        >
          Message *
        </label>
        <textarea
          id="contact-message"
          rows={4}
          className={clsx(getFieldClasses('message'), 'resize-vertical min-h-[100px]')}
          placeholder="Tell me about your project or inquiry..."
          disabled={isSubmitting}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : 'message-hint'}
          {...register('message')}
        />
        {errors.message ? (
          <p 
            id="message-error"
            className="contact-form__error mt-1 text-sm text-red-600 dark:text-red-400"
            role="alert"
          >
            {errors.message.message}
          </p>
        ) : (
          <p 
            id="message-hint"
            className="mt-1 text-xs text-gray-500 dark:text-gray-400"
          >
            Please provide as much detail as possible about your inquiry.
          </p>
        )}
      </div>

      {/* Submission Feedback */}
      {submissionMessage && (
        <div 
          className={clsx(
            'contact-form__feedback mb-4 p-3 rounded-md text-sm',
            {
              'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200': 
                submissionState === 'success',
              'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200': 
                submissionState === 'error',
            }
          )}
          role="status"
          aria-live="polite"
        >
          {submissionMessage}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className={submitButtonClasses}
        disabled={isSubmitting || !isFormDirty}
        aria-describedby="submit-button-description"
      >
        {submissionState === 'submitting' && (
          <span className="inline-flex items-center">
            <svg 
              className="animate-spin -ml-1 mr-2 h-4 w-4" 
              fill="none" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
              />
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Sending...
          </span>
        )}
        {submissionState === 'success' && '✓ Sent Successfully!'}
        {submissionState === 'error' && '✗ Failed to Send'}
        {submissionState === 'idle' && 'Send Message'}
      </button>

      {/* Submit Button Description for Screen Readers */}
      <p id="submit-button-description" className="sr-only">
        {isValid ? 'Click to send your message' : 'Please fill out all required fields before submitting'}
      </p>

      {/* Form Instructions */}
      <div className="contact-form__instructions mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
        <p>All fields marked with * are required.</p>
        <p>Your information will be kept private and secure.</p>
      </div>
    </form>
  );
}
