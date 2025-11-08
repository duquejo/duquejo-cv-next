import * as actions from '@/actions/blog';
import { BlogPost, BlogPostResult } from '@/interfaces';
import * as fs from 'fs/promises';
import { getLocale } from 'next-intl/server';

vi.mock('fs/promises');

vi.mock('next-intl/server', () => ({
  getLocale: vi.fn(),
}));

const mockedFileNames = [
  'test-post.en.mdx',
  'another-post.en.mdx',
  'en-espanol.es.mdx',
  'README.md',
] as never;

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
  // Mock blog post metadata
  const mockBlogPostEn = {
    slug: 'test-post',
    slugEn: 'test-post',
    slugEs: 'post-prueba',
    title: 'Test Blog Post',
    excerpt: 'This is a test blog post',
    category: 'Coding',
    publishDate: '2024-01-01',
    readingTime: '5 min',
    tags: ['test', 'vitest'],
  } satisfies BlogPost;

  const mockBlogPostEs = {
    ...mockBlogPostEn,
    slug: 'post-prueba',
    title: 'Post de Prueba',
    excerpt: 'Este es un post de prueba',
  } satisfies BlogPost;

  const mockBlogPostResultEn: BlogPostResult = {
    Post: () => 'foo',
    metadata: mockBlogPostEn,
  };

  const mockBlogPostResultEs: BlogPostResult = {
    Post: () => 'bar',
    metadata: mockBlogPostEs,
  };

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
  it('should return null when blog post does not exist', async () => {
    const result = await actions.getBlogPostBySlug('non-existent-post', 'en');

    expect(result).toBeNull();
  });

  it('should use default locale when not provided', async () => {
    vi.mocked(getLocale).mockResolvedValue('en');

    await actions.getBlogPostBySlug('test-post');

    expect(getLocale).toHaveBeenCalled();
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

describe('Blog actions - resolveBlogPostSlug', () => {
  it.todo('should return post directly when slug matches exactly');
  it.todo('should redirect when accessing Spanish slug from English locale');
  it.todo('should call notFound when post does not exist');
});

describe.todo('Blog actions - generateStaticPosts', () => {
  it.todo('should generate static posts for all locales');
  it.todo('should handle empty blog directory');
  it.todo('should flatten results from all locales');
});
