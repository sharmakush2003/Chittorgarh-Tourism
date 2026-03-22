import withPWAInit from '@ducanh2912/next-pwa';

const withPWA = withPWAInit({
  dest: 'public',
  disable: false, // Enabled for local PWA+ testing
  register: false,
  skipWaiting: true,
  workboxOptions: {
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'google-fonts-webfonts',
          expiration: {
            maxEntries: 4,
            maxAgeSeconds: 365 * 24 * 60 * 60,
          },
        },
      },
      {
        urlPattern: /\/translations\/.*\.json$/i,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'heritage-translations',
          expiration: {
            maxEntries: 20,
            maxAgeSeconds: 30 * 24 * 60 * 60,
          },
        },
      },
      {
        urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'heritage-images',
          expiration: {
            maxEntries: 200,
            maxAgeSeconds: 30 * 24 * 60 * 60,
          },
        },
      },
    ],
  },
});


/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
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
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.chittorgarh-tourism.in',
          },
        ],
        destination: 'https://chittorgarh-tourism.in/:path*',
        permanent: true,
      },
      {
        source: '/vijay%20stambh',
        destination: '/vijay-stambh',
        permanent: true,
      },
      {
        source: '/kumbha%20palace',
        destination: '/kumbha-palace',
        permanent: true,
      },
      {
        source: '/kumbha%20shyam',
        destination: '/kumbha-shyam',
        permanent: true,
      },
      {
        source: '/fateh%20prakash',
        destination: '/fateh-prakash',
        permanent: true,
      },
      {
        source: '/padmini%20palace',
        destination: '/padmini-palace',
        permanent: true,
      },
      {
        source: '/ratan%20palace',
        destination: '/ratan-palace',
        permanent: true,
      },
      {
        source: '/kalika%20temple',
        destination: '/kalika-temple',
        permanent: true,
      },
      {
        source: '/jain%20temples',
        destination: '/jain-temples',
        permanent: true,
      },
      {
        source: '/vijaystambh',
        destination: '/vijay-stambh',
        permanent: true,
      },
      {
        source: '/meera%20bai%20temple',
        destination: '/meera-bai-temple',
        permanent: true,
      },
      {
        source: '/meerabai%20temple',
        destination: '/meera-bai-temple',
        permanent: true,
      },
      {
        source: '/meerabai-temple',
        destination: '/meera-bai-temple',
        permanent: true,
      },
    ];
  },
  turbopack: {},
};

export default withPWA(nextConfig);
