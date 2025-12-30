import { expect, test } from '@playwright/test';

test.use({
  acceptDownloads: false,
});

test.describe('PDF API Endpoint test', () => {
  const expectedOrigin = process.env.SITE_URL ?? 'http://abc.xyz';
  const pdfDocument = process.env.PDF_FILENAME ?? 'cv_jose_duque';
  const endpoint = '/api/v1/pdf';

  const assertCSPHeaders = (headers: Record<string, string>) => {
    expect(headers).toHaveProperty('content-security-policy');
    expect(headers).toHaveProperty('cross-origin-opener-policy');
    expect(headers).toHaveProperty('referrer-policy');
    expect(headers).toHaveProperty('x-content-type-options');
    expect(headers).toHaveProperty('x-frame-options');
  };

  test('should handle the preflight (options) requests', async ({ request }) => {
    const response = await request.fetch(endpoint, {
      method: 'OPTIONS',
    });

    expect(response.status()).toBe(204);
    assertCSPHeaders(response.headers());
  });

  test('should handle the preflight (options) requests with the origin header', async ({
    request,
  }) => {
    const response = await request.fetch(endpoint, {
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
    const response = await request.post(endpoint);

    expect(response.status()).toBe(200);
    assertCSPHeaders(response.headers());

    expect(response.headers()).toHaveProperty('access-control-allow-methods', 'POST, OPTIONS');
    expect(response.headers()).toHaveProperty(
      'content-disposition',
      `attachment; filename="${pdfDocument}.pdf"`,
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
    const response = await request.post(endpoint, {
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
