import { BlogProgress } from '@/components/blog/blog-progress';
import { fireEvent, render, screen } from '@testing-library/react';

describe('<BlogProgress /> tests', () => {
  it('should render correctly', () => {
    const { container } = render(<BlogProgress />);
    expect(container).toMatchSnapshot();

    const progressBar = screen.getByTestId('reading-progress');
    expect(progressBar).toHaveClass(
      'fixed z-10 top-13 md:top-0 h-1 bg-primary border-none appearance-none left-0 w-full opacity-60 md:opacity-100',
    );
    expect(progressBar).toHaveStyle({ width: '0%' });
  });

  it('should update progress bar width on scroll', () => {
    render(<BlogProgress />);
    const progressBar = screen.getByTestId('reading-progress');

    // Mock document dimensions for scroll calculation
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      writable: true,
      configurable: true,
      value: 2000,
    });
    Object.defineProperty(document.documentElement, 'clientHeight', {
      writable: true,
      configurable: true,
      value: 1000,
    });

    // No scroll
    expect(progressBar).toHaveStyle({ width: '0%' });

    // Simulate scrolling to 25% (250px of 1000px scrollable)
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 250,
    });
    fireEvent.scroll(window);

    expect(progressBar).toHaveStyle({ width: '25%' });

    // Simulate scrolling to 50% (500px of 1000px scrollable)
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 500,
    });
    fireEvent.scroll(window);

    expect(progressBar).toHaveStyle({ width: '50%' });

    // Simulate scrolling to 100% (1000px of 1000px scrollable)
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 1000,
    });
    fireEvent.scroll(window);

    expect(progressBar).toHaveStyle({ width: '100%' });
  });
});
