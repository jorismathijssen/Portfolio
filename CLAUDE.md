# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for Joris Mathijssen, a C# Software Developer at 9292. The project is built with Next.js 15 and features a unique terminal-themed interface with internationalization support.

## Development Commands

### Core Commands
- `npm run dev` - Start development server on http://localhost:3000
- `npm run build` - Build the application for production
- `npm run start` - Start production server using standalone output
- `npm run lint` - Run ESLint to check code quality

### Production Commands
- `npm run build:prod` - Build and prepare standalone deployment
- `npm run start:prod` - Start production server from standalone build
- `npm run analyze` - Build with bundle analyzer enabled

### Testing
- `npm run test` - Currently returns placeholder (no tests configured)

## Architecture Overview

### Technology Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS with dark mode support
- **Internationalization**: i18next with Dutch (nl) as default, English (en) as fallback
- **Animations**: Framer Motion
- **State**: React context for themes and i18n
- **Deployment**: Standalone output configured for containerization

### Project Structure
- `app/` - Next.js App Router pages and layouts
  - `components/` - Reusable React components
  - `components/Terminal/` - Terminal-themed UI components
  - `layout.tsx` - Root layout with metadata and fonts
  - `page.tsx` - Homepage implementation
  - `globals.css` - Global styles and CSS variables
- `lib/` - Utility libraries and configurations
  - `i18n.ts` - Internationalization setup
- `public/` - Static assets
  - `locales/en/` & `locales/nl/` - Translation files
  - `fonts/` - Custom fonts (Geist Sans & Mono)

### Key Features
- **Terminal Interface**: Unique terminal-themed design with interactive commands
- **Internationalization**: Support for English and Dutch with browser detection
- **Theme System**: Dark/light mode with `next-themes`
- **Security**: Comprehensive security headers in production
- **Performance**: Bundle analysis, compression, and optimized builds

### Component Architecture
- Uses compound component patterns for complex UI (Terminal, Modal)
- Consistent use of TypeScript interfaces for props
- Custom hooks for state management
- Context providers for global state (theme, language)

### Styling Conventions
- Tailwind CSS with custom CSS variables for theming
- Class-based dark mode implementation
- Consistent spacing and typography scales
- Mobile-first responsive design

### Internationalization
- Dutch as primary/default language (main language: 'nl')
- English as fallback language (fallback: 'en')
- Translation keys organized in JSON files
- Browser language detection enabled
- React Suspense disabled for SSR compatibility

## Development Notes

### Environment Configuration
- Uses `.env.local` for environment variables
- Configured for standalone deployment
- Docker support with multi-stage builds
- Husky pre-commit hooks with lint-staged

### Build Configuration
- Standalone output for containerized deployments
- Bundle analyzer integration
- Production security headers
- Experimental scroll restoration enabled
- TypeScript path aliases configured (@/*)

### Git Workflow
- Main branch deployment via GitHub Actions
- Pre-commit linting with lint-staged
- Automated deployment to VPS

## Code Style Guidelines

### TypeScript
- Strict mode enabled
- ES2017 target
- Explicit return types for functions
- Interface definitions for component props

### React Patterns
- Functional components with hooks
- Context for global state
- Custom hooks for reusable logic
- Proper key props for list items

### File Naming
- PascalCase for components (ProjectCard.tsx)
- camelCase for utilities (i18n.ts)
- lowercase for config files (next.config.mjs)

### Import Organization
- External libraries first
- Internal modules second
- Relative imports last
- Type-only imports when applicable