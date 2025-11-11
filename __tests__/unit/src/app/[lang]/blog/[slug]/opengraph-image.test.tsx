import Image, { alt, contentType, size } from '@/app/[lang]/blog/[slug]/opengraph-image';
import { createBlogImageMetadata } from '@/lib/metadata';
import { ImageResponse } from 'next/og';

vi.mock('@/lib/metadata', () => ({
  createBlogImageMetadata: vi.fn(),
}));

describe('opengraph-image exports', () => {
  it('should export correct alt text', () => {
    expect(alt).toBe('Blog');
  });

  it('should export correct image size', () => {
    expect(size).toEqual({
      width: 420,
      height: 250,
    });
  });

  it('should export correct content type', () => {
    expect(contentType).toBe('image/jpeg');
  });
});

describe('Image component', () => {
  it('should generate ImageResponse with blog metadata', async () => {
    const mockMetadata = {
      title: 'Test Blog Post Title',
      subtitle: 'Blog | José Duque',
    };

    vi.mocked(createBlogImageMetadata).mockResolvedValueOnce(mockMetadata);

    const params = Promise.resolve({
      slug: 'test-blog-post',
      lang: 'en',
    });

    const result = await Image({ params });

    expect(result).toBeInstanceOf(ImageResponse);
    expect(createBlogImageMetadata).toHaveBeenCalledWith('test-blog-post', 'en');
  });

  it('should generate ImageResponse with Spanish locale', async () => {
    const mockMetadata = {
      title: 'Título del Post de Blog',
      subtitle: 'Blog | José Duque',
    };

    vi.mocked(createBlogImageMetadata).mockResolvedValueOnce(mockMetadata);

    const params = Promise.resolve({
      slug: 'test-blog-post',
      lang: 'es',
    });

    const result = await Image({ params });

    expect(result).toBeInstanceOf(ImageResponse);
    expect(createBlogImageMetadata).toHaveBeenCalledWith('test-blog-post', 'es');
  });
});
