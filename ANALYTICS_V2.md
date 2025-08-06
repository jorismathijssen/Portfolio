# Umami Analytics v2.x Implementation - Complete Best Practices Guide

## Overview

This portfolio implements **Umami Analytics v2.x** with comprehensive best practices, full TypeScript support, and strict adherence to Umami's data constraints. Our implementation provides privacy-first analytics with environment detection and enhanced tracking capabilities.

## 🚀 Key Features

- ✅ **Umami v2.x Compatibility**: Latest API with async/await patterns
- ✅ **Data Constraints Compliance**: Auto-sanitization for all Umami limits
- ✅ **Environment Detection**: Development vs production tagging
- ✅ **Session Identification**: User journey tracking with `umami.identify()`
- ✅ **Enhanced TypeScript**: Complete type definitions and error handling
- ✅ **Privacy-First**: No cookies, GDPR compliant, self-hosted
- ✅ **Error Resilience**: Graceful failures with development logging

## 📊 Umami v2.x Data Constraints

Our implementation automatically enforces Umami's data constraints:

| Constraint | Limit | Auto-Handling |
|------------|-------|---------------|
| Event Names | 50 characters | Auto-truncated |
| String Values | 500 characters | Auto-truncated |
| Number Precision | 4 decimal places | Auto-rounded |
| Object Properties | 50 max per event | Auto-limited |
| Arrays | Converted to strings | 500 char limit |

## 🔧 Configuration

### Environment Variables

```bash
# Production (required)
NEXT_PUBLIC_UMAMI_WEBSITE_ID=5f39fbfe-ea25-4a31-a34f-5ca167af4af1
NEXT_PUBLIC_UMAMI_SRC=https://analytics.jorismathijssen.nl/script.js

# Development (optional - uses hardcoded fallbacks)
NEXT_PUBLIC_UMAMI_WEBSITE_ID_DEV=dev-website-id
NEXT_PUBLIC_UMAMI_SRC_DEV=http://localhost:3001/script.js
```

### Docker Infrastructure

```yaml
# Complete Umami stack with CORS and SSL
services:
  umami:
    image: ghcr.io/umami-software/umami:postgresql-latest
    environment:
      - DATABASE_URL=postgresql://umami:${UMAMI_DB_PASSWORD}@db:5432/umami
      - DATABASE_TYPE=postgresql
      - APP_SECRET=${UMAMI_APP_SECRET}
    labels:
      - "traefik.http.routers.umami.middlewares=cors"
      - "traefik.http.middlewares.cors.headers.accesscontrolallowmethods=GET,OPTIONS,PUT,POST,DELETE"
      - "traefik.http.middlewares.cors.headers.accesscontrolalloworiginlist=*"
      - "traefik.http.middlewares.cors.headers.accesscontrolmaxage=86400"
```

## 🛠 Implementation Details

### Analytics Library (`app/lib/analytics.ts`)

The core analytics library provides:

```typescript
// Enhanced event tracking with data sanitization
export const trackEvent = async (eventName: string, eventData?: Record<string, any>) => {
  // Auto-truncates to 50 chars, sanitizes data, adds environment tagging
}

// Session identification for user journeys
export const identifyUser = async (userId: string, userData?: Record<string, any>) => {
  // Links events to specific user sessions
}

// 12+ specialized tracking functions with built-in data constraints
export const trackTerminalCommand = async (command: string, success: boolean) => { ... }
export const trackWebVitals = async (metric: string, value: number, rating: string) => { ... }
// ... and more
```

### Component Integration (`app/components/UmamiAnalytics.tsx`)

```tsx
// Advanced initialization with comprehensive environment detection
export default function UmamiAnalytics() {
  // Environment detection based on hostname, port, and NODE_ENV
  // Enhanced pageview tracking with browser insights
  // Graceful error handling with development logging
}
```

## 📈 Available Tracking Functions

### Core Events
```typescript
// Generic event tracking
trackEvent('custom_event', { key: 'value' })

// Session identification
identifyUser('user123', { role: 'admin', plan: 'pro' })
```

### Specialized Tracking
```typescript
// Terminal interactions
trackTerminalCommand('help', true)

// Performance monitoring
trackWebVitals('CLS', 0.1, 'good')

// User interface interactions
trackThemeSwitch('light', 'dark')
trackLanguageSwitch('en', 'nl')
trackProjectClick('My Portfolio', 'featured')

// Form interactions
trackContactForm('submit', 'validation_error')

// Social media engagement
trackSocialClick('github', 'profile_link')

// Error tracking
trackError('network', 'Failed to fetch', 'api_call')

// Custom engagement
trackEngagement('video_watch', 120, { video_id: 'intro' })
```

## 🔍 Development & Debugging

### Debug Functions
```typescript
// Check Umami status
console.log(debugUmami())

// Test analytics functionality
await testUmami()
```

### Environment Tagging
- **Development**: Events prefixed with `[DEV]` 
- **Production**: Clean event names
- **Auto-detection**: Based on hostname, port, and NODE_ENV

### Console Logging
```javascript
// Development only - no logs in production
if (window.umamiEnv === 'development') {
  console.log('🚀 Umami Analytics initialized')
  console.log('📊 Environment:', window.umamiEnv)
}
```

## 🎯 Best Practices Implemented

### 1. Data Sanitization
```typescript
const sanitizeEventData = (data: Record<string, any>) => {
  // Enforces all Umami v2.x constraints
  // Truncates strings, rounds numbers, limits properties
}
```

### 2. Error Handling
```typescript
try {
  return await window.umami.track(eventName, data)
} catch (error) {
  // Fail silently in production, log in development
  if (window.umamiEnv === 'development') {
    console.warn('Analytics failed:', error)
  }
}
```

### 3. Performance Optimization
- Async/await patterns for non-blocking tracking
- Data sanitization to prevent payload bloat
- Conditional loading based on environment

### 4. Privacy Compliance
- Self-hosted (no third-party data sharing)
- No cookies or localStorage tracking
- IP anonymization via nginx-proxy
- Configurable domain restrictions

## 🐛 Troubleshooting

### Common Issues

**Analytics not loading:**
```bash
# Check CORS headers
curl -I https://analytics.jorismathijssen.nl/script.js

# Verify environment variables
echo $NEXT_PUBLIC_UMAMI_WEBSITE_ID
```

**Events not appearing:**
```typescript
// Test in browser console
debugUmami()
await testUmami()
```

**Development vs Production:**
```typescript
// Check environment detection
console.log(window.umamiEnv) // Should be 'development' or 'production'
```

### Network Configuration

Ensure proper CORS headers in nginx-proxy:
```nginx
add_header Access-Control-Allow-Origin *;
add_header Access-Control-Allow-Methods "GET,POST,OPTIONS";
add_header Access-Control-Max-Age 86400;
```

## 📱 HTML Data Attributes

For HTML-based tracking (without JavaScript):

```html
<!-- Basic event tracking -->
<button data-umami-event="signup_click">Sign Up</button>

<!-- Event with data -->
<a href="/docs" 
   data-umami-event="docs_link"
   data-umami-event-section="header"
   data-umami-event-type="navigation">
  Documentation
</a>

<!-- Disable auto-tracking on specific elements -->
<div data-auto-track="false">
  <!-- Content not tracked automatically -->
</div>
```

## 🚀 Deployment Checklist

- [ ] Environment variables configured
- [ ] Docker services running (umami, db, nginx-proxy)
- [ ] CORS headers properly set
- [ ] SSL certificates active (Let's Encrypt)
- [ ] Website ID matches Umami dashboard
- [ ] Script URL accessible and returns tracker code
- [ ] Test events appearing in dashboard
- [ ] Development events properly tagged

## 📊 Dashboard Access

- **Production**: https://analytics.jorismathijssen.nl
- **Environment Filter**: Use `[DEV]` prefix to filter development events
- **Website ID**: `5f39fbfe-ea25-4a31-a34f-5ca167af4af1`

## 🔄 Migration Notes

This implementation is fully compatible with Umami v2.x and includes:
- Updated TypeScript definitions matching latest Umami tracker
- Proper async/await patterns for all tracking functions
- Enhanced data constraint compliance
- Improved error handling and development experience

For previous Umami v1.x implementations, this provides a complete upgrade path with backward compatibility.
