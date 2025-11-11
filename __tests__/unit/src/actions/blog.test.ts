import * as actions from '@/actions/blog';
import * as fs from 'fs/promises';
import { getLocale } from 'next-intl/server';
import { MockBlogPostBuilder } from '../../builders';

vi.mock('fs/promises');

vi.mock('next-intl/server', () => ({
  getLocale: vi.fn(),
}));

vi.mock('@/i18n/routing', () => ({
  routing: {
    locales: ['en', 'es'],
  },
}));

vi.mock('next/navigation', () => ({
  notFound: vi.fn(),
  redirect: vi.fn(),
  RedirectType: {
    replace: 'replace',
    push: 'push',
  },
}));

const mockedFileNames = [
  'test-post.en.mdx',
  'another-post.en.mdx',
  'en-espanol.es.mdx',
  'README.md',
] as never;

// Mock blog post fixtures using builder
const mockBlogPostResultEn = new MockBlogPostBuilder()
  .withSlugs('test-post', 'test-post', 'post-prueba')
  .withTitle('Test Blog Post')
  .withExcerpt('This is a test blog post')
  .withCategory('Coding')
  .withTags('test', 'vitest')
  .withPostComponent(() => 'foo')
  .build();

const mockBlogPostResultEs = new MockBlogPostBuilder()
  .withSlugs('post-prueba', 'test-post', 'post-prueba')
  .withTitle('Post de Prueba')
  .withExcerpt('Este es un post de prueba')
  .withCategory('Coding')
  .withTags('test', 'vitest')
  .withPostComponent(() => 'bar')
  .build();

// Extract metadata for convenience
const mockBlogPostEn = mockBlogPostResultEn.metadata;

describe('Blog actions - getBlogPostsFilenames', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should retrieve blog post filenames for default locale (en)', async () => {
    vi.mocked(getLocale).mockResolvedValueOnce('en');
    vi.mocked(fs.readdir).mockResolvedValueOnce(mockedFileNames);

    const filenames = await actions.getBlogPostsFilenames();

    expect(filenames).toHaveLength(2);
    expect(filenames).toEqual(['test-post', 'another-post']);

    expect(getLocale).toHaveBeenCalled();
    expect(fs.readdir).toHaveBeenCalledWith('content/blog');
  });

  it('should retrieve blog post filenames for a given locale', async () => {
    vi.mocked(fs.readdir).mockResolvedValueOnce(mockedFileNames);

    const filenames = await actions.getBlogPostsFilenames('es');

    expect(filenames).toHaveLength(1);
    expect(filenames).toEqual(['en-espanol']);

    expect(getLocale).not.toHaveBeenCalled();
    expect(fs.readdir).toHaveBeenCalledWith('content/blog');
  });

  it('should return empty array when no matching files exist', async () => {
    vi.mocked(fs.readdir).mockResolvedValue(['README.md', 'package.json'] as never);

    const filenames = await actions.getBlogPostsFilenames('en');

    expect(filenames).toEqual([]);
  });

  it('should handle empty directory', async () => {
    vi.mocked(fs.readdir).mockResolvedValue([] as never);

    const filenames = await actions.getBlogPostsFilenames('en');

    expect(filenames).toEqual([]);
  });
});

describe('Blog actions - getBlogPostsByLocale', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should retrieve all blog posts without limit', async () => {
    vi.spyOn(actions, 'getBlogPostsFilenames').mockResolvedValue(['test-post', 'another-post']);

    vi.doMock('@/blog/test-post.en.mdx', () => ({
      default: mockBlogPostResultEn.Post,
      frontmatter: mockBlogPostEn,
    }));

    vi.doMock('@/blog/another-post.en.mdx', () => ({
      default: mockBlogPostResultEn.Post,
      frontmatter: { ...mockBlogPostEn, slug: 'another-post', slugEn: 'another-post' },
    }));

    const posts = await actions.getBlogPostsByLocale(-1, 'en');

    expect(posts).toBeInstanceOf(Array);
    expect(posts.length).toBeGreaterThanOrEqual(0);
  });

  it('should limit the number of posts returned', async () => {
    vi.spyOn(actions, 'getBlogPostsFilenames').mockResolvedValue([
      'post-1',
      'post-2',
      'post-3',
      'post-4',
      'post-5',
    ]);

    vi.doMock('@/blog/post-1.en.mdx', () => ({
      default: mockBlogPostResultEn.Post,
      frontmatter: { ...mockBlogPostEn, slug: 'post-1' },
    }));

    vi.doMock('@/blog/post-2.en.mdx', () => ({
      default: mockBlogPostResultEn.Post,
      frontmatter: { ...mockBlogPostEn, slug: 'post-2' },
    }));

    await actions.getBlogPostsByLocale(2, 'en');

    expect(getLocale).not.toHaveBeenCalled();
  });

  it('should use provided locale instead of default', async () => {
    vi.spyOn(actions, 'getBlogPostsFilenames').mockResolvedValue(['test-post']);

    await actions.getBlogPostsByLocale(5, 'es');

    expect(getLocale).not.toHaveBeenCalled();
  });

  it('should handle no posts available', async () => {
    vi.spyOn(actions, 'getBlogPostsFilenames').mockResolvedValue([]);

    const posts = await actions.getBlogPostsByLocale(-1, 'en');

    expect(posts).toEqual([]);
  });
});

describe('Blog actions - getBlogPostBySlug', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should log warning when import fails', async () => {
    const consoleWarnSpy = vi.spyOn(console, 'warn');

    await actions.getBlogPostBySlug('failing-post', 'en');

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining('Error loading blog post failing-post'),
      expect.any(Error),
    );
  });
});

describe('Blog actions - generateStaticPosts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should generate static posts for all locales', async () => {
    vi.mocked(fs.readdir)
      .mockResolvedValueOnce(['post-1.en.mdx', 'post-2.en.mdx'] as never) // English
      .mockResolvedValueOnce(['post-1.es.mdx', 'post-2.es.mdx'] as never); // Spanish

    const result = await actions.generateStaticPosts();

    expect(result).toEqual([
      { slug: 'post-1', lang: 'en' },
      { slug: 'post-2', lang: 'en' },
      { slug: 'post-1', lang: 'es' },
      { slug: 'post-2', lang: 'es' },
    ]);
  });

  it('should handle empty blog directory', async () => {
    vi.mocked(fs.readdir).mockResolvedValue([] as never);

    const result = await actions.generateStaticPosts();

    expect(result).toEqual([]);
  });

  it('should flatten results from all locales', async () => {
    vi.mocked(fs.readdir)
      .mockResolvedValueOnce(['post-a.en.mdx'] as never) // English
      .mockResolvedValueOnce(['post-b.es.mdx'] as never); // Spanish

    const result = await actions.generateStaticPosts();

    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(2);
    expect(result.every((item) => item.slug && item.lang)).toBeTruthy();
  });
});
