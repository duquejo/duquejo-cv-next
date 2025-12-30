import { render, screen } from '@testing-library/react';
import { BlogFeaturedCard } from '@/components/blog/blog-featured-card';
import type { BlogPostResult } from '@/interfaces';

vi.mock('@/i18n/routing', () => ({
  Link: ({ children, href, onClick, ...props }: any) => (
    <a href={href?.params?.slug} onClick={onClick} {...props}>
      {children}
    </a>
  ),
}));

describe('<BlogFeaturedCard /> tests', () => {
  const args = {
    title: 'Sample Blog Post',
    slug: 'sample-blog-post',
    excerpt: 'This is a sample excerpt for the blog post.',
    category: 'Coding',
    publishDate: '2023-01-01',
    readingTime: '5 min read',
    tags: ['Next.js', 'React', 'JavaScript'],
  } satisfies BlogPostResult['metadata'];

  it('should match the snapshot', () => {
    const { container } = render(<BlogFeaturedCard {...args} />);

    expect(container).toMatchSnapshot();
  });

  it('should render the provided fields correctly', () => {
    render(<BlogFeaturedCard {...args} />);

    expect(screen.getByRole('link')).toHaveAttribute('href', args.slug);

    expect(screen.getByText(args.title)).toBeInTheDocument();
    expect(screen.getByText(args.excerpt)).toBeInTheDocument();
    expect(screen.getByText(args.category)).toBeInTheDocument();
    expect(screen.getByText(args.readingTime)).toBeInTheDocument();

    expect(screen.getAllByTitle(/Next\.js|React|JavaScript/)).toHaveLength(args.tags.length);
  });
});
