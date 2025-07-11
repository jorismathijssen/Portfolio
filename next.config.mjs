  import withBundleAnalyzer from '@next/bundle-analyzer';

  const withAnalyzer = withBundleAnalyzer({
    enabled: process.env.BUNDLE_ANALYZE === 'both',
  });

  /** @type {import('next').NextConfig} */
  const nextConfig = {
    output: 'standalone',
    compress: true, // Enable gzip compression
    poweredByHeader: false, // Hide X-Powered-By header for security
  };

  export default withAnalyzer(nextConfig);