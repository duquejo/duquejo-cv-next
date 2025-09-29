import { type NextRequest, NextResponse } from 'next/server';

type RateLimitRecord = {
  count: number;
  windowStart: number;
};

const ipRequestMap: Map<string, RateLimitRecord> = new Map();

export default function rateLimitMiddleware(
  request: NextRequest,
  limit: number = 5,
  windowMs: number = 30 * 1000,
): NextResponse {
  if (process.env.NODE_ENV !== 'production') {
    return NextResponse.next();
  }

  const ip = request.headers.get('x-forwarded-for') ?? '127.0.0.1';

  const record = ipRequestMap.get(ip);
  const now = Date.now();

  if (!record || now > record.windowStart + windowMs) {
    ipRequestMap.set(ip, {
      count: 1,
      windowStart: now,
    });
    return NextResponse.next();
  }

  if (record.count < limit) {
    record.count++;
    ipRequestMap.set(ip, record);
    return NextResponse.next();
  }

  return new NextResponse('Too Many Requests', { status: 429 });
}
