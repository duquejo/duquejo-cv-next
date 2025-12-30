import { notFound, RedirectType } from 'next/navigation';
import { getLocale } from 'next-intl/server';
import * as blogActions from '@/actions/blog';
import { resolveBlogPostSlug } from '@/actions/blog-post-resolver';
import { redirect } from '@/i18n/routing';
import { getSlugByLocale } from '@/lib';
import { MockBlogPostBuilder } from '../../builders';

// Mock dependencies
vi.mock('@/actions/blog');
vi.mock('@/lib/slugs');
vi.mock('next-intl/server');
vi.mock('next/navigation', () => ({
  notFound: vi.fn(() => {
    throw new Error('NEXT_NOT_FOUND');
  }),
  RedirectType: {
    replace: 'replace',
    push: 'push',
  },
}));
vi.mock('@/i18n/routing', () => ({
  redirect: vi.fn(() => {
    throw new Error('NEXT_REDIRECT');
  }),
}));

describe('resolveBlogPostSlug action tests', () => {
  // Test fixtures using builder
  const mockBlogPostEn = new MockBlogPostBuilder()
    .withSlugs('hello-world', 'hello-world', 'hola-mundo')
    .withTitle('Hello World')
    .withExcerpt('A test post')
    .withCategory('Coding')
    .withPostComponent(() => 'English content')
    .build();

  const mockBlogPostEs = new MockBlogPostBuilder()
    .withSlugs('hola-mundo', 'hello-world', 'hola-mundo')
    .withTitle('Hola Mundo')
    .withExcerpt('Un post de prueba')
    .withCategory('Coding')
    .withPostComponent(() => 'Spanish content')
    .build();

  const anotherPostEn = new MockBlogPostBuilder()
    .withSlugs('another-post', 'another-post', 'otro-post')
    .withTitle('Another Post')
    .withExcerpt('Another test')
    .withCategory('Lifestyle')
    .withPublishDate('2024-01-02')
    .withReadingTime('3 min')
    .withPostComponent(() => 'Another post')
    .build();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(getLocale).mockResolvedValue('en');
  });

  describe('Direct match', () => {
    it('should return the post directly when slug matches exactly', async () => {
      vi.mocked(blogActions.getBlogPostBySlug).mockResolvedValueOnce(mockBlogPostEn);

      const result = await resolveBlogPostSlug('hello-world', 'en');

      expect(result).toEqual(mockBlogPostEn);

      expect(blogActions.getBlogPostBySlug).toHaveBeenCalledWith('hello-world', 'en');
      expect(blogActions.getBlogPostsFilenames).not.toHaveBeenCalled();

      expect(redirect).not.toHaveBeenCalled();
      expect(notFound).not.toHaveBeenCalled();
      expect(getLocale).not.toHaveBeenCalled();
    });

    it('should use default locale from getLocale when locale is not provided', async () => {
      vi.mocked(getLocale).mockResolvedValue('es');
      vi.mocked(blogActions.getBlogPostBySlug).mockResolvedValueOnce(mockBlogPostEs);

      const result = await resolveBlogPostSlug('hola-mundo');

      expect(result).toEqual(mockBlogPostEs);
      expect(getLocale).toHaveBeenCalledTimes(1);
      expect(blogActions.getBlogPostBySlug).toHaveBeenCalledWith('hola-mundo', 'es');
    });
  });

  describe('Alternate Slug Match with Redirect', () => {
    it('should redirect when English slug is used but Spanish locale is active', async () => {
      // Direct match fails
      vi.mocked(blogActions.getBlogPostBySlug)
        .mockResolvedValueOnce(null) // Direct match fails
        .mockResolvedValueOnce(mockBlogPostEs); // Found in search

      vi.mocked(blogActions.getBlogPostsFilenames).mockResolvedValue(['hola-mundo']);
      vi.mocked(getSlugByLocale).mockReturnValue('hola-mundo');

      await expect(resolveBlogPostSlug('hello-world', 'es')).rejects.toThrow('NEXT_REDIRECT');

      expect(redirect).toHaveBeenCalledWith(
        {
          href: '/blog/hola-mundo',
          locale: 'es',
        },
        RedirectType.replace,
      );
    });

    it('should redirect when Spanish slug is used but English locale is active', async () => {
      vi.mocked(blogActions.getBlogPostBySlug)
        .mockResolvedValueOnce(null) // Direct match fails
        .mockResolvedValueOnce(mockBlogPostEn); // Found in search

      vi.mocked(blogActions.getBlogPostsFilenames).mockResolvedValue(['hello-world']);
      vi.mocked(getSlugByLocale).mockReturnValue('hello-world');

      await expect(resolveBlogPostSlug('hola-mundo', 'en')).rejects.toThrow('NEXT_REDIRECT');

      expect(redirect).toHaveBeenCalledWith(
        {
          href: '/blog/hello-world',
          locale: 'en',
        },
        RedirectType.replace,
      );
    });
  });

  describe('Exhaustive Search (No Direct Match)', () => {
    it('should search all posts when direct match fails but post exists with alternate slug', async () => {
      vi.mocked(blogActions.getBlogPostBySlug)
        .mockResolvedValueOnce(null) // Direct match fails
        .mockResolvedValueOnce(anotherPostEn) // First file (not a match)
        .mockResolvedValueOnce(mockBlogPostEn); // Second file (match!)

      vi.mocked(blogActions.getBlogPostsFilenames).mockResolvedValue([
        'another-post',
        'hello-world',
      ]);
      // Mock to return English slug, but we're searching with Spanish slug
      vi.mocked(getSlugByLocale).mockReturnValue('hello-world');

      await expect(resolveBlogPostSlug('hola-mundo', 'en')).rejects.toThrow('NEXT_REDIRECT');

      expect(blogActions.getBlogPostsFilenames).toHaveBeenCalledWith('en');
      expect(blogActions.getBlogPostBySlug).toHaveBeenCalledWith('another-post', 'en');
      expect(blogActions.getBlogPostBySlug).toHaveBeenCalledWith('hello-world', 'en');
      expect(redirect).toHaveBeenCalled();
    });

    it('should skip null posts during exhaustive search', async () => {
      vi.mocked(blogActions.getBlogPostBySlug)
        .mockResolvedValueOnce(null) // Direct match
        .mockResolvedValueOnce(null) // First file (fails to load)
        .mockResolvedValueOnce(anotherPostEn) // Second file (not a match)
        .mockResolvedValueOnce(mockBlogPostEn); // Third file (match!)

      vi.mocked(blogActions.getBlogPostsFilenames).mockResolvedValue([
        'broken-post',
        'another-post',
        'hello-world',
      ]);
      vi.mocked(getSlugByLocale).mockReturnValue('hello-world');

      const result = await resolveBlogPostSlug('hello-world', 'en');

      expect(result).toEqual(mockBlogPostEn);
      expect(blogActions.getBlogPostBySlug).toHaveBeenCalledTimes(4);
    });

    it('should return post without redirect when correct slug is found during search', async () => {
      vi.mocked(blogActions.getBlogPostBySlug)
        .mockResolvedValueOnce(null) // Direct match fails
        .mockResolvedValueOnce(mockBlogPostEn); // Found in search

      vi.mocked(blogActions.getBlogPostsFilenames).mockResolvedValue(['hello-world']);
      vi.mocked(getSlugByLocale).mockReturnValue('hello-world'); // Correct slug

      const result = await resolveBlogPostSlug('hello-world', 'en');

      expect(result).toEqual(mockBlogPostEn);
      expect(redirect).not.toHaveBeenCalled();
    });
  });

  describe('Not Found Scenarios', () => {
    it('should call notFound when slug does not exist at all', async () => {
      vi.mocked(blogActions.getBlogPostBySlug).mockResolvedValue(null);
      vi.mocked(blogActions.getBlogPostsFilenames).mockResolvedValue(['hello-world']);

      await expect(resolveBlogPostSlug('non-existent-slug', 'en')).rejects.toThrow(
        'NEXT_NOT_FOUND',
      );

      expect(notFound).toHaveBeenCalledTimes(1);
      expect(redirect).not.toHaveBeenCalled();
    });

    it('should call notFound when no posts exist at all', async () => {
      vi.mocked(blogActions.getBlogPostBySlug).mockResolvedValueOnce(null);
      vi.mocked(blogActions.getBlogPostsFilenames).mockResolvedValue([]);

      await expect(resolveBlogPostSlug('any-slug', 'en')).rejects.toThrow('NEXT_NOT_FOUND');

      expect(notFound).toHaveBeenCalledTimes(1);
    });

    it('should call notFound when all posts fail to load', async () => {
      vi.mocked(blogActions.getBlogPostBySlug).mockResolvedValue(null);
      vi.mocked(blogActions.getBlogPostsFilenames).mockResolvedValue([
        'broken-1',
        'broken-2',
        'broken-3',
      ]);

      await expect(resolveBlogPostSlug('any-slug', 'en')).rejects.toThrow('NEXT_NOT_FOUND');

      expect(notFound).toHaveBeenCalledTimes(1);
      expect(blogActions.getBlogPostBySlug).toHaveBeenCalledTimes(4); // 1 direct + 3 search
    });
  });
});
