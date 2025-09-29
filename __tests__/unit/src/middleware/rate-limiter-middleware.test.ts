import { NextRequest } from 'next/server';
import rateLimitMiddleware from '@/middleware/rate-limiter-middleware';
import { afterEach, beforeEach } from 'vitest';

describe('In-memory Rate Limiter tests', () => {
  const createMockRequest = (ip: string): NextRequest => {
    const headers = new Headers();
    headers.set('x-forwarded-for', ip);
    return new NextRequest('http://localhost/api/test', { headers });
  };

  const forceTimeWindowLimit = (request: NextRequest, limit = 5, windowMs = 30 * 1000) => {
    for (let i = 0; i < limit; i++) {
      rateLimitMiddleware(request, limit, windowMs);
    }
  };

  beforeEach(() => {
    vi.stubEnv('NODE_ENV', 'production');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('should allow the first request from an IP', async () => {
    // Arrange
    const request = createMockRequest('1.1.1.1');

    // Act
    const response = rateLimitMiddleware(request);

    // Assert
    expect(response.status).toBe(200);
  });

  it('should allow requests that are within the limit', async () => {
    // Arrange
    const request = createMockRequest('2.2.2.2');
    const limit = 5;

    // Act & Assert
    for (let i = 0; i < limit; i++) {
      const response = rateLimitMiddleware(request, limit);
      expect(response.status, `Request #${i + 1} should be allowed`).toBe(200);
    }
  });

  it('should block a request that exceeds the limit', async () => {
    // Arrange
    const limit = 3;
    const request = createMockRequest('3.3.3.3');
    forceTimeWindowLimit(request, limit);

    // Act
    const blockedResponse = rateLimitMiddleware(request, limit);

    // Assert
    expect(blockedResponse.status).toBe(429);
  });

  it('should reset the limit after the time window expires', async () => {
    // Arrange
    vi.useFakeTimers();

    const request = createMockRequest('4.4.4.4');
    const limit = 2;
    const windowMs = 1000;
    forceTimeWindowLimit(request, limit, windowMs);

    expect(rateLimitMiddleware(request, limit, windowMs).status).toBe(429); // Already blocked

    // Act
    vi.advanceTimersByTime(windowMs + 1);
    const responseAfterWindow = rateLimitMiddleware(request, limit, windowMs);

    // Assert
    expect(responseAfterWindow.status).toBe(200);

    vi.useRealTimers();
  });

  it('should handle different IPs independently', async () => {
    // Arrange
    const limit = 2;
    const requestIp1 = createMockRequest('5.5.5.5');
    const requestIp2 = createMockRequest('6.6.6.6');
    forceTimeWindowLimit(requestIp1, limit);

    // Act
    const responseIp2 = rateLimitMiddleware(requestIp2, limit);

    // Assert
    expect(rateLimitMiddleware(requestIp1, limit).status).toBe(429);
    expect(responseIp2.status).toBe(200);
  });
});
