import withBundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',

  // 🚀 Performance
  compress: true, // Enable gzip
  poweredByHeader: false, // Disable X-Powered-By

  // 🌍 Internationalization
  i18n: {
    locales: ['en', 'nl'],
    defaultLocale: 'en',
    localeDetection: true,
  },

  // 🛡️ Security headers (Next.js native)
  async headers() {
    return [
      {
        source: '/(.*)', // Apply to all routes
        headers: [
          {
            key: 'Content-Security-Policy',
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' *.trusted.com; style-src 'self' 'unsafe-inline'; img-src * blob: data:; connect-src *; font-src 'self' data:; object-src 'none'; frame-ancestors 'none';",
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
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },

  // 🧪 Optioneel: experimentele optimalisaties
  experimental: {
    scrollRestoration: true,
  },
};

export default withBundleAnalyzer({
  enabled: process.env.BUNDLE_ANALYZE === 'both',
})(nextConfig);
