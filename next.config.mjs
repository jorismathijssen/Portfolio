/**
 * Next.js Configuration
 */

import withBundleAnalyzer from '@next/bundle-analyzer';

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
const BUNDLE_ANALYZE = process.env.BUNDLE_ANALYZE === 'true';

/**
 * Security headers for production
 */
const SECURITY_HEADERS = [
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' *.vercel-insights.com *.vercel-analytics.com",
      "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
      "img-src * blob: data:",
      "font-src 'self' fonts.gstatic.com data:",
      "connect-src *",
      "media-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests",
    ].join('; '),
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: [
      'camera=()',
      'microphone=()',
      'geolocation=()',
      'payment=()',
      'usb=()',
      'magnetometer=()',
      'gyroscope=()',
      'accelerometer=()',
    ].join(', '),
  },
  {
    key: 'Cross-Origin-Embedder-Policy',
    value: 'credentialless',
  },
  {
    key: 'Cross-Origin-Opener-Policy',
    value: 'same-origin',
  },
  {
    key: 'Cross-Origin-Resource-Policy',
    value: 'cross-origin',
  },
];

/**
 * Performance headers for optimal caching and delivery
 * 
 * @constant
 * @internal
 */
const PERFORMANCE_HEADERS = [
  {
    key: 'Cache-Control',
    value: 'public, max-age=31536000, immutable',
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'X-Powered-By',
    value: 'Portfolio 2.0.0',
  },
];

/**
 * Main Next.js configuration object
 * 
 * @type {import('next').NextConfig}
 * @public
 */
const nextConfig = {
  // Build and output configuration
  output: 'standalone',
  distDir: '.next',
  generateEtags: true,
  
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  generateBuildId: async () => {
    // Generate a build ID for cache busting
    return `portfolio-${Date.now()}`;
  },

  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Compiler optimizations
  compiler: {
    // Remove console logs in production
    removeConsole: IS_PRODUCTION ? {
      exclude: ['error', 'warn'],
    } : false,
    
    // React compiler optimizations
    reactRemoveProperties: IS_PRODUCTION,
  },

  // TypeScript configuration
  typescript: {
    // Type checking is handled by CI/CD, don't block builds
    ignoreBuildErrors: false,
    tsconfigPath: './tsconfig.json',
  },

  // ESLint configuration
  eslint: {
    // Linting is handled by CI/CD
    ignoreDuringBuilds: false,
    dirs: ['app', 'lib', 'components'],
  },

  // Experimental features for performance
  experimental: {
    scrollRestoration: true,
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
    memoryBasedWorkersCount: true,
    esmExternals: true,
  },

  // Server external packages (moved from experimental)
  serverExternalPackages: ['sharp'],

  // Webpack configuration for advanced optimizations
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Production optimizations
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        
        // Split chunks for optimal loading
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            
            // Vendor chunks
            vendor: {
              name: 'vendors',
              chunks: 'all',
              test: /node_modules/,
              priority: 20,
            },
            
            // Common chunks
            common: {
              name: 'commons',
              minChunks: 2,
              chunks: 'all',
              priority: 10,
              reuseExistingChunk: true,
              enforce: true,
            },
            
            // Styles
            styles: {
              name: 'styles',
              test: /\.(css|scss|sass)$/,
              chunks: 'all',
              priority: 30,
              enforce: true,
            },
          },
        },
        
        // Minimize bundle size
        usedExports: true,
        sideEffects: false,
      };
    }

    // Bundle analyzer in development
    if (dev && BUNDLE_ANALYZE) {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          openAnalyzer: true,
        })
      );
    }

    return config;
  },

  // Environment variables (public)
  env: {
    PORTFOLIO_VERSION: '2.0.0',
    BUILD_TIME: new Date().toISOString(),
  },

  // Custom headers for security and performance
  async headers() {
    const headers = [];

    // Apply security headers only in production
    if (IS_PRODUCTION) {
      headers.push({
        source: '/(.*)',
        headers: SECURITY_HEADERS,
      });
    }

    // Static asset caching
    headers.push({
      source: '/static/(.*)',
      headers: PERFORMANCE_HEADERS,
    });

    // Font optimization
    headers.push({
      source: '/fonts/(.*)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
        {
          key: 'Cross-Origin-Resource-Policy',
          value: 'cross-origin',
        },
      ],
    });

    // API routes
    headers.push({
      source: '/api/(.*)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'no-store, max-age=0',
        },
      ],
    });

    return headers;
  },

  // Redirects for SEO and user experience
  async redirects() {
    return [
      // Legacy URL redirects
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/portfolio',
        destination: '/',
        permanent: true,
      },
    ];
  },

  // Rewrites for clean URLs
  async rewrites() {
    return [
      // API rewrites if needed
      {
        source: '/health',
        destination: '/api/health',
      },
    ];
  },

  // Development-specific configuration
  ...(IS_DEVELOPMENT && {
    // Development optimizations
    onDemandEntries: {
      maxInactiveAge: 25 * 1000,
      pagesBufferLength: 2,
    },
    
    // Fast refresh is enabled by default in Next.js 15
    // No need to explicitly set fastRefresh
  }),

  // Production-specific configuration
  ...(IS_PRODUCTION && {
    // Production optimizations - swcMinify is now enabled by default
    // No additional production-specific configs needed for minification
  }),
};

/**
 * Enhanced configuration with bundle analyzer
 * 
 * Conditionally wraps the configuration with bundle analyzer
 * based on environment variables.
 * 
 * @type {import('next').NextConfig}
 */
const configWithAnalyzer = withBundleAnalyzer({
  enabled: BUNDLE_ANALYZE,
})(nextConfig);

// Development logging
if (IS_DEVELOPMENT) {
  console.info('🚀 Next.js Configuration Loaded:', {
    environment: process.env.NODE_ENV,
    bundleAnalyzer: BUNDLE_ANALYZE,
    typescript: nextConfig.typescript?.ignoreBuildErrors ? 'permissive' : 'strict',
    experimental: Object.keys(nextConfig.experimental || {}),
  });
}

export default configWithAnalyzer;