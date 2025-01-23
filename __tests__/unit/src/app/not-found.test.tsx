import { render, screen } from '@testing-library/react';
import NotFound from '@/app/not-found';

describe('<NotFound /> tests', () => {
  it('should render the main wrapper layout', () => {
    render(<NotFound />);

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Not found');
    expect(screen.getByRole('link', { name: /Take me back/ })).toBeInTheDocument();
  });
});
