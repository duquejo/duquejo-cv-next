import { generateStaticPosts, getBlogPostBySlug, resolveBlogPostSlug } from '@/actions/blog';
import BlogPostPage, {
  generateMetadata,
  generateStaticParams,
} from '@/app/[lang]/blog/[slug]/page';
import { BlogPostResult } from '@/interfaces';
import { createBlogPostMetadata } from '@/lib';
import { render, within } from '@testing-library/react';
import { getTranslations } from 'next-intl/server';
import { Params } from 'next/dist/server/request/params';
import { SearchParams } from 'next/dist/server/request/search-params';

vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn(() => {
    const translations: Record<string, unknown> = {
      title: 'projects',
      back_to_blog: 'Back to blog',
      read_more: 'Read more',
      'metadata.title': 'Mocked blog post',
      'metadata.not_found_description': 'The requested mocked blog post was not found.',
    };
    return Promise.resolve((key: string) => translations[key]);
  }),
}));

vi.mock('@/i18n/routing', () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock('@/actions/blog', () => ({
  resolveBlogPostSlug: vi.fn(),
  generateStaticPosts: vi.fn(),
  getBlogPostBySlug: vi.fn(),
}));

vi.mock('@/lib', async (importOriginal) => ({
  ...(await importOriginal()),
  createBlogPostMetadata: vi.fn(),
}));

const slug = 'test-blog-post';

const metadata = {
  slug,
  title: 'Test Blog Post',
  excerpt: 'This is a test blog post.',
  category: 'Music',
  publishDate: '2024-01-01',
  readingTime: '5 min',
  tags: ['Testing', 'Vitest'],
} satisfies BlogPostResult['metadata'];

const blogPostResultMock = {
  Post: () => <blockquote>Test Blog Post Content</blockquote>,
  metadata,
} satisfies BlogPostResult;

const searchParams: SearchParams = {
  query: undefined,
};

const params: Params = {
  slug,
  lang: 'en',
};

const props = {
  searchParams: Promise.resolve(searchParams),
  params: Promise.resolve(params),
} as PageProps<'/[lang]/blog/[slug]'>;

describe('<BlogPostPage /> tests', () => {
  it('should render the blog post page', async () => {
    vi.mocked(resolveBlogPostSlug).mockResolvedValueOnce(blogPostResultMock);

    const { container } = render(await BlogPostPage(props));

    const wrapper = within(container);

    expect(wrapper).toBeDefined();
    expect(wrapper.getByRole('heading', { level: 1, name: 'Test Blog Post' })).toBeInTheDocument();
    expect(wrapper.getByRole('blockquote')).toHaveTextContent('Test Blog Post Content');
    expect(wrapper.getByRole('link', { name: 'Back to blog' })).toBeInTheDocument();
    expect(wrapper.getByRole('paragraph')).toHaveTextContent(metadata.excerpt);
    expect(wrapper.getByText(metadata.category)).toBeInTheDocument();
    expect(wrapper.getAllByText(/Testing|Vitest/)).toHaveLength(metadata.tags.length);

    expect(resolveBlogPostSlug).toHaveBeenCalledWith('test-blog-post', 'en');
    expect(getTranslations).toHaveBeenCalledWith('Blog');
  });
});

describe('generateStaticParams tests', () => {
  it('should generate static params for blog posts', async () => {
    const mockedPosts = [
      {
        slug,
        lang: 'en' as const,
      },
    ];

    vi.mocked(generateStaticPosts).mockResolvedValueOnce(mockedPosts);

    const params = await generateStaticParams();

    expect(params).toEqual(mockedPosts);
    expect(generateStaticPosts).toHaveBeenCalled();
  });
});

describe('generateMetadata tests', () => {
  it('should generate metadata for blog posts - not found', async () => {
    vi.mocked(getBlogPostBySlug).mockResolvedValueOnce(null);

    const metadata = await generateMetadata(props);

    expect(metadata).toEqual({
      title: 'Mocked blog post',
      description: 'The requested mocked blog post was not found.',
    });
    expect(getBlogPostBySlug).toHaveBeenCalledWith(params.slug, params.lang);
    expect(createBlogPostMetadata).not.toHaveBeenCalled();
  });

  it('should generate metadata for blog posts - happy path', async () => {
    vi.mocked(getBlogPostBySlug).mockResolvedValueOnce(blogPostResultMock);
    vi.mocked(createBlogPostMetadata).mockResolvedValueOnce(metadata);

    await generateMetadata(props);

    expect(getBlogPostBySlug).toHaveBeenCalledWith(params.slug, params.lang);
    expect(createBlogPostMetadata).toHaveBeenCalledWith(metadata, params.lang);
  });
});
