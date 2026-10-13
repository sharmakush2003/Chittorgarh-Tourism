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
  async redirects() {
    return [
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

export default nextConfig;
