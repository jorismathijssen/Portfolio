/**
 * Portfolio Home Page Component
 * 
 * Main landing page for the portfolio application featuring a comprehensive
 * display of professional information, skills, and interactive terminal.
 * 
 * @since 1.0.0
 * @public
 */

"use client";

import Image from "next/image";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useTranslation, Trans } from "react-i18next";
import { clsx } from 'clsx';
import Terminal from "./components/Terminal";
import ErrorBoundary from "./components/ErrorBoundary";
import { TRACKING_CONFIGS } from './lib/tracking-utils';

/**
 * Social media link configuration
 * @interface SocialLink
 * @since 1.0.0
 * @internal
 */
interface SocialLink {
  /** Display name for accessibility */
  name: string;
  /** URL to the social media profile */
  href: string;
  /** React icon component */
  icon: React.ComponentType<{ className?: string }>;
  /** Unique identifier for testing */
  dataId: string;
  /** ARIA label for screen readers */
  ariaLabel: string;
}

/**
 * Homepage component props
 * @interface HomePageProps
 * @since 1.0.0
 * @public
 */
interface HomePageProps {
  /** Additional CSS classes for the page container */
  className?: string;
}

/**
 * Social media links configuration
 * @constant
 * @internal
 */
const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    name: 'GitHub',
    href: 'https://github.com/jorismathijssen',
    icon: FaGithub,
    dataId: 'githubLink',
    ariaLabel: 'Visit Joris Mathijssen GitHub profile',
  },
  {
    name: 'LinkedIn', 
    href: 'https://www.linkedin.com/in/jorismathijssen/',
    icon: FaLinkedin,
    dataId: 'linkedinLink',
    ariaLabel: 'Visit Joris Mathijssen LinkedIn profile',
  },
] as const;

/**
 * Profile image configuration
 * @constant
 * @internal
 */
const PROFILE_IMAGE = {
  src: '/profile_pic_300x300.webp',
  alt: 'Professional headshot of Joris Mathijssen, C# Software Developer at 9292',
  width: 150,
  height: 150,
  sizes: '(max-width: 768px) 150px, (max-width: 1200px) 150px, 150px',
} as const;

/**
 * Portfolio Home Page Component
 * 
 * Main landing page showcasing professional profile, skills, and experience
 * with an interactive terminal interface for enhanced user engagement.
 * 
 * @remarks
 * This component features:
 * - Responsive design with mobile-first approach
 * - Internationalization support with react-i18next
 * - Accessible markup with proper ARIA labels and semantic HTML
 * - SEO-optimized content structure
 * - Progressive enhancement with client-side hydration
 * - Error boundary protection for robust user experience
 * - Performance optimization with memoized components
 * 
 * The page follows accessibility best practices including:
 * - Skip navigation link for screen readers
 * - Proper heading hierarchy
 * - Descriptive alt text for images
 * - Focus management and keyboard navigation
 * - High contrast colors and readable typography
 * 
 * @example
 * ```tsx
 * // Basic usage (default export)
 * export default function Page() {
 *   return <Home />;
 * }
 * 
 * // With custom styling
 * <Home className="custom-homepage-styles" />
 * ```
 * 
 * @param props - Homepage component props
 * @returns Portfolio homepage component
 * 
 * @since 1.0.0
 * @public
 */
export default function Home({ className }: HomePageProps = {}): React.JSX.Element {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  /**
   * Handle client-side hydration to prevent SSR mismatches
   * @internal
   */
  useEffect(() => {
    setMounted(true);
  }, []);

  /**
   * Render social media link with proper accessibility
   * @param link - Social media link configuration
   * @returns Social media link component
   * @internal
   */
  const renderSocialLink = useCallback((link: SocialLink) => {
    const IconComponent = link.icon;
    
    return (
      <a
        key={link.name}
        href={link.href}
        data-id={link.dataId}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={link.ariaLabel}
        {...TRACKING_CONFIGS.social(link.name.toLowerCase(), 'header')}
        className={clsx(
          'social-link',
          'text-2xl text-gray-600 dark:text-gray-400',
          'hover:text-gray-800 dark:hover:text-gray-200',
          'transition-colors duration-200 ease-in-out',
          'focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2',
          'rounded-md p-1'
        )}
      >
        <IconComponent 
          className="w-6 h-6"
          aria-hidden="true"
        />
      </a>
    );
  }, []);

  /**
   * Memoized skills list rendering for performance
   * @internal
   */
  const skillsList = useMemo(() => {
    const skills = t("about.skills", { returnObjects: true }) as string[];
    
    return skills.map((skill, idx) => (
      <li 
        key={`skill-${idx}`}
        className="skill-item"
      >
        {skill}
      </li>
    ));
  }, [t]);

  /**
   * Memoized page container classes
   * @internal
   */
  const pageClasses = useMemo(() => clsx(
    'homepage',
    'min-h-screen p-8 pb-20 sm:p-20',
    'font-[family-name:var(--font-geist-sans)]',
    className
  ), [className]);

  /**
   * Memoized main content classes
   * @internal
   */
  const mainClasses = useMemo(() => clsx(
    'homepage__main',
    'max-w-3xl mx-auto'
  ), []);

  /**
   * Memoized header classes
   * @internal
   */
  const headerClasses = useMemo(() => clsx(
    'homepage__header',
    'mb-12 text-center'
  ), []);

  /**
   * Memoized profile image classes
   * @internal
   */
  const profileImageClasses = useMemo(() => clsx(
    'homepage__profile-image',
    'rounded-full mx-auto mb-4',
    'ring-4 ring-white dark:ring-gray-800 shadow-lg'
  ), []);

  /**
   * Memoized social links container classes
   * @internal
   */
  const socialLinksClasses = useMemo(() => clsx(
    'homepage__social-links',
    'flex justify-center mt-4 space-x-4'
  ), []);

  // Prevent hydration mismatches by not rendering until mounted
  if (!mounted) {
    return (
      <div className={pageClasses}>
        <div className="flex items-center justify-center min-h-screen">
          <div 
            className="animate-pulse text-gray-500 dark:text-gray-400"
            role="status"
            aria-label="Loading portfolio content"
          >
            Loading...
          </div>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary
      level="page"
      onError={(error, errorInfo, errorId) => {
        console.error('Homepage error:', { error, errorInfo, errorId });
      }}
    >
      <div className={pageClasses}>
        {/* Skip Navigation Link for Accessibility */}
        <a
          href="#main-content"
          className={clsx(
            'skip-link',
            'sr-only focus:not-sr-only focus:absolute focus:z-10',
            'focus:p-4 focus:bg-white focus:text-black',
            'focus:top-4 focus:left-4 focus:rounded-md',
            'focus:ring-2 focus:ring-blue-400'
          )}
        >
          Skip to main content
        </a>

        <main 
          id="main-content" 
          className={mainClasses}
          tabIndex={-1}
          role="main"
        >
          {/* Profile Header Section */}
          <header className={headerClasses} role="banner">
            <Image
              src={PROFILE_IMAGE.src}
              alt={PROFILE_IMAGE.alt}
              width={PROFILE_IMAGE.width}
              height={PROFILE_IMAGE.height}
              className={profileImageClasses}
              priority
              sizes={PROFILE_IMAGE.sizes}
              loading="eager"
            />
            
            <h1 className={clsx(
              'homepage__title',
              'text-4xl font-bold mb-2',
              'text-gray-900 dark:text-gray-100'
            )}>
              {t("header.title")}
            </h1>
            
            <p className={clsx(
              'homepage__role',
              'text-2xl text-gray-600 dark:text-gray-400',
              'mb-4'
            )}>
              <Trans
                i18nKey="header.role"
                components={{
                  1: (
                    <a
                      href="https://9292.nl"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="9292 mobiliteitsplatform (opens in new tab)"
                      className={clsx(
                        'company-link',
                        'underline text-blue-700 hover:text-blue-900',
                        'dark:text-blue-400 dark:hover:text-blue-300',
                        'focus:outline-none focus:ring-2 focus:ring-blue-400',
                        'transition-colors duration-200'
                      )}
                    />
                  ),
                }}
              />
            </p>
            
            <nav 
              className={socialLinksClasses}
              aria-label="Social media links"
            >
              {SOCIAL_LINKS.map(renderSocialLink)}
            </nav>
          </header>

          {/* About Section */}
          <section 
            className={clsx(
              'homepage__about',
              'mb-12'
            )}
            aria-labelledby="about-heading"
          >
            <h2 
              id="about-heading" 
              className={clsx(
                'about__heading',
                'text-2xl font-semibold mb-4',
                'text-gray-900 dark:text-gray-100'
              )}
            >
              {t("about.heading")}
            </h2>
            
            <div className="about__content space-y-4">
              <p className={clsx(
                'about__intro',
                'text-lg text-gray-800 dark:text-gray-200',
                'leading-relaxed'
              )}>
                {t("about.intro")}
              </p>
              
              <p className={clsx(
                'about__experience',
                'text-lg text-gray-800 dark:text-gray-200',
                'leading-relaxed'
              )}>
                {t("about.exp")}
              </p>
              
              <p className={clsx(
                'about__certification',
                'text-lg text-gray-800 dark:text-gray-200',
                'leading-relaxed'
              )}>
                <Trans
                  i18nKey="about.scrum"
                  components={{
                    1: (
                      <a
                        href="https://www.scrum.org/professional-scrum-certifications/professional-scrum-master-assessments"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Professional Scrum Master certification (opens in new tab)"
                        className={clsx(
                          'certification-link',
                          'underline text-blue-700 hover:text-blue-900',
                          'dark:text-blue-400 dark:hover:text-blue-300',
                          'focus:outline-none focus:ring-2 focus:ring-blue-400',
                          'transition-colors duration-200'
                        )}
                      />
                    ),
                  }}
                />
              </p>
              
              <div className="about__skills">
                <h3 className="sr-only">Technical Skills</h3>
                <ul className={clsx(
                  'skills-list',
                  'list-disc pl-8 space-y-1',
                  'text-base text-gray-800 dark:text-gray-200'
                )}>
                  {skillsList}
                </ul>
              </div>
            </div>
          </section>
        </main>
        
        {/* Interactive Terminal Section */}
        <ErrorBoundary
          level="section"
          onError={(error, errorInfo, errorId) => {
            console.warn('Terminal component error:', { error, errorInfo, errorId });
          }}
          fallback={
            <div className="terminal-error-fallback p-8 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                Terminal component is temporarily unavailable.
              </p>
            </div>
          }
        >
          <Terminal />
        </ErrorBoundary>
      </div>
    </ErrorBoundary>
  );
}
