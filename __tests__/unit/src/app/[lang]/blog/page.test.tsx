import { getBlogPostsByLocale } from '@/actions/blog';
import BlogPage, { generateMetadata } from '@/app/[lang]/blog/page';
import { BlogPostResult } from '@/interfaces';
import { render, within } from '@testing-library/react';
import { getLocale, getTranslations } from 'next-intl/server';
import validateMetadata from '../../../../common/validate-metadata';

// Mock @/lib for metadata validation tests
vi.mock('@/lib', async (importOriginal) => ({
  ...(await importOriginal()),
  createMetadata: vi.fn(),
}));

vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn(() => {
    const translations: Record<string, unknown> = {
      title: 'blog page',
      subtitle: 'Latest Articles',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      reading_time: 'Reading time: {{time}}',
      read_more: 'Read more',
      no_articles: 'No articles available at the moment',
      'metadata.title': 'Mocked blog post',
      'metadata.not_found_description': 'The requested mocked blog post was not found.',
    };
    return Promise.resolve((key: string) => translations[key]);
  }),
  getLocale: vi.fn().mockResolvedValueOnce('en'),
}));

vi.mock('@/i18n/routing', () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock('@/actions/blog', () => ({
  getBlogPostsByLocale: vi.fn(),
}));

const metadata = {
  slug: 'test-blog-post',
  title: 'Test Blog Post',
  excerpt: 'This is a test blog post',
  category: 'Music',
  publishDate: '2024-01-01',
  readingTime: '5 min',
  tags: ['Testing', 'Vitest'],
} satisfies BlogPostResult['metadata'];

const blogPostResultMock = {
  Post: () => <blockquote>Test Blog Post Content</blockquote>,
  metadata,
} satisfies BlogPostResult;

/**
 * Validate metadata generation for the Blog page.
 */
validateMetadata(generateMetadata, 'Blog');

describe('<BlogPage /> tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the blog page - no posts available', async () => {
    vi.mocked(getBlogPostsByLocale).mockResolvedValueOnce([]);

    const { container } = render(await BlogPage());

    const wrapper = within(container);

    expect(wrapper).toBeDefined();
    expect(wrapper.getByRole('heading', { level: 1, name: 'blog page' })).toBeInTheDocument();
    expect(
      wrapper.getByText('Lorem ipsum dolor sit amet, consectetur adipiscing elit.'),
    ).toBeInTheDocument();
    expect(wrapper.getByText('No articles available at the moment')).toBeInTheDocument();

    expect(getBlogPostsByLocale).toHaveBeenCalledWith(-1, 'en');
    expect(getLocale).toHaveBeenCalledWith();
    expect(getTranslations).toHaveBeenCalledWith('Blog');
  });

  it('should render the blog page - with posts available (featured)', async () => {
    vi.mocked(getBlogPostsByLocale).mockResolvedValueOnce([blogPostResultMock]);

    const { container } = render(await BlogPage());

    const wrapper = within(container);

    expect(wrapper).toBeDefined();
    expect(wrapper.getByRole('heading', { level: 1, name: 'blog page' })).toBeInTheDocument();

    expect(wrapper.getAllByRole('link')).toHaveLength(1);
    expect(wrapper.getByText('Test Blog Post')).toBeInTheDocument();
    expect(wrapper.getByText('This is a test blog post')).toBeInTheDocument();
  });

  it('should render the blog page - with posts available (featured + latest)', async () => {
    vi.mocked(getBlogPostsByLocale).mockResolvedValueOnce([
      blogPostResultMock,
      {
        ...blogPostResultMock,
        metadata: {
          ...blogPostResultMock.metadata,
          title: 'Another Test Blog Post',
          slug: 'another-test-blog-post',
          excerpt: 'This is another test blog post',
        },
      },
    ]);
    vi.mocked(getLocale);

    const { container } = render(await BlogPage());

    const wrapper = within(container);

    expect(wrapper).toBeDefined();
    expect(wrapper.getByRole('heading', { level: 1, name: 'blog page' })).toBeInTheDocument();

    expect(wrapper.getAllByRole('link')).toHaveLength(2);
    expect(wrapper.getByText('Test Blog Post')).toBeInTheDocument();
    expect(wrapper.getByText('This is a test blog post')).toBeInTheDocument();

    expect(wrapper.getByText('Another Test Blog Post')).toBeInTheDocument();
    expect(wrapper.getByText('This is another test blog post')).toBeInTheDocument();
  });
});
