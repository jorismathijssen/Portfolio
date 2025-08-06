# Analytics Implementation - Updated to Umami v2.x Best Practices

> **📋 Complete Documentation**: See [ANALYTICS_V2.md](./ANALYTICS_V2.md) for the comprehensive Umami v2.x implementation guide with latest best practices.

## Quick Overview

This portfolio now implements **Umami Analytics v2.x** with:

✅ **Latest Standards**: Full compliance with Umami v2.x data constraints and API patterns  
✅ **Enhanced TypeScript**: Comprehensive type definitions matching latest Umami tracker  
✅ **Data Sanitization**: Auto-enforcement of all Umami limits (50 char event names, 500 char strings, etc.)  
✅ **Session Tracking**: User journey tracking with `umami.identify()`  
✅ **Environment Detection**: Development vs production tagging  
✅ **Error Resilience**: Graceful failures with development logging  

## Key Improvements

### 1. Umami v2.x API Compliance
- Async/await patterns for all tracking functions
- Proper TypeScript definitions matching latest tracker
- Enhanced data constraint validation

### 2. Data Constraints Auto-Enforcement
```typescript
// All data automatically sanitized:
// - Event names: max 50 chars
// - Strings: max 500 chars  
// - Numbers: max 4 decimal precision
// - Objects: max 50 properties
```

### 3. Enhanced Tracking Functions
```typescript
// 12+ specialized functions with built-in constraints
await trackEvent('custom_event', data)        // Generic tracking
await trackTerminalCommand('help', true)      // Terminal interactions
await trackWebVitals('CLS', 0.1, 'good')     // Performance metrics
await identifyUser('user123', userData)       // Session identification
```

## Quick Start

```typescript
// Import and use enhanced analytics
import { trackEvent, trackThemeSwitch, debugUmami } from '@/lib/analytics'

// Track custom events (auto-sanitized)
await trackEvent('feature_used', { feature: 'dark_mode', success: true })

// Use specialized tracking
await trackThemeSwitch('light', 'dark')

// Debug in development
console.log(debugUmami())
```

## Migration Benefits

| Feature | Previous | v2.x Implementation |
|---------|----------|-------------------|
| Event Tracking | Basic sync calls | Async/await with error handling |
| Data Validation | Manual | Auto-sanitization with constraints |
| TypeScript | Basic typing | Complete definitions |
| Session Tracking | Page views only | User journey with identify() |
| Error Handling | None | Development logging + graceful failures |
| Environment Detection | Simple hostname | Enhanced multi-factor detection |

## Infrastructure

- **Self-hosted Umami**: Latest version with PostgreSQL backend
- **CORS Configuration**: Proper cross-origin headers via nginx-proxy  
- **SSL Encryption**: Let's Encrypt automatic certificates
- **Environment Variables**: Fallback values for seamless development

## 📖 Full Documentation

For complete implementation details, API reference, troubleshooting, and deployment guide:

**➡️ [View Complete Umami v2.x Documentation](./ANALYTICS_V2.md)**
} from '../lib/analytics';

// Terminal usage
trackTerminalCommand('help', true);

// Project interactions
trackProjectClick('Portfolio Website', 'card');

// Theme changes
trackThemeSwitch('light', 'dark');

// Contact form stages
trackContactForm('submit');
trackContactForm('error', 'validation');

// User engagement
trackEngagement('scroll', 5000, { depth: '75%' });

// Error tracking
trackError('validation', 'Email format invalid', 'contact_form');
```

### HTML Data Attributes
You can also track events directly in HTML using data attributes:

```html
<!-- Simple click tracking -->
<button data-umami-event="Newsletter Signup">Subscribe</button>

<!-- With additional data -->
<button 
  data-umami-event="Download"
  data-umami-event-file="portfolio.pdf"
  data-umami-event-size="2.4MB">
  Download Portfolio
</button>
```

## Implementation Details

### Environment Configuration
- **Development**: `localhost`, `127.0.0.1`, or port `3000`
- **Production**: All other hostnames
- Events are automatically tagged with environment information

### Privacy & Performance
- **No personal data** is collected without explicit consent
- **Truncated user agents** for privacy (100 chars max)
- **Limited message lengths** to prevent data bloat
- **Fallback handling** when analytics isn't loaded

### Analytics Dashboard
Visit [analytics.jorismathijssen.nl](https://analytics.jorismathijssen.nl) to view:
- **Real-time visitor data**
- **Event breakdowns** with custom properties
- **Performance metrics** from Web Vitals
- **Environment-filtered data** (filter out [DEV] events)

## Development vs Production

### Development Events
- Prefixed with `[DEV]` in event names
- Include development-specific metadata
- Can be filtered out in production analysis
- Useful for debugging analytics implementation

### Production Events
- Clean event names without prefixes
- Production-specific metadata
- Core business metrics and user behavior
- Performance monitoring data

## Adding New Event Tracking

1. **Import the tracking function**:
   ```typescript
   import { trackEvent } from '../lib/analytics';
   ```

2. **Add tracking to your component**:
   ```typescript
   const handleButtonClick = () => {
     trackEvent('feature_interaction', {
       feature: 'advanced_search',
       action: 'filter_applied',
       filters: selectedFilters.length
     });
     
     // Your existing logic here
   };
   ```

3. **Use data attributes for simple tracking**:
   ```html
   <a href="/contact" data-umami-event="Navigation Click" data-umami-event-destination="contact">
     Contact Me
   </a>
   ```

## Best Practices

### Event Naming
- Use **descriptive, consistent names**: `user_engagement`, `feature_interaction`
- Include **action context**: `terminal_command`, `project_click`
- Keep names **under 50 characters** (Umami limit)

### Event Data
- Include **relevant context** without personal information
- Use **consistent property names** across similar events
- Keep **data values meaningful** and analyzable

### Performance
- **Track meaningful interactions** only
- **Avoid tracking rapid/frequent events** (like mouse moves)
- **Include success/failure states** for actionable insights

## Debugging

### Check Analytics Status
```typescript
import { debugUmami } from '../lib/analytics';

console.log(debugUmami());
// Returns: { loaded: true, environment: 'production', websiteId: '...', scriptSrc: '...' }
```

### Browser Console
```javascript
// Check if Umami is loaded
console.log(typeof window.umami); // should be 'object'

// Test event tracking
window.umami.track('test_event', { source: 'console' });

// Check environment detection
console.log(window.umamiEnv); // 'development' or 'production'
```

## Configuration

### Environment Variables
```env
NEXT_PUBLIC_UMAMI_WEBSITE_ID=your-website-id
NEXT_PUBLIC_UMAMI_SRC=https://analytics.yoursite.com/script.js
```

### Docker Configuration
The analytics server runs with CORS headers configured for cross-origin tracking:
```yaml
labels:
  - "nginx.proxy.custom=add_header 'Access-Control-Allow-Origin' 'https://yoursite.com' always;"
```

---

## Useful Links
- [Umami Documentation](https://umami.is/docs)
- [Event Tracking Guide](https://umami.is/docs/track-events)
- [Analytics Dashboard](https://analytics.jorismathijssen.nl)
