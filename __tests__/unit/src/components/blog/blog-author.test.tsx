import { BlogAuthor } from '@/components/blog/blog-author';
import { render, screen } from '@testing-library/react';

describe('<BlogAuthor /> tests', () => {
  it('should match the snapshot', () => {
    const { container } = render(<BlogAuthor publishDate="2025-01-01" readingTime="5 min read" />);
    expect(container).toMatchSnapshot();

    expect(screen.getByText('José Duque')).toBeInTheDocument();
    expect(screen.getByText('JD')).toBeInTheDocument();
    expect(screen.getByRole('time')).toHaveTextContent('5 min read');
  });

  it('should render the provided fields correctly', () => {
    render(
      <BlogAuthor
        publishDate="2025-01-01"
        readingTime="10 min read"
        author={{
          name: 'Jane Smith',
          avatar: '',
          initials: 'JS',
        }}
      />,
    );

    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('JS')).toBeInTheDocument();
    expect(screen.getByRole('time')).toHaveTextContent('10 min read');
  });
});
