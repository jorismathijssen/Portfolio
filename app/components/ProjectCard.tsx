import React, { useMemo } from 'react';
import clsx from 'clsx';
import type { Project } from '../types';
import { trackProjectInteraction } from '../lib/analytics';
import { TRACKING_CONFIGS } from '@/app/lib/tracking-utils';

export interface ProjectCardProps extends Project {
  onClick?: (project: Project) => void;
  elevated?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  'data-testid'?: string;
}

/**
 * Responsive card component for displaying project information
 */
export default function ProjectCard({ 
  id,
  title, 
  description, 
  technologies, 
  link,
  className,
  onClick,
  elevated = false,
  size = 'md',
  'data-testid': testId = 'project-card',
}: ProjectCardProps): React.JSX.Element {
  // Memoized class names for performance using clsx
  const cardClasses = useMemo(() => clsx(
    // Base card styles
    'card card--interactive',
    'transition-shadow duration-200',
    
    // Size variants
    {
      'p-4': size === 'sm',
      'p-6': size === 'md', 
      'p-8': size === 'lg',
    },
    
    // Elevation variant
    {
      'card--elevated': elevated,
    },
    
    // Custom className
    className
  ), [size, elevated, className]);

  // Memoized ARIA label for the external link
  const linkAriaLabel = useMemo(() => 
    `View ${title} project (opens in a new tab)`,
    [title]
  );

  // Handle card click if onClick provided
  const handleCardClick = useMemo(() => {
    if (!onClick) return undefined;
    
    return () => {
      // Track project interaction with improved categorization
      trackProjectInteraction('view', title, 'card');
      
      onClick({
        id,
        title,
        description,
        technologies,
        link,
      });
    };
  }, [onClick, id, title, description, technologies, link]);

  return (
    <article 
      className={cardClasses}
      onClick={handleCardClick}
      data-testid={testId}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick?.();
        }
      } : undefined}
    >
      <header className="mb-4">
        <h3 className="text-xl font-medium mb-2 text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          {description}
        </p>
      </header>
      
      <div className="mb-4">
        <h4 className="sr-only">Technologies used:</h4>
        <ul 
          className="flex flex-wrap gap-2" 
          aria-label="Technologies used in this project"
        >
          {technologies.map((tech, index) => (
            <li 
              key={`${tech}-${index}`}
              className="bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-150"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
      
      <footer>
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer" 
          {...TRACKING_CONFIGS.project('click', title, 'card')}
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-150 font-medium"
          aria-label={linkAriaLabel}
        >
          View Project
          <svg 
            className="ml-1 h-4 w-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
            />
          </svg>
        </a>
      </footer>
    </article>
  );
}
