import createNextIntlPlugin from 'next-intl/plugin';
import { CSP_HEADERS } from '@/lib/constants';

import createBundleAnalyzer from '@next/bundle-analyzer';

const withNextIntl = createNextIntlPlugin();

const withBundleAnalizer = createBundleAnalyzer({
  enabled: process.env.ANALIZE === 'true',
});

export default withNextIntl(
  withBundleAnalizer({
    devIndicators: false,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'avatars.githubusercontent.com',
        },
      ],
      localPatterns: [
        {
          pathname: '/static/**',
          search: '',
        },
      ],
    },
    headers: async () => [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: CSP_HEADERS.replace(/\n/g, ''),
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/manifest.webmanifest',
        headers: [
          {
            key: 'cache-control',
            value: 'public, max-age=3600, immutable',
          },
        ],
      },
    ],
  }),
);
