import createNextIntlPlugin from 'next-intl/plugin';
import { CSP_HEADERS, CSP_HEADERS_SAFE } from '@/lib/constants';

import createBundleAnalyzer from '@next/bundle-analyzer';

const withNextIntl = createNextIntlPlugin();

const withBundleAnalizer = createBundleAnalyzer({
  enabled: process.env.ANALIZE === 'true',
});

export default withNextIntl(
  withBundleAnalizer({
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
            value:
              process.env.NODE_ENV !== 'production'
                ? CSP_HEADERS.replace(/\n/g, '')
                : CSP_HEADERS_SAFE.replace(/\n/g, ''),
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
    ],
  }),
);
