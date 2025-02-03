import { expect, test } from '@playwright/test';

test.use({
  acceptDownloads: false,
});

test.describe('PDF API Endpoint test', () => {
  const expectedOrigin = 'http://abc.xyz';
  const expectedHeaders = {
    'content-security-policy':
      "default-src 'self';script-src 'self' 'unsafe-eval' 'unsafe-inline';style-src 'self' 'unsafe-inline';img-src 'self' blob: data:;font-src 'self';object-src 'none';base-uri 'self';form-action 'self';frame-ancestors 'none';upgrade-insecure-requests;",
    'cross-origin-opener-policy': 'same-origin',
    'referrer-policy': 'origin-when-cross-origin',
    'x-content-type-options': 'nosniff',
    'x-frame-options': 'SAMEORIGIN',
  };

  test('should handle the preflight (options) requests', async ({ request }) => {
    const response = await request.fetch('/api/v1/pdf', {
      method: 'OPTIONS',
    });

    expect(response.status()).toBe(200);

    Object.entries(expectedHeaders).forEach(([key, value]) =>
      expect(response.headers()).toHaveProperty(key, value),
    );
  });

  test('should handle the preflight (options) requests with the origin header', async ({
    request,
  }) => {
    const response = await request.fetch('/api/v1/pdf', {
      method: 'OPTIONS',
      headers: {
        Origin: expectedOrigin,
      },
    });

    expect(response.status()).toBe(200);
    expect(response.headers()).toHaveProperty(
      'access-control-allow-headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    );
    expect(response.headers()).toHaveProperty('access-control-allow-methods', 'POST, OPTIONS');
    expect(response.headers()).toHaveProperty('access-control-allow-origin', expectedOrigin);
  });

  test('should handle the POST request - Generate PDF', async ({ request }) => {
    const response = await request.post('/api/v1/pdf');

    expect(response.status()).toBe(200);

    Object.entries(expectedHeaders).forEach(([key, value]) =>
      expect(response.headers()).toHaveProperty(key, value),
    );

    expect(response.headers()).toHaveProperty('access-control-allow-methods', 'POST, OPTIONS');
    expect(response.headers()).toHaveProperty(
      'content-disposition',
      'attachment; filename=cv_jose_duque.pdf',
    );
    expect(response.headers()).toHaveProperty('content-type', 'application/pdf');
    expect(response.headers()).toHaveProperty(
      'access-control-allow-headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    );
  });

  test('should handle the POST request - Generate PDF with the origin header', async ({
    request,
  }) => {
    const response = await request.post('/api/v1/pdf', {
      headers: {
        Origin: expectedOrigin,
      },
    });

    expect(response.status()).toBe(200);
    expect(response.headers()).toHaveProperty(
      'access-control-allow-headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    );
    expect(response.headers()).toHaveProperty('access-control-allow-methods', 'POST, OPTIONS');
    expect(response.headers()).toHaveProperty('access-control-allow-origin', expectedOrigin);
  });
});
