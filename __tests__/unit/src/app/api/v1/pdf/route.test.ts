import { NextRequest } from 'next/server';
import { OPTIONS, POST } from '@/app/api/v1/pdf/route';
import { generate } from '@pdfme/generator';

vi.mock('@pdfme/generator', () => ({
  generate: vi.fn(() => new Promise<Buffer>((resolve) => resolve(Buffer.from('PDF content')))),
}));

describe('PDF Route handler unit tests', () => {
  it('should work as expected - POST', async () => {
    const request = new NextRequest('http://localhost:3000', {
      method: 'POST',
      headers: new Headers({
        origin: 'https://duquejo.com',
      }),
    });

    const response = await POST(request);

    expect(response.status).toBe(200);
    expect(response.headers.get('Content-Type')).toBe('application/pdf');
    expect(response.headers.get('Content-Disposition')).toBe(
      'attachment; filename=cv_jose_duque.pdf',
    );
    expect(response.headers.get('Access-Control-Allow-Origin')).toBe('https://duquejo.com');
    expect(await response.text()).toBe('PDF content');

    expect(generate).toHaveBeenCalledWith({
      inputs: expect.any(Array),
      template: expect.any(Object),
    });
  });

  it('should not set Access-Control-Allow-Origin for disallowed origins - POST', async () => {
    const request = new NextRequest('http://localhost:3000', {
      method: 'POST',
    });

    const response = await POST(request);

    expect(response.status).toBe(200);
    expect(response.headers.get('Access-Control-Allow-Origin')).toBeNull();
  });

  it('should work as expected - OPTIONS (Preflight)', async () => {
    const request = new NextRequest('http://localhost:3000', {
      method: 'OPTIONS',
      headers: new Headers({
        origin: 'https://duquejo.com',
      }),
    });

    const response = await OPTIONS(request);

    expect(response.headers.get('Access-Control-Allow-Origin')).toBe('https://duquejo.com');
    expect(response.headers.get('Access-Control-Allow-Methods')).toBe('POST, OPTIONS');
    expect(response.headers.get('Access-Control-Allow-Headers')).toBe(
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    );
    expect(await response.json()).toEqual({});
  });

  it('should not set Access-Control-Allow-Origin for disallowed origins - OPTIONS (Preflight)', async () => {
    const request = new NextRequest('http://localhost:3000', {
      method: 'OPTIONS',
    });

    const response = await OPTIONS(request);

    expect(response.headers.get('Access-Control-Allow-Origin')).toBeNull();
    expect(response.headers.get('Access-Control-Allow-Methods')).toBe('POST, OPTIONS');
    expect(response.headers.get('Access-Control-Allow-Headers')).toBe(
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    );
  });
});
