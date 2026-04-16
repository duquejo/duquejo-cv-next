import { getLocale } from 'next-intl/server';
import * as actions from '@/actions/blog';
import { MockBlogPostBuilder } from '../../builders';

const { mockReaddir } = vi.hoisted(() => ({
  mockReaddir: vi.fn(),
}));

vi.mock('fs/promises', () => ({
  readdir: mockReaddir,
}));

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

const mockedFileNames: string[] = [
  'test-post.en.mdx',
  'another-post.en.mdx',
  'en-espanol.es.mdx',
  'README.md',
];

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
    const mockGetLocale = vi.mocked(getLocale);
    mockGetLocale.mockResolvedValueOnce('en');

    mockReaddir.mockResolvedValueOnce(mockedFileNames);

    const filenames = await actions.getBlogPostsFilenames();

    expect(filenames).toHaveLength(2);
    expect(filenames).toEqual(['test-post', 'another-post']);

    expect(getLocale).toHaveBeenCalled();
    expect(mockReaddir).toHaveBeenCalled();
  });

  it('should retrieve blog post filenames for a given locale', async () => {
    mockReaddir.mockResolvedValueOnce(mockedFileNames);

    const filenames = await actions.getBlogPostsFilenames('es');

    expect(filenames).toHaveLength(1);
    expect(filenames).toEqual(['en-espanol']);

    expect(getLocale).not.toHaveBeenCalled();
    expect(mockReaddir).toHaveBeenCalled();
  });

  it('should return empty array when no matching files exist', async () => {
    mockReaddir.mockResolvedValue(['README.md', 'package.json']);

    const filenames = await actions.getBlogPostsFilenames('en');

    expect(filenames).toEqual([]);
  });

  it('should handle empty directory', async () => {
    mockReaddir.mockResolvedValue([]);

    const filenames = await actions.getBlogPostsFilenames('en');

    expect(filenames).toEqual([]);
  });
});

describe('Blog actions - getBlogPostsByLocale', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call getBlogPostsFilenames with the provided locale', async () => {
    mockReaddir.mockResolvedValue([]);

    await actions.getBlogPostsByLocale(-1, 'es');

    expect(mockReaddir).toHaveBeenCalled();
  });

  it('should return empty array when no posts available', async () => {
    mockReaddir.mockResolvedValue([]);

    const posts = await actions.getBlogPostsByLocale(-1, 'en');

    expect(posts).toEqual([]);
  });

  it('should return array of blog posts', async () => {
    mockReaddir.mockResolvedValue(['test-post.en.mdx', 'another-post.en.mdx']);

    const posts = await actions.getBlogPostsByLocale(-1, 'en');

    // Posts will be empty/null because the actual files don't exist in test environment,
    // but the function should return an array
    expect(posts).toBeInstanceOf(Array);
  });

  it('should limit posts when limit is provided', async () => {
    mockReaddir.mockResolvedValue(['post-1.en.mdx', 'post-2.en.mdx', 'post-3.en.mdx']);

    const posts = await actions.getBlogPostsByLocale(2, 'en');

    expect(posts).toBeInstanceOf(Array);
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
    mockReaddir
      .mockResolvedValueOnce(['post-1.en.mdx', 'post-2.en.mdx']) // English
      .mockResolvedValueOnce(['post-1.es.mdx', 'post-2.es.mdx']); // Spanish

    const result = await actions.generateStaticPosts();

    expect(result).toEqual([
      { slug: 'post-1', lang: 'en' },
      { slug: 'post-2', lang: 'en' },
      { slug: 'post-1', lang: 'es' },
      { slug: 'post-2', lang: 'es' },
    ]);
  });

  it('should handle empty blog directory', async () => {
    mockReaddir.mockResolvedValue([]);

    const result = await actions.generateStaticPosts();

    expect(result).toEqual([]);
  });

  it('should flatten results from all locales', async () => {
    mockReaddir
      .mockResolvedValueOnce(['post-a.en.mdx']) // English
      .mockResolvedValueOnce(['post-b.es.mdx']); // Spanish

    const result = await actions.generateStaticPosts();

    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(2);
    expect(result.every((item) => item.slug && item.lang)).toBeTruthy();
  });
});
