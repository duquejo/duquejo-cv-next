import { NextRequest, NextResponse } from 'next/server';
import { generatePdf } from '@/actions/pdf';

const CORS_HEADERS = {
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
};

const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map((url) => url.trim())
  : [];

const PDF_FILENAME = process.env.PDF_FILENAME || 'document';

const applyCorsHeaders = (headers: Headers, origin: string) => {
  if (ALLOWED_ORIGINS.includes(origin)) headers.set('Access-Control-Allow-Origin', origin);
  Object.entries(CORS_HEADERS).forEach(([key, value]) => headers.set(key, value));
};

export async function POST(request: NextRequest): Promise<Response> {
  const origin = request.headers.get('origin') ?? '';

  const headers = new Headers();
  applyCorsHeaders(headers, origin);

  try {
    const pdfBuffer = await generatePdf();
    const cleanBuffer = new Uint8Array(pdfBuffer);
    const pdfBlob = new Blob([cleanBuffer], { type: 'application/pdf' });

    headers.set('Content-Type', 'application/pdf');
    headers.set('Content-Disposition', `attachment; filename="${PDF_FILENAME}.pdf"`);

    return new Response(pdfBlob, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error(`PDF Generation error: ${error}`);
    return NextResponse.json({ error: 'The PDF cannot be generated, try later.' }, { status: 500 });
  }
}

export async function OPTIONS(request: NextRequest): Promise<Response> {
  const origin = request.headers.get('origin') ?? '';

  const headers = new Headers();
  applyCorsHeaders(headers, origin);

  return new Response(null, { status: 204, headers });
}
