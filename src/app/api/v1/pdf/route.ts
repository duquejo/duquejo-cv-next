import { generateInputs, getBaseTemplate } from '@/lib/pdf';
import { generate } from '@pdfme/generator';
import { NextRequest, NextResponse } from 'next/server';

const allowedOrigins = ['https://duquejo.com', 'http://localhost:8081'];

const corsOptions = {
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
};

const pdfOptions = {
  'Content-Disposition': 'attachment; filename=cv_jose_duque.pdf',
  'Content-Type': 'application/pdf',
};

export async function POST(request: NextRequest): Promise<Response> {
  const origin = request.headers.get('origin') ?? '';
  const isAllowedOrigin = allowedOrigins.includes(origin);

  const concatOptions: Record<string, string> = {
    ...corsOptions,
    ...pdfOptions,
  };

  if (isAllowedOrigin) {
    concatOptions['Access-Control-Allow-Origin'] = origin;
  }

  const template = getBaseTemplate;
  const inputs = generateInputs();

  const pdfBuffer = await generate({ inputs, template });

  return new Response(pdfBuffer, {
    status: 200,
    headers: concatOptions,
  });
}

export async function OPTIONS(request: NextRequest): Promise<Response> {
  const origin = request.headers.get('origin') ?? '';
  const isAllowedOrigin = allowedOrigins.includes(origin);

  const preflightHeaders = {
    ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }),
    ...corsOptions,
  };
  return NextResponse.json({}, { headers: preflightHeaders });
}
