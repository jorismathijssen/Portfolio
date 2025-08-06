/**
 * Zod validation schemas for runtime type checking
 * 
 * Features:
 * - Runtime type validation with detailed error messages
 * - Schema composition and reusability  
 * - Type inference for TypeScript integration
 * - Data transformation and sanitization
 * - Custom validation rules and error messages
 * 
 * Architecture:
 * - Base schemas for primitive types
 * - Complex schemas for application entities
 * - Composable schemas for different use cases
 * - Error handling with user-friendly messages
 * 
 * @see https://zod.dev/ - Zod documentation
 */

import { z } from 'zod';

/**
 * Base validation schemas for common types
 */
export const BaseSchemas = {
  /** Non-empty string validation */
  nonEmptyString: z.string().min(1, 'This field is required'),
  
  /** URL validation */
  url: z.string().url('Please enter a valid URL'),
  
  /** Email validation */
  email: z.string().email('Please enter a valid email address'),
  
  /** Positive integer validation */
  positiveInt: z.number().int().positive('Must be a positive integer'),
  
  /** Date validation */
  date: z.date().or(z.string().datetime().transform(str => new Date(str))),
  
  /** UUID validation */
  uuid: z.string().uuid('Must be a valid UUID'),
  
  /** Slug validation (for URLs, filenames) */
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Must contain only lowercase letters, numbers, and hyphens'),
} as const;

/**
 * Project status validation
 */
export const ProjectStatusSchema = z.enum(['active', 'completed', 'archived', 'maintenance'], {
  message: 'Status must be active, completed, archived, or maintenance',
});

/**
 * Project category validation  
 */
export const ProjectCategorySchema = z.enum(['web', 'api', 'mobile', 'desktop', 'library', 'tool'], {
  message: 'Category must be web, api, mobile, desktop, library, or tool',
});

/**
 * Technology/skill validation
 */
export const TechnologySchema = z.string().min(1).max(50, 'Technology name must be 50 characters or less');

/**
 * Basic project validation schema
 */
export const ProjectSchema = z.object({
  id: BaseSchemas.nonEmptyString,
  title: z.string().min(1, 'Project title is required').max(100, 'Title must be 100 characters or less'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(500, 'Description must be 500 characters or less'),
  technologies: z.array(TechnologySchema).min(1, 'At least one technology is required').max(20, 'Too many technologies listed'),
  link: BaseSchemas.url,
  image: BaseSchemas.url.optional(),
  repository: BaseSchemas.url.optional(),
  completedAt: BaseSchemas.date.optional(),
});

/**
 * Enhanced project validation schema with additional fields
 */
export const EnhancedProjectSchema = ProjectSchema.extend({
  status: ProjectStatusSchema,
  category: ProjectCategorySchema,
  featured: z.boolean().default(false),
  startDate: BaseSchemas.date.optional(),
  tags: z.array(z.string()).max(10, 'Too many tags').default([]),
  teamSize: BaseSchemas.positiveInt.max(100, 'Team size seems unrealistic').optional(),
  duration: BaseSchemas.positiveInt.max(120, 'Duration must be 120 months or less').optional(),
  metrics: z.object({
    linesOfCode: BaseSchemas.positiveInt.optional(),
    performanceGain: z.number().min(0).max(1000, 'Performance gain percentage seems unrealistic').optional(),
    usage: z.string().max(200, 'Usage description must be 200 characters or less').optional(),
  }).optional(),
});

/**
 * Timeline item validation schema
 */
export const TimelineItemSchema = z.object({
  id: BaseSchemas.nonEmptyString,
  year: z.string().regex(/^\d{4}$/, 'Year must be a 4-digit number'),
  title: z.string().min(1, 'Title is required').max(100, 'Title must be 100 characters or less'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(500, 'Description must be 500 characters or less'),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

/**
 * Enhanced timeline item validation schema
 */
export const EnhancedTimelineItemSchema = TimelineItemSchema.extend({
  status: z.enum(['completed', 'in-progress', 'planned', 'cancelled']),
  company: z.string().max(100, 'Company name must be 100 characters or less').optional(),
  location: z.string().max(100, 'Location must be 100 characters or less').optional(),
  skills: z.array(TechnologySchema).max(20, 'Too many skills listed').default([]),
  achievements: z.array(z.string().max(200, 'Achievement must be 200 characters or less')).max(10, 'Too many achievements').default([]),
  startDate: BaseSchemas.date.optional(),
  endDate: BaseSchemas.date.nullable().optional(),
  icon: z.string().max(10, 'Icon must be 10 characters or less').optional(),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Color must be a valid hex color').optional(),
});

/**
 * Skill validation schema
 */
export const SkillSchema = z.object({
  name: z.string().min(1, 'Skill name is required').max(50, 'Skill name must be 50 characters or less'),
  category: z.enum(['frontend', 'backend', 'database', 'devops', 'tool', 'language']),
  level: z.enum(['beginner', 'intermediate', 'advanced', 'expert']),
  experience: BaseSchemas.positiveInt.max(50, 'Experience must be 50 years or less').optional(),
  lastUsed: BaseSchemas.date.optional(),
  description: z.string().max(300, 'Description must be 300 characters or less').optional(),
  projects: z.array(BaseSchemas.nonEmptyString).max(20, 'Too many related projects').default([]),
});

/**
 * Form validation schemas for user input
 */
export const FormSchemas = {
  /** Contact form validation */
  contact: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be 100 characters or less'),
    email: BaseSchemas.email,
    subject: z.string().min(5, 'Subject must be at least 5 characters').max(100, 'Subject must be 100 characters or less'),
    message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message must be 1000 characters or less'),
  }),
  
  /** Newsletter subscription validation */
  newsletter: z.object({
    email: BaseSchemas.email,
    preferences: z.array(z.string()).default([]),
  }),
  
  /** Preferences validation */
  preferences: z.object({
    theme: z.enum(['light', 'dark', 'system']).default('system'),
    language: z.enum(['en', 'nl']).default('en'),
    notifications: z.boolean().default(true),
    analytics: z.boolean().default(false),
  }),
} as const;

/**
 * API response validation schemas
 */
export const ApiSchemas = {
  /** Generic success response */
  success: z.object({
    success: z.literal(true),
    data: z.unknown(),
    message: z.string().optional(),
  }),
  
  /** Generic error response */
  error: z.object({
    success: z.literal(false),
    error: z.string(),
    code: z.number(),
    details: z.unknown().optional(),
  }),
  
  /** Paginated response */
  paginated: z.object({
    data: z.array(z.unknown()),
    pagination: z.object({
      page: BaseSchemas.positiveInt,
      limit: BaseSchemas.positiveInt,
      total: z.number().nonnegative(),
      hasNext: z.boolean(),
      hasPrev: z.boolean(),
    }),
  }),
} as const;

/**
 * Environment variables validation
 */
export const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  NEXT_PUBLIC_SITE_URL: BaseSchemas.url.optional(),
  NEXT_PUBLIC_GA_ID: z.string().optional(),
  NEXT_PUBLIC_PLAUSIBLE_DOMAIN: z.string().optional(),
});

/**
 * Helper functions for common validation patterns
 */
export const ValidationHelpers = {
  /**
   * Validate and parse data with error handling
   */
  safeValidate: <T>(schema: z.ZodSchema<T>, data: unknown) => {
    try {
      return { success: true as const, data: schema.parse(data) };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return { 
          success: false as const, 
          error: error.issues.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')
        };
      }
      return { success: false as const, error: 'Validation failed' };
    }
  },
  
  /**
   * Create a validation function for a specific schema
   */
  createValidator: <T>(schema: z.ZodSchema<T>) => {
    return (data: unknown) => ValidationHelpers.safeValidate(schema, data);
  },
  
  /**
   * Transform schema errors to user-friendly messages
   */
  formatErrors: (error: z.ZodError) => {
    return error.issues.reduce((acc: Record<string, string>, err: z.ZodIssue) => {
      const path = err.path.join('.');
      acc[path] = err.message;
      return acc;
    }, {} as Record<string, string>);
  },
} as const;

/**
 * Type exports for TypeScript integration
 */
export type Project = z.infer<typeof ProjectSchema>;
export type EnhancedProject = z.infer<typeof EnhancedProjectSchema>;
export type TimelineItem = z.infer<typeof TimelineItemSchema>;
export type EnhancedTimelineItem = z.infer<typeof EnhancedTimelineItemSchema>;
export type Skill = z.infer<typeof SkillSchema>;
export type ContactForm = z.infer<typeof FormSchemas.contact>;
export type NewsletterForm = z.infer<typeof FormSchemas.newsletter>;
export type UserPreferences = z.infer<typeof FormSchemas.preferences>;
export type ApiSuccessResponse<T = unknown> = z.infer<typeof ApiSchemas.success> & { data: T };
export type ApiErrorResponse = z.infer<typeof ApiSchemas.error>;
export type PaginatedResponse<T = unknown> = z.infer<typeof ApiSchemas.paginated> & { data: T[] };
