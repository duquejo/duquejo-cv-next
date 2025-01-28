import { render, screen } from '@testing-library/react';
import NotFound from '@/app/not-found';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) =>
    ({
      title: 'title',
      subtitle: 'subtitle',
      button: 'button',
    })[key],
}));

describe('<NotFound /> tests', () => {
  it('should render the main wrapper layout', () => {
    render(<NotFound />);

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('title');
    expect(screen.getByRole('paragraph')).toHaveTextContent('subtitle');
    expect(screen.getByRole('link', { name: /button/ })).toBeInTheDocument();
  });
});
