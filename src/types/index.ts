/**
 * Common types used across the application
 */

/**
 * Theme options
 */
export type Theme = 'light' | 'dark' | 'system';

/**
 * Language options
 */
export type Language = 'en' | 'nl';

/**
 * Component size variants
 */
export type Size = 'sm' | 'md' | 'lg';

/**
 * Button variants
 */
export type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'ghost' | 'outline';

/**
 * API status codes enum
 */
export enum ApiStatus {
  SUCCESS = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

/**
 * Generic API response type
 */
export type ApiResponse<T = unknown> = 
  | { success: true; data: T; message?: string }
  | { success: false; error: string; code: ApiStatus; details?: unknown };

/**
 * Result pattern for error handling
 */
export type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E };

/**
 * Async function with error handling
 */
export type AsyncFunction<TArgs extends unknown[], TReturn> = (
  ...args: TArgs
) => Promise<Result<TReturn, Error>>;

/**
 * Base component props that most components should extend
 */
export interface BaseComponentProps {
  /** Optional custom class name */
  className?: string;
  /** Component children */
  children?: React.ReactNode;
  /** Component test ID for testing */
  'data-testid'?: string;
}

/**
 * Accessible component props
 */
export interface AccessibleProps {
  /** ARIA label for screen readers */
  'aria-label'?: string;
  /** ARIA described by */
  'aria-describedby'?: string;
  /** ARIA labelled by */
  'aria-labelledby'?: string;
}

/**
 * Interactive component props
 */
export interface InteractiveProps {
  /** Whether the component is disabled */
  disabled?: boolean;
  /** Whether the component is in loading state */
  loading?: boolean;
  /** Tab index for keyboard navigation */
  tabIndex?: number;
}

/**
 * Project data structure
 */
export interface Project {
  /** Unique project identifier */
  id: string;
  /** Project title */
  title: string;
  /** Project description */
  description: string;
  /** Array of technologies used */
  technologies: string[];
  /** Project link URL */
  link: string;
  /** Optional project image URL */
  image?: string;
  /** Optional GitHub repository URL */
  repository?: string;
  /** Project completion date */
  completedAt?: Date;
}

/**
 * Timeline item structure
 */
export interface TimelineItem {
  /** Unique item identifier */
  id: string;
  /** Year or date of the event */
  year: string;
  /** Title of the event */
  title: string;
  /** Description of the event */
  description: string;
  /** Optional additional metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Modal configuration
 */
export interface ModalConfig {
  /** Modal size */
  size?: Size;
  /** Whether modal can be closed by clicking backdrop */
  closeOnBackdrop?: boolean;
  /** Whether modal can be closed by pressing escape */
  closeOnEscape?: boolean;
  /** Whether to show close button */
  showCloseButton?: boolean;
}

/**
 * Terminal command structure
 */
export interface TerminalCommand {
  /** Command name */
  name: string;
  /** Command description */
  description: string;
  /** Command handler function */
  handler: (args: string[]) => string | Promise<string>;
  /** Command usage example */
  usage?: string;
}

/**
 * Animation configuration
 */
export interface AnimationConfig {
  /** Animation duration in seconds */
  duration?: number;
  /** Animation delay in seconds */
  delay?: number;
  /** Animation easing function */
  ease?: string;
  /** Whether animation should run once */
  once?: boolean;
}

/**
 * Error boundary state
 */
export interface ErrorInfo {
  /** Error message */
  message: string;
  /** Error stack trace */
  stack?: string;
  /** Component stack trace */
  componentStack?: string;
  /** Error boundary ID */
  errorBoundaryId?: string;
}

/**
 * Timeline Status Types
 */
export type TimelineStatus = 'completed' | 'in-progress' | 'planned' | 'cancelled';

/**
 * Project Status Types  
 */
export type ProjectStatus = 'active' | 'completed' | 'archived' | 'maintenance';

/**
 * Project Category Types
 */
export type ProjectCategory = 'web' | 'api' | 'mobile' | 'desktop' | 'library' | 'tool';

/**
 * Enhanced Timeline Item with additional properties
 */
export interface EnhancedTimelineItem extends TimelineItem {
  /** Timeline item status */
  status: TimelineStatus;
  /** Optional company or organization */
  company?: string;
  /** Optional location */
  location?: string;
  /** Skills or technologies involved */
  skills?: string[];
  /** Achievements or highlights */
  achievements?: string[];
  /** Start date */
  startDate?: Date;
  /** End date (null if ongoing) */
  endDate?: Date | null;
  /** Optional icon or emoji */
  icon?: string;
  /** Optional color theme */
  color?: string;
}

/**
 * Enhanced Project with comprehensive metadata
 */
export interface EnhancedProject extends Project {
  /** Project status */
  status: ProjectStatus;
  /** Project category */
  category: ProjectCategory;
  /** Featured flag for highlighting */
  featured?: boolean;
  /** Project start date */
  startDate?: Date;
  /** Project tags for filtering */
  tags?: string[];
  /** Team size */
  teamSize?: number;
  /** Project duration in months */
  duration?: number;
  /** Performance metrics */
  metrics?: {
    /** Lines of code */
    linesOfCode?: number;
    /** Performance improvement percentage */
    performanceGain?: number;
    /** User adoption or usage statistics */
    usage?: string;
  };
}

/**
 * Skills and competencies structure
 */
export interface Skill {
  /** Skill name */
  name: string;
  /** Skill category */
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'tool' | 'language';
  /** Proficiency level */
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  /** Years of experience */
  experience?: number;
  /** Last used date */
  lastUsed?: Date;
  /** Optional skill description */
  description?: string;
  /** Related projects */
  projects?: string[];
}

/**
 * Portfolio configuration
 */
export interface PortfolioConfig {
  /** Personal information */
  personal: {
    name: string;
    title: string;
    email: string;
    location: string;
    bio: string;
    profileImage?: string;
  };
  /** Social media links */
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  /** SEO configuration */
  seo: {
    title: string;
    description: string;
    keywords: string[];
    image?: string;
  };
  /** Analytics configuration */
  analytics?: {
    googleAnalyticsId?: string;
    plausibleDomain?: string;
  };
}
