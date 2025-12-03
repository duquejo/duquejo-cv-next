import { createBlogImageMetadata } from '@/lib/metadata';
import { ImageResponse } from 'next/og';

// Image metadata
export const alt = 'Blog';

export const size = {
  width: 420,
  height: 250,
};

export const contentType = 'image/jpeg';

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string; lang: string }>;
}): Promise<ImageResponse> {
  const { slug, lang } = await params;
  const imageMetadata = await createBlogImageMetadata(slug, lang);

  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundImage:
          'radial-gradient( circle 1292px at -13.6% 51.7%,  rgba(0,56,68,1) 0%, rgba(163,217,185,1) 51.5%, rgba(255,252,247,1) 88.6% )',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          color: '#fff',
          fontSize: 22,
          marginBottom: 8,
        }}
      >
        {imageMetadata.subtitle}
      </div>
      <div
        style={{
          color: '#fff',
          fontSize: 30,
          lineHeight: 1.2,
          letterSpacing: -1,
        }}
      >
        {imageMetadata.title}
      </div>
    </div>,
    // ImageResponse options
    {
      ...size,
    },
  );
}
