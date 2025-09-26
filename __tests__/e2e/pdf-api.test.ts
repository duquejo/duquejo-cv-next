import { expect, test } from '@playwright/test';

test.use({
  acceptDownloads: false,
});

test.describe('PDF API Endpoint test', () => {
  const expectedOrigin = 'http://abc.xyz';

  test('should handle the preflight (options) requests', async ({ request }) => {
    const response = await request.fetch('/api/v1/pdf', {
      method: 'OPTIONS',
    });

    expect(response.status()).toBe(204);

    expect(response.headers()).toHaveProperty('content-security-policy');
    expect(response.headers()).toHaveProperty('cross-origin-opener-policy');
    expect(response.headers()).toHaveProperty('referrer-policy');
    expect(response.headers()).toHaveProperty('x-content-type-options');
    expect(response.headers()).toHaveProperty('x-frame-options');
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

    expect(response.status()).toBe(204);
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

    expect(response.headers()).toHaveProperty('content-security-policy');
    expect(response.headers()).toHaveProperty('cross-origin-opener-policy');
    expect(response.headers()).toHaveProperty('referrer-policy');
    expect(response.headers()).toHaveProperty('x-content-type-options');
    expect(response.headers()).toHaveProperty('x-frame-options');

    expect(response.headers()).toHaveProperty('access-control-allow-methods', 'POST, OPTIONS');
    expect(response.headers()).toHaveProperty(
      'content-disposition',
      'attachment; filename="cv_jose_duque.pdf"',
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
