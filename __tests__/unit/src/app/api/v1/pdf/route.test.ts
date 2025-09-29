import { OPTIONS, POST } from '@/app/api/v1/pdf/route';
import { generatePdf } from '@/actions/pdf';
import { NextRequest } from 'next/server';

vi.mock('@/actions/pdf', () => ({
  generatePdf: vi.fn(),
}));

describe('PDF Generation API Route', () => {
  const allowedOrigin = 'https://abc.xyz';

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  const createMockRequest = (method: 'POST' | 'OPTIONS', origin: string): NextRequest => {
    const headers = new Headers();
    headers.set('origin', origin);
    return new NextRequest(`${origin}/api/pdf`, { method, headers });
  };

  it('should return a PDF with correct headers for an allowed origin', async () => {
    // Arrange
    vi.mocked(generatePdf).mockResolvedValue(new Uint8Array(8));

    const allowedOrigins = process.env.ALLOWED_ORIGINS;
    const documentName = process.env.PDF_FILENAME;
    const request = createMockRequest('POST', allowedOrigin);

    // Act
    const response = await POST(request);
    const blob = await response.blob();

    // Assert
    expect(response.status).toBe(200);
    expect(response.headers.get('Content-Type')).toBe('application/pdf');
    expect(response.headers.get('Content-Disposition')).toBe(
      `attachment; filename="${documentName}.pdf"`,
    );
    expect(allowedOrigins).contain(response.headers.get('Access-Control-Allow-Origin'));
    expect(blob.type).toBe('application/pdf');
  });

  it('should return a 500 error if PDF generation fails', async () => {
    // Arrange
    vi.mocked(generatePdf).mockRejectedValue(new Error('PDF engine failed'));
    const request = createMockRequest('POST', 'https://example.com');

    // Act
    const response = await POST(request);
    const body = await response.json();

    // Assert
    expect(response.status).toBe(500);
    expect(body.error).toBe('The PDF cannot be generated, try later.');
  });

  it('should not include Access-Control-Allow-Origin header for a disallowed origin', async () => {
    // Arrange
    vi.mocked(generatePdf).mockResolvedValue(new Uint8Array(8));
    const disallowedOrigin = 'https://disallowed.com';
    const request = createMockRequest('POST', disallowedOrigin);

    // Act
    const response = await POST(request);

    // Assert
    expect(response.headers.get('Access-Control-Allow-Origin')).toBeNull();
  });

  it('should return a 204 response with correct CORS headers for an allowed origin', async () => {
    // Arrange
    const request = createMockRequest('OPTIONS', allowedOrigin);

    // Act
    const response = await OPTIONS(request);

    // Assert
    expect(response.status).toBe(204);
    expect(response.headers.get('Access-Control-Allow-Origin')).toBe(allowedOrigin);
    expect(response.headers.get('Access-Control-Allow-Methods')).toContain('POST');
  });

  it('should return a 204 response without Access-Control-Allow-Origin for a disallowed origin', async () => {
    // Arrange
    const disallowedOrigin = 'https://disallowed.com';
    const request = createMockRequest('OPTIONS', disallowedOrigin);

    // Act
    const response = await OPTIONS(request);

    // Assert
    expect(response.status).toBe(204);
    expect(response.headers.get('Access-Control-Allow-Origin')).toBeNull();
  });
});
