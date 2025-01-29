import { NextRequest, NextResponse } from 'next/server';
import { generatePdf } from '@/actions/pdf';

const parseAllowedOrigins = () => {
  if (!process.env.ALLOWED_ORIGINS) return [];

  return process.env.ALLOWED_ORIGINS.split(',').map((url) => String(url).trim());
};

const corsOptions = {
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
};

const pdfOptions = () => {
  const fileName = process.env.PDF_FILENAME || '';
  return {
    'Content-Disposition': `attachment; filename=${fileName}.pdf`,
    'Content-Type': 'application/pdf',
  };
};

export async function POST(request: NextRequest): Promise<Response> {
  const origin = request.headers.get('origin') ?? '';
  const isAllowedOrigin = parseAllowedOrigins().includes(origin);

  const concatOptions: Record<string, string> = {
    ...corsOptions,
    ...pdfOptions(),
  };

  if (isAllowedOrigin) {
    concatOptions['Access-Control-Allow-Origin'] = origin;
  }

  try {
    const pdfBuffer = await generatePdf();

    return new Response(pdfBuffer, {
      status: 200,
      headers: concatOptions,
    });
  } catch (error) {
    console.error(error);
    return new Response('The PDF cannot be generated, try later.', {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export async function OPTIONS(request: NextRequest): Promise<Response> {
  const origin = request.headers.get('origin') ?? '';
  const isAllowedOrigin = parseAllowedOrigins().includes(origin);

  const preflightHeaders = {
    ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }),
    ...corsOptions,
  };
  return NextResponse.json({}, { headers: preflightHeaders });
}
