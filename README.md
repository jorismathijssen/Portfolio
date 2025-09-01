# Portfolio

[![Deploy Portfolio to VPS](https://github.com/jorismathijssen/Portfolio/actions/workflows/VPS_DEPLOY_ACTION.yml/badge.svg?branch=main)](https://github.com/jorismathijssen/Portfolio/actions/workflows/VPS_DEPLOY_ACTION.yml)

A modern, interactive portfolio website built with Next.js 15 and React 19. This project showcases professional experience, technical skills, and projects through an accessible, multi-language web application with advanced interactive features.

## Live Demo

Visit the live portfolio at: [https://jorismathijssen.nl](https://jorismathijssen.nl)

## Overview

This portfolio represents a comprehensive showcase for Joris Mathijssen, a C# Software Developer at 9292. The application demonstrates modern web development practices with a unique terminal-themed interface, internationalization support, and interactive user experiences while maintaining professional presentation standards.

## Key Features

### User Interface
- **Responsive Design** - Fully optimized for desktop, tablet, and mobile devices
- **Theme System** - Dark and light mode with automatic system preference detection and persistence
- **Smooth Animations** - Framer Motion integration for enhanced user experience
- **Accessibility Compliance** - WCAG AA standards with keyboard navigation and screen reader support

### Internationalization
- **Multi-language Support** - Complete Dutch (NL) and English (EN) translations
- **Automatic Language Detection** - Browser language preference detection with manual override
- **Dynamic Content Loading** - Real-time content switching without page reload

### Interactive Terminal Component
- **Command System** - 17 interactive commands including help, about, skills, and entertainment commands
- **Visual Effects** - Matrix rain animation, confetti particles, screen shake, color inversion, and rainbow effects
- **Theme Integration** - Terminal commands can control application theme (dark/light mode)
- **Accessibility Features** - Full keyboard navigation with proper ARIA labels and focus management

### Content Sections
- **Professional Timeline** - Interactive career progression with detailed role descriptions
- **Skills Overview** - Comprehensive technical competencies with categorization
- **Project Showcase** - Featured projects with technology stacks and descriptions
- **Contact Information** - Professional networking and contact details

### Performance & Privacy
- **GDPR Compliance** - Cookie consent management with user preferences
- **SEO Optimization** - Meta tags, structured data, and search engine optimization
- **Performance Optimization** - Code splitting, image optimization, and caching strategies

## Technical Architecture

### Core Framework
- **Next.js 15** - React framework with App Router architecture for server-side rendering and static generation
- **React 19** - Latest React version with concurrent features and improved performance
- **TypeScript 5** - Complete type safety across the entire application codebase with strict mode
- **Tailwind CSS 4** - Utility-first CSS framework for consistent, responsive styling

### Animation & Interaction
- **Framer Motion 12** - Advanced animation library for smooth transitions and interactive elements
- **Custom Effects System** - Matrix rain, confetti particles, screen shake, and color manipulation effects
- **Interactive Terminal** - Command-line interface simulation with 17 unique commands

### Internationalization Framework
- **i18next** - Comprehensive internationalization framework with namespace support
- **react-i18next** - React bindings with hooks and components for seamless integration
- **i18next-browser-languagedetector** - Automatic browser language detection
- **i18next-http-backend** - Dynamic translation loading

### Development Tooling
- **TypeScript** - Full type safety with strict mode enabled
- **ESLint** - Code quality enforcement with Next.js configuration
- **Jest** - Testing framework with coverage reporting
- **Husky** - Git hooks for pre-commit code quality checks
- **lint-staged** - Staged file linting for optimized CI/CD performance
- **Bundle Analyzer** - Webpack bundle analysis for performance optimization

### Deployment Infrastructure
- **Docker** - Containerized application with multi-stage builds
- **nginx-proxy** - Reverse proxy with automatic SSL certificate management
- **Let's Encrypt** - Automated SSL certificate provisioning and renewal
- **GitHub Actions** - Continuous integration and deployment pipeline
- **VPS Hosting** - Self-hosted deployment on virtual private server

## Installation & Development

### Prerequisites
- Node.js 18.17 or later
- npm or yarn package manager
- Docker (for containerized deployment)

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/jorismathijssen/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

   The application will be available at [http://localhost:3000](http://localhost:3000)

### Available Development Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create production build |
| `npm run start` | Start production server from standalone build |
| `npm run lint` | Run ESLint code quality checks |
| `npm run analyze` | Generate bundle size analysis |
| `npm test` | Run Jest test suite |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Generate test coverage report |
| `npm run build:prod` | Build with standalone output for Docker |
| `npm run start:prod` | Start standalone production server |
## Docker Deployment

### Local Docker Development

```bash
# Build Docker image
docker build -t portfolio .

# Run container locally
docker run -p 3000:3000 portfolio
```

### Production Deployment

The project includes a complete Docker Compose configuration for production deployment:

**Features:**
- nginx-proxy for automatic reverse proxy configuration
- Let's Encrypt companion for SSL certificate management
- Persistent volume storage for certificates
- Environment-based configuration management

```bash
# Deploy to production
docker compose up -d

# View logs
docker compose logs -f

# Update deployment
docker compose pull && docker compose up -d
```

**Docker Compose Services:**
- **portfolio-app** - Main Next.js application container
- **nginx-proxy** - Automatic reverse proxy with SSL termination
- **nginx-proxy-acme** - Let's Encrypt certificate management

## Interactive Terminal Commands

The portfolio features a fully functional terminal interface with the following commands:

### Information Commands
- `help` - Display all available commands
- `about` - Personal and professional information
- `skills` - Technical skills and competencies

### Theme & UI Commands
- `dark` - Switch to dark theme
- `light` - Switch to light theme
- `invert` - Toggle color inversion effect
- `rainbow` - Activate rainbow text effect

### Visual Effects
- `matrix` - Start Matrix rain animation
- `party` - Launch confetti celebration
- `shake` - Activate screen shake effect

### Entertainment Commands
- `joke` - Display programming humor
- `ascii` - Show ASCII art
- `hack` - Simulate hacking sequence
- `rick` - Rick roll Easter egg
- `sl` - Steam locomotive animation
- `cat` - Virtual cat companion

### Utility Commands
- `clear` - Clear terminal and reset effects

### Terminal Features
- **Keyboard Navigation** - Full support for arrow keys, tab, and enter
- **Command History** - Navigate previous commands with up/down arrows
- **Auto-completion** - Tab completion for command suggestions
- **Accessibility** - Screen reader support with proper ARIA labels
- **Mobile Support** - Touch-friendly interface for mobile devices

## Internationalization System

### Supported Languages
- **Dutch (nl)** - Primary/default language
- **English (en)** - Fallback language for international audience

### Translation Management
```
public/locales/
├── en/
│   └── translation.json
└── nl/
    └── translation.json
```

### Features
- **Automatic Detection** - Browser language preference detection
- **Manual Override** - Language switcher component for user control
- **Namespace Support** - Organized translations by feature/component
- **Dynamic Loading** - Translations loaded on demand for performance
- **Fallback System** - English fallback for missing translations
- **SSR Compatibility** - React Suspense disabled for server-side rendering

### Adding New Languages
1. Create new locale directory in `public/locales/`
2. Copy `translation.json` from existing language
3. Translate all keys to target language
4. Update language switcher component configuration

## Performance Optimization

### Build Optimization
- **Next.js Standalone** - Minimal production builds with only required dependencies
- **Automatic Code Splitting** - Route-based and component-based code splitting
- **Tree Shaking** - Unused code elimination during build process
- **Bundle Analysis** - Built-in bundle analyzer for size optimization

### Image Optimization
- **WebP Format** - Modern image format with superior compression
- **Responsive Images** - Automatic sizing based on device capabilities
- **Lazy Loading** - Images load only when entering viewport
- **Local Assets** - Optimized local image serving

### Caching Strategy
- **Static Asset Caching** - Long-term caching for unchanging assets
- **Dynamic Content Caching** - Appropriate cache headers for dynamic content
- **Service Worker** - Browser-level caching for offline capability

### Monitoring & Analytics
- **Core Web Vitals** - Performance monitoring for user experience
- **Bundle Size Tracking** - Continuous monitoring of application size
- **Lighthouse Integration** - Automated performance auditing

## Accessibility Implementation

### Standards Compliance
- **WCAG AA Compliance** - Web Content Accessibility Guidelines Level AA conformance
- **Section 508** - US Federal accessibility requirements compliance
- **ARIA Integration** - Comprehensive ARIA labels and roles throughout the application

### Keyboard Navigation
- **Tab Order** - Logical tab sequence for all interactive elements
- **Focus Management** - Visible focus indicators with proper contrast ratios
- **Keyboard Shortcuts** - Essential functionality accessible via keyboard only
- **Skip Links** - Direct navigation to main content areas

### Screen Reader Support
- **Semantic HTML** - Proper heading hierarchy and landmark elements
- **Alt Text** - Descriptive alternative text for all images
- **Live Regions** - Dynamic content announcements for screen readers
- **Form Labels** - Explicit labels and descriptions for all form inputs

### Visual Accessibility
- **Color Contrast** - Minimum 4.5:1 contrast ratio for normal text
- **Text Scaling** - Support for 200% text zoom without horizontal scrolling
- **Motion Preferences** - Respect for user's reduced motion preferences
- **Color Independence** - Information conveyed through multiple channels, not color alone

## CI/CD Pipeline

### GitHub Actions Workflow
The automated deployment pipeline includes the following stages:

1. **Code Quality Assurance**
   - ESLint code style validation
   - TypeScript type checking
   - Build verification

2. **Production Build**
   - Next.js standalone build generation
   - Static asset optimization
   - Bundle size analysis

3. **Container Creation**
   - Docker image building with multi-stage optimization
   - Image compression and layer optimization
   - Security scanning

4. **VPS Deployment**
   - Secure file transfer to production server
   - Docker container deployment with zero-downtime
   - SSL certificate validation and renewal

5. **Post-Deployment Verification**
   - Health check validation
   - Performance monitoring
   - Error tracking

### Deployment Configuration
- **Automated Triggers** - Deployment on push to main branch
- **Environment Management** - Separate staging and production environments
- **Rollback Capability** - Quick rollback to previous stable versions
- **Monitoring Integration** - Real-time deployment status and alerts

## Project Structure

```
Portfolio/
├── app/                          # Next.js App Router directory
│   ├── components/              # Reusable React components
│   │   ├── Terminal/           # Terminal component and related files
│   │   │   ├── commands.ts     # Terminal command definitions
│   │   │   └── effects.ts      # Visual effects implementations
│   │   ├── LanguageSwitcher.tsx # Internationalization controls
│   │   ├── Modal.tsx           # Accessible modal component
│   │   ├── ProjectCard.tsx     # Project showcase cards
│   │   ├── Terminal.tsx        # Main terminal interface
│   │   ├── ThemeSwitcher.tsx   # Dark/light theme toggle
│   │   └── Timeline.tsx        # Career timeline component
│   ├── globals.css             # Global styles and Tailwind imports
│   ├── layout.tsx              # Root layout with providers
│   └── page.tsx                # Homepage component
├── lib/                         # Utility libraries
│   └── i18n.ts                 # Internationalization configuration
├── public/                      # Static assets
│   ├── locales/               # Translation files
│   │   ├── en/translation.json # English translations
│   │   └── nl/translation.json # Dutch translations
│   └── fonts/                 # Custom font files
├── docker-compose.yml           # Production deployment configuration
├── Dockerfile                   # Container build instructions
├── next.config.mjs             # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
└── tsconfig.json              # TypeScript configuration
```

## Browser Support

### Modern Browser Compatibility
- **Chrome** - Version 91 and later
- **Firefox** - Version 90 and later
- **Safari** - Version 14 and later
- **Edge** - Version 91 and later

### Progressive Enhancement
- **Core Functionality** - Essential features work without JavaScript
- **Enhanced Experience** - Advanced features require modern browser capabilities
- **Graceful Degradation** - Fallbacks for unsupported features

### Mobile Support
- **iOS Safari** - Version 14 and later
- **Chrome Mobile** - Latest versions
- **Samsung Internet** - Version 14 and later
- **Opera Mobile** - Latest versions

## Contributing

### Development Guidelines
1. **Fork the repository** and create a feature branch
2. **Follow coding standards** - ESLint configuration and TypeScript best practices
3. **Write descriptive commits** - Use conventional commit format
4. **Test thoroughly** - Verify functionality across supported browsers
5. **Submit pull request** - Include detailed description of changes

### Code Style
- **ESLint Configuration** - Automated code style enforcement
- **TypeScript Strict Mode** - Full type safety requirements
- **Component Organization** - Single responsibility principle
- **File Naming** - PascalCase for components, camelCase for utilities

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for complete details.

## Contact & Professional Links

- **Website** - [jorismathijssen.nl](https://jorismathijssen.nl)
- **LinkedIn** - [linkedin.com/in/jorismathijssen](https://www.linkedin.com/in/jorismathijssen)
- **GitHub** - [github.com/jorismathijssen](https://github.com/jorismathijssen)

---

**Built with modern web technologies by Joris Mathijssen**
