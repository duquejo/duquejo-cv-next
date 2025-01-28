import { NextRequest } from 'next/server';
import { OPTIONS, POST } from '@/app/api/v1/pdf/route';
import { generatePdf } from '@/actions/pdf';
import { beforeEach } from 'vitest';

vi.mock('@/actions/pdf', () => ({
  generatePdf: vi.fn(() => new Promise<Buffer>((resolve) => resolve(Buffer.from('PDF content')))),
}));

describe('PDF Route handler unit tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const testBaseUrl = 'http://localhost:3000';

  const postRequest = (headers = new Headers()): Promise<Response> => {
    const request = new NextRequest(testBaseUrl, {
      method: 'POST',
      headers,
    });

    return POST(request);
  };

  const optionsRequest = (headers = new Headers()): Promise<Response> => {
    const request = new NextRequest(testBaseUrl, {
      method: 'OPTIONS',
      headers,
    });

    return OPTIONS(request);
  };

  it('should work as expected - POST', async () => {
    const customHeaders = new Headers({
      origin: 'https://duquejo.com',
    });

    const response = await postRequest(customHeaders);
    const textResponse = await response.text();

    expect(response.status).toBe(200);
    expect(response.headers.get('Content-Type')).toBe('application/pdf');
    expect(response.headers.get('Content-Disposition')).toBe(
      'attachment; filename=cv_jose_duque.pdf',
    );
    expect(response.headers.get('Access-Control-Allow-Origin')).toBe('https://duquejo.com');
    expect(textResponse).toBe('PDF content');

    expect(generatePdf).toHaveBeenCalled();
  });

  it('should not set Access-Control-Allow-Origin for disallowed origins - POST', async () => {
    const response = await postRequest();

    expect(response.status).toBe(200);
    expect(response.headers.get('Access-Control-Allow-Origin')).toBeNull();

    expect(generatePdf).toHaveBeenCalled();
  });

  it('should work as expected - OPTIONS (Preflight)', async () => {
    const customHeaders = new Headers({
      origin: 'https://duquejo.com',
    });

    const response = await optionsRequest(customHeaders);

    expect(response.headers.get('Access-Control-Allow-Origin')).toBe('https://duquejo.com');
    expect(response.headers.get('Access-Control-Allow-Methods')).toBe('POST, OPTIONS');
    expect(response.headers.get('Access-Control-Allow-Headers')).toBe(
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    );
    expect(await response.json()).toEqual({});
  });

  it('should not set Access-Control-Allow-Origin for disallowed origins - OPTIONS (Preflight)', async () => {
    const response = await optionsRequest();

    expect(response.headers.get('Access-Control-Allow-Origin')).toBeNull();
    expect(response.headers.get('Access-Control-Allow-Methods')).toBe('POST, OPTIONS');
    expect(response.headers.get('Access-Control-Allow-Headers')).toBe(
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    );
  });
});
